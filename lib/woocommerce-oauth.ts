import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

/**
 * Creates OAuth 1.0a authentication for WooCommerce REST API
 * Required for HTTP connections (HTTPS can use query parameters)
 */
export function createOAuthHeader(
  url: string, 
  method: string, 
  consumerKey: string, 
  consumerSecret: string
): Record<string, string> {
  // Initialize OAuth
  const oauth = new OAuth({
    consumer: {
      key: consumerKey,
      secret: consumerSecret,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string: string, key: string) {
      return crypto
        .createHmac('sha1', key)
        .update(base_string)
        .digest('base64');
    },
  });

  // Generate OAuth parameters
  const requestData = {
    url: url,
    method: method.toUpperCase(),
  };

  const authData = oauth.authorize(requestData);
  
  // Build OAuth header string
  const oauthParams = Object.keys(authData)
    .sort()
    .map(key => `${key}="${encodeURIComponent(authData[key])}"`)
    .join(', ');

  return {
    'Authorization': `OAuth ${oauthParams}`,
  };
}

/**
 * Checks if URL requires OAuth (HTTP) or can use query params (HTTPS)
 */
export function requiresOAuth(url: string): boolean {
  return url.toLowerCase().startsWith('http://');
}