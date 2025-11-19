/**
 * Generate a URL-friendly slug from a product name
 * Removes special characters, converts to lowercase, replaces spaces with hyphens
 */
export function generateProductSlug(productName: string): string {
  return productName
    .toLowerCase()
    // Remove special characters but keep letters, numbers, spaces and hyphens
    .replace(/[^\w\s-]/g, '')
    // Replace multiple spaces with single space
    .replace(/\s+/g, ' ')
    // Trim spaces
    .trim()
    // Replace spaces with hyphens
    .replace(/\s/g, '-')
    // Replace multiple hyphens with single hyphen
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Limit length to 100 characters for reasonable URLs
    .substring(0, 100)
    // Remove trailing hyphen if substring cut in middle of word
    .replace(/-+$/g, '');
}

/**
 * Get the SEO-friendly URL for a product
 * Uses the WooCommerce slug directly for reliable routing
 */
export function getProductUrl(product: { id: number; name: string; slug: string }): string {
  // Use the WooCommerce slug directly - it's already URL-safe
  // This is the most reliable approach since WooCommerce manages these slugs
  return `/product/${product.slug}`;
}
