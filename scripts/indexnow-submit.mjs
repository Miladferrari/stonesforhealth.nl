#!/usr/bin/env node
// Meldt alle URL's uit de live sitemap aan bij IndexNow (Bing).
// Draaien na een deploy:  node scripts/indexnow-submit.mjs
// Werkt zonder geheim: de sleutel wordt gecontroleerd via het .txt-bestand op de site.

const SITE_URL = 'https://www.stonesforhealth.nl';

const keyFile = (await import('node:fs')).readdirSync(new URL('../public', import.meta.url))
  .find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('Geen IndexNow-sleutelbestand gevonden in public/');
const key = keyFile.replace(/\.txt$/, '');

const xml = await (await fetch(`${SITE_URL}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
console.log(`${urlList.length} URL's gevonden in de sitemap`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'www.stonesforhealth.nl', key, keyLocation: `${SITE_URL}/${key}.txt`, urlList }),
});
console.log(`IndexNow antwoord: ${res.status} ${res.statusText}`);
if (!res.ok) console.log(await res.text());
