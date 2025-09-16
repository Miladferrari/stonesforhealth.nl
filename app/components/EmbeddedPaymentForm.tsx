'use client';

import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  CardElement,
  IdealBankElement,
} from '@stripe/react-stripe-js';
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentFormProps {
  clientSecret: string;
  orderId: string;
  paymentMethod: 'card' | 'ideal' | 'bancontact';
  onSuccess: () => void;
  onError: (error: string) => void;
  customerName?: string;
  customerEmail?: string;
}

function CheckoutForm({ orderId, paymentMethod, onSuccess, onError, customerName, customerEmail }: Omit<PaymentFormProps, 'clientSecret'>) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Hide billing fields for iDEAL and Bancontact
  useEffect(() => {
    if (paymentMethod === 'ideal' || paymentMethod === 'bancontact') {
      const styleId = 'hide-billing-fields-style';
      let styleElement = document.getElementById(styleId);

      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = `
          /* Hide name and email fields for iDEAL and Bancontact */
          #Field-nameInput,
          #Field-emailInput,
          label[for="Field-nameInput"],
          label[for="Field-emailInput"],
          .p-Field:has(#Field-nameInput),
          .p-Field:has(#Field-emailInput) {
            display: none !important;
            height: 0 !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        `;
        document.head.appendChild(styleElement);
      }

      return () => {
        if (styleElement && styleElement.parentNode) {
          styleElement.parentNode.removeChild(styleElement);
        }
      };
    }
  }, [paymentMethod]);

  // Handle form submission from external button
  useEffect(() => {
    const handleExternalSubmit = async () => {
      if (!stripe || !elements || isProcessing) {
        return;
      }

      setIsProcessing(true);
      setErrorMessage('');

      try {
        // Get customer data from session storage for address
        const orderData = sessionStorage.getItem('orderData');
        const parsedOrderData = orderData ? JSON.parse(orderData) : null;

        // Extract address details from form data
        const formData = parsedOrderData?.formData || {};
        const countryCode = formData.country || 'NL';

        // Prepare billing details with address
        const billingDetails = {
          name: customerName || `${formData.firstName} ${formData.lastName}`.trim(),
          email: customerEmail || formData.email,
          address: {
            line1: formData.address || '',
            line2: '',
            city: formData.city || '',
            state: '', // Required by Stripe even if not applicable for NL/BE
            postal_code: formData.postalCode || '',
            country: countryCode.toUpperCase(), // Ensure uppercase country code
          },
        };

        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/thank-you?order=${orderId}`,
            payment_method_data: {
              billing_details: billingDetails,
            },
          },
          redirect: 'if_required',
        });

        if (error) {
          setErrorMessage(error.message || 'Er is een fout opgetreden tijdens de betaling');
          onError(error.message || 'Payment failed');
        } else {
          // Payment succeeded
          onSuccess();
        }
      } catch (error: any) {
        setErrorMessage('Er is een fout opgetreden tijdens de betaling');
        onError(error.message || 'Payment failed');
      } finally {
        setIsProcessing(false);
      }
    };

    // Add global function to submit payment
    (window as any).submitPayment = handleExternalSubmit;

    return () => {
      delete (window as any).submitPayment;
    };
  }, [stripe, elements, isProcessing, orderId, onSuccess, onError, customerName, customerEmail, paymentMethod]);

  return (
    <div className="space-y-4">
      <form data-payment-form className="space-y-4">
        <PaymentElement
          options={{
            layout: 'tabs',
            paymentMethodOrder: paymentMethod === 'card' ? ['card'] :
                               paymentMethod === 'ideal' ? ['ideal'] :
                               ['bancontact'],
            defaultValues: {
              billingDetails: {
                name: customerName || '',
                email: customerEmail || '',
              },
            },
            fields: {
              billingDetails: {
                address: 'never',
              },
            },
            wallets: {
              applePay: 'never',
              googlePay: 'never',
            },
          }}
        />
      </form>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mt-3">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default function EmbeddedPaymentForm({ clientSecret, orderId, paymentMethod, onSuccess, onError, customerName, customerEmail }: PaymentFormProps) {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#059669',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
      rules: {
        '.Tab': {
          border: '1px solid #e5e7eb',
          boxShadow: 'none',
        },
        '.Tab--selected': {
          borderColor: '#059669',
          boxShadow: 'none',
        },
        '.Input': {
          border: '1px solid #e5e7eb',
          boxShadow: 'none',
        },
        '.Input:focus': {
          border: '1px solid #059669',
          boxShadow: '0 0 0 3px rgba(5, 150, 105, 0.1)',
        },
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        orderId={orderId}
        paymentMethod={paymentMethod}
        onSuccess={onSuccess}
        onError={onError}
        customerName={customerName}
        customerEmail={customerEmail}
      />
    </Elements>
  );
}