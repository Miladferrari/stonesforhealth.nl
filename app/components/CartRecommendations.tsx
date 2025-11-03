'use client';

import { useState, useEffect } from 'react';
import { useCartWithToast } from '../hooks/useCartWithToast';
import { Product } from '@/lib/woocommerce';

export default function CartRecommendations() {
  const { addToCart } = useCartWithToast();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?per_page=4&orderby=popularity')
      .then(res => res.json())
      .then(data => {
        setRecommendations(data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || recommendations.length === 0) return null;

  return (
    <div className="border-t border-gray-200 p-4 bg-gradient-to-b from-white to-gray-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-navy-blue text-sm sm:text-base flex items-center gap-2">
          <svg className="w-4 h-4 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          Aanbevolen voor jou
        </h3>
        <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-full">
          Bestsellers
        </span>
      </div>

      <div className="space-y-2">
        {recommendations.map((product) => {
          const price = parseFloat(product.price);
          const mainImage = product.images[0];

          return (
            <div key={product.id} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100 hover:border-medical-green/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-md flex-shrink-0 flex items-center justify-center p-1">
                {mainImage ? (
                  <img
                    src={mainImage.src}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-medium text-navy-blue line-clamp-1 hover:text-medical-green transition-colors">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-medical-green font-bold text-sm">€{price.toFixed(2)}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => addToCart(product, 1)}
                className="p-2 bg-medical-green text-white rounded-lg hover:bg-medical-green/90 transition-all transform hover:scale-105 active:scale-95"
                title="Toevoegen aan winkelwagen"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-center">
        <p className="text-xs text-steel-gray">
          <span className="inline-flex items-center gap-1">
            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Gratis verzending bij bestellingen boven €30
          </span>
        </p>
      </div>
    </div>
  );
}