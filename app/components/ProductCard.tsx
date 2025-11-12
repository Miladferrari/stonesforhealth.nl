'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback, memo, useEffect } from 'react';
import { useCartWithToast } from '../hooks/useCartWithToast';
import type { Product } from '@/lib/woocommerce';
import { getProductReviewSummary } from '@/lib/reviewGenerator';
import { trackAddToCart } from '../lib/analytics';

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartWithToast();
  const [isAdding, setIsAdding] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Function to render stars with partial fill based on rating
  const renderStars = (rating: number) => {
    // If rating is 0, show 5 empty gray stars
    if (rating === 0) {
      return (
        <>
          {[...Array(5)].map((_, i) => (
            <svg
              key={`star-${product.id}-${i}`}
              className="w-3.5 h-3.5 inline-block"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                fill="#D1D5DB"
              />
            </svg>
          ))}
        </>
      );
    }

    const fullStars = Math.floor(rating);
    const partialFill = (rating - fullStars) * 100;

    return (
      <>
        {[...Array(5)].map((_, i) => (
          <svg
            key={`star-${product.id}-${i}`}
            className="w-3.5 h-3.5 inline-block"
            viewBox="0 0 20 20"
          >
            <defs>
              {i === fullStars && partialFill > 0 && (
                <linearGradient id={`star-gradient-${product.id}-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset={`${partialFill}%`} stopColor="#FAD14C" />
                  <stop offset={`${partialFill}%`} stopColor="#D1D5DB" />
                </linearGradient>
              )}
            </defs>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              fill={
                i < fullStars ? '#FAD14C' :
                i === fullStars && partialFill > 0 ? `url(#star-gradient-${product.id}-${i})` :
                '#D1D5DB'
              }
            />
          </svg>
        ))}
      </>
    );
  };
  
  const mainImage = product.images[0];
  const price = parseFloat(product.price);
  const regularPrice = parseFloat(product.regular_price);
  const isOnSale = product.on_sale && regularPrice > price;
  const discount = isOnSale ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;
  
  // Check if product is out of stock
  const isOutOfStock = product.stock_status !== 'instock' || product.stock_quantity === 0;

  // Check if product is in bestsellers category (ID: 20)
  const isBestseller = product.categories?.some((cat: any) => cat.id === 20);

  // Get review data from the review generator - only for bestsellers
  const { rating, count: reviewCount } = isBestseller
    ? getProductReviewSummary(product.id)
    : { rating: 0, count: 0 };
  
  // Initialize wishlist state from localStorage
  useEffect(() => {
    const checkWishlistStatus = () => {
      try {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          const wishlist = JSON.parse(savedWishlist);
          if (Array.isArray(wishlist)) {
            const isInWishlist = wishlist.some((item: Product) => item.id === product.id);
            setIsWishlisted(isInWishlist);
          }
        }
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    };
    
    checkWishlistStatus();
    
    // Listen for wishlist updates
    window.addEventListener('wishlistUpdated', checkWishlistStatus);
    
    return () => {
      window.removeEventListener('wishlistUpdated', checkWishlistStatus);
    };
  }, [product.id]);
  
  const handleAddToCart = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Don't add to cart if out of stock
    if (isOutOfStock) return;

    setIsAdding(true);
    addToCart(product, 1);

    // Track add to cart event
    trackAddToCart({
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price),
      category: product.categories?.[0]?.name,
    }, 1);

    // Show animation
    setTimeout(() => {
      setIsAdding(false);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2000);
    }, 500);
  }, [product, addToCart, isOutOfStock]);

  const handleWishlistClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      let wishlist: Product[] = [];
      
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        if (Array.isArray(parsed)) {
          wishlist = parsed;
        }
      }
      
      if (!isWishlisted) {
        // Add product to wishlist
        wishlist.push(product);
      } else {
        // Remove product from wishlist
        wishlist = wishlist.filter((item: Product) => item.id !== product.id);
      }
      
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(!isWishlisted);
      
      // Dispatch event for other components
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  }, [isWishlisted, product]);

  return (
    <div className={`group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col ${isOutOfStock ? 'opacity-75' : ''}`}>
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden">
          <div className="relative w-full h-full">
            {mainImage ? (
              <Image
                src={mainImage.src}
                alt={mainImage.alt || product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white text-[#492c4a] px-4 py-2 rounded-full font-semibold text-sm">
              Bekijk Product
            </span>
          </div>
        </div>
      </Link>
        

      <div className="p-2 sm:p-3 md:p-4 flex flex-col h-full">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base md:text-lg font-[family-name:var(--font-eb-garamond)] line-clamp-1 hover:text-[#492c4a] transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {renderStars(rating)}
          </div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="min-h-[2.5rem] flex flex-col justify-end">
            {isOnSale && regularPrice > price && (
              <span className="text-xs text-gray-500 line-through block">
                €{regularPrice.toFixed(2)}
              </span>
            )}
            <span className="text-base sm:text-lg md:text-xl font-bold text-[#492c4a]">
              €{price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding || showAdded || isOutOfStock}
          className={`w-full rounded-lg text-sm sm:text-base font-semibold py-2.5 sm:py-3 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
            isOutOfStock
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : isAdding
              ? 'bg-[#492c4a]/80 text-white scale-95'
              : showAdded
              ? 'bg-green-600 text-white scale-95'
              : 'bg-[#492c4a] text-white hover:bg-[#492c4a]/90 hover:shadow-md active:scale-95'
          }`}
        >
          {isOutOfStock ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Uitverkocht
            </>
          ) : isAdding ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Toevoegen...
            </>
          ) : showAdded ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
              </svg>
              Toegevoegd!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              In Winkelwagen
            </>
          )}
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;