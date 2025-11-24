'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CollectionHero from '@/app/components/collection/CollectionHero';
import CollectionTrustBadges from '@/app/components/collection/CollectionTrustBadges';
import CollectionProductGrid from '@/app/components/collection/CollectionProductGrid';
import CollectionPagination from '@/app/components/collection/CollectionPagination';
import { Product } from '@/lib/woocommerce';

const PRODUCTS_PER_PAGE = 12;

function AlleProductenContent() {
  const searchParams = useSearchParams();
  const category = searchParams?.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [collectionTitle, setCollectionTitle] = useState('ALLE PRODUCTEN');

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let apiUrl = '/api/products?per_page=' + PRODUCTS_PER_PAGE + '&page=' + currentPage;

      if (category) {
        apiUrl += '&category=' + category;

        // Set collection title based on category
        const titles: { [key: string]: string } = {
          'chakra': 'CHAKRA KRISTALLEN',
          'bescherming': 'BESCHERMING STENEN',
          'liefde': 'LIEFDE & RELATIES',
          'energie': 'ENERGIE KRISTALLEN',
          'meditatie': 'MEDITATIE STENEN',
          'healing': 'HEALING KRISTALLEN'
        };
        setCollectionTitle(titles[category] || category.toUpperCase().replace('-', ' '));
      } else {
        setCollectionTitle('ALLE PRODUCTEN');
      }

      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
          // Get total pages from response headers
          const totalProducts = response.headers.get('X-WP-Total');
          const totalPagesHeader = response.headers.get('X-WP-TotalPages');

          if (totalPagesHeader) {
            // Use the total pages directly from header
            setTotalPages(parseInt(totalPagesHeader));
          } else if (totalProducts) {
            // Calculate from total products
            setTotalPages(Math.ceil(parseInt(totalProducts) / PRODUCTS_PER_PAGE));
          } else {
            // If we got a full page of products, there might be more
            // Otherwise, this is likely the last page
            setTotalPages(data.length === PRODUCTS_PER_PAGE ? currentPage + 1 : currentPage);
          }
        } else if (data.products) {
          setProducts(data.products);
          setTotalPages(data.totalPages || 1);
        }
      } else {
        // API might be unavailable, using fallback products
        console.warn('Products API not available, using fallback products');
        // Use fallback products
        setProducts(generateFallbackProducts());
        setTotalPages(1); // Only show 1 page for fallback
      }
    } catch (error) {
      // Handle error gracefully without alarming console errors
      console.warn('Using fallback products due to API unavailability');
      // Use fallback products
      setProducts(generateFallbackProducts());
      setTotalPages(1); // Only show 1 page for fallback
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
        type: 'simple' as const,
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

      {/* Product Grid with Pagination */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a]"></div>
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

    </div>
  );
}

export default function AlleProductenClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a] mx-auto mb-4"></div>
          <p className="text-gray-900">Producten laden...</p>
        </div>
      </div>
    }>
      <AlleProductenContent />
    </Suspense>
  );
}
