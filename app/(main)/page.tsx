import { Category } from '@/lib/woocommerce';
import dynamicImport from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import BestsellerGrid from '@/app/components/BestsellerGrid';
import JsonLd from '@/app/components/JsonLd';

// Use ISR with 60 second revalidation for better performance
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Edelstenen & Kristallen Kopen | Authentiek & Ethisch | StonesForHealth',
  description: 'Koop authentieke edelstenen en kristallen bij StonesForHealth ✓ 100% Ethisch Gewonnen ✓ Gratis Verzending €30+ ✓ 30 Dagen Retour ✓ 4000+ Tevreden Klanten',
  keywords: [
    'edelstenen kopen',
    'kristallen kopen',
    'edelstenen Nederland',
    'kristallen webshop',
    'chakra stenen',
    'rozenkwarts kopen',
    'amethist kopen',
    'authentieke edelstenen',
    'ethisch gewonnen kristallen'
  ],
  openGraph: {
    title: 'Edelstenen & Kristallen Kopen | StonesForHealth',
    description: 'Koop authentieke en ethisch gewonnen edelstenen en kristallen. Gratis verzending vanaf €30.',
    url: 'https://stonesforhealth.nl',
    siteName: 'Stones for Health',
    locale: 'nl_NL',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'Stones for Health - Edelstenen & Kristallen Webshop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edelstenen & Kristallen Kopen | StonesForHealth',
    description: 'Koop authentieke en ethisch gewonnen edelstenen en kristallen.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl',
  },
};

export default async function Home() {
  // Use static fallback data - no API calls to prevent hanging
  const categories: Category[] = [
    {
      id: 1,
      name: 'Intenties',
      slug: 'intenties',
      parent: 597,
      description: 'Shop op basis van jouw intentie - liefde, bescherming, geluk, rust en meer',
      display: 'default',
      image: { id: 1, src: '/intenties.png', alt: 'Intenties' },
      count: 238
    },
    {
      id: 2,
      name: 'Sterrenbeeld',
      slug: 'stenen-per-sterrenbeeld',
      parent: 595,
      description: 'Ontdek de perfecte kristallen voor jouw sterrenbeeld',
      display: 'default',
      image: { id: 2, src: '/sterrenbeeld.png', alt: 'Sterrenbeeld' },
      count: 189
    },
    {
      id: 3,
      name: 'Elementen',
      slug: 'elementen',
      parent: 597,
      description: 'Breng balans met de 5 elementen - aarde, water, vuur, lucht en ether',
      display: 'default',
      image: { id: 3, src: '/elementen.png', alt: 'Elementen' },
      count: 213
    }
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Stones for Health",
    "url": "https://stonesforhealth.nl",
    "logo": "https://stonesforhealth.nl/logo.png",
    "description": "Nederlandse webshop voor authentieke edelstenen en kristallen. 100% ethisch gewonnen, gratis verzending vanaf €30, 30 dagen retour.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NL"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "info@stonesforhealth.nl"
    },
    "sameAs": [
      "https://www.instagram.com/stonesforhealth.nl",
      "https://www.facebook.com/stonesforhealth"
    ]
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <JsonLd data={organizationSchema} />
      {/* Hero Section - Clean & Compact */}
      <section className="relative bg-[#faf8f4] overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#F5F1E8]/30 to-[#E8DCC6]/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center">
            
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              {/* Reviews - Mobile/Tablet: above title, Desktop: below buttons */}
              <div className="lg:hidden mb-6 flex justify-center">
                <div className="inline-flex items-center justify-center gap-4 bg-white/60 backdrop-blur-sm rounded-full px-5 py-3 shadow-sm border border-gray-100">
                  {/* Profile avatars */}
                  <div className="flex -space-x-3">
                    <img
                      src="https://i.pravatar.cc/150?img=1"
                      alt="Tevreden klant Anna - Stonesforhealth review avatar"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <img
                      src="https://i.pravatar.cc/150?img=5"
                      alt="Verified customer Maria - 5 sterren review Stonesforhealth"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <img
                      src="https://i.pravatar.cc/150?img=9"
                      alt="Klant Sophie - Positieve edelstenen ervaring review"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      +3K
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                  
                  {/* Stars and text */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20">
                            {i < 4 ? (
                              <path className="text-[#492c4a] fill-current" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            ) : (
                              <>
                                <path fill="#e0e0e0" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                <defs>
                                  <clipPath id={`star-clip-${i}`}>
                                    <rect x="0" y="0" width="8" height="20" />
                                  </clipPath>
                                </defs>
                                <path fill="#492c4a" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipPath={`url(#star-clip-${i})`} />
                              </>
                            )}
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs bg-[#492c4a]/10 text-[#492c4a] px-1.5 py-0.5 rounded-md font-semibold">4.4/5</span>
                    </div>
                    <span className="text-[11px] text-gray-600 font-medium mt-1 font-[family-name:var(--font-eb-garamond)]">Vertrouwd door <span className="font-bold text-[#492c4a]">4000+</span> klanten</span>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#492c4a] mb-6 leading-tight font-[family-name:var(--font-eb-garamond)]">
                Ontdek de kracht van <span className="text-[#492c4a] font-bold">kristallen</span>
              </h1>
              
              <p className="text-lg lg:text-xl font-bold text-[#492c4a] mb-8 max-w-xl mx-auto lg:mx-0 font-[family-name:var(--font-eb-garamond)]">
                Verhoog je energie, vind innerlijke rust en versterk je spirituele reis met onze zorgvuldig geselecteerde edelsteen collectie
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link
                  href="/bestsellers"
                  className="inline-flex items-center justify-center gap-2 bg-[#fbe022] hover:bg-[#e6cc1f] text-black px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-[family-name:var(--font-eb-garamond)]"
                >
                  <span>Shop bestsellers</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
{/* Kristal quiz button - hidden
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#3b223b] px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 border border-[#3b223b]/20 font-[family-name:var(--font-eb-garamond)]"
                >
                  <span>Kristal quiz</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </Link>
                */}
              </div>

              {/* Reviews - Desktop only */}
              <div className="hidden lg:block space-y-3">
                <div className="inline-flex items-center justify-center lg:justify-start gap-4 bg-white/60 backdrop-blur-sm rounded-full px-5 py-3 shadow-sm border border-gray-100">
                  {/* Profile avatars */}
                  <div className="flex -space-x-3">
                    <img
                      src="https://i.pravatar.cc/150?img=1"
                      alt="Tevreden klant Anna - Stonesforhealth review avatar"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <img
                      src="https://i.pravatar.cc/150?img=5"
                      alt="Verified customer Maria - 5 sterren review Stonesforhealth"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <img
                      src="https://i.pravatar.cc/150?img=9"
                      alt="Klant Sophie - Positieve edelstenen ervaring review"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      +3K
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                  {/* Stars and text */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20">
                            {i < 4 ? (
                              <path className="text-[#492c4a] fill-current" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            ) : (
                              <>
                                <path fill="#e0e0e0" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                <defs>
                                  <clipPath id={`star-clip-${i}`}>
                                    <rect x="0" y="0" width="8" height="20" />
                                  </clipPath>
                                </defs>
                                <path fill="#492c4a" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipPath={`url(#star-clip-${i})`} />
                              </>
                            )}
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs bg-[#492c4a]/10 text-[#492c4a] px-1.5 py-0.5 rounded-md font-semibold">4.4/5</span>
                    </div>
                    <span className="text-[11px] text-gray-600 font-medium mt-1 font-[family-name:var(--font-eb-garamond)]">Vertrouwd door <span className="font-bold text-[#492c4a]">4000+</span> klanten</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Video */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ aspectRatio: '16/10' }}
                >
                  <source src="/bannerhome.mp4" type="video/mp4" />
                  Je browser ondersteunt geen video.
                </video>
                
                {/* Video overlay for better text readability */}
                <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section - Beautiful Cards */}
      <section className="py-24 bg-gradient-to-b from-[#f7f3ec] to-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#492c4a]/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#492c4a]/2 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-bold text-[#492c4a] uppercase tracking-wider mb-4 font-[family-name:var(--font-eb-garamond)]">
              Shop Op Jouw Manier
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
              Vind De Perfecte <span className="text-[#492c4a]">Kristallen</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-[family-name:var(--font-eb-garamond)]">
              Shop op basis van jouw intentie, sterrenbeeld of element en ontdek de kristallen die perfect bij jou passen
            </p>
          </div>

          {/* Collection Cards Grid - Shows 3 main collections */}
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {categories.length > 0 ? categories.slice(0, 3).map((category, index) => {
              // Map slugs correctly - if it's stenen-per-sterrenbeeld, we still use the same slug
              const collectionSlug = category.slug === 'stenen-per-sterrenbeeld' ? 'stenen-per-sterrenbeeld' : category.slug;

              return (
              <Link
                key={category.id}
                href={`/collectie/${collectionSlug}`}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#492c4a]/10 to-[#492c4a]/5">
                  {(() => {
                    // Always use local images for these main collections for consistency
                    let imageSrc = category.image?.src;

                    // Override with local images if available
                    if (category.slug === 'stenen-per-sterrenbeeld') {
                      imageSrc = '/sterrenbeeld.png';
                    } else if (category.slug === 'intenties') {
                      imageSrc = '/intenties.png';
                    } else if (category.slug === 'elementen') {
                      imageSrc = '/elementen.png';
                    }

                    return (
                      <img
                        src={imageSrc || '/placeholder.png'}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    );
                  })()}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
                    {category.slug === 'intenties' ? 'Shop gebaseerd op wat je nu voelt dat je nodig hebt' :
                     category.slug === 'stenen-per-sterrenbeeld' ? 'Shop op wat jouw sterrenbeeld nodig heeft' :
                     category.slug === 'elementen' ? 'Shop op wat de natuur je kan geven' :
                     category.description || 'Ontdek deze collectie'}
                  </p>
                  <button className="bg-[#492c4a] hover:bg-[#6b4069] text-white px-6 py-2 rounded-full transition-colors font-[family-name:var(--font-eb-garamond)]">
                    SHOP
                  </button>
                </div>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#492c4a] to-[#6b4069] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Link>
              );
            }) : (
              /* Fallback hardcoded collections - Intenties, Sterrenbeeld, Elementen */
              <>
                <Link href="/collections/intenties" className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#492c4a]/10 to-[#492c4a]/5">
                    <img
                      src="/intenties.png"
                      alt="Intenties"
                      className="w-full h-full object-cover object-[center_60%] group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      Intenties
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
                      Shop gebaseerd op wat je nu voelt dat je nodig hebt
                    </p>
                    <button className="bg-[#492c4a] hover:bg-[#6b4069] text-white px-6 py-2 rounded-full transition-colors font-[family-name:var(--font-eb-garamond)]">
                      SHOP
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#492c4a] to-[#6b4069] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Link>

                <Link href="/collections/sterrenbeeld" className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#492c4a]/10 to-[#492c4a]/5">
                    <img
                      src="/sterrenbeeld.png"
                      alt="Sterrenbeeld"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      Sterrenbeeld
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
                      Shop op wat jouw sterrenbeeld nodig heeft
                    </p>
                    <button className="bg-[#492c4a] hover:bg-[#6b4069] text-white px-6 py-2 rounded-full transition-colors font-[family-name:var(--font-eb-garamond)]">
                      SHOP
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#492c4a] to-[#6b4069] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Link>

                <Link href="/collections/elementen" className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#492c4a]/10 to-[#492c4a]/5">
                    <img
                      src="/elementen.png"
                      alt="Elementen"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2 font-[family-name:var(--font-eb-garamond)]">
                      Elementen
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
                      Shop op wat de natuur je kan geven
                    </p>
                    <button className="bg-[#492c4a] hover:bg-[#6b4069] text-white px-6 py-2 rounded-full transition-colors font-[family-name:var(--font-eb-garamond)]">
                      SHOP
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#492c4a] to-[#6b4069] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 bg-[#f7f3ec]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-bold text-[#492c4a] uppercase tracking-wider mb-4 font-[family-name:var(--font-eb-garamond)]">
              Meest Verkocht
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
              Shop Onze <span className="text-[#492c4a]">Bestsellers</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-[family-name:var(--font-eb-garamond)]">
              De favoriete kristallen van onze klanten, geselecteerd voor hun krachtige energie
            </p>
          </div>

          {/* Product Cards Grid - Dynamic from WooCommerce */}
          <BestsellerGrid />

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/bestsellers"
              className="inline-flex items-center gap-2 bg-[#fbe022] hover:bg-[#e6cc1f] text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>Bekijk Alle Bestsellers</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews Slider */}
      <section className="py-16 bg-[#f7f3ec]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#492c4a] text-center mb-10 font-[family-name:var(--font-eb-garamond)]">
            Klanten zijn dol op onze edelstenen!
          </h2>

          {/* Floating review images - Infinite scroll */}
          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-scroll">
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Klant review foto - Amethist edelsteen healing ervaring" className="object-cover rounded-lg" src="/review1.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Instagram klantfoto - Kristallen collectie display Stonesforhealth" className="object-cover rounded-lg" src="/review2.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Customer testimonial - Healing stenen meditatie setup" className="object-cover rounded-lg" src="/review3.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Meditatie met kristallen - Klant ervaring foto Stonesforhealth" className="object-cover rounded-lg" src="/review4.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Chakra stenen arrangement - 7 chakra kristallen testimonial" className="object-cover rounded-lg" src="/review5.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Edelsteen sieraden collectie - Klant review Stonesforhealth" className="object-cover rounded-lg" src="/review6.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Kristallen energie healing - Customer experience foto" className="object-cover rounded-lg" src="/review7.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Healing kristallen testimonial - Rozenkwarts bergkristal klant foto" className="object-cover rounded-lg" src="/review8.png" fill sizes="224px" />
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Klant review foto - Amethist edelsteen healing ervaring" className="object-cover rounded-lg" src="/review1.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Instagram klantfoto - Kristallen collectie display Stonesforhealth" className="object-cover rounded-lg" src="/review2.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Customer testimonial - Healing stenen meditatie setup" className="object-cover rounded-lg" src="/review3.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Meditatie met kristallen - Klant ervaring foto Stonesforhealth" className="object-cover rounded-lg" src="/review4.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Chakra stenen arrangement - 7 chakra kristallen testimonial" className="object-cover rounded-lg" src="/review5.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Edelsteen sieraden collectie - Klant review Stonesforhealth" className="object-cover rounded-lg" src="/review6.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Kristallen energie healing - Customer experience foto" className="object-cover rounded-lg" src="/review7.png" fill sizes="224px" />
              </div>
              <div className="w-56 h-80 flex-shrink-0 relative">
                <Image alt="Healing kristallen testimonial - Rozenkwarts bergkristal klant foto" className="object-cover rounded-lg" src="/review8.png" fill sizes="224px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Transition */}
      <div className="relative -mt-8 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full h-20">
          <path d="M0,40 C320,10 420,70 720,40 C1020,10 1120,70 1440,40 L1440,80 L0,80 Z" fill="#3b223b"/>
        </svg>
      </div>

      {/* Categories Section - Mystical & Professional */}
      <section className="py-20 bg-[#3b223b] relative overflow-hidden">
        {/* Mystical background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-16 right-16 w-48 h-48 bg-white/3 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/2 rounded-full blur-3xl"></div>
        </div>

        {/* Floating stars */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute top-20 left-12 w-4 h-4 text-white/20 animate-star-parallax-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.121 6.879L21 10.879l-6.879 2.121L12 22l-2.121-8.879L3 10.879l6.879-2.121z"/>
          </svg>
          <svg className="absolute top-32 right-20 w-3 h-3 text-white/15 animate-star-parallax-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.121 6.879L21 10.879l-6.879 2.121L12 22l-2.121-8.879L3 10.879l6.879-2.121z"/>
          </svg>
          <svg className="absolute bottom-24 left-1/4 w-5 h-5 text-white/25 animate-star-parallax-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.121 6.879L21 10.879l-6.879 2.121L12 22l-2.121-8.879L3 10.879l6.879-2.121z"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-full px-5 py-2.5 mb-6 border border-yellow-400/30">
              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-bold text-yellow-300 uppercase tracking-wider font-[family-name:var(--font-eb-garamond)]">Meest Populaire Winkel van 2025</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-eb-garamond)]">
              Ontdek Jouw Perfecte Kristal in <span className="text-yellow-300">3 Minuten</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6 font-[family-name:var(--font-eb-garamond)]">
              Al <span className="font-bold text-yellow-300">2.347 mensen</span> vonden deze maand hun ideale kristal in onze winkel
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Geen Account Nodig</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Direct Resultaat</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Step flow */}
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
              <h4 className="text-white font-bold text-2xl mb-8 text-center font-[family-name:var(--font-eb-garamond)]">
                Zo werkt het
              </h4>
              
              <div className="space-y-10">
                {/* Step 1 */}
                <div className="flex items-center gap-6 group">
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur border-2 border-white/40 text-white rounded-full flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-all shadow-lg font-[family-name:var(--font-eb-garamond)]">
                      1
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-white/40 to-transparent"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-eb-garamond)]">
                      Persoonlijke vragen
                    </h3>
                    <p className="text-base text-white/90 font-medium font-[family-name:var(--font-eb-garamond)]">
                      Beantwoord 5 simpele vragen over jouw huidige situatie en doelen
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-6 group">
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur border-2 border-white/40 text-white rounded-full flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-all shadow-lg font-[family-name:var(--font-eb-garamond)]">
                      2
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-white/40 to-transparent"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-eb-garamond)]">
                      Slimme analyse
                    </h3>
                    <p className="text-base text-white/90 font-medium font-[family-name:var(--font-eb-garamond)]">
                      Ons systeem matcht jouw antwoorden met 50+ kristallen eigenschappen
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur border-2 border-white/40 text-white rounded-full flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-all shadow-lg font-[family-name:var(--font-eb-garamond)]">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-eb-garamond)]">
                      Jouw top 3 kristallen
                    </h3>
                    <p className="text-base text-white/90 font-medium font-[family-name:var(--font-eb-garamond)]">
                      Ontvang direct je persoonlijke selectie met uitleg en tips
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Benefits & CTA */}
            <div className="bg-white/15 backdrop-blur border border-white/30 rounded-3xl p-8 relative overflow-hidden">
              {/* Subtle decoration */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="text-center mb-6">
                {/* Trust indicator */}
                <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur px-5 py-2.5 rounded-full text-base mb-6">
                  <span className="text-white font-bold">Al 2.347 tevreden gebruikers deze maand</span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-eb-garamond)]">
                  Start Jouw Kristalreis
                </h3>
                
                {/* Social proof */}
                <div className="flex justify-center items-center gap-4 mb-6">
                  <div className="flex -space-x-2">
                    <img src="https://i.pravatar.cc/32?img=1" alt="Verified Stonesforhealth klant - 5 sterren testimonial" className="w-8 h-8 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/32?img=5" alt="Tevreden klant review avatar - Kristallen webshop" className="w-8 h-8 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/32?img=9" alt="Customer testimonial photo - Edelstenen ervaring" className="w-8 h-8 rounded-full border-2 border-white" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-white font-bold">4.9 uit 4000+ klanten</span>
                  </div>
                </div>
              </div>

              {/* Key benefits */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <svg className="w-5 h-5 text-white/90 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-white font-semibold font-[family-name:var(--font-eb-garamond)]">100% Gepersonaliseerd advies</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <svg className="w-5 h-5 text-white/90 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-white font-semibold font-[family-name:var(--font-eb-garamond)]">Direct resultaat, geen account nodig</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <svg className="w-5 h-5 text-white/90 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-white font-semibold font-[family-name:var(--font-eb-garamond)]">Wetenschappelijk onderbouwd</span>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-white/20 backdrop-blur rounded-xl p-5 mb-6 border border-white/30">
                <p className="text-base text-white font-medium italic mb-3">
                  "De winkel heeft een geweldige selectie kristallen. Ik vond precies wat ik zocht en voel me nu veel rustiger."
                </p>
                <div className="flex items-center gap-2">
                  <img src="https://i.pravatar.cc/24?img=3" alt="Sarah K - Verified customer testimonial Stonesforhealth" className="w-6 h-6 rounded-full" />
                  <span className="text-sm text-white/90 font-bold">Sarah K. - Verified</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/quiz"
                className="w-full inline-flex items-center justify-center gap-3 bg-[#fbe022] hover:bg-[#e6cc1f] text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-[family-name:var(--font-eb-garamond)]"
              >
                <span>Start Gratis Quiz</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <p className="mt-4 text-center text-sm text-white/80 font-semibold font-[family-name:var(--font-eb-garamond)]">
                Geen creditcard vereist • 3 minuten • Direct resultaat
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}