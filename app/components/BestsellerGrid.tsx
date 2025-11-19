'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/contexts/CartContextStoreAPI';
import { getProductReviewSummary } from '@/lib/reviewGenerator';
import { getProductUrl } from '@/lib/slugify';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price?: string;
  sale_price?: string;
  images?: Array<{
    src: string;
    alt: string;
  }>;
  on_sale: boolean;
  average_rating?: string;
  rating_count?: number;
}

export default function BestsellerGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Function to render stars with partial fill based on rating
  const renderStars = (rating: number, productId: number) => {
    const fullStars = Math.floor(rating);
    const partialFill = (rating - fullStars) * 100;

    return (
      <>
        {[...Array(5)].map((_, i) => (
          <svg
            key={`star-${productId}-${i}`}
            className="w-3.5 h-3.5 inline-block"
            viewBox="0 0 20 20"
          >
            <defs>
              {i === fullStars && partialFill > 0 && (
                <linearGradient id={`star-gradient-bestseller-${productId}-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset={`${partialFill}%`} stopColor="#FBBF24" />
                  <stop offset={`${partialFill}%`} stopColor="#D1D5DB" />
                </linearGradient>
              )}
            </defs>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              fill={
                i < fullStars ? '#FBBF24' :
                i === fullStars && partialFill > 0 ? `url(#star-gradient-bestseller-${productId}-${i})` :
                '#D1D5DB'
              }
            />
          </svg>
        ))}
      </>
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch from bestsellers category (ID: 20), limited to 5 products
      const response = await fetch('/api/woocommerce/products?per_page=5&category=20');
      if (response.ok) {
        const data = await response.json();
        // Take maximum 5 products
        setProducts(data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdd = async (product: Product) => {
    addToCart(product as any, 1);
  };

  // Generate a color based on product name for placeholder backgrounds
  const getPlaceholderColor = (name: string) => {
    const colors = [
      'from-purple-50 to-purple-100',
      'from-pink-50 to-pink-100',
      'from-yellow-50 to-amber-100',
      'from-blue-50 to-blue-100',
      'from-green-50 to-green-100',
    ];
    return colors[name.length % colors.length];
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {[1].map((n) => (
          <div key={n} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Geen producten beschikbaar</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
      {products.map((product) => {
        const productUrl = getProductUrl(product);

        return (
          <div
            key={product.id}
            className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
          {/* Product Image - Clickable Link */}
          <Link href={productUrl}>
            <div className="relative aspect-square overflow-hidden">
              {/* Bestseller Badge */}
              <div className="absolute top-2 left-2 z-10 bg-[#492c4a] text-white text-xs px-2 py-1 rounded-full font-bold">
                Bestseller
              </div>

              {/* Product Image */}
              {product.images && product.images.length > 0 ? (
                <div className="relative w-full h-full">
                  <Image
                    src={product.images[0].src}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
              ) : (
                <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getPlaceholderColor(product.name)}`}>
                  <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-[#492c4a] px-4 py-2 rounded-full font-semibold text-sm">
                  Bekijk Product
                </span>
              </div>
            </div>
          </Link>

          {/* Product Info - Separate from Link */}
          <div className="p-2 sm:p-3 md:p-4 flex flex-col h-full">
            {/* Product Title - Also Clickable */}
            <Link href={productUrl}>
              <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base md:text-lg font-[family-name:var(--font-eb-garamond)] line-clamp-1 hover:text-[#492c4a] transition-colors cursor-pointer">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            {(() => {
              const reviewData = getProductReviewSummary(product.id);
              return (
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {renderStars(reviewData.rating, product.id)}
                  </div>
                  <span className="text-xs text-gray-500">({reviewData.count})</span>
                </div>
              );
            })()}

            {/* Price */}
            <div className="flex items-center justify-between mb-3">
              <div className="min-h-[2.5rem] flex flex-col justify-end">
                {product.on_sale && product.regular_price ? (
                  <>
                    <span className="text-xs text-gray-500 line-through block">
                      €{parseFloat(product.regular_price).toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-base sm:text-lg md:text-xl font-bold text-[#492c4a]">
                      €{parseFloat(product.price).toFixed(2).replace('.', ',')}
                    </span>
                  </>
                ) : (
                  <span className="text-base sm:text-lg md:text-xl font-bold text-[#492c4a]">
                    €{parseFloat(product.price).toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
            </div>

            {/* Spacer to push button to bottom */}
            <div className="flex-grow"></div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleQuickAdd(product);
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

      {/* Empty placeholders if less than 5 products - Optional, can be removed */}
      {products.length < 5 && products.length > 0 && (
        <>
          {Array.from({ length: Math.min(5 - products.length, 4) }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="relative bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200"
            >
              <div className="aspect-square flex items-center justify-center">
                <div className="text-center p-4">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-sm text-gray-400">Binnenkort meer</p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}