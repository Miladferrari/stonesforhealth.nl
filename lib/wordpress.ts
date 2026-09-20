// Blogposts uit WordPress.
//
// De webshop is headless, maar WordPress blijft het CMS voor de blog: de klant
// schrijft op admin.stonesforhealth.nl/wp-admin onder "Berichten" en de post
// verschijnt hier zonder dat er een developer aan te pas komt.
//
// De 38 oudere blogs staan nog als eigen map onder app/blog/<slug>. Next.js
// geeft die statische routes voorrang op app/blog/[slug], dus oud en nieuw
// draaien naast elkaar; er hoeft niets gemigreerd te worden.

const FALLBACK_IMAGE = '/images/banner.webp';

// WordPress hangt onder dezelfde host als de WooCommerce-API, alleen op een
// andere namespace: /wp-json/wc/v3 -> /wp-json/wp/v2
function apiBase(): string {
  const wooUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || '';
  const host = wooUrl.replace(/\/wp-json\/wc\/v3\/?$/, '').replace(/\/$/, '');
  return host ? `${host}/wp-json/wp/v2` : '';
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  imageAlt: string;
  category: string;
  date: string;          // voorgevormd, bv. "21 september 2026"
  isoDate: string;       // voor <time> en structured data
  modifiedIso: string;   // voor de sitemap
  readTime: string;
  author: string;
  seoTitle: string;
  seoDescription: string;
}

// Vorm van de WP REST-respons die we gebruiken. Niet uitputtend: alleen de
// velden die hieronder daadwerkelijk uitgelezen worden.
interface WpPost {
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    author?: Array<{ name?: string }>;
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: { sizes?: Record<string, { source_url?: string }> };
    }>;
    'wp:term'?: Array<Array<{ taxonomy?: string; name?: string; slug?: string }>>;
  };
  yoast_head_json?: { title?: string; description?: string };
}

/** Haalt de HTML-entiteiten uit een gerenderde WP-titel. */
function decode(html: string): string {
  return html
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '-')
    .replace(/&mdash;/g, '—')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function stripTags(html: string): string {
  return decode(html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' '));
}

/** Leestijd op basis van 200 woorden per minuut, net als bij de oude posts. */
function readTimeOf(html: string): string {
  const words = stripTags(html).split(' ').filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min leestijd`;
}

function dutchDate(iso: string): string {
  return new Date(iso).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function normalise(post: WpPost): BlogPost {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  // De 'large'-variant scheelt flink in gewicht tegenover het origineel
  const image =
    media?.media_details?.sizes?.large?.source_url ||
    media?.source_url ||
    FALLBACK_IMAGE;

  // De standaardcategorie van WordPress is geen echte rubriek. Filteren op slug
  // en niet op naam, want die naam verschilt per taalinstelling van WordPress.
  const DEFAULT_CATEGORIES = ['uncategorized', 'niet-gecategoriseerd', 'geen-categorie'];
  const terms = post._embedded?.['wp:term']?.flat() ?? [];
  const category = terms.find(
    (t) => t?.taxonomy === 'category' && t.name && !DEFAULT_CATEGORIES.includes(t.slug ?? '')
  );

  const title = decode(post.title.rendered);
  const excerpt = stripTags(post.excerpt.rendered).replace(/\s*\[…\]\s*$/, '…');

  return {
    slug: post.slug,
    title,
    excerpt,
    content: post.content.rendered,
    image,
    imageAlt: decode(media?.alt_text || title),
    category: category?.name ? decode(category.name) : 'Blog',
    date: dutchDate(post.date),
    isoDate: post.date,
    modifiedIso: post.modified || post.date,
    readTime: readTimeOf(post.content.rendered),
    // WordPress schermt /wp/v2/users af voor anonieme requests (voorkomt dat
    // gebruikersnamen uitlekken), dus dit is vrijwel altijd de fallback.
    author: post._embedded?.author?.[0]?.name || 'Stones for Health',
    seoTitle: post.yoast_head_json?.title || `${title} | StonesForHealth`,
    // Zonder samenvatting terugvallen op de eerste zinnen van het artikel;
    // een lege meta-description kost zichtbaarheid in Google.
    seoDescription:
      post.yoast_head_json?.description ||
      excerpt.slice(0, 160) ||
      stripTags(post.content.rendered).slice(0, 160) ||
      `${title} - lees het volledige artikel op StonesForHealth.`,
  };
}

// Een blog die niet laadt mag nooit de hele pagina slopen: bij een storing op
// de WP-kant valt de site terug op de bestaande, hardgecodeerde posts.
async function wpFetch(path: string, revalidate: number): Promise<unknown | null> {
  const base = apiBase();
  if (!base) return null;

  try {
    const response = await fetch(`${base}${path}`, {
      next: { revalidate, tags: ['blog'] },
    });
    if (!response.ok) {
      console.error(`[WordPress] ${path} gaf ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`[WordPress] ${path} mislukt:`, error);
    return null;
  }
}

/** Alle gepubliceerde berichten, nieuwste eerst. */
export async function getPosts(limit = 100): Promise<BlogPost[]> {
  const data = await wpFetch(
    `/posts?per_page=${limit}&status=publish&orderby=date&order=desc&_embed=wp:featuredmedia,wp:term,author`,
    300
  );
  if (!Array.isArray(data)) return [];
  return (data as WpPost[]).map(normalise);
}

/** Eén bericht op slug, of null als het niet bestaat. */
export async function getPost(slug: string): Promise<BlogPost | null> {
  const data = await wpFetch(
    `/posts?slug=${encodeURIComponent(slug)}&status=publish&_embed=wp:featuredmedia,wp:term,author`,
    300
  );
  if (!Array.isArray(data) || data.length === 0) return null;
  return normalise((data as WpPost[])[0]);
}

/** Alleen de slugs — voor de sitemap en generateStaticParams. */
export async function getPostSlugs(): Promise<Array<{ slug: string; modifiedIso: string }>> {
  const data = await wpFetch('/posts?per_page=100&status=publish&_fields=slug,modified', 3600);
  if (!Array.isArray(data)) return [];
  return (data as Array<{ slug: string; modified: string }>)
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug, modifiedIso: p.modified }));
}
