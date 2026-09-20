// Uploadt afbeeldingen naar de WordPress-mediabibliotheek met een eigen
// bestandsnaam. De WooCommerce-sleutel werkt alleen op /wc/v3, dus hiervoor is
// een WordPress-applicatiewachtwoord nodig:
//
//   WordPress -> Gebruikers -> Profiel -> Toepassingswachtwoorden
//   Zet daarna in .env.local:
//     WP_USER=jouw-wp-gebruikersnaam
//     WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx

// Lui uitlezen: woo.mjs laadt .env.local pas bij het importeren.
const base = () => (process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || '')
  .replace(/\/wp-json\/wc\/v3\/?$/, '').replace(/\/$/, '');
const user = () => process.env.WP_USER || '';
const pass = () => (process.env.WP_APP_PASSWORD || '').replace(/\s+/g, '');

export const hasWpCredentials = () => Boolean(base() && user() && pass());

const auth = () => 'Basic ' + Buffer.from(`${user()}:${pass()}`).toString('base64');

/** Maakt van een productnaam een nette bestandsnaam. */
export function slugify(text, max = 60) {
  return String(text)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')   // accenten eraf
    .replace(/[®™©]/g, '')
    .toLowerCase()
    .replace(/&/g, ' en ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, max)
    .replace(/-+$/, '');
}

/** Controleert of het applicatiewachtwoord werkt. */
export async function checkWpCredentials() {
  const res = await fetch(`${base()}/wp-json/wp/v2/users/me`, { headers: { Authorization: auth() } });
  if (!res.ok) throw new Error(`WordPress-login mislukt (${res.status}). Controleer WP_USER en WP_APP_PASSWORD.`);
  const me = await res.json();
  return me.name || me.slug;
}

/**
 * Haalt een afbeelding op en zet 'm in de mediabibliotheek.
 * @returns {Promise<{id:number, source_url:string}>}
 */
export async function uploadImage(url, { filename, alt = '', title = '' }) {
  const res = await fetch(url, {
    headers: { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36' },
  });
  if (!res.ok) throw new Error(`afbeelding ophalen mislukt (${res.status}) ${url}`);
  const type = res.headers.get('content-type') || 'image/jpeg';
  const bytes = Buffer.from(await res.arrayBuffer());
  if (bytes.length < 1000) throw new Error(`afbeelding te klein (${bytes.length} bytes) ${url}`);

  const up = await fetch(`${base()}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: auth(),
      'Content-Type': type,
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
    body: bytes,
  });
  const text = await up.text();
  if (!up.ok) throw new Error(`upload mislukt (${up.status}): ${text.slice(0, 200)}`);
  const media = JSON.parse(text);

  // Alt-tekst en titel zet WordPress niet uit de upload zelf; dat gaat apart.
  if (alt || title) {
    await fetch(`${base()}/wp-json/wp/v2/media/${media.id}`, {
      method: 'POST',
      headers: { Authorization: auth(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ alt_text: alt, title: title || alt }),
    });
  }
  return { id: media.id, source_url: media.source_url };
}

/** Gooit een bijlage definitief weg. Alleen gebruiken voor eigen uploads. */
export async function deleteMedia(id) {
  const res = await fetch(`${base()}/wp-json/wp/v2/media/${id}?force=true`, {
    method: 'DELETE',
    headers: { Authorization: auth() },
  });
  if (!res.ok) throw new Error(`verwijderen mislukt (${res.status}) media ${id}`);
}
