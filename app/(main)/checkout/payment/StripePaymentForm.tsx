'use client';

import { useEffect, useState, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripePaymentFormProps {
  orderId: number;
  total: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

type PaymentMethod = 'ideal' | 'card' | 'bancontact';

interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  icon?: string;
  iconType?: 'svg' | 'image';
  iconBg?: string;
}

const paymentMethods: PaymentMethodOption[] = [
  {
    id: 'ideal',
    name: 'iDEAL',
    icon: '/images/ideal.png',
    iconType: 'image',
    iconBg: 'bg-orange-50'
  },
  {
    id: 'card',
    name: 'Creditcard',
    iconType: 'svg',
    iconBg: 'bg-blue-50'
  },
  {
    id: 'bancontact',
    name: 'Bancontact',
    icon: '/images/bancontact.svg',
    iconType: 'image',
    iconBg: 'bg-purple-50'
  }
];

function PaymentForm({ orderId, total, onSuccess, onError }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('ideal');
  const formRef = useRef<HTMLFormElement>(null);

  // Hide Stripe's default UI elements and redirect text
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      /* Hide Stripe Payment Element but keep it functional */
      .stripe-payment-element-container {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
      
      /* Keep the element accessible for screen readers */
      .stripe-payment-element-container:focus-within {
        position: static;
        left: auto;
        width: auto;
        height: auto;
      }
      
      /* Hide redirect text */
      .RedirectText, .Text--redirect, [data-testid="next-action-text"],
      .p-Icon--redirectMobile, .p-Icon--redirectDesktop {
        display: none !important;
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Sync our custom UI with Stripe's internal payment method selection
  useEffect(() => {
    // Add a small delay to ensure Stripe elements are fully loaded
    const timer = setTimeout(() => {
      if (elements) {
        const stripeContainer = document.querySelector('.stripe-payment-element-container');
        if (stripeContainer) {
          // Find and click the corresponding Stripe tab
          const tabSelector = `[data-value="${selectedMethod}"]`;
          const tab = stripeContainer.querySelector(tabSelector);
          if (tab && tab instanceof HTMLElement) {
            tab.click();
          }
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedMethod, elements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Get order data from session storage for email
      const orderDataStr = sessionStorage.getItem('orderData');
      const orderData = orderDataStr ? JSON.parse(orderDataStr) : null;
      
      // Build full name from first and last name
      const fullName = `${orderData?.customer?.first_name || ''} ${orderData?.customer?.last_name || ''}`.trim() || 'Klant';
      
      // Confirm the payment with billing details provided programmatically
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/thank-you?order=${orderId}`,
          payment_method_data: {
            billing_details: {
              name: fullName,
              email: orderData?.customer?.email || 'klant@example.com',
              phone: orderData?.customer?.phone || '+31612345678',
              address: {
                line1: orderData?.customer?.address_1 || 'Onbekend adres',
                line2: orderData?.customer?.address_2 || null,
                city: orderData?.customer?.city || 'Onbekende stad',
                postal_code: orderData?.customer?.postcode || '1000AA',
                country: orderData?.customer?.country || 'NL',
                state: ''
              }
            }
          }
        },
        redirect: 'if_required',
      });

      if (error) {
        // Check if user cancelled the payment
        if (error.message?.includes('canceled') || error.message?.includes('cancelled')) {
          // Redirect to payment failed page for cancelled payments
          window.location.href = `/payment-failed?order=${orderId}&reason=cancelled`;
        } else {
          onError(error.message || 'Er is een fout opgetreden bij de betaling');
        }
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful - update order status
        try {
          const updateResponse = await window.fetch('/api/update-order-status', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({
              orderId: orderId,
              status: 'processing',
              paymentIntentId: paymentIntent.id
            }),
            credentials: 'same-origin'
          });
          
          if (!updateResponse.ok) {
            console.error('Failed to update order status, but payment was successful');
          }
        } catch (updateError) {
          console.error('Error updating order status:', updateError);
          // Don't block payment success - order status can be updated manually if needed
        }
        
        // Call success callback and redirect regardless of status update
        onSuccess();
        // Redirect to thank you page with order ID
        window.location.href = `/thank-you?order=${orderId}`;
      }
    } catch (err: any) {
      onError(err.message || 'Er is een fout opgetreden bij de betaling');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMethodClick = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Custom Payment Method Selector */}
      <div className="space-y-2 sm:space-y-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => handleMethodClick(method.id)}
            className={`w-full p-2.5 sm:p-3 rounded-xl border transition-all duration-200 ${
              selectedMethod === method.id
                ? 'bg-gray-50 border-gray-900'
                : 'bg-white border-gray-200 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Radio Button */}
              <div className="flex-shrink-0">
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 ${
                    selectedMethod === method.id
                      ? 'border-gray-900 bg-gray-900'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedMethod === method.id && (
                    <svg
                      className="w-full h-full text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Method Name */}
              <div className="flex-grow text-left">
                <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                  {method.name}
                </h4>
              </div>

              {/* Method Icon */}
              <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg ${method.iconBg}`}>
                {method.iconType === 'image' && method.icon ? (
                  <img
                    alt={method.name}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    src={method.icon}
                  />
                ) : method.id === 'card' ? (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                ) : null}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Hidden Stripe Payment Element Container */}
      <div className="stripe-payment-element-container" aria-hidden="true">
        <PaymentElement 
          options={{
            fields: {
              billingDetails: {
                name: 'never',
                email: 'never', 
                phone: 'never',
                address: 'never'
              }
            },
            wallets: {
              applePay: 'never',
              googlePay: 'never'
            },
            layout: {
              type: 'accordion',
              defaultCollapsed: false,
              radios: false,
              spacedAccordionItems: true
            },
            paymentMethodOrder: ['ideal', 'card', 'bancontact']
          }}
        />
      </div>

      {/* Additional form fields for card payments (if needed) */}
      {selectedMethod === 'card' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <p>Bij het klikken op betalen wordt u doorgestuurd naar een beveiligde pagina om uw kaartgegevens in te voeren.</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-amber-orange text-white py-4 px-6 rounded-md font-semibold hover:bg-amber-orange/90 transition-all transform hover:scale-[1.02] disabled:bg-gray-300 disabled:transform-none flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Betaling wordt verwerkt...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Betaal nu - €{total.toFixed(2)}
          </>
        )}
      </button>

      {/* Security Badges */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>256-bit SSL versleuteling</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>PCI-DSS compliant</span>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function StripePaymentForm({ orderId, total, onSuccess, onError }: StripePaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch payment intent with retry logic
    const fetchPaymentIntent = async (retryCount = 0) => {
      try {
        // Use native fetch to avoid extension interference
        const response = await window.fetch('/api/stripe-intent', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          },
          body: JSON.stringify({ orderId }),
          credentials: 'same-origin'
        });

        // Check if response is valid
        if (!response || !response.ok) {
          // Try to get error message
          let errorMessage = 'Failed to create payment intent';
          try {
            const data = await response.json();
            errorMessage = data.message || errorMessage;
          } catch {
            // If JSON parsing fails, use status text
            errorMessage = response?.statusText || errorMessage;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        
        if (!data.clientSecret) {
          throw new Error('No client secret received from server');
        }

        setClientSecret(data.clientSecret);
      } catch (error: any) {
        console.error('Payment intent fetch error:', error);
        
        // Retry logic for transient errors
        if (retryCount < 2 && !error.message?.includes('No client secret')) {
          console.log(`Retrying payment intent fetch (attempt ${retryCount + 1})...`);
          setTimeout(() => fetchPaymentIntent(retryCount + 1), 1000 * (retryCount + 1));
        } else {
          onError(error.message || 'Er is een fout opgetreden bij het laden van de betaalpagina');
          setLoading(false);
        }
      } finally {
        if (retryCount === 0 || retryCount >= 2) {
          setLoading(false);
        }
      }
    };

    fetchPaymentIntent();
  }, [orderId, onError]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green mx-auto mb-4"></div>
        <p className="text-gray-600">Betaalopties worden geladen...</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Er is een fout opgetreden bij het laden van de betaalopties.</p>
      </div>
    );
  }

  const options = {
    clientSecret,
    locale: 'nl' as const,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#93c84a',
        colorBackground: '#ffffff',
        colorText: '#333333',
        colorDanger: '#df1b41',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '8px',
      },
      rules: {
        '.Label': {
          color: '#333333',
        },
        '.Tab': {
          border: '1px solid #E0E0E0',
          boxShadow: 'none',
        },
        '.Tab--selected': {
          border: '1px solid #93c84a',
          backgroundColor: '#f0f9ff',
        },
        '.Input': {
          border: '1px solid #E0E0E0',
        },
        '.Input:focus': {
          border: '1px solid #93c84a',
          boxShadow: '0 0 0 1px #93c84a',
        },
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm orderId={orderId} total={total} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
}