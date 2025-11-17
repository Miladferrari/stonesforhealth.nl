'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import CollectionHero from '@/app/components/collection/CollectionHero';
import CollectionTrustBadges from '@/app/components/collection/CollectionTrustBadges';
import CollectionProductGrid from '@/app/components/collection/CollectionProductGrid';
import CollectionPagination from '@/app/components/collection/CollectionPagination';
import { Product } from '@/lib/woocommerce';

const PRODUCTS_PER_PAGE = 12;

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  count: number;
  image?: {
    src: string;
    alt: string;
  };
}

export default function CollectionPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [collectionTitle, setCollectionTitle] = useState('EDELSTENEN COLLECTIE');
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [parentCategoryId, setParentCategoryId] = useState<number | null>(null);

  useEffect(() => {
    checkIfParentCategory();
  }, [slug]);

  useEffect(() => {
    if (!showSubcategories) {
      fetchProducts();
    }
  }, [slug, currentPage, showSubcategories]);

  const checkIfParentCategory = async () => {
    setLoading(true);
    try {
      // Check if this slug is a parent category (intenties, stenen-per-sterrenbeeld, elementen)
      const parentCategories = ['intenties', 'stenen-per-sterrenbeeld', 'elementen'];

      if (parentCategories.includes(slug.toLowerCase())) {
        // Fetch all categories and find this parent's ID
        const categoriesResponse = await fetch('/api/categories');
        const allCategories: Category[] = await categoriesResponse.json();

        const parentCat = allCategories.find(cat => cat.slug.toLowerCase() === slug.toLowerCase());

        if (parentCat) {
          setParentCategoryId(parentCat.id);
          setCollectionTitle(parentCat.name.toUpperCase());

          // Fetch subcategories
          const subcatsResponse = await fetch(`/api/woocommerce/categories?parent=${parentCat.id}&hide_empty=true`);
          let subcats: Category[] = await subcatsResponse.json();

          // Sort sterrenbeelden in zodiac order
          if (slug.toLowerCase() === 'stenen-per-sterrenbeeld') {
            const zodiacOrder = [
              'ram', 'stier', 'tweelingen', 'kreeft',
              'leeuw', 'maagd', 'weegschaal', 'schorpioen',
              'boogschutter', 'steenbok', 'waterman', 'vissen'
            ];

            subcats = subcats.sort((a, b) => {
              const indexA = zodiacOrder.indexOf(a.slug.toLowerCase());
              const indexB = zodiacOrder.indexOf(b.slug.toLowerCase());

              // If not found in order, put at end
              if (indexA === -1) return 1;
              if (indexB === -1) return -1;

              return indexA - indexB;
            });
          }

          setSubcategories(subcats);
          setShowSubcategories(true);
        }
      } else {
        setShowSubcategories(false);
      }
    } catch (error) {
      console.error('Error checking category:', error);
      setShowSubcategories(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetch category info for proper title
      const categoriesResponse = await fetch('/api/categories');
      const allCategories: Category[] = await categoriesResponse.json();
      const currentCat = allCategories.find(cat => cat.slug.toLowerCase() === slug.toLowerCase());

      if (currentCat) {
        setCollectionTitle(currentCat.name.toUpperCase());
      }

      // Determine the API endpoint based on slug
      let apiUrl = '/api/products?per_page=' + PRODUCTS_PER_PAGE + '&page=' + currentPage;

      if (slug && slug !== 'all') {
        apiUrl += '&category=' + slug;
      }

      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
          // Calculate total pages from response headers or default
          const totalProducts = response.headers.get('X-WP-Total');
          if (totalProducts) {
            setTotalPages(Math.ceil(parseInt(totalProducts) / PRODUCTS_PER_PAGE));
          } else {
            // If no header, estimate based on returned products
            setTotalPages(data.length === PRODUCTS_PER_PAGE ? 3 : 1);
          }
        } else if (data.products) {
          setProducts(data.products);
          setTotalPages(data.totalPages || 1);
        }
      } else {
        console.error('Failed to fetch products');
        // Use fallback products
        setProducts(generateFallbackProducts());
        setTotalPages(3);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Use fallback products
      setProducts(generateFallbackProducts());
      setTotalPages(3);
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackProducts = (): Product[] => {
    // Generate fallback products for demonstration
    const fallbackProducts: Product[] = [];
    const startId = (currentPage - 1) * PRODUCTS_PER_PAGE;

    const productNames = [
      'Amethist Cluster', 'Rozenkwarts Hart', 'Bergkristal Punt', 'Labradoriet Steen',
      'Maansteen Hanger', 'Tijgeroog Bol', 'Lapis Lazuli Raw', 'Seleniet Toren',
      'Obsidiaan Piramide', 'Aventurijn Tumbled', 'Citrien Geode', 'Fluoriet Octaëder'
    ];

    for (let i = 0; i < PRODUCTS_PER_PAGE; i++) {
      const id = startId + i + 1;
      const isOnSale = Math.random() > 0.5;
      const basePrice = Math.floor(Math.random() * 50) + 20;

      fallbackProducts.push({
        id,
        name: productNames[i % productNames.length] + ' - Premium Kwaliteit',
        slug: `product-${id}`,
        permalink: `/product/${id}`,
        price: isOnSale ? (basePrice * 0.7).toFixed(2) : basePrice.toFixed(2),
        regular_price: basePrice.toFixed(2),
        sale_price: isOnSale ? (basePrice * 0.7).toFixed(2) : '',
        on_sale: isOnSale,
        images: [
          {
            id: 1,
            src: '/1.jpeg',
            alt: productNames[i % productNames.length]
          }
        ],
        categories: [],
        tags: [],
        attributes: [],
        variations: [],
        short_description: 'Prachtige natuurlijke edelsteen met krachtige energie.',
        description: 'Deze authentieke edelsteen is zorgvuldig geselecteerd voor zijn unieke eigenschappen.',
        stock_status: 'instock',
        stock_quantity: 10
      } as Product);
    }

    return fallbackProducts;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of product grid
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <CollectionHero
        title={collectionTitle}
        discount="TOT WEL 50% KORTING"
      />

      {/* Trust Badges */}
      <CollectionTrustBadges />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a]"></div>
        </div>
      ) : showSubcategories ? (
        /* Show Subcategories Grid */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-center text-[#2D2D2D] mb-8 font-[family-name:var(--font-eb-garamond)]">
            {slug.toLowerCase() === 'stenen-per-sterrenbeeld' ? 'Selecteer je sterrenbeeld' : 'Kies een categorie'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subcategories.map((subcat) => (
              <Link
                key={subcat.id}
                href={`/collections/${subcat.slug}`}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="aspect-square bg-gradient-to-br from-[#492c4a]/10 to-[#492c4a]/5 flex items-center justify-center p-6">
                  <h3 className="text-xl font-bold text-[#2D2D2D] text-center font-[family-name:var(--font-eb-garamond)] group-hover:text-[#492c4a] transition-colors">
                    {subcat.name}
                  </h3>
                </div>
                <div className="p-4 text-center bg-white">
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    {subcat.count} {subcat.count === 1 ? 'product' : 'producten'}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#492c4a] to-[#6b4069] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        /* Show Products Grid */
        <>
          <CollectionProductGrid
            products={products}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <CollectionPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

    </div>
  );
}