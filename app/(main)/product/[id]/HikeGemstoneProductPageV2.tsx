'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/contexts/CartContextStoreAPI';
import { Product } from '@/lib/woocommerce';
import { generateProductReviewData } from '@/lib/reviewGenerator';

interface HikeGemstoneProductPageV2Props {
  product: Product;
  relatedProducts?: Product[];
}

// Legacy customer reviews data (will be replaced by dynamic generation)
const legacyCustomerReviews = [
  {
    id: 1,
    name: "Sarah van der Meer",
    location: "Amsterdam",
    rating: 5,
    date: "2 weken geleden",
    verified: true,
    text: "Deze amethist heeft mijn leven veranderd! Ik voel me rustiger en slaap eindelijk weer door.",
    image: "/images/review-1.jpg"
  },
  {
    id: 2,
    name: "Mark Jansen",
    location: "Rotterdam",
    rating: 5,
    date: "1 maand geleden",
    verified: true,
    text: "Prachtige kwaliteit en de energie is direct voelbaar. Aanrader!",
    image: "/images/review-2.jpg"
  },
  {
    id: 3,
    name: "Lisa de Boer",
    location: "Utrecht",
    rating: 4,
    date: "3 weken geleden",
    verified: true,
    text: "Mijn angsten zijn verminderd sinds ik deze steen draag. Heel tevreden!",
    image: "/images/review-3.jpg"
  },
  {
    id: 4,
    name: "Peter Bakker",
    location: "Den Haag",
    rating: 5,
    date: "1 week geleden",
    verified: true,
    text: "Gebruik hem tijdens meditatie. De kracht is fenomenaal.",
    image: "/images/review-4.jpg"
  },
  {
    id: 5,
    name: "Emma Visser",
    location: "Eindhoven",
    rating: 4,
    date: "2 maanden geleden",
    verified: true,
    text: "Mooiste steen uit mijn collectie. Super blij mee!",
    image: "/images/review-5.jpg"
  }
];

export default function HikeGemstoneProductPageV2({ product, relatedProducts = [] }: HikeGemstoneProductPageV2Props) {
  const { addToCart, items } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [selectedSize, setSelectedSize] = useState('3-5 cm');
  const [selectedBundle, setSelectedBundle] = useState('single');
  const [showReviewDropdown, setShowReviewDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(12); // Initially show 3 rows (12 reviews on desktop, 4 cols x 3 rows)
  const headerRef = useRef<HTMLDivElement>(null);
  const reviewDropdownRef = useRef<HTMLDivElement>(null);
  const reviewButtonRef = useRef<HTMLButtonElement>(null);

  // Check if product is out of stock
  const isOutOfStock = product.stock_status !== 'instock' || product.stock_quantity === 0;

  // Check how many of this product are already in cart
  const cartQuantity = items.find(item => item.product.id === product.id)?.quantity || 0;

  // Check if we've reached the maximum quantity (stock limit)
  const hasReachedMaxQuantity = product.stock_quantity !== null && cartQuantity >= product.stock_quantity;

  // Calculate available quantity (stock minus what's in cart)
  const availableQuantity = product.stock_quantity !== null ? Math.max(0, product.stock_quantity - cartQuantity) : Infinity;

  // Check if each bundle option is available
  const canSelectSingle = availableQuantity >= 1;
  const canSelectDuo = availableQuantity >= 2;
  const canSelectFamily = availableQuantity >= 3;

  // Generate comprehensive review data with individual reviews
  const reviewData = generateProductReviewData(product.id);
  const customerReviews = reviewData.reviews;
  console.log('[Reviews] Generated data:', reviewData);

  // Helper function to render stars based on rating
  const renderStars = (rating: number, size: string = 'w-4 h-4') => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    const partialFill = ((rating % 1) * 100).toFixed(0);

    return (
      <div className="flex gap-0">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className={`${size} text-[#FAD14C] fill-current`} viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}

        {/* Partial star */}
        {hasHalfStar && (
          <svg className={`${size} text-gray-300 fill-current relative`} viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`star-gradient-${rating}`}>
                <stop offset={`${partialFill}%`} stopColor="#FAD14C" />
                <stop offset={`${partialFill}%`} stopColor="#e0e0e0" />
              </linearGradient>
            </defs>
            <path fill={`url(#star-gradient-${rating})`} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        )}

        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className={`${size} text-gray-300 fill-current`} viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  // Extract gemstone properties - using default values
  const gemstoneData = {
    chakra: 'Hart Chakra',
    origin: 'Brazilië',
    size: '3-5 cm',
    energy: 'Kalmerend & Beschermend',
  };

  // Calculate pricing
  const price = parseFloat(product.price);
  const regularPrice = product.regular_price ? parseFloat(product.regular_price) : price;
  const isOnSale = product.on_sale && regularPrice > price;
  const discount = isOnSale ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;

  // Bundle pricing
  const bundlePrices = {
    single: price,
    duo: price * 1.8,
    family: price * 2.5
  };

  // Auto-adjust selected bundle if current selection becomes unavailable
  useEffect(() => {
    if (selectedBundle === 'family' && !canSelectFamily) {
      if (canSelectDuo) {
        setSelectedBundle('duo');
      } else if (canSelectSingle) {
        setSelectedBundle('single');
      }
    } else if (selectedBundle === 'duo' && !canSelectDuo) {
      if (canSelectSingle) {
        setSelectedBundle('single');
      }
    }
  }, [availableQuantity, selectedBundle, canSelectSingle, canSelectDuo, canSelectFamily]);

  // Handle sticky header visibility using Intersection Observer
  useEffect(() => {
    const mainButton = document.getElementById('mainAddToCartButton');
    if (!mainButton) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isDesktop = window.innerWidth >= 1024;

          if (isDesktop) {
            // On desktop: only show sticky when button has COMPLETELY scrolled out of view
            // Check if the BOTTOM of the button is above the viewport (completely scrolled past)
            const buttonBottom = entry.boundingClientRect.bottom;
            const isCompletelyAboveViewport = buttonBottom < 0;

            setShowStickyHeader(isCompletelyAboveViewport);
          } else {
            // On mobile/tablet: show when button is not visible
            setShowStickyHeader(!entry.isIntersecting);
          }
        });
      },
      {
        // Trigger when button is fully out of view
        threshold: 0,
        rootMargin: '0px'
      }
    );

    observer.observe(mainButton);

    return () => {
      observer.disconnect();
    };
  }, [product]); // Re-run when product changes

  // Handle review dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        reviewDropdownRef.current &&
        !reviewDropdownRef.current.contains(event.target as Node) &&
        reviewButtonRef.current &&
        !reviewButtonRef.current.contains(event.target as Node)
      ) {
        setShowReviewDropdown(false);
      }
    };

    if (showReviewDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showReviewDropdown]);

  // Auto-rotate reviews in dropdown
  useEffect(() => {
    if (showReviewDropdown) {
      const interval = setInterval(() => {
        setCurrentReviewIndex((prev) => (prev + 1) % customerReviews.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showReviewDropdown]);


  const handleAddToCart = async () => {
    // Don't add to cart if out of stock or max quantity reached
    if (isOutOfStock || hasReachedMaxQuantity) {
      console.warn('Cannot add to cart:', isOutOfStock ? 'Out of stock' : 'Max quantity reached');
      return;
    }

    const quantityToAdd = selectedBundle === 'duo' ? 2 : selectedBundle === 'family' ? 3 : 1;

    // Double-check that selected bundle quantity is available
    if (quantityToAdd > availableQuantity) {
      console.warn('Cannot add to cart: Selected bundle quantity exceeds available stock');
      return;
    }

    setIsAddingToCart(true);

    try {
      addToCart(product as any, quantityToAdd);
      // Show success animation
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setIsAddingToCart(false);
    }
  };

  // Check if product has images
  const hasImages = product.images && product.images.length > 0;
  const images = hasImages ? product.images : [];

  // Create array with actual images and placeholders for empty slots
  const thumbnailSlots = Array(6).fill(null).map((_, index) => {
    if (index < images.length) {
      return images[index];
    }
    return null; // Empty slot
  });

  return (
    <div className="min-h-screen bg-white">

      {/* STICKY ADD TO CART */}
      <div
        id="stickyAddToCart"
        className={`fixed top-[120px] md:top-[135px] lg:top-[130px] xl:top-[130px] 2xl:top-[130px] left-0 right-0 bg-white shadow-lg z-40 transition-transform duration-300 ${
          showStickyHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="wrapper">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 py-2.5 sm:py-3">
              {/* Product Image - Visible on all sizes */}
              <div className="flex-shrink-0">
                {images[0] && (
                  <Image
                    src={images[0].src}
                    alt={product.name}
                    width={65}
                    height={65}
                    className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover rounded"
                  />
                )}
              </div>

              {/* Mobile: Price only | Desktop: Full product info */}
              <div className="flex-1 overflow-hidden">
                {/* Mobile view - Only price */}
                <div className="sm:hidden">
                  <span className="text-lg font-bold text-black font-[family-name:var(--font-eb-garamond)]">
                    €{selectedBundle === 'single' ? price.toFixed(2).replace('.', ',') :
                      selectedBundle === 'duo' ? bundlePrices.duo.toFixed(2).replace('.', ',') :
                      bundlePrices.family.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                {/* Desktop view - Full info */}
                <div className="hidden sm:block">
                  <h5 className="text-sm sm:text-base font-semibold text-gray-900 truncate font-[family-name:var(--font-eb-garamond)]">{product.name}</h5>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="text-base sm:text-lg font-semibold text-black font-[family-name:var(--font-eb-garamond)]">
                      €{selectedBundle === 'single' ? price.toFixed(2).replace('.', ',') :
                        selectedBundle === 'duo' ? bundlePrices.duo.toFixed(2).replace('.', ',') :
                        bundlePrices.family.toFixed(2).replace('.', ',')}
                    </span>
                    {isOnSale && (
                      <>
                        <span className="text-xs sm:text-sm text-gray-400 line-through hidden min-[808px]:inline font-[family-name:var(--font-eb-garamond)]">
                          €{selectedBundle === 'single' ? regularPrice.toFixed(2).replace('.', ',') :
                            selectedBundle === 'duo' ? (regularPrice * 2).toFixed(2).replace('.', ',') :
                            (regularPrice * 3).toFixed(2).replace('.', ',')}
                        </span>
                        <span className="badge inline-flex max-[425px]:inline-flex items-center gap-1 text-black text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded hidden lg:inline-flex font-[family-name:var(--font-eb-garamond)]" style={{ backgroundColor: '#fbe022' }}>
                          <span className="material-icons-outlined text-xs sm:text-sm">local_offer</span>
                          <span>JE BESPAART {selectedBundle === 'duo' ? '10' : selectedBundle === 'family' ? '17' : discount}%</span>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Bundle Selector - Improved styling */}
              <div className="relative">
                <select
                  className="appearance-none px-3 sm:px-4 lg:px-5 py-2.5 sm:py-2.5 lg:py-3 pr-8 sm:pr-10 border border-gray-300 sm:border-gray-400 rounded-md sm:rounded-lg text-xs sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-white text-black cursor-pointer hover:border-black transition-all min-w-[85px] sm:min-w-[140px] lg:min-w-[180px] font-[family-name:var(--font-eb-garamond)]"
                  value={selectedBundle}
                  onChange={(e) => {
                    setSelectedBundle(e.target.value);
                    // Update quantity based on bundle selection
                    if (e.target.value === 'single') setQuantity(1);
                    else if (e.target.value === 'duo') setQuantity(2);
                    else if (e.target.value === 'family') setQuantity(3);
                  }}
                >
                  <option value="single">1 paar</option>
                  <option value="duo">2 paar</option>
                  <option value="family">3 paar</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Add to Cart Button - Different designs for mobile and desktop */}
              <div className="flex-shrink-0 md:flex-initial">
                {/* Mobile Button (≤768px) - Compact version */}
                <button
                  onClick={handleAddToCart}
                  className={`md:hidden px-3 py-2.5 font-bold rounded-md transition-all min-h-[44px] font-[family-name:var(--font-eb-garamond)] ${
                    isOutOfStock || hasReachedMaxQuantity
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-[#fbe022] text-black hover:bg-[#e6cc1f]'
                  }`}
                  disabled={isAddingToCart || isOutOfStock || hasReachedMaxQuantity}
                  type="button"
                >
                  {isOutOfStock ? (
                    <span className="text-xs font-bold font-[family-name:var(--font-eb-garamond)]">Uitverkocht</span>
                  ) : hasReachedMaxQuantity ? (
                    <span className="text-xs font-bold font-[family-name:var(--font-eb-garamond)]">Binnenkort weer beschikbaar</span>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <span className="material-icons-outlined text-lg">shopping_cart</span>
                      <span className="text-xs font-bold hidden min-[400px]:inline font-[family-name:var(--font-eb-garamond)]">Voeg toe</span>
                    </span>
                  )}
                </button>

                {/* Desktop Button (>768px) */}
                <button
                  onClick={handleAddToCart}
                  className={`hidden md:flex px-4 lg:px-6 py-2.5 lg:py-3 font-bold rounded-lg transition-all items-center justify-center gap-2 text-base whitespace-nowrap min-h-[48px] font-[family-name:var(--font-eb-garamond)] ${
                    isOutOfStock || hasReachedMaxQuantity
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-[#fbe022] text-black hover:bg-[#e6cc1f]'
                  }`}
                  disabled={isAddingToCart || isOutOfStock || hasReachedMaxQuantity}
                  type="button"
                >
                  {isOutOfStock ? (
                    <span>Uitverkocht</span>
                  ) : hasReachedMaxQuantity ? (
                    <span>Binnenkort weer op voorraad</span>
                  ) : (
                    <>
                      <span className="material-icons-outlined text-lg">shopping_cart</span>
                      <span>Voeg toe aan winkelwagen</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN PRODUCT SECTION */}
      <section ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-24 lg:pt-8 pb-4">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left: Large product image gallery */}
          <div className="space-y-4">
            {/* Main product image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              {hasImages && images[selectedImage] ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={images[selectedImage].src}
                    alt={product.name}
                    width={700}
                    height={700}
                    className="w-full h-full object-cover"
                    priority
                  />
                  {/* Zoom indicator */}
                  <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity font-[family-name:var(--font-eb-garamond)]">
                    🔍 Zoom
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-6 gap-2">
              {thumbnailSlots.map((image, index) => (
                image ? (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-[#492c4a]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={`${product.name} ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ) : (
                  <div
                    key={index}
                    className="aspect-square rounded overflow-hidden border-2 border-gray-100 bg-gray-50 flex items-center justify-center"
                  >
                    <svg
                      className="w-8 h-8 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Right: Product details sidebar */}
          <div className="space-y-6">
            {/* Customer satisfaction banner */}
            <div className="flex items-center bg-[#ECECEC] p-3 rounded-lg">
              <div className="flex -space-x-2">
                <img
                  src="https://i.pravatar.cc/150?img=5"
                  alt="Maria"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="https://i.pravatar.cc/150?img=8"
                  alt="Anna"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Sophie"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                />
              </div>
              <div className="text-base md:text-lg ml-4 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Sluit je aan bij 4.278+ tevreden klanten - beoordeeld met 4.4/5
              </div>
            </div>

            {/* Product title */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                {product.name}
              </h1>

              {/* Star rating + review count with dropdown - Compact Hike Style */}
              <div className="relative mb-4">
                <button
                  ref={reviewButtonRef}
                  onClick={() => setShowReviewDropdown(!showReviewDropdown)}
                  className="inline-flex items-center gap-1.5 px-2 py-1 border border-gray-200 rounded-md hover:border-gray-300 transition-colors group"
                  title={`${reviewData.averageRating} rating (${reviewData.totalReviews} votes)`}
                  aria-label={`${reviewData.averageRating} rating (${reviewData.totalReviews} votes)`}
                >
                  {renderStars(parseFloat(reviewData.averageRating))}
                  <span className="text-base md:text-lg text-gray-600 font-medium ml-0.5 font-[family-name:var(--font-eb-garamond)]">
                    {reviewData.totalReviews} Reviews
                  </span>
                </button>

                {/* Review Dropdown - Hike Style */}
                {showReviewDropdown && (
                  <div
                    ref={reviewDropdownRef}
                    className="absolute top-full mt-2 left-0 z-50 w-[320px] bg-white rounded-md shadow-xl border border-gray-200"
                  >
                    {/* Arrow pointing up */}
                    <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>

                    <div className="p-4 relative">
                      {/* Close button */}
                      <button
                        onClick={() => setShowReviewDropdown(false)}
                        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded bg-black/5 hover:bg-black/10 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                          <path d="M12.25 7.75L7.75 12.25" stroke="#333333" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.25 12.25L7.75 7.75" stroke="#333333" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>

                      {/* Rating Summary */}
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-eb-garamond)]">{reviewData.averageRating}</span>
                          {renderStars(parseFloat(reviewData.averageRating))}
                        </div>
                        <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">Based on <strong>{reviewData.totalReviews} reviews</strong></p>
                      </div>

                      {/* Rating Bars */}
                      <div className="space-y-1.5 mb-4">
                        {reviewData.distribution.map(rating => (
                          <div key={rating.stars} className="flex items-center gap-2 text-xs">
                            <span className="w-3 text-gray-600">{rating.stars}</span>
                            <svg className="w-3 h-3 text-[#FAD14C] fill-current" viewBox="0 0 15 15">
                              <path d="M3.42968 14.8504C2.93657 15.1718 2.64893 14.9575 2.78248 14.3789L3.89197 9.49308L0.265579 6.23586C-0.165889 5.85014 -0.0631589 5.48585 0.512132 5.44299L5.26855 5.04655L7.10743 0.417867C7.31289 -0.139289 7.67245 -0.139289 7.88818 0.417867L9.73733 5.04655L14.4835 5.44299C15.0588 5.49656 15.1718 5.83943 14.73 6.23586L11.1036 9.49308L12.2131 14.3789C12.3467 14.9575 12.0693 15.1718 11.5659 14.8504L7.49781 12.2467L3.42968 14.8504Z"/>
                            </svg>
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#FAD14C] transition-all duration-300"
                                style={{ width: `${rating.percentage}%` }}
                              />
                            </div>
                            <span className="text-gray-600 w-12 text-right">({rating.count})</span>
                          </div>
                        ))}
                      </div>

                      {/* Review Slider */}
                      <div className="border-t pt-3">
                        <div className="relative">
                          {/* Navigation arrows */}
                          <button
                            onClick={() => setCurrentReviewIndex(currentReviewIndex === 0 ? customerReviews.length - 1 : currentReviewIndex - 1)}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 z-10"
                          >
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path d="M5 1L2 4L5 7" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            onClick={() => setCurrentReviewIndex((currentReviewIndex + 1) % customerReviews.length)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 z-10"
                          >
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path d="M3 1L6 4L3 7" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>

                          {/* Review content */}
                          <div className="overflow-hidden px-2">
                            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}>
                              {customerReviews.map((review) => (
                                <div key={review.id} className="w-full flex-shrink-0">
                                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-start gap-2.5">
                                      <img
                                        src={`https://ui-avatars.com/api/?name=${review.name}&background=492c4a&color=fff&size=40`}
                                        alt={review.name}
                                        className="w-10 h-10 rounded-full"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                          <strong className="text-sm text-gray-900">{review.name}</strong>
                                          {review.verified && (
                                            <span className="text-xs text-[#2C964A] flex items-center gap-0.5">
                                              <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                                                <path d="M6.55937 2.7125C6.44062 2.59063 6.31875 2.4625 6.27187 2.35313C6.225 2.24375 6.22813 2.08125 6.225 1.91563C6.22187 1.6125 6.21562 1.26562 5.975 1.025C5.73438 0.784375 5.3875 0.778125 5.08437 0.775L5.08362 0.774986C4.91824 0.771865 4.74984 0.768688 4.64687 0.728125C4.54375 0.6875 4.40937 0.559375 4.2875 0.440625C4.07188 0.234375 3.825 0 3.5 0C3.175 0 2.92813 0.234375 2.7125 0.440625C2.59063 0.559375 2.4625 0.68125 2.35313 0.728125C2.24375 0.775 2.08125 0.771875 1.91563 0.775C1.6125 0.778125 1.26562 0.784375 1.025 1.025C0.784375 1.26562 0.778125 1.6125 0.775 1.91563L0.774986 1.91638C0.771865 2.08176 0.768688 2.25016 0.728125 2.35313C0.6875 2.45625 0.559375 2.59063 0.440625 2.7125C0.234375 2.92813 0 3.175 0 3.5C0 3.825 0.234375 4.07188 0.440625 4.2875C0.559375 4.40937 0.68125 4.5375 0.728125 4.64687C0.775 4.75625 0.771875 4.91875 0.775 5.08437C0.778125 5.3875 0.784375 5.73438 1.025 5.975C1.26562 6.21562 1.6125 6.22187 1.91563 6.225L1.91639 6.22501C2.08177 6.22813 2.25016 6.23131 2.35313 6.27187C2.45625 6.3125 2.59063 6.44062 2.7125 6.55937C2.92813 6.76562 3.175 7 3.5 7C3.825 7 4.07188 6.76562 4.2875 6.55937C4.40937 6.44062 4.5375 6.31875 4.64687 6.27187C4.75625 6.225 4.91875 6.22813 5.08437 6.225C5.3875 6.22187 5.73438 6.21562 5.975 5.975C6.21562 5.73438 6.22187 5.3875 6.225 5.08437L6.22501 5.08361C6.22813 4.91823 6.23131 4.74984 6.27187 4.64687C6.3125 4.54375 6.44062 4.40937 6.55937 4.2875C6.76562 4.07188 7 3.825 7 3.5C7 3.175 6.76562 2.92813 6.55937 2.7125Z" fill="#2C964A"/>
                                                <path d="M4.93483 2.87819L3.24444 4.43869C3.20074 4.4784 3.1429 4.50035 3.0829 4.5C3.02379 4.50021 2.9669 4.47823 2.92425 4.43869L2.07906 3.65844C2.05561 3.63868 2.03655 3.61455 2.02301 3.58749C2.00947 3.56044 2.00173 3.53101 2.00026 3.50099C1.99879 3.47097 2.00362 3.44098 2.01445 3.41281C2.02529 3.38463 2.04191 3.35887 2.06332 3.33706C2.08472 3.31526 2.11047 3.29786 2.13902 3.28591C2.16757 3.27396 2.19832 3.26771 2.22943 3.26753C2.26054 3.26736 2.29136 3.27326 2.32005 3.28489C2.34874 3.29652 2.3747 3.31363 2.39637 3.3352L3.0829 3.96775L4.61752 2.55495C4.66239 2.51713 4.72066 2.49753 4.78014 2.50025C4.83962 2.50297 4.89571 2.52779 4.93668 2.56953C4.97766 2.61127 5.00034 2.6667 5 2.72422C4.99965 2.78175 4.9763 2.83691 4.93483 2.87819Z" fill="white"/>
                                              </svg>
                                              Verified
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-xs text-gray-700 line-clamp-2 mb-1">{review.text}</p>
                                        <a href="#" className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-0.5">
                                          <span>View all</span>
                                          <svg width="5" height="8" viewBox="0 0 5 8" fill="none">
                                            <path d="M0 7.06L3.05333 4L0 0.94L0.94 0L4.94 4L0.94 8L0 7.06Z" fill="#222222"/>
                                          </svg>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Dots indicator */}
                          <div className="flex justify-center gap-1 mt-2">
                            {customerReviews.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentReviewIndex(index)}
                                className={`transition-all ${
                                  index === currentReviewIndex
                                    ? 'w-4 h-1 bg-gray-800 rounded-full'
                                    : 'w-1 h-1 bg-gray-400 rounded-full'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* USP's - Hike Style */}
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <svg role="presentation" focusable="false" strokeWidth="2" width="24" height="24" className="text-green-600 flex-shrink-0" style={{ "--icon-height": "24px" } as React.CSSProperties} viewBox="0 0 18 18">
                    <path d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z" fill="currentColor"></path>
                    <path d="M5 8.8L7.62937 11.6L13 6" stroke="#ffffff" fill="none"></path>
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">100% Authentiek - Gecertificeerd door experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg role="presentation" focusable="false" strokeWidth="2" width="24" height="24" className="text-green-600 flex-shrink-0" style={{ "--icon-height": "24px" } as React.CSSProperties} viewBox="0 0 18 18">
                    <path d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z" fill="currentColor"></path>
                    <path d="M5 8.8L7.62937 11.6L13 6" stroke="#ffffff" fill="none"></path>
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">Energetisch geladen & gereinigd voor optimale werking</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg role="presentation" focusable="false" strokeWidth="2" width="24" height="24" className="text-green-600 flex-shrink-0" style={{ "--icon-height": "24px" } as React.CSSProperties} viewBox="0 0 18 18">
                    <path d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z" fill="currentColor"></path>
                    <path d="M5 8.8L7.62937 11.6L13 6" stroke="#ffffff" fill="none"></path>
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">Gratis verzending & 30 dagen retourgarantie</span>
                </div>
              </div>

              {/* Price with strikethrough */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl md:text-3xl font-semibold text-black font-[family-name:var(--font-eb-garamond)]">
                  €{price.toFixed(2).replace('.', ',')}
                </span>
                {isOnSale && (
                  <>
                    <span className="text-xl text-gray-400 line-through font-[family-name:var(--font-eb-garamond)]">
                      €{regularPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="badge number-discount_saved discount_saved-51613903651156" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      background: '#000000',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      <span className="material-icons-outlined" style={{ fontSize: '14px' }}>local_offer</span>
                      <span style={{ fontWeight: '900' }} className="font-[family-name:var(--font-eb-garamond)]">JE BESPAART {discount}%</span>
                    </span>
                  </>
                )}
              </div>

              {/* Tax and shipping info */}
              <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)] mb-2">
                Inclusief BTW.
                <Link href="/policies/shipping-policy" className="underline hover:text-gray-800 ml-1">
                  Verzendkosten berekend
                </Link> bij checkout.
              </p>

              {/* Spring sale info */}
              <div className="custom-spring-sale-info bg-amber-50 border border-amber-200 rounded-md p-3 mt-4 mb-3">
                <div className="metafield-rich_text_field flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                  </div>
                  <p className="text-base md:text-lg text-gray-800 m-0 font-[family-name:var(--font-eb-garamond)]">
                    Vanwege onze <span className="font-semibold text-amber-700 font-[family-name:var(--font-eb-garamond)]">najaarssale</span> zijn er nog maar enkele exemplaren op voorraad!
                  </p>
                </div>
              </div>
            </div>

            {/* Bundle options - Hike style */}
            <div className="kaching-bundles__block-title text-center text-base md:text-lg font-medium text-black mt-3 mb-3 flex items-center justify-center">
              <span className="flex-1 h-0.5 mr-3" style={{ backgroundColor: '#d1d5db' }}></span>
              <span className="font-semibold font-[family-name:var(--font-eb-garamond)]">Bundelpromotie is geldig tot 23.59 uur</span>
              <span className="flex-1 h-0.5 ml-3" style={{ backgroundColor: '#d1d5db' }}></span>
            </div>
            <div className="space-y-4">

              {/* Single option */}
              <div className="kaching-bundles__bar-wrapper">
                <div
                  role="button"
                  tabIndex={canSelectSingle ? 0 : -1}
                  className={`kaching-bundles__bar-main relative block p-4 border rounded-lg transition-all ${
                    !canSelectSingle
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                      : selectedBundle === 'single'
                      ? 'border-black bg-white cursor-pointer'
                      : 'border-gray-300 hover:border-gray-400 bg-white cursor-pointer'
                  }`}
                  onClick={() => canSelectSingle && setSelectedBundle('single')}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="bundle"
                    value="single"
                    checked={selectedBundle === 'single'}
                    disabled={!canSelectSingle}
                    onChange={(e) => canSelectSingle && setSelectedBundle(e.target.value)}
                  />
                  <div className="kaching-bundles__bar-content flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`kaching-bundles__bar-radio w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedBundle === 'single'
                          ? 'border-black bg-black'
                          : 'border-gray-400 bg-white'
                      }`}>
                        {selectedBundle === 'single' && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="kaching-bundles__bar-content-left">
                        <div className="kaching-bundles__bar-first-line">
                          <span className="kaching-bundles__bar-title text-base md:text-lg font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">1 paar</span>
                        </div>
                        <div className="kaching-bundles__bar-subtitle text-base md:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">Standaardprijs</div>
                      </div>
                    </div>
                    <div className="kaching-bundles__bar-pricing text-right">
                      <div className="kaching-bundles__bar-price text-lg font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">€{bundlePrices.single.toFixed(2).replace('.', ',')}</div>
                      {isOnSale && (
                        <div className="kaching-bundles__bar-full-price text-sm text-gray-400 line-through font-[family-name:var(--font-eb-garamond)]">€{regularPrice.toFixed(2).replace('.', ',')}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Duo option - Most Popular */}
              <div className="kaching-bundles__bar-wrapper relative">
                <div
                  role="button"
                  tabIndex={canSelectDuo ? 0 : -1}
                  className={`kaching-bundles__bar-main relative block p-4 border rounded-lg transition-all ${
                    !canSelectDuo
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                      : selectedBundle === 'duo'
                      ? 'border-black bg-white cursor-pointer'
                      : 'border-gray-300 hover:border-gray-400 bg-white cursor-pointer'
                  }`}
                  onClick={() => canSelectDuo && setSelectedBundle('duo')}
                >
                  <div className="kaching-bundles__bar-most-popular kaching-bundles__bar-most-popular--simple absolute -top-3 right-2">
                    <div className="kaching-bundles__bar-most-popular__content text-black text-xs font-bold px-3 py-1 rounded uppercase" style={{ backgroundColor: '#fbe022' }}>
                      MEEST POPULAIR!
                    </div>
                  </div>
                  <input
                    type="radio"
                    className="sr-only"
                    name="bundle"
                    value="duo"
                    checked={selectedBundle === 'duo'}
                    disabled={!canSelectDuo}
                    onChange={(e) => canSelectDuo && setSelectedBundle(e.target.value)}
                  />
                  <div className="kaching-bundles__bar-content flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`kaching-bundles__bar-radio w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedBundle === 'duo'
                          ? 'border-black bg-black'
                          : 'border-gray-400 bg-white'
                      }`}>
                        {selectedBundle === 'duo' && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="kaching-bundles__bar-content-left">
                        <div className="kaching-bundles__bar-first-line">
                          <span className="kaching-bundles__bar-title text-base md:text-lg font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">2 paar</span>
                        </div>
                        <div className="kaching-bundles__bar-subtitle text-base md:text-lg text-black font-medium font-[family-name:var(--font-eb-garamond)]">10% korting op de totale bestelling!</div>
                      </div>
                    </div>
                    <div className="kaching-bundles__bar-pricing text-right">
                      <div className="kaching-bundles__bar-price text-lg font-semibold text-black font-[family-name:var(--font-eb-garamond)]">€{bundlePrices.duo.toFixed(2).replace('.', ',')}</div>
                      <div className="kaching-bundles__bar-full-price text-sm text-gray-400 line-through font-[family-name:var(--font-eb-garamond)]">€{(bundlePrices.single * 2).toFixed(2).replace('.', ',')}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Family/Trio option - Best Value */}
              <div className="kaching-bundles__bar-wrapper relative">
                <div
                  role="button"
                  tabIndex={canSelectFamily ? 0 : -1}
                  className={`kaching-bundles__bar-main relative block p-4 border rounded-lg transition-all ${
                    !canSelectFamily
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                      : selectedBundle === 'family'
                      ? 'border-black bg-white cursor-pointer'
                      : 'border-gray-300 hover:border-gray-400 bg-white cursor-pointer'
                  }`}
                  onClick={() => canSelectFamily && setSelectedBundle('family')}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="bundle"
                    value="family"
                    checked={selectedBundle === 'family'}
                    disabled={!canSelectFamily}
                    onChange={(e) => canSelectFamily && setSelectedBundle(e.target.value)}
                  />
                  <div className="kaching-bundles__bar-content flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`kaching-bundles__bar-radio w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedBundle === 'family'
                          ? 'border-black bg-black'
                          : 'border-gray-400 bg-white'
                      }`}>
                        {selectedBundle === 'family' && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="kaching-bundles__bar-content-left">
                        <div className="kaching-bundles__bar-first-line flex items-center gap-2">
                          <span className="kaching-bundles__bar-title text-base md:text-lg font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">3 paar</span>
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded uppercase font-[family-name:var(--font-eb-garamond)]">
                            Beste Koop!
                          </span>
                        </div>
                        <div className="kaching-bundles__bar-subtitle text-base md:text-lg text-black font-medium font-[family-name:var(--font-eb-garamond)]">17% korting op de totale bestelling!</div>
                      </div>
                    </div>
                    <div className="kaching-bundles__bar-pricing text-right">
                      <div className="kaching-bundles__bar-price text-lg font-semibold text-black font-[family-name:var(--font-eb-garamond)]">€{bundlePrices.family.toFixed(2).replace('.', ',')}</div>
                      <div className="kaching-bundles__bar-full-price text-sm text-gray-400 line-through font-[family-name:var(--font-eb-garamond)]">€{(bundlePrices.single * 3).toFixed(2).replace('.', ',')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Large green Add to Cart button */}
            <button
              id="mainAddToCartButton"
              onClick={handleAddToCart}
              disabled={isAddingToCart || isOutOfStock || hasReachedMaxQuantity}
              className={`w-full py-4 text-lg font-bold rounded-lg transition-all transform font-[family-name:var(--font-eb-garamond)] ${
                isOutOfStock || hasReachedMaxQuantity
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-[#fbe022] text-black hover:bg-[#e6cc1f] hover:scale-[1.02] disabled:opacity-50 disabled:transform-none'
              }`}
            >
              {isOutOfStock ? (
                <span className="flex items-center justify-center">
                  <span className="font-[family-name:var(--font-eb-garamond)]">Uitverkocht</span>
                </span>
              ) : hasReachedMaxQuantity ? (
                <span className="flex items-center justify-center">
                  <span className="font-[family-name:var(--font-eb-garamond)]">Binnenkort weer op voorraad</span>
                </span>
              ) : isAddingToCart ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-[family-name:var(--font-eb-garamond)]">Toevoegen...</span>
                </span>
              ) : (
                <span className="btn__text flex items-center justify-center gap-2">
                  <span className="material-icons-outlined button-cart-icon">shopping_cart</span>
                  <span className="btn__add-to-cart-text2 font-[family-name:var(--font-eb-garamond)]">Voeg toe aan winkelwagen</span>
                </span>
              )}
            </button>

            {/* Stock status - moved below button */}
            <div className="flex items-center gap-2 mt-1">
              {isOutOfStock ? (
                <>
                  <svg role="presentation" focusable="false" strokeWidth="2" width="18" height="18" className="text-red-600" style={{ "--icon-height": "18px" } as React.CSSProperties} viewBox="0 0 18 18">
                    <path d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z" fill="currentColor"></path>
                    <path d="M6 6L12 12M12 6L6 12" stroke="#ffffff" strokeWidth="2" fill="none"></path>
                  </svg>
                  <span className="text-red-600 font-[family-name:var(--font-eb-garamond)]">Tijdelijk uitverkocht</span>
                </>
              ) : (
                <>
                  <svg role="presentation" focusable="false" strokeWidth="2" width="18" height="18" className="text-green-600" style={{ "--icon-height": "18px" } as React.CSSProperties} viewBox="0 0 18 18">
                    <path d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z" fill="currentColor"></path>
                    <path d="M5 8.8L7.62937 11.6L13 6" stroke="#ffffff" fill="none"></path>
                  </svg>
                  <span className="text-green-600 font-[family-name:var(--font-eb-garamond)]">Geleverd in 1-3 werkdagen</span>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* PRODUCT DESCRIPTION & DETAILS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Product information">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-base transition-colors font-[family-name:var(--font-eb-garamond)] ${
                  activeTab === 'description'
                    ? 'border-[#492c4a] text-[#492c4a]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Productbeschrijving
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-1 border-b-2 font-medium text-base transition-colors font-[family-name:var(--font-eb-garamond)] ${
                  activeTab === 'details'
                    ? 'border-[#492c4a] text-[#492c4a]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`py-4 px-1 border-b-2 font-medium text-base transition-colors font-[family-name:var(--font-eb-garamond)] ${
                  activeTab === 'shipping'
                    ? 'border-[#492c4a] text-[#492c4a]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Verzending & Retour
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="px-6 py-8">
            {activeTab === 'description' && (
              <div className="prose prose-lg max-w-none font-[family-name:var(--font-eb-garamond)]">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                  Over dit product
                </h3>
                {product.description && product.description.trim() !== '' ? (
                  <div
                    className="text-gray-700 space-y-4 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                ) : product.short_description && product.short_description.trim() !== '' ? (
                  <div
                    className="text-gray-700 space-y-4 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.short_description }}
                  />
                ) : (
                  <div className="text-gray-500 italic">
                    <p>
                      Er is nog geen productbeschrijving beschikbaar voor dit artikel.
                    </p>
                    <p className="mt-2 text-sm">
                      Neem contact met ons op voor meer informatie over dit product.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                  Product Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">Product ID</span>
                      <span className="text-gray-900 font-medium font-[family-name:var(--font-eb-garamond)]">#{product.id}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">SKU</span>
                      <span className="text-gray-900 font-medium font-[family-name:var(--font-eb-garamond)]">{product.slug}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">Voorraad Status</span>
                      <span className="text-gray-900 font-medium font-[family-name:var(--font-eb-garamond)]">
                        {product.stock_status === 'instock' ? 'Op voorraad' : 'Beperkt beschikbaar'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">Categorie</span>
                      <span className="text-gray-900 font-medium font-[family-name:var(--font-eb-garamond)]">
                        {product.categories && product.categories.length > 0
                          ? product.categories.map(cat => cat.name).join(', ')
                          : 'Edelstenen'}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">Gewicht</span>
                      <span className="text-gray-900 font-medium font-[family-name:var(--font-eb-garamond)]">Varieert per steen</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">Herkomst</span>
                      <span className="text-gray-900 font-medium font-[family-name:var(--font-eb-garamond)]">Natuurlijk gewonnen</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                  Verzending & Retour
                </h3>
                <div className="space-y-4 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">✓ Gratis verzending</h4>
                    <p>Bij bestellingen boven €50 binnen Nederland</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Verzendtijden</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Nederland: 1-2 werkdagen</li>
                      <li>België: 2-3 werkdagen</li>
                      <li>Duitsland: 3-4 werkdagen</li>
                      <li>Rest van Europa: 4-7 werkdagen</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Retourbeleid</h4>
                    <p>
                      Je hebt 30 dagen bedenktijd vanaf ontvangst van je bestelling.
                      Producten kunnen alleen geretourneerd worden in originele staat en verpakking.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Verpakking</h4>
                    <p>
                      Al onze producten worden zorgvuldig verpakt in milieuvriendelijke materialen
                      om schade tijdens verzending te voorkomen. Elke bestelling bevat een
                      informatiekaart over de eigenschappen van je steen.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION - Clean Design like Hike Footwear */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {/* Feature 1 - Authentic Stone */}
            <div className="flex flex-col">
              <div className="flex items-center justify-center mb-2">
                <img src="/usp4.svg" alt="Bescherming" className="w-28 h-28 md:w-36 md:h-36" />
              </div>
              <div className="text-center px-1 md:px-2">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-1.5 font-[family-name:var(--font-eb-garamond)]">Authentieke Natuursteen</h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed font-[family-name:var(--font-eb-garamond)]">100% natuurlijke edelstenen, gecertificeerd authentiek en onbehandeld.</p>
              </div>
            </div>

            {/* Feature 2 - Energetic Power */}
            <div className="flex flex-col">
              <div className="flex items-center justify-center mb-2">
                <img src="/usp3.svg" alt="Energie" className="w-28 h-28 md:w-36 md:h-36" />
              </div>
              <div className="text-center px-1 md:px-2">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-1.5 font-[family-name:var(--font-eb-garamond)]">Energetische Kracht</h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed font-[family-name:var(--font-eb-garamond)]">Voorgeladen met positieve energie voor maximaal effect en directe werking.</p>
              </div>
            </div>

            {/* Feature 3 - Spiritual Healing */}
            <div className="flex flex-col">
              <div className="flex items-center justify-center mb-2">
                <img src="/usp2.svg" alt="Liefde" className="w-28 h-28 md:w-36 md:h-36" />
              </div>
              <div className="text-center px-1 md:px-2">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-1.5 font-[family-name:var(--font-eb-garamond)]">Spirituele Helende Kracht</h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed font-[family-name:var(--font-eb-garamond)]">Ondersteunt emotionele balans en spirituele groei voor innerlijke rust.</p>
              </div>
            </div>

            {/* Feature 4 - Ethically Sourced */}
            <div className="flex flex-col">
              <div className="flex items-center justify-center mb-2">
                <img src="/usp1.svg" alt="Kwaliteit" className="w-28 h-28 md:w-36 md:h-36" />
              </div>
              <div className="text-center px-1 md:px-2">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-1.5 font-[family-name:var(--font-eb-garamond)]">Ethisch Gewonnen</h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed font-[family-name:var(--font-eb-garamond)]">Met respect voor mens, natuur en milieu, duurzaam en verantwoord.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CUSTOMER IMAGE SLIDER - Auto-scrolling like Hike Footwear */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-eb-garamond)]">
              Klanten zijn dol op onze edelstenen!
            </h2>
          </div>

          {/* Auto-scrolling Image Slider */}
          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-scroll">
              {/* First set of images - using the 8 review images */}
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review1.png"
                  alt="Klant met edelsteen"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review2.png"
                  alt="Kristallen collectie"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review3.png"
                  alt="Healing stenen"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review4.png"
                  alt="Meditatie met kristallen"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review5.png"
                  alt="Chakra stenen"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review6.png"
                  alt="Edelsteen sieraden"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review7.png"
                  alt="Kristallen energie"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review8.png"
                  alt="Healing kristallen"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review1.png"
                  alt="Klant met edelsteen"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review2.png"
                  alt="Kristallen collectie"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review3.png"
                  alt="Healing stenen"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review4.png"
                  alt="Meditatie met kristallen"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review5.png"
                  alt="Chakra stenen"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review6.png"
                  alt="Edelsteen sieraden"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review7.png"
                  alt="Kristallen energie"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-56 h-80 flex-shrink-0">
                <img
                  src="/review8.png"
                  alt="Healing kristallen"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}</style>
      </section>

      {/* 5A. MAIN CONTENT SECTION - Clean Hike Style */}
      <section className="py-5 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Left: Image/Video */}
            <div className="order-2 md:order-1">
              <div className="aspect-square overflow-hidden rounded-lg bg-[#f7f3ec]">
                <img
                  src="/image1.png"
                  alt="Stones for Health - Natuurlijke edelstenen en kristallen"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: Text content */}
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 font-[family-name:var(--font-eb-garamond)]">
                Ontdek De Transformerende Kracht Van {product.name}
              </h2>
              <div className="space-y-4 text-base md:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <p>
                  Al eeuwenlang worden edelstenen gebruikt voor hun helende en energetische eigenschappen.
                  Onze <strong>{product.name}</strong> is speciaal geselecteerd uit de beste mijnen van <strong>{gemstoneData.origin}</strong> en bezit unieke eigenschappen die je leven kunnen transformeren.
                </p>
                <p>
                  Deze steen activeert je <strong>{gemstoneData.chakra}</strong> en brengt <strong>{gemstoneData.energy.toLowerCase()}</strong>.
                  Voel de directe verbinding met de aarde en ervaar hoe natuurlijke energie je dagelijks leven verrijkt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5B. SECOND CONTENT SECTION - Clean Hike Style */}
      <section className="py-5 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Left: Text content */}
            <div className="order-1 md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 font-[family-name:var(--font-eb-garamond)]">
                Waarom Kiezen Voor Onze {product.name}?
              </h2>
              <div className="space-y-4 text-base md:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <p>
                  Elke <strong>{product.name}</strong> wordt met de grootste zorg geselecteerd en voorbereid.
                  We werken rechtstreeks samen met betrouwbare leveranciers die bekend staan om hun <strong>ethische werkwijze</strong> en <strong>hoogwaardige edelstenen</strong>.
                </p>
                <p>
                  Onze stenen worden <strong>energetisch gereinigd</strong> en <strong>opgeladen</strong> voordat ze naar je worden verzonden.
                  Dit garandeert dat je een steen ontvangt die klaar is om zijn <strong>helende kracht</strong> met je te delen vanaf het moment dat je hem vasthoudt.
                </p>
                <p>
                  Bij elke bestelling ontvang je een <strong>certificaat van echtheid</strong> en uitgebreide instructies voor het <strong>optimaal gebruik</strong> van je edelsteen.
                </p>
              </div>
            </div>

            {/* Right: Product image */}
            <div className="order-2 md:order-2">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                <img
                  src="/image2.png"
                  alt="Stones for Health - Kristallen collectie"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5C. EXPERT ENDORSEMENT SECTION - Clean Hike Style */}
      <section className="py-5 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Left: Professional Image */}
            <div className="order-2 md:order-1">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                {/* Using a placeholder image for the expert */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-16 h-16 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-gray-700 font-[family-name:var(--font-eb-garamond)]">Robbin Nieborg</p>
                    <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">"Deze edelstenen bezitten krachtige energetische eigenschappen"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text content */}
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 font-[family-name:var(--font-eb-garamond)]">
                Aanbevolen Door Therapeuten
              </h2>
              <div className="text-base md:text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                <p>
                  Onze edelstenen worden aanbevolen door <strong>Robbin Nieborg</strong>, een ervaren specialist in energetische healing en kristaltherapie.
                  "Deze edelstenen bezitten krachtige energetische eigenschappen" - met deze overtuiging selecteert Robbin alleen de zuiverste en meest krachtige stenen.
                  Met jarenlange expertise in het werken met natuurlijke kristallen en hun helende eigenschappen, waarborgt Robbin de authentieke kwaliteit van elke steen.
                  Ontworpen met therapeutische inzichten en geselecteerd voor blijvende kracht en zuiverheid —
                  Stonesforhealth zorgt voor je energetisch welzijn, zodat jij je kunt richten op jouw spirituele reis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BENEFITS SECTION - Clean Hike Style */}
      <section className="py-5 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Left: Benefits List */}
            <div className="order-1 md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 font-[family-name:var(--font-eb-garamond)]">
                Ontdek De Voordelen Van {product.name}
              </h2>

              <div className="space-y-3 text-base md:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <p className="mb-4">
                </p>

                <p>✔ <strong>100% Natuurlijk & Authentiek</strong> – Geen behandelingen, geen verfraaiingen, pure natuurlijke kracht rechtstreeks uit de aarde.</p>

                <p>✔ <strong>Rechtstreeks uit {gemstoneData.origin}</strong> – Zorgvuldig geselecteerd uit de beste mijnen voor optimale kwaliteit en energie.</p>

                <p>✔ <strong>Activeert {gemstoneData.chakra}</strong> – Breng je energiecentrum in balans en ervaar diepe innerlijke harmonie.</p>

                <p>✔ <strong>{gemstoneData.energy}</strong> – Voel de directe werking van deze krachtige natuursteen in je dagelijks leven.</p>

                <p>✔ <strong>Perfecte Maat ({gemstoneData.size})</strong> – Ideaal voor meditatie, dragen als sieraad of plaatsing in je leefruimte.</p>

                <p>✔ <strong>Ethisch & Duurzaam Gewonnen</strong> – Met respect voor mens en natuur, zodat je met een gerust hart kunt genieten.</p>

                <p>✔ <strong>Complete Verzorgingsgids</strong> – Ontvang uitgebreide instructies voor optimaal gebruik en onderhoud van je edelsteen.</p>

                <p>✔ <strong>30 Dagen Tevredenheidsgarantie</strong> – Niet tevreden? Krijg je geld terug, zonder gedoe.</p>
              </div>
            </div>

            {/* Right: Feature Image */}
            <div className="order-2 md:order-2">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                {images[2] || images[1] || images[0] ? (
                  <Image
                    src={(images[2] || images[1] || images[0]).src}
                    alt={`${product.name} voordelen`}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS SECTION - Clean Grid Style */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Wat Onze Klanten Zeggen
            </h2>
            <div className="flex justify-center items-center gap-2 mb-2">
              {renderStars(parseFloat(reviewData.averageRating), 'w-5 h-5')}
              <span className="text-base font-semibold text-gray-700 font-[family-name:var(--font-eb-garamond)]">{reviewData.averageRating} • {reviewData.totalReviews} Reviews</span>
            </div>
          </div>

          {/* Masonry Grid of Review Cards - Show limited reviews */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {customerReviews.slice(0, visibleReviewsCount).map(review => (
              <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-gray-600">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-base md:text-lg font-semibold text-gray-900 leading-tight font-[family-name:var(--font-eb-garamond)]">{review.name.split(' ')[0]} {review.name.split(' ')[1]?.[0]}.</p>
                      {review.verified && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <svg viewBox="0 0 24 24" aria-label="Geverifieerd" className="w-3.5 h-3.5 text-green-600 fill-current">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <span className="text-sm text-green-600 font-[family-name:var(--font-eb-garamond)]">Geverifieerd</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stars - Show actual rating */}
                <div className="mb-2">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-3 font-[family-name:var(--font-eb-garamond)]">{review.text}</p>

                {/* Date */}
                <p className="text-sm text-gray-500 font-[family-name:var(--font-eb-garamond)]">{review.date}</p>
              </div>
            ))}

          </div>

          {/* Load More Button - Show only if there are more reviews to load */}
          {visibleReviewsCount < customerReviews.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  // Load 4 more rows (16 reviews on desktop, 4 cols x 4 rows)
                  setVisibleReviewsCount(prev => Math.min(prev + 16, customerReviews.length));
                }}
                className="px-6 py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors font-[family-name:var(--font-eb-garamond)]"
              >
                Meer reviews laden ({Math.min(16, customerReviews.length - visibleReviewsCount)} van {customerReviews.length - visibleReviewsCount})
              </button>
            </div>
          )}
        </div>
      </section>


    </div>
  );
}