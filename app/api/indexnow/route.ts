import { NextRequest, NextResponse } from 'next/server';
import { getSitemapUrls, submitToIndexNow } from '@/lib/indexnow';

// Meldt URL's bij IndexNow (Bing). Gebruik:
//   POST /api/indexnow?secret=...            body: { "urls": ["https://www.stonesforhealth.nl/..."] }
//   POST /api/indexnow?secret=...&all=1      alle URL's uit de sitemap
// Het geheim is hetzelfde als voor /api/revalidate-blog (BLOG_REVALIDATE_SECRET in Vercel).

export const dynamic = 'force-dynamic';

function isAuthorised(request: NextRequest): boolean {
  const secret = process.env.BLOG_REVALIDATE_SECRET;
  if (!secret) return false;
  const header = request.headers.get('x-revalidate-secret');
  const query = request.nextUrl.searchParams.get('secret');
  return header === secret || query === secret;
}

async function handle(request: NextRequest, bodyUrls: string[]) {
  if (!isAuthorised(request)) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 });
  }

  const all = request.nextUrl.searchParams.get('all') === '1';
  const urls = all ? await getSitemapUrls() : bodyUrls;
  if (urls.length === 0) {
    return NextResponse.json({ error: 'Geen URL\'s opgegeven' }, { status: 400 });
  }

  const result = await submitToIndexNow(urls);
  console.log(`[indexnow] ${result.submitted} URL's aangemeld`, result.batches);
  return NextResponse.json({ ok: true, ...result });
}

export async function POST(request: NextRequest) {
  let urls: string[] = [];
  try {
    const body = await request.json();
    if (Array.isArray(body?.urls)) urls = body.urls.filter((u: unknown) => typeof u === 'string');
  } catch {
    urls = [];
  }
  return handle(request, urls);
}

// Handig om vanuit de browser te testen: /api/indexnow?secret=...&all=1
export async function GET(request: NextRequest) {
  const single = request.nextUrl.searchParams.get('url');
  return handle(request, single ? [single] : []);
}
