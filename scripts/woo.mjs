// Kleine WooCommerce REST-client voor de beheerscripts.
// Leest credentials uit .env.local (zelfde variabelen als de Next.js app).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    const p = path.join(ROOT, file);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      if (!(m[1] in process.env)) process.env[m[1]] = v;
    }
  }
}
loadEnv();

const BASE = (process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || '').replace(/\/$/, '');
const KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
const SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

export function assertCredentials() {
  const missing = [];
  if (!BASE) missing.push('NEXT_PUBLIC_WOOCOMMERCE_URL');
  if (!KEY) missing.push('WOOCOMMERCE_CONSUMER_KEY');
  if (!SECRET) missing.push('WOOCOMMERCE_CONSUMER_SECRET');
  if (missing.length) {
    console.error('\n  Ontbrekende WooCommerce-credentials in .env.local: ' + missing.join(', '));
    console.error('  Haal ze op met:  vercel env pull .env.local\n');
    process.exit(1);
  }
  if (!BASE.startsWith('https://')) {
    console.error('\n  WooCommerce-URL moet https zijn (query-auth werkt niet over http).\n');
    process.exit(1);
  }
}

function buildUrl(endpoint, params = {}) {
  const url = new URL(BASE + '/' + endpoint.replace(/^\//, ''));
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  }
  url.searchParams.set('consumer_key', KEY);
  url.searchParams.set('consumer_secret', SECRET);
  return url.toString();
}

async function request(method, endpoint, { params = {}, body } = {}) {
  const url = buildUrl(endpoint, params);
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const msg = (data && data.message) || text.slice(0, 300);
    const err = new Error(`${method} ${endpoint} -> ${res.status}: ${msg}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return { data, headers: res.headers };
}

export const woo = {
  get: (endpoint, params) => request('GET', endpoint, { params }).then(r => r.data),
  getWithHeaders: (endpoint, params) => request('GET', endpoint, { params }),
  post: (endpoint, body) => request('POST', endpoint, { body }).then(r => r.data),
  put: (endpoint, body) => request('PUT', endpoint, { body }).then(r => r.data),
  del: (endpoint, params) => request('DELETE', endpoint, { params }).then(r => r.data),
};

/** Haalt alle pagina's van een endpoint op. */
export async function getAll(endpoint, params = {}) {
  const out = [];
  let page = 1;
  for (;;) {
    const { data, headers } = await request('GET', endpoint, {
      params: { ...params, per_page: 100, page },
    });
    if (!Array.isArray(data) || data.length === 0) break;
    out.push(...data);
    const totalPages = Number(headers.get('x-wp-totalpages') || '1');
    if (page >= totalPages) break;
    page += 1;
  }
  return out;
}

export const config = { baseUrl: BASE, hasKey: Boolean(KEY && SECRET) };
