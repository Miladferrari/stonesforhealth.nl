'use client';

import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartWithToast } from '../hooks/useCartWithToast';
import CouponInput from './CouponInput';

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
  const router = useRouter();

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
      {/* Improved Backdrop with blur effect */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-navy-blue/20 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Redesigned cart panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-blue to-navy-blue/95 text-white p-4 sm:p-5">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl sm:text-2xl font-bold">Winkelwagen</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm sm:text-base text-gray-200">
              {totalItems === 0 ? 'Je winkelwagen is leeg' : `${totalItems} ${totalItems === 1 ? 'item' : 'items'} in je winkelwagen`}
            </p>
          </div>


          {/* Cart items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8">
                <div className="w-24 h-24 bg-off-white rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-steel-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-steel-gray text-lg mb-6 text-center">
                  Voeg producten toe aan je winkelwagen
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-medical-green text-white px-6 py-3 rounded-full font-semibold hover:bg-medical-green/90 transition-colors"
                >
                  Verder winkelen
                </button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {items.map((item) => {
                  const price = parseFloat(item.product.price);
                  const mainImage = item.product.images[0];

                  return (
                    <div key={item.product.id} className="bg-off-white rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        {/* Product image */}
                        <div className="w-24 h-24 bg-gray-100 rounded-md flex-shrink-0 shadow-sm flex items-center justify-center p-2">
                          {mainImage ? (
                            <img
                              src={mainImage.src}
                              alt={mainImage.alt || item.product.name}
                              className="max-w-full max-h-full object-contain"
                              style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-steel-gray/50">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Product details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-navy-blue text-base line-clamp-2 mb-1">
                            {item.product.name}
                          </h3>
                          <p className="text-medical-green font-bold text-lg">€{price.toFixed(2)}</p>
                          
                          {/* Quantity controls */}
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center bg-white rounded-lg shadow-sm">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="px-3 py-2 hover:bg-gray-50 transition-colors rounded-l-lg group"
                              >
                                <svg className="w-4 h-4 text-steel-gray group-hover:text-navy-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                                </svg>
                              </button>
                              <span className="px-4 py-2 font-semibold text-navy-blue min-w-[3rem] text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="px-3 py-2 hover:bg-gray-50 transition-colors rounded-r-lg group"
                              >
                                <svg className="w-4 h-4 text-steel-gray group-hover:text-navy-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                                </svg>
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-amber-orange hover:text-amber-orange/80 transition-colors"
                              title="Verwijderen"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Item total */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm text-steel-gray">Totaal</p>
                          <p className="font-bold text-navy-blue text-lg">€{(price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer with total and checkout button */}
          {items.length > 0 && (
            <div className="bg-gradient-to-t from-gray-50 to-white border-t p-4 sm:p-5">
              {/* Free shipping progress */}
              {shipping.rates.length > 0 && (() => {
                const freeShippingRate = shipping.rates.find(r => r.method_id.includes('free_shipping'));
                const flatRate = shipping.rates.find(r => r.method_id.includes('flat_rate'));
                const currentRate = freeShippingRate || flatRate || shipping.rates[0];
                
                if (currentRate?.free_shipping_remaining && currentRate.free_shipping_remaining > 0) {
                  const progressPercentage = Math.min(
                    (getTotalPriceAfterDiscount() / (getTotalPriceAfterDiscount() + currentRate.free_shipping_remaining)) * 100,
                    100
                  );
                  
                  return (
                    <div className="mb-4 bg-amber-50 rounded-lg p-3 border border-amber-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-medium text-amber-800">
                            Nog €{currentRate.free_shipping_remaining.toFixed(2)} tot gratis verzending!
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-amber-200 rounded-full h-2">
                        <div 
                          className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  );
                } else if (currentRate?.free && currentRate?.free_shipping_eligible) {
                  return (
                    <div className="mb-4 bg-green-50 rounded-lg p-3 border border-green-200 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-green-800">
                        Je komt in aanmerking voor gratis verzending!
                      </span>
                    </div>
                  );
                }
                return null;
              })()}
              
              {/* Discount code section */}
              <div className="mb-4">
                <CouponInput variant="compact" />
              </div>

              {/* Subtotal */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-700">Subtotaal</span>
                  <span className="text-sm sm:text-base text-gray-900">€{getTotalPrice().toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>
                      Korting
                      {appliedCoupon.discount_type === 'percent' && ` (${appliedCoupon.amount}%)`}
                    </span>
                    <span>-€{getDiscountAmount().toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-bold text-navy-blue">Totaal</span>
                    <span className="text-xl sm:text-2xl font-bold text-medical-green">€{getTotalPriceAfterDiscount().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Action buttons and payment methods combined */}
              <div className="space-y-2 relative z-10">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = '/checkout';
                  }}
                  className="block w-full bg-medical-green text-white text-center py-3 sm:py-3.5 rounded-full font-semibold hover:bg-medical-green/90 transition-all shadow-lg hover:shadow-xl cursor-pointer text-sm sm:text-base"
                >
                  Verder naar checkout
                </button>
                
                {/* Payment methods section - more compact */}
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-0.5">
                    <Image src="/images/ideal.png" alt="iDEAL" width={30} height={20} className="h-[14px] sm:h-[16px] w-auto" />
                    <Image src="/images/mastercard.png" alt="Mastercard" width={36} height={20} className="h-[14px] sm:h-[16px] w-auto" />
                    <Image src="/images/visa.png" alt="Visa" width={48} height={20} className="h-[14px] sm:h-[16px] w-auto" />
                    <Image src="/images/klarna.png" alt="Klarna" width={40} height={20} className="h-[14px] sm:h-[16px] w-auto" />
                  </div>
                  <p className="text-[10px] sm:text-xs text-steel-gray">Betaal zoals u wilt</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}