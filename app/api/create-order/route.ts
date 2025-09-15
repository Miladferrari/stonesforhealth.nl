import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (optional, allows various formats)
const phoneRegex = /^[\d\s\-\+\(\)]+$/;

// Postcode validation for specific countries
const postcodeValidation: { [key: string]: RegExp } = {
  'NL': /^[1-9][0-9]{3}\s?[A-Z]{2}$/i, // Dutch postcode
  'BE': /^[1-9][0-9]{3}$/,              // Belgian postcode
  'DE': /^[0-9]{5}$/,                   // German postcode
  'FR': /^[0-9]{5}$/,                   // French postcode
  'LU': /^[0-9]{4}$/,                   // Luxembourg postcode
};

// Sanitize string input
const sanitizeString = (input: string): string => {
  return input.trim().replace(/<[^>]*>/g, ''); // Remove HTML tags
};

// Validate and sanitize address data
const validateAddressData = (address: any, type: 'billing' | 'shipping') => {
  const errors: string[] = [];

  // Required fields
  if (!address.last_name?.trim()) {
    errors.push(`${type} last name is required`);
  }

  if (!address.address_1?.trim()) {
    errors.push(`${type} address is required`);
  }

  if (!address.city?.trim()) {
    errors.push(`${type} city is required`);
  }

  if (!address.postcode?.trim()) {
    errors.push(`${type} postcode is required`);
  }

  if (!address.country?.trim()) {
    errors.push(`${type} country is required`);
  }

  // Email validation (only for billing)
  if (type === 'billing') {
    if (!address.email?.trim()) {
      errors.push('Email is required');
    } else if (!emailRegex.test(address.email)) {
      errors.push('Invalid email format');
    }
  }

  // Phone validation (optional but check format if provided)
  if (address.phone && !phoneRegex.test(address.phone)) {
    errors.push(`Invalid ${type} phone format`);
  }

  // Postcode format validation
  if (address.postcode && address.country) {
    const validator = postcodeValidation[address.country];
    if (validator && !validator.test(address.postcode.replace(/\s/g, ''))) {
      errors.push(`Invalid ${type} postcode format for ${address.country}`);
    }
  }

  return errors;
};

export async function POST(request: NextRequest) {
  try {
    const { orderData, returnUrl } = await request.json();

    console.log('[API Route] Creating order with validation');

    // Comprehensive validation
    const validationErrors: string[] = [];

    // Validate billing address
    if (!orderData.billing) {
      validationErrors.push('Billing information is required');
    } else {
      validationErrors.push(...validateAddressData(orderData.billing, 'billing'));
    }

    // Validate shipping address
    if (!orderData.shipping) {
      validationErrors.push('Shipping information is required');
    } else {
      validationErrors.push(...validateAddressData(orderData.shipping, 'shipping'));
    }

    // Validate line items (products)
    if (!orderData.line_items || orderData.line_items.length === 0) {
      validationErrors.push('Cart is empty');
    }

    // Return validation errors if any
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationErrors
        },
        { status: 400 }
      );
    }

    // Sanitize all text inputs
    const sanitizedOrderData = {
      ...orderData,
      billing: {
        ...orderData.billing,
        first_name: sanitizeString(orderData.billing.first_name || ''),
        last_name: sanitizeString(orderData.billing.last_name),
        address_1: sanitizeString(orderData.billing.address_1),
        address_2: sanitizeString(orderData.billing.address_2 || ''),
        city: sanitizeString(orderData.billing.city),
        postcode: sanitizeString(orderData.billing.postcode).toUpperCase(),
        email: sanitizeString(orderData.billing.email).toLowerCase(),
        phone: sanitizeString(orderData.billing.phone || ''),
      },
      shipping: {
        ...orderData.shipping,
        first_name: sanitizeString(orderData.shipping.first_name || ''),
        last_name: sanitizeString(orderData.shipping.last_name),
        address_1: sanitizeString(orderData.shipping.address_1),
        address_2: sanitizeString(orderData.shipping.address_2 || ''),
        city: sanitizeString(orderData.shipping.city),
        postcode: sanitizeString(orderData.shipping.postcode).toUpperCase(),
      }
    };
    
    // Ensure shipping_lines have proper format - just convert total to string
    if (sanitizedOrderData.shipping_lines && sanitizedOrderData.shipping_lines.length > 0) {
      sanitizedOrderData.shipping_lines = sanitizedOrderData.shipping_lines.map((line: any) => ({
        ...line,
        total: String(line.total || '0.00')
      }));
    }

    // Add meta data for payment return URL
    const enhancedOrderData = {
      ...sanitizedOrderData,
      meta_data: [
        ...(sanitizedOrderData.meta_data || []),
        {
          key: '_payment_return_url',
          value: returnUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success`
        }
      ]
    };

    console.log('[API Route] Order validation passed, creating order');

    // Create the order using WooCommerce API
    const order = await woocommerce.createOrder(enhancedOrderData);
    
    console.log('[API Route] Order created successfully:', order.id);
    console.log('[API Route] Order key:', order.order_key);
    console.log('[API Route] Order status:', order.status);
    
    // Generate payment URL
    const paymentUrl = await woocommerce.getPaymentUrl(order.id, order.order_key);
    
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        order_key: order.order_key,
        status: order.status,
        total: order.total,
        currency: order.currency
      },
      paymentUrl: paymentUrl
    });
  } catch (error: any) {
    console.error('[API Route] Order creation error:', error);
    console.error('[API Route] Error stack:', error.stack);
    
    // Return more specific error information
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to create order',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}