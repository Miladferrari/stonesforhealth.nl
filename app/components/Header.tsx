'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext';

// Memoized navigation item component
const NavigationItem = memo(({ item }: { item: any }) => (
  <li className="relative">
    <Link
      href={item.href}
      className="flex items-center gap-1 px-4 py-4 text-steel-gray hover:text-medical-green font-medium transition-colors"
    >
      {item.name}
    </Link>
  </li>
));

NavigationItem.displayName = 'NavigationItem';

const Header = memo(function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();
  const cartItemCount = getTotalItems();
  const [wishlistCount, setWishlistCount] = useState(0);

  // Memoize navigation data
  const navigation = useMemo(() => [
    { 
      name: 'Alle noodpakketten', 
      href: '/noodpakketten'
    },
    { name: 'Over ons', href: '/over-ons' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ], []);

  useEffect(() => {
    setMounted(true);
    // Load wishlist count from localStorage
    const loadWishlistCount = () => {
      try {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          const wishlistItems = JSON.parse(savedWishlist);
          if (Array.isArray(wishlistItems)) {
            setWishlistCount(wishlistItems.length);
          }
        }
      } catch (error) {
        console.error('Error loading wishlist count:', error);
      }
    };
    
    loadWishlistCount();
    
    // Listen for wishlist updates (matching the event name from ProductCard)
    const handleWishlistUpdate = () => loadWishlistCount();
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || searchOpen) {
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Restore scrolling
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [mobileMenuOpen, searchOpen]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  }, [searchQuery, router]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen(true);
  }, [setIsCartOpen]);

  return (
    <>
      <header className="bg-[#f4f4f4] z-40">
        <div className="max-w-7xl mx-auto">
          {/* Main header */}
          <div className="px-4 sm:px-6 lg:px-8 bg-[#f4f4f4]">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Tablet burger button - only on tablet 768px-1024px */}
              <button
                className="hidden md:block lg:hidden p-2 -ml-2"
                onClick={toggleMobileMenu}
                aria-label="Menu openen"
              >
                <svg className="w-6 h-6 text-steel-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center flex-shrink-0">
                <svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0L0 8V20C0 31.05 8.5 41.14 20 44C31.5 41.14 40 31.05 40 20V8L20 0Z" fill="#93c84a"/>
                  <path d="M28 18H22V12H18V18H12V22H18V28H22V22H28V18Z" fill="white"/>
                </svg>
                <span className="ml-3 text-xl lg:text-2xl font-bold text-navy-blue">123noodklaar.nl</span>
              </Link>

              {/* Search bar - Tablet (768px-1024px) */}
              <div className="hidden md:block lg:hidden flex-1 max-w-md mx-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="search"
                    autoComplete="off"
                    name="q"
                    placeholder="Zoeken naar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    maxLength={128}
                    className="w-full rounded-full border-0 h-12 pl-4 pr-12 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-medical-green text-black"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-gray hover:text-medical-green"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>

              {/* Search bar - Desktop (1024px+) */}
              <div className="hidden lg:block flex-1 max-w-2xl mx-8">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="search"
                    placeholder="Zoeken naar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-4 pr-12 rounded-full border border-gray-300 focus:border-medical-green focus:outline-none text-black"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-gray hover:text-medical-green"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>

              {/* Right side icons */}
              <div className="flex items-center gap-2 lg:gap-4">
                {/* Wishlist */}
                <Link
                  href="/favorieten"
                  className="p-2 text-steel-gray hover:text-medical-green transition-colors relative"
                  aria-label="Favorieten"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {mounted && wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <button
                  onClick={toggleCart}
                  className="p-2 text-steel-gray hover:text-medical-green transition-colors relative"
                  aria-label="Winkelwagen"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {mounted && cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Mobile search bar with burger menu - only on mobile < 768px */}
            <div className="md:hidden px-4 pb-3 flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                className="p-2 -ml-2 flex-shrink-0"
                onClick={toggleMobileMenu}
                aria-label="Menu openen"
              >
                <svg className="w-6 h-6 text-steel-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <form onSubmit={handleSearch} className="relative flex-1">
                <input
                  type="search"
                  autoComplete="off"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Zoeken naar..."
                  maxLength={128}
                  className="w-full rounded-full border-0 h-12 pl-4 pr-12 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-medical-green text-black"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-gray hover:text-medical-green"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:block border-t border-gray-200 bg-[#f4f4f4]">
            <ul className="flex items-center px-4 sm:px-6 lg:px-8">
              {navigation.map((item) => (
                <NavigationItem
                  key={item.name}
                  item={item}
                />
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-60' : 'opacity-0'}`} 
          onClick={() => setMobileMenuOpen(false)} 
        />
        <div className={`fixed left-0 top-0 h-full w-80 bg-gradient-to-br from-white via-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Decorative emergency pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-32 h-32 bg-medical-green rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-amber-orange rounded-full blur-3xl" />
          </div>
          
          {/* Header with logo */}
          <div className="relative sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-6 py-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <svg width="32" height="35" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L0 8V20C0 31.05 8.5 41.14 20 44C31.5 41.14 40 31.05 40 20V8L20 0Z" fill="#93c84a"/>
                <path d="M28 18H22V12H18V18H12V22H18V28H22V22H28V18Z" fill="white"/>
              </svg>
              <span className="text-lg font-bold text-navy-blue">Noodmenu</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-steel-gray hover:text-amber-orange hover:bg-amber-orange/10 rounded-full transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Navigation with icons */}
          <nav className="relative px-6 py-8">
            <div className="space-y-2">
              <Link
                href="/noodpakketten"
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-medical-green/10 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-medical-green/20 rounded-lg flex items-center justify-center group-hover:bg-medical-green/30 transition-colors">
                  <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <span className="block font-semibold text-navy-blue group-hover:text-medical-green transition-colors">Alle noodpakketten</span>
                  <span className="text-sm text-steel-gray">Bekijk onze collectie</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 ml-auto group-hover:text-medical-green group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/over-ons"
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-medical-green/10 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-navy-blue/10 rounded-lg flex items-center justify-center group-hover:bg-navy-blue/20 transition-colors">
                  <svg className="w-5 h-5 text-navy-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <span className="block font-semibold text-navy-blue">Over ons</span>
                  <span className="text-sm text-steel-gray">Ons verhaal</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 ml-auto group-hover:text-medical-green group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/faq"
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-medical-green/10 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-amber-orange/20 rounded-lg flex items-center justify-center group-hover:bg-amber-orange/30 transition-colors">
                  <svg className="w-5 h-5 text-amber-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="block font-semibold text-navy-blue">FAQ</span>
                  <span className="text-sm text-steel-gray">Veelgestelde vragen</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 ml-auto group-hover:text-medical-green group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/contact"
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-medical-green/10 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-medical-green/20 rounded-lg flex items-center justify-center group-hover:bg-medical-green/30 transition-colors">
                  <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="block font-semibold text-navy-blue">Contact</span>
                  <span className="text-sm text-steel-gray">Neem contact op</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 ml-auto group-hover:text-medical-green group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Emergency tip */}
            <div className="mt-6 p-4 bg-medical-green/10 rounded-lg border border-medical-green/20">
              <p className="text-xs font-semibold text-medical-green mb-1">💡 Wist je dat?</p>
              <p className="text-xs text-steel-gray">Een goed noodpakket kan het verschil maken in een noodsituatie. Begin vandaag met voorbereiden!</p>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="px-4 py-4 border-b border-gray-200 flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 -ml-2 text-steel-gray"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <form onSubmit={handleSearch} className="flex-1 relative">
              <input
                type="search"
                placeholder="Zoeken naar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-4 pr-10 rounded-full border border-gray-300 focus:border-medical-green focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-medical-green"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
});

Header.displayName = 'Header';

export default Header;