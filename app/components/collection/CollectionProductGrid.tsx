'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/woocommerce';
import { useCart } from '@/app/contexts/CartContextStoreAPI';
import { useToast } from '@/app/contexts/ToastContext';
import { getProductUrl } from '@/lib/slugify';
import { trackAddToCart, toAnalyticsItem } from '@/app/lib/analytics';

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

            const productUrl = getProductUrl(product);

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link href={productUrl}>
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
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
                        /* Een handvol producten heeft nog geen productfoto. Liever
                           het merkbeeld dan een grijs vlak met Engelse tekst. */
                        <div className="w-full h-full bg-[#f7f3f7] flex flex-col items-center justify-center gap-2 p-4">
                          <Image
                            src="/logo.webp"
                            alt=""
                            width={72}
                            height={72}
                            className="opacity-25"
                          />
                          <span className="text-[#492c4a]/50 text-xs text-center">Foto volgt</span>
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

                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="min-h-[2.5rem] flex flex-col justify-end">
                      {product.on_sale && product.regular_price ? (
                        <>
                          <span className="text-xs text-gray-500 line-through block">
                            €{parseFloat(product.regular_price).toFixed(2).replace('.', ',')}
                          </span>
                          {/* Zelfde opzet als in ProductCard: de korting bij het
                              bedrag, niet alleen in het hoekje op de foto */}
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-base sm:text-lg md:text-xl font-bold text-[#492c4a]">
                              €{parseFloat(product.price).toFixed(2).replace('.', ',')}
                            </span>
                            {discount > 0 && (
                              <span className="inline-flex items-center gap-1 rounded whitespace-nowrap text-black px-1.5 py-0.5" style={{ backgroundColor: '#fbe022' }}>
                                <span className="material-icons-outlined" style={{ fontSize: '13px' }}>local_offer</span>
                                <span className="text-[10px] sm:text-xs font-extrabold tracking-wide">{discount}% KORTING</span>
                              </span>
                            )}
                          </div>
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
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                      trackAddToCart(toAnalyticsItem(product), 1);
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