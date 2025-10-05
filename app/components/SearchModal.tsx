'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSearched(false);
    }
  }, [isOpen]);

  // Handle search with debouncing
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (query.trim().length >= 2) {
      setLoading(true);
      searchTimeout.current = setTimeout(async () => {
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          if (response.ok) {
            const data = await response.json();
            setResults(data);
            setSearched(true);
          }
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, 300); // 300ms debounce
    } else {
      setResults([]);
      setSearched(false);
      setLoading(false);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [query]);

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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-start justify-center pt-20 px-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center border-b border-gray-200 p-4">
            <svg
              className="w-6 h-6 text-gray-400 mr-3"
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek naar producten..."
              className="flex-1 text-lg outline-none placeholder-gray-400 font-[family-name:var(--font-eb-garamond)]"
            />
            <button
              onClick={onClose}
              className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
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
          <div className="max-h-96 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#492c4a]"></div>
              </div>
            )}

            {!loading && searched && results.length === 0 && (
              <div className="text-center py-12 px-4">
                <p className="text-gray-500 font-[family-name:var(--font-eb-garamond)]">
                  Geen producten gevonden voor "{query}"
                </p>
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="py-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0].src}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 font-medium truncate font-[family-name:var(--font-eb-garamond)]">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {product.sale_price ? (
                          <>
                            <span className="text-[#492c4a] font-semibold">€{product.sale_price}</span>
                            <span className="text-gray-400 line-through text-sm">€{product.regular_price}</span>
                          </>
                        ) : (
                          <span className="text-[#492c4a] font-semibold">€{product.price}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!loading && !searched && query.length < 2 && query.length > 0 && (
              <div className="text-center py-12 px-4">
                <p className="text-gray-400 text-sm font-[family-name:var(--font-eb-garamond)]">
                  Type minstens 2 karakters om te zoeken
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}