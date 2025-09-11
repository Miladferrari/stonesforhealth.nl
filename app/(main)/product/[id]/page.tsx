import { notFound } from 'next/navigation';
import ProductDetailHormozi from './ProductDetailHormozi';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Get the base URL for API calls
function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return 'http://localhost:3000';
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  try {
    const baseUrl = getBaseUrl();
    
    // Fetch single product via API route
    const productRes = await fetch(`${baseUrl}/api/woocommerce/products/${id}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!productRes.ok) {
      notFound();
    }
    
    const product = await productRes.json();
    
    if (!product) {
      notFound();
    }

    // Fetch best-selling products for "Vaak samen gekocht" section via API route
    const bestSellingRes = await fetch(`${baseUrl}/api/woocommerce/products?per_page=5&orderby=popularity&order=desc`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    let bestSellingProducts = [];
    if (bestSellingRes.ok) {
      const allBestSellingProducts = await bestSellingRes.json();
      // Filter out the current product and take only 4
      bestSellingProducts = allBestSellingProducts
        .filter((p: any) => p.id !== product.id)
        .slice(0, 4);
    }

    return <ProductDetailHormozi product={product} relatedProducts={bestSellingProducts} />;
  } catch (error) {
    notFound();
  }
}