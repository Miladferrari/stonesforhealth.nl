import type { Metadata } from 'next';
import { DISPLAY_NAMES, resolveSlug } from '@/app/lib/categoryMenu';
import { woocommerce } from '@/lib/woocommerce';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

// Turns "edelsteen-armbanden" into "Edelsteen Armbanden" when the slug is not
// in DISPLAY_NAMES, so a new Woo category still gets a readable title.
function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Strip the HTML WooCommerce allows in category descriptions and cap the
// result at the length Google actually renders.
function toDescription(html: string, fallback: string): string {
  const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (!text) return fallback;
  return text.length > 155 ? `${text.slice(0, 152)}...` : text;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveSlug(slug);
  const name = DISPLAY_NAMES[resolved] || titleFromSlug(resolved);

  const fallbackDescription = `Ontdek onze ${name.toLowerCase()} bij Stones for Health. 100% authentieke edelstenen en kristallen, met zorg geselecteerd en snel in huis.`;

  let description = fallbackDescription;
  let image: string | undefined;

  try {
    const categories = await woocommerce.getCategories({ per_page: 100 });
    const category = categories.find((c) => c.slug === resolved || c.slug === slug);
    if (category) {
      description = toDescription(category.description || '', fallbackDescription);
      image = category.image?.src;
    }
  } catch {
    // Woo being unreachable should not block the page from rendering
  }

  const canonical = `/collections/${slug}`;

  return {
    title: `${name} kopen | Stones for Health`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${name} | Stones for Health`,
      description,
      url: canonical,
      type: 'website',
      ...(image ? { images: [{ url: image, alt: name }] } : {}),
    },
  };
}

export default function CollectionSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
