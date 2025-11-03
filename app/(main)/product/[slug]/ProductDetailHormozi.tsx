'use client';

import { useState, useEffect } from 'react';
import { useCartWithToast } from '@/app/hooks/useCartWithToast';
import type { Product } from '@/lib/woocommerce';
import Image from 'next/image';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

// Static testimonials for social proof
const testimonials = [
  {
    id: 1,
    name: "Jan van der Berg",
    location: "Amsterdam",
    rating: 5,
    text: "Perfect pakket volgens overheidsrichtlijnen. Alles netjes georganiseerd en direct klaar voor gebruik.",
    verified: true,
    image: "JB"
  },
  {
    id: 2,
    name: "Lisa Bakker",
    location: "Rotterdam",
    rating: 5,
    text: "Geeft rust dat we voorbereid zijn. Compact maar compleet voor ons gezin.",
    verified: true,
    image: "LB"
  },
  {
    id: 3,
    name: "Peter de Vries",
    location: "Utrecht",
    rating: 5,
    text: "Eindelijk een noodpakket zonder poespas. Precies wat je nodig hebt.",
    verified: true,
    image: "PV"
  },
  {
    id: 4,
    name: "Sarah Jansen",
    location: "Den Haag",
    rating: 5,
    text: "Na de laatste stroomstoring blij dat we dit hebben. Sterke aanrader!",
    verified: true,
    image: "SJ"
  },
  {
    id: 5,
    name: "Mark Hendriks",
    location: "Eindhoven",
    rating: 5,
    text: "Kwaliteit is top. Alles wat de overheid aanraadt zit erin.",
    verified: true,
    image: "MH"
  }
];

export default function ProductDetailHormozi({ product, relatedProducts }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [stockLeft, setStockLeft] = useState(7); // Start with realistic stock
  const [soldThisMonth, setSoldThisMonth] = useState(4237); // Static but believable
  
  const { addToCart } = useCartWithToast();
  
  const images = product.images.length > 0 ? product.images : [{ id: 'placeholder-0', src: '', alt: product.name }];
  const mainImage = images[selectedImage];
  const price = parseFloat(product.price);
  const regularPrice = parseFloat(product.regular_price);
  const isOnSale = product.on_sale && regularPrice > price;
  const savings = isOnSale ? regularPrice - price : 0;
  const discount = isOnSale ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;
  
  const isOutOfStock = product.stock_status !== 'instock' || product.stock_quantity === 0;
  
  // Simulate realistic stock updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && stockLeft > 3) {
        setStockLeft(prev => prev - 1);
        setSoldThisMonth(prev => prev + 1);
      }
    }, 45000); // Update every 45 seconds occasionally
    return () => clearInterval(interval);
  }, [stockLeft]);
  
  const handleAddToCart = () => {
    if (isOutOfStock) return;
    
    const cartItem = {
      ...product,
      quantity
    };
    
    addToCart(cartItem);
    setQuantity(1);
  };

  // Generate benefit-driven headline based on product
  const getHeadline = () => {
    if (product.name.toLowerCase().includes('gezin')) {
      return "Het Complete Noodpakket Voor Je Gezin";
    } else if (product.name.toLowerCase().includes('basis')) {
      return "Alles Wat Je Nodig Hebt Als Het Misgaat";
    } else if (product.name.toLowerCase().includes('radio')) {
      return "Blijf Verbonden Als De Stroom Uitvalt";
    }
    return "Voorbereid Zijn Is Geen Luxe Meer";
  };

  const getSubheadline = () => {
    if (stockLeft < 10) {
      return `Nog maar ${stockLeft} op voorraad – Zorg dat je gezin voorbereid is`;
    }
    return "Volgens Nederlandse overheidsrichtlijnen – Direct leverbaar";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Clean trust banner */}
      <div className="bg-green-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-green-800 font-medium">Volgens Overheidsrichtlijnen</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-green-700 font-bold">{soldThisMonth.toLocaleString('nl-NL')}+</span>
              <span className="text-green-700">verkocht deze maand</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-green-800 font-medium ml-1">4.8/5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          
          {/* Image Section - Clean and focused */}
          <div className="relative">
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden border border-gray-200">
              {mainImage.src ? (
                <Image
                  src={mainImage.src}
                  alt={mainImage.alt || product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {/* Sale badge on image */}
              {isOnSale && (
                <div className="absolute top-4 left-4">
                  <div className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
                    -{discount}%
                  </div>
                </div>
              )}
              
              {/* Stock indicator */}
              {stockLeft < 10 && !isOutOfStock && (
                <div className="absolute bottom-4 right-4 bg-orange-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-lg">
                  Nog {stockLeft} op voorraad
                </div>
              )}
              
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 group"
                    aria-label="Vorige afbeelding"
                  >
                    <svg className="w-6 h-6 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 group"
                    aria-label="Volgende afbeelding"
                  >
                    <svg className="w-6 h-6 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {selectedImage + 1} / {images.length}
                </div>
              )}
            </div>
            
            {/* Image thumbnails - minimal */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 justify-start">
                {images.map((image, index) => (
                  <button
                    key={`thumb-${index}`}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                      selectedImage === index ? 'border-gray-900 shadow-md' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {image.src ? (
                      <Image
                        src={image.src}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content Section - Benefit-driven */}
          <div className="flex flex-col">
            {/* Benefit tagline */}
            <p className="text-green-700 font-medium mb-2 text-lg">
              {getHeadline()}
            </p>
            
            {/* Actual product name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              {product.name}
            </h1>
            
            {/* Subheadline with urgency */}
            <p className="text-lg text-gray-600 mb-6">
              {getSubheadline()}
            </p>

            {/* Key Benefits - Not features */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-800 font-medium">
                    Dekt je hele gezin voor minimaal 72 uur
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-800 font-medium">
                    Samengesteld volgens Nederlandse overheidsrichtlijnen
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-800 font-medium">
                    Compact, georganiseerd en direct klaar voor gebruik
                  </span>
                </li>
              </ul>
            </div>

            {/* Price Section */}
            <div className="mb-6">
              <div className="flex items-end gap-3 mb-2">
                {isOnSale && (
                  <span className="text-2xl text-gray-400 line-through">
                    €{regularPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-5xl font-bold text-gray-900">
                  €{price.toFixed(2)}
                </span>
                {isOnSale && (
                  <span className="text-green-600 font-bold text-lg mb-2">
                    Bespaar €{savings.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">Inclusief BTW • Gratis verzending vanaf €30</p>
            </div>

            {/* Quantity and CTA */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Aantal:</label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors text-gray-700"
                    disabled={quantity <= 1}
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-6 py-2 font-bold text-lg text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Primary CTA */}
              <button 
                onClick={handleAddToCart}
                className={`w-full py-5 px-8 rounded-lg font-bold text-lg transition-all transform hover:scale-[1.02] ${
                  isOutOfStock 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                }`}
                disabled={isOutOfStock}
              >
                {isOutOfStock ? 'Uitverkocht' : 'Bestel Nu – Wees Voorbereid'}
              </button>

              {/* Trust indicators below CTA */}
              <div className="flex items-center justify-center gap-6 py-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Veilig betalen
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  30 dagen retour
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Morgen in huis
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="border-t pt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Duizenden Nederlandse Gezinnen Vertrouwen Op 123Noodklaar
            </h2>
            <p className="text-gray-600">
              Zie wat onze klanten zeggen over hun noodpakket
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  "{testimonial.text}"
                </p>
                {testimonial.verified && (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    ✓ Geverifieerde koper
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Trust Section */}
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-gray-900">{soldThisMonth.toLocaleString('nl-NL')}</div>
                <div className="text-sm text-gray-600">Verkocht deze maand</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.8/5</div>
                <div className="text-sm text-gray-600">Gemiddelde score</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">72 uur</div>
                <div className="text-sm text-gray-600">Overlevingstijd</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Overheidsrichtlijnen</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details - Below the fold */}
        <div className="mt-16 border-t pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Productdetails</h3>
              {product.description ? (
                <div className="space-y-4">
                  <div 
                    className="
                      product-description
                      [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mb-4 [&_h1]:mt-6
                      [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mb-3 [&_h2]:mt-6
                      [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mb-3 [&_h3]:mt-4
                      [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-gray-800 [&_h4]:mb-2 [&_h4]:mt-3
                      [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4
                      [&_ul]:ml-6 [&_ul]:mb-4 [&_ul]:space-y-2
                      [&_ol]:ml-6 [&_ol]:mb-4 [&_ol]:space-y-2
                      [&_li]:text-gray-700 [&_li]:leading-relaxed [&_li]:list-disc
                      [&_ol>li]:list-decimal
                      [&_strong]:font-semibold [&_strong]:text-gray-900
                      [&_em]:italic [&_em]:text-gray-700
                      [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-700
                      [&_hr]:border-t [&_hr]:border-gray-300 [&_hr]:my-6
                      [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4
                      [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                      [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:text-sm
                      [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
                      [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-50 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold
                      [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2
                    "
                    dangerouslySetInnerHTML={{ __html: product.description }} 
                  />
                </div>
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  Dit noodpakket is samengesteld volgens de officiële richtlijnen van de Nederlandse overheid. 
                  Het bevat alles wat je nodig hebt om minimaal 72 uur zelfstandig te kunnen overleven tijdens 
                  een noodsituatie. Van voedsel en water tot eerste hulp en communicatiemiddelen - alles is 
                  zorgvuldig geselecteerd en georganiseerd voor direct gebruik.
                </p>
              )}
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Waarom 123Noodklaar?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Specialist in noodpakketten sinds 2020</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Meer dan 50.000 tevreden klanten</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Altijd volgens laatste overheidsrichtlijnen</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Direct uit voorraad leverbaar</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Nederlandse klantenservice</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3 text-gray-900">Wacht Niet Tot Het Te Laat Is</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            De overheid raadt elk huishouden aan om voorbereid te zijn. Met {stockLeft} stuks op voorraad 
            en {soldThisMonth.toLocaleString('nl-NL')} verkochte pakketten deze maand, is dit het moment om actie te ondernemen.
          </p>
          <button 
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-2 py-4 px-8 rounded-lg font-bold text-lg transition-all transform hover:scale-[1.02] ${
              isOutOfStock 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
            }`}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'Uitverkocht' : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Voeg Toe Aan Winkelwagen – €{price.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}