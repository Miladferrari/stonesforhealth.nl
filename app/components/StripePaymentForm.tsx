'use client';

import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
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

export interface StripePaymentFormHandle {
  submit: () => void;
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

const PaymentForm = forwardRef<StripePaymentFormHandle, StripePaymentFormProps>(({ orderId, total, onSuccess, onError }, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('ideal');
  const formRef = useRef<HTMLFormElement>(null);

  // Expose submit method to parent component
  useImperativeHandle(ref, () => ({
    submit: () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  }));

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
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
      {/* Custom Payment Method Selector */}
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="border border-[#d1d5db] rounded-lg overflow-hidden"
          >
            <label className="block p-4 cursor-pointer hover:bg-gray-50 transition-all">
              <div className="flex items-center">
                {/* Radio Button */}
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => handleMethodClick(method.id)}
                  className="mr-3 text-[#492c4a] focus:ring-[#492c4a]"
                />
                {/* Method Name */}
                <span className="text-base text-[#1a1a1a] font-[family-name:var(--font-eb-garamond)]">
                  {method.name}
                </span>
              </div>
            </label>
          </div>
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
    </form>
  );
});

PaymentForm.displayName = 'PaymentForm';

/**
 * PaymentFormStandalone - Shows payment method selection UI without Stripe Elements
 * Used when no clientSecret is available (e.g., when orderId is 0 or invalid)
 */
function PaymentFormStandalone({ orderId, total, onSuccess, onError }: StripePaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('ideal');

  const handleMethodClick = (methodId: PaymentMethod) => {
    setSelectedMethod(methodId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For standalone mode, we can't process payment without a valid orderId
    // Just show a message to complete order details first
    onError('Vul eerst je ordergegevens in om de betaling te voltooien.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Custom Payment Method Selector */}
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="border border-[#d1d5db] rounded-lg overflow-hidden"
          >
            <label className="block p-4 cursor-pointer hover:bg-gray-50 transition-all">
              <div className="flex items-center">
                {/* Radio Button */}
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => handleMethodClick(method.id)}
                  className="mr-3 text-[#492c4a] focus:ring-[#492c4a]"
                />
                {/* Method Name */}
                <span className="text-base text-[#1a1a1a] font-[family-name:var(--font-eb-garamond)]">
                  {method.name}
                </span>
              </div>
            </label>
          </div>
        ))}
      </div>

    </form>
  );
}

const StripePaymentForm = forwardRef<StripePaymentFormHandle, StripePaymentFormProps>(({ orderId, total, onSuccess, onError }, ref) => {
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

    // Only fetch payment intent if we have a valid orderId
    if (orderId && orderId > 0) {
      fetchPaymentIntent();
    } else {
      // If no valid orderId, set loading to false to show the payment form UI
      setLoading(false);
    }
  }, [orderId, onError]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green mx-auto mb-4"></div>
        <p className="text-gray-600">Betaalopties worden geladen...</p>
      </div>
    );
  }

  // If no clientSecret, show the payment UI without Stripe Elements wrapper
  if (!clientSecret) {
    return <PaymentFormStandalone orderId={orderId} total={total} onSuccess={onSuccess} onError={onError} />;
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
      <PaymentForm ref={ref} orderId={orderId} total={total} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
});

StripePaymentForm.displayName = 'StripePaymentForm';

export default StripePaymentForm;