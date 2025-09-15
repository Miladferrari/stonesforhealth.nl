'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useCart } from '../../contexts/CartContext';
import CouponInput from '../../components/CouponInput';

// Dynamically import Stripe component to avoid SSR issues
const StripePaymentForm = dynamic(
  () => import('./payment/StripePaymentForm'),
  {
    ssr: false,
    loading: () => (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a] mx-auto mb-4"></div>
        <p className="text-[#2D2D2D] font-[family-name:var(--font-eb-garamond)]">Betaalopties worden geladen...</p>
      </div>
    )
  }
);

// Section completion states
interface SectionStates {
  contact: boolean;
  shipping: boolean;
  shippingMethod: boolean;
  payment: boolean;
}

export default function OnePageCheckoutPage() {
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
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  // Section states for progressive disclosure
  const [currentSection, setCurrentSection] = useState<'contact' | 'shipping' | 'shippingMethod' | 'payment'>('contact');
  const [completedSections, setCompletedSections] = useState<SectionStates>({
    contact: false,
    shipping: false,
    shippingMethod: false,
    payment: false
  });

  // Field validation states
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Auto-save to sessionStorage
  useEffect(() => {
    const savedFormData = sessionStorage.getItem('checkoutFormData');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(prev => ({ ...prev, ...parsedData }));

        // Check which sections are completed based on saved data
        if (parsedData.email) {
          setCompletedSections(prev => ({ ...prev, contact: true }));
          if (parsedData.firstName && parsedData.address && parsedData.city && parsedData.postcode) {
            setCompletedSections(prev => ({ ...prev, shipping: true }));
            setCurrentSection('shippingMethod');
          } else {
            setCurrentSection('shipping');
          }
        }
      } catch (error) {
        console.error('Error restoring form data:', error);
      }
    }

    // Restore shipping rate if saved
    const savedShippingRate = sessionStorage.getItem('selectedShippingRate');
    if (savedShippingRate && shipping.rates.length > 0) {
      try {
        const rate = JSON.parse(savedShippingRate);
        const matchingRate = shipping.rates.find(r => r.method_id === rate.method_id);
        if (matchingRate) {
          setSelectedShippingRate(matchingRate);
          setCompletedSections(prev => ({ ...prev, shippingMethod: true }));
          setCurrentSection('payment');
        }
      } catch (error) {
        console.error('Error restoring shipping rate:', error);
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

  // Country names mapping
  useEffect(() => {
    const names: { [key: string]: string } = {
      'NL': 'Nederland',
      'BE': 'België',
      'DE': 'Duitsland',
      'FR': 'Frankrijk',
      'LU': 'Luxemburg',
      'AT': 'Oostenrijk',
      'ES': 'Spanje',
      'IT': 'Italië',
      'GB': 'Verenigd Koninkrijk',
      'US': 'Verenigde Staten',
      'PL': 'Polen',
      'CZ': 'Tsjechië',
      'SK': 'Slowakije',
      'HU': 'Hongarije',
      'RO': 'Roemenië',
      'BG': 'Bulgarije',
      'GR': 'Griekenland',
      'PT': 'Portugal',
      'SE': 'Zweden',
      'DK': 'Denemarken',
      'NO': 'Noorwegen',
      'FI': 'Finland',
      'IE': 'Ierland',
      'CH': 'Zwitserland',
      'CA': 'Canada',
      'AU': 'Australië',
      'NZ': 'Nieuw-Zeeland',
    };
    setCountryNames(names);
  }, []);

  // Update shipping when address changes
  useEffect(() => {
    if (formData.country && formData.country !== shipping.country) {
      setShippingCountry(formData.country);
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.postcode && formData.postcode !== shipping.postcode) {
      setShippingPostcode(formData.postcode);
    }
  }, [formData.postcode]);

  // Calculate pricing
  const subtotal = getTotalPrice();
  const discountAmount = getDiscountAmount();
  const subtotalAfterDiscount = getTotalPriceAfterDiscount();
  const shippingCost = getShippingCost();
  const total = getFinalTotal();

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
  };

  // Validate individual field
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'email':
        if (!value) return 'E-mailadres is verplicht';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Ongeldig e-mailadres';
        return null;
      case 'firstName':
      case 'lastName':
        if (!value) return 'Dit veld is verplicht';
        return null;
      case 'address':
        if (!value) return 'Adres is verplicht';
        return null;
      case 'city':
        if (!value) return 'Stad is verplicht';
        return null;
      case 'postcode':
        if (!value) return 'Postcode is verplicht';
        return null;
      default:
        return null;
    }
  };

  // Section validation
  const validateSection = (section: string): boolean => {
    const errors: { [key: string]: string } = {};

    switch (section) {
      case 'contact':
        const emailError = validateField('email', formData.email);
        if (emailError) errors.email = emailError;
        break;

      case 'shipping':
        const fieldsToValidate = ['firstName', 'lastName', 'address', 'city', 'postcode'];
        fieldsToValidate.forEach(field => {
          const error = validateField(field, formData[field as keyof typeof formData] as string);
          if (error) errors[field] = error;
        });
        break;

      case 'shippingMethod':
        if (!shipping.selectedRate && shipping.rates.length > 0) {
          errors.shippingMethod = 'Selecteer een verzendmethode';
        }
        break;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle section progression
  const proceedToSection = (section: 'contact' | 'shipping' | 'shippingMethod' | 'payment') => {
    // Validate current section first
    if (currentSection === 'contact' && !validateSection('contact')) return;
    if (currentSection === 'shipping' && !validateSection('shipping')) return;
    if (currentSection === 'shippingMethod' && !validateSection('shippingMethod')) return;

    // Mark current section as completed
    setCompletedSections(prev => ({
      ...prev,
      [currentSection]: true
    }));

    // Move to next section
    setCurrentSection(section);
  };

  // Create order when payment section is reached
  const createOrder = async () => {
    try {
      // Validate stock
      const stockResponse = await fetch('/api/validate-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const stockValidation = await stockResponse.json();
      if (!stockValidation.valid) {
        let errorMessage = 'Er zijn problemen met de voorraad:\n\n';
        stockValidation.issues.forEach((issue: any) => {
          if (issue.issue === 'out_of_stock') {
            errorMessage += `• ${issue.productName} is uitverkocht\n`;
          } else if (issue.issue === 'insufficient_stock') {
            errorMessage += `• ${issue.productName}: slechts ${issue.available} beschikbaar (${issue.requested} gevraagd)\n`;
          }
        });
        setError(errorMessage);
        return null;
      }

      // Prepare order data
      const shippingLines = [];
      const selectedRate = shipping.selectedRate || shipping.rates[0];
      if (selectedRate) {
        shippingLines.push({
          method_id: selectedRate.method_id,
          method_title: selectedRate.method_title,
          total: selectedRate.cost.toFixed(2)
        });
      }

      const orderData = {
        payment_method: 'woocommerce_payments',
        payment_method_title: 'Card',
        set_paid: false,
        status: 'pending',
        billing: {
          first_name: formData.billingAddressSame ? formData.firstName : formData.billingFirstName,
          last_name: formData.billingAddressSame ? formData.lastName : formData.billingLastName,
          address_1: formData.billingAddressSame ? formData.address : formData.billingAddress,
          address_2: formData.billingAddressSame ? formData.address2 : formData.billingAddress2,
          city: formData.billingAddressSame ? formData.city : formData.billingCity,
          postcode: formData.billingAddressSame ? formData.postcode : formData.billingPostcode,
          country: formData.billingAddressSame ? formData.country : formData.billingCountry,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          address_2: formData.address2,
          city: formData.city,
          postcode: formData.postcode,
          country: formData.country,
        },
        line_items: items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
        shipping_lines: shippingLines,
        ...(appliedCoupon && {
          coupon_lines: [{
            code: appliedCoupon.code
          }]
        })
      };

      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderData: orderData,
          returnUrl: `${window.location.origin}/checkout/success`
        }),
      });

      const result = await orderResponse.json();

      if (!result.success || !result.order || !result.order.id) {
        throw new Error(result.error || 'Failed to create order');
      }

      // Store order data for payment processing
      sessionStorage.setItem('pendingOrderId', result.order.id.toString());
      sessionStorage.setItem('orderData', JSON.stringify({
        ...result.order,
        customer: orderData.billing,
        shipping_method: orderData.shipping_lines[0]?.method_id || 'standard',
        shipping_total: orderData.shipping_lines[0]?.total || '0',
        items: items,
        coupon: appliedCoupon
      }));

      return result.order.id;
    } catch (err: any) {
      console.error('Order error:', err);
      setError('Er is een fout opgetreden bij het verwerken van je bestelling.');
      return null;
    }
  };

  // Handle final payment processing
  const handlePaymentSuccess = async () => {
    clearCart();
    sessionStorage.removeItem('checkoutFormData');
    sessionStorage.removeItem('selectedShippingRate');
    router.push('/checkout/success');
  };

  // Loading state
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#F5F1E8]">
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
      <div className="min-h-screen bg-[#F5F1E8]">
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
    <div className="min-h-screen bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile order summary toggle */}
        <button
          type="button"
          className="w-full bg-white/60 backdrop-blur-sm border border-[#E8DCC6] p-4 flex items-center justify-center font-medium text-base text-[#492c4a] mb-4 lg:hidden rounded-lg font-[family-name:var(--font-eb-garamond)]"
          onClick={() => setShowOrderSummary(!showOrderSummary)}
        >
          <span>Toon besteloverzicht</span>
          <span className="ml-2 font-semibold text-[#492c4a]">€{total.toFixed(2)}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 6"
            className={`ml-2 transition-transform ${showOrderSummary ? 'rotate-180' : ''} w-3 h-3`}
            fill="currentColor"
          >
            <path d="M0 1c0-.6.4-1 1-1 .3 0 .5.1.7.3L5 3.6 8.3.4c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4 3.9c-.4.4-1 .4-1.4 0l-4-4C.1 1.5 0 1.3 0 1" />
          </svg>
        </button>

        {/* Mobile order summary content */}
        {showOrderSummary && (
          <div className="lg:hidden mb-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-[#E8DCC6]/40 p-6">
              <OrderSummaryContent
                items={items}
                subtotal={subtotal}
                discountAmount={discountAmount}
                shippingCost={shippingCost}
                total={total}
                appliedCoupon={appliedCoupon}
                shipping={shipping}
                countryNames={countryNames}
                formDataCountry={formData.country}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main checkout form - left column */}
          <div className="lg:col-span-2">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
                <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-[family-name:var(--font-eb-garamond)]">{error}</span>
              </div>
            )}

            {/* Contact Information Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-[#E8DCC6]/40 mb-6 overflow-hidden">
              <div
                className={`p-6 ${completedSections.contact ? 'cursor-pointer hover:bg-gray-50/50' : ''}`}
                onClick={() => completedSections.contact && setCurrentSection('contact')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">
                    1. Contactgegevens
                  </h2>
                  {completedSections.contact && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#2D2D2D]">{formData.email}</span>
                      <svg className="w-5 h-5 text-[#93c84a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>

                {currentSection === 'contact' && !completedSections.contact && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1 font-[family-name:var(--font-eb-garamond)]">
                        E-mailadres *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-3 py-2 border ${fieldErrors.email ? 'border-red-500' : 'border-[#E8DCC6]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#492c4a]/20 focus:border-[#492c4a] text-gray-900 bg-white/50 font-[family-name:var(--font-eb-garamond)]`}
                        placeholder="jouw@email.com"
                      />
                      {fieldErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1 font-[family-name:var(--font-eb-garamond)]">
                        Telefoonnummer (optioneel)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[#E8DCC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#492c4a]/20 focus:border-[#492c4a] text-gray-900 bg-white/50 font-[family-name:var(--font-eb-garamond)]"
                        placeholder="+31 6 12345678"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => proceedToSection('shipping')}
                      className="w-full bg-[#492c4a] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#6b4069] transition-all transform hover:scale-[1.02] font-[family-name:var(--font-eb-garamond)]"
                    >
                      Ga verder naar verzending
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address Section */}
            <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-[#E8DCC6]/40 mb-6 overflow-hidden ${currentSection !== 'shipping' && !completedSections.shipping ? 'opacity-60' : ''}`}>
              <div
                className={`p-6 ${completedSections.shipping ? 'cursor-pointer hover:bg-gray-50/50' : ''}`}
                onClick={() => completedSections.shipping && setCurrentSection('shipping')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">
                    2. Verzendadres
                  </h2>
                  {completedSections.shipping && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#2D2D2D]">
                        {formData.firstName} {formData.lastName}, {formData.address}, {formData.city}
                      </span>
                      <svg className="w-5 h-5 text-[#93c84a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>

                {currentSection === 'shipping' && !completedSections.shipping && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2D2D2D] mb-1 font-[family-name:var(--font-eb-garamond)]">
                          Voornaam *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-3 py-2 border ${fieldErrors.firstName ? 'border-red-500' : 'border-[#E8DCC6]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#492c4a]/20 focus:border-[#492c4a] text-gray-900 bg-white/50 font-[family-name:var(--font-eb-garamond)]`}
                        />
                        {fieldErrors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{fieldErrors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#2D2D2D] mb-1 font-[family-name:var(--font-eb-garamond)]">
                          Achternaam *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-3 py-2 border ${fieldErrors.lastName ? 'border-red-500' : 'border-[#E8DCC6]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#492c4a]/20 focus:border-[#492c4a] text-gray-900 bg-white/50 font-[family-name:var(--font-eb-garamond)]`}
                        />
                        {fieldErrors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{fieldErrors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1 font-[family-name:var(--font-eb-garamond)]">
                        Straatnaam en huisnummer *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-3 py-2 border ${fieldErrors.address ? 'border-red-500' : 'border-[#E8DCC6]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#492c4a]/20 focus:border-[#492c4a] text-gray-900 bg-white/50 font-[family-name:var(--font-eb-garamond)]`}
                        placeholder="Hoofdstraat 123"
                      />
                      {fieldErrors.address && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1 font-[family-name:var(--font-eb-garamond)]">
                        Appartement, suite, etc. (optioneel)
                      </label>
                      <input
                        type="text"
                        name="address2"
                        value={formData.address2}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[#E8DCC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#492c4a]/20 focus:border-[#492c4a] text-gray-900 bg-white/50 font-[family-name:var(--font-eb-garamond)]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2D2D2D] mb-1 font-[family-name:var(--font-eb-garamond)]">
                          Stad *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-3 py-2 border ${fieldErrors.city ? 'border-red-500' : 'border-[#E8DCC6]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#492c4a]/20 focus:border-[#492c4a] text-gray-900 bg-white/50 font-[family-name:var(--font-eb-garamond)]`}
                        />
                        {fieldErrors.city && (
                          <p className="mt-1 text-sm text-red-600">{fieldErrors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#2D2D2D] mb-1 font-[family-name:var(--font-eb-garamond)]">
                          Postcode *
                        </label>
                        <input
                          type="text"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-3 py-2 border ${fieldErrors.postcode ? 'border-red-500' : 'border-[#E8DCC6]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#492c4a]/20 focus:border-[#492c4a] text-gray-900 bg-white/50 font-[family-name:var(--font-eb-garamond)]`}
                        />
                        {fieldErrors.postcode && (
                          <p className="mt-1 text-sm text-red-600">{fieldErrors.postcode}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1 font-[family-name:var(--font-eb-garamond)]">
                        Land *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-[#E8DCC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#492c4a]/20 focus:border-[#492c4a] text-gray-900 bg-white/50 font-[family-name:var(--font-eb-garamond)]"
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
                    </div>

                    <button
                      type="button"
                      onClick={() => proceedToSection('shippingMethod')}
                      className="w-full bg-[#492c4a] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#6b4069] transition-all transform hover:scale-[1.02] font-[family-name:var(--font-eb-garamond)]"
                    >
                      Ga verder naar verzendmethode
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Method Section */}
            <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-[#E8DCC6]/40 mb-6 overflow-hidden ${currentSection !== 'shippingMethod' && !completedSections.shippingMethod ? 'opacity-60' : ''}`}>
              <div
                className={`p-6 ${completedSections.shippingMethod ? 'cursor-pointer hover:bg-gray-50/50' : ''}`}
                onClick={() => completedSections.shippingMethod && setCurrentSection('shippingMethod')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">
                    3. Verzendmethode
                  </h2>
                  {completedSections.shippingMethod && shipping.selectedRate && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#2D2D2D]">
                        {shipping.selectedRate.method_title} - €{shipping.selectedRate.cost.toFixed(2)}
                      </span>
                      <svg className="w-5 h-5 text-[#93c84a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>

                {currentSection === 'shippingMethod' && !completedSections.shippingMethod && (
                  <div className="space-y-4">
                    {shipping.loading ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#492c4a] mx-auto mb-2"></div>
                        <p className="text-sm text-[#2D2D2D]">Verzendopties worden geladen...</p>
                      </div>
                    ) : shipping.error ? (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{shipping.error}</p>
                      </div>
                    ) : shipping.rates.length > 0 ? (
                      <>
                        <div className="space-y-3">
                          {shipping.rates.map((rate) => (
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
                                    {rate.delivery_time && (
                                      <p className="text-sm text-gray-600">{rate.delivery_time}</p>
                                    )}
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
                          <p className="text-sm text-red-600">{fieldErrors.shippingMethod}</p>
                        )}

                        <button
                          type="button"
                          onClick={async () => {
                            if (validateSection('shippingMethod')) {
                              setLoading(true);
                              const orderId = await createOrder();
                              if (orderId) {
                                setOrderId(orderId);
                                proceedToSection('payment');
                              }
                              setLoading(false);
                            }
                          }}
                          disabled={loading}
                          className="w-full bg-[#fbe022] text-black py-3 px-6 rounded-full font-semibold hover:bg-[#e6cc1f] transition-all transform hover:scale-[1.02] disabled:bg-gray-300 disabled:text-gray-500 font-[family-name:var(--font-eb-garamond)] flex items-center justify-center"
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Order wordt aangemaakt...
                            </>
                          ) : (
                            'Ga verder naar betaling'
                          )}
                        </button>
                      </>
                    ) : (
                      <p className="text-center text-gray-600">Geen verzendmethodes beschikbaar</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Section */}
            <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-[#E8DCC6]/40 overflow-hidden ${currentSection !== 'payment' ? 'opacity-60' : ''}`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">
                    4. Betaling
                  </h2>
                </div>

                {currentSection === 'payment' && orderId && (
                  <div className="space-y-4">
                    {/* Billing address toggle */}
                    <div className="border-b border-[#E8DCC6] pb-4 mb-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="billingAddressSame"
                          checked={formData.billingAddressSame}
                          onChange={handleInputChange}
                          className="rounded text-[#492c4a] focus:ring-[#492c4a]"
                        />
                        <span className="text-sm text-[#2D2D2D] font-[family-name:var(--font-eb-garamond)]">
                          Factuuradres is hetzelfde als verzendadres
                        </span>
                      </label>
                    </div>

                    {!formData.billingAddressSame && (
                      <div className="space-y-4 mb-6">
                        <h3 className="font-medium text-[#2D2D2D]">Factuuradres</h3>
                        {/* Billing address fields - similar to shipping */}
                        {/* ... Add billing fields here if needed ... */}
                      </div>
                    )}

                    {/* Stripe Payment Form */}
                    <StripePaymentForm
                      orderId={orderId}
                      amount={total}
                      onSuccess={handlePaymentSuccess}
                      onError={(error) => setError(error)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order summary - right column (desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-[#E8DCC6]/40 p-6 lg:sticky lg:top-20">
              <h2 className="text-xl font-semibold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
                Besteloverzicht
              </h2>
              <OrderSummaryContent
                items={items}
                subtotal={subtotal}
                discountAmount={discountAmount}
                shippingCost={shippingCost}
                total={total}
                appliedCoupon={appliedCoupon}
                shipping={shipping}
                countryNames={countryNames}
                formDataCountry={formData.country}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Order Summary Component
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