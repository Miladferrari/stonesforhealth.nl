'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/app/contexts/CartContextStoreAPI';
import TrustpilotWidget from '@/app/components/TrustpilotWidget';
import dynamic from 'next/dynamic';

// Dynamically import payment form to avoid SSR issues
const EmbeddedPaymentForm = dynamic(
  () => import('@/app/components/EmbeddedPaymentForm'),
  { ssr: false }
);

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, clearCart, getDiscountAmount, getTotalPrice, getShippingCost, getFinalTotal } = useCart();

  // Get order details from URL params
  const orderId = searchParams?.get('orderId') || null;
  const orderTotal = searchParams?.get('total') || null;

  // Payment states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('ideal');
  const [paymentReady, setPaymentReady] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Calculate pricing
  const subtotal = getTotalPrice();
  const discountAmount = getDiscountAmount();
  const shippingCost = getShippingCost();
  const total = getFinalTotal();

  // Validate order data on mount
  useEffect(() => {
    if (!orderId || !orderTotal) {
      router.push('/checkout');
      return;
    }

    // Get order data from session
    const orderData = sessionStorage.getItem('orderData');
    if (!orderData) {
      router.push('/checkout');
      return;
    }

    // Initialize payment intent
    initializePayment();
  }, [orderId, orderTotal]);

  // Create payment intent when payment method is selected
  useEffect(() => {
    if (paymentReady && selectedPaymentMethod && orderId && orderTotal && !loading) {
      createPaymentIntent();
    }
  }, [selectedPaymentMethod, paymentReady]);

  const initializePayment = async () => {
    try {
      setIsInitializing(true);
      setPaymentReady(true);
    } catch (error: any) {
      console.error('Payment initialization error:', error);
      setError('Failed to initialize payment. Please try again.');
    } finally {
      setIsInitializing(false);
    }
  };

  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      setError('');
      setClientSecret(null);
      setShowPaymentForm(false);

      // Get customer data from session storage
      const orderData = sessionStorage.getItem('orderData');
      const parsedOrderData = orderData ? JSON.parse(orderData) : null;
      const customerEmail = parsedOrderData?.formData?.email || '';
      const customerName = `${parsedOrderData?.formData?.firstName || ''} ${parsedOrderData?.formData?.lastName || ''}`.trim();

      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: parseInt(orderId!),
          amount: parseFloat(orderTotal!),
          currency: 'eur',
          paymentMethod: selectedPaymentMethod,
          customerEmail: customerEmail,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create payment intent');
      }

      const { clientSecret: secret } = await response.json();
      setClientSecret(secret);
      setShowPaymentForm(true);

    } catch (error: any) {
      console.error('Payment intent error:', error);
      setError(error.message || 'Er is een fout opgetreden bij het voorbereiden van de betaling.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    // Clear cart
    clearCart();

    // Clear session data
    sessionStorage.removeItem('checkoutFormData');
    sessionStorage.removeItem('selectedShippingRate');
    sessionStorage.removeItem('pendingOrderId');
    sessionStorage.removeItem('orderData');

    // Redirect to thank you page
    router.push(`/thank-you?order=${orderId}`);
  };

  const handlePaymentError = (error: string) => {
    setError(error);
    setLoading(false);
  };

  const handlePayNow = async () => {
    // Trigger the payment submission in the embedded form
    if ((window as any).submitPayment) {
      (window as any).submitPayment();
    }
  };

  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
    setError(''); // Clear any errors when changing payment method
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a] mb-4"></div>
            <p className="text-[#2D2D2D] font-[family-name:var(--font-eb-garamond)]">Betaling wordt voorbereid...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        {/* Mobile order summary toggle */}
        <div className="lg:hidden">
          <button
            type="button"
            className="w-full bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between font-medium text-base text-[#1a1a1a] font-[family-name:var(--font-eb-garamond)]"
            onClick={() => setShowOrderSummary(!showOrderSummary)}
          >
            <span className="flex items-center gap-2">
              <span className="text-base">Besteloverzicht</span>
              <span className="inline-flex items-center">
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${showOrderSummary ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">EUR</span>
              <span className="text-xl font-bold text-[#492c4a]">{`€ ${total.toFixed(2).replace('.', ',')}`}</span>
            </div>
          </button>
        </div>

        {/* Mobile order summary content - same as desktop but in mobile layout */}
        {showOrderSummary && (
          <div className="lg:hidden bg-gray-50 border-b border-gray-200">
            <div className="px-4 py-6">
              {/* Products section */}
              <section className="mb-6">
                <div className="max-h-64 overflow-y-auto overflow-x-hidden pr-1">
                  <div role="table" className="space-y-3 pb-2">
                    {items.map((item: any, index: number) => (
                      <div key={item.product.id} role="row" className={`flex gap-3 ${index > 0 ? 'pt-3 border-t border-gray-200' : ''}`}>
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 bg-white">
                              <Image
                                src={item.product.images?.[0]?.src || '/placeholder.png'}
                                alt={item.product.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-[#492c4a] text-white text-xs min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center font-semibold border-2 border-white">
                              {item.quantity}
                            </div>
                          </div>
                        </div>
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-medium text-black font-[family-name:var(--font-eb-garamond)] leading-tight">
                            {item.product.name}
                          </p>
                        </div>
                        {/* Price */}
                        <div className="text-right">
                          <span className="text-base font-medium text-black font-[family-name:var(--font-eb-garamond)]">
                            {`€ ${(parseFloat(item.product.price) * item.quantity).toFixed(2).replace('.', ',')}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Coupon section */}
              <section className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Kortingscode of cadeaubon"
                    className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md text-base text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] font-[family-name:var(--font-eb-garamond)]"
                  />
                  <button
                    type="button"
                    className="px-4 py-2.5 bg-gray-200 text-gray-400 rounded-md text-base font-medium cursor-not-allowed font-[family-name:var(--font-eb-garamond)]"
                    disabled
                  >
                    Toepassen
                  </button>
                </div>
              </section>

              {/* Summary section */}
              <section>
                <div className="border-t border-[#e5e7eb] pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-base text-black font-medium font-[family-name:var(--font-eb-garamond)]">
                        Subtotaal · {items.reduce((acc: number, item: any) => acc + item.quantity, 0)} artikelen
                      </span>
                      <span className="text-base text-black font-medium font-[family-name:var(--font-eb-garamond)]">
                        {`€ ${subtotal.toFixed(2).replace('.', ',')}`}
                      </span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-base text-green-600 font-medium font-[family-name:var(--font-eb-garamond)]">Korting</span>
                        <span className="text-base text-green-600 font-medium font-[family-name:var(--font-eb-garamond)]">
                          {`-€ ${discountAmount.toFixed(2).replace('.', ',')}`}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-base text-black font-medium font-[family-name:var(--font-eb-garamond)]">Verzending</span>
                      <span className="text-base text-black font-medium font-[family-name:var(--font-eb-garamond)]">
                        {shippingCost > 0 ? `€ ${shippingCost.toFixed(2).replace('.', ',')}` : 'Gratis'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 mt-3">
                      <strong className="text-xl font-bold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">Totaal</strong>
                      <div className="flex items-center gap-2">
                        <span className="text-base text-black/70 font-medium font-[family-name:var(--font-eb-garamond)]">EUR</span>
                        <strong className="text-2xl font-bold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">
                          {`€ ${total.toFixed(2).replace('.', ',')}`}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        <div className="relative max-w-7xl mx-auto w-full flex flex-col lg:flex-row min-h-screen px-4 sm:px-6 lg:px-8">
          {/* Main payment form - left side */}
          <div className="flex-1 lg:flex-initial lg:w-3/5 py-8 pr-0 lg:pr-8 bg-[#f9fafb]">
          {/* Back button and Progress indicator */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/checkout')}
              className="mb-6 flex items-center gap-2 text-[#492c4a] hover:text-[#6b4069] transition-all hover:gap-3 font-[family-name:var(--font-eb-garamond)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span className="text-base">Terug naar gegevens</span>
            </button>

            <div className="flex items-center justify-center lg:justify-start">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#492c4a] text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="ml-3 text-[#492c4a] font-medium font-[family-name:var(--font-eb-garamond)]">Gegevens</span>
                <div className="w-20 h-1 mx-4 bg-gray-300"></div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 text-white">
                  <span>2</span>
                </div>
                <span className="ml-3 font-semibold text-gray-600 font-[family-name:var(--font-eb-garamond)]">Betaling</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
              <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="font-[family-name:var(--font-eb-garamond)]">{error}</span>
            </div>
          )}

          {/* Payment content */}
          <div className="space-y-8">
            {/* Payment method selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">Betaling</h2>
              <p className="text-base text-gray-600 mb-6 font-[family-name:var(--font-eb-garamond)]">Alle transacties zijn beveiligd en versleuteld.</p>

              <div className="space-y-3">
                {/* iDEAL */}
                <div>
                  <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${selectedPaymentMethod === 'ideal' ? 'border-[#492c4a] bg-[#492c4a]/5' : 'border-[#E8DCC6] hover:border-[#492c4a]/50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="ideal"
                          checked={selectedPaymentMethod === 'ideal'}
                          onChange={(e) => handlePaymentMethodChange(e.target.value)}
                          className="mr-3 text-[#492c4a] focus:ring-[#492c4a]"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#2D2D2D] font-[family-name:var(--font-eb-garamond)]">iDEAL</p>
                          <p className="text-sm text-gray-600 mt-1 font-[family-name:var(--font-eb-garamond)]">Betaal met uw Nederlandse bank</p>
                        </div>
                      </div>
                    </div>
                  </label>
                  {/* Show payment form for iDEAL when selected */}
                  {selectedPaymentMethod === 'ideal' && showPaymentForm && clientSecret && (
                    <div className="mt-3 ml-4 mr-4 mb-2">
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <EmbeddedPaymentForm
                          clientSecret={clientSecret}
                          orderId={orderId!}
                          paymentMethod="ideal"
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                          customerName={(() => {
                            const orderData = sessionStorage.getItem('orderData');
                            const parsedOrderData = orderData ? JSON.parse(orderData) : null;
                            return `${parsedOrderData?.formData?.firstName || ''} ${parsedOrderData?.formData?.lastName || ''}`.trim();
                          })()}
                          customerEmail={(() => {
                            const orderData = sessionStorage.getItem('orderData');
                            const parsedOrderData = orderData ? JSON.parse(orderData) : null;
                            return parsedOrderData?.formData?.email || '';
                          })()}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bancontact */}
                <div>
                  <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${selectedPaymentMethod === 'bancontact' ? 'border-[#492c4a] bg-[#492c4a]/5' : 'border-[#E8DCC6] hover:border-[#492c4a]/50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bancontact"
                          checked={selectedPaymentMethod === 'bancontact'}
                          onChange={(e) => handlePaymentMethodChange(e.target.value)}
                          className="mr-3 text-[#492c4a] focus:ring-[#492c4a]"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#2D2D2D] font-[family-name:var(--font-eb-garamond)]">Bancontact</p>
                          <p className="text-sm text-gray-600 mt-1 font-[family-name:var(--font-eb-garamond)]">Betaal met uw Belgische bank</p>
                        </div>
                      </div>
                    </div>
                  </label>
                  {/* Show payment form for Bancontact when selected */}
                  {selectedPaymentMethod === 'bancontact' && showPaymentForm && clientSecret && (
                    <div className="mt-3 ml-4 mr-4 mb-2">
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <EmbeddedPaymentForm
                          clientSecret={clientSecret}
                          orderId={orderId!}
                          paymentMethod="bancontact"
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                          customerName={(() => {
                            const orderData = sessionStorage.getItem('orderData');
                            const parsedOrderData = orderData ? JSON.parse(orderData) : null;
                            return `${parsedOrderData?.formData?.firstName || ''} ${parsedOrderData?.formData?.lastName || ''}`.trim();
                          })()}
                          customerEmail={(() => {
                            const orderData = sessionStorage.getItem('orderData');
                            const parsedOrderData = orderData ? JSON.parse(orderData) : null;
                            return parsedOrderData?.formData?.email || '';
                          })()}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Credit/Debit Card */}
                <div>
                  <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${selectedPaymentMethod === 'card' ? 'border-[#492c4a] bg-[#492c4a]/5' : 'border-[#E8DCC6] hover:border-[#492c4a]/50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={selectedPaymentMethod === 'card'}
                          onChange={(e) => handlePaymentMethodChange(e.target.value)}
                          className="mr-3 text-[#492c4a] focus:ring-[#492c4a]"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#2D2D2D] font-[family-name:var(--font-eb-garamond)]">Credit/Debit Card</p>
                          <p className="text-sm text-gray-600 mt-1 font-[family-name:var(--font-eb-garamond)]">Betaal veilig met uw creditcard</p>
                        </div>
                      </div>
                      {/* Card Logos */}
                      <div className="flex gap-1 flex-shrink-0 ml-3">
                        {/* Visa Logo */}
                        <div className="bg-white border border-gray-200 px-1.5 py-1 rounded">
                          <svg className="h-3 w-auto" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 2l-2 12h-3l2-12h3zm12 0l-1.5 8L29 2h-3l3 12h2l4-12h-3zm-16 0c-1 0-2 .5-2.5 1L11 14h3l.5-2h3l.5 2h3l-2-12h-3zm1 3l1 4h-2l1-4zm8 0v2c1 0 2 .5 2 1.5S26 10 25 10h-1v4h3v-2c2 0 4-1 4-3s-2-3-4-3h-2z" fill="#1A1F71"/>
                          </svg>
                        </div>
                        {/* Mastercard Logo */}
                        <div className="bg-white border border-gray-200 px-1.5 py-1 rounded">
                          <svg className="h-3 w-auto" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="7" fill="#EB001B"/>
                            <circle cx="22" cy="10" r="7" fill="#F79E1B"/>
                            <path d="M16 4a7 7 0 000 12 7 7 0 000-12z" fill="#FF5F00"/>
                          </svg>
                        </div>
                        {/* Maestro Logo */}
                        <div className="bg-white border border-gray-200 px-1.5 py-1 rounded hidden sm:block">
                          <svg className="h-3 w-auto" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="7" fill="#EB001B"/>
                            <circle cx="22" cy="10" r="7" fill="#00A2E5"/>
                            <path d="M16 4a7 7 0 000 12 7 7 0 000-12z" fill="#7375CF"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </label>
                  {/* Show payment form for Card when selected */}
                  {selectedPaymentMethod === 'card' && showPaymentForm && clientSecret && (
                    <div className="mt-3 ml-4 mr-4 mb-2">
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <EmbeddedPaymentForm
                          clientSecret={clientSecret}
                          orderId={orderId!}
                          paymentMethod="card"
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                          customerName={(() => {
                            const orderData = sessionStorage.getItem('orderData');
                            const parsedOrderData = orderData ? JSON.parse(orderData) : null;
                            return `${parsedOrderData?.formData?.firstName || ''} ${parsedOrderData?.formData?.lastName || ''}`.trim();
                          })()}
                          customerEmail={(() => {
                            const orderData = sessionStorage.getItem('orderData');
                            const parsedOrderData = orderData ? JSON.parse(orderData) : null;
                            return parsedOrderData?.formData?.email || '';
                          })()}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>


            {/* Payment button - always visible but changes based on state */}
            <button
              onClick={handlePayNow}
              disabled={loading || !orderId || !showPaymentForm}
              className="w-full bg-amber-orange text-black py-4 px-6 rounded-md font-semibold hover:bg-amber-orange/90 transition-all transform hover:scale-[1.02] disabled:bg-gray-300 disabled:transform-none flex items-center justify-center font-[family-name:var(--font-eb-garamond)] text-2xl mt-6"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Betaling voorbereiden...
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  {showPaymentForm ? `Betaal nu - €${orderTotal || '0.00'}` : 'Selecteer een betaalmethode'}
                </>
              )}
            </button>

            {/* Security notice */}
            <div className="flex items-center space-x-2 mt-6 pt-6 border-t border-[#e5e7eb]">
              <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <span className="text-base text-[#6b7280] font-[family-name:var(--font-eb-garamond)]">Veilig en versleuteld</span>
            </div>
            </div>
          </div>

          {/* Order summary - right side (desktop) */}
          <div className="hidden lg:block lg:w-2/5 bg-gray-100">
            <div className="sticky top-0 h-screen overflow-y-auto py-8 pl-8 pr-8 bg-gray-100">
          {/* Trust banner */}
          <div className="mb-4">
            <img
              loading="eager"
              alt="Trust banner"
              className="w-full h-auto"
              src="https://cdn.shopify.com/s/files/1/0762/7286/1524/files/Figma_2024-09-25_10.52.45.png?v=1727254377"
            />
          </div>

          {/* Cart items */}
          <div className="pb-4">
            <div className="max-h-80 overflow-y-auto pr-1" role="table">
              <div className="sr-only" role="rowgroup">
                <div role="row">
                  <div role="columnheader">Productafbeelding</div>
                  <div role="columnheader">Beschrijving</div>
                  <div role="columnheader">Aantal</div>
                  <div role="columnheader">Prijs</div>
                </div>
              </div>
              <div role="rowgroup">
                {items.map((item) => (
                  <div key={item.product.id} role="row" className="flex items-start gap-3 py-3">
                    <div role="cell" className="flex-shrink-0">
                      <div className="w-16 h-16">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 bg-white">
                            <Image
                              src={item.product.images?.[0]?.src || '/placeholder.png'}
                              alt={item.product.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-[#492c4a] text-white text-xs min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center font-semibold border-2 border-white">
                            <span className="sr-only">Aantal</span>
                            <span>{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div role="cell" className="flex-1 min-w-0">
                      <p className="text-base font-medium text-black font-[family-name:var(--font-eb-garamond)] leading-tight">
                        {item.product.name}
                      </p>
                    </div>
                    <div role="cell" className="sr-only">
                      <span>{item.quantity}</span>
                    </div>
                    <div role="cell" className="text-right">
                      <span className="text-base font-medium text-black font-[family-name:var(--font-eb-garamond)]">
                        {`€ ${(parseFloat(item.product.price) * item.quantity).toFixed(2).replace('.', ',')}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coupon input */}
          <div className="pb-4">
            <div className="border-t border-[#e5e7eb] pt-4">
              <div className="flex gap-2">
                <input
                  placeholder="Kortingscode of cadeaubon"
                  className="flex-1 px-3 py-2 border border-[#d1d5db] rounded-md text-base text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] font-[family-name:var(--font-eb-garamond)]"
                  type="text"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 border border-gray-300 text-black rounded-md text-base font-medium cursor-not-allowed font-[family-name:var(--font-eb-garamond)] transition-colors"
                  disabled
                >
                  Toepassen
                </button>
              </div>
            </div>
          </div>

          {/* Price breakdown */}
          <div className="pb-6">
            <div className="border-t border-[#e5e7eb] pt-4">
              <div role="table" className="space-y-2">
                <div role="rowgroup" className="space-y-2">
                  <div role="row" className="flex justify-between">
                    <div role="rowheader">
                      <span className="text-base text-black font-medium font-[family-name:var(--font-eb-garamond)]">
                        Subtotaal · {items.reduce((acc, item) => acc + item.quantity, 0)} artikelen
                      </span>
                    </div>
                    <div role="cell">
                      <span className="text-base text-black font-medium font-[family-name:var(--font-eb-garamond)]">
                        {`€ ${subtotal.toFixed(2).replace('.', ',')}`}
                      </span>
                    </div>
                  </div>

                  {discountAmount > 0 && (
                    <div role="row" className="flex justify-between">
                      <div role="rowheader">
                        <span className="text-base text-green-600 font-medium font-[family-name:var(--font-eb-garamond)]">Korting</span>
                      </div>
                      <div role="cell">
                        <span className="text-base font-medium font-[family-name:var(--font-eb-garamond)] text-green-600">
                          {`-€ ${discountAmount.toFixed(2).replace('.', ',')}`}
                        </span>
                      </div>
                    </div>
                  )}

                  <div role="row" className="flex justify-between">
                    <div role="rowheader">
                      <span className="text-base text-black font-medium font-[family-name:var(--font-eb-garamond)]">Verzending</span>
                    </div>
                    <div role="cell">
                      <span className="text-base font-medium font-[family-name:var(--font-eb-garamond)] text-black">
                        {shippingCost > 0 ? `€ ${shippingCost.toFixed(2).replace('.', ',')}` : 'Gratis'}
                      </span>
                    </div>
                  </div>

                  <div role="row" className="flex justify-between items-center pt-3 mt-3">
                    <div role="rowheader">
                      <strong className="text-xl font-bold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">
                        Totaal
                      </strong>
                    </div>
                    <div role="cell">
                      <div className="flex items-center gap-2">
                        <abbr className="no-underline">
                          <span className="text-base text-black/70 font-medium font-[family-name:var(--font-eb-garamond)]">
                            EUR
                          </span>
                        </abbr>
                        <strong className="text-2xl font-bold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">
                          {`€ ${total.toFixed(2).replace('.', ',')}`}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why choose us section */}
          <div className="pb-6">
            <div className="border-t border-[#e5e7eb] pt-6">
              {/* Trustpilot Widget */}
              <div className="mb-4">
                <TrustpilotWidget />
              </div>
              <h4 className="text-base font-medium text-black mb-4 text-left uppercase tracking-wider font-[family-name:var(--font-eb-garamond)]">
                WAAROM MEER DAN 4.278 KLANTEN VOOR STONESFORHEALTH KOZEN
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10">
                    <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-black font-[family-name:var(--font-eb-garamond)]">
                      30 dagen retourrecht
                    </p>
                    <p className="text-sm text-black/70 font-medium mt-0.5 font-[family-name:var(--font-eb-garamond)]">
                      Niet tevreden? Retourneer gratis binnen 30 dagen
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10">
                    <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-black font-[family-name:var(--font-eb-garamond)]">
                      100% Veilig betalen
                    </p>
                    <p className="text-sm text-black/70 font-medium mt-0.5 font-[family-name:var(--font-eb-garamond)]">
                      Beveiligde betaling met SSL-encryptie
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10">
                    <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-black font-[family-name:var(--font-eb-garamond)]">
                      100% Natuurlijke stenen
                    </p>
                    <p className="text-sm text-black/70 font-medium mt-0.5 font-[family-name:var(--font-eb-garamond)]">
                      Authentieke edelstenen met certificaat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentPageContent />
    </Suspense>
  );
}