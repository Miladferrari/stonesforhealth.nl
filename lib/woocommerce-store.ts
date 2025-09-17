/**
 * WooCommerce Store API Client
 * Handles cart sessions, checkout, and tax calculations
 * Store API v1 endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#store-api
 */

// Types for Store API responses
export interface StoreCartItem {
  key: string;
  id: number;
  quantity: number;
  quantity_limits: {
    minimum: number;
    maximum: number;
    multiple_of: number;
    editable: boolean;
  };
  name: string;
  short_description: string;
  description: string;
  sku: string;
  low_stock_remaining: number | null;
  backorders_allowed: boolean;
  show_backorder_badge: boolean;
  sold_individually: boolean;
  permalink: string;
  images: Array<{
    id: number;
    src: string;
    thumbnail: string;
    srcset: string;
    sizes: string;
    name: string;
    alt: string;
  }>;
  variation: any[];
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    price_range: any;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
    raw_prices: {
      precision: number;
      price: string;
      regular_price: string;
      sale_price: string;
    };
  };
  totals: {
    line_subtotal: string;
    line_subtotal_tax: string;
    line_total: string;
    line_total_tax: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
}

export interface StoreCart {
  coupons: any[];
  shipping_rates: any[];
  shipping_address: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
  };
  billing_address: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  items: StoreCartItem[];
  items_count: number;
  items_weight: number;
  cross_sells: any[];
  needs_payment: boolean;
  needs_shipping: boolean;
  has_calculated_shipping: boolean;
  fees: any[];
  totals: {
    total_items: string;
    total_items_tax: string;
    total_fees: string;
    total_fees_tax: string;
    total_discount: string;
    total_discount_tax: string;
    total_shipping: string;
    total_shipping_tax: string;
    total_price: string;
    total_tax: string;
    tax_lines: any[];
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
  errors: any[];
  payment_methods: string[];
  payment_requirements: string[];
  extensions: any;
}

export interface StoreCheckoutData {
  billing_address: {
    first_name: string;
    last_name: string;
    company?: string;
    address_1: string;
    address_2?: string;
    city: string;
    state?: string;
    postcode: string;
    country: string;
    email: string;
    phone?: string;
  };
  shipping_address: {
    first_name: string;
    last_name: string;
    company?: string;
    address_1: string;
    address_2?: string;
    city: string;
    state?: string;
    postcode: string;
    country: string;
  };
  payment_method: string;
  payment_data?: any[];
  customer_note?: string;
  extensions?: any;
}

class WooCommerceStoreAPI {
  private baseUrl: string;
  private nonce: string | null = null;
  private cartToken: string | null = null;

  constructor() {
    // Extract base WordPress URL from the WooCommerce API URL
    const wooApiUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL ||
                      process.env.WOOCOMMERCE_URL ||
                      'http://wordpress.123noodboxen.nl/wp-json/wc/v3';

    // Remove the /wp-json/wc/v3 part to get base URL
    const baseUrl = wooApiUrl.replace('/wp-json/wc/v3', '');

    // Store API is at /wp-json/wc/store (no v1)
    this.baseUrl = `${baseUrl}/wp-json/wc/store`;

    console.log('[Store API] Initialized with URL:', this.baseUrl);
  }

  /**
   * Set nonce for authenticated requests
   */
  setNonce(nonce: string) {
    this.nonce = nonce;
    console.log('[Store API] Nonce set');
  }

  /**
   * Set cart token from cookies/headers
   */
  setCartToken(token: string) {
    this.cartToken = token;
    console.log('[Store API] Cart token set');
  }

  /**
   * Make authenticated request to Store API
   */
  private async fetchStoreAPI<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add nonce for authenticated requests (if available)
    // Note: In a decoupled setup, we typically won't have a nonce
    // Store API can work without nonce for read operations
    // Write operations may require authentication via other means
    if (this.nonce) {
      headers['X-WC-Store-API-Nonce'] = this.nonce;
    }

    // Add cart token if available - this is crucial for cart persistence
    if (this.cartToken) {
      headers['Cart-Token'] = this.cartToken;
    }

    console.log(`[Store API] Fetching: ${endpoint}`);
    console.log(`[Store API] Headers:`, headers);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include', // Important for cookies
      });

      // Extract cart token from response headers
      const newCartToken = response.headers.get('Cart-Token');
      if (newCartToken) {
        this.cartToken = newCartToken;
        console.log('[Store API] Updated cart token from response');
      }

      // Extract nonce from response headers
      const newNonce = response.headers.get('X-WC-Store-API-Nonce');
      if (newNonce) {
        this.nonce = newNonce;
        console.log('[Store API] Updated nonce from response');
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Store API] Error ${response.status}:`, errorText);

        // Try to parse as JSON for better error messages
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || `Store API error: ${response.status}`);
        } catch {
          throw new Error(`Store API error: ${response.status} - ${errorText}`);
        }
      }

      const data = await response.json();
      console.log(`[Store API] Success:`, endpoint);
      return data;
    } catch (error) {
      console.error(`[Store API] Request failed:`, error);
      throw error;
    }
  }

  /**
   * Cart Management Functions
   */

  // Get current cart
  async getCart(): Promise<StoreCart> {
    return this.fetchStoreAPI<StoreCart>('/cart');
  }

  // Add item to cart
  async addToCart(productId: number, quantity: number = 1): Promise<StoreCart> {
    return this.fetchStoreAPI<StoreCart>('/cart/add-item', {
      method: 'POST',
      body: JSON.stringify({
        id: productId,
        quantity,
      }),
    });
  }

  // Update cart item quantity
  async updateCartItem(itemKey: string, quantity: number): Promise<StoreCart> {
    return this.fetchStoreAPI<StoreCart>('/cart/update-item', {
      method: 'POST',
      body: JSON.stringify({
        key: itemKey,
        quantity,
      }),
    });
  }

  // Remove item from cart
  async removeFromCart(itemKey: string): Promise<StoreCart> {
    return this.fetchStoreAPI<StoreCart>('/cart/remove-item', {
      method: 'POST',
      body: JSON.stringify({
        key: itemKey,
      }),
    });
  }

  // Clear entire cart
  async clearCart(): Promise<StoreCart> {
    return this.fetchStoreAPI<StoreCart>('/cart/clear', {
      method: 'POST',
    });
  }

  // Apply coupon
  async applyCoupon(code: string): Promise<StoreCart> {
    return this.fetchStoreAPI<StoreCart>('/cart/apply-coupon', {
      method: 'POST',
      body: JSON.stringify({
        code,
      }),
    });
  }

  // Remove coupon
  async removeCoupon(code: string): Promise<StoreCart> {
    return this.fetchStoreAPI<StoreCart>('/cart/remove-coupon', {
      method: 'POST',
      body: JSON.stringify({
        code,
      }),
    });
  }

  // Update customer (shipping/billing)
  async updateCustomer(data: {
    billing_address?: Partial<StoreCart['billing_address']>;
    shipping_address?: Partial<StoreCart['shipping_address']>;
  }): Promise<StoreCart> {
    return this.fetchStoreAPI<StoreCart>('/cart/update-customer', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Select shipping rate
  async selectShippingRate(packageId: number, rateId: string): Promise<StoreCart> {
    return this.fetchStoreAPI<StoreCart>('/cart/select-shipping-rate', {
      method: 'POST',
      body: JSON.stringify({
        package_id: packageId,
        rate_id: rateId,
      }),
    });
  }

  /**
   * Checkout Functions
   */

  // Get checkout data
  async getCheckout(): Promise<any> {
    return this.fetchStoreAPI('/checkout');
  }

  // Process checkout
  async processCheckout(data: StoreCheckoutData): Promise<any> {
    return this.fetchStoreAPI('/checkout', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Data Endpoints
   */

  // Get available payment methods
  async getPaymentMethods(): Promise<any> {
    return this.fetchStoreAPI('/cart/payment-methods');
  }

  // Get shipping methods for current cart
  async getShippingMethods(): Promise<any> {
    return this.fetchStoreAPI('/cart/shipping-rates');
  }

  // Get countries and states
  async getCountries(): Promise<any> {
    return this.fetchStoreAPI('/data/countries');
  }

  // Get currency data
  async getCurrency(): Promise<any> {
    return this.fetchStoreAPI('/data/currency');
  }

  /**
   * Utilities
   */

  // Calculate totals (triggers recalculation)
  async calculateTotals(): Promise<StoreCart> {
    return this.fetchStoreAPI<StoreCart>('/cart/calculate', {
      method: 'POST',
    });
  }

  // Validate cart (checks stock, coupons, etc)
  async validateCart(): Promise<any> {
    return this.fetchStoreAPI('/cart/validate', {
      method: 'POST',
    });
  }
}

// Export singleton instance
export const storeAPI = new WooCommerceStoreAPI();

// Export class for testing
export default WooCommerceStoreAPI;