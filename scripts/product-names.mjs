import { decode } from './bol.mjs';

// Productnamen zijn platte tekst. Verwerk ook dubbel gecodeerde imports.
export function normalizeProductName(name) {
  let result = name;
  for (let i = 0; i < 5; i++) {
    const next = decode(result);
    if (next === result) break;
    result = next;
  }
  return result;
}

export function productNamePayload(endpoint, body) {
  if (!/^products(?:\/\d+)?$/.test(endpoint) || typeof body?.name !== 'string') return body;
  return { ...body, name: normalizeProductName(body.name) };
}
