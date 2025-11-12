import { woocommerce, Category } from '@/lib/woocommerce';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

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
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  return {
    title: `${categoryName} Collectie | Stones for Health`,
    description: `Ontdek onze ${categoryName} collectie met natuurlijke edelstenen en kristallen`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = params;

  // Mapping van Nederlandse namen naar hun display namen
  const categoryTitles: Record<string, { title: string; description: string }> = {
    'intenties': {
      title: 'Shop op intentie',
      description: 'Vind de perfecte kristallen voor jouw doel - liefde, bescherming, rust, kracht en meer'
    },
    'sterrenbeeld': {
      title: 'Shop op sterrenbeeld',
      description: 'Elke sterrenbeeld heeft unieke kristallen die perfect aansluiten bij jouw energie - ontdek die van jou'
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
    const allCategories = await woocommerce.getCategories({ per_page: 100, hide_empty: true });

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
      console.log('[CollectionPage] Category not found in WooCommerce, checking fallback data for:', slug);

      // Create a fallback category for pages that don't exist yet in WooCommerce
      const fallbackCategories: Record<string, { id: number; name: string; slug: string; parent: number; description: string; subcategories: Array<{ name: string; slug: string; description: string }> }> = {
        'sterrenbeeld': {
          id: 9999,
          name: 'Sterrenbeeld',
          slug: 'sterrenbeeld',
          parent: 0,
          description: 'Ontdek de perfecte kristallen voor jouw sterrenbeeld',
          subcategories: [
            { name: 'Ram', slug: 'ram', description: 'Kristallen voor het sterrenbeeld Ram (21 maart - 19 april)' },
            { name: 'Stier', slug: 'stier', description: 'Kristallen voor het sterrenbeeld Stier (20 april - 20 mei)' },
            { name: 'Tweelingen', slug: 'tweelingen', description: 'Kristallen voor het sterrenbeeld Tweelingen (21 mei - 20 juni)' },
            { name: 'Kreeft', slug: 'kreeft', description: 'Kristallen voor het sterrenbeeld Kreeft (21 juni - 22 juli)' },
            { name: 'Leeuw', slug: 'leeuw', description: 'Kristallen voor het sterrenbeeld Leeuw (23 juli - 22 augustus)' },
            { name: 'Maagd', slug: 'maagd', description: 'Kristallen voor het sterrenbeeld Maagd (23 augustus - 22 september)' },
            { name: 'Weegschaal', slug: 'weegschaal', description: 'Kristallen voor het sterrenbeeld Weegschaal (23 september - 22 oktober)' },
            { name: 'Schorpioen', slug: 'schorpioen', description: 'Kristallen voor het sterrenbeeld Schorpioen (23 oktober - 21 november)' },
            { name: 'Boogschutter', slug: 'boogschutter', description: 'Kristallen voor het sterrenbeeld Boogschutter (22 november - 21 december)' },
            { name: 'Steenbok', slug: 'steenbok', description: 'Kristallen voor het sterrenbeeld Steenbok (22 december - 19 januari)' },
            { name: 'Waterman', slug: 'waterman', description: 'Kristallen voor het sterrenbeeld Waterman (20 januari - 18 februari)' },
            { name: 'Vissen', slug: 'vissen', description: 'Kristallen voor het sterrenbeeld Vissen (19 februari - 20 maart)' }
          ]
        }
      };

      if (fallbackCategories[slug]) {
        const fallback = fallbackCategories[slug];
        parentCategory = {
          id: fallback.id,
          name: fallback.name,
          slug: fallback.slug,
          parent: fallback.parent,
          description: fallback.description,
          display: 'default',
          image: null,
          count: fallback.subcategories.length
        } as Category;

        // Create fake subcategories for fallback
        subcategories = fallback.subcategories.map((sub, index) => ({
          id: 10000 + index,
          name: sub.name,
          slug: sub.slug,
          parent: fallback.id,
          description: sub.description,
          display: 'default',
          image: {
            id: 10000 + index,
            src: `/${sub.slug}.png`,
            alt: sub.name
          },
          count: 0
        } as Category));

        console.log('[CollectionPage] Using fallback data for:', slug);
      } else {
        console.error('[CollectionPage] No fallback data available for slug:', slug);
        notFound();
      }
    }

    // Get all subcategories that belong to this parent (only if not using fallback data)
    if (subcategories.length === 0) {
      subcategories = allCategories.filter(cat => cat.parent === parentCategory!.id && cat.count > 0);

      console.log('[CollectionPage] Found subcategories from API:', subcategories.length);

      // Sort subcategories - use zodiac order for sterrenbeeld, alphabetically for others
      if (slug === 'sterrenbeeld') {
        // Zodiac order
        const zodiacOrder = ['ram', 'stier', 'tweelingen', 'kreeft', 'leeuw', 'maagd', 'weegschaal', 'schorpioen', 'boogschutter', 'steenbok', 'waterman', 'vissen'];
        subcategories.sort((a, b) => {
          const indexA = zodiacOrder.indexOf(a.slug.toLowerCase());
          const indexB = zodiacOrder.indexOf(b.slug.toLowerCase());
          return indexA - indexB;
        });
      } else {
        // Sort alphabetically for other categories
        subcategories.sort((a, b) => a.name.localeCompare(b.name, 'nl'));
      }
    }

  } catch (error) {
    console.error('[CollectionPage] Failed to fetch categories:', error);
    notFound();
  }

  const categoryInfo = categoryTitles[slug] || {
    title: parentCategory?.name || 'Collectie',
    description: parentCategory?.description || ''
  };

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
                {subcategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/alle-producten?category=${category.slug}`}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#492c4a]/10 to-[#492c4a]/5">
                      {category.image?.src ? (
                        <img
                          src={category.image.src}
                          alt={decodeHtmlEntities(category.image.alt || category.name)}
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
                ))}
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
