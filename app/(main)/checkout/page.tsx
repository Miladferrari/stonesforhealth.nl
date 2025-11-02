'use client';

import { useState, useEffect, useCallback, useRef, useImperativeHandle } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useCart } from '../../contexts/CartContextStoreAPI';
import CouponInput from '../../components/CouponInput';
import TrustpilotWidget from '../../components/TrustpilotWidget';

// Import type for the ref handle
import type { StripePaymentFormHandle } from '@/app/components/StripePaymentForm';

// Dynamically import Stripe component to avoid SSR issues with forwardRef support
const StripePaymentForm = dynamic(
  () => import('@/app/components/StripePaymentForm'),
  {
    ssr: false,
    loading: () => (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a] mx-auto mb-4"></div>
        <p className="text-[#2D2D2D] font-[family-name:var(--font-eb-garamond)]">Betaalopties worden geladen...</p>
      </div>
    )
  }
) as React.ForwardRefExoticComponent<any & React.RefAttributes<StripePaymentFormHandle>>;

export default function UnifiedCheckoutPage() {
  const router = useRouter();
  const {
    items,
    getTotalPrice,
    getTotalPriceAfterDiscount,
    getDiscountAmount,
    appliedCoupon,
    clearCart,
    shipping,
    setShippingCountry,
    setShippingPostcode,
    setSelectedShippingRate,
    getShippingCost,
    getFinalTotal,
    allowedCountries,
    loadAllowedCountries,
    isHydrated
  } = useCart();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    postcode: '',
    country: 'NL',
    billingAddressSame: true,
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingAddress2: '',
    billingCity: '',
    billingPostcode: '',
    billingCountry: 'NL',
  });

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [countryNames, setCountryNames] = useState<{ [key: string]: string }>({});

  // Field validation states
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Debounce timers for shipping calculations
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Prevent double-click on checkout button
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  // Removed order restoration logic - will be handled by WooCommerce Store API

  // Auto-save to sessionStorage
  useEffect(() => {
    const savedFormData = sessionStorage.getItem('checkoutFormData');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error('Error restoring form data:', error);
      }
    }

    // Restore shipping rate if saved, or select cheapest if not
    const savedShippingRate = sessionStorage.getItem('selectedShippingRate');
    if (shipping.rates.length > 0) {
      if (savedShippingRate) {
        try {
          const rate = JSON.parse(savedShippingRate);
          const matchingRate = shipping.rates.find(r => r.method_id === rate.method_id);
          if (matchingRate) {
            setSelectedShippingRate(matchingRate);
          } else {
            // If saved rate doesn't exist anymore, select the cheapest
            const sortedRates = [...shipping.rates].sort((a, b) => a.cost - b.cost);
            setSelectedShippingRate(sortedRates[0]);
          }
        } catch (error) {
          console.error('Error restoring shipping rate:', error);
          // On error, select the cheapest rate
          const sortedRates = [...shipping.rates].sort((a, b) => a.cost - b.cost);
          setSelectedShippingRate(sortedRates[0]);
        }
      } else if (!shipping.selectedRate) {
        // No saved rate and no selected rate, select the cheapest
        const sortedRates = [...shipping.rates].sort((a, b) => a.cost - b.cost);
        setSelectedShippingRate(sortedRates[0]);
      }
    }
  }, [shipping.rates]);

  // Save form data whenever it changes
  useEffect(() => {
    if (formData.email || formData.firstName) {
      sessionStorage.setItem('checkoutFormData', JSON.stringify(formData));
    }
  }, [formData]);

  // Save selected shipping rate
  useEffect(() => {
    if (shipping.selectedRate) {
      sessionStorage.setItem('selectedShippingRate', JSON.stringify(shipping.selectedRate));
    }
  }, [shipping.selectedRate]);

  // Load country names from API
  useEffect(() => {
    const loadCountryNames = async () => {
      try {
        const response = await fetch('/api/shipping?action=countries');
        if (response.ok) {
          const data = await response.json();
          if (data.countriesWithNames) {
            setCountryNames(data.countriesWithNames);
          }
        }
      } catch (error) {
        console.error('Failed to load country names:', error);
        // Fallback to minimal set
        setCountryNames({
          'BE': 'België',
          'NL': 'Nederland'
        });
      }
    };

    loadCountryNames();
  }, []);

  // Update shipping when address changes
  // Initialize shipping with default country on mount
  const [countriesLoaded, setCountriesLoaded] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;

    // Check if cart has items
    // Temporarily disabled to allow viewing checkout page UI
    // if (items.length === 0) {
    //   router.push('/cart');
    //   return;
    // }

    // Load allowed countries only once
    if (!countriesLoaded) {
      loadAllowedCountries();
      setCountriesLoaded(true);
    }
  }, [isHydrated, items.length, router, countriesLoaded, loadAllowedCountries]);

  // Load shipping rates on initial mount with default country
  useEffect(() => {
    if (!isHydrated) return;

    // Always trigger initial shipping rates fetch with the default or current country
    // This ensures rates load on page load, not just when country changes
    const countryToUse = formData.country || 'NL';
    if (shipping.rates.length === 0 && !shipping.loading) {
      setShippingCountry(countryToUse);
    }
  }, [isHydrated]); // Only run once when hydrated

  // Calculate pricing
  const subtotal = getTotalPrice();
  const discountAmount = getDiscountAmount();
  const subtotalAfterDiscount = getTotalPriceAfterDiscount();
  const shippingCost = getShippingCost();
  const total = getFinalTotal();

  // Get tax from Store API context (if available)
  const cartContext = useCart() as any;
  const tax = cartContext.getTax ? cartContext.getTax() : 0;

  // Debounced shipping calculation
  const debouncedShippingUpdate = useCallback((country: string, postcode: string) => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for shipping calculation
    debounceTimerRef.current = setTimeout(async () => {
      if (country) {
        await setShippingCountry(country);
      }
      if (postcode) {
        await setShippingPostcode(postcode);
      }
    }, 500); // Wait 500ms after user stops typing
  }, [setShippingCountry, setShippingPostcode]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Input handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Update shipping with debouncing for postcode, immediate for country
    if (name === 'country') {
      // Country changes should be immediate as they affect available options
      setShippingCountry(value);
    } else if (name === 'postcode') {
      // Debounce postcode changes to reduce API calls while typing
      debouncedShippingUpdate(formData.country, value);
    }
  };

  // Validate individual field
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'email':
        if (!value) return 'Voer een e-mailadres in';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Voer een geldig e-mailadres in';
        return null;
      case 'firstName':
        // First name is now optional
        return null;
      case 'lastName':
        if (!value) return 'Voer een achternaam in';
        return null;
      case 'address':
        if (!value) return 'Voer een adres in';
        return null;
      case 'city':
        if (!value) return 'Voer een stad in';
        return null;
      case 'postcode':
        if (!value) return 'Voer een postcode in';
        return null;
      default:
        return null;
    }
  };

  // Validate all required fields
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    // Validate required fields (firstName is now optional)
    const requiredFields = ['email', 'lastName', 'address', 'city', 'postcode'];
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData] as string);
      if (error) errors[field] = error;
    });

    // Check shipping method
    if (!shipping.selectedRate && shipping.rates.length > 0) {
      errors.shippingMethod = 'Selecteer een verzendmethode';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };


  // Handle proceed to payment
  const handleProceedToPayment = async () => {
    // Prevent double-clicks
    if (isProcessingCheckout) {
      console.log('Already processing checkout, preventing duplicate submission');
      return;
    }

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.border-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsProcessingCheckout(true);
    setLoading(true);
    setError('');

    try {
      // Step 1: Validate stock
      const stockResponse = await fetch('/api/validate-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });

      if (!stockResponse.ok) {
        const stockError = await stockResponse.json();
        setError(stockError.error || 'Stock validation failed');
        setLoading(false);
        setIsProcessingCheckout(false);
        return;
      }

      // Step 2: Check for existing pending order
      let order;
      const existingOrderId = sessionStorage.getItem('pendingOrderId');
      const existingOrderData = sessionStorage.getItem('orderData');

      // Check if we should reuse existing order
      let shouldReuseOrder = false;
      if (existingOrderId && existingOrderData) {
        try {
          const parsedOrderData = JSON.parse(existingOrderData);
          // Compare cart items to see if they match
          const existingItemsHash = JSON.stringify(parsedOrderData.items.map((item: any) => ({
            id: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          })).sort((a: any, b: any) => a.id - b.id));

          const currentItemsHash = JSON.stringify(items.map((item: any) => ({
            id: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          })).sort((a: any, b: any) => a.id - b.id));

          // Reuse order if cart items haven't changed
          if (existingItemsHash === currentItemsHash) {
            shouldReuseOrder = true;
            order = parsedOrderData;
            console.log('Reusing existing order:', order.id);
          } else {
            console.log('Cart has changed, creating new order');
            // Clear old order data if cart has changed
            sessionStorage.removeItem('pendingOrderId');
            sessionStorage.removeItem('orderData');
          }
        } catch (e) {
          console.error('Error parsing existing order data:', e);
          sessionStorage.removeItem('pendingOrderId');
          sessionStorage.removeItem('orderData');
        }
      }

      // Step 3: Create new order only if needed
      if (!shouldReuseOrder) {
        const orderResponse = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formData,
            items,
            shippingRate: shipping.selectedRate,
            couponCode: appliedCoupon?.code,
            totals: {
              subtotal,
              discount: discountAmount,
              shipping: shippingCost,
              tax,
              total
            }
          })
        });

        if (!orderResponse.ok) {
          const orderError = await orderResponse.json();
          setError(orderError.error || 'Failed to create order');
          setLoading(false);
          setIsProcessingCheckout(false);
          return;
        }

        order = (await orderResponse.json()).order;
        console.log('New order created:', order.id);

        // Store new order data in session
        sessionStorage.setItem('pendingOrderId', order.id.toString());
        sessionStorage.setItem('orderData', JSON.stringify({
          id: order.id,
          total: order.total,
          currency: order.currency,
          items: items,
          formData: formData
        }));
      } else {
        // Update order data with new form data and totals
        sessionStorage.setItem('orderData', JSON.stringify({
          ...order,
          formData: formData,
          total: total.toFixed(2)
        }));
      }

      // Navigate to payment page
      router.push(`/checkout/payment?orderId=${order.id}&total=${order.total || total.toFixed(2)}`);

    } catch (error: any) {
      console.error('Checkout error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    } finally {
      // Always reset processing state
      setIsProcessingCheckout(false);
    }
  };

  // Handle payment success
  const handlePaymentSuccess = async () => {
    clearCart();
    // Clear all session data on successful payment
    sessionStorage.removeItem('checkoutFormData');
    sessionStorage.removeItem('selectedShippingRate');
    sessionStorage.removeItem('pendingOrderId');
    sessionStorage.removeItem('orderData');
    router.push('/checkout/success');
  };

  // Loading state
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a] mb-4"></div>
            <p className="text-[#2D2D2D] font-[family-name:var(--font-eb-garamond)]">Even geduld...</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (isHydrated && items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">Je winkelwagen is leeg</h1>
            <p className="text-[#2D2D2D] mb-8 font-[family-name:var(--font-eb-garamond)]">Voeg enkele kristallen toe voordat je afrekent.</p>
            <a href="/alle-producten" className="inline-block bg-[#492c4a] text-white px-8 py-3 rounded-full hover:bg-[#6b4069] transition-all transform hover:scale-[1.02] font-[family-name:var(--font-eb-garamond)]">
              Ontdek onze kristallen
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
                  className={`w-3.5 h-3.5 transition-transform ${showOrderSummary ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75 7.354 9.396a.5.5 0 0 1-.708 0L2 4.75"></path>
                </svg>
              </span>
            </span>
            <span className="text-lg font-bold text-[#1a1a1a]">€{total.toFixed(2).replace('.', ',')}</span>
          </button>
        </div>

        {/* Mobile order summary content */}
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
                        <div className="flex-shrink-0 pb-1">
                          <div className="relative w-16 h-16">
                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white">
                              {item.product.images?.[0]?.src ? (
                                <Image
                                  src={item.product.images[0].src}
                                  alt={item.product.name}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-[#492c4a] text-white text-xs min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center font-semibold border-2 border-gray-50">
                              {item.quantity}
                            </div>
                          </div>
                        </div>

                        {/* Product details */}
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-medium text-[#1a1a1a] font-[family-name:var(--font-eb-garamond)]">
                            {item.product.name}
                          </p>
                          {item.selectedVariation && (
                            <p className="text-base text-gray-600 mt-0.5 font-[family-name:var(--font-eb-garamond)]">
                              {Object.entries(item.selectedVariation).map(([key, value]) =>
                                `${value}`
                              ).join(' / ')}
                            </p>
                          )}
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-base font-medium text-[#1a1a1a] font-[family-name:var(--font-eb-garamond)]">
                            €{(parseFloat(item.product.price) * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {items.length > 3 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 text-base text-gray-600 text-center flex items-center justify-center gap-1 font-[family-name:var(--font-eb-garamond)]">
                      Scroll voor meer artikelen
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1.5 7h11m0 0-3.826 4.75M12.5 7 8.674 2.25" />
                      </svg>
                    </div>
                  )}
                </div>
              </section>

              {/* Discount code section */}
              <section className="mb-6">
                <CouponInput variant="compact" />
              </section>

              {/* Cost breakdown section */}
              <section>
                <div role="table" className="space-y-2">
                  <div role="rowgroup" className="space-y-2">
                    <div role="row" className="flex justify-between">
                      <div role="rowheader">
                        <span className="text-base text-[#1a1a1a] font-[family-name:var(--font-eb-garamond)]">
                          Subtotaal · {items.reduce((acc: number, item: any) => acc + item.quantity, 0)} artikelen
                        </span>
                      </div>
                      <div role="cell">
                        <span className="text-base text-[#1a1a1a] font-[family-name:var(--font-eb-garamond)]">
                          €{subtotal.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>

                    {appliedCoupon && (
                      <div role="row" className="flex justify-between">
                        <div role="rowheader">
                          <span className="text-base text-[#1a1a1a] font-[family-name:var(--font-eb-garamond)]">
                            Korting
                            {appliedCoupon.discount_type === 'percent' && ` (${appliedCoupon.amount}%)`}
                          </span>
                        </div>
                        <div role="cell">
                          <span className="text-base text-green-600 font-[family-name:var(--font-eb-garamond)]">
                            -€{discountAmount.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    )}

                    <div role="row" className="flex justify-between">
                      <div role="rowheader">
                        <span className="text-base text-[#1a1a1a] font-[family-name:var(--font-eb-garamond)]">
                          Verzending
                        </span>
                      </div>
                      <div role="cell">
                        {shipping.loading ? (
                          <span className="text-base text-gray-500 font-[family-name:var(--font-eb-garamond)]">Berekenen...</span>
                        ) : (
                          <span className={`text-base font-[family-name:var(--font-eb-garamond)] ${shippingCost === 0 ? 'text-green-600' : 'text-[#1a1a1a]'}`}>
                            {shippingCost === 0 ? 'Gratis' : `€${shippingCost.toFixed(2).replace('.', ',')}`}
                          </span>
                        )}
                      </div>
                    </div>

                    <div role="row" className="flex justify-between items-center pt-3 mt-3">
                      <div role="rowheader">
                        <strong className="text-lg font-bold text-[#1a1a1a] font-[family-name:var(--font-eb-garamond)]">
                          Totaal
                        </strong>
                      </div>
                      <div role="cell">
                        <div className="flex items-center gap-1.5">
                          <abbr className="no-underline">
                            <span className="text-base text-gray-500 font-[family-name:var(--font-eb-garamond)]">EUR</span>
                          </abbr>
                          <strong className="text-lg font-bold text-[#1a1a1a] font-[family-name:var(--font-eb-garamond)]">
                            €{total.toFixed(2).replace('.', ',')}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        )}

        {/* Gray background wrapper for desktop */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/3 bg-gray-100"></div>

        {/* Checkout form and order summary grid */}
        <div className="relative max-w-7xl mx-auto w-full flex flex-col lg:flex-row min-h-screen px-4 sm:px-6 lg:px-8">
          {/* Main checkout form - left side */}
          <div className="flex-1 lg:flex-initial lg:w-2/3 py-8 pr-0 lg:pr-8 bg-white">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center lg:justify-start">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 text-white">
                    <span>1</span>
                  </div>
                  <span className="ml-3 font-semibold text-gray-600 font-[family-name:var(--font-eb-garamond)]">Gegevens</span>
                  <div className="w-20 h-1 mx-4 bg-gray-300"></div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-500">
                    <span>2</span>
                  </div>
                  <span className="ml-3 text-gray-500 font-[family-name:var(--font-eb-garamond)]">Betaling</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
                <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-[family-name:var(--font-eb-garamond)]">{error}</span>
              </div>
            )}

            {/* Single unified checkout form */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
                  Contact
                </h2>
                <div className="space-y-5">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 pt-6 pb-2 border ${fieldErrors.email ? 'border-red-500' : 'border-[#d1d5db]'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer`}
                      placeholder=" "
                    />
                    <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                      E-mail
                    </label>
                    {fieldErrors.email && (
                      <p className="mt-1 text-base text-red-600">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
                  Bezorging
                </h2>
                <div className="space-y-5">
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 pt-6 pb-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base appearance-none peer"
                    >
                      {allowedCountries.length === 0 ? (
                        <>
                          <option value="NL">Nederland</option>
                          <option value="BE">België</option>
                        </>
                      ) : (
                        allowedCountries.map(code => (
                          <option key={code} value={code}>
                            {countryNames[code] || code}
                          </option>
                        ))
                      )}
                    </select>
                    <label className="absolute left-4 top-1.5 text-[#6b7280] text-base font-[family-name:var(--font-eb-garamond)]">
                      Land/Regio
                    </label>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 pt-6 pb-2 border ${fieldErrors.firstName ? 'border-red-500' : 'border-[#d1d5db]'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer`}
                        placeholder=" "
                      />
                      <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                        Voornaam (optioneel)
                      </label>
                      {fieldErrors.firstName && (
                        <p className="mt-1 text-base text-red-600">{fieldErrors.firstName}</p>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 pt-6 pb-2 border ${fieldErrors.lastName ? 'border-red-500' : 'border-[#d1d5db]'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer`}
                        placeholder=" "
                      />
                      <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                        Achternaam
                      </label>
                      {fieldErrors.lastName && (
                        <p className="mt-1 text-base text-red-600">{fieldErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 pt-6 pb-2 border ${fieldErrors.address ? 'border-red-500' : 'border-[#d1d5db]'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer`}
                      placeholder=" "
                    />
                    <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                      Straat en huisnummer
                    </label>
                    {fieldErrors.address && (
                      <p className="mt-1 text-base text-red-600">{fieldErrors.address}</p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className="w-full px-4 pt-6 pb-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer"
                      placeholder=" "
                    />
                    <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                      Appartement, suite, etc. (optioneel)
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="relative md:col-span-2">
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 pt-6 pb-2 border ${fieldErrors.city ? 'border-red-500' : 'border-[#d1d5db]'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer`}
                        placeholder=" "
                      />
                      <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                        Stad
                      </label>
                      {fieldErrors.city && (
                        <p className="mt-1 text-base text-red-600">{fieldErrors.city}</p>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 pt-6 pb-2 border ${fieldErrors.postcode ? 'border-red-500' : 'border-[#d1d5db]'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer`}
                        placeholder=" "
                      />
                      <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                        Postcode
                      </label>
                      {fieldErrors.postcode && (
                        <p className="mt-1 text-base text-red-600">{fieldErrors.postcode}</p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 pt-6 pb-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer"
                      placeholder=" "
                    />
                    <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                      Telefoon (optioneel)
                    </label>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
                  Verzendwijze
                </h2>
                {shipping.loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#492c4a] mx-auto mb-2"></div>
                    <p className="text-base text-[#2D2D2D]">Verzendopties worden geladen...</p>
                  </div>
                ) : shipping.error ? (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-base text-red-600">{shipping.error}</p>
                  </div>
                ) : shipping.rates.length > 0 ? (
                  <>
                    <div className="space-y-3">
                      {shipping.rates
                        .sort((a, b) => a.cost - b.cost)
                        .map((rate) => (
                        <label
                          key={rate.method_id}
                          className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                            shipping.selectedRate?.method_id === rate.method_id
                              ? 'border-[#492c4a] bg-[#492c4a]/5'
                              : 'border-[#E8DCC6] hover:border-[#492c4a]/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="shippingMethod"
                                value={rate.method_id}
                                checked={shipping.selectedRate?.method_id === rate.method_id}
                                onChange={() => setSelectedShippingRate(rate)}
                                className="mr-3 text-[#492c4a] focus:ring-[#492c4a]"
                              />
                              <div>
                                <p className="font-medium text-[#2D2D2D]">{rate.method_title}</p>
                              </div>
                            </div>
                            <span className="font-semibold text-[#492c4a]">
                              {rate.free ? 'Gratis' : `€${rate.cost.toFixed(2)}`}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                    {fieldErrors.shippingMethod && (
                      <p className="mt-2 text-base text-red-600">{fieldErrors.shippingMethod}</p>
                    )}
                  </>
                ) : (
                  <p className="text-center text-gray-600">Geen verzendmethodes beschikbaar</p>
                )}
              </div>

              {/* Payment */}
              <div className="mb-8">

                {/* Billing Address Section */}
                <div className="border-t border-[#e5e7eb] pt-6">
                  <h3 className="text-2xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
                    Factuuradres
                  </h3>
                  <div className="space-y-3">
                    <label className="block border border-[#d1d5db] rounded-lg p-4 cursor-pointer hover:border-[#492c4a]/50 transition-all">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="billingAddress"
                          value="same"
                          checked={formData.billingAddressSame}
                          onChange={(e) => setFormData(prev => ({ ...prev, billingAddressSame: e.target.value === 'same' }))}
                          className="mr-3 text-[#492c4a] focus:ring-[#492c4a]"
                        />
                        <span className="text-base text-[#1a1a1a] font-[family-name:var(--font-eb-garamond)]">
                          Zelfde als bezorgadres
                        </span>
                      </div>
                    </label>
                    <div className={`border border-[#d1d5db] rounded-lg overflow-hidden ${!formData.billingAddressSame ? 'border-[#492c4a]/50' : ''}`}>
                      <label className="block p-4 cursor-pointer hover:bg-gray-50 transition-all">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="billingAddress"
                            value="different"
                            checked={!formData.billingAddressSame}
                            onChange={(e) => setFormData(prev => ({ ...prev, billingAddressSame: e.target.value === 'same' }))}
                            className="mr-3 text-[#492c4a] focus:ring-[#492c4a]"
                          />
                          <span className="text-base text-[#1a1a1a] font-[family-name:var(--font-eb-garamond)]">
                            Een ander factuuradres gebruiken
                          </span>
                        </div>
                      </label>

                      {!formData.billingAddressSame && (
                        <div className="border-t border-[#d1d5db] p-5 bg-gray-50 space-y-5">
                      {/* Billing Country */}
                      <div className="relative">
                        <select
                          name="billingCountry"
                          value={formData.billingCountry}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 pt-6 pb-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base appearance-none peer"
                        >
                          {allowedCountries.length === 0 ? (
                            <>
                              <option value="NL">Nederland</option>
                              <option value="BE">België</option>
                            </>
                          ) : (
                            allowedCountries.map(code => (
                              <option key={code} value={code}>
                                {countryNames[code] || code}
                              </option>
                            ))
                          )}
                        </select>
                        <label className="absolute left-4 top-1.5 text-[#6b7280] text-base font-[family-name:var(--font-eb-garamond)]">
                          Land/Regio
                        </label>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Billing Name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="relative">
                          <input
                            type="text"
                            name="billingFirstName"
                            value={formData.billingFirstName}
                            onChange={handleInputChange}
                            className="w-full px-4 pt-6 pb-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer"
                            placeholder=" "
                          />
                          <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                            Voornaam (optioneel)
                          </label>
                        </div>

                        <div className="relative">
                          <input
                            type="text"
                            name="billingLastName"
                            value={formData.billingLastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 pt-6 pb-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer"
                            placeholder=" "
                          />
                          <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                            Achternaam
                          </label>
                        </div>
                      </div>

                      {/* Billing Address */}
                      <div className="relative">
                        <input
                          type="text"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 pt-6 pb-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer"
                          placeholder=" "
                        />
                        <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                          Straat en huisnummer
                        </label>
                      </div>

                      {/* Billing Address 2 */}
                      <div className="relative">
                        <input
                          type="text"
                          name="billingAddress2"
                          value={formData.billingAddress2}
                          onChange={handleInputChange}
                          className="w-full px-4 pt-6 pb-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer"
                          placeholder=" "
                        />
                        <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                          Appartement, suite, etc. (optioneel)
                        </label>
                      </div>

                      {/* Billing City and Postcode */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="relative md:col-span-2">
                          <input
                            type="text"
                            name="billingCity"
                            value={formData.billingCity}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 pt-6 pb-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer"
                            placeholder=" "
                          />
                          <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                            Stad
                          </label>
                        </div>

                        <div className="relative">
                          <input
                            type="text"
                            name="billingPostcode"
                            value={formData.billingPostcode}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 pt-6 pb-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-1 focus:ring-[#492c4a] focus:border-[#492c4a] text-[#1a1a1a] bg-white font-[family-name:var(--font-eb-garamond)] text-base peer"
                            placeholder=" "
                          />
                          <label className="absolute left-4 top-4 text-[#6b7280] text-base transition-all duration-150 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:text-base peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:top-1.5 font-[family-name:var(--font-eb-garamond)]">
                            Postcode
                          </label>
                        </div>
                      </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Submit button - proceed to payment */}
              <button
                type="submit"
                onClick={handleProceedToPayment}
                disabled={loading || isProcessingCheckout || !!shipping.error}
                className="w-full bg-amber-orange text-black py-4 px-6 rounded-md font-semibold hover:bg-amber-orange/90 transition-all transform hover:scale-[1.02] disabled:bg-gray-300 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center font-[family-name:var(--font-eb-garamond)] text-2xl mt-6"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Bestelling wordt verwerkt...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                    Ga naar betalen
                  </>
                )}
              </button>

              {/* Security trust element */}
              <div className="flex items-center space-x-2 mt-6 pt-6 border-t border-[#e5e7eb]">
                <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <span className="text-base text-[#6b7280] font-[family-name:var(--font-eb-garamond)]">
                  Veilig en versleuteld
                </span>
              </div>

              {/* Trust Section - Mobile/Tablet Only */}
              <div className="lg:hidden pb-6">
                <div className="pt-6">
                  {/* Trustpilot Widget */}
                  <div className="mb-4">
                    <TrustpilotWidget />
                  </div>
                  <h4 className="text-base font-medium text-black mb-4 text-left uppercase tracking-wider font-[family-name:var(--font-eb-garamond)]">
                    WAAROM MEER DAN 4.278 KLANTEN VOOR STONESFORHEALTH KOZEN
                  </h4>
                  <div className="space-y-4">
                    {/* 30 Days Return */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10">
                        <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
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

                    {/* Secure Payment */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10">
                        <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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

                    {/* Natural Stones */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10">
                        <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
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

          {/* Order summary - right side (desktop) */}
          <div className="hidden lg:block lg:w-1/3 bg-gray-100">
            <div className="sticky top-0 h-screen overflow-y-auto py-8 pl-8">
              {/* Trust banner */}
              <div className="mb-4">
                <img
                  src="https://cdn.shopify.com/s/files/1/0762/7286/1524/files/Figma_2024-09-25_10.52.45.png?v=1727254377"
                  loading="eager"
                  alt="Trust banner"
                  className="w-full h-auto"
                />
              </div>

              {/* Products section with table layout */}
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
                    {items.map((item: any, index: number) => (
                      <div key={item.product.id} role="row" className={`flex items-start gap-3 py-3 ${index > 0 ? 'border-t border-gray-100' : ''}`}>
                        {/* Product Image Cell */}
                        <div role="cell" className="flex-shrink-0">
                          <div className="w-16 h-16">
                            <div className="relative">
                              <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 bg-white">
                                {item.product.images?.[0]?.src ? (
                                  <Image
                                    src={item.product.images[0].src}
                                    alt={item.product.name}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="absolute -bottom-1 -right-1 bg-[#492c4a] text-white text-xs min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center font-semibold border-2 border-white">
                                <span className="sr-only">Aantal</span>
                                <span>{item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description Cell */}
                        <div role="cell" className="flex-1 min-w-0">
                          <p className="text-base font-medium text-black font-[family-name:var(--font-eb-garamond)] leading-tight">
                            {item.product.name}
                          </p>
                          {item.selectedVariation && (
                            <div className="mt-1">
                              <p className="text-base text-black/70 font-medium font-[family-name:var(--font-eb-garamond)]">
                                {Object.entries(item.selectedVariation).map(([key, value]) =>
                                  `${value}`
                                ).join(' / ')}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Quantity Cell (hidden visually but present for screen readers) */}
                        <div role="cell" className="sr-only">
                          <span>{item.quantity}</span>
                        </div>

                        {/* Price Cell */}
                        <div role="cell" className="text-right">
                          <span className="text-base font-medium text-black font-[family-name:var(--font-eb-garamond)]">
                            €{(parseFloat(item.product.price) * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {items.length > 3 && (
                  <div className="mt-3 pt-3 border-t border-gray-100 text-base text-black/70 font-medium text-center font-[family-name:var(--font-eb-garamond)]">
                    Scroll voor meer artikelen
                  </div>
                )}
              </div>

              {/* Discount code section */}
              <div className="pb-4">
                <div className="border-t border-[#e5e7eb] pt-4">
                  <CouponInput variant="compact" />
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="pb-6">
                <div className="border-t border-[#e5e7eb] pt-4">
                  <div role="table" className="space-y-2">
                    <div role="rowgroup" className="space-y-2">
                      <div role="row" className="flex justify-between">
                        <div role="rowheader">
                          <span className="text-base text-black font-medium font-[family-name:var(--font-eb-garamond)]">
                            Subtotaal · {items.reduce((acc: number, item: any) => acc + item.quantity, 0)} artikelen
                          </span>
                        </div>
                        <div role="cell">
                          <span className="text-base text-black font-medium font-[family-name:var(--font-eb-garamond)]">
                            €{subtotal.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>

                      {appliedCoupon && (
                        <div role="row" className="flex justify-between">
                          <div role="rowheader">
                            <span className="text-base text-black font-medium font-[family-name:var(--font-eb-garamond)]">
                              Korting
                              {appliedCoupon.discount_type === 'percent' && ` (${appliedCoupon.amount}%)`}
                            </span>
                          </div>
                          <div role="cell">
                            <span className="text-base text-green-600 font-medium font-[family-name:var(--font-eb-garamond)]">
                              -€{discountAmount.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>
                      )}

                      <div role="row" className="flex justify-between">
                        <div role="rowheader">
                          <span className="text-base text-black font-medium font-[family-name:var(--font-eb-garamond)]">
                            Verzending
                          </span>
                        </div>
                        <div role="cell">
                          {shipping.loading ? (
                            <span className="text-base text-gray-500 font-[family-name:var(--font-eb-garamond)]">Berekenen...</span>
                          ) : (
                            <span className={`text-base font-medium font-[family-name:var(--font-eb-garamond)] ${shippingCost === 0 ? 'text-green-600' : 'text-black'}`}>
                              {shippingCost === 0 ? 'Gratis' : `€${shippingCost.toFixed(2).replace('.', ',')}`}
                            </span>
                          )}
                        </div>
                      </div>

                      {tax > 0 && (
                        <div role="row" className="flex justify-between">
                          <div role="rowheader">
                            <span className="text-base text-black font-medium font-[family-name:var(--font-eb-garamond)]">
                              BTW (21%)
                            </span>
                          </div>
                          <div role="cell">
                            <span className="text-base text-black font-medium font-[family-name:var(--font-eb-garamond)]">
                              €{tax.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>
                      )}

                      <div role="row" className="flex justify-between items-center pt-3 mt-3">
                        <div role="rowheader">
                          <strong className="text-xl font-bold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">
                            Totaal
                          </strong>
                        </div>
                        <div role="cell">
                          <div className="flex items-center gap-2">
                            <abbr className="no-underline">
                              <span className="text-base text-black/70 font-medium font-[family-name:var(--font-eb-garamond)]">EUR</span>
                            </abbr>
                            <strong className="text-2xl font-bold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">
                              €{total.toFixed(2).replace('.', ',')}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Icons Section */}
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
                    {/* 30 Days Return */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10">
                        <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
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

                    {/* Secure Payment */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10">
                        <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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

                    {/* Natural Stones */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10">
                        <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
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

// Order Summary Component (reused from previous)
function OrderSummaryContent({ items, subtotal, discountAmount, shippingCost, total, appliedCoupon, shipping, countryNames, formDataCountry }: any) {
  return (
    <>
      {/* Products list */}
      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {items.map((item: any) => (
          <div key={item.product.id} className="flex items-start gap-3 text-sm">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded overflow-hidden">
              {item.product.images?.[0]?.src ? (
                <Image
                  src={item.product.images[0].src}
                  alt={item.product.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.product.name}</p>
              <p className="text-gray-600">Aantal: {item.quantity}</p>
            </div>

            <span className="font-medium text-gray-900 text-right">
              €{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Price breakdown */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotaal</span>
          <span className="text-gray-900">€{subtotal.toFixed(2)}</span>
        </div>

        {appliedCoupon && (
          <div className="flex justify-between text-sm text-green-600">
            <span>
              Korting
              {appliedCoupon.discount_type === 'percent' && ` (${appliedCoupon.amount}%)`}
            </span>
            <span>-€{discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="my-3 py-3 border-y">
          <CouponInput variant="compact" />
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Verzending naar {countryNames[formDataCountry] || formDataCountry}
          </span>
          {shipping.loading ? (
            <span className="text-gray-400">Berekenen...</span>
          ) : (
            <span className={shippingCost === 0 ? 'text-green-600 font-medium' : 'text-gray-900'}>
              {shippingCost === 0 ? 'GRATIS' : `€${shippingCost.toFixed(2)}`}
            </span>
          )}
        </div>

        <div className="flex justify-between font-semibold text-lg pt-2 border-t">
          <span className="text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">Totaal</span>
          <span className="text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">€{total.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
}