'use client';

/**
 * Enhanced CartContext using WooCommerce Store API
 * Maintains exact same interface as original CartContext for backward compatibility
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, Coupon, ShippingRate } from '@/lib/woocommerce';
import { storeAPI, StoreCart } from '@/lib/woocommerce-store';

interface CartItem {
  product: Product;
  quantity: number;
  bundleType?: 'single' | 'duo' | 'family';
  bundleDiscount?: number;
  bundlePrice?: number;
  variation_id?: number;
}

interface ShippingInfo {
  country: string;
  postcode: string;
  rates: ShippingRate[];
  selectedRate: ShippingRate | null;
  loading: boolean;
  error: string | null;
}

interface BundleInfo {
  type: 'single' | 'duo' | 'family';
  discount: number;
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, quantity?: number, bundleInfo?: BundleInfo) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalSavings: () => number;
  getTotalItems: () => number;
  appliedCoupon: any | null;
  applyDiscount: (coupon: any) => void;
  removeDiscount: () => void;
  getDiscountAmount: () => number;
  getTotalPriceAfterDiscount: () => number;
  shipping: ShippingInfo;
  setShippingCountry: (country: string) => Promise<void>;
  setShippingPostcode: (postcode: string) => Promise<void>;
  setSelectedShippingRate: (rate: ShippingRate) => void;
  getShippingCost: () => number;
  getFinalTotal: () => number;
  allowedCountries: string[];
  loadAllowedCountries: () => Promise<void>;
  isHydrated: boolean;
  // New Store API additions (optional, for enhanced features)
  storeCart?: StoreCart | null;
  getTax?: () => number;
  refreshCart?: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
  const [allowedCountries, setAllowedCountries] = useState<string[]>([]);
  const [storeCart, setStoreCart] = useState<StoreCart | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const [shipping, setShipping] = useState<ShippingInfo>({
    country: 'NL', // Default to Netherlands
    postcode: '',
    rates: [],
    selectedRate: null,
    loading: false,
    error: null
  });

  // Convert Store API items to our format
  const convertStoreItems = useCallback((storeItems: any[]): CartItem[] => {
    return storeItems.map(item => ({
      product: {
        id: item.id,
        name: item.name,
        slug: item.slug || '',
        permalink: item.permalink || '',
        type: 'simple',
        status: 'publish',
        featured: false,
        catalog_visibility: 'visible',
        description: item.description || '',
        short_description: item.short_description || '',
        sku: item.sku || '',
        price: (parseInt(item.prices.price) / 100).toString(),
        regular_price: (parseInt(item.prices.regular_price) / 100).toString(),
        sale_price: item.prices.sale_price ? (parseInt(item.prices.sale_price) / 100).toString() : '',
        on_sale: item.prices.sale_price ? true : false,
        purchasable: true,
        total_sales: 0,
        virtual: false,
        downloadable: false,
        external_url: '',
        button_text: '',
        tax_status: 'taxable',
        tax_class: '',
        manage_stock: true,
        stock_quantity: item.quantity_limits?.maximum || 99,
        stock_status: item.backorders_allowed ? 'instock' : (item.quantity_limits?.maximum > 0 ? 'instock' : 'outofstock'),
        backorders: item.backorders_allowed ? 'yes' : 'no',
        backorders_allowed: item.backorders_allowed,
        backordered: false,
        sold_individually: item.sold_individually,
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        shipping_required: true,
        shipping_taxable: true,
        shipping_class: '',
        shipping_class_id: 0,
        reviews_allowed: false,
        average_rating: '0',
        rating_count: 0,
        related_ids: [],
        upsell_ids: [],
        cross_sell_ids: [],
        parent_id: 0,
        purchase_note: '',
        categories: [],
        tags: [],
        images: item.images.map((img: any) => ({
          id: img.id,
          src: img.src,
          thumbnail: img.thumbnail || img.src,
          srcset: img.srcset || '',
          sizes: img.sizes || '',
          name: img.name || '',
          alt: img.alt || ''
        })),
        attributes: [],
        variations: [],
        grouped_products: [],
        menu_order: 0,
        price_html: '',
        meta_data: [],
        _links: {}
      } as Product,
      quantity: item.quantity,
      key: item.key
    }));
  }, []);

  // Initialize cart from Store API
  const initializeCart = useCallback(async () => {
    if (isInitialized || loading) return;

    try {
      setLoading(true);

      // Skip Store API initialization for now due to authentication requirements
      // Store API requires nonce for write operations which we don't have in decoupled setup
      // Will use local cart management instead
      console.log('[CartContext] Using local cart management (Store API requires authentication)');

      // Initialize from localStorage if available
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        if (cartData.items) {
          setItems(cartData.items);
        }
        if (cartData.appliedCoupon) {
          setAppliedCoupon(cartData.appliedCoupon);
        }
      }

      setIsInitialized(true);
    } catch (error) {
      console.error('[CartContext] Failed to initialize:', error);
      setItems([]);
      setIsInitialized(true);
    } finally {
      setLoading(false);
      setIsHydrated(true);
    }
  }, [isInitialized, loading]);

  // Initialize on mount
  useEffect(() => {
    initializeCart();
  }, []);

  // Add to cart with Store API
  const addToCart = async (product: Product, quantity: number = 1, bundleInfo?: BundleInfo) => {
    // Don't add out of stock products
    if (product.stock_status !== 'instock' || product.stock_quantity === 0) {
      console.warn('Cannot add out of stock product to cart:', product.name);
      return;
    }

    // Extract variation_id if present
    const variationId = (product as any).variation_id;

    console.log('[Cart] Adding to cart:', {
      productName: product.name,
      quantity,
      bundleInfo,
      variationId
    });

    // Use local cart management only (Store API requires authentication)
    setItems(prevItems => {
      const existingItem = prevItems.find(item =>
        item.product.id === product.id && item.variation_id === variationId
      );
      let newItems;

      if (existingItem) {
        // If adding more of the same bundle type, merge quantities
        if (bundleInfo && existingItem.bundleType === bundleInfo.type) {
          newItems = prevItems.map(item =>
            item.product.id === product.id && item.variation_id === variationId
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  bundlePrice: bundleInfo.totalPrice
                }
              : item
          );
        } else {
          // Otherwise add as separate cart item
          newItems = [
            ...prevItems,
            {
              product,
              quantity,
              bundleType: bundleInfo?.type,
              bundleDiscount: bundleInfo?.discount,
              bundlePrice: bundleInfo?.totalPrice,
              variation_id: variationId
            }
          ];
        }
      } else {
        newItems = [
          ...prevItems,
          {
            product,
            quantity,
            bundleType: bundleInfo?.type,
            bundleDiscount: bundleInfo?.discount,
            bundlePrice: bundleInfo?.totalPrice,
            variation_id: variationId
          }
        ];
      }

      // Save to localStorage immediately
      localStorage.setItem('cart', JSON.stringify({
        items: newItems,
        appliedCoupon
      }));

      return newItems;
    });
    setIsCartOpen(true);
  };

  // Remove from cart (local management only)
  const removeFromCart = async (productId: number, variationId?: number) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => {
        if (variationId !== undefined) {
          // Match both product ID and variation ID
          return !(item.product.id === productId && item.variation_id === variationId);
        }
        // Match only product ID if no variation specified
        return item.product.id !== productId;
      });

      // Save to localStorage immediately
      localStorage.setItem('cart', JSON.stringify({
        items: newItems,
        appliedCoupon
      }));

      return newItems;
    });
  };

  // Update quantity (local management only)
  const updateQuantity = async (productId: number, quantity: number, variationId?: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId, variationId);
      return;
    }

    setItems(prevItems => {
      const newItems = prevItems.map(item => {
        // Match by product ID and variation ID if provided
        const isMatch = variationId !== undefined
          ? (item.product.id === productId && item.variation_id === variationId)
          : (item.product.id === productId);

        if (!isMatch) {
          return item;
        }

        // If item has bundle pricing, recalculate the bundle price
        if (item.bundleType && item.bundleDiscount && item.bundlePrice) {
          const basePrice = parseFloat(item.product.price);
          // Calculate new bundle price based on quantity
          const discountMultiplier = (100 - item.bundleDiscount) / 100;
          const newBundlePrice = basePrice * quantity * discountMultiplier;

          return {
            ...item,
            quantity,
            bundlePrice: newBundlePrice
          };
        }

        // For non-bundle items, just update quantity
        return { ...item, quantity };
      });

      // Save to localStorage immediately
      localStorage.setItem('cart', JSON.stringify({
        items: newItems,
        appliedCoupon
      }));

      return newItems;
    });
  };

  // Clear cart (local management only)
  const clearCart = async () => {
    setItems([]);
    setAppliedCoupon(null);

    // Clear localStorage
    localStorage.removeItem('cart');
  };

  // Apply discount (local management only)
  const applyDiscount = async (coupon: any) => {
    setAppliedCoupon(coupon);

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify({
      items,
      appliedCoupon: coupon
    }));
  };

  // Remove discount (local management only)
  const removeDiscount = async () => {
    setAppliedCoupon(null);

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify({
      items,
      appliedCoupon: null
    }));
  };

  // Update shipping country (using REST API)
  const setShippingCountry = async (country: string) => {
    setShipping(prev => ({ ...prev, country, loading: true, error: null }));

    try {
      // Fetch shipping rates using REST API
      const response = await fetch(`/api/shipping?action=calculate&country=${country}&postcode=${shipping.postcode}&total=${getTotalPrice()}`);
      const data = await response.json();

      if (data.rates && data.rates.length > 0) {
        // Sort rates by cost to find the cheapest
        const sortedRates = [...data.rates].sort((a, b) => a.cost - b.cost);
        setShipping(prev => ({
          ...prev,
          country,
          rates: data.rates,
          selectedRate: sortedRates[0] || null, // Select the cheapest rate
          loading: false
        }));
      } else {
        setShipping(prev => ({
          ...prev,
          country,
          loading: false
        }));
      }
    } catch (error: any) {
      console.error('[CartContext] Fetch shipping rates failed:', error);
      setShipping(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  };

  // Update shipping postcode (using REST API)
  const setShippingPostcode = async (postcode: string) => {
    setShipping(prev => ({ ...prev, postcode, loading: true, error: null }));

    try {
      // Fetch shipping rates using REST API
      const response = await fetch(`/api/shipping?action=calculate&country=${shipping.country}&postcode=${postcode}&total=${getTotalPrice()}`);
      const data = await response.json();

      if (data.rates && data.rates.length > 0) {
        // Sort rates by cost to find the cheapest
        const sortedRates = [...data.rates].sort((a, b) => a.cost - b.cost);
        setShipping(prev => ({
          ...prev,
          postcode,
          rates: data.rates,
          selectedRate: sortedRates[0] || null, // Select the cheapest rate
          loading: false
        }));
      } else {
        setShipping(prev => ({
          ...prev,
          postcode,
          loading: false
        }));
      }
    } catch (error: any) {
      console.error('[CartContext] Fetch shipping rates failed:', error);
      setShipping(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  };

  // Set selected shipping rate (local management only)
  const setSelectedShippingRate = (rate: ShippingRate) => {
    setShipping(prev => ({ ...prev, selectedRate: rate }));
  };

  // Load allowed countries
  const loadAllowedCountries = async () => {
    try {
      const response = await fetch('/api/shipping?action=countries');
      const data = await response.json();
      setAllowedCountries(data.countries || ['NL', 'BE']);
    } catch (error) {
      console.error('[CartContext] Failed to load countries:', error);
      setAllowedCountries(['NL', 'BE']);
    }
  };

  // Calculate totals using Store API data when available
  const getTotalPrice = () => {
    if (storeCart?.totals) {
      const divisor = Math.pow(10, storeCart.totals.currency_minor_unit);
      return parseInt(storeCart.totals.total_items) / divisor;
    }
    // Fallback to local calculation
    return items.reduce((total, item) => {
      // If bundle price is set, use that instead of calculating from product price
      if (item.bundlePrice !== undefined) {
        return total + item.bundlePrice;
      }
      // Otherwise use normal price × quantity
      const price = parseFloat(item.product.sale_price || item.product.price);
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    if (storeCart) {
      return storeCart.items_count;
    }
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getDiscountAmount = () => {
    if (storeCart?.totals) {
      const divisor = Math.pow(10, storeCart.totals.currency_minor_unit);
      return parseInt(storeCart.totals.total_discount) / divisor;
    }
    // Fallback to local calculation
    if (!appliedCoupon) return 0;
    const subtotal = getTotalPrice();

    if (appliedCoupon.discount_type === 'percent') {
      return (subtotal * parseFloat(appliedCoupon.amount)) / 100;
    } else if (appliedCoupon.discount_type === 'fixed_cart') {
      return parseFloat(appliedCoupon.amount);
    }
    return 0;
  };

  const getTotalPriceAfterDiscount = () => {
    return getTotalPrice() - getDiscountAmount();
  };

  // Calculate total savings (bundle discounts + coupon discounts)
  const getTotalSavings = () => {
    // Calculate bundle discount savings
    const bundleSavings = items.reduce((total, item) => {
      if (item.bundlePrice !== undefined) {
        const regularPrice = parseFloat(item.product.price) * item.quantity;
        const bundlePrice = item.bundlePrice;
        return total + (regularPrice - bundlePrice);
      }
      return total;
    }, 0);

    // Add coupon discount
    const couponDiscount = getDiscountAmount();

    return bundleSavings + couponDiscount;
  };

  const getShippingCost = () => {
    if (storeCart?.totals && storeCart.totals.total_shipping) {
      const divisor = Math.pow(10, storeCart.totals.currency_minor_unit);
      return parseInt(storeCart.totals.total_shipping) / divisor;
    }
    // Fallback to selected rate
    return shipping.selectedRate?.cost || 0;
  };

  const getTax = () => {
    if (storeCart?.totals) {
      const divisor = Math.pow(10, storeCart.totals.currency_minor_unit);
      return parseInt(storeCart.totals.total_tax) / divisor;
    }
    return 0;
  };

  const getFinalTotal = () => {
    if (storeCart?.totals) {
      const divisor = Math.pow(10, storeCart.totals.currency_minor_unit);
      return parseInt(storeCart.totals.total_price) / divisor;
    }
    // Fallback to local calculation
    return getTotalPriceAfterDiscount() + getShippingCost();
  };

  const value: CartContextType = {
    items,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalSavings,
    getTotalItems,
    appliedCoupon,
    applyDiscount,
    removeDiscount,
    getDiscountAmount,
    getTotalPriceAfterDiscount,
    shipping,
    setShippingCountry,
    setShippingPostcode,
    setSelectedShippingRate,
    getShippingCost,
    getFinalTotal,
    allowedCountries,
    loadAllowedCountries,
    isHydrated,
    // Store API additions
    storeCart,
    getTax,
    refreshCart: initializeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}