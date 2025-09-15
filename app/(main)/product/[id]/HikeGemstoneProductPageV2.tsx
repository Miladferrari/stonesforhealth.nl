'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '@/app/contexts/CartContext';
import { Product } from '@/lib/woocommerce';

interface HikeGemstoneProductPageV2Props {
  product: Product;
  relatedProducts?: Product[];
}

// Customer reviews data
const customerReviews = [
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
    rating: 5,
    date: "3 weken geleden",
    verified: true,
    text: "Mijn angsten zijn verminderd sinds ik deze steen draag. Ongelooflijk!",
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
    rating: 5,
    date: "2 maanden geleden",
    verified: true,
    text: "Mooiste steen uit mijn collectie. Super blij mee!",
    image: "/images/review-5.jpg"
  }
];

export default function HikeGemstoneProductPageV2({ product, relatedProducts = [] }: HikeGemstoneProductPageV2Props) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [selectedSize, setSelectedSize] = useState('3-5 cm');
  const [selectedBundle, setSelectedBundle] = useState('single');
  const [showReviewDropdown, setShowReviewDropdown] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const reviewDropdownRef = useRef<HTMLDivElement>(null);
  const reviewButtonRef = useRef<HTMLButtonElement>(null);

  // Extract gemstone properties
  const gemstoneData = {
    chakra: product.attributes?.find(a => a.name === 'Chakra')?.options?.[0] || 'Hart Chakra',
    origin: product.attributes?.find(a => a.name === 'Origin')?.options?.[0] || 'Brazilië',
    size: product.attributes?.find(a => a.name === 'Size')?.options?.[0] || '3-5 cm',
    energy: product.attributes?.find(a => a.name === 'Energy')?.options?.[0] || 'Kalmerend & Beschermend',
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

  // Handle sticky header visibility
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom;
        setShowStickyHeader(headerBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    const quantityToAdd = selectedBundle === 'duo' ? 2 : selectedBundle === 'family' ? 3 : 1;

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

  const images = product.images?.length > 0 ? product.images : [
    { src: '/placeholder.jpg', alt: product.name }
  ];

  // Ensure we have at least 6 thumbnail images for the gallery
  const thumbnailImages = [...images];
  while (thumbnailImages.length < 6) {
    thumbnailImages.push(images[0]);
  }

  return (
    <div className="min-h-screen bg-white">

      {/* 1. STICKY HEADER WITH PRODUCT SUMMARY */}
      <div className={`fixed top-0 left-0 right-0 bg-white shadow-lg z-50 transition-transform duration-300 ${
        showStickyHeader ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-3">
            {/* Small thumbnail */}
            <div className="w-12 h-12 flex-shrink-0">
              {images[0] && (
                <Image
                  src={images[0].src}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded"
                />
              )}
            </div>

            {/* Product title */}
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h2>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#492c4a]">€{price.toFixed(2)}</span>
                {isOnSale && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">-{discount}%</span>
                )}
              </div>
            </div>

            {/* Size selector */}
            <select className="px-3 py-1.5 border border-gray-300 rounded text-sm">
              <option>3-5 cm</option>
              <option>5-7 cm</option>
              <option>7-10 cm</option>
            </select>

            {/* Quantity */}
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1 hover:bg-gray-50"
              >
                -
              </button>
              <span className="px-3 py-1 min-w-[40px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-1 hover:bg-gray-50"
              >
                +
              </button>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-[#4A5D23] text-white rounded font-semibold hover:bg-[#3A4D13] transition-colors"
            >
              In Winkelwagen
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN PRODUCT SECTION */}
      <section ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left: Large product image gallery */}
          <div className="space-y-4">
            {/* Main product image */}
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              {images[selectedImage] && (
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
                  <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    🔍 Zoom
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-6 gap-2">
              {thumbnailImages.slice(0, 6).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index % images.length)}
                  className={`aspect-square rounded overflow-hidden border-2 transition-all ${
                    selectedImage === (index % images.length)
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
              ))}
            </div>
          </div>

          {/* Right: Product details sidebar */}
          <div className="space-y-6">
            {/* Trust indicator - Expert endorsement */}
            <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-10 h-10 rounded-full bg-[#492c4a] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <span>Aanbevolen door <strong>Dr. Helena van der Berg</strong></span>
                  <span className="border-l border-gray-400 pl-2">Gecertificeerd Edelsteentherapeut</span>
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </p>
              </div>
            </div>

            {/* Product title */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {product.name} - Authentieke Edelsteen
              </h1>

              {/* Star rating + review count with dropdown - Compact Hike Style */}
              <div className="relative mb-4">
                <button
                  ref={reviewButtonRef}
                  onClick={() => setShowReviewDropdown(!showReviewDropdown)}
                  className="inline-flex items-center gap-1.5 px-2 py-1 border border-gray-200 rounded-md hover:border-gray-300 transition-colors group"
                  title="5.0 rating (4,237 votes)"
                  aria-label="5.0 rating (4,237 votes)"
                >
                  <div className="flex gap-0">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} className="w-4 h-4 text-[#FAD14C] fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 font-medium ml-0.5">
                    4,237 Reviews
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
                          <span className="text-2xl font-bold text-gray-900">5.0</span>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(star => (
                              <svg key={star} className="w-4 h-4 text-[#FAD14C] fill-current" viewBox="0 0 15 15">
                                <path d="M3.42968 14.8504C2.93657 15.1718 2.64893 14.9575 2.78248 14.3789L3.89197 9.49308L0.265579 6.23586C-0.165889 5.85014 -0.0631589 5.48585 0.512132 5.44299L5.26855 5.04655L7.10743 0.417867C7.31289 -0.139289 7.67245 -0.139289 7.88818 0.417867L9.73733 5.04655L14.4835 5.44299C15.0588 5.49656 15.1718 5.83943 14.73 6.23586L11.1036 9.49308L12.2131 14.3789C12.3467 14.9575 12.0693 15.1718 11.5659 14.8504L7.49781 12.2467L3.42968 14.8504Z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Based on <strong>4,237 reviews</strong></p>
                      </div>

                      {/* Rating Bars */}
                      <div className="space-y-1.5 mb-4">
                        {[
                          { stars: 5, percentage: 100, count: 4237 },
                          { stars: 4, percentage: 0, count: 0 },
                          { stars: 3, percentage: 0, count: 0 },
                          { stars: 2, percentage: 0, count: 0 },
                          { stars: 1, percentage: 0, count: 0 }
                        ].map(rating => (
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
                            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 z-10"
                          >
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path d="M5 1L2 4L5 7" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            onClick={() => setCurrentReviewIndex((currentReviewIndex + 1) % customerReviews.length)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 z-10"
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
                                  <div className="bg-gray-50 rounded-lg p-3">
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
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">100% Authentiek - Gecertificeerd door experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">Energetisch geladen & gereinigd voor optimale werking</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 8a1 1 0 011-1h1V6a4 4 0 118 0v1h1a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1V8zm4-2v1h2V6a1 1 0 00-2 0z"/>
                  </svg>
                  <span className="text-sm text-gray-700">Gratis verzending & 30 dagen retourgarantie</span>
                </div>
              </div>

              {/* Price with strikethrough */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-[#492c4a]">
                  €{price.toFixed(2).replace('.', ',')}
                </span>
                {isOnSale && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      €{regularPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-sm font-bold uppercase tracking-wider">
                        Je bespaart {discount}%
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bundle options - Hike style */}
            <div className="space-y-2">
              <div className="text-base font-semibold text-gray-800 mb-3">
                Kies je pakket (bespaar tot 30%)
              </div>
              <div className="text-sm text-green-600 font-medium mb-4">
                ✓ Op voorraad - Nog {product.stock_quantity || 12} beschikbaar
              </div>

              {/* Single option */}
              <label className={`relative block p-5 border-2 rounded-xl cursor-pointer transition-all ${
                selectedBundle === 'single'
                  ? 'border-[#492c4a] bg-purple-50/30'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  name="bundle"
                  value="single"
                  checked={selectedBundle === 'single'}
                  onChange={(e) => setSelectedBundle(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Custom radio button */}
                    <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedBundle === 'single'
                        ? 'border-[#492c4a] bg-[#492c4a]'
                        : 'border-gray-400 bg-white'
                    }`}>
                      {selectedBundle === 'single' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">1 steen</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Standaardprijs</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">€{bundlePrices.single.toFixed(2)}</div>
                  </div>
                </div>
              </label>

              {/* Duo option - Most Popular */}
              <div className="relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                    Meest Populair!
                  </span>
                </div>
                <label className={`relative block p-5 pt-6 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedBundle === 'duo'
                    ? 'border-orange-500 bg-orange-50/30 ring-2 ring-orange-200'
                    : 'border-orange-300 hover:border-orange-400 hover:bg-orange-50/20'
                }`}>
                  <input
                    type="radio"
                    name="bundle"
                    value="duo"
                    checked={selectedBundle === 'duo'}
                    onChange={(e) => setSelectedBundle(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {/* Custom radio button */}
                      <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedBundle === 'duo'
                          ? 'border-orange-500 bg-orange-500'
                          : 'border-gray-400 bg-white'
                      }`}>
                        {selectedBundle === 'duo' && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">2 stenen</span>
                        </div>
                        <div className="text-sm text-orange-600 font-medium mt-1">10% korting op de totale bestelling!</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-orange-600">€{bundlePrices.duo.toFixed(2)}</div>
                      <div className="text-sm text-gray-400 line-through">€{(bundlePrices.single * 2).toFixed(2)}</div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Family/Trio option - Best Value */}
              <label className={`relative block p-5 border-2 rounded-xl cursor-pointer transition-all ${
                selectedBundle === 'family'
                  ? 'border-[#492c4a] bg-purple-50/30'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  name="bundle"
                  value="family"
                  checked={selectedBundle === 'family'}
                  onChange={(e) => setSelectedBundle(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Custom radio button */}
                    <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedBundle === 'family'
                        ? 'border-[#492c4a] bg-[#492c4a]'
                        : 'border-gray-400 bg-white'
                    }`}>
                      {selectedBundle === 'family' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">3 stenen</span>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded uppercase">
                          Beste Koop!
                        </span>
                      </div>
                      <div className="text-sm text-green-600 font-medium mt-1">17% korting op de totale bestelling!</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">€{bundlePrices.family.toFixed(2)}</div>
                    <div className="text-sm text-gray-400 line-through">€{(bundlePrices.single * 3).toFixed(2)}</div>
                  </div>
                </div>
              </label>
            </div>

            {/* Large green Add to Cart button */}
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full py-4 bg-[#4A5D23] text-white text-lg font-bold rounded-lg hover:bg-[#3A4D13] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
            >
              {isAddingToCart ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Toevoegen...
                </span>
              ) : (
                'Toevoegen aan Winkelwagen'
              )}
            </button>

            {/* Shipping and return info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Gratis verzending vanaf €50</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span>30 dagen retourrecht</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4-FEATURE ICONS SECTION - Enhanced with better styling */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Waarom Kiezen Voor Stonesforhealth?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Ontdek de unieke eigenschappen die onze edelstenen onderscheiden van de rest
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Feature 1 - Authentic Natural Stone */}
            <div className="text-center group">
              <div className="relative">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#8B7355] to-[#6B5645] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"/>
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Authentieke Natuursteen</h3>
              <p className="text-sm text-gray-600 leading-relaxed">100% natuurlijke edelstenen, gecertificeerd authentiek</p>
            </div>

            {/* Feature 2 - Energetic Power */}
            <div className="text-center group">
              <div className="relative">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#8B7355] to-[#6B5645] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Energetische Kracht</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Voorgeladen met positieve energie voor maximaal effect</p>
            </div>

            {/* Feature 3 - Spiritual Healing */}
            <div className="text-center group">
              <div className="relative">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#8B7355] to-[#6B5645] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Spirituele Helende Kracht</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Ondersteunt emotionele balans en spirituele groei</p>
            </div>

            {/* Feature 4 - Ethically Sourced */}
            <div className="text-center group">
              <div className="relative">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#8B7355] to-[#6B5645] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Ethisch Gewonnen</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Met respect voor mens, natuur en milieu</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF SECTION - Enhanced with testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Klanten Ervaren Transformatie Met Onze Edelstenen!
            </h2>
            <p className="text-lg text-gray-600">
              Meer dan 5.000+ tevreden klanten wereldwijd
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className="absolute -top-3 left-6">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="mt-4">
                <p className="text-gray-700 italic mb-4">
                  "Sinds ik mijn amethist draag, voel ik me veel rustiger en gebalanceerd.
                  De kwaliteit is werkelijk uitzonderlijk!"
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">SB</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah B.</div>
                    <div className="text-sm text-gray-500">Amsterdam</div>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className="absolute -top-3 left-6">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="mt-4">
                <p className="text-gray-700 italic mb-4">
                  "De rozenkwarts heeft mijn leven veranderd. Ik voel meer liefde en
                  compassie, zowel voor mezelf als anderen."
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600 font-bold">MJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Maria J.</div>
                    <div className="text-sm text-gray-500">Rotterdam</div>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className="absolute -top-3 left-6">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="mt-4">
                <p className="text-gray-700 italic mb-4">
                  "Fantastische service en prachtige stenen! De energie is direct
                  voelbaar. Absolute aanrader!"
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">PV</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Peter V.</div>
                    <div className="text-sm text-gray-500">Utrecht</div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-gray-700">5000+ Tevreden Klanten</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-gray-700">4.9/5 Gemiddelde Beoordeling</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-gray-700">100% Authentiek Gecertificeerd</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5A. MAIN CONTENT SECTION - Large Text + Image */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ontdek De Transformerende Kracht Van {product.name}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Al eeuwenlang worden edelstenen gebruikt voor hun helende en energetische eigenschappen.
                Onze {product.name} is speciaal geselecteerd uit de beste mijnen van {gemstoneData.origin}
                en bezit unieke eigenschappen die je leven kunnen transformeren.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Deze steen activeert je {gemstoneData.chakra} en brengt {gemstoneData.energy.toLowerCase()}.
                Voel de directe verbinding met de aarde en ervaar hoe natuurlijke energie je dagelijks leven verrijkt.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Direct voelbare energie vanaf het eerste moment</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Wetenschappelijk bewezen effecten op welzijn</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Gebruikt door therapeuten wereldwijd</span>
                </li>
              </ul>
            </div>

            {/* Right: Large lifestyle image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-200">
              {images[0] && (
                <Image
                  src={images[0].src}
                  alt={`${product.name} lifestyle`}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Callout badges */}
              <div className="absolute top-8 left-8 bg-white/90 px-4 py-2 rounded-full shadow-lg">
                <span className="font-semibold text-sm">100% Natuurlijk</span>
              </div>
              <div className="absolute bottom-8 right-8 bg-white/90 px-4 py-2 rounded-full shadow-lg">
                <span className="font-semibold text-sm">Uit {gemstoneData.origin}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5B. MAIN CONTENT SECTION - Image + Text (Reversed) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Product image with callouts */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-200 order-2 lg:order-1">
              {images[1] || images[0] ? (
                <Image
                  src={(images[1] || images[0]).src}
                  alt={`${product.name} details`}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : null}
              {/* Feature callouts */}
              <div className="absolute top-1/4 left-8">
                <div className="bg-white/90 px-3 py-1 rounded-full shadow-lg text-sm font-semibold">
                  → {gemstoneData.size}
                </div>
              </div>
              <div className="absolute top-1/2 right-8">
                <div className="bg-white/90 px-3 py-1 rounded-full shadow-lg text-sm font-semibold">
                  → {gemstoneData.energy}
                </div>
              </div>
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
                <div className="bg-white/90 px-3 py-1 rounded-full shadow-lg text-sm font-semibold">
                  → {gemstoneData.chakra}
                </div>
              </div>
            </div>

            {/* Right: Text content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Waarom Kiezen Voor Onze {product.name}?
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#492c4a] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Zorgvuldig Geselecteerd</h3>
                    <p className="text-gray-600">Elke steen wordt handmatig geselecteerd op kwaliteit, zuiverheid en energetische kracht.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#492c4a] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Energetisch Gereinigd</h3>
                    <p className="text-gray-600">Voor verzending worden alle stenen gereinigd en opgeladen met positieve energie.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#492c4a] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Certificaat van Echtheid</h3>
                    <p className="text-gray-600">Elke aankoop komt met een certificaat dat de authenticiteit garandeert.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#492c4a] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Gebruiksinstructies</h3>
                    <p className="text-gray-600">Uitgebreide gids voor optimaal gebruik en onderhoud van je edelsteen.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5C. EXPERT ENDORSEMENT SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Professional headshot */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">Dr. Marina van der Meer</p>
                  </div>
                </div>
              </div>
              {/* Credentials badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-lg shadow-lg">
                <p className="font-semibold text-sm">15+ jaar ervaring</p>
                <p className="text-xs text-gray-600">Gecertificeerd Kristalhealer</p>
              </div>
            </div>

            {/* Right: Endorsement content */}
            <div>
              <div className="inline-block bg-[#492c4a] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Aanbevolen Door Experts
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                "De Kwaliteit Van Deze Edelstenen Is Uitzonderlijk"
              </h2>

              <blockquote className="text-lg text-gray-600 italic mb-6">
                "In mijn 15 jaar als kristalhealer heb ik zelden zulke zuivere en krachtige edelstenen gezien.
                De {product.name} van Stonesforhealth heeft een uitzonderlijke energetische frequentie die
                direct voelbaar is. Ik gebruik ze dagelijks in mijn praktijk en mijn cliënten ervaren
                merkbare verbeteringen in hun welzijn."
              </blockquote>

              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">Dr. Marina van der Meer</p>
                <p className="text-gray-600">Gecertificeerd Kristalhealer & Energetisch Therapeut</p>
                <p className="text-sm text-gray-500 mt-2">
                  • 1000+ succesvolle behandelingen<br />
                  • Auteur van "De Kracht van Kristallen"<br />
                  • Internationaal erkend expert
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DETAILED FEATURES BREAKDOWN */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ontdek De Voordelen Van {product.name}
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left: Bullet point list */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Wat Maakt Onze {product.name} Speciaal?
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">100% natuurlijk en onbehandeld</span>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Rechtstreeks uit {gemstoneData.origin}</span>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Activeert {gemstoneData.chakra}</span>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{gemstoneData.energy}</span>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Perfecte maat: {gemstoneData.size}</span>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Ethisch en duurzaam gewonnen</span>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Inclusief verzorgingsinstructies</span>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">30 dagen geld-terug garantie</span>
                </div>
              </div>
            </div>

            {/* Right: Branded feature graphic */}
            <div className="relative aspect-square bg-gradient-to-br from-[#492c4a]/10 to-purple-100 rounded-2xl p-8">
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="w-32 h-32 mb-6 bg-[#492c4a]/20 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-[#492c4a] mb-4">
                  {product.name}
                </h3>

                <div className="space-y-2 text-gray-600">
                  <p><strong>Chakra:</strong> {gemstoneData.chakra}</p>
                  <p><strong>Energie:</strong> {gemstoneData.energy}</p>
                  <p><strong>Oorsprong:</strong> {gemstoneData.origin}</p>
                  <p><strong>Maat:</strong> {gemstoneData.size}</p>
                </div>

                {/* Feature callouts */}
                <div className="absolute top-8 left-8">
                  <div className="bg-white px-3 py-1 rounded-full shadow text-sm font-semibold">
                    100% Natuurlijk
                  </div>
                </div>
                <div className="absolute bottom-8 right-8">
                  <div className="bg-white px-3 py-1 rounded-full shadow text-sm font-semibold">
                    Gecertificeerd
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className="w-8 h-8 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-2xl font-bold">4.9/5</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Wat Onze Klanten Zeggen
            </h2>
            <p className="text-gray-600">Gebaseerd op 127 geverifieerde beoordelingen</p>
          </div>

          {/* Horizontal scroll of review cards */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
              {customerReviews.map(review => (
                <div key={review.id} className="w-80 bg-white rounded-lg shadow-lg p-6 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-gray-600">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-700 mb-3">{review.text}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{review.date}</span>
                    {review.verified && (
                      <span className="text-green-600 font-medium">✓ Geverifieerd</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16 bg-gradient-to-r from-[#492c4a] to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Begin Je Spirituele Reis Vandaag
          </h2>
          <p className="text-xl mb-8">
            Sluit je aan bij duizenden anderen die de kracht van {product.name} hebben ontdekt
          </p>

          <button
            onClick={handleAddToCart}
            className="bg-white text-[#492c4a] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-[1.05]"
          >
            Bestel Nu - €{price.toFixed(2)}
          </button>

          <p className="mt-4 text-sm opacity-90">
            ✓ Gratis verzending vanaf €50 ✓ 30 dagen retourrecht ✓ 100% tevredenheidsgarantie
          </p>
        </div>
      </section>

    </div>
  );
}