import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// Webhook die WordPress aanroept zodra de klant een bericht publiceert of
// bijwerkt. Zonder dit verschijnt een nieuwe blog pas na de ISR-termijn van
// 5 minuten; hiermee staat hij er binnen enkele seconden op.
//
// Instellen in WordPress -> Instellingen -> Webhooks, of via de snippet in
// BLOG_HANDLEIDING.md. Het geheim moet als BLOG_REVALIDATE_SECRET in Vercel staan.

export const dynamic = 'force-dynamic';

function isAuthorised(request: NextRequest): boolean {
  const secret = process.env.BLOG_REVALIDATE_SECRET;

  // Zonder ingesteld geheim zou iedereen de cache kunnen legen
  if (!secret) return false;

  const header = request.headers.get('x-revalidate-secret');
  const query = request.nextUrl.searchParams.get('secret');
  return header === secret || query === secret;
}

function refresh(slug: string | null) {
  // De tag dekt alle WP-fetches; de paden dekken de gerenderde pagina's
  revalidateTag('blog');
  revalidatePath('/blog');
  revalidatePath('/sitemap.xml');
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function POST(request: NextRequest) {
  if (!isAuthorised(request)) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 });
  }

  // WordPress stuurt het bericht mee als JSON, maar een kale ping mag ook
  let slug: string | null = request.nextUrl.searchParams.get('slug');
  if (!slug) {
    try {
      const body = await request.json();
      slug = body?.slug ?? body?.post?.post_name ?? null;
    } catch {
      slug = null;
    }
  }

  refresh(slug);
  console.log(`[revalidate-blog] ververst${slug ? `: ${slug}` : ' (hele blog)'}`);

  return NextResponse.json({ revalidated: true, slug, at: Date.now() });
}

// Handig om de webhook vanuit de browser te testen
export async function GET(request: NextRequest) {
  if (!isAuthorised(request)) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get('slug');
  refresh(slug);

  return NextResponse.json({ revalidated: true, slug, at: Date.now() });
}
