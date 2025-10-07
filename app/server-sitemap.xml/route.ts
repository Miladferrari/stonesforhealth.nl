import { getServerSideSitemap } from 'next-sitemap';
import { woocommerce } from '@/lib/woocommerce';

export async function GET(request: Request) {
  try {
    const fields = [];

    // Fetch all products from WooCommerce
    const productsResult = await woocommerce.getProducts({
      per_page: 100,
      status: 'publish'
    });

    // Add product URLs
    for (const product of productsResult.products) {
      if (product.slug) {
        fields.push({
          loc: `https://stonesforhealth.nl/product/${product.slug}`,
          lastmod: product.date_modified || new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.9,
        });
      }
    }

    // Fetch all categories/collections
    const categories = await woocommerce.getCategories();
    for (const category of categories) {
      if (category.slug) {
        fields.push({
          loc: `https://stonesforhealth.nl/collections/${category.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: 0.8,
        });
      }
    }

    return getServerSideSitemap(fields);
  } catch (error) {
    console.error('Error generating server sitemap:', error);
    // Return empty sitemap on error
    return getServerSideSitemap([]);
  }
}
