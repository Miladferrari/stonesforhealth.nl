import { MetadataRoute } from 'next';
import { woocommerce } from '@/lib/woocommerce';
import { getPostSlugs } from '@/lib/wordpress';

const baseUrl = 'https://www.stonesforhealth.nl';

// Revalidate daily so new products and posts show up without a redeploy
export const revalidate = 86400;

type Entry = MetadataRoute.Sitemap[number];

const staticPages: Array<{ path: string; priority: number; changeFrequency: Entry['changeFrequency'] }> = [
  { path: '', priority: 1.0, changeFrequency: 'daily' },
  { path: '/alle-producten', priority: 0.9, changeFrequency: 'daily' },
  { path: '/bestsellers', priority: 0.9, changeFrequency: 'daily' },
  { path: '/collections', priority: 0.8, changeFrequency: 'daily' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/over-ons', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/verzending', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/voorwaarden', priority: 0.3, changeFrequency: 'yearly' },
];

async function getProductEntries(): Promise<Entry[]> {
  const entries: Entry[] = [];
  const perPage = 100;
  let page = 1;
  let totalPages = 1;

  do {
    const { products, totalPages: pages } = await woocommerce.getProducts({ per_page: perPage, page });
    totalPages = pages || 1;

    for (const product of products) {
      if (!product.slug) continue;
      entries.push({
        url: `${baseUrl}/product/${product.slug}`,
        lastModified: product.date_modified ? new Date(product.date_modified) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
    page++;
  } while (page <= totalPages && page <= 20); // hard stop guards against a runaway loop

  return entries;
}

async function getCollectionEntries(): Promise<Entry[]> {
  const categories = await woocommerce.getCategories({ per_page: 100, hide_empty: true });

  return categories
    .filter((category) => category.slug)
    .map((category) => ({
      url: `${baseUrl}/collections/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: Entry[] = staticPages.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // A failing Woo or WordPress call should not take the whole sitemap down with it
  const [products, collections, wordpressPosts] = await Promise.all([
    getProductEntries().catch(() => []),
    getCollectionEntries().catch(() => []),
    getPostSlugs().catch(() => []),
  ]);

  // Alle blogs komen uit WordPress; er staat niets meer hardgecodeerd
  const blogEntries: Entry[] = wordpressPosts
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.modifiedIso ? new Date(post.modifiedIso) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [...staticEntries, ...blogEntries, ...collections, ...products];
}
