import { notFound } from 'next/navigation';
import { woocommerce } from '@/lib/woocommerce';
import ProductDetailHormozi from './ProductDetailHormozi';
import GemstoneProductPage from './GemstoneProductPage';
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
    let bestSellingProducts = [];
    try {
      const allBestSellingProducts = await woocommerce.getProducts({
        per_page: 5,
        orderby: 'popularity',
        order: 'desc'
      });
      // Filter out the current product and take only 4
      bestSellingProducts = allBestSellingProducts
        .filter((p: any) => p.id !== product.id)
        .slice(0, 4);
    } catch (error) {
      console.error('Failed to fetch related products:', error);
      // Continue without related products
    }

    // Check if product is a gemstone based on category, tags, or name
    // FOR DEMO: Also check if product name contains "test" or "gemstone" to trigger the new page
    const isGemstone = product.categories?.some((cat: any) =>
      cat.name?.toLowerCase().includes('edelsteen') ||
      cat.name?.toLowerCase().includes('kristal') ||
      cat.name?.toLowerCase().includes('gemstone')
    ) || product.tags?.some((tag: any) =>
      tag.name?.toLowerCase().includes('edelsteen') ||
      tag.name?.toLowerCase().includes('kristal')
    ) || product.name?.toLowerCase().includes('test') || // FOR DEMO: Show gemstone page for test products
        product.name?.toLowerCase().includes('gemstone') ||
        product.name?.toLowerCase().includes('amethist') ||
        product.name?.toLowerCase().includes('kwarts');

    // Use HikeGemstoneProductPageV2 for gemstones, otherwise use regular product page
    if (isGemstone) {
      return <HikeGemstoneProductPageV2 product={product} relatedProducts={bestSellingProducts} />;
    }

    return <ProductDetailHormozi product={product} relatedProducts={bestSellingProducts} />;
  } catch (error) {
    console.error('Product page error:', error);
    notFound();
  }
}