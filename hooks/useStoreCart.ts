/**
 * Hook for integrating WooCommerce Store API with React cart state
 * Maintains backward compatibility with existing cart UI components
 */

import { useCallback, useEffect, useState } from 'react';
import { storeAPI, StoreCart } from '@/lib/woocommerce-store';

// Convert Store API cart to our existing cart format
export interface CartItem {
  product: {
    id: number;
    name: string;
    price: string;
    sale_price?: string;
    images: Array<{
      src: string;
      alt?: string;
    }>;
    stock_quantity?: number;
  };
  quantity: number;
  key?: string; // Store API item key
}

export function useStoreCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [storeCart, setStoreCart] = useState<StoreCart | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Convert Store API cart items to our format
  const convertStoreItems = useCallback((storeItems: any[]): CartItem[] => {
    return storeItems.map(item => ({
      product: {
        id: item.id,
        name: item.name,
        price: item.prices.regular_price,
        sale_price: item.prices.sale_price || undefined,
        images: item.images.map((img: any) => ({
          src: img.src,
          alt: img.alt
        })),
        stock_quantity: item.quantity_limits?.maximum || 99
      },
      quantity: item.quantity,
      key: item.key
    }));
  }, []);

  // Initialize cart from Store API
  const initializeCart = useCallback(async () => {
    if (isInitialized) return;

    try {
      setLoading(true);
      const cart = await storeAPI.getCart();
      setStoreCart(cart);
      setItems(convertStoreItems(cart.items));
      setIsInitialized(true);
    } catch (error) {
      console.error('[useStoreCart] Failed to initialize:', error);
      // Fallback to empty cart
      setItems([]);
      setIsInitialized(true);
    } finally {
      setLoading(false);
    }
  }, [isInitialized, convertStoreItems]);

  // Add item to cart
  const addItem = useCallback(async (product: any, quantity: number = 1) => {
    try {
      setLoading(true);
      const cart = await storeAPI.addToCart(product.id, quantity);
      setStoreCart(cart);
      setItems(convertStoreItems(cart.items));
      return { success: true };
    } catch (error: any) {
      console.error('[useStoreCart] Add item failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [convertStoreItems]);

  // Update item quantity
  const updateQuantity = useCallback(async (productId: number, quantity: number) => {
    try {
      setLoading(true);

      // Find the item key for this product
      const item = storeCart?.items.find(i => i.id === productId);
      if (!item) {
        throw new Error('Item not found in cart');
      }

      if (quantity === 0) {
        // Remove item if quantity is 0
        const cart = await storeAPI.removeFromCart(item.key);
        setStoreCart(cart);
        setItems(convertStoreItems(cart.items));
      } else {
        // Update quantity
        const cart = await storeAPI.updateCartItem(item.key, quantity);
        setStoreCart(cart);
        setItems(convertStoreItems(cart.items));
      }
      return { success: true };
    } catch (error: any) {
      console.error('[useStoreCart] Update quantity failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [storeCart, convertStoreItems]);

  // Remove item from cart
  const removeItem = useCallback(async (productId: number) => {
    try {
      setLoading(true);

      // Find the item key for this product
      const item = storeCart?.items.find(i => i.id === productId);
      if (!item) {
        throw new Error('Item not found in cart');
      }

      const cart = await storeAPI.removeFromCart(item.key);
      setStoreCart(cart);
      setItems(convertStoreItems(cart.items));
      return { success: true };
    } catch (error: any) {
      console.error('[useStoreCart] Remove item failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [storeCart, convertStoreItems]);

  // Clear cart
  const clearCart = useCallback(async () => {
    try {
      setLoading(true);
      const cart = await storeAPI.clearCart();
      setStoreCart(cart);
      setItems([]);
      return { success: true };
    } catch (error: any) {
      console.error('[useStoreCart] Clear cart failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply coupon
  const applyCoupon = useCallback(async (code: string) => {
    try {
      setLoading(true);
      const cart = await storeAPI.applyCoupon(code);
      setStoreCart(cart);
      return { success: true, cart };
    } catch (error: any) {
      console.error('[useStoreCart] Apply coupon failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove coupon
  const removeCoupon = useCallback(async (code: string) => {
    try {
      setLoading(true);
      const cart = await storeAPI.removeCoupon(code);
      setStoreCart(cart);
      return { success: true, cart };
    } catch (error: any) {
      console.error('[useStoreCart] Remove coupon failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update customer info (for shipping calculation)
  const updateCustomer = useCallback(async (data: {
    shipping?: any;
    billing?: any;
  }) => {
    try {
      setLoading(true);

      const updateData: any = {};

      if (data.shipping) {
        updateData.shipping_address = {
          first_name: data.shipping.firstName || '',
          last_name: data.shipping.lastName || '',
          address_1: data.shipping.address || '',
          address_2: data.shipping.address2 || '',
          city: data.shipping.city || '',
          postcode: data.shipping.postcode || '',
          country: data.shipping.country || 'NL',
          state: data.shipping.state || ''
        };
      }

      if (data.billing) {
        updateData.billing_address = {
          first_name: data.billing.firstName || '',
          last_name: data.billing.lastName || '',
          address_1: data.billing.address || '',
          address_2: data.billing.address2 || '',
          city: data.billing.city || '',
          postcode: data.billing.postcode || '',
          country: data.billing.country || 'NL',
          email: data.billing.email || '',
          phone: data.billing.phone || '',
          state: data.billing.state || ''
        };
      }

      const cart = await storeAPI.updateCustomer(updateData);
      setStoreCart(cart);
      return { success: true, cart };
    } catch (error: any) {
      console.error('[useStoreCart] Update customer failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Select shipping rate
  const selectShippingRate = useCallback(async (rateId: string) => {
    try {
      setLoading(true);
      // Package ID is usually 0 for single package
      const cart = await storeAPI.selectShippingRate(0, rateId);
      setStoreCart(cart);
      return { success: true, cart };
    } catch (error: any) {
      console.error('[useStoreCart] Select shipping failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get totals with tax
  const getTotals = useCallback(() => {
    if (!storeCart) {
      return {
        subtotal: 0,
        tax: 0,
        shipping: 0,
        discount: 0,
        total: 0
      };
    }

    const totals = storeCart.totals;

    // Convert from minor units (cents) to major units (euros)
    const divisor = Math.pow(10, totals.currency_minor_unit);

    return {
      subtotal: parseInt(totals.total_items) / divisor,
      tax: parseInt(totals.total_tax) / divisor,
      shipping: totals.total_shipping ? parseInt(totals.total_shipping) / divisor : 0,
      discount: parseInt(totals.total_discount) / divisor,
      total: parseInt(totals.total_price) / divisor,
      // Additional details
      subtotalTax: parseInt(totals.total_items_tax) / divisor,
      shippingTax: totals.total_shipping_tax ? parseInt(totals.total_shipping_tax) / divisor : 0,
      currency: totals.currency_code,
      currencySymbol: totals.currency_symbol
    };
  }, [storeCart]);

  // Initialize on mount
  useEffect(() => {
    initializeCart();
  }, []);

  return {
    // Cart items in existing format
    items,
    loading,
    isInitialized,

    // Cart operations
    addItem,
    updateQuantity,
    removeItem,
    clearCart,

    // Coupon operations
    applyCoupon,
    removeCoupon,

    // Customer/shipping
    updateCustomer,
    selectShippingRate,

    // Totals with tax
    getTotals,

    // Raw Store API cart for advanced usage
    storeCart,

    // Refresh cart from server
    refreshCart: initializeCart
  };
}