import { getWooCommerceConfig } from './woocommerce-config';
import { createOAuthHeader, requiresOAuth } from './woocommerce-oauth';

interface WooCommerceConfig {
  baseUrl: string;
  consumerKey: string;
  consumerSecret: string;
}

// Get config dynamically to ensure environment variables are loaded
const getConfig = (): WooCommerceConfig => {
  return getWooCommerceConfig();
};

export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  description: string;
  short_description: string;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  stock_status: string;
  stock_quantity: number | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: {
    id: number;
    src: string;
    alt: string;
  } | null;
  count: number;
}

export interface Coupon {
  id: number;
  code: string;
  amount: string;
  discount_type: "percent" | "fixed_cart" | "fixed_product";
  description: string;
  date_expires: string | null;
  usage_count: number;
  usage_limit: number | null;
  usage_limit_per_user: number | null;
  individual_use: boolean;
  product_ids: number[];
  excluded_product_ids: number[];
  minimum_amount: string;
  maximum_amount: string;
  email_restrictions: string[];
  used_by: string[];
  free_shipping?: boolean;
}

export interface ShippingZone {
  id: number;
  name: string;
  order: number;
}

export interface ShippingZoneLocation {
  code: string;
  type: "postcode" | "state" | "country" | "continent";
}

export interface ShippingMethod {
  id: number;
  instance_id: number;
  title: string;
  order: number;
  enabled: boolean;
  method_id: string;
  method_title: string;
  method_description: string;
  settings: {
    title?: { value: string };
    cost?: { value: string };
    min_amount?: { value: string };
    requires?: { value: string };
    ignore_discounts?: { value: string };
  };
}

export interface ShippingRate {
  method_id: string;
  method_title: string;
  cost: number;
  free: boolean;
  free_shipping_eligible?: boolean;
  free_shipping_remaining?: number;
  free_shipping_requires?: string;
  free_shipping_min_amount?: number;
}

// Cache implementation - 60 second cache for better performance
class CacheManager {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly TTL = 60000; // 60 seconds cache

  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const age = Date.now() - cached.timestamp;
    if (age > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }
}

class WooCommerceAPI {
  private cache = new CacheManager();

  // Get config dynamically for each request
  private get config(): WooCommerceConfig {
    return getConfig();
  }

  private async fetchAPI<T>(
    endpoint: string,
    options?: RequestInit & { useCache?: boolean; retries?: number }
  ): Promise<T> {
    const maxRetries = options?.retries ?? 2;
    let lastError: any;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await this.fetchAPIInternal<T>(endpoint, options);
      } catch (error: any) {
        lastError = error;
        
        // Don't retry on certain errors
        if (error.message?.includes('authentication failed') ||
            error.message?.includes('access denied') ||
            error.message?.includes('Cannot view this resource')) {
          throw error;
        }
        
        // Only retry on network/server errors
        if (attempt < maxRetries && 
            (error.message?.includes('HTML page instead of JSON') ||
             error.message?.includes('fetch failed') ||
             error.message?.includes('ETIMEDOUT') ||
             error.message?.includes('ECONNREFUSED'))) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[WooCommerce API] Attempt ${attempt + 1} failed, retrying...`);
          }
          // Wait a bit before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        } else {
          throw error;
        }
      }
    }
    
    throw lastError;
  }

  private async fetchAPIWithHeaders<T>(
    endpoint: string,
    options?: RequestInit & { useCache?: boolean }
  ): Promise<{ products: T; total: number; totalPages: number }> {
    // Check cache first (unless explicitly disabled)
    const shouldUseCache = options?.useCache !== false;
    if (shouldUseCache) {
      const cached = this.cache.get(endpoint);
      if (cached) {
        console.log(`[WooCommerce API] Cache hit for: ${endpoint}`);
        return cached;
      }
    }

    const timestamp = new Date().toISOString();
    console.log(
      `[WooCommerce API] ${timestamp} - Fetching fresh data with headers for: ${endpoint}`
    );

    // Build base URL
    const baseUrl = `${this.config.baseUrl}/${endpoint}`;
    let fullUrl: string;
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    };

    // Check if we need OAuth (HTTP) or can use query params (HTTPS)
    if (requiresOAuth(this.config.baseUrl)) {
      console.log(`[WooCommerce API] Using OAuth 1.0a for HTTP connection`);
      fullUrl = baseUrl;

      // Add OAuth headers
      const oauthHeaders = createOAuthHeader(
        fullUrl,
        options?.method || 'GET',
        this.config.consumerKey,
        this.config.consumerSecret
      );

      headers = { ...headers, ...oauthHeaders };
    } else {
      console.log(`[WooCommerce API] Using query parameters for HTTPS connection`);
      // Add consumer key and secret as query parameters for HTTPS
      const separator = endpoint.includes("?") ? "&" : "?";
      const authParams = `${separator}consumer_key=${this.config.consumerKey}&consumer_secret=${this.config.consumerSecret}`;
      fullUrl = `${baseUrl}${authParams}`;
    }

    console.log(`[WooCommerce API] Fetching with headers: ${endpoint}`);
    console.log(
      `[WooCommerce API] Full URL: ${fullUrl.replace(
        this.config.consumerSecret,
        "HIDDEN"
      )}`
    );

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers,
        mode: "cors",
        credentials: "omit",
        next: {
          revalidate: 60, // Revalidate every 60 seconds
        },
      });

      console.log(`[WooCommerce API] Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 404) {
          console.debug(`[WooCommerce API] Resource not found: ${endpoint}`);
        } else {
          console.error(`[WooCommerce API] Error: ${response.status} ${response.statusText}`, errorText);
        }

        // Return empty result with pagination
        return { products: [] as T, total: 0, totalPages: 0 };
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.warn('[WooCommerce API] Returning empty data due to non-JSON response');
        return { products: [] as T, total: 0, totalPages: 0 };
      }

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.warn('[WooCommerce API] Failed to parse JSON response, returning empty data');
        return { products: [] as T, total: 0, totalPages: 0 };
      }

      // Get pagination headers
      const total = parseInt(response.headers.get('X-WP-Total') || '0');
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');

      console.log(
        `[WooCommerce API] Success: Found ${Array.isArray(data) ? data.length : 1} items, Total: ${total}, Pages: ${totalPages}`
      );

      const result = {
        products: data,
        total: total,
        totalPages: totalPages
      };

      // Store in cache if caching is enabled
      if (shouldUseCache) {
        this.cache.set(endpoint, result);
      }

      return result;
    } catch (error: any) {
      console.error(`[WooCommerce API] Fetch error:`, error);
      return { products: [] as T, total: 0, totalPages: 0 };
    }
  }

  private async fetchAPIInternal<T>(
    endpoint: string,
    options?: RequestInit & { useCache?: boolean }
  ): Promise<T> {
    // Check cache first (unless explicitly disabled)
    const shouldUseCache = options?.useCache !== false;
    if (shouldUseCache) {
      const cached = this.cache.get(endpoint);
      if (cached) {
        console.log(`[WooCommerce API] Cache hit for: ${endpoint}`);
        return cached;
      }
    }

    const timestamp = new Date().toISOString();
    console.log(
      `[WooCommerce API] ${timestamp} - Fetching fresh data for: ${endpoint}`
    );

    // Build base URL
    const baseUrl = `${this.config.baseUrl}/${endpoint}`;
    let fullUrl: string;
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    };

    // Check if we need OAuth (HTTP) or can use query params (HTTPS)
    if (requiresOAuth(this.config.baseUrl)) {
      console.log(`[WooCommerce API] Using OAuth 1.0a for HTTP connection`);
      fullUrl = baseUrl;
      
      // Add OAuth headers
      const oauthHeaders = createOAuthHeader(
        fullUrl,
        options?.method || 'GET',
        this.config.consumerKey,
        this.config.consumerSecret
      );
      
      headers = { ...headers, ...oauthHeaders };
    } else {
      console.log(`[WooCommerce API] Using query parameters for HTTPS connection`);
      // Add consumer key and secret as query parameters for HTTPS
      const separator = endpoint.includes("?") ? "&" : "?";
      const authParams = `${separator}consumer_key=${this.config.consumerKey}&consumer_secret=${this.config.consumerSecret}`;
      fullUrl = `${baseUrl}${authParams}`;
    }

    console.log(`[WooCommerce API] Fetching: ${endpoint}`);
    console.log(
      `[WooCommerce API] Full URL: ${fullUrl.replace(
        this.config.consumerSecret,
        "HIDDEN"
      )}`
    );

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers,
        mode: "cors",
        credentials: "omit", // Don't send cookies with API requests
        // Next.js specific caching - 60 second revalidation
        next: {
          revalidate: 60, // Revalidate every 60 seconds
        },
      });

      console.log(`[WooCommerce API] Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        // Only log non-404 errors as errors, 404s are expected sometimes
        if (response.status === 404) {
          console.debug(
            `[WooCommerce API] Resource not found: ${endpoint}`
          );
        } else {
          console.error(
            `[WooCommerce API] Error: ${response.status} ${response.statusText}`,
            errorText
          );
        }

        // Try to parse error details
        let errorDetails = "";
        let errorCode = "";
        try {
          const errorJson = JSON.parse(errorText);
          errorDetails = errorJson.message || errorJson.error || errorText;
          errorCode = errorJson.code || "";
        } catch {
          errorDetails = errorText;
        }

        // Provide user-friendly error messages
        if (response.status === 401) {
          throw new Error(
            "WooCommerce API authentication failed. Please check your consumer key and secret."
          );
        } else if (response.status === 403) {
          throw new Error(
            "WooCommerce API access denied. Please ensure the API keys have the correct permissions."
          );
        } else if (response.status === 404) {
          throw new Error(
            `WooCommerce API endpoint not found: ${endpoint}. Please check the API URL.`
          );
        } else if (response.status === 500 || response.status === 502 || response.status === 503) {
          throw new Error(
            "WooCommerce server error. Please try again later or contact support."
          );
        } else if (errorCode === "woocommerce_rest_cannot_view") {
          throw new Error(
            "WooCommerce API: Cannot view this resource. Please check API permissions."
          );
        } else {
          throw new Error(
            `WooCommerce API error: ${response.status} ${response.statusText} - ${errorDetails}`
          );
        }
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // Log to console only in development for debugging
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[WooCommerce API] Non-JSON response received. Content-Type: ${contentType}`);
        }
        
        // Try to get the text content for debugging
        const textContent = await response.text();
        
        // Check if it's HTML (common error page)
        if (textContent.includes("<!DOCTYPE") || textContent.includes("<html")) {
          // Only log HTML preview in development
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[WooCommerce API] Received HTML instead of JSON. WordPress may not be installed or API endpoint is incorrect.`);
          }
          // Return empty array as fallback for any HTML response
          // This prevents the app from crashing when WordPress is not installed
          console.warn('[WooCommerce API] Returning empty data due to HTML response');
          return [] as T;
        }
        
        // For other non-JSON responses, also return empty data
        console.warn('[WooCommerce API] Returning empty data due to non-JSON response');
        return [] as T;
      }

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[WooCommerce API] Failed to parse JSON:`, jsonError);
        }
        console.warn('[WooCommerce API] Failed to parse JSON response, returning empty data');
        return [] as T;
      }

      console.log(
        `[WooCommerce API] Success: Found ${
          Array.isArray(data) ? data.length : 1
        } items`
      );

      // Store in cache if caching is enabled
      if (shouldUseCache) {
        this.cache.set(endpoint, data);
      }

      return data;
    } catch (error: any) {
      // Only log errors in development
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[WooCommerce API] Fetch error:`, error.message);
      }
      
      // Handle connection errors gracefully - return empty data instead of throwing
      if (error.code === 'ENOTFOUND' || error.message?.includes('ENOTFOUND')) {
        console.warn('[WooCommerce API] Cannot connect - API URL not found, returning empty data');
        return [] as T;
      } else if (error.code === 'ECONNREFUSED' || error.message?.includes('ECONNREFUSED')) {
        console.warn('[WooCommerce API] Connection refused, returning empty data');
        return [] as T;
      } else if (error.code === 'ETIMEDOUT' || error.message?.includes('ETIMEDOUT')) {
        console.warn('[WooCommerce API] Connection timed out, returning empty data');
        return [] as T;
      } else if (error.message?.includes('fetch failed')) {
        console.warn('[WooCommerce API] Fetch failed, returning empty data');
        return [] as T;
      }
      
      // For any other errors, also return empty data to prevent crashes
      console.warn('[WooCommerce API] Unexpected error, returning empty data:', error.message);
      return [] as T;
    }
  }

  async getProducts(params?: {
    per_page?: number;
    page?: number;
    orderby?: string;
    order?: "asc" | "desc";
    category?: string;
    include?: number[];
  }): Promise<{ products: Product[]; total: number; totalPages: number }> {
    const queryParams = new URLSearchParams();

    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.orderby) queryParams.append("orderby", params.orderby);
    if (params?.order) queryParams.append("order", params.order);
    if (params?.category) queryParams.append("category", params.category);
    if (params?.include)
      queryParams.append("include", params.include.join(","));
    // Only fetch published products - WooCommerce returns all stock statuses by default
    queryParams.append("status", "publish");

    const endpoint = `products${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;
    return this.fetchAPIWithHeaders<Product[]>(endpoint);
  }

  async getProduct(id: number): Promise<Product> {
    return this.fetchAPI<Product>(`products/${id}`);
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await this.fetchAPI<Product[]>(`products?slug=${slug}`);
    return products.length > 0 ? products[0] : null;
  }

  async getCategories(params?: {
    per_page?: number;
    orderby?: string;
    order?: "asc" | "desc";
    hide_empty?: boolean;
  }): Promise<Category[]> {
    const queryParams = new URLSearchParams();

    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());
    if (params?.orderby) queryParams.append("orderby", params.orderby);
    if (params?.order) queryParams.append("order", params.order);
    if (params?.hide_empty !== undefined)
      queryParams.append("hide_empty", params.hide_empty.toString());

    const endpoint = `products/categories${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;
    return this.fetchAPI<Category[]>(endpoint);
  }

  async getCategory(id: number): Promise<Category> {
    return this.fetchAPI<Category>(`products/categories/${id}`);
  }

  async getProductsByCategory(
    categoryId: number,
    params?: {
      per_page?: number;
      page?: number;
      orderby?: string;
      order?: "asc" | "desc";
    }
  ): Promise<Product[]> {
    const queryParams = new URLSearchParams();
    queryParams.append("category", categoryId.toString());

    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.orderby) queryParams.append("orderby", params.orderby);
    if (params?.order) queryParams.append("order", params.order);
    // Only fetch published products - WooCommerce returns all stock statuses by default
    queryParams.append("status", "publish");

    const endpoint = `products?${queryParams.toString()}`;
    return this.fetchAPI<Product[]>(endpoint);
  }

  async searchProducts(
    search: string,
    params?: {
      per_page?: number;
      page?: number;
    }
  ): Promise<Product[]> {
    const queryParams = new URLSearchParams();
    queryParams.append("search", search);

    if (params?.per_page)
      queryParams.append("per_page", params.per_page.toString());
    if (params?.page) queryParams.append("page", params.page.toString());
    // Only fetch published products - WooCommerce returns all stock statuses by default
    queryParams.append("status", "publish");

    const endpoint = `products?${queryParams.toString()}`;
    return this.fetchAPI<Product[]>(endpoint, {
      useCache: false,
      cache: "no-store",
    }); // Don't cache search results
  }

  async createOrder(orderData: any): Promise<any> {
    console.log(
      "[WooCommerce API] Creating order with data:",
      JSON.stringify(orderData, null, 2)
    );
    console.log("[WooCommerce API] API URL:", this.config.baseUrl);
    console.log(
      "[WooCommerce API] Using consumer key:",
      this.config.consumerKey.substring(0, 10) + "..."
    );

    try {
      const response = await this.fetchAPI("orders", {
        method: "POST",
        body: JSON.stringify(orderData),
        useCache: false,
        cache: "no-store",
      });

      console.log("[WooCommerce API] Order created successfully:", response);
      return response;
    } catch (error: any) {
      console.error("[WooCommerce API] Order creation failed:", error);
      console.error("[WooCommerce API] Error details:", error.message);
      throw error;
    }
  }

  async getPaymentUrl(orderId: number, orderKey: string): Promise<string> {
    // Generate the checkout payment URL for WooCommerce
    const baseUrl = this.config.baseUrl.replace("/wp-json/wc/v3", "");
    const paymentUrl = `${baseUrl}/checkout/order-pay/${orderId}/?pay_for_order=true&key=${orderKey}`;

    console.log("[WooCommerce API] Generated payment URL:", paymentUrl);
    return paymentUrl;
  }

  async getOrder(orderId: number | string): Promise<any> {
    return this.fetchAPI(`orders/${orderId}`);
  }

  async updateOrder(orderId: number | string, data: any): Promise<any> {
    return this.fetchAPI(`orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      useCache: false,
    });
  }

  async createOrderNote(orderId: number | string, noteData: { note: string; customer_note?: boolean }): Promise<any> {
    return this.fetchAPI(`orders/${orderId}/notes`, {
      method: "POST",
      body: JSON.stringify(noteData),
      useCache: false,
    });
  }

  async getCouponByCode(code: string): Promise<Coupon | null> {
    try {
      // WooCommerce API requires searching coupons by code
      const endpoint = `coupons?code=${encodeURIComponent(code)}`;
      const coupons = await this.fetchAPI<Coupon[]>(endpoint, {
        useCache: false,
        cache: "no-store",
      });

      // Return the first matching coupon or null if not found
      return coupons.length > 0 ? coupons[0] : null;
    } catch (error) {
      console.error("Error fetching coupon:", error);
      return null;
    }
  }

  async validateCoupon(
    code: string,
    cartTotal: number
  ): Promise<{
    valid: boolean;
    coupon?: Coupon;
    error?: string;
  }> {
    try {
      const coupon = await this.getCouponByCode(code);

      if (!coupon) {
        return { valid: false, error: "Ongeldige kortingscode" };
      }

      // Check if coupon is expired
      if (coupon.date_expires) {
        const expiryDate = new Date(coupon.date_expires);
        if (expiryDate < new Date()) {
          return { valid: false, error: "Deze kortingscode is verlopen" };
        }
      }

      // Check usage limits
      if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
        return { valid: false, error: "Deze kortingscode is niet meer geldig" };
      }

      // Check minimum amount
      if (
        coupon.minimum_amount &&
        cartTotal < parseFloat(coupon.minimum_amount)
      ) {
        return {
          valid: false,
          error: `Minimaal bestelbedrag van €${coupon.minimum_amount} vereist`,
        };
      }

      // Check maximum amount
      if (
        coupon.maximum_amount &&
        cartTotal > parseFloat(coupon.maximum_amount)
      ) {
        return {
          valid: false,
          error: `Maximaal bestelbedrag van €${coupon.maximum_amount} overschreden`,
        };
      }

      return { valid: true, coupon };
    } catch (error) {
      console.error("Error validating coupon:", error);
      return { valid: false, error: "Er is een fout opgetreden" };
    }
  }

  async getShippingZones(): Promise<ShippingZone[]> {
    try {
      return await this.fetchAPI<ShippingZone[]>("shipping/zones", {
        useCache: false,
        cache: "no-store",
        next: { revalidate: 0 },
      });
    } catch (error) {
      console.error("Error fetching shipping zones:", error);
      return [];
    }
  }

  async getShippingZoneLocations(
    zoneId: number
  ): Promise<ShippingZoneLocation[]> {
    try {
      return await this.fetchAPI<ShippingZoneLocation[]>(
        `shipping/zones/${zoneId}/locations`,
        {
          useCache: false,
          cache: "no-store",
          next: { revalidate: 0 },
        }
      );
    } catch (error) {
      console.error(`Error fetching locations for zone ${zoneId}:`, error);
      return [];
    }
  }

  async getShippingZoneMethods(zoneId: number): Promise<ShippingMethod[]> {
    try {
      const methods = await this.fetchAPI<ShippingMethod[]>(
        `shipping/zones/${zoneId}/methods`,
        {
          useCache: false,
          cache: "no-store",
          next: { revalidate: 0 },
        }
      );
      return methods.filter((method) => method.enabled);
    } catch (error) {
      console.error(`Error fetching methods for zone ${zoneId}:`, error);
      return [];
    }
  }

  async getAllowedCountries(): Promise<string[]> {
    try {
      console.log("[Shipping] Fetching allowed countries - no cache");
      const zones = await this.getShippingZones();
      const countryCodes = new Set<string>();
      console.log(
        "[Shipping] Found zones:",
        zones.map((z) => ({ id: z.id, name: z.name }))
      );

      // Get locations for each zone
      for (const zone of zones) {
        const locations = await this.getShippingZoneLocations(zone.id);
        console.log(
          `[Shipping] Zone ${zone.id} (${zone.name}) countries:`,
          locations.filter((l) => l.type === "country").map((l) => l.code)
        );

        locations.forEach((location) => {
          if (location.type === "country") {
            countryCodes.add(location.code);
          }
        });
      }

      // Also check zone 0 (Rest of the World)
      const zone0Locations = await this.getShippingZoneLocations(0);
      console.log("[Shipping] Rest of the World locations:", zone0Locations);

      // If zone 0 has no specific locations, it means it accepts all countries
      if (zone0Locations.length === 0) {
        const zone0Methods = await this.getShippingZoneMethods(0);
        if (zone0Methods.length > 0) {
          console.log("[Shipping] Rest of the World accepts all countries");
          // Add all common countries if Rest of the World accepts all
          const allCountries = [
            "NL",
            "BE",
            "DE",
            "FR",
            "LU",
            "AT",
            "ES",
            "IT",
            "PT",
            "GB",
            "IE",
            "PL",
            "CZ",
            "SK",
            "HU",
            "RO",
            "BG",
            "GR",
            "HR",
            "SI",
            "EE",
            "LV",
            "LT",
            "SE",
            "DK",
            "NO",
            "FI",
            "IS",
            "CH",
            "US",
            "CA",
            "MX",
            "BR",
            "AR",
            "CL",
            "CO",
            "PE",
            "AU",
            "NZ",
            "JP",
            "CN",
            "KR",
            "IN",
            "ID",
            "MY",
            "SG",
            "TH",
            "VN",
            "RU",
            "UA",
            "TR",
            "IL",
            "AE",
            "SA",
            "EG",
            "ZA",
            "NG",
            "KE",
          ];
          allCountries.forEach((code) => {
            countryCodes.add(code);
          });
        }
      } else {
        // If Rest of the World has specific countries, add them
        zone0Locations.forEach((location) => {
          if (location.type === "country") {
            countryCodes.add(location.code);
          }
        });
      }

      const allowedCountries = Array.from(countryCodes);
      console.log("[Shipping] Total allowed countries:", allowedCountries);
      return allowedCountries;
    } catch (error) {
      console.error("Error fetching allowed countries:", error);
      return [];
    }
  }

  async calculateShipping(
    country: string,
    cartTotal: number,
    appliedCoupon?: Coupon | null,
    postcode?: string
  ): Promise<ShippingRate[]> {
    try {
      console.log("[Shipping] Calculating shipping for:", {
        country,
        postcode,
        cartTotal,
        hasCoupon: !!appliedCoupon,
      });

      const zones = await this.getShippingZones();
      console.log("[Shipping] Available zones:", zones);

      let applicableZone: ShippingZone | null = null;

      // Find applicable zone for the country and postcode
      for (const zone of zones) {
        const locations = await this.getShippingZoneLocations(zone.id);
        console.log(
          `[Shipping] Zone ${zone.id} (${zone.name}) locations:`,
          locations
        );

        // Check if this zone matches the country
        const hasCountry = locations.some(
          (loc) => loc.type === "country" && loc.code === country
        );

        // Check if zone has postcode restrictions and if our postcode matches
        const postcodeLocations = locations.filter(
          (loc) => loc.type === "postcode"
        );
        let postcodeMatches = postcodeLocations.length === 0; // If no postcode restrictions, it matches

        if (postcode && postcodeLocations.length > 0) {
          postcodeMatches = postcodeLocations.some((loc) => {
            const postcodePattern = loc.code;
            // Handle postcode ranges (e.g., "1000...2000")
            if (postcodePattern.includes("...")) {
              const [start, end] = postcodePattern.split("...");
              const numPostcode = parseInt(postcode);
              const numStart = parseInt(start);
              const numEnd = parseInt(end);
              return numPostcode >= numStart && numPostcode <= numEnd;
            }
            // Handle exact matches or wildcards
            return postcode.startsWith(postcodePattern.replace("*", ""));
          });
        }

        if (hasCountry && postcodeMatches) {
          applicableZone = zone;
          console.log(
            `[Shipping] Found applicable zone: ${zone.id} (${zone.name})`
          );
          break;
        }
      }

      // If no specific zone found, check Rest of the World (zone 0)
      if (!applicableZone) {
        console.log(
          "[Shipping] No applicable zone found - checking Rest of the World fallback"
        );
        const zone0Methods = await this.getShippingZoneMethods(0);
        console.log("[Shipping] Rest of the World methods:", zone0Methods);
        if (zone0Methods.length > 0) {
          applicableZone = { id: 0, name: "Rest of the World", order: 999 };
        } else {
          console.log(
            "[Shipping] No shipping methods available for this address"
          );
          return [];
        }
      }

      // Get shipping methods for the zone
      const methods = await this.getShippingZoneMethods(applicableZone.id);
      console.log(`[Shipping] Methods for zone ${applicableZone.id}:`, methods);
      const rates: ShippingRate[] = [];

      // First, find if there's a free shipping method and its requirements
      let freeShippingMethod = methods.find(
        (m) => m.method_id === "free_shipping" && m.enabled
      );
      let freeShippingMinAmount = 0;
      let freeShippingRequires = "";

      if (freeShippingMethod) {
        freeShippingMinAmount = parseFloat(
          freeShippingMethod.settings.min_amount?.value || "0"
        );
        freeShippingRequires =
          freeShippingMethod.settings.requires?.value || "";
      }

      for (const method of methods) {
        if (!method.enabled) continue;

        let cost = 0;
        let isFree = false;
        let freeShippingEligible = false;
        let freeShippingRemaining = 0;

        // Check if coupon provides free shipping
        if (appliedCoupon?.free_shipping) {
          isFree = true;
          freeShippingEligible = true;
        }
        // Check for free shipping method
        else if (method.method_id === "free_shipping") {
          const minAmount = parseFloat(
            method.settings.min_amount?.value || "0"
          );
          const requires = method.settings.requires?.value || "";

          if (requires === "min_amount") {
            if (cartTotal >= minAmount) {
              isFree = true;
              freeShippingEligible = true;
            } else {
              freeShippingRemaining = minAmount - cartTotal;
            }
          } else if (requires === "coupon") {
            if (appliedCoupon) {
              isFree = true;
              freeShippingEligible = true;
            }
          } else if (requires === "either") {
            if (cartTotal >= minAmount || appliedCoupon) {
              isFree = true;
              freeShippingEligible = true;
            } else {
              freeShippingRemaining = minAmount - cartTotal;
            }
          } else if (requires === "both") {
            if (cartTotal >= minAmount && appliedCoupon) {
              isFree = true;
              freeShippingEligible = true;
            } else if (!appliedCoupon && cartTotal < minAmount) {
              freeShippingRemaining = minAmount - cartTotal;
            }
          } else if (!requires || requires === "") {
            isFree = true;
            freeShippingEligible = true;
          }
        }
        // Calculate flat rate
        else if (method.method_id === "flat_rate") {
          const baseCost = parseFloat(method.settings.cost?.value || "0");
          cost = baseCost;

          // Check if there's a free shipping method available
          if (freeShippingMethod) {
            if (
              freeShippingRequires === "min_amount" &&
              cartTotal < freeShippingMinAmount
            ) {
              freeShippingRemaining = freeShippingMinAmount - cartTotal;
            } else if (
              freeShippingRequires === "either" &&
              !appliedCoupon &&
              cartTotal < freeShippingMinAmount
            ) {
              freeShippingRemaining = freeShippingMinAmount - cartTotal;
            } else if (
              freeShippingRequires === "both" &&
              (!appliedCoupon || cartTotal < freeShippingMinAmount)
            ) {
              if (cartTotal < freeShippingMinAmount) {
                freeShippingRemaining = freeShippingMinAmount - cartTotal;
              }
            }
          }
        }
        // Local pickup is usually free
        else if (method.method_id === "local_pickup") {
          cost = parseFloat(method.settings.cost?.value || "0");
        }

        rates.push({
          method_id: `${method.method_id}:${method.instance_id}`,
          method_title: method.settings.title?.value || method.method_title,
          cost: isFree ? 0 : cost,
          free: isFree,
          free_shipping_eligible: freeShippingEligible,
          free_shipping_remaining: freeShippingRemaining,
          free_shipping_requires: freeShippingRequires,
          free_shipping_min_amount: freeShippingMinAmount,
        });
      }

      console.log(`[Shipping] Calculated rates:`, rates);
      return rates;
    } catch (error) {
      console.error("Error calculating shipping:", error);
      return [];
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const woocommerce = new WooCommerceAPI();
