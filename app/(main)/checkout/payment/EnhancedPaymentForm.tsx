'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import {
  getStripe,
  STRIPE_CONFIG,
  stripeAppearance,
  formatAmount,
  getErrorMessage,
  paymentMethodNames,
} from '@/lib/stripe-config';
import Image from 'next/image';

interface EnhancedPaymentFormProps {
  orderId: number;
  total: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  customerEmail?: string;
  customerName?: string;
}

/**
 * Payment form component with enhanced error handling and mobile support
 */
function PaymentFormContent({
  orderId,
  total,
  onSuccess,
  onError,
  customerEmail,
  customerName,
}: EnhancedPaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Setup payment request for Apple Pay / Google Pay
  useEffect(() => {
    if (!stripe || !STRIPE_CONFIG.isMobileDevice()) return;

    const pr = stripe.paymentRequest({
      country: 'NL',
      currency: STRIPE_CONFIG.currency,
      total: {
        label: `Order #${orderId}`,
        amount: Math.round(total * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
        setCanMakePayment(true);
      }
    });

    pr.on('paymentmethod', async (event) => {
      setIsProcessing(true);

      try {
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          event.paymentIntent?.client_secret || '',
          {
            payment_method: event.paymentMethod.id,
          },
          { handleActions: false }
        );

        if (confirmError) {
          event.complete('fail');
          setErrorMessage(getErrorMessage(confirmError));
        } else {
          event.complete('success');
          if (paymentIntent?.status === 'succeeded') {
            await handlePaymentSuccess(paymentIntent.id);
          }
        }
      } catch (error) {
        event.complete('fail');
        setErrorMessage(getErrorMessage(error));
      } finally {
        setIsProcessing(false);
      }
    });
  }, [stripe, orderId, total]);

  /**
   * Handle successful payment
   */
  const handlePaymentSuccess = useCallback(async (paymentIntentId: string) => {
    try {
      // Update order status
      const response = await fetch('/api/update-order-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          status: 'processing',
          paymentIntentId,
        }),
      });

      if (!response.ok) {
        console.error('Failed to update order status');
      }

      // Call success callback
      onSuccess();

      // Redirect to thank you page
      window.location.href = `/thank-you?order=${orderId}`;
    } catch (error) {
      console.error('Error handling payment success:', error);
      // Still redirect even if status update fails
      window.location.href = `/thank-you?order=${orderId}`;
    }
  }, [orderId, onSuccess]);

  /**
   * Handle payment submission with retry logic
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Betaalsysteem wordt nog geladen. Een moment geduld.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Get order data from session
      const orderDataStr = sessionStorage.getItem('orderData');
      const orderData = orderDataStr ? JSON.parse(orderDataStr) : null;

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/thank-you?order=${orderId}`,
          payment_method_data: {
            billing_details: {
              name: customerName || orderData?.customer?.name || 'Klant',
              email: customerEmail || orderData?.customer?.email || undefined,
              phone: orderData?.customer?.phone || undefined,
              address: orderData?.customer?.address || undefined,
            },
          },
        },
        redirect: 'if_required',
      });

      if (error) {
        // Handle specific error types
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setErrorMessage(getErrorMessage(error));
        } else if (error.message?.includes('cancel')) {
          // User cancelled
          window.location.href = `/payment-failed?order=${orderId}&reason=cancelled`;
        } else {
          // Generic error with retry option
          setErrorMessage(getErrorMessage(error));
          setRetryCount(prev => prev + 1);

          // Auto-retry for network errors
          if (retryCount < STRIPE_CONFIG.maxRetries && error.message?.includes('network')) {
            setTimeout(() => {
              handleSubmit(e);
            }, STRIPE_CONFIG.retryDelay * (retryCount + 1));
          }
        }
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        await handlePaymentSuccess(paymentIntent.id);
      }
    } catch (err: any) {
      setErrorMessage(getErrorMessage(err));
      onError(err.message || 'Er is een onverwachte fout opgetreden');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mobile Payment Methods (Apple Pay / Google Pay) */}
      {canMakePayment && paymentRequest && (
        <div className="mb-6">
          <PaymentRequestButtonElement
            options={{ paymentRequest }}
            className="w-full"
          />
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Of betaal met kaart</span>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-red-800">{errorMessage}</p>
              {retryCount > 0 && retryCount < STRIPE_CONFIG.maxRetries && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="mt-2 text-sm text-red-700 underline hover:no-underline"
                >
                  Opnieuw proberen ({STRIPE_CONFIG.maxRetries - retryCount} pogingen over)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stripe Payment Element */}
      <div className="bg-gray-50 rounded-lg p-4">
        <PaymentElement
          options={{
            fields: {
              billingDetails: {
                name: customerName ? 'never' : 'auto',
                email: customerEmail ? 'never' : 'auto',
                phone: 'auto',
                address: 'auto',
              },
            },
            wallets: {
              applePay: 'auto',
              googlePay: 'auto',
            },
            layout: {
              type: 'tabs',
              defaultCollapsed: false,
              radios: true,
              spacedAccordionItems: false,
            },
            paymentMethodOrder: ['ideal', 'card', 'bancontact'],
            business: {
              name: 'Stonesforhealth',
            },
            defaultValues: {
              billingDetails: {
                name: customerName || '',
                email: customerEmail || '',
              },
            },
          }}
        />
      </div>

      {/* Payment Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Veilige betaling</p>
            <p>Uw betaalgegevens worden veilig verwerkt via Stripe. Wij slaan geen creditcardgegevens op.</p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-[#492c4a] text-white py-4 px-6 rounded-full font-semibold hover:bg-[#6b4069] transition-all transform hover:scale-[1.02] disabled:bg-gray-300 disabled:transform-none flex items-center justify-center font-[family-name:var(--font-eb-garamond)] text-lg"
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Betaling wordt verwerkt...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Betaal nu - {formatAmount(total)}
          </>
        )}
      </button>

      {/* Security Badges */}
      <div className="flex items-center justify-center gap-6 pt-4">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>256-bit SSL</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>PCI-DSS</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Image src="/images/stripe-badge.svg" alt="Stripe" width={60} height={24} />
        </div>
      </div>
    </form>
  );
}

/**
 * Main component that wraps the payment form with Stripe Elements
 */
export default function EnhancedPaymentForm(props: EnhancedPaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let retryTimeout: NodeJS.Timeout;

    const fetchPaymentIntent = async (attempt = 0) => {
      try {
        const response = await fetch('/api/stripe-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: props.orderId }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || `HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.clientSecret) {
          throw new Error('Geen betalingssessie ontvangen');
        }

        if (mounted) {
          setClientSecret(data.clientSecret);
          setError(null);
        }
      } catch (err: any) {
        console.error('Payment intent error:', err);

        if (mounted) {
          if (attempt < STRIPE_CONFIG.maxRetries - 1) {
            // Retry with exponential backoff
            const delay = STRIPE_CONFIG.retryDelay * Math.pow(2, attempt);
            retryTimeout = setTimeout(() => {
              fetchPaymentIntent(attempt + 1);
            }, delay);
          } else {
            setError(getErrorMessage(err));
            props.onError(err.message);
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPaymentIntent();

    return () => {
      mounted = false;
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [props.orderId]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a] mx-auto mb-4"></div>
        <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
          Betaalopties worden geladen...
        </p>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg className="w-12 h-12 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-red-800 font-medium mb-4">
          {error || 'Er is een fout opgetreden bij het laden van de betaalopties.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Pagina vernieuwen
        </button>
      </div>
    );
  }

  const stripePromise = getStripe();

  if (!stripePromise) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Betaalsysteem configuratiefout</p>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: stripeAppearance,
        locale: 'nl',
      }}
    >
      <PaymentFormContent {...props} />
    </Elements>
  );
}