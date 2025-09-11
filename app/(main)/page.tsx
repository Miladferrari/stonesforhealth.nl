import { Category } from '@/lib/woocommerce';
import dynamicImport from 'next/dynamic';
import Link from 'next/link';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Get the base URL for API calls
function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return 'http://localhost:3000';
}

// Lazy load heavy components
const ProductCard = dynamicImport(() => import('../components/ProductCard'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />,
  ssr: true
});

const TestimonialsSection = dynamicImport(() => import('../components/TestimonialsSection'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
});

const ComparisonSection = dynamicImport(() => import('../components/ComparisonSection'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
});

export default async function Home() {
  let featuredProducts: any[] = [];
  let categories: Category[] = [];
  let categoryPrices: Record<number, number> = {};
  let apiError = false;
  
  try {
    const baseUrl = getBaseUrl();
    
    // Fetch featured products via API route
    const productsRes = await fetch(`${baseUrl}/api/woocommerce/products?per_page=3&page=1&orderby=popularity&order=desc`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (productsRes.ok) {
      featuredProducts = await productsRes.json();
    }
    
    // Fetch product categories via API route
    const categoriesRes = await fetch(`${baseUrl}/api/woocommerce/categories?per_page=10&orderby=count&order=desc&hide_empty=true`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (categoriesRes.ok) {
      categories = await categoriesRes.json();
    }
    
    // Fetch lowest price for each category
    for (const category of categories.slice(0, 6)) {
      try {
        const categoryProductsRes = await fetch(`${baseUrl}/api/woocommerce/products?category=${category.id}&per_page=100&orderby=price&order=asc`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (categoryProductsRes.ok) {
          const products = await categoryProductsRes.json();
          if (products.length > 0) {
            // Find the lowest price among products
            const lowestPrice = Math.min(...products.map((p: any) => parseFloat(p.price) || 0));
            categoryPrices[category.id] = lowestPrice;
          }
        }
      } catch (err) {
        console.error(`Failed to fetch products for category ${category.id}:`, err);
      }
    }
  } catch (err) {
    console.error('Failed to load data:', err);
    apiError = true;
    // Use fallback data when API fails
    featuredProducts = [];
    categories = [
      {
        id: 15,
        name: "Noodpakketten",
        slug: "noodpakketten",
        parent: 0,
        description: "Essentiële noodpakketten voor uw veiligheid",
        display: "default",
        image: null,
        count: 0
      }
    ];
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Simplified */}
      <section className="bg-gradient-to-b from-navy-blue to-navy-blue/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-medical-green/10 rounded-full px-4 py-2 text-medical-green text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Officiële noodpakketten leverancier</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Noodpakketten voor <span className="text-medical-green">jouw veiligheid</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Professioneel samengestelde noodpakketten volgens overheidsrichtlijnen.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/noodpakketten" 
                className="inline-flex items-center justify-center gap-2 bg-medical-green text-white px-8 py-4 rounded-full font-bold hover:bg-medical-green/90 transition-all duration-200 shadow-lg"
              >
                <span>Bekijk alle pakketten</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/quiz" 
                className="inline-flex items-center justify-center gap-2 bg-white text-navy-blue px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-200"
              >
                <span>Hulp bij kiezen</span>
              </Link>
            </div>

            {/* USPs in one line */}
            <div className="flex flex-wrap justify-center gap-8 text-white">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Verzending binnen 2 dagen</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">14 dagen bedenktijd</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Minimaal 5 jaar houdbaar</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">3.000+ tevreden klanten</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-off-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <svg className="w-6 h-6 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-steel-gray">Veilig betalen met iDEAL</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <svg className="w-6 h-6 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span className="text-sm text-steel-gray">Verzending binnen 2 dagen</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <svg className="w-6 h-6 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <span className="text-sm text-steel-gray">14 dagen bedenktijd</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Prepare Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">
              Waarom nu voorbereiden?
            </h2>
            <p className="text-xl text-steel-gray max-w-3xl mx-auto">
              De overheid adviseert elke burger om voorbereid te zijn op noodsituaties. 
              Hier zijn de meest voorkomende scenario's:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-blue mb-2">Stroomuitval</h3>
              <p className="text-steel-gray text-sm mb-4">
                Gemiddeld 3x per jaar in Nederland. Kan dagen duren bij extreme weersomstandigheden.
              </p>
              <div className="text-xs text-amber-orange font-semibold">23% kans dit jaar</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-blue mb-2">Extreme Weer</h3>
              <p className="text-steel-gray text-sm mb-4">
                Stormen, overstromingen en hittegolven nemen toe door klimaatverandering.
              </p>
              <div className="text-xs text-amber-orange font-semibold">41% kans dit jaar</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-blue mb-2">Cyberaanval</h3>
              <p className="text-steel-gray text-sm mb-4">
                Kritieke infrastructuur is kwetsbaar. Kan leiden tot uitval van diensten.
              </p>
              <div className="text-xs text-amber-orange font-semibold">15% kans dit jaar</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-blue mb-2">Pandemie</h3>
              <p className="text-steel-gray text-sm mb-4">
                COVID-19 toonde het belang van voorbereiding. Experts waarschuwen voor nieuwe uitbraken.
              </p>
              <div className="text-xs text-amber-orange font-semibold">8% kans dit jaar</div>
            </div>
          </div>

          <div className="mt-12 bg-amber-orange/10 rounded-2xl p-6 border-2 border-amber-orange/30">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-amber-orange flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold text-navy-blue mb-1">Overheidsadvies</h4>
                <p className="text-steel-gray">
                  Het Rode Kruis en Rijksoverheid adviseren: "Zorg dat u minimaal 3 dagen zelfvoorzienend bent met water, voedsel, medicijnen en andere essentiële benodigdheden."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories - Redesigned */}
      {categories.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-off-white to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">
                Onze Collecties
              </h2>
              <p className="text-xl text-steel-gray">
                Kies uit onze zorgvuldig samengestelde productcategorieën
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 6).map((category, index) => {
                // Get lowest price for category
                const lowestPrice = categoryPrices[category.id];
                const priceDisplay = lowestPrice ? `€${Math.floor(lowestPrice)}` : 'Bekijk';
                
                return (
                  <Link 
                    key={category.id}
                    href={`/noodpakketten?category=${category.slug}`} 
                    className="group bg-white rounded-xl border-2 border-gray-100 hover:border-medical-green hover:shadow-lg transition-all duration-300 p-6"
                  >
                    {/* Clean header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-medical-green/10 rounded-lg flex items-center justify-center group-hover:bg-medical-green/20 transition-colors">
                        <svg className="w-6 h-6 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      {index === 0 && (
                        <span className="text-xs font-semibold text-amber-orange bg-amber-orange/10 px-2 py-1 rounded-full">
                          POPULAIR
                        </span>
                      )}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-navy-blue mb-2 group-hover:text-medical-green transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-steel-gray mb-4 line-clamp-2">
                      {category.description || 'Professioneel samengestelde noodvoorzieningen'}
                    </p>
                    
                    {/* Product count */}
                    <p className="text-xs text-steel-gray mb-4">
                      {category.count} {category.count === 1 ? 'product' : 'producten'} beschikbaar
                    </p>
                    
                    {/* Footer with price and arrow */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-steel-gray mb-1">Vanaf</p>
                        <p className="text-2xl font-bold text-medical-green">{priceDisplay}</p>
                      </div>
                      <div className="flex items-center gap-2 text-navy-blue group-hover:gap-3 transition-all">
                        <span className="text-sm font-medium">Bekijk</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {categories.length > 6 && (
              <div className="text-center mt-12">
                <Link 
                  href="/noodpakketten" 
                  className="inline-flex items-center gap-2 bg-white text-medical-green border-2 border-medical-green px-8 py-3 rounded-full font-semibold hover:bg-medical-green hover:text-white transition-all duration-200"
                >
                  <span>Bekijk alle collecties</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Comparison Section - Simplified */}
      <ComparisonSection />

      {/* Best-selling Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-off-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">
                Bestsellers deze maand
              </h2>
              <p className="text-xl text-steel-gray">
                De meest gekozen pakketten door onze klanten
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link 
                href="/noodpakketten" 
                className="inline-flex items-center gap-2 bg-white text-medical-green border-2 border-medical-green px-8 py-3 rounded-full font-semibold hover:bg-medical-green hover:text-white transition-all duration-200"
              >
                <span>Alle pakketten bekijken</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials - Enhanced */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-blue rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-medical-green rounded-full"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-orange rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start vandaag met je voorbereiding
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Meer dan 3.000 Nederlandse huishoudens vertrouwen op onze pakketten. 
                Wacht niet tot het te laat is.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/noodpakketten" 
                  className="inline-flex items-center justify-center gap-2 bg-medical-green text-white px-8 py-4 rounded-full font-bold hover:bg-medical-green/90 transition-all duration-200 shadow-xl hover:shadow-2xl"
                >
                  <span>Bekijk alle pakketten</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-navy-blue transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Advies nodig?</span>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Geen abonnement</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Eenmalige aankoop</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Direct compleet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}