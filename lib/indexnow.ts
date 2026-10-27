// IndexNow: meldt nieuwe of gewijzigde URL's direct bij Bing (en de andere
// IndexNow-zoekmachines). Yoast op admin.stonesforhealth.nl pingt alleen de
// WordPress-URL's, die op noindex staan; de echte shop draait hier op Vercel,
// dus de melding moet vanaf dit domein komen.
//
// De sleutel is geen geheim: zoekmachines controleren alleen of het bestand
// https://www.stonesforhealth.nl/<sleutel>.txt bestaat (staat in public/).

export const INDEXNOW_KEY = 'b065d97c56c15a38b4cc9a3eaec22a0c';
export const SITE_HOST = 'www.stonesforhealth.nl';
export const SITE_URL = `https://${SITE_HOST}`;

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_PER_REQUEST = 10000;

export interface IndexNowResult {
  submitted: number;
  batches: Array<{ status: number; count: number }>;
}

function isOwnUrl(url: string): boolean {
  try {
    return new URL(url).host === SITE_HOST;
  } catch {
    return false;
  }
}

export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const unique = Array.from(new Set(urls.filter(isOwnUrl)));
  const batches: IndexNowResult['batches'] = [];

  for (let i = 0; i < unique.length; i += MAX_PER_REQUEST) {
    const urlList = unique.slice(i, i + MAX_PER_REQUEST);
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });
    batches.push({ status: response.status, count: urlList.length });
  }

  return { submitted: unique.length, batches };
}

// Alle URL's uit de eigen sitemap, voor een volledige (her)aanmelding
export async function getSitemapUrls(): Promise<string[]> {
  const response = await fetch(`${SITE_URL}/sitemap.xml`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Sitemap gaf ${response.status}`);
  const xml = await response.text();
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1].trim());
}
