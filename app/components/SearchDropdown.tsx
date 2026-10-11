'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getProductUrl } from '@/lib/slugify';
import { trackSearch } from '../lib/analytics';

const POPULAIR = ['Amethist', 'Rozenkwarts', 'Bergkristal', 'Chakra'];

const euro = (bedrag: string) => `€${parseFloat(bedrag).toFixed(2).replace('.', ',')}`;

const zoekUrl = (term: string) => `/alle-producten?search=${encodeURIComponent(term.trim())}`;

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDropdown({ isOpen, onClose }: SearchDropdownProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Clear search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setTotal(0);
      setSearched(false);
    }
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Check if click is not on the search button itself
        const searchButton = document.querySelector('[data-search-button]');
        if (!searchButton?.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle search with debouncing
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setTotal(0);
      setSearched(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Een trager antwoord op een oudere zoekterm mag het nieuwe niet overschrijven
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}&per_page=6`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setResults(data.products || []);
        setTotal(data.total || 0);
        setSearched(true);
        // Fires after the debounce, so GA4 records the term the visitor
        // settled on rather than every keystroke
        trackSearch(query.trim());
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error('Search error:', error);
        setResults([]);
        setTotal(0);
        setSearched(true);
      }
      setLoading(false);
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const toonAlleResultaten = () => {
    if (query.trim().length < 2) return;
    router.push(zoekUrl(query));
    onClose();
  };

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={dropdownRef} className="py-4">
          {/* Search Input */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <svg
              className="w-5 h-5 text-gray-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              enterKeyHint="search"
              aria-label="Zoek naar producten"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') toonAlleResultaten();
              }}
              placeholder="Zoek naar producten..."
              className="flex-1 text-lg text-gray-900 outline-none placeholder-gray-400 font-[family-name:var(--font-eb-garamond)]"
            />
            <button
              onClick={onClose}
              aria-label="Zoeken sluiten"
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search Results */}
          <div className="py-2">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#492c4a]"></div>
              </div>
            )}

            {!loading && searched && results.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 font-[family-name:var(--font-eb-garamond)]">
                  Geen producten gevonden voor "{query}"
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {POPULAIR.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 py-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={getProductUrl(product)}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="relative w-12 h-12 flex-shrink-0">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0].src}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                          sizes="48px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate font-[family-name:var(--font-eb-garamond)]">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        {product.on_sale && product.regular_price ? (
                          <>
                            <span className="text-[#492c4a] font-semibold text-sm">{euro(product.price)}</span>
                            <span className="text-gray-400 line-through text-xs">{euro(product.regular_price)}</span>
                          </>
                        ) : (
                          <span className="text-[#492c4a] font-semibold text-sm">{euro(product.price)}</span>
                        )}
                        {product.stock_status !== 'instock' && (
                          <span className="text-xs text-gray-400">Uitverkocht</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}

                {total > results.length && (
                  <div className="col-span-full text-center pt-2">
                    <Link
                      href={zoekUrl(query)}
                      onClick={onClose}
                      className="text-[#492c4a] hover:text-[#3a2339] text-sm font-medium transition-colors font-[family-name:var(--font-eb-garamond)]"
                    >
                      Bekijk alle {total} resultaten →
                    </Link>
                  </div>
                )}
              </div>
            )}

            {!loading && !searched && query.length < 2 && query.length > 0 && (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Type minstens 2 karakters om te zoeken
                </p>
              </div>
            )}

            {!loading && !searched && query.length === 0 && (
              <div className="py-4">
                <p className="text-sm text-gray-500 mb-3 font-[family-name:var(--font-eb-garamond)]">Populaire zoekopdrachten:</p>
                <div className="flex flex-wrap gap-2">
                  {POPULAIR.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}