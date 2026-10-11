'use client';

import { useState, useEffect, useRef } from 'react';
import CollectionHero from '@/app/components/collection/CollectionHero';
import CollectionTrustBadges from '@/app/components/collection/CollectionTrustBadges';
import CollectionProductGrid from '@/app/components/collection/CollectionProductGrid';
import CollectionPagination from '@/app/components/collection/CollectionPagination';
import { Product } from '@/lib/woocommerce';
import { scrollToTopOfList } from '@/app/lib/scrollToTopOfList';
import { trackViewItemList, toAnalyticsItem } from '@/app/lib/analytics';

const PRODUCTS_PER_PAGE = 12;

export default function BestsellersClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // Geen verzonnen producten tonen als de API faalt: die zijn wel in de
  // winkelwagen te leggen, maar bestaan niet.
  const [laadFout, setLaadFout] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // Marks where the product list starts, so paging scrolls back to it
  const listTopRef = useRef<HTMLDivElement>(null);

  // view_item_list fires per rendered page of results, so GA4 can attribute
  // which listing a product was discovered in.
  useEffect(() => {
    if (products.length === 0) return;
    trackViewItemList(
      products.map((product) => toAnalyticsItem(product)),
      'Bestsellers'
    );
  }, [products]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBestsellers();
  }, [currentPage]);

  const fetchBestsellers = async () => {
    setLoading(true);
    setLaadFout(false);
    try {
      // Op slug, niet op id: ids worden opnieuw uitgedeeld als de
      // categorieboom wordt herbouwd, slugs blijven hetzelfde.
      const apiUrl = `/api/products?per_page=${PRODUCTS_PER_PAGE}&page=${currentPage}&category=bestsellers`;

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
        setProducts([]);
        setTotalPages(1);
        setLaadFout(true);
      }
    } catch (error) {
      console.error('Error fetching bestsellers:', error);
      setProducts([]);
      setTotalPages(1);
      setLaadFout(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTopOfList(listTopRef.current);
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
      {/* Scroll anchor: stays mounted while loading, so paging can
          always aim at the start of the list */}
      <div ref={listTopRef} aria-hidden="true" />
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492c4a]"></div>
        </div>
      ) : products.length === 0 && !laadFout ? (
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
            laadFout={laadFout}
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
