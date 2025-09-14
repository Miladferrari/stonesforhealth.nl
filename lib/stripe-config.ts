import { loadStripe, Stripe } from '@stripe/stripe-js';

// Stripe configuration constants
export const STRIPE_CONFIG = {
  // Payment method types supported
  paymentMethods: ['ideal', 'card', 'bancontact', 'apple_pay', 'google_pay'] as const,

  // Currency configuration
  currency: 'eur',

  // Retry configuration
  maxRetries: 3,
  retryDelay: 1000,

  // Timeout configuration
  requestTimeout: 30000, // 30 seconds

  // Mobile payment detection
  isMobileDevice: () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },

  // Apple Pay detection
  isApplePayAvailable: async (stripe: Stripe | null) => {
    if (!stripe || typeof window === 'undefined') return false;
    try {
      const paymentRequest = stripe.paymentRequest({
        country: 'NL',
        currency: 'eur',
        total: { label: 'Test', amount: 100 },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      const result = await paymentRequest.canMakePayment();
      return result?.applePay === true;
    } catch {
      return false;
    }
  },

  // Google Pay detection
  isGooglePayAvailable: async (stripe: Stripe | null) => {
    if (!stripe || typeof window === 'undefined') return false;
    try {
      const paymentRequest = stripe.paymentRequest({
        country: 'NL',
        currency: 'eur',
        total: { label: 'Test', amount: 100 },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      const result = await paymentRequest.canMakePayment();
      return result?.googlePay === true;
    } catch {
      return false;
    }
  },
};

// Stripe instance singleton
let stripePromise: Promise<Stripe | null> | null = null;

/**
 * Get or create Stripe instance
 * Implements singleton pattern to avoid multiple Stripe instances
 */
export const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!key) {
      console.error('Stripe publishable key is not configured');
      return null;
    }

    stripePromise = loadStripe(key);
  }

  return stripePromise;
};

/**
 * Validate Stripe configuration
 * Checks if all required environment variables are set
 */
export const validateStripeConfig = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    errors.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not configured');
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    errors.push('STRIPE_SECRET_KEY is not configured');
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    errors.push('STRIPE_WEBHOOK_SECRET is not configured');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Stripe appearance theme for consistent UI
 */
export const stripeAppearance = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary: '#492c4a',
    colorBackground: '#ffffff',
    colorText: '#1a1a1a',
    colorDanger: '#ef4444',
    fontFamily: 'var(--font-eb-garamond), serif',
    borderRadius: '12px',
    spacingUnit: '4px',
  },
  rules: {
    '.Label': {
      color: '#6b7280',
      fontSize: '14px',
      fontWeight: '500',
    },
    '.Tab': {
      border: '1px solid #d1d5db',
      boxShadow: 'none',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '8px',
    },
    '.Tab--selected': {
      border: '2px solid #492c4a',
      backgroundColor: '#f9fafb',
    },
    '.Tab:hover': {
      borderColor: '#9ca3af',
    },
    '.Input': {
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '12px',
      fontSize: '16px',
    },
    '.Input:focus': {
      border: '1px solid #492c4a',
      boxShadow: '0 0 0 3px rgba(73, 44, 74, 0.1)',
    },
    '.Input--invalid': {
      borderColor: '#ef4444',
    },
    '.Error': {
      color: '#ef4444',
      fontSize: '14px',
      marginTop: '4px',
    },
    // Mobile-specific styles
    '@media (max-width: 640px)': {
      '.Tab': {
        padding: '16px',
        fontSize: '16px',
      },
      '.Input': {
        fontSize: '16px', // Prevent zoom on iOS
        padding: '14px',
      },
    },
  },
};

/**
 * Format amount for display
 */
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

/**
 * Convert amount to Stripe format (cents)
 */
export const toStripeAmount = (amount: number): number => {
  return Math.round(amount * 100);
};

/**
 * Convert from Stripe format (cents) to euros
 */
export const fromStripeAmount = (amount: number): number => {
  return amount / 100;
};

/**
 * Payment method icons mapping
 */
export const paymentMethodIcons = {
  ideal: '/images/ideal-logo.svg',
  card: '/images/card-icon.svg',
  bancontact: '/images/bancontact-logo.svg',
  apple_pay: '/images/apple-pay.svg',
  google_pay: '/images/google-pay.svg',
} as const;

/**
 * Payment method display names
 */
export const paymentMethodNames = {
  ideal: 'iDEAL',
  card: 'Creditcard',
  bancontact: 'Bancontact',
  apple_pay: 'Apple Pay',
  google_pay: 'Google Pay',
} as const;

/**
 * Error messages in Dutch
 */
export const errorMessages = {
  generic: 'Er is een fout opgetreden bij de betaling. Probeer het opnieuw.',
  network: 'Netwerkfout. Controleer uw internetverbinding.',
  cancelled: 'Betaling geannuleerd.',
  card_declined: 'Kaart geweigerd. Probeer een andere betaalmethode.',
  insufficient_funds: 'Onvoldoende saldo.',
  expired_card: 'Kaart verlopen.',
  invalid_card: 'Ongeldige kaartgegevens.',
  processing_error: 'Verwerkingsfout. Probeer het later opnieuw.',
  authentication_required: 'Authenticatie vereist. Volg de instructies van uw bank.',
  payment_intent_authentication_failure: 'Authenticatie mislukt. Probeer het opnieuw.',
  payment_intent_unexpected_state: 'Onverwachte betalingsstatus. Neem contact op met support.',
} as const;

/**
 * Get user-friendly error message
 */
export const getErrorMessage = (error: any): string => {
  if (!error) return errorMessages.generic;

  const code = error.code || error.decline_code || error.type;

  if (code && code in errorMessages) {
    return errorMessages[code as keyof typeof errorMessages];
  }

  if (error.message?.includes('cancel')) {
    return errorMessages.cancelled;
  }

  if (error.message?.includes('network')) {
    return errorMessages.network;
  }

  return error.message || errorMessages.generic;
};