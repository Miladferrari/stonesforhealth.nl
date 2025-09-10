// Server-side configuration for WooCommerce API
// This file ensures environment variables are properly loaded

export function getWooCommerceConfig() {
  // Use environment variables if available, otherwise use default
  const config = {
    baseUrl: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "http://wordpress.overlevingstotaal.com/wp-json/wc/v3",
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || "ck_67de37be09579abac76682634c5d89c6f822098c",
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || "cs_afc1a164ef96c2aa4e90d175d4d8b3b201b90892",
  };

  // Log which credentials are being used (without showing the full secret)
  if (typeof window === 'undefined') { // Only log on server
    console.log('[WooCommerce Config] Using credentials:', {
      baseUrl: config.baseUrl,
      consumerKey: config.consumerKey.substring(0, 10) + '...',
      fromEnv: !!process.env.WC_CONSUMER_KEY
    });
  }

  return config;
}