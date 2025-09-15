'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, memo, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';

const Header = memo(function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { setIsCartOpen, getTotalItems } = useCart();

  // Timeout refs for dropdown delays
  const shopDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const helpDropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const toggleCart = () => {
    setIsCartOpen(true);
  };

  // Fetch categories for Shop dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          const topCategories = data
            .filter((cat) => cat.parent === 0 && cat.slug !== 'uncategorized')
            .sort((a, b) => (b.count || 0) - (a.count || 0))
            .slice(0, 6); // Show top 6 categories in dropdown
          setCategories(topCategories);
        }
      } catch (error) {
        console.error('Failed to fetch categories for header:', error);
        // Fallback categories
        setCategories([
          { id: 1, name: 'Chakra Kristallen', slug: 'chakra' },
          { id: 2, name: 'Bescherming', slug: 'bescherming' },
          { id: 3, name: 'Liefde & Relaties', slug: 'liefde' },
          { id: 4, name: 'Bestsellers', slug: 'bestsellers' }
        ]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="relative bg-white shadow-sm border-b border-gray-100 z-50 transition-all duration-300 ease-in-out">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center hover:opacity-80 transition-opacity">
                <Image 
                  src="/logo.png" 
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
                onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
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
                Shop
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {shopDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
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
                  <Link
                    href="/alle-producten"
                    className="block px-4 py-2 text-lg text-[#2D2D2D] hover:bg-gray-50 hover:text-[#3b223b] transition-colors font-[family-name:var(--font-eb-garamond)] border-b border-gray-100"
                    onClick={() => setShopDropdownOpen(false)}
                  >
                    Alle Producten
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={category.slug === 'bestsellers' ? '/bestsellers' : `/alle-producten?category=${category.slug}`}
                      className="block px-4 py-2 text-lg text-[#2D2D2D] hover:bg-gray-50 hover:text-[#3b223b] transition-colors font-[family-name:var(--font-eb-garamond)]"
                      onClick={() => setShopDropdownOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/bestsellers" className="text-lg text-[#2D2D2D] hover:text-[#3b223b] font-normal transition-colors font-[family-name:var(--font-eb-garamond)]">
              Bestsellers
            </Link>

            {/* Helpcentrum Dropdown */}
            <div className="relative">
              <button
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
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
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
            <button className="p-2 text-[#2D2D2D] hover:text-[#8B7355] transition-colors hidden lg:block">
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

            {/* Mobile menu button */}
            <button
              type="button"
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/alle-producten"
              className="block px-3 py-2 text-base font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/bestsellers"
              className="block px-3 py-2 text-base font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bestsellers
            </Link>
            {/* Helpcentrum items for mobile */}
            <div className="px-3 py-2">
              <div className="text-base font-medium text-[#2D2D2D] mb-2 font-[family-name:var(--font-eb-garamond)]">
                Helpcentrum
              </div>
              <div className="pl-4 space-y-1">
                <Link
                  href="/contact"
                  className="block px-3 py-1 text-sm font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/volg-je-bestelling"
                  className="block px-3 py-1 text-sm font-light text-[#2D2D2D] hover:text-[#8B7355] transition-colors font-[family-name:var(--font-eb-garamond)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Volg je bestelling
                </Link>
              </div>
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
    </nav>
  );
});

Header.displayName = 'Header';

export default Header;