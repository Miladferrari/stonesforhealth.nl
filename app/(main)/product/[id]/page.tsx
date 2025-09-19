import { notFound } from 'next/navigation';
import { woocommerce } from '@/lib/woocommerce';
import HikeGemstoneProductPageV2 from './HikeGemstoneProductPageV2';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  try {
    const productId = parseInt(id);

    if (isNaN(productId)) {
      notFound();
    }

    // Fetch single product directly via WooCommerce API
    const product = await woocommerce.getProduct(productId);

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