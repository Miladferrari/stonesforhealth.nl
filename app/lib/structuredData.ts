import { Product } from '@/lib/woocommerce';

/**
 * Generate structured data for the organization (use on homepage)
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stonesforhealth',
    url: 'https://stonesforhealth.nl',
    logo: 'https://stonesforhealth.nl/logo.png',
    description: 'Ontdek de helende kracht van natuurlijke kristallen en edelstenen. 100% authentiek, ethisch gewonnen, met liefde geselecteerd.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+31-6-12345678',
      contactType: 'Customer Service',
      areaServed: 'NL',
      availableLanguage: ['Dutch', 'English'],
    },
    sameAs: [
      'https://www.facebook.com/stonesforhealth',
      'https://www.instagram.com/stonesforhealth',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NL',
    },
  };
}

/**
 * Generate structured data for a product page
 */
export function generateProductSchema(product: Product) {
  const price = parseFloat(product.price);
  const regularPrice = parseFloat(product.regular_price || product.price);

  // Calculate average rating (you can get this from your review system)
  const rating = 4.8; // Default, should come from your review data
  const reviewCount = 127; // Default, should come from your review data

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.[0]?.src || '',
    description: product.short_description?.replace(/<[^>]*>/g, '') || product.name,
    sku: product.id.toString(),
    brand: {
      '@type': 'Brand',
      name: 'Stonesforhealth',
    },
    offers: {
      '@type': 'Offer',
      url: `https://stonesforhealth.nl/product/${product.slug}`,
      priceCurrency: 'EUR',
      price: price.toFixed(2),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stock_status === 'instock'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Stonesforhealth',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    category: product.categories?.[0]?.name || 'Edelstenen',
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ structured data (use on product pages or FAQ pages)
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate website search box structured data
 */
export function generateWebsiteSearchSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://stonesforhealth.nl',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://stonesforhealth.nl/zoeken?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate collection/category page structured data
 */
export function generateCollectionSchema(
  name: string,
  description: string,
  products: Product[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: name,
    description: description,
    url: `https://stonesforhealth.nl/collections/${name.toLowerCase()}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.slice(0, 10).map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://stonesforhealth.nl/product/${product.slug}`,
        name: product.name,
      })),
    },
  };
}

/**
 * Generate local business structured data
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Stonesforhealth',
    image: 'https://stonesforhealth.nl/logo.png',
    '@id': 'https://stonesforhealth.nl',
    url: 'https://stonesforhealth.nl',
    telephone: '+31-6-12345678',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street',
      addressLocality: 'Your City',
      postalCode: '1234 AB',
      addressCountry: 'NL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.3676,
      longitude: 4.9041,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    sameAs: [
      'https://www.facebook.com/stonesforhealth',
      'https://www.instagram.com/stonesforhealth',
    ],
  };
}

/**
 * Generate article/blog post structured data
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author || 'Stonesforhealth Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stonesforhealth',
      logo: {
        '@type': 'ImageObject',
        url: 'https://stonesforhealth.nl/logo.png',
      },
    },
  };
}

/**
 * Generate review structured data
 */
export function generateReviewSchema(review: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  productName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: review.productName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
  };
}
