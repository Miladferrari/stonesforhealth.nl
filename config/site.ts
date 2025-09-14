/**
 * Site Configuration
 * Update these values to match your brand and business
 */

export const siteConfig = {
  // Basic Information
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Your Store Name",
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || "your-store.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  
  // SEO & Metadata
  title: "Your Store - Shop Quality Products",
  description: "Shop our curated collection of premium products. Fast shipping, secure checkout, and excellent customer service.",
  keywords: "online shop, ecommerce, quality products",
  
  // Business Information
  company: {
    name: "Your Company Name",
    email: "info@your-store.com",
    phone: "+1 234 567 8900",
    address: {
      street: "123 Main Street",
      city: "Your City",
      state: "Your State",
      zip: "12345",
      country: "Your Country"
    }
  },
  
  // Social Media Links
  social: {
    facebook: "https://facebook.com/yourstore",
    instagram: "https://instagram.com/yourstore",
    twitter: "https://twitter.com/yourstore",
    youtube: "https://youtube.com/yourstore"
  },
  
  // Support & Legal
  support: {
    email: "support@your-store.com",
    phone: "+1 234 567 8901",
    hours: "Monday - Friday, 9am - 5pm EST"
  },
  
  // Policies & Legal (update these URLs to your actual policy pages)
  legal: {
    privacyPolicy: "/privacy",
    termsOfService: "/terms",
    cookiePolicy: "/cookies",
    returnPolicy: "/returns",
    shippingPolicy: "/shipping"
  },
  
  // Commerce Settings
  commerce: {
    currency: "USD",
    currencySymbol: "$",
    shippingDays: "2-3",
    returnDays: 14,
    freeShippingThreshold: 50
  },
  
  // Features & Capabilities
  features: {
    wishlist: true,
    reviews: true,
    coupons: true,
    guestCheckout: true,
    multiCurrency: false
  }
};

// Type definitions for TypeScript
export type SiteConfig = typeof siteConfig;