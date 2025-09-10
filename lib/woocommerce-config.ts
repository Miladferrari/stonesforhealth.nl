// Server-side configuration for WooCommerce API
// This file ensures environment variables are properly loaded

export function getWooCommerceConfig() {
  // Use environment variables if available
  // In production (CapRover), use internal service URL
  // In development, use public URL
  const isProduction = process.env.NODE_ENV === 'production';
  const defaultUrl = isProduction 
    ? "http://srv-captain--stonesforhealth-wp/wp-json/wc/v3"
    : "http://wordpress.overlevingstotaal.com/wp-json/wc/v3";
  
  const config = {
    baseUrl: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || defaultUrl,
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || "ck_985cd9ec2ed24cc8ecb5165eacc6c762c8daf32d",
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || "cs_31f5a66230017ac9aa92002d1ca4e61e2224a174",
  };

  // Log which credentials are being used (without showing the full secret)
  if (typeof window === 'undefined') { // Only log on server
    console.log('[WooCommerce Config] Using credentials:', {
      environment: isProduction ? 'production' : 'development',
      baseUrl: config.baseUrl,
      consumerKey: config.consumerKey.substring(0, 10) + '...',
      fromEnv: !!process.env.WOOCOMMERCE_CONSUMER_KEY
    });
  }

  return config;
}