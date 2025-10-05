import { notFound, redirect } from 'next/navigation';
import { woocommerce } from '@/lib/woocommerce';
import HikeGemstoneProductPageV2 from './HikeGemstoneProductPageV2';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    let product;

    // Check if slug is actually a numeric ID (backward compatibility)
    if (!isNaN(parseInt(slug))) {
      const productId = parseInt(slug);
      product = await woocommerce.getProduct(productId);

      if (product && product.slug) {
        // Redirect old ID-based URL to new slug-based URL
        redirect(`/product/${product.slug}`);
      }
    } else {
      // Fetch by slug (new method)
      product = await woocommerce.getProductBySlug(slug);
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

    // Always use the gemstone product page for Stonesforhealth
    return <HikeGemstoneProductPageV2 product={product} relatedProducts={bestSellingProducts} />;
  } catch (error) {
    console.error('Product page error:', error);
    notFound();
  }
}