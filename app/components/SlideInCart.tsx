'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCartWithToast } from '../hooks/useCartWithToast';

export default function SlideInCart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalPriceAfterDiscount,
    getDiscountAmount,
    isCartOpen,
    setIsCartOpen,
    appliedCoupon,
    shipping
  } = useCartWithToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Restore scrolling
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isCartOpen]);

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }


  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Clean backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-all duration-300"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Clean minimalist cart panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Elegant Header */}
          <div className="border-b border-[#E8DCC6] bg-gradient-to-r from-[#faf8f4] to-white px-5 py-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">Je Winkelwagen</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-[#492c4a]/5 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-[#492c4a]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Free shipping progress bar */}
            {items.length > 0 && shipping.rates.length > 0 && (() => {
              const freeShippingRate = shipping.rates.find(r => r.method_id.includes('free_shipping'));
              const flatRate = shipping.rates.find(r => r.method_id.includes('flat_rate'));
              const currentRate = freeShippingRate || flatRate || shipping.rates[0];

              if (currentRate?.free_shipping_remaining && currentRate.free_shipping_remaining > 0) {
                const progressPercentage = Math.min(
                  (getTotalPriceAfterDiscount() / (getTotalPriceAfterDiscount() + currentRate.free_shipping_remaining)) * 100,
                  100
                );

                return (
                  <div className="mt-3 bg-[#492c4a]/5 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-2">
                      Nog <span className="font-semibold text-[#492c4a]">€{currentRate.free_shipping_remaining.toFixed(2)}</span> voor gratis verzending
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-[#492c4a] h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>


          {/* Cart items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8">
                <div className="w-20 h-20 bg-[#492c4a]/5 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-[#492c4a]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-[#492c4a]/60 text-sm mb-4 text-center">
                  Je winkelwagen is leeg
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#492c4a] text-white px-5 py-2 rounded-full text-sm hover:bg-[#492c4a]/90 transition-colors"
                >
                  Verder winkelen
                </button>
              </div>
            ) : (
              <div className="px-5 py-4 space-y-3 bg-white">
                {items.map((item) => {
                  const price = parseFloat(item.product.price);
                  const regularPrice = item.product.regular_price ? parseFloat(item.product.regular_price) : price;
                  const mainImage = item.product.images[0];
                  const hasDiscount = regularPrice > price;

                  return (
                    <div key={item.product.id} className="bg-white border border-[#E8DCC6]/40 rounded-lg overflow-hidden hover:border-[#492c4a]/20 transition-colors">
                      <div className="flex gap-4 p-4">
                        {/* Product image */}
                        <div className="w-20 h-20 flex-shrink-0">
                          <a href={`/product/${item.product.id}`} className="block w-full h-full">
                            {mainImage ? (
                              <img
                                src={mainImage.src}
                                alt={mainImage.alt || item.product.name}
                                className="w-full h-full object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </a>
                        </div>

                        {/* Product details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 pr-2">
                              <a href={`/product/${item.product.id}`} className="text-sm font-medium text-gray-900 hover:text-[#492c4a] transition-colors line-clamp-2">
                                {item.product.name}
                              </a>
                              {item.product.attributes && item.product.attributes.length > 0 && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {item.product.attributes.map(attr => attr.option).join(' / ')}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 text-[#492c4a]/30 hover:text-red-500 transition-colors"
                              title="Verwijderen"
                              aria-label="Verwijderen"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex items-end justify-between">
                            {/* Quantity controls */}
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-7 h-7 border border-[#E8DCC6] rounded-l flex items-center justify-center hover:bg-[#492c4a]/5 transition-colors"
                                disabled={item.quantity <= 1}
                                aria-label="Verminder"
                              >
                                <svg className="w-3.5 h-3.5 text-[#492c4a]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <div className="w-10 h-7 border-t border-b border-[#E8DCC6] flex items-center justify-center bg-white">
                                <span className="text-sm font-medium text-[#492c4a]">{item.quantity}</span>
                              </div>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 border border-[#E8DCC6] rounded-r flex items-center justify-center hover:bg-[#492c4a]/5 transition-colors"
                                aria-label="Verhoog"
                              >
                                <svg className="w-3.5 h-3.5 text-[#492c4a]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="flex flex-col items-end">
                                <span className="text-sm font-semibold text-[#492c4a]">
                                  €{(price * item.quantity).toFixed(2)}
                                </span>
                                {hasDiscount && (
                                  <span className="text-xs text-gray-500 line-through">
                                    €{(regularPrice * item.quantity).toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
            )}
          </div>

          {/* Clean Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 bg-white">
              <div className="px-5 py-4">
              

              {/* Simple Totals */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl text-gray-600 font-[family-name:var(--font-eb-garamond)]">Totale korting</span>
                  <span className="text-2xl font-medium text-green-600 font-[family-name:var(--font-eb-garamond)]">
                    {getDiscountAmount() > 0 ? `-€${getDiscountAmount().toFixed(2)}` : '€0.00'}
                  </span>
                </div>
                {shipping.rates.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">Verzending</span>
                    <span className="text-lg font-medium text-gray-900 font-[family-name:var(--font-eb-garamond)]">
                      {shipping.rates[0]?.free ? 'Gratis' : `€${shipping.rates[0]?.cost || '0.00'}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-medium text-gray-900 font-[family-name:var(--font-eb-garamond)]">Totaal</span>
                  <span className="text-3xl font-bold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">€{getTotalPriceAfterDiscount().toFixed(2)}</span>
                </div>
              </div>
              
              {/* Simplified Checkout */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = '/checkout';
                  }}
                  className="block w-full bg-[#492c4a] text-white text-center py-4 rounded-lg font-medium hover:bg-[#492c4a]/90 transition-all shadow-sm hover:shadow-md font-[family-name:var(--font-eb-garamond)]"
                >
                  <span className="flex items-center justify-center gap-2 text-2xl">
                    Veilig afrekenen
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>

                {/* Trust and payment section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-[family-name:var(--font-eb-garamond)]">Veilig betalen</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      <span className="font-[family-name:var(--font-eb-garamond)]">Gratis verzending vanaf €75</span>
                    </div>
                  </div>

                  {/* Payment icons */}
                  <div className="flex items-center justify-center gap-3">
                    <Image src="/images/ideal.png" alt="iDEAL" width={32} height={20} className="h-4 w-auto opacity-70" />
                    <Image src="/images/mastercard.png" alt="Mastercard" width={36} height={20} className="h-4 w-auto opacity-70" />
                    <Image src="/images/visa.png" alt="Visa" width={44} height={20} className="h-4 w-auto opacity-70" />
                  </div>
                </div>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}