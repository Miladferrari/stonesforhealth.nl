import Link from 'next/link';
import { Category } from '@/lib/woocommerce';
import ProductCard from '../../components/ProductCard';
import FilteredProducts from '../../components/FilteredProducts';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Get the base URL for API calls
function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return 'http://localhost:3000';
}

interface CatalogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const selectedCategorySlug = params.category as string | undefined;
  
  let categories: Category[] = [];
  let categoryPrices: Record<number, number> = {};
  let selectedCategory: Category | null = null;
  let categoryProducts: any[] = [];
  let apiError = false;
  
  try {
    const baseUrl = getBaseUrl();
    
    // Fetch product categories via API route
    const categoriesRes = await fetch(`${baseUrl}/api/woocommerce/categories?per_page=100&orderby=count&order=desc&hide_empty=false`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (categoriesRes.ok) {
      categories = await categoriesRes.json();
    }
    
    // If a category is selected, find it and fetch its products
    if (selectedCategorySlug) {
      selectedCategory = categories.find(cat => cat.slug === selectedCategorySlug) || null;
      
      if (selectedCategory) {
        try {
          const productsRes = await fetch(`${baseUrl}/api/woocommerce/products?category=${selectedCategory.id}&per_page=100&orderby=menu_order&order=asc`, {
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          if (productsRes.ok) {
            categoryProducts = await productsRes.json();
          }
        } catch (error) {
          console.error('[Collection Page] Error fetching products:', error);
        }
      }
    } else {
      // Fetch lowest price for each category only when showing all categories
      for (const category of categories) {
        try {
          const productsRes = await fetch(`${baseUrl}/api/woocommerce/products?category=${category.id}&per_page=100&orderby=price&order=asc`, {
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          if (productsRes.ok) {
            const products = await productsRes.json();
            if (products.length > 0) {
              const lowestPrice = Math.min(...products.map((p: any) => parseFloat(p.price) || 0));
              categoryPrices[category.id] = lowestPrice;
            }
          }
        } catch (err) {
          console.error(`Failed to fetch products for category ${category.id}:`, err);
        }
      }
    }
  } catch (err) {
    console.error('Failed to load categories:', err);
    apiError = true;
    // Use fallback/dummy data when API fails
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
    <div className="min-h-screen bg-off-white">
      {/* Hero Section - matching over-ons page style */}
      <section className="bg-gradient-to-br from-navy-blue to-navy-blue/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            {selectedCategory ? selectedCategory.name : 'Onze Noodpakketten'}
          </h1>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            {selectedCategory 
              ? `Bekijk onze ${selectedCategory.name.toLowerCase()} collectie met zorgvuldig samengestelde noodvoorzieningen`
              : 'Professioneel samengestelde noodpakketten voor elk Nederlands huishouden. Wees voorbereid op het onverwachte.'}
          </p>
        </div>
      </section>

      {/* Show API error message if needed */}
      {apiError && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 max-w-7xl mx-auto">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                De productcatalogus wordt momenteel bijgewerkt. Probeer het later opnieuw of neem contact met ons op.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Show products if category is selected, otherwise show categories */}
      {selectedCategory && categoryProducts.length > 0 ? (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <nav className="flex items-center gap-2 text-sm">
                <Link className="text-steel-gray hover:text-medical-green transition-colors" href="/">Home</Link>
                <span className="text-steel-gray">/</span>
                <Link className="text-steel-gray hover:text-medical-green transition-colors" href="/noodpakketten">Noodpakketten</Link>
                <span className="text-steel-gray">/</span>
                <span className="text-navy-blue font-medium">{selectedCategory.name}</span>
              </nav>
              <Link 
                href="/noodpakketten" 
                className="inline-flex items-center gap-2 text-medical-green hover:text-medical-green/80 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
                Alle categorieën bekijken
              </Link>
            </div>
            
            <FilteredProducts products={categoryProducts} categoryName={selectedCategory.name} />
          </div>
        </section>
      ) : selectedCategory && categoryProducts.length === 0 ? (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-blue mb-2">Geen producten gevonden</h3>
              <p className="text-steel-gray mb-6">Er zijn momenteel geen producten in deze categorie.</p>
              <Link 
                href="/noodpakketten" 
                className="inline-flex items-center gap-2 text-medical-green hover:text-medical-green/80 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
                Terug naar categorieën
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
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
        </div>
      </section>
      )}

      {/* Why Choose Section - Emotional Redesign - Only show when no category selected */}
      {!selectedCategory && (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">
              Waarom een noodpakket essentieel is
            </h2>
            <p className="text-xl text-steel-gray max-w-3xl mx-auto">
              Volgens het Nederlandse Rode Kruis is 72 uur zelfredzaamheid cruciaal bij calamiteiten. 
              Met onze gecertificeerde pakketten ben je voorbereid op stroomuitval, wateruitval en noodsituaties.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-medical-green/20 transition-colors">
                <svg className="w-10 h-10 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-blue mb-3">
                Gecertificeerd drinkwater
              </h3>
              <p className="text-steel-gray mb-2">
                ISO 22000 gecertificeerd noodwater met <strong>5 jaar houdbaarheid</strong>. Voldoet aan WHO-normen. 
              </p>
              <p className="text-medical-green font-semibold">
                Betrouwbare kwaliteit ✓
              </p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-medical-green/20 transition-colors">
                <svg className="w-10 h-10 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-blue mb-3">
                Complete nooduitrusting
              </h3>
              <p className="text-steel-gray mb-2">
                <strong>Alle essentiële items</strong> volgens overheidsrichtlijnen: verlichting, EHBO, communicatie.
              </p>
              <p className="text-medical-green font-semibold">
                Direct gebruiksklaar ✓
              </p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-medical-green/20 transition-colors">
                <svg className="w-10 h-10 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-blue mb-3">
                Bewezen betrouwbaarheid
              </h3>
              <p className="text-steel-gray mb-2">
                Al <strong>3.000+ Nederlandse huishoudens</strong> kozen voor onze pakketten.
              </p>
              <p className="text-medical-green font-semibold">
                Vertrouwde keuze ✓
              </p>
            </div>
          </div>
          
          <div className="bg-amber-orange/10 rounded-2xl p-6 text-center max-w-3xl mx-auto">
            <p className="text-lg text-navy-blue font-medium mb-2">
              "De beste tijd om een boom te planten was 20 jaar geleden.
            </p>
            <p className="text-lg text-navy-blue font-bold">
              De op één na beste tijd is nu."
            </p>
            <p className="text-sm text-steel-gray mt-3">
              - Chinees gezegde, perfect voor noodvoorbereiding
            </p>
          </div>
        </div>
      </section>
      )}

      {/* CTA Section - Only show when no category selected */}
      {!selectedCategory && (
      <section className="py-16 bg-gradient-to-r from-medical-green to-medical-green/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Niet zeker welk pakket bij je past?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Gebruik onze pakket-kiezer of neem contact op voor persoonlijk advies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="bg-white text-medical-green px-8 py-4 rounded-full font-bold hover:bg-off-white transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Start Pakket-kiezer
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-medical-green transition-all inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact Opnemen
            </Link>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}