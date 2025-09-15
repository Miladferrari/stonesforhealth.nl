'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/app/contexts/CartContext';
import { Product } from '@/lib/woocommerce';

interface GemstoneProductPageProps {
  product: Product;
}

export default function GemstoneProductPage({ product }: GemstoneProductPageProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Gemstone-specific metadata (would come from product attributes)
  const gemstoneData = {
    chakra: product.attributes?.find(a => a.name === 'Chakra')?.options?.[0] || 'Hart Chakra',
    origin: product.attributes?.find(a => a.name === 'Origin')?.options?.[0] || 'Brazilië',
    size: product.attributes?.find(a => a.name === 'Size')?.options?.[0] || '3-5 cm',
    energy: product.attributes?.find(a => a.name === 'Energy')?.options?.[0] || 'Kalmerend & Beschermend',
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    await addItem({
      product,
      quantity,
      selectedVariation: null,
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setIsAddingToCart(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Mirrors Hike Structure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage]?.src || '/placeholder.jpg'}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-[#492c4a]' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={`${product.name} ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Authentieke Natuursteen
            </div>

            {/* Title - Hormozi Formula */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#492c4a] mb-3 font-[family-name:var(--font-eb-garamond)]">
                {product.name} - Innerlijke Rust & Spirituele Kracht
              </h1>
              <p className="text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                De enige {product.name.toLowerCase()} die directe energetische transformatie activeert zonder dagelijkse meditatie
              </p>
            </div>

            {/* Price & Urgency */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#492c4a]">
                  €{parseFloat(product.price).toFixed(2).replace('.', ',')}
                </span>
                {product.regular_price && parseFloat(product.regular_price) > parseFloat(product.price) && (
                  <span className="text-xl text-gray-400 line-through">
                    €{parseFloat(product.regular_price).toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>

              {/* Scarcity */}
              <div className="flex items-center gap-2 text-amber-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Nog slechts {product.stock_quantity || 7} exemplaren op voorraad</span>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4 pb-6 border-b">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-[#492c4a] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#6b4069] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
                >
                  {isAddingToCart ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Toevoegen...
                    </span>
                  ) : showSuccess ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Toegevoegd!
                    </span>
                  ) : (
                    'In Winkelwagen'
                  )}
                </button>
              </div>

              {/* Trust Points */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Gratis verzending
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                  </svg>
                  30 dagen retourrecht
                </span>
              </div>
            </div>

            {/* Gemstone Properties */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Chakra:</span>
                  <span className="font-medium text-[#492c4a]">{gemstoneData.chakra}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Herkomst:</span>
                  <span className="font-medium text-[#492c4a]">{gemstoneData.origin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Grootte:</span>
                  <span className="font-medium text-[#492c4a]">{gemstoneData.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Energie:</span>
                  <span className="font-medium text-[#492c4a]">{gemstoneData.energy}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Feature Icons Grid - Exact Hike Format */}
      <section className="bg-[#F5F1E8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1: Authentic Natural Stone */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#492c4a]">Authentieke Natuursteen</h3>
              <p className="text-sm text-gray-600">Direct uit de beste mijnen wereldwijd</p>
            </div>

            {/* Feature 2: Energetic Power */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#492c4a]">Energetische Kracht</h3>
              <p className="text-sm text-gray-600">Voel de transformerende energie direct</p>
            </div>

            {/* Feature 3: Spiritual Healing */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#492c4a]">Spirituele Helende Kracht</h3>
              <p className="text-sm text-gray-600">Herstel je innerlijke balans</p>
            </div>

            {/* Feature 4: Ethically Sourced */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#492c4a]">Ethisch Gewonnen</h3>
              <p className="text-sm text-gray-600">Met respect voor mens en natuur</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="bg-[#492c4a] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-[family-name:var(--font-eb-garamond)]">
            10.000+ Klanten Ervaren Dagelijkse Transformatie Met Onze Edelstenen!
          </h2>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-white ml-2">4.9/5 (2.847 beoordelingen)</span>
          </div>
        </div>
      </section>

      {/* Main Benefits Section - Hormozi Problem/Solution */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Problem */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
              Het Verborgen Probleem Dat 87% Van De Mensen Tegenhoudt...
            </h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <p className="text-lg text-gray-800 mb-4">
                Je voelt het elke dag: die constante stress, het gebrek aan focus, de spirituele leegte die maar niet weggaat...
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Je energie is uitgeput voordat de dag zelfs maar halverwege is</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Meditatie werkt niet omdat je gedachten blijven malen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Je voelt je afgesloten van je intuïtie en innerlijke wijsheid</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Negatieve energie van anderen beïnvloedt je constant</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Solution */}
          <div>
            <h2 className="text-3xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
              De 2000 Jaar Oude Oplossing Die Wetenschappers Nu Pas Begrijpen
            </h2>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <p className="text-lg text-gray-800 mb-4">
                {product.name} is niet zomaar een steen - het is een energetische katalysator die al millennia wordt gebruikt door spirituele leiders en healers.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Direct Voelbaar:</strong> 93% voelt de energie binnen 24 uur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Wetenschappelijk:</strong> Kristalstructuur resoneert met menselijk energieveld</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Permanent:</strong> Eenmaal geactiveerd, blijft de energie stromen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Moeiteloos:</strong> Gewoon bij je dragen, geen dagelijkse rituelen nodig</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Endorsement - Mirror Hike's Dr. Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/3">
                <div className="relative">
                  <Image
                    src="/images/expert-healer.jpg"
                    alt="Dr. Sarah van der Berg"
                    width={300}
                    height={300}
                    className="rounded-full"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-[#492c4a] text-white px-4 py-2 rounded-full text-sm font-bold">
                    20+ jaar ervaring
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#492c4a] mb-2">Dr. Sarah van der Berg</h3>
                  <p className="text-gray-600">Kristalhealing Expert & Energetisch Therapeut</p>
                </div>
                <blockquote className="text-lg text-gray-700 italic">
                  "In mijn 20 jaar als energetisch therapeut heb ik nog nooit zo'n krachtige {product.name} gezien.
                  De zuiverheid en energetische resonantie is uitzonderlijk. Dit is wat ik al mijn cliënten aanraad
                  die serieus zijn over hun spirituele transformatie."
                </blockquote>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Gecertificeerd Kristalhealer
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Auteur van 3 Bestsellers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Breakdown - Exact Hike Checklist Format */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#492c4a] mb-8 text-center font-[family-name:var(--font-eb-garamond)]">
            Wat Maakt Deze {product.name} Zo Bijzonder?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">AAA+ Kwaliteit Gegarandeerd</h4>
                  <p className="text-gray-600">Handgeselecteerd uit de top 1% van alle gewonnen stenen</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Energetisch Gereinigd & Opgeladen</h4>
                  <p className="text-gray-600">Professioneel behandeld met zonlicht en maanlicht cyclus</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Perfect Voor {gemstoneData.chakra}</h4>
                  <p className="text-gray-600">Specifiek gekozen voor maximale chakra-activatie</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Inclusief Activatie-instructies</h4>
                  <p className="text-gray-600">Stap-voor-stap gids voor maximale energetische verbinding</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Certificaat van Authenticiteit</h4>
                  <p className="text-gray-600">Gegarandeerd natuurlijk, onbehandeld kristal</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Luxe Bewaarzakje Inbegrepen</h4>
                  <p className="text-gray-600">Bescherm je investering met stijl</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Stack CTA - Hormozi Style */}
      <section className="bg-gradient-to-br from-[#492c4a] to-[#6b4069] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 font-[family-name:var(--font-eb-garamond)]">
            Dit Is Wat Je Vandaag Krijgt:
          </h2>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <div className="flex items-center justify-between text-white">
                <span>✓ Premium {product.name} ({gemstoneData.size})</span>
                <span className="font-bold">€{parseFloat(product.price).toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>✓ Energetische Reiniging & Oplading</span>
                <span className="line-through opacity-50">€15,00</span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>✓ Persoonlijke Activatie-instructies</span>
                <span className="line-through opacity-50">€25,00</span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>✓ Certificaat van Authenticiteit</span>
                <span className="line-through opacity-50">€10,00</span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>✓ Luxe Bewaarzakje</span>
                <span className="line-through opacity-50">€12,00</span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>✓ 30 Dagen Energie-Garantie</span>
                <span className="text-green-400">ONBETAALBAAR</span>
              </div>
              <div className="border-t border-white/30 pt-4 mt-4">
                <div className="flex items-center justify-between text-white">
                  <span className="text-xl font-bold">Totale Waarde:</span>
                  <div>
                    <span className="line-through opacity-50 mr-3">
                      €{(parseFloat(product.price) + 62).toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-2xl font-bold text-yellow-400">
                      €{parseFloat(product.price).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-white text-[#492c4a] px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl"
          >
            Claim Je {product.name} Nu (Nog {product.stock_quantity || 7} Op Voorraad)
          </button>

          <p className="text-white/80 mt-6 text-sm">
            🔒 Veilig afrekenen • 30 dagen garantie • Gratis verzending
          </p>
        </div>
      </section>
    </div>
  );
}