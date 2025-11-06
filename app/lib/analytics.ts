// Enhanced E-commerce tracking utilities for Google Analytics 4

interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  quantity?: number;
  variant?: string;
  brand?: string;
}

interface EcommerceEvent {
  currency?: string;
  value?: number;
  items: Product[];
}

// Check if user has given consent
const hasConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookie_consent') === 'granted';
};

// Track product view
export const trackProductView = (product: Product) => {
  if (!hasConsent() || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'view_item', {
    currency: 'EUR',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category || 'Edelstenen',
        price: product.price,
        quantity: 1,
      },
    ],
  });
};

// Track add to cart
export const trackAddToCart = (product: Product, quantity: number = 1) => {
  if (!hasConsent() || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'add_to_cart', {
    currency: 'EUR',
    value: product.price * quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category || 'Edelstenen',
        price: product.price,
        quantity: quantity,
      },
    ],
  });

  // Also track Meta Pixel
  if (window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price * quantity,
      currency: 'EUR',
    });
  }
};

// Track remove from cart
export const trackRemoveFromCart = (product: Product, quantity: number = 1) => {
  if (!hasConsent() || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'remove_from_cart', {
    currency: 'EUR',
    value: product.price * quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category || 'Edelstenen',
        price: product.price,
        quantity: quantity,
      },
    ],
  });
};

// Track begin checkout
export const trackBeginCheckout = (items: Product[], totalValue: number) => {
  if (!hasConsent() || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'begin_checkout', {
    currency: 'EUR',
    value: totalValue,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category || 'Edelstenen',
      price: item.price,
      quantity: item.quantity || 1,
    })),
  });

  // Also track Meta Pixel
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: items.map(item => item.id),
      contents: items.map(item => ({
        id: item.id,
        quantity: item.quantity || 1,
      })),
      value: totalValue,
      currency: 'EUR',
    });
  }
};

// Track purchase
export const trackPurchase = (
  transactionId: string,
  items: Product[],
  totalValue: number,
  tax?: number,
  shipping?: number
) => {
  if (!hasConsent() || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'purchase', {
    transaction_id: transactionId,
    currency: 'EUR',
    value: totalValue,
    tax: tax || 0,
    shipping: shipping || 0,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category || 'Edelstenen',
      price: item.price,
      quantity: item.quantity || 1,
    })),
  });

  // Also track Meta Pixel
  if (window.fbq) {
    window.fbq('track', 'Purchase', {
      content_ids: items.map(item => item.id),
      contents: items.map(item => ({
        id: item.id,
        quantity: item.quantity || 1,
      })),
      value: totalValue,
      currency: 'EUR',
    });
  }
};

// Track search
export const trackSearch = (searchTerm: string) => {
  if (!hasConsent() || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'search', {
    search_term: searchTerm,
  });

  // Also track Meta Pixel
  if (window.fbq) {
    window.fbq('track', 'Search', {
      search_string: searchTerm,
    });
  }
};

// Track view cart
export const trackViewCart = (items: Product[], totalValue: number) => {
  if (!hasConsent() || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'view_cart', {
    currency: 'EUR',
    value: totalValue,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category || 'Edelstenen',
      price: item.price,
      quantity: item.quantity || 1,
    })),
  });
};

// Track view item list (collection page)
export const trackViewItemList = (items: Product[], listName: string) => {
  if (!hasConsent() || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'view_item_list', {
    item_list_name: listName,
    items: items.map((item, index) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category || 'Edelstenen',
      price: item.price,
      index: index,
    })),
  });
};

// Track newsletter signup
export const trackNewsletterSignup = (method: string = 'popup') => {
  if (!hasConsent() || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'sign_up', {
    method: method,
  });

  // Also track Meta Pixel
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Newsletter Signup',
    });
  }
};

// Track page view with custom parameters
export const trackPageView = (pageTitle: string, pagePath: string) => {
  if (!hasConsent() || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_title: pageTitle,
    page_path: pagePath,
  });
};
