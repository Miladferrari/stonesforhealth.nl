import { woocommerce, Category } from '@/lib/woocommerce';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { resolveSlug, subcategoriesFor, DISPLAY_NAMES } from '@/app/lib/categoryMenu';

// Revalidate every 60 seconds
export const revalidate = 60;

// Helper function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&apos;': "'"
  };
  return text.replace(/&[#a-z0-9]+;/gi, (entity) => entities[entity] || entity);
}

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `${categoryName} Collectie | Stones for Health`,
    description: `Ontdek onze ${categoryName} collectie met natuurlijke edelstenen en kristallen`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug: rawSlug } = await params;
  // Oude URL's (stenen-per-sterrenbeeld, elementen, ...) wijzen naar de
  // categorie die er nu voor in de plaats is gekomen.
  const slug = resolveSlug(rawSlug);

  // Mapping van Nederlandse namen naar hun display namen
  const categoryTitles: Record<string, { title: string; description: string }> = {
    'intenties': {
      title: 'Shop op intentie',
      description: 'Vind de perfecte kristallen voor jouw doel - liefde, bescherming, rust, kracht en meer'
    },
    'sterrenbeeld': {
      title: 'Shop op sterrenbeeld',
      description: 'Ontdek welke edelstenen bij jouw sterrenbeeld horen en versterk de unieke eigenschappen van jouw zonneteken met natuurlijke energie'
    },
    'elementen': {
      title: 'Shop op element',
      description: 'Breng balans in je leven met kristallen afgestemd op jouw element - aarde, water, vuur, lucht of ether'
    }
  };

  let parentCategory: Category | null = null;
  let subcategories: Category[] = [];

  try {
    // Fetch all categories
    const allCategories = await woocommerce.getCategories({ per_page: 100, hide_empty: false });

    console.log('[CollectionPage] Looking for slug:', slug);
    console.log('[CollectionPage] Available categories:', allCategories.map(c => ({ id: c.id, name: c.name, slug: c.slug, parent: c.parent })));

    // Find the parent category by slug (case-insensitive)
    parentCategory = allCategories.find(cat =>
      cat.slug.toLowerCase() === slug.toLowerCase() ||
      cat.name.toLowerCase() === slug.toLowerCase() ||
      cat.slug.toLowerCase().replace(/-/g, '') === slug.toLowerCase().replace(/-/g, '')
    ) || null;

    console.log('[CollectionPage] Found parent category:', parentCategory);

    if (!parentCategory) {
      console.error('[CollectionPage] Category not found in WooCommerce:', slug);
      notFound();
    }

    // Subcategorieën in de volgorde van de categorieboom. Dit neemt ook
    // categorieën mee die in WooCommerce onder een andere ouder hangen maar
    // hier wel horen, zoals de intenties onder Intenties.
    subcategories = subcategoriesFor(parentCategory.slug, allCategories) as Category[];

    console.log('[CollectionPage] Subcategories:', subcategories.length);

  } catch (error) {
    console.error('[CollectionPage] Failed to fetch categories:', error);
    notFound();
  }

  // Override description based on slug, regardless of what WooCommerce returns
  let categoryInfo;
  if (slug === 'stenen-per-sterrenbeeld' || slug === 'sterrenbeeld') {
    categoryInfo = {
      title: 'Shop op sterrenbeeld',
      description: 'Ontdek welke edelstenen bij jouw sterrenbeeld horen en versterk de unieke eigenschappen van jouw zonneteken met natuurlijke energie'
    };
  } else {
    categoryInfo = categoryTitles[slug] || {
      title: parentCategory?.name || 'Collectie',
      description: parentCategory?.description || ''
    };
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Subcategories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {subcategories.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
                  {categoryInfo.title}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto font-[family-name:var(--font-eb-garamond)]">
                  {categoryInfo.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {subcategories.map((category) => {
                  // Map local images for element and intenties subcategories
                  const localImageMap: Record<string, string> = {
                    // Element categories
                    'aarde-stenen-gronding-stabiliteit-elementen': '/aarde-stenen.png',
                    'liefde-stenen-zelfliefde-compassie': '/liefde-stenen.png',
                    'lucht-stenen-communicatie-helderheid': '/lucht-stenen.png',
                    'vuur-stenen-passie-energie': '/vuur-stenen.png',
                    'water-stenen-emotie-intuitie': '/water-stenen.png',
                    // Intenties categories
                    'balans-energie': '/balans-energie.png',
                    'bescherming-aarding': '/bescherming-aarding.png',
                    'creativiteit': '/creativiteit.png',
                    'focus-helderheid': '/focus-helderheid.png',
                    'geluk-rijkdom': '/geluk-rijkdom.png',
                    'intuitie-spirituele-groei': '/intuitie-spirituele-groei.png',
                    'kracht-doorzettingsvermogen': '/kracht-doorzettingsvermogen.png',
                    'liefde-verbinding': '/liefde-verbinding.png',
                    'rust-ontspanning': '/rust-ontspanning.png',
                    'zelfliefde-zelfvertrouwen': '/zelfliefde-zelfvertrouwen.png',
                    // Sterrenbeeld category
                    'vissen': '/vissen.png'
                  };

                  const imageSrc = localImageMap[category.slug] || category.image?.src;

                  return (
                    <Link
                      key={category.id}
                      href={`/alle-producten?category=${category.slug}`}
                      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#492c4a]/10 to-[#492c4a]/5">
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={decodeHtmlEntities(category.image?.alt || category.name)}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <div className="w-32 h-32 rounded-full bg-white/60 flex items-center justify-center">
                              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                        )}

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 text-center flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-[#2D2D2D] mb-4 flex-grow flex items-center justify-center min-h-[3rem] font-[family-name:var(--font-eb-garamond)]">
                        {decodeHtmlEntities(category.name)}
                      </h3>
                      <button className="bg-[#492c4a] hover:bg-[#6b4069] text-white px-6 py-2.5 rounded-full transition-colors font-[family-name:var(--font-eb-garamond)] w-full">
                        Shop nu
                      </button>
                    </div>

                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#492c4a] to-[#6b4069] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                Geen collecties gevonden
              </p>
              <Link
                href="/"
                className="inline-block mt-6 px-6 py-3 bg-[#492c4a] text-white rounded-full hover:bg-[#6b4069] transition-colors font-[family-name:var(--font-eb-garamond)]"
              >
                Terug naar home
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
