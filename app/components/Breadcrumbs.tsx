'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import JsonLd from './JsonLd';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export default function Breadcrumbs({ customItems }: { customItems?: BreadcrumbItem[] }) {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname if custom items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;
    if (!pathname) return [{ name: 'Home', url: 'https://stonesforhealth.nl' }];

    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ name: 'Home', url: 'https://stonesforhealth.nl' }];

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;

      // Format the name nicely
      let name = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Special cases
      if (path === 'alle-producten') name = 'Alle Producten';
      if (path === 'bestsellers') name = 'Bestsellers';
      if (path === 'blog') name = 'Blog';
      if (path === 'over-ons') name = 'Over Ons';
      if (path === 'contact') name = 'Contact';
      if (path === 'faq') name = 'FAQ';
      if (path === 'collections') name = 'Collecties';

      breadcrumbs.push({
        name,
        url: `https://stonesforhealth.nl${currentPath}`
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Generate BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={item.url} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 text-gray-400 mx-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {isLast ? (
                  <span className="text-gray-600 font-medium">{item.name}</span>
                ) : (
                  <Link
                    href={item.url.replace('https://stonesforhealth.nl', '')}
                    className="text-[#492c4a] hover:text-[#6b4069] hover:underline transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
