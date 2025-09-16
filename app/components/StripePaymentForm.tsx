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
  shouldAutoSubmit?: boolean;
  onReady?: () => void;
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

    // Simplified payment handling - no backend calls
    // Will be handled by WooCommerce Store API
    try {
      // Placeholder for Store API integration
      setIsProcessing(false);
      onError('Payment processing through WooCommerce Store API coming soon.');
      return;
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

const StripePaymentForm = forwardRef<StripePaymentFormHandle, StripePaymentFormProps>(({ orderId, total, onSuccess, onError, shouldAutoSubmit, onReady }, ref) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Payment intent fetching removed - will be handled by WooCommerce Store API
    // Always show payment form UI without attempting to fetch
    setLoading(false);
  }, []);

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