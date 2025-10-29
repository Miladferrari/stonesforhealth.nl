// Server-side configuration for WooCommerce API
// This file ensures environment variables are properly loaded

// Cache the config to avoid repeated logging and env var access
let cachedConfig: { baseUrl: string; consumerKey: string; consumerSecret: string } | null = null;
let hasLoggedConfig = false;

export function getWooCommerceConfig() {
  // Return cached config if available
  if (cachedConfig) {
    return cachedConfig;
  }

  // Use environment variables - REQUIRED for the app to work
  // These must be set in .env.local (see .env.example for template)

  const config = {
    baseUrl: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || '',
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || '',
  };

  // Validate that required environment variables are set
  if (!config.baseUrl || !config.consumerKey || !config.consumerSecret) {
    // Only log this error once
    if (!hasLoggedConfig) {
      console.error('[WooCommerce Config] Missing required environment variables!');
      console.error('Please create a .env.local file based on .env.example and fill in your WooCommerce API credentials.');
      hasLoggedConfig = true;
    }

    // Return empty strings to prevent app from crashing during development
    cachedConfig = {
      baseUrl: config.baseUrl || 'https://your-store.com/wp-json/wc/v3',
      consumerKey: config.consumerKey || 'ck_missing',
      consumerSecret: config.consumerSecret || 'cs_missing',
    };
    return cachedConfig;
  }

  // Log which credentials are being used ONLY ONCE on server startup
  if (typeof window === 'undefined' && !hasLoggedConfig && process.env.NODE_ENV === 'development') {
    console.log('[WooCommerce Config] Initialized:', {
      baseUrl: config.baseUrl,
      consumerKey: config.consumerKey.substring(0, 10) + '...',
    });
    hasLoggedConfig = true;
  }

  // Cache the config
  cachedConfig = config;
  return config;
}