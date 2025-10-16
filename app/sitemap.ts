import { MetadataRoute } from 'next';
import { woocommerce } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://stonesforhealth.nl';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/alle-producten`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bestsellers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/over-ons`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/voorwaarden`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/verzending`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Fetch products from WooCommerce
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const result = await woocommerce.getProducts({
      per_page: 100,
    });

    productRoutes = result.products.map((product: any) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: product.date_modified ? new Date(product.date_modified) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // If there are more than 100 products, fetch remaining pages
    if (result.totalPages > 1) {
      for (let page = 2; page <= result.totalPages; page++) {
        const pageResult = await woocommerce.getProducts({
          per_page: 100,
          page,
        });

        const pageProducts = pageResult.products.map((product: any) => ({
          url: `${baseUrl}/product/${product.slug}`,
          lastModified: product.date_modified ? new Date(product.date_modified) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }));

        productRoutes = [...productRoutes, ...pageProducts];
      }
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  // Fetch categories (collections)
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await woocommerce.getCategories({ per_page: 100 });

    categoryRoutes = categories
      .filter((cat: any) => cat.parent === 0 && cat.slug !== 'uncategorized' && cat.count > 0)
      .map((category: any) => ({
        url: category.slug === 'bestsellers'
          ? `${baseUrl}/bestsellers`
          : `${baseUrl}/alle-producten?category=${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }));
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
  }

  // Fetch blog posts
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    // Read blog posts from file system
    const fs = require('fs');
    const path = require('path');
    const blogDir = path.join(process.cwd(), 'app', 'blog');

    if (fs.existsSync(blogDir)) {
      const blogFolders = fs.readdirSync(blogDir, { withFileTypes: true })
        .filter((dirent: any) => dirent.isDirectory())
        .map((dirent: any) => dirent.name);

      blogRoutes = blogFolders.map((slug: string) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...blogRoutes];
}
