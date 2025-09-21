'use client';

import Link from 'next/link';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import TrustpilotFooterWidget from './TrustpilotFooterWidget';

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: any;
  count: number;
}

const Footer = memo(function Footer() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([
    // Fallback categories
    { id: 1, name: 'Chakra Kristallen', slug: 'chakra', parent: 0, description: '', display: 'default', image: null, count: 24 },
    { id: 2, name: 'Bescherming', slug: 'bescherming', parent: 0, description: '', display: 'default', image: null, count: 18 },
    { id: 3, name: 'Liefde & Relaties', slug: 'liefde', parent: 0, description: '', display: 'default', image: null, count: 21 },
    { id: 4, name: 'Bestsellers', slug: 'bestsellers', parent: 0, description: '', display: 'default', image: null, count: 15 }
  ]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          const topCategories = data
            .filter((cat: Category) => cat.parent === 0 && cat.slug !== 'uncategorized')
            .sort((a: Category, b: Category) => (b.count || 0) - (a.count || 0))
            .slice(0, 4);
          setCategories(topCategories);
        }
      } catch (error) {
        console.error('Failed to fetch categories for footer:', error);
        // Keep fallback categories
      }
    };

    fetchCategories();
  }, []);

  // Don't render footer on checkout pages
  if (pathname?.startsWith('/checkout')) {
    return null;
  }

  return (
    <footer className="bg-[#f7f3ec]">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo and Description */}
          <div className="space-y-8 flex flex-col items-center md:items-start">
            <Link href="/" className="block">
              <div className="relative w-[180px] h-[55px] md:-ml-3">
                <Image
                  src="/logo.png"
                  alt="Stonesforhealth"
                  width={250}
                  height={100}
                  className="absolute top-1/2 left-1/2 md:-left-2 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 w-auto h-[65px] object-contain"
                  style={{ objectPosition: 'center' }}
                  priority
                />
              </div>
            </Link>
            <p className="text-base leading-6 text-gray-800 font-medium max-w-xs text-center md:text-left font-[family-name:var(--font-eb-garamond)]">
              Jouw bron voor authentieke kristallen en edelstenen. Ontdek de natuurlijke kracht en schoonheid.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#492c4a]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-700 font-medium font-[family-name:var(--font-eb-garamond)]">100% Authentiek</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#492c4a]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-700 font-medium font-[family-name:var(--font-eb-garamond)]">Gratis verzending €50+</span>
              </div>
            </div>

            {/* Review Widget */}
            <div className="inline-flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-full px-5 py-3 shadow-sm border border-gray-100 mx-auto md:mx-0">
              {/* Profile avatars */}
              <div className="flex -space-x-3">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="Anna"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="https://i.pravatar.cc/150?img=5"
                  alt="Maria"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="https://i.pravatar.cc/150?img=9"
                  alt="Sophie"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                  +3K
                </div>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

              {/* Stars and text */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3" viewBox="0 0 20 20">
                        {i < 4 ? (
                          <path className="text-[#492c4a] fill-current" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        ) : (
                          <>
                            <path fill="#e0e0e0" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            <defs>
                              <clipPath id={`star-clip-footer-${i}`}>
                                <rect x="0" y="0" width="8" height="20" />
                              </clipPath>
                            </defs>
                            <path fill="#492c4a" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipPath={`url(#star-clip-footer-${i})`} />
                          </>
                        )}
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm bg-[#492c4a]/10 text-[#492c4a] px-1.5 py-0.5 rounded-md font-semibold">4.4/5</span>
                </div>
                <span className="text-sm text-gray-700 font-semibold mt-0.5 font-[family-name:var(--font-eb-garamond)]">
                  Vertrouwd door <span className="font-bold text-[#492c4a]">3000+</span> klanten
                </span>
              </div>
            </div>
            {/* Trustpilot Widget */}
            <div className="mt-8 flex justify-center md:justify-start">
              <TrustpilotFooterWidget />
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 text-center md:text-left">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">Service</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/contact" className="text-base text-gray-800 font-medium hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/volg-je-bestelling" className="text-base text-gray-800 font-medium hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                      Volg je bestelling
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-base font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">Informatie</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/over-ons" className="text-base text-gray-800 font-medium hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                      Over ons
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-base text-gray-800 font-medium hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                      Veelgestelde vragen
                    </Link>
                  </li>
                  <li>
                    <Link href="/verzending" className="text-base text-gray-800 font-medium hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                      Verzending & Retour
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-base text-gray-800 font-medium hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/voorwaarden" className="text-base text-gray-800 font-medium hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]">
                      Algemene Voorwaarden
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">Collecties</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={category.slug === 'bestsellers' ? '/bestsellers' : `/alle-producten?category=${category.slug}`}
                        className="text-base text-gray-800 font-medium hover:text-[#492c4a] transition-colors font-[family-name:var(--font-eb-garamond)]"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-base font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">Winkel informatie</h3>
                <div className="mt-6 space-y-2 text-base text-gray-800 font-medium font-[family-name:var(--font-eb-garamond)]">
                  <p className="font-semibold">Stones for Health</p>
                  <p>Koperhoek 54</p>
                  <p>3162 LA Rhoon</p>
                  <p>Nederland</p>
                  <p className="pt-2">KvK: 95898476</p>
                  <div className="pt-2">
                    <p className="text-sm text-gray-700 font-medium mb-1">E-mail:</p>
                    <a
                      href="mailto:info@stonesforhealth.nl"
                      className="text-[#492c4a] hover:text-[#6b4069] transition-colors"
                    >
                      info@stonesforhealth.nl
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Bar - Compact */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <svg className="w-6 h-6 text-[#492c4a] mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700 font-semibold font-[family-name:var(--font-eb-garamond)]">100% Authentiek</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-6 h-6 text-[#492c4a] mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-sm text-gray-700 font-semibold font-[family-name:var(--font-eb-garamond)]">Gratis verzending €50+</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-6 h-6 text-[#492c4a] mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700 font-semibold font-[family-name:var(--font-eb-garamond)]">30 dagen retour</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-6 h-6 text-[#492c4a] mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm text-gray-700 font-semibold font-[family-name:var(--font-eb-garamond)]">Veilig betalen</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-300 pt-8 md:flex md:items-center md:justify-between">
          {/* Social Links */}
          <div className="flex gap-x-6 md:order-2 justify-center md:justify-start">
            <a href="https://www.facebook.com" className="text-gray-600 hover:text-[#492c4a] transition-colors" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.instagram.com" className="text-gray-600 hover:text-[#492c4a] transition-colors" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          {/* Copyright and Payment Methods */}
          <div className="mt-8 md:order-1 md:mt-0 text-center md:text-left">
            <p className="text-base text-gray-700 font-medium font-[family-name:var(--font-eb-garamond)]">
              © 2025 Stonesforhealth. Alle rechten voorbehouden.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center md:justify-start">
              <span className="text-sm text-gray-600 font-medium font-[family-name:var(--font-eb-garamond)]">Veilig betalen:</span>
              <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                <span className="text-sm text-gray-700 font-semibold font-[family-name:var(--font-eb-garamond)]">iDEAL</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-700 font-semibold font-[family-name:var(--font-eb-garamond)]">Visa</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-700 font-semibold font-[family-name:var(--font-eb-garamond)]">Mastercard</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-700 font-semibold font-[family-name:var(--font-eb-garamond)]">Bancontact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;