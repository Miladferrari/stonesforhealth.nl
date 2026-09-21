import { notFound, redirect } from 'next/navigation';
import { woocommerce, decodeEntities } from '@/lib/woocommerce';
import HikeGemstoneProductPageV2 from './HikeGemstoneProductPageV2';
import JsonLd from '@/app/components/JsonLd';
import type { Metadata } from 'next';
import { VERZENDKOSTEN } from '@/lib/shippingConfig';

// Use ISR with 60 second revalidation for better performance
export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * De productnamen komen 1:1 van bol en zijn vaak ruim 100 tekens lang. In de
 * <title> past ongeveer 60 tekens voordat Google afkapt, dus daar gebruiken we
 * alleen de kop van de titel. Op de pagina zelf blijft de volledige naam staan.
 */
function shortTitle(name: string, max = 42): string {
  const clean = name.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const head = clean.split(/\s+[–—|]\s+/)[0];
  if (head && head.length <= max) return head;
  const cut = (head || clean).slice(0, max);
  const space = cut.lastIndexOf(' ');
  return (space > 20 ? cut.slice(0, space) : cut).replace(/[\s,;:–-]+$/, '');
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

    // De korte omschrijving is html; voor een meta-description moeten de tags
    // eruit en de entities gedecodeerd, anders staat er "&amp;" in de snippet.
    const plainSummary = decodeEntities((product.short_description || '').replace(/<[^>]*>/g, ' '))
      .replace(/\s+/g, ' ')
      .trim();
    const fallbackDescription = plainSummary.slice(0, 160).trim() || product.name;

    const seoTitle = product.yoast_seo?.title || `${shortTitle(product.name)} | Stones for Health`;
    const seoDescription = product.yoast_seo?.meta_description || fallbackDescription;
    const canonicalUrl = product.yoast_seo?.canonical_url || `https://www.stonesforhealth.nl/product/${product.slug}`;
    const productImage = product.images?.[0]?.src || '/og-image.jpg';

    // Build keywords from Yoast focus keyword + categories
    const categoryKeywords = product.categories?.map(c => c.name).join(', ') || '';
    const keywords = product.yoast_seo?.focus_keyword
      ? `${product.yoast_seo.focus_keyword}, ${product.name}, edelstenen kopen, ${categoryKeywords}`
      : `${product.name}, edelstenen kopen, kristallen, ${categoryKeywords}`;

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: keywords,
      openGraph: {
        // Same title as the <title> tag: when a Yoast title is set it should
        // also be what shows up when the page is shared
        title: seoTitle,
        description: seoDescription,
        url: canonicalUrl,
        siteName: 'Stones for Health',
        locale: 'nl_NL',
        type: 'website',
        images: [
          {
            url: productImage,
            width: 800,
            height: 800,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: seoDescription,
        images: [productImage],
      },
      alternates: {
        canonical: canonicalUrl
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
    const ratingCount = product.rating_count ?? 0;
    const averageRating = parseFloat(product.average_rating ?? '0');

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": decodeEntities((product.short_description || '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim() || product.name,
      "image": product.images?.map(img => img.src) || [],
      // De SKU in WooCommerce is de EAN; Google gebruikt die voor rich results.
      "sku": product.sku || `S4H-${product.id}`,
      ...(/^\d{13}$/.test(product.sku || '') ? { "gtin13": product.sku } : {}),
      "brand": {
        "@type": "Brand",
        "name": "Stones for Health"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://www.stonesforhealth.nl/product/${product.slug}`,
        "priceCurrency": "EUR",
        "price": product.price || product.regular_price,
        "availability": product.stock_status === 'instock'
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        // Google has required both of these for product rich results since 2024
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": String(VERZENDKOSTEN),
            "currency": "EUR"
          },
          "shippingDestination": [
            { "@type": "DefinedRegion", "addressCountry": "NL" },
            { "@type": "DefinedRegion", "addressCountry": "BE" }
          ],
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" },
            "transitTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "DAY" }
          }
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": ["NL", "BE"],
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 30,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/ReturnShippingFees"
        }
      },
      // Only claim a rating when real reviews back it up. Inventing one is
      // spammy structured markup and risks a manual action.
      ...(ratingCount > 0 && averageRating > 0
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              "ratingValue": averageRating.toFixed(1),
              "reviewCount": ratingCount,
              "bestRating": "5",
              "worstRating": "1"
            }
          }
        : {})
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