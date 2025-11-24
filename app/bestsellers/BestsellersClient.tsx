'use client';

import { useState, useEffect } from 'react';
import CollectionHero from '@/app/components/collection/CollectionHero';
import CollectionTrustBadges from '@/app/components/collection/CollectionTrustBadges';
import CollectionProductGrid from '@/app/components/collection/CollectionProductGrid';
import CollectionPagination from '@/app/components/collection/CollectionPagination';
import { Product } from '@/lib/woocommerce';

const PRODUCTS_PER_PAGE = 12;

export default function BestsellersClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBestsellers();
  }, [currentPage]);

  const fetchBestsellers = async () => {
    setLoading(true);
    try {
      // Fetch products from the bestsellers category (ID: 20)
      const apiUrl = `/api/products?per_page=${PRODUCTS_PER_PAGE}&page=${currentPage}&category=20`;

      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
          // Get total pages from response headers
          const totalProducts = response.headers.get('X-WP-Total');
          const totalPagesHeader = response.headers.get('X-WP-TotalPages');

          if (totalPagesHeader) {
            setTotalPages(parseInt(totalPagesHeader));
          } else if (totalProducts) {
            setTotalPages(Math.ceil(parseInt(totalProducts) / PRODUCTS_PER_PAGE));
          } else {
            // If no products in category, show just current page
            setTotalPages(data.length > 0 ? 1 : 0);
          }
        } else if (data.products) {
          setProducts(data.products);
          setTotalPages(data.totalPages || 1);
        }
      } else {
        console.error('Failed to fetch bestsellers');
        // Use fallback products
        setProducts(generateFallbackBestsellers());
        setTotalPages(2);
      }
    } catch (error) {
      console.error('Error fetching bestsellers:', error);
      // Use fallback products
      setProducts(generateFallbackBestsellers());
      setTotalPages(2);
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackBestsellers = (): Product[] => {
    // Generate fallback bestseller products
    const fallbackProducts: Product[] = [];
    const startId = (currentPage - 1) * PRODUCTS_PER_PAGE;

    const bestsellers = [
      'Amethist Cluster - Bestseller', 'Rozenkwarts Hart - Top Verkoper',
      'Bergkristal Punt - Populair', 'Labradoriet Steen - Favoriet',
      'Tijgeroog Bol - Bestseller', 'Seleniet Toren - Meest Verkocht',
      'Obsidiaan Piramide - Top Keuze', 'Citrien Geode - Populair',
      'Maansteen Hanger - Bestseller', 'Lapis Lazuli Raw - Favoriet',
      'Aventurijn Tumbled - Top Pick', 'Fluoriet Octaëder - Hot Item'
    ];

    for (let i = 0; i < PRODUCTS_PER_PAGE; i++) {
      const id = startId + i + 1;
      const basePrice = Math.floor(Math.random() * 30) + 35; // Higher base price for bestsellers
      const isOnSale = Math.random() > 0.3; // More likely to be on sale

      fallbackProducts.push({
        id,
        name: bestsellers[i % bestsellers.length],
        slug: `bestseller-${id}`,
        permalink: `/product/${id}`,
        type: 'simple' as const,
        price: isOnSale ? (basePrice * 0.75).toFixed(2) : basePrice.toFixed(2),
        regular_price: basePrice.toFixed(2),
        sale_price: isOnSale ? (basePrice * 0.75).toFixed(2) : '',
        on_sale: isOnSale,
        images: [
          {
            id: 1,
            src: '/1.jpeg',
            alt: bestsellers[i % bestsellers.length]
          }
        ],
        categories: [],
        tags: [],
        attributes: [],
        variations: [],
        short_description: '⭐ Bestseller - Door klanten aanbevolen!',
        description: 'Een van onze meest populaire edelstenen, geliefd om zijn krachtige eigenschappen.',
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
        title="BESTSELLERS"
        discount="MEEST POPULAIRE EDELSTENEN"
      />

      {/* Trust Badges */}
      <CollectionTrustBadges />

      {/* Product Grid with Pagination */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a]"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
            Nog geen bestsellers beschikbaar
          </h2>
          <p className="text-gray-600 text-center max-w-md mb-8 font-[family-name:var(--font-eb-garamond)]">
            We zijn druk bezig met het toevoegen van onze meest populaire producten aan deze categorie.
            Bekijk ondertussen onze andere collecties!
          </p>
          <a href="/alle-producten" className="px-8 py-3 bg-[#492c4a] text-white rounded-lg hover:bg-[#3a2339] transition-colors">
            Bekijk alle producten
          </a>
        </div>
      ) : (
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

      {/* Special Bestsellers Section - Clean & Minimal */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Waarom onze bestsellers?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-[family-name:var(--font-eb-garamond)]">
              Gebaseerd op duizenden klantbeoordelingen en bewezen resultaten
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-semibold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">4.9</div>
              <p className="text-sm text-gray-700 font-medium font-[family-name:var(--font-eb-garamond)]">Gemiddelde beoordeling</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-semibold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">3K+</div>
              <p className="text-sm text-gray-700 font-medium font-[family-name:var(--font-eb-garamond)]">Tevreden klanten</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-semibold text-[#492c4a] mb-2 font-[family-name:var(--font-eb-garamond)]">98%</div>
              <p className="text-sm text-gray-700 font-medium font-[family-name:var(--font-eb-garamond)]">Beveelt aan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
