import { Category } from '@/lib/woocommerce';
import dynamicImport from 'next/dynamic';
import Link from 'next/link';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  let featuredProducts: any[] = [];
  let categories: Category[] = [];
  let categoryPrices: Record<number, number> = {};
  let apiError = false;
  
  // Use demo data for now
  featuredProducts = [];
  categories = [];

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Hero Section - Clean & Compact */}
      <section className="relative bg-[#FAF8F5] overflow-hidden">
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
                      alt="Anna" 
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <img 
                      src="https://i.pravatar.cc/150?img=5" 
                      alt="Maria" 
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <img 
                      src="https://i.pravatar.cc/150?img=9" 
                      alt="Sophie" 
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
                          <svg key={i} className="w-3.5 h-3.5 text-[#492c4a] fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs bg-[#492c4a]/10 text-[#492c4a] px-1.5 py-0.5 rounded-md font-semibold">4.9/5</span>
                    </div>
                    <span className="text-[11px] text-gray-600 font-medium mt-1 font-[family-name:var(--font-eb-garamond)]">Vertrouwd door <span className="font-bold text-[#492c4a]">3000+</span> klanten</span>
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
                  href="/alle-producten"
                  className="inline-flex items-center justify-center gap-2 bg-[#3b223b] hover:bg-[#4d2e4d] text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-[family-name:var(--font-eb-garamond)]"
                >
                  <span>Shop kristallen</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#3b223b] px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 border border-[#3b223b]/20 font-[family-name:var(--font-eb-garamond)]"
                >
                  <span>Kristal quiz</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </Link>
              </div>

              {/* Reviews - Desktop only */}
              <div className="hidden lg:inline-flex items-center justify-center lg:justify-start gap-4 bg-white/60 backdrop-blur-sm rounded-full px-5 py-3 shadow-sm border border-gray-100">
                {/* Profile avatars */}
                <div className="flex -space-x-3">
                  <img 
                    src="https://i.pravatar.cc/150?img=1" 
                    alt="Anna" 
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                  <img 
                    src="https://i.pravatar.cc/150?img=5" 
                    alt="Maria" 
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                  <img 
                    src="https://i.pravatar.cc/150?img=9" 
                    alt="Sophie" 
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
                        <svg key={i} className="w-3.5 h-3.5 text-[#492c4a] fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs bg-[#492c4a]/10 text-[#492c4a] px-1.5 py-0.5 rounded-md font-semibold">4.9/5</span>
                  </div>
                  <span className="text-[11px] text-gray-600 font-medium mt-1 font-[family-name:var(--font-eb-garamond)]">Vertrouwd door <span className="font-bold text-[#492c4a]">3000+</span> klanten</span>
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
                  <source src="/banner.mp4" type="video/mp4" />
                  Je browser ondersteunt geen video.
                </video>
                
                {/* Video overlay for better text readability */}
                <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
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
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-white font-[family-name:var(--font-eb-garamond)]">Persoonlijke Kristal Quiz</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4 font-[family-name:var(--font-eb-garamond)]">
              Zo vind je jouw perfecte kristal
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto font-[family-name:var(--font-eb-garamond)]">
              In 3 eenvoudige stappen naar jouw gepersonaliseerde kristal selectie
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left column - Step flow */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white text-[#3b223b] rounded-xl flex items-center justify-center font-semibold font-[family-name:var(--font-eb-garamond)]">
                    1
                  </div>
                  <div className="w-0.5 h-16 bg-gradient-to-b from-white to-white/30 ml-6 mt-2"></div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-eb-garamond)]">
                    Vertel over jezelf
                  </h3>
                  <p className="text-white/70 font-[family-name:var(--font-eb-garamond)]">
                    Beantwoord vragen over je huidige gemoedstoestand en wat je wilt bereiken
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white text-[#3b223b] rounded-xl flex items-center justify-center font-semibold font-[family-name:var(--font-eb-garamond)]">
                    2
                  </div>
                  <div className="w-0.5 h-16 bg-gradient-to-b from-white to-white/30 ml-6 mt-2"></div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-eb-garamond)]">
                    Analyseer je energie
                  </h3>
                  <p className="text-white/70 font-[family-name:var(--font-eb-garamond)]">
                    Onze algoritme matcht jouw antwoorden met de eigenschappen van kristallen
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white text-[#3b223b] rounded-xl flex items-center justify-center font-semibold font-[family-name:var(--font-eb-garamond)]">
                    3
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-eb-garamond)]">
                    Ontvang je selectie
                  </h3>
                  <p className="text-white/70 font-[family-name:var(--font-eb-garamond)]">
                    Krijg een gepersonaliseerd advies met uitleg over waarom deze kristallen bij je passen
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - Benefits & CTA */}
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-8 shadow-lg relative">
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-2xl rotate-12"></div>
              
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-4 font-[family-name:var(--font-eb-garamond)]">
                  Start je kristalreis
                </h3>
                
                <p className="text-white/80 mb-8 font-[family-name:var(--font-eb-garamond)]">
                  Ontdek waarom meer dan 12.000 mensen al hun perfecte kristal hebben gevonden
                </p>
              </div>

              {/* Benefits list */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-white/90 font-[family-name:var(--font-eb-garamond)]">Wetenschappelijk onderbouwde matching</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-white/90 font-[family-name:var(--font-eb-garamond)]">5 minuten voor een levenslang resultaat</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-white/90 font-[family-name:var(--font-eb-garamond)]">Gratis en zonder verplichtingen</span>
                </div>
              </div>

              {/* CTA */}
              <Link 
                href="/quiz"
                className="w-full inline-flex items-center justify-center gap-3 bg-white hover:bg-white/90 text-[#3b223b] px-8 py-4 rounded-xl font-medium text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-[family-name:var(--font-eb-garamond)]"
              >
                <span>Start de gratis quiz</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <p className="mt-4 text-xs text-center text-white/60 font-[family-name:var(--font-eb-garamond)]">
                12.847 mensen gingen je voor • Gemiddeld 4.9/5 sterren
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-[#FAF8F5] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#3b223b]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3b223b]/3 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
            Vind jouw perfecte <span className="font-normal">kristal</span>
          </h2>
          
          <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto font-[family-name:var(--font-eb-garamond)]">
            Kies een categorie die past bij jouw intentie
          </p>
          
          {/* Clean category buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link href="/alle-producten?category=chakra" className="group bg-white border border-[#3b223b]/20 px-8 py-4 rounded-lg hover:bg-[#3b223b] hover:border-[#3b223b] transition-all">
              <h3 className="font-medium text-[#3b223b] group-hover:text-white mb-1 font-[family-name:var(--font-eb-garamond)]">Chakra & Energie</h3>
              <p className="text-xs text-gray-600 group-hover:text-white/80 font-[family-name:var(--font-eb-garamond)]">Herstel balans</p>
            </Link>
            
            <Link href="/alle-producten?category=bescherming" className="group bg-white border border-[#3b223b]/20 px-8 py-4 rounded-lg hover:bg-[#3b223b] hover:border-[#3b223b] transition-all">
              <h3 className="font-medium text-[#3b223b] group-hover:text-white mb-1 font-[family-name:var(--font-eb-garamond)]">Bescherming</h3>
              <p className="text-xs text-gray-600 group-hover:text-white/80 font-[family-name:var(--font-eb-garamond)]">Energetisch schild</p>
            </Link>
            
            <Link href="/alle-producten?category=liefde" className="group bg-white border border-[#3b223b]/20 px-8 py-4 rounded-lg hover:bg-[#3b223b] hover:border-[#3b223b] transition-all">
              <h3 className="font-medium text-[#3b223b] group-hover:text-white mb-1 font-[family-name:var(--font-eb-garamond)]">Liefde & Relaties</h3>
              <p className="text-xs text-gray-600 group-hover:text-white/80 font-[family-name:var(--font-eb-garamond)]">Open je hart</p>
            </Link>
            
            <Link href="/alle-producten?category=meditatie" className="group bg-white border border-[#3b223b]/20 px-8 py-4 rounded-lg hover:bg-[#3b223b] hover:border-[#3b223b] transition-all">
              <h3 className="font-medium text-[#3b223b] group-hover:text-white mb-1 font-[family-name:var(--font-eb-garamond)]">Meditatie</h3>
              <p className="text-xs text-gray-600 group-hover:text-white/80 font-[family-name:var(--font-eb-garamond)]">Innerlijke rust</p>
            </Link>
          </div>
          
          {/* Single CTA */}
          <Link href="/alle-producten" className="inline-flex items-center gap-2 bg-[#3b223b] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#4d2e4d] transition-all duration-200 shadow-lg">
            <span className="font-[family-name:var(--font-eb-garamond)]">Bekijk alle kristallen</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Waarom kiezen voor Stonesforhealth?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-[family-name:var(--font-eb-garamond)]">
              Wij bieden meer dan alleen kristallen - wij bieden een complete ervaring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Handgeselecteerd</h3>
              <p className="text-sm text-gray-600">Elke steen wordt zorgvuldig uitgekozen op kwaliteit en energie</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Ethisch gewonnen</h3>
              <p className="text-sm text-gray-600">Direct van betrouwbare bronnen met respect voor mens en natuur</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔮</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Energetisch gereinigd</h3>
              <p className="text-sm text-gray-600">Professioneel gereinigd en opgeladen voor optimale werking</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Snel verzonden</h3>
              <p className="text-sm text-gray-600">Zorgvuldig verpakt en binnen 1-2 dagen bij je thuis</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}