'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  PaymentElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Initialize Stripe with the publishable key from environment variables
 * This creates a Stripe instance that will be used throughout the payment flow
 */
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

/**
 * Interface for the order data structure
 */
interface OrderData {
  id: number;
  order_key: string;
  status: string;
  total: string;
  currency: string;
  customer: {
    email: string;
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postcode: string;
    phone?: string;
  };
  shipping_method: string;
  shipping_total: string;
  items: Array<{
    name: string;
    quantity: number;
    price: string;
    images?: Array<{ src: string }>;
  }>;
  coupon?: {
    code: string;
    amount: string;
    discount_type: string;
  };
}

/**
 * CheckoutForm Component
 * Handles the actual payment form and submission
 */
interface CheckoutFormProps {
  orderId: string;
  orderData: OrderData;
  returnUrl: string;
}

function CheckoutForm({ orderId, orderData, returnUrl }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  /**
   * Handle form submission
   * Confirms the payment with Stripe and handles the response
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Confirm the payment with Stripe
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
          payment_method_data: {
            billing_details: {
              email: orderData.customer.email,
              name: `${orderData.customer.first_name} ${orderData.customer.last_name}`,
              address: {
                line1: orderData.customer.address_1,
                city: orderData.customer.city,
                postal_code: orderData.customer.postcode,
                country: 'NL',
              },
              phone: orderData.customer.phone,
            },
          },
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        // Show error to customer
        if (confirmError.type === 'card_error' || confirmError.type === 'validation_error') {
          setError(confirmError.message || 'Er is een fout opgetreden bij de betaling');
        } else {
          setError('Er is een onverwachte fout opgetreden. Probeer het opnieuw.');
        }
        setProcessing(false);
      } else {
        // Payment succeeded without redirect
        setSucceeded(true);
        // Redirect to thank you page
        router.push(`/thank-you?order=${orderId}`);
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError('Er is een fout opgetreden bij het verwerken van je betaling.');
      setProcessing(false);
    }
  };

  return (
    <form id="stripe-payment-form" onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Element - Stripe's UI component */}
      <div id="payment-element" className="p-4 border border-gray-200 rounded-lg">
        <PaymentElement 
          options={{
            layout: 'tabs',
            fields: {
              billingDetails: {
                address: 'never', // We already have this from checkout
              }
            },
            wallets: {
              applePay: 'auto',
              googlePay: 'auto',
            },
            // Show all payment methods we support
            paymentMethodOrder: ['card', 'ideal', 'bancontact']
          }}
        />
      </div>
      
      {/* Error message display */}
      {error && (
        <div className="text-red-500 mt-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}
      
      {/* Submit button */}
      <button
        type="submit"
        disabled={!stripe || processing || succeeded}
        className="w-full bg-amber-orange text-white py-4 px-6 rounded-md font-semibold hover:bg-amber-orange/90 transition-all transform hover:scale-[1.02] disabled:bg-gray-300 disabled:transform-none flex items-center justify-center"
      >
        {processing ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Betaling verwerken...
          </>
        ) : succeeded ? (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Betaling geslaagd!
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Betaal nu - €{parseFloat(orderData.total).toFixed(2)}
          </>
        )}
      </button>

      {/* Security badges */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>256-bit SSL versleuteling</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>PCI-DSS compliant</span>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">
          Powered by Stripe - Miljoenen bedrijven vertrouwen op Stripe
        </p>
      </div>
    </form>
  );
}

/**
 * Main Stripe Payment Page Component
 * Handles the payment flow for credit card payments
 */
function StripePaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [clientSecret, setClientSecret] = useState<string>('');
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch payment intent on component mount
   * Gets the client secret needed to initialize Stripe Elements
   */
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        // Get order data from session storage
        const storedOrderData = sessionStorage.getItem('orderData');
        const pendingOrderId = sessionStorage.getItem('pendingOrderId');
        
        if (!storedOrderData || !pendingOrderId) {
          router.push('/checkout');
          return;
        }
        
        const data = JSON.parse(storedOrderData);
        setOrderData(data);
        
        // Fetch payment intent from API with enhanced error handling
        console.log('Fetching payment intent for order:', data.id);
        
        const response = await fetch('/api/stripe-intent', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ 
            orderId: data.id 
          }),
        });
        
        // Parse response body once
        let responseData;
        const responseText = await response.text();
        
        try {
          responseData = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse JSON:', {
            responseText,
            status: response.status,
            statusText: response.statusText
          });
          throw new Error('Invalid JSON from /api/stripe-intent');
        }
        
        // Check if response is ok
        if (!response.ok) {
          console.error('Intent fetch failed:', {
            status: response.status,
            statusText: response.statusText,
            body: responseData,
          });
          throw new Error(responseData.message || 'Failed to create payment intent');
        }
        
        // Validate response has required fields
        if (!responseData.clientSecret) {
          console.error('Invalid response from stripe-intent:', responseData);
          throw new Error('No client secret received from payment API');
        }
        
        console.log('Payment intent created successfully');
        const result = responseData;
        
        // Set the client secret for Stripe Elements
        setClientSecret(result.clientSecret);
        setLoading(false);
        
      } catch (err: any) {
        console.error('Error fetching payment intent:', err);
        setError(err.message || 'Er ging iets mis bij het laden van de betaalpagina');
        setLoading(false);
      }
    };
    
    fetchPaymentIntent();
  }, [router]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green mx-auto mb-4"></div>
          <p className="text-gray-900">Betaalpagina wordt geladen...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !orderData || !clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Fout bij laden betaalpagina</h2>
          <p className="text-gray-600 mb-6">{error || 'Er ging iets mis'}</p>
          <Link 
            href="/checkout" 
            className="inline-block bg-medical-green text-white px-6 py-3 rounded-md font-medium hover:bg-medical-green/90 transition-colors"
          >
            Terug naar checkout
          </Link>
        </div>
      </div>
    );
  }

  const returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://stonesforhealth.nl'}/thank-you?order=${orderData.id}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Veilig betalen</h1>
          <p className="text-gray-600">Beveiligde betaling via Stripe</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Betaalgegevens</h2>
              
              {/* Stripe Elements wrapper */}
              <Elements 
                stripe={stripePromise} 
                options={{ 
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#10b981', // medical-green
                      colorBackground: '#ffffff',
                      colorText: '#111827',
                      colorDanger: '#ef4444',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      borderRadius: '6px',
                    },
                  },
                }}
              >
                <CheckoutForm 
                  orderId={orderData.id.toString()} 
                  orderData={orderData}
                  returnUrl={returnUrl}
                />
              </Elements>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Besteloverzicht</h3>
              
              {/* Products */}
              <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600 flex-1 pr-2">
                      {item.name} {item.quantity > 1 && `(${item.quantity}x)`}
                    </span>
                    <span className="text-gray-900 font-medium">
                      €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                {orderData.coupon && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Korting ({orderData.coupon.code})</span>
                    <span className="text-green-600">-€{orderData.coupon.amount}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Verzending</span>
                  <span className="text-gray-900">€{parseFloat(orderData.shipping_total).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span className="text-gray-900">Totaal</span>
                  <span className="text-amber-orange">€{parseFloat(orderData.total).toFixed(2)}</span>
                </div>
              </div>

              {/* Contact info */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Contactgegevens</h4>
                <p className="text-sm text-gray-600">{orderData.customer.email}</p>
                {orderData.customer.phone && (
                  <p className="text-sm text-gray-600">{orderData.customer.phone}</p>
                )}
              </div>

              {/* Delivery address */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Bezorgadres</h4>
                <div className="text-sm text-gray-600">
                  <p>{orderData.customer.first_name} {orderData.customer.last_name}</p>
                  <p>{orderData.customer.address_1}</p>
                  <p>{orderData.customer.postcode} {orderData.customer.city}</p>
                </div>
              </div>

              {/* Support info */}
              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-xs text-gray-500">
                  Hulp nodig? Bel ons op{' '}
                  <a href="tel:+31612345678" className="text-medical-green hover:underline">
                    +31 6 12345678
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Export the page wrapped in Suspense boundary
 * Required for Next.js 13+ when using useSearchParams
 */
export default function StripePaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green mx-auto mb-4"></div>
          <p className="text-gray-900">Pagina wordt geladen...</p>
        </div>
      </div>
    }>
      <StripePaymentContent />
    </Suspense>
  );
}