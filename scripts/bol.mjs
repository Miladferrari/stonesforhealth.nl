// Ophalen van bol.com-pagina's. Bol blokkeert kale requests, dus we sturen
// dezelfde headers mee als een echte Chrome-sessie.

const HEADERS = {
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'accept-language': 'nl-NL,nl;q=0.9,en;q=0.8',
  'sec-ch-ua': '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'none',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
};

export const sleep = ms => new Promise(r => setTimeout(r, ms));

/** Haalt een pagina op, met een paar pogingen bij een tijdelijke fout. */
export async function fetchPage(url, { tries = 3 } = {}) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (res.ok) return await res.text();
      last = new Error(`${res.status} ${url}`);
      // 403/429 = te snel; even wachten helpt meestal.
      await sleep(1500 * (i + 1));
    } catch (e) {
      last = e;
      await sleep(1000 * (i + 1));
    }
  }
  throw last;
}

/** Bestaat deze afbeeldings-URL? Bol geeft per foto maar een paar formaten. */
export async function imageExists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', headers: { 'user-agent': HEADERS['user-agent'] } });
    return res.ok;
  } catch {
    return false;
  }
}

/** De JSON-LD-blokken uit een productpagina. */
export function parseLd(html) {
  const out = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { out.push(JSON.parse(m[1])); } catch { /* bol zet er soms kapotte json in */ }
  }
  return out;
}

/** Decodeert de html-entities die in titels en alt-teksten zitten. */
export function decode(s) {
  if (!s) return '';
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .trim();
}
