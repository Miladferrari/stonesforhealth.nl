'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/app/contexts/CartContext';
import { Product } from '@/lib/woocommerce';

interface HikeGemstoneProductPageProps {
  product: Product;
  relatedProducts?: Product[];
}

// Expert testimonials for crystal healing validation
const expertTestimonials = [
  {
    id: 1,
    name: "Dr. Marina van der Meer",
    title: "Gecertificeerd Kristalhealer & Energetisch Therapeut",
    credentials: "15+ jaar ervaring, 1000+ transformaties",
    text: "De kwaliteit van deze edelstenen is uitzonderlijk. Ik gebruik ze in mijn praktijk voor snelle energetische resultaten.",
    image: "/images/expert-marina.jpg"
  },
  {
    id: 2,
    name: "Jasper Hendriks",
    title: "Spiritueel Mentor & Chakra Specialist",
    credentials: "Auteur van 'Kristallen Kracht', 20+ jaar ervaring",
    text: "Deze stenen hebben een zuivere frequentie die onmiddellijk voelbaar is. Perfect voor beginners én gevorderden.",
    image: "/images/expert-jasper.jpg"
  }
];

// Customer transformation stories
const transformationStories = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Amsterdam",
    transformation: "Van 8 jaar angststoornis naar dagelijkse rust",
    timeframe: "3 weken",
    text: "Na jaren van stress voelde ik de eerste dag al een verschil. Nu draag ik hem altijd bij me.",
    rating: 5,
    verified: true
  },
  {
    id: 2,
    name: "Mark V.",
    location: "Rotterdam",
    transformation: "Van burnout naar hernieuwde energie",
    timeframe: "1 maand",
    text: "Ongelooflijk hoe deze steen mijn energie heeft hersteld. Collega's vragen wat er veranderd is.",
    rating: 5,
    verified: true
  },
  {
    id: 3,
    name: "Lisa K.",
    location: "Utrecht",
    transformation: "Van slaapproblemen naar diepe rust",
    timeframe: "2 weken",
    text: "Eindelijk weer doorslapen! Leg hem onder mijn kussen en voel meteen de kalmte.",
    rating: 5,
    verified: true
  }
];

export default function HikeGemstoneProductPage({ product, relatedProducts = [] }: HikeGemstoneProductPageProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [stockLeft, setStockLeft] = useState(product.stock_quantity || 12);
  const [peopleBuying, setPeopleBuying] = useState(7);

  // Extract gemstone properties from product attributes
  const gemstoneData = {
    chakra: product.attributes?.find(a => a.name === 'Chakra')?.options?.[0] || 'Hart Chakra',
    origin: product.attributes?.find(a => a.name === 'Origin')?.options?.[0] || 'Brazilië',
    size: product.attributes?.find(a => a.name === 'Size')?.options?.[0] || '3-5 cm',
    energy: product.attributes?.find(a => a.name === 'Energy')?.options?.[0] || 'Kalmerend & Beschermend',
    hardness: product.attributes?.find(a => a.name === 'Hardness')?.options?.[0] || '7 (Mohs schaal)',
    element: product.attributes?.find(a => a.name === 'Element')?.options?.[0] || 'Aarde'
  };

  // Calculate pricing
  const price = parseFloat(product.price);
  const regularPrice = product.regular_price ? parseFloat(product.regular_price) : price;
  const isOnSale = product.on_sale && regularPrice > price;
  const discount = isOnSale ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;
  const savings = isOnSale ? regularPrice - price : 0;

  // Social proof updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setPeopleBuying(prev => Math.max(3, prev + (Math.random() > 0.5 ? 1 : -1)));
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    try {
      addToCart(product as any, quantity);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const images = product.images?.length > 0 ? product.images : [];
  const mainImage = images[selectedImage];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Exact Hike Structure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Left: Large Product Images */}
          <div className="space-y-4">
            {/* Main Hero Image */}
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl">
              {mainImage ? (
                <Image
                  src={mainImage.src}
                  alt={product.name}
                  width={700}
                  height={700}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-[#492c4a]/10 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-[family-name:var(--font-eb-garamond)]">Authentieke {product.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImage === index
                        ? 'border-[#492c4a] shadow-lg'
                        : 'border-gray-200 hover:border-[#492c4a]/50'
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

          {/* Right: Product Info Sidebar - Hormozi Structure */}
          <div className="space-y-8">

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">100% Authentieke Natuursteen</span>
            </div>

            {/* Hormozi Headline Formula */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)] leading-tight">
                De {product.name} Die Directe Spirituele Transformatie Activeert
              </h1>
              <p className="text-xl text-gray-700 font-[family-name:var(--font-eb-garamond)] leading-relaxed">
                <span className="font-semibold">Voel de energie binnen 5 minuten</span> - zonder dagelijkse meditatie, zonder complexe rituelen, gewoon dragen en transformeren
              </p>
            </div>

            {/* Social Proof Banner */}
            <div className="bg-gradient-to-r from-[#492c4a]/10 to-purple-50 p-4 rounded-xl border border-[#492c4a]/20">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#492c4a] text-white text-xs flex items-center justify-center border-2 border-white font-semibold">
                      {['S','M','L','A','J'][i-1]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#492c4a]">
                    {peopleBuying} mensen bekijken dit product nu
                  </p>
                  <p className="text-xs text-gray-600">4.237+ klanten ervaren transformatie</p>
                </div>
              </div>
            </div>

            {/* Pricing Section - Value Focused */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">
                  €{price.toFixed(2).replace('.', ',')}
                </span>
                {isOnSale && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      €{regularPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Value Stacking */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Wat je ontvangt (waarde €{(price * 3).toFixed(0)}):</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Authentieke {product.name} (€{price.toFixed(0)})</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Energetische Activatie Gids (€{(price * 0.5).toFixed(0)})</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Levenslange Chakra Support (€{(price * 1.5).toFixed(0)})</span>
                  </li>
                </ul>
              </div>

              {/* Urgency */}
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Nog slechts {stockLeft} exemplaren - Verwachte uitverkoop binnen 48 uur</span>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4">
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

                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-[#492c4a] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#6b4069] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none font-[family-name:var(--font-eb-garamond)]"
                >
                  {isAddingToCart ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Toevoegen...
                    </div>
                  ) : showSuccess ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Toegevoegd!
                    </div>
                  ) : (
                    'Begin Je Transformatie Nu'
                  )}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
                <div className="flex flex-col items-center gap-1">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>30 dagen retour</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Veilig betalen</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Gratis verzending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Feature Icons Grid - Replacing Hike's Barefoot Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
              Waarom Onze {product.name} Anders Is
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-[family-name:var(--font-eb-garamond)]">
              Vier unieke eigenschappen die directe spirituele transformatie mogelijk maken
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1: Authentieke Natuursteen */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-[#492c4a]/10 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">Authentieke Natuursteen</h3>
              <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                100% natuurlijk gevormd door de aarde, met certificaat van echtheid en zuiverheid
              </p>
            </div>

            {/* Feature 2: Energetische Kracht */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-[#492c4a]/10 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">Energetische Kracht</h3>
              <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                Direct voelbare energetische frequentie die je aura binnen 5 minuten harmoniseert
              </p>
            </div>

            {/* Feature 3: Spirituele Helende Kracht */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-[#492c4a]/10 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">Spirituele Helende Kracht</h3>
              <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                Ontblokkeert emotionele trauma's en activeert je natuurlijke helingsproces
              </p>
            </div>

            {/* Feature 4: Ethisch Gewonnen */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-[#492c4a]/10 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#492c4a] font-[family-name:var(--font-eb-garamond)]">Ethisch Gewonnen</h3>
              <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                Verantwoord geoogst met respect voor moeder aarde en lokale gemeenschappen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="bg-gradient-to-r from-[#492c4a] to-purple-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2 font-[family-name:var(--font-eb-garamond)]">
              Klanten Ervaren Transformatie Met Onze Edelstenen!
            </h2>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">4.9/5 sterren</span>
              </div>
              <div>4.237+ tevreden klanten</div>
              <div>98% herbestal ratio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Benefits Section - Problem/Solution Framework */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Problem Side */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
                Voel Je Gestrest, Energieloos & Spiritueel Disconnect?
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                    <span className="font-semibold">Constante stress en angst</span> die je mentale rust verstoort
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                    <span className="font-semibold">Energiegebrek</span> waardoor je je dagelijks uitgeput voelt
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                    <span className="font-semibold">Spirituele leegte</span> - gevoel van disconnect met jezelf
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                    <span className="font-semibold">Slaapproblemen</span> door een overactieve geest
                  </p>
                </div>
              </div>

              <p className="text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)] italic">
                "Je hebt al van alles geprobeerd - meditatie apps, yoga, mindfulness - maar niets geeft je die diepe, blijvende rust die je zoekt..."
              </p>
            </div>

            {/* Solution Side */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#492c4a] mb-6 font-[family-name:var(--font-eb-garamond)]">
                Deze {product.name} Transformeert Je Leven In 24 Uur
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                    <span className="font-semibold">Directe innerlijke rust</span> - voel stress wegvloeien binnen 5 minuten
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                    <span className="font-semibold">Natuurlijke energie boost</span> zonder cafeïne of stimulanten
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                    <span className="font-semibold">Spirituele verbinding</span> - voel je weer één met jezelf
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                    <span className="font-semibold">Diepe, rustgevende slaap</span> elke nacht
                  </p>
                </div>
              </div>

              <div className="bg-[#492c4a] text-white p-6 rounded-xl">
                <p className="text-lg font-semibold mb-2">Het Geheim:</p>
                <p className="font-[family-name:var(--font-eb-garamond)]">
                  Deze specifieke {product.name} trilt op de exacte frequentie van je {gemstoneData.chakra}, waardoor blokkades direct worden opgelost. Geen weken van oefening - gewoon dragen en transformeren.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Endorsement Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
              Wat Experts Zeggen Over Onze {product.name}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-[family-name:var(--font-eb-garamond)]">
              Erkende kristalhealer en energetisch therapeuten bevestigen de kwaliteit
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {expertTestimonials.map((expert) => (
              <div key={expert.id} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#492c4a]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#492c4a] font-bold text-lg">
                      {expert.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#492c4a] text-lg font-[family-name:var(--font-eb-garamond)]">
                      {expert.name}
                    </h3>
                    <p className="text-gray-600 font-medium">{expert.title}</p>
                    <p className="text-sm text-gray-500">{expert.credentials}</p>
                  </div>
                </div>

                <blockquote className="text-gray-700 text-lg font-[family-name:var(--font-eb-garamond)] italic leading-relaxed">
                  "{expert.text}"
                </blockquote>

                <div className="mt-4 flex items-center gap-1">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Breakdown Checklist */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Image/Visual */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#492c4a]/10 to-purple-100">
                {mainImage ? (
                  <Image
                    src={mainImage.src}
                    alt={`${product.name} eigenschappen`}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-6 bg-[#492c4a]/20 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <p className="text-[#492c4a] font-semibold text-xl font-[family-name:var(--font-eb-garamond)]">Authentieke {product.name}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Features Checklist */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#492c4a] mb-8 font-[family-name:var(--font-eb-garamond)]">
                Wat Je Krijgt Met Deze {product.name}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Metaphysische Eigenschappen</h3>
                    <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                      Activeert {gemstoneData.chakra} voor emotionele balans en spirituele groei
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Chakra Alignment Voordelen</h3>
                    <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                      Harmoniseert je energiecentra voor optimale levenskracht
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Gebruiksinstructies</h3>
                    <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                      Eenvoudig dragen, meditatie, of plaatsen in je woon-/werkruimte
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Maat & Authenticiteit Garantie</h3>
                    <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                      {gemstoneData.size}, met certificaat van echtheid uit {gemstoneData.origin}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Verzorgingsinstructies</h3>
                    <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                      Reinigen met maanlicht, opladen in de zon, energetisch onderhoud
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Spirituele & Emotionele Voordelen</h3>
                    <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                      {gemstoneData.energy} - directe impact op welzijn en bewustzijn
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Transformation Stories */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#492c4a] mb-4 font-[family-name:var(--font-eb-garamond)]">
              Echte Transformaties Van Echte Mensen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-[family-name:var(--font-eb-garamond)]">
              Lees hoe onze klanten hun leven hebben getransformeerd met de kracht van authentieke edelstenen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {transformationStories.map((story) => (
              <div key={story.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {story.verified && (
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Geverifieerd
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="mb-3">
                    <h3 className="font-bold text-[#492c4a] text-lg font-[family-name:var(--font-eb-garamond)]">
                      {story.transformation}
                    </h3>
                    <p className="text-sm text-gray-500">In slechts {story.timeframe}</p>
                  </div>
                </div>

                <blockquote className="text-gray-700 font-[family-name:var(--font-eb-garamond)] italic mb-4 leading-relaxed">
                  "{story.text}"
                </blockquote>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-medium">{story.name}</span>
                  <span>{story.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-[#492c4a] to-purple-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
            Begin Je Spirituele Transformatie Vandaag
          </h2>

          <p className="text-xl mb-8 font-[family-name:var(--font-eb-garamond)] leading-relaxed">
            Meer dan 4.000 mensen hebben al de kracht van deze {product.name} ervaren.
            <br />
            <span className="font-semibold">Wordt jij de volgende success story?</span>
          </p>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-8 max-w-md mx-auto">
            <p className="text-2xl font-bold mb-2">Nog slechts {stockLeft} exemplaren</p>
            <p className="text-lg">Verwachte uitverkoop binnen 48 uur</p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="bg-white text-[#492c4a] px-12 py-6 rounded-full font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-[1.05] disabled:opacity-50 disabled:transform-none font-[family-name:var(--font-eb-garamond)] shadow-2xl"
          >
            {isAddingToCart ? 'Wordt Toegevoegd...' : `Claim Je ${product.name} Nu - €${price.toFixed(2).replace('.', ',')}`}
          </button>

          <p className="text-sm mt-4 opacity-90">
            ✓ 30 dagen geld-terug garantie ✓ Gratis verzending ✓ Veilig betalen
          </p>
        </div>
      </section>
    </div>
  );
}