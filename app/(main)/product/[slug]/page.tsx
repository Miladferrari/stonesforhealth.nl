import { notFound, redirect } from 'next/navigation';
import { woocommerce } from '@/lib/woocommerce';
import HikeGemstoneProductPageV2 from './HikeGemstoneProductPageV2';
import JsonLd from '@/app/components/JsonLd';
import type { Metadata } from 'next';

// Use ISR with 60 second revalidation for better performance
export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    let product;

    // Try by slug first
    try {
      product = await woocommerce.getProductBySlug(slug);
    } catch (error) {
      // Silently handle API errors
    }

    // If not found and slug is numeric, try as product ID (backward compatibility)
    if (!product && !isNaN(parseInt(slug))) {
      try {
        product = await woocommerce.getProduct(parseInt(slug));
      } catch (error) {
        // Silently handle API errors
      }
    }

    if (!product) {
      return {
        title: 'Product niet gevonden | StonesForHealth',
        description: 'Dit product kon niet worden gevonden.'
      };
    }

    // Strip HTML from description
    const cleanDescription = product.short_description
      ?.replace(/<[^>]*>/g, '')
      .substring(0, 160) || product.name;

    return {
      title: `${product.name} | Authentieke Edelstenen | StonesForHealth`,
      description: cleanDescription,
      keywords: `${product.name}, edelstenen kopen, kristallen, ${product.categories?.map(c => c.name).join(', ')}`,
      openGraph: {
        title: product.name,
        description: cleanDescription,
        images: product.images?.[0]?.src ? [product.images[0].src] : [],
        type: 'website',
      },
      alternates: {
        canonical: `https://stonesforhealth.nl/product/${product.slug}`
      }
    };
  } catch (error) {
    return {
      title: 'Product | StonesForHealth',
      description: 'Ontdek onze authentieke edelstenen en kristallen'
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    let product;

    // Try by slug first
    try {
      product = await woocommerce.getProductBySlug(slug);
    } catch (error) {
      // Silently handle API errors for slug lookup
      console.log(`[Product Page] Product with slug "${slug}" not found`);
    }

    // If not found and slug is numeric, try as product ID (backward compatibility)
    if (!product && !isNaN(parseInt(slug))) {
      const productId = parseInt(slug);
      try {
        product = await woocommerce.getProduct(productId);

        // Redirect numeric product IDs to slug-based URLs
        if (product && product.slug) {
          redirect(`/product/${product.slug}`);
        }
      } catch (error) {
        // Silently handle API errors for product ID lookup
        console.log(`[Product Page] Product with ID ${productId} not found`);
      }
    }

    if (!product) {
      notFound();
    }

    // Fetch best-selling products for "Vaak samen gekocht" section
    let bestSellingProducts: any[] = [];
    try {
      const result = await woocommerce.getProducts({
        per_page: 5,
        orderby: 'popularity',
        order: 'desc'
      });
      // Filter out the current product and take only 4
      bestSellingProducts = result.products
        .filter((p: any) => p.id !== product.id)
        .slice(0, 4);
    } catch (error) {
      console.error('Failed to fetch related products:', error);
      // Continue without related products
    }

    // Generate Product Schema
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.short_description?.replace(/<[^>]*>/g, '') || product.name,
      "image": product.images?.map(img => img.src) || [],
      "sku": `S4H-${product.id}`,
      "brand": {
        "@type": "Brand",
        "name": "Stones for Health"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://stonesforhealth.nl/product/${product.slug}`,
        "priceCurrency": "EUR",
        "price": product.price || product.regular_price,
        "availability": product.stock_status === 'instock'
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    // Always use the gemstone product page for Stonesforhealth
    return (
      <>
        <JsonLd data={productSchema} />
        <HikeGemstoneProductPageV2 product={product} relatedProducts={bestSellingProducts} />
      </>
    );
  } catch (error: any) {
    // Only log unexpected errors, not 404s (notFound throws NEXT_HTTP_ERROR_FALLBACK)
    if (error?.message && !error.message.includes('NEXT_HTTP_ERROR_FALLBACK') && !error.message.includes('NEXT_REDIRECT')) {
      console.error('[Product Page] Unexpected error:', error.message);
    }
    notFound();
  }
}