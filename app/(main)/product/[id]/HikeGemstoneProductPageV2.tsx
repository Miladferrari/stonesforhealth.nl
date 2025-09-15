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
  const headerRef = useRef<HTMLDivElement>(null);

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

    const quantityToAdd = selectedBundle === 'duo' ? 2 : selectedBundle === 'family' ? 3 : quantity;

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
            {/* Product title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name} - Authentieke Edelsteen
              </h1>

              {/* Star rating + review count */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">(127 beoordelingen)</span>
              </div>

              {/* Price with strikethrough */}
              <div className="flex items-baseline gap-3 mb-4">
                {isOnSale && (
                  <span className="text-2xl text-gray-400 line-through">
                    €{regularPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-4xl font-bold text-[#492c4a]">
                  €{price.toFixed(2)}
                </span>
                {isOnSale && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                    -{discount}% KORTING
                  </span>
                )}
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% Authentiek</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Energetisch Geladen</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Ethisch Gewonnen</span>
                </div>
              </div>
            </div>

            {/* Size selector dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kies je maat
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#492c4a] focus:border-[#492c4a]"
              >
                <option value="3-5 cm">Klein (3-5 cm) - Voor dagelijks dragen</option>
                <option value="5-7 cm">Medium (5-7 cm) - Voor meditatie</option>
                <option value="7-10 cm">Groot (7-10 cm) - Voor in huis</option>
              </select>
            </div>

            {/* Quantity controls */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aantal
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center py-3 focus:outline-none font-semibold"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Nog {product.stock_quantity || 12} op voorraad
                </span>
              </div>
            </div>

            {/* Bundle options */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kies je pakket (bespaar tot 30%)
              </label>

              <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="bundle"
                    value="single"
                    checked={selectedBundle === 'single'}
                    onChange={(e) => setSelectedBundle(e.target.value)}
                    className="w-4 h-4 text-[#492c4a] focus:ring-[#492c4a]"
                  />
                  <div>
                    <div className="font-semibold">Enkele Steen</div>
                    <div className="text-sm text-gray-500">Perfect om te proberen</div>
                  </div>
                </div>
                <span className="font-bold text-lg">€{bundlePrices.single.toFixed(2)}</span>
              </label>

              <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors bg-green-50 border-green-300">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="bundle"
                    value="duo"
                    checked={selectedBundle === 'duo'}
                    onChange={(e) => setSelectedBundle(e.target.value)}
                    className="w-4 h-4 text-[#492c4a] focus:ring-[#492c4a]"
                  />
                  <div>
                    <div className="font-semibold">Duo Pakket</div>
                    <div className="text-sm text-gray-500">Bespaar 10% - Meest gekozen</div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-400 line-through mr-2">€{(bundlePrices.single * 2).toFixed(2)}</span>
                  <span className="font-bold text-lg text-green-600">€{bundlePrices.duo.toFixed(2)}</span>
                </div>
              </label>

              <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="bundle"
                    value="family"
                    checked={selectedBundle === 'family'}
                    onChange={(e) => setSelectedBundle(e.target.value)}
                    className="w-4 h-4 text-[#492c4a] focus:ring-[#492c4a]"
                  />
                  <div>
                    <div className="font-semibold">Familie Pakket</div>
                    <div className="text-sm text-gray-500">Bespaar 17% - Beste waarde</div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-400 line-through mr-2">€{(bundlePrices.single * 3).toFixed(2)}</span>
                  <span className="font-bold text-lg text-green-600">€{bundlePrices.family.toFixed(2)}</span>
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

      {/* 3. 4-FEATURE ICONS SECTION */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-[#8B7355] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">100% Natuurlijk</h3>
              <p className="text-sm text-gray-600">Authentieke edelstenen rechtstreeks uit de natuur</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-[#8B7355] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Energetisch Geladen</h3>
              <p className="text-sm text-gray-600">Voorgeladen met positieve energie voor direct effect</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-[#8B7355] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Helende Kracht</h3>
              <p className="text-sm text-gray-600">Ondersteunt emotionele en spirituele healing</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-[#8B7355] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Ethisch Gewonnen</h3>
              <p className="text-sm text-gray-600">Met respect voor mens en milieu</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Klanten zijn dol op onze edelstenen!
          </h2>

          {/* Customer photos grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600">
            Meer dan 4.000 tevreden klanten ervaren dagelijks de kracht van onze authentieke edelstenen
          </p>
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