'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, memo, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '../contexts/CartContextStoreAPI';
import SearchDropdown from './SearchDropdown';

// Helper function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  if (typeof window !== 'undefined') {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }
  // Server-side fallback
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

const Header = memo(function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]); // All categories including subcategories
  const [hoveredCategory, setHoveredCategory] = useState<any>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<any>(null);
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<number[]>([]); // Track which mobile categories are expanded
  const { setIsCartOpen, getTotalItems } = useCart();
  const pathname = usePathname();

  // Timeout refs for dropdown delays
  const shopDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const helpDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const productFetchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    setHelpDropdownOpen(false);
    setExpandedMobileCategories([]);
  }, [pathname]);

  const toggleCart = () => {
    setIsCartOpen(true);
  };

  // Fetch categories for Shop dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Add cache-busting parameter to force fresh data
        const response = await fetch('/api/categories?t=' + Date.now(), {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Validate data is an array
          if (!Array.isArray(data)) {
            console.error('[Header] Categories API returned non-array data:', typeof data);
            throw new Error('Invalid categories data format');
          }

          console.log('[Header] Fetched categories:', data.length, 'total');

          // Store all categories (including subcategories)
          setAllCategories(data);

          // Filter main categories only (parent === 0, exclude uncategorized)
          const mainCategories = data
            .filter((cat: any) => cat.parent === 0 && cat.slug !== 'uncategorized')
            .sort((a: any, b: any) => (b.count || 0) - (a.count || 0));

          console.log('[Header] Main categories:', mainCategories.length, mainCategories.map((c: any) => c.name));

          if (mainCategories.length > 0) {
            setCategories(mainCategories);
          } else {
            console.warn('[Header] No main categories found, using fallback');
            throw new Error('No main categories found');
          }
        } else {
          console.error('[Header] Categories API response not OK:', response.status, response.statusText);
          throw new Error('Categories API failed');
        }
      } catch (error) {
        console.error('[Header] Failed to fetch categories, using fallback:', error);
        // Fallback categories - keep these updated with your actual main categories
        setCategories([
          { id: 20, name: 'Bestsellers', slug: 'bestsellers' },
          { id: 595, name: 'Edelstenen en Mineralen', slug: 'edelstenen-mineralen' },
          { id: 596, name: 'Edelsteen Sieraden', slug: 'edelsteen-sieraden' },
          { id: 18, name: 'Chakra en meditatie', slug: 'chakru-edelstenen' }
        ]);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products for a category when hovered
  const fetchCategoryProducts = async (category: any) => {
    if (productFetchTimeout.current) {
      clearTimeout(productFetchTimeout.current);
    }

    // Add small delay to avoid fetching on quick hovers
    productFetchTimeout.current = setTimeout(async () => {
      setLoadingProducts(true);
      try {
        const url = category.slug === 'bestsellers'
          ? `/api/products?per_page=5&category=20`
          : `/api/products?per_page=5&category=${category.slug}`;

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setCategoryProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Failed to fetch products for category:', error);
        setCategoryProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    }, 200);
  };

  // Get subcategories for a parent category
  const getSubcategories = (parentId: number) => {
    return allCategories.filter((cat: any) => cat.parent === parentId);
  };

  const handleCategoryHover = (category: any) => {
    setHoveredCategory(category);
    setHoveredSubcategory(null);
    setCategoryProducts([]);

    // Check if this category has subcategories
    const subcategories = getSubcategories(category.id);

    // If no subcategories, fetch products directly (like before)
    if (subcategories.length === 0) {
      fetchCategoryProducts(category);
    }
  };

  const handleSubcategoryHover = (subcategory: any) => {
    setHoveredSubcategory(subcategory);
    fetchCategoryProducts(subcategory);
  };

  // Toggle mobile category expansion (only one can be open at a time)
  const toggleMobileCategory = (categoryId: number) => {
    setExpandedMobileCategories(prev =>
      prev.includes(categoryId)
        ? [] // Close if clicking on already open category
        : [categoryId] // Open clicked category and close others
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if click is outside mega menu and categorieën button (desktop ONLY)
      const megaMenu = document.querySelector('[data-mega-menu]');
      const shopButton = document.querySelector('[data-shop-button]');
      const isDesktop = window.innerWidth >= 1024; // lg breakpoint in Tailwind

      // Only close desktop mega menu on desktop screens
      if (shopDropdownOpen &&
          isDesktop &&
          megaMenu &&
          shopButton &&
          !megaMenu.contains(target) &&
          !shopButton.contains(target)) {
        setShopDropdownOpen(false);
      }

      // Check if click is outside mobile menu and hamburger button
      const mobileMenu = document.querySelector('[data-mobile-menu]');
      const hamburgerButton = document.querySelector('[data-hamburger-button]');

      // ONLY close if clicking completely outside the mobile menu
      // Don't interfere with links inside the menu - they have their own onClick handlers
      if (mobileMenuOpen &&
          mobileMenu &&
          hamburgerButton &&
          !mobileMenu.contains(target) &&
          !hamburgerButton.contains(target)) {
        setMobileMenuOpen(false);
      }

      // Check if click is outside helpcentrum dropdown (desktop ONLY)
      const helpDropdown = document.querySelector('[data-help-dropdown]');
      const helpButton = document.querySelector('[data-help-button]');

      // Only close desktop help dropdown on desktop screens
      if (helpDropdownOpen &&
          isDesktop &&
          helpDropdown &&
          helpButton &&
          !helpDropdown.contains(target) &&
          !helpButton.contains(target)) {
        setHelpDropdownOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [shopDropdownOpen, mobileMenuOpen, helpDropdownOpen]);

  return (
    <>
      <nav className="relative bg-white shadow-sm border-b border-gray-100 z-40 transition-all duration-300 ease-in-out">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center hover:opacity-80 transition-opacity">
                <Image
                  src="/logo.webp"
                  alt="Stonesforhealth Logo"
                  width={112}
                  height={32}
                  className="h-10 w-auto"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Shop Dropdown */}
            <div className="relative">
              <button
                data-shop-button
                onMouseEnter={() => {
                  if (shopDropdownTimeout.current) {
                    clearTimeout(shopDropdownTimeout.current);
                  }
                  setShopDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  shopDropdownTimeout.current = setTimeout(() => {
                    setShopDropdownOpen(false);
                  }, 300); // 300ms delay before closing
                }}
                className="flex items-center text-lg text-[#2D2D2D] hover:text-[#3b223b] font-normal transition-colors font-[family-name:var(--font-eb-garamond)]"
              >
                Categorieën
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <Link href="/bestsellers" className="text-lg text-[#2D2D2D] hover:text-[#3b223b] font-normal transition-colors font-[family-name:var(--font-eb-garamond)]">
              Bestsellers
            </Link>

            {/* Helpcentrum Dropdown */}
            <div className="relative">
              <button
                data-help-button
                onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
                onMouseEnter={() => {
                  if (helpDropdownTimeout.current) {
                    clearTimeout(helpDropdownTimeout.current);
                  }
                  setHelpDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  helpDropdownTimeout.current = setTimeout(() => {
                    setHelpDropdownOpen(false);
                  }, 300); // 300ms delay before closing
                }}
                className="flex items-center text-lg text-[#2D2D2D] hover:text-[#3b223b] font-normal transition-colors font-[family-name:var(--font-eb-garamond)]"
              >
                Helpcentrum
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {helpDropdownOpen && (
                <div
                  data-help-dropdown
                  className="absolute left-0 w-56 bg-white shadow-xl border border-gray-100 rounded-lg z-50 py-2"
                  style={{ top: 'calc(100% + 32px)' }}
                  onMouseEnter={() => {
                    if (helpDropdownTimeout.current) {
                      clearTimeout(helpDropdownTimeout.current);
                    }
                    setHelpDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    helpDropdownTimeout.current = setTimeout(() => {
                      setHelpDropdownOpen(false);
                    }, 300);
                  }}
                >
                  <Link
                    href="/contact"
                    className="block px-4 py-2 text-lg text-[#2D2D2D] hover:bg-gray-50 hover:text-[#3b223b] transition-colors font-[family-name:var(--font-eb-garamond)]"
                    onClick={() => setHelpDropdownOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/volg-je-bestelling"
                    className="block px-4 py-2 text-lg text-[#2D2D2D] hover:bg-gray-50 hover:text-[#3b223b] transition-colors font-[family-name:var(--font-eb-garamond)]"
                    onClick={() => setHelpDropdownOpen(false)}
                  >
                    Volg je bestelling
                  </Link>
                </div>
              )}
            </div>

            <Link href="/over-ons" className="text-lg text-[#2D2D2D] hover:text-[#3b223b] font-normal transition-colors font-[family-name:var(--font-eb-garamond)]">
              Over ons
            </Link>
          </div>

          {/* Right section - Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button
              onClick={() => setSearchModalOpen(!searchModalOpen)}
              data-search-button
              className="p-2 text-[#2D2D2D] hover:text-[#8B7355] transition-colors hidden lg:block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="flex items-center space-x-2 bg-[#F5F1E8] hover:bg-[#E8DCC6] text-[#2D2D2D] px-4 py-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="font-light font-[family-name:var(--font-eb-garamond)]">Cart ({getTotalItems()})</span>
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchModalOpen(!searchModalOpen)}
              data-search-button
              className="lg:hidden p-2 text-[#2D2D2D] hover:text-[#8B7355] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              data-hamburger-button
              className="lg:hidden rounded-md p-2 text-[#2D2D2D] hover:text-[#8B7355] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Menu</span>
              {!mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mega Menu Dropdown - positioned outside relative container (DESKTOP ONLY) */}
      {shopDropdownOpen && (
        <div
          data-mega-menu
          className="hidden lg:block absolute left-0 right-0 w-full bg-white shadow-2xl border-t border-gray-100"
          style={{ top: '100%', zIndex: 50 }}
          onMouseEnter={() => {
            if (shopDropdownTimeout.current) {
              clearTimeout(shopDropdownTimeout.current);
            }
            setShopDropdownOpen(true);
          }}
          onMouseLeave={() => {
            shopDropdownTimeout.current = setTimeout(() => {
              setShopDropdownOpen(false);
            }, 300);
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className={`grid gap-8 transition-all duration-300 ${
              hoveredCategory && getSubcategories(hoveredCategory.id).length > 0
                ? 'grid-cols-3'
                : 'grid-cols-2'
            }`}>
              {/* Left Column - Main Categories (Fixed Width) */}
              <div className="border-r border-gray-200 pr-8">
                <h3 className="text-sm font-bold text-gray-900 mb-4 pl-2 font-[family-name:var(--font-eb-garamond)]">
                  Categorieën
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/alle-producten"
                      className="block px-4 py-2 text-[#2D2D2D] hover:bg-[#f5f1e8] hover:text-[#3b223b] rounded-md transition-colors font-[family-name:var(--font-eb-garamond)]"
                      onClick={() => setShopDropdownOpen(false)}
                      onMouseEnter={async () => {
                        setHoveredCategory(null);
                        setHoveredSubcategory(null);

                        // Load some general products for "Alle Producten"
                        setLoadingProducts(true);
                        try {
                          const response = await fetch('/api/products?per_page=5');
                          if (response.ok) {
                            const data = await response.json();
                            setCategoryProducts(data.products || data);
                          }
                        } catch (error) {
                          console.error('Failed to fetch products:', error);
                          setCategoryProducts([]);
                        } finally {
                          setLoadingProducts(false);
                        }
                      }}
                    >
                      <div className="font-medium text-base">Alle Producten</div>
                    </Link>
                  </li>
                  {categories.map((category) => {
                    const isActive = hoveredCategory?.id === category.id;
                    return (
                      <li key={category.id}>
                        <Link
                          href={category.slug === 'bestsellers' ? '/bestsellers' : `/alle-producten?category=${category.slug}`}
                          className={`block px-4 py-2 rounded-md transition-all duration-200 font-[family-name:var(--font-eb-garamond)] ${
                            isActive
                              ? 'bg-[#492c4a] text-white shadow-md'
                              : 'text-[#2D2D2D] hover:bg-[#f5f1e8] hover:text-[#3b223b]'
                          }`}
                          onClick={() => setShopDropdownOpen(false)}
                          onMouseEnter={() => handleCategoryHover(category)}
                        >
                          <div className="font-medium text-base">{decodeHtmlEntities(category.name)}</div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Middle Column - Subcategories (Only visible when category has subcategories) */}
              {hoveredCategory && getSubcategories(hoveredCategory.id).length > 0 && (
                <div className="border-r border-gray-200 pr-8 animate-fadeIn">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 pl-2 font-[family-name:var(--font-eb-garamond)]">
                    {decodeHtmlEntities(hoveredCategory.name)}
                  </h3>
                  <ul className="space-y-1">
                    {getSubcategories(hoveredCategory.id).map((subcat) => (
                      <li key={subcat.id}>
                        <Link
                          href={`/alle-producten?category=${subcat.slug}`}
                          className="block px-4 py-2 text-[#2D2D2D] hover:bg-[#f5f1e8] hover:text-[#3b223b] rounded-md transition-colors font-[family-name:var(--font-eb-garamond)]"
                          onClick={() => setShopDropdownOpen(false)}
                          onMouseEnter={() => handleSubcategoryHover(subcat)}
                        >
                          <div className="font-medium text-base">{decodeHtmlEntities(subcat.name)}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Right Column - Featured Products (Always visible, Fixed Width) */}
              <div className="min-h-[300px] transition-opacity duration-300">
                {!hoveredCategory ? (
                  // No category hovered - show welcome message
                  <div className="text-center py-12 text-gray-500">
                    <div className="mb-4">
                      <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)] font-medium">
                      Ontdek onze collectie
                    </p>
                    <p className="text-xs text-gray-400 mt-2 font-[family-name:var(--font-eb-garamond)]">
                      Hover over een categorie voor meer
                    </p>
                  </div>
                ) : loadingProducts ? (
                  // Show loading state
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#492c4a]"></div>
                  </div>
                ) : categoryProducts.length > 0 ? (
                  // Show products
                  <div className="py-6 px-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
                      {hoveredSubcategory ? `Producten in ${decodeHtmlEntities(hoveredSubcategory.name)}` :
                       hoveredCategory ? `Producten in ${decodeHtmlEntities(hoveredCategory.name)}` :
                       'Alle Producten'}
                    </h3>
                    <div className="space-y-2">
                      {categoryProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          className="flex items-center gap-3 p-2 hover:bg-[#f5f1e8] rounded-md transition-colors group"
                          onClick={() => setShopDropdownOpen(false)}
                        >
                          {product.images?.[0]?.src ? (
                            <img
                              src={product.images[0].src}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0"></div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 group-hover:text-[#3b223b] truncate font-[family-name:var(--font-eb-garamond)]">
                              {product.name}
                            </div>
                            <div className="text-xs text-[#492c4a] font-semibold mt-0.5 font-[family-name:var(--font-eb-garamond)]">
                              €{product.price}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={(hoveredSubcategory || hoveredCategory).slug === 'bestsellers' ? '/bestsellers' : `/alle-producten?category=${(hoveredSubcategory || hoveredCategory).slug}`}
                      className="mt-4 block text-center text-sm text-[#492c4a] hover:text-[#3b223b] font-medium font-[family-name:var(--font-eb-garamond)]"
                      onClick={() => setShopDropdownOpen(false)}
                    >
                      Bekijk alle {(hoveredSubcategory || hoveredCategory).count} producten →
                    </Link>
                  </div>
                ) : getSubcategories(hoveredCategory.id).length > 0 ? (
                  // Has subcategories but no subcategory hovered yet
                  <div className="text-center py-12 text-gray-500">
                    <div className="mb-4">
                      <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <p className="text-sm font-[family-name:var(--font-eb-garamond)]">
                      Hover over een subcategorie om producten te zien
                    </p>
                  </div>
                ) : (
                  // No products found
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-sm font-[family-name:var(--font-eb-garamond)]">
                      Geen producten gevonden
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div data-mobile-menu className="lg:hidden bg-white border-t border-gray-100">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {/* Shop with dropdown and accordion */}
            <div>
              <button
                onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
              >
                <span>Categorieën</span>
                <svg
                  className={`w-4 h-4 transition-transform ${shopDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {shopDropdownOpen && (
                <div className="pl-4 space-y-1 mt-1" data-mobile-category-links>
                  {/* Alle Producten Link */}
                  <Link
                    href="/alle-producten"
                    className="block px-3 py-2 text-base font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShopDropdownOpen(false);
                    }}
                  >
                    Alle Producten
                  </Link>

                  {/* Categories with Accordion */}
                  {categories.map((category) => {
                    const subcategories = getSubcategories(category.id);
                    const isExpanded = expandedMobileCategories.includes(category.id);
                    const hasSubcategories = subcategories.length > 0;

                    return (
                      <div key={category.id} className="border-l-2 border-gray-200">
                        {hasSubcategories ? (
                          // Category with subcategories - Accordion
                          <div>
                            <button
                              onClick={() => toggleMobileCategory(category.id)}
                              className="w-full flex items-center justify-between px-3 py-2 text-base font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
                            >
                              <span className="font-medium">{decodeHtmlEntities(category.name)}</span>
                              <svg
                                className={`w-4 h-4 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {/* Subcategories - Show when expanded */}
                            {isExpanded && (
                              <div className="pl-4 space-y-1 bg-gray-50/50 py-1">
                                {subcategories.map((subcat) => (
                                  <Link
                                    key={subcat.id}
                                    href={`/alle-producten?category=${subcat.slug}`}
                                    className="block px-3 py-2 text-sm font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setShopDropdownOpen(false);
                                      setExpandedMobileCategories([]);
                                    }}
                                  >
                                    • {decodeHtmlEntities(subcat.name)}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          // Category without subcategories - Direct link
                          <Link
                            href={category.slug === 'bestsellers' ? '/bestsellers' : `/alle-producten?category=${category.slug}`}
                            className="block px-3 py-2 text-base font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setShopDropdownOpen(false);
                            }}
                          >
                            {decodeHtmlEntities(category.name)}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bestsellers Link */}
            <Link
              href="/bestsellers"
              className="block px-3 py-2 text-base font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bestsellers
            </Link>

            {/* Helpcentrum with dropdown */}
            <div>
              <button
                onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
              >
                <span>Helpcentrum</span>
                <svg
                  className={`w-4 h-4 transition-transform ${helpDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {helpDropdownOpen && (
                <div className="pl-8 space-y-1 mt-1" data-mobile-help-links>
                  <Link
                    href="/contact"
                    className="block px-3 py-2 text-base font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
                    onClick={() => {
                      // Close menu immediately for better UX
                      setMobileMenuOpen(false);
                      setHelpDropdownOpen(false);
                    }}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/volg-je-bestelling"
                    className="block px-3 py-2 text-base font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
                    onClick={() => {
                      // Close menu immediately for better UX
                      setMobileMenuOpen(false);
                      setHelpDropdownOpen(false);
                    }}
                  >
                    Volg je bestelling
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/over-ons"
              className="block px-3 py-2 text-base font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Over ons
            </Link>
          </div>
        </div>
      )}
        {/* Search Dropdown */}
        <SearchDropdown
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        />
      </nav>
    </>
  );
});

Header.displayName = 'Header';

export default Header;