// Server-side configuration for WooCommerce API
// This file ensures environment variables are properly loaded

export function getWooCommerceConfig() {
  // Use environment variables - REQUIRED for the app to work
  // These must be set in .env.local (see .env.example for template)
  
  const config = {
    baseUrl: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || '',
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || '',
  };

  // Validate that required environment variables are set
  if (!config.baseUrl || !config.consumerKey || !config.consumerSecret) {
    console.error('[WooCommerce Config] Missing required environment variables!');
    console.error('Please create a .env.local file based on .env.example and fill in your WooCommerce API credentials.');
    
    // Return empty strings to prevent app from crashing during development
    return {
      baseUrl: config.baseUrl || 'https://your-store.com/wp-json/wc/v3',
      consumerKey: config.consumerKey || 'ck_missing',
      consumerSecret: config.consumerSecret || 'cs_missing',
    };
  }

  // Log which credentials are being used (without showing the full secret)
  if (typeof window === 'undefined') { // Only log on server
    console.log('[WooCommerce Config] Using credentials:', {
      environment: process.env.NODE_ENV || 'development',
      baseUrl: config.baseUrl,
      consumerKey: config.consumerKey.substring(0, 10) + '...',
      fromEnv: true
    });
  }

  return config;
}