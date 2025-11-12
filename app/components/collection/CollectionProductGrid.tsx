'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/woocommerce';
import { useCart } from '@/app/contexts/CartContextStoreAPI';
import { useToast } from '@/app/contexts/ToastContext';
import { getProductReviewSummary } from '@/lib/reviewGenerator';

interface CollectionProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CollectionProductGrid({
  products,
  currentPage,
  totalPages,
  onPageChange
}: CollectionProductGridProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const calculateDiscount = (product: Product) => {
    if (!product.on_sale || !product.regular_price) return 0;
    const regular = parseFloat(product.regular_price);
    const sale = parseFloat(product.price);
    return Math.round(((regular - sale) / regular) * 100);
  };

  const renderStars = (rating: number, productId: number) => {
    // If rating is 0, show 5 empty gray stars
    if (rating === 0) {
      return (
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={`star-${productId}-${i}`}
              className="w-3.5 h-3.5 inline-block"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                fill="#D1D5DB"
              />
            </svg>
          ))}
        </div>
      );
    }

    const fullStars = Math.floor(rating);
    const partialFill = (rating - fullStars) * 100;

    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={`star-${productId}-${i}`}
            className="w-3.5 h-3.5 inline-block"
            viewBox="0 0 20 20"
          >
            <defs>
              {i === fullStars && partialFill > 0 && (
                <linearGradient id={`star-gradient-collection-${productId}-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset={`${partialFill}%`} stopColor="#FAD14C" />
                  <stop offset={`${partialFill}%`} stopColor="#D1D5DB" />
                </linearGradient>
              )}
            </defs>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              fill={
                i < fullStars ? '#FAD14C' :
                i === fullStars && partialFill > 0 ? `url(#star-gradient-collection-${productId}-${i})` :
                '#D1D5DB'
              }
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Empty State */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Producten komen binnenkort
            </h3>
            <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
              We werken aan deze collectie. Bekijk ondertussen onze andere producten.
            </p>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {products.map((product) => {
            const discount = calculateDiscount(product);
            const isHovered = hoveredProduct === product.id;

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link href={`/product/${product.slug}`}>
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-2 left-2 z-10 bg-[#492c4a] text-white text-xs px-2 py-1 rounded-full font-bold">
                        -{discount}%
                      </div>
                    )}

                    {/* Product Image with Hover Effect */}
                    <div className="relative w-full h-full">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0].src}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Quick View Button (appears on hover) */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white text-[#492c4a] px-4 py-2 rounded-full font-semibold text-sm">
                        Bekijk Product
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-2 sm:p-3 md:p-4 flex flex-col h-full">
                  <Link href={`/product/${product.slug}`}>
                    {/* Product Title */}
                    <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base md:text-lg font-[family-name:var(--font-eb-garamond)] line-clamp-1 hover:text-[#492c4a] transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  {(() => {
                    // Check if product is in bestsellers category (ID: 20)
                    const isBestseller = product.categories?.some((cat: any) => cat.id === 20);

                    // Get review data from the review generator - only for bestsellers
                    const reviewData = isBestseller
                      ? getProductReviewSummary(product.id)
                      : { rating: 0, count: 0 };

                    return (
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(reviewData.rating, product.id)}
                        <span className="text-xs text-gray-500">
                          ({reviewData.count})
                        </span>
                      </div>
                    );
                  })()}

                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="min-h-[2.5rem] flex flex-col justify-end">
                      {product.on_sale && product.regular_price ? (
                        <>
                          <span className="text-xs text-gray-500 line-through block">
                            €{parseFloat(product.regular_price).toFixed(2)}
                          </span>
                          <span className="text-base sm:text-lg md:text-xl font-bold text-[#492c4a]">
                            €{parseFloat(product.price).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-base sm:text-lg md:text-xl font-bold text-[#492c4a]">
                          €{parseFloat(product.price).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Spacer to push button to bottom */}
                  <div className="flex-grow"></div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                      showToast('Product toegevoegd aan winkelwagen!', 'success');
                    }}
                    className="w-full rounded-lg text-sm sm:text-base font-semibold py-2.5 sm:py-3 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm bg-[#492c4a] text-white hover:bg-[#492c4a]/90 hover:shadow-md active:scale-95"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    In Winkelwagen
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        )}
      </div>
    </div>
  );
}