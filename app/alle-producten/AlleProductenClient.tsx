'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CollectionHero from '@/app/components/collection/CollectionHero';
import CollectionTrustBadges from '@/app/components/collection/CollectionTrustBadges';
import CollectionProductGrid from '@/app/components/collection/CollectionProductGrid';
import CollectionPagination from '@/app/components/collection/CollectionPagination';
import { Product } from '@/lib/woocommerce';
import { scrollToTopOfList } from '@/app/lib/scrollToTopOfList';
import { trackViewItemList, toAnalyticsItem } from '@/app/lib/analytics';
import { DISPLAY_NAMES } from '../lib/categoryMenu';

const PRODUCTS_PER_PAGE = 12;

function AlleProductenContent() {
  const searchParams = useSearchParams();
  const category = searchParams?.get('category');
  const search = searchParams?.get('search')?.trim() || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // Marks where the product list starts, so paging scrolls back to it
  const listTopRef = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [collectionTitle, setCollectionTitle] = useState('ALLE PRODUCTEN');
  const [totalResults, setTotalResults] = useState(0);
  const [laadFout, setLaadFout] = useState(false);
  // Alleen het antwoord op het laatste verzoek telt, ook als een ouder later binnenkomt
  const verzoekRef = useRef(0);

  // Nieuwe zoekterm of categorie: terug naar pagina 1. Tijdens het renderen,
  // zodat er niet eerst nog een verzoek voor de oude pagina uitgaat.
  const filterKey = `${category || ''}|${search}`;
  const [paginaFilter, setPaginaFilter] = useState(filterKey);
  if (paginaFilter !== filterKey) {
    setPaginaFilter(filterKey);
    setCurrentPage(1);
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, search, currentPage]);

  // Geen verzonnen producten tonen als de API faalt: die zijn wel in de
  // winkelwagen te leggen, maar bestaan niet.
  const toonLaadFout = () => {
    setProducts([]);
    setTotalPages(1);
    setTotalResults(0);
    setLaadFout(true);
  };

  const fetchProducts = async () => {
    const verzoek = ++verzoekRef.current;
    setLoading(true);
    setLaadFout(false);
    try {
      let apiUrl = '/api/products?per_page=' + PRODUCTS_PER_PAGE + '&page=' + currentPage;

      if (search) {
        apiUrl = `/api/search?q=${encodeURIComponent(search)}&per_page=${PRODUCTS_PER_PAGE}&page=${currentPage}`;
        setCollectionTitle('ZOEKRESULTATEN');
      } else if (category) {
        apiUrl += '&category=' + category;

        // Titel uit de categorieboom, met de slug als terugval.
        setCollectionTitle(
          (DISPLAY_NAMES[category] || category.replace(/-/g, ' ')).toUpperCase()
        );
      } else {
        setCollectionTitle('ALLE PRODUCTEN');
      }

      const response = await fetch(apiUrl);
      if (verzoek !== verzoekRef.current) return;

      if (response.ok) {
        const data = await response.json();
        if (verzoek !== verzoekRef.current) return;

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
          setTotalResults(data.total || 0);
        }
      } else {
        console.error('Failed to fetch products');
        toonLaadFout();
      }
    } catch (error) {
      if (verzoek !== verzoekRef.current) return;
      console.error('Error fetching products:', error);
      toonLaadFout();
    } finally {
      if (verzoek === verzoekRef.current) setLoading(false);
    }
  };

  // view_item_list fires per rendered page of results, so GA4 can attribute
  // which listing a product was discovered in.
  useEffect(() => {
    if (products.length === 0) return;
    trackViewItemList(
      products.map((product) => toAnalyticsItem(product)),
      collectionTitle || 'Alle producten'
    );
  }, [products, collectionTitle]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTopOfList(listTopRef.current);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <CollectionHero
        title={collectionTitle}
        discount={
          search && !loading && !laadFout
            ? `${totalResults} ${totalResults === 1 ? 'product' : 'producten'} voor "${search}"`
            : search ? `Zoeken naar "${search}"` : 'TOT WEL 50% KORTING'
        }
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
      ) : (
        <>
          <CollectionProductGrid
            products={products}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            laadFout={laadFout}
            {...(search && {
              emptyTitle: `Geen producten gevonden voor "${search}"`,
              emptyText: 'Probeer een andere of kortere zoekterm, of bekijk al onze producten.',
            })}
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
