import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { woocommerce } from '@/lib/woocommerce';

/**
 * Initialize Stripe with the secret key from environment variables
 * Using the latest stable API version for consistency
 */
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';


// Check if Stripe key is valid (not truncated or placeholder)
const isValidStripeKey = stripeSecretKey &&
  stripeSecretKey.startsWith('sk_') &&
  stripeSecretKey.length > 50;  // Real keys are typically 100+ chars

const stripe = isValidStripeKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2022-11-15' as Stripe.LatestApiVersion,
}) : null;

/**
 * Type definition for WooCommerce order response
 */
interface WooCommerceOrder {
  id: number;
  number: string;
  order_key: string;
  total: string;
  currency: string;
  billing: {
    email: string;
    first_name: string;
    last_name: string;
  };
  status: string;
}

/**
 * Fetches order details from WooCommerce REST API using the woocommerce library
 * @param orderId - The WooCommerce order ID
 * @returns The order object with total amount and details
 */
async function getOrderTotal(orderId: string): Promise<WooCommerceOrder> {
  try {
    console.log('Fetching order from WooCommerce using library, order ID:', orderId);
    
    // Use the same woocommerce library that create-order uses
    const order = await woocommerce.getOrder(parseInt(orderId));
    
    console.log('Successfully fetched order using library:', {
      id: order.id,
      total: order.total,
      status: order.status
    });
    
    return order as WooCommerceOrder;
  } catch (error) {
    console.error('Error fetching order from WooCommerce:', error);
    throw new Error('Failed to fetch order details');
  }
}

/**
 * Updates WooCommerce order with Stripe payment intent ID
 * @param orderId - The WooCommerce order ID
 * @param paymentIntentId - The Stripe payment intent ID
 */
async function updateOrderWithPaymentIntent(orderId: string, paymentIntentId: string): Promise<void> {
  try {
    console.log('Updating order with payment intent ID:', paymentIntentId);
    
    // Use the woocommerce library to update the order
    await woocommerce.updateOrder(parseInt(orderId), {
      meta_data: [
        {
          key: '_stripe_intent_id',
          value: paymentIntentId,
        },
      ],
      transaction_id: paymentIntentId,
    });
    
    console.log('Successfully updated order with payment intent');
  } catch (error) {
    // Log error but don't fail the payment intent creation
    console.error('Error updating WooCommerce order with payment intent:', error);
  }
}

/**
 * POST /api/stripe-intent
 * Creates a Stripe PaymentIntent for the given order
 */
export async function POST(request: NextRequest) {
  let requestBody: any;
  
  try {
    // Parse request body only once
    requestBody = await request.json();
    console.log('stripe-intent called with body:', requestBody);
    
    const { orderId } = requestBody;

    // Validate that orderId is provided
    if (!orderId) {
      console.error('Missing orderId in request body');
      return NextResponse.json(
        { message: 'Missing orderId' },
        { status: 400 }
      );
    }

    // Check if Stripe is properly configured
    if (!stripe) {
      console.error('Stripe is not configured. Invalid or missing API key.');
      console.error('Current key status:', {
        hasKey: !!stripeSecretKey,
        keyStart: stripeSecretKey ? stripeSecretKey.substring(0, 7) : 'none',
        keyLength: stripeSecretKey ? stripeSecretKey.length : 0
      });

      return NextResponse.json(
        {
          message: 'Payment processing is not configured. Please contact support.',
          error: 'Invalid Stripe API key'
        },
        { status: 500 }
      );
    }

    // Log the orderId we're processing
    console.log(`Processing payment intent for order ID: ${orderId}`);
    
    // Fetch order details from WooCommerce
    let order: WooCommerceOrder;
    try {
      order = await getOrderTotal(orderId);
      console.log('Successfully fetched order:', {
        id: order.id,
        total: order.total,
        currency: order.currency,
        status: order.status
      });
    } catch (error: any) {
      console.error(`Failed to fetch order ${orderId}:`, error);
      return NextResponse.json(
        { message: 'Order not found or invalid total' },
        { status: 404 }
      );
    }

    // Validate order exists
    if (!order || !order.total) {
      console.error('Order validation failed:', { order, hasTotal: !!order?.total });
      return NextResponse.json(
        { message: 'Order not found or invalid total' },
        { status: 404 }
      );
    }

    // Convert order total from string to cents (Stripe uses smallest currency unit)
    const orderTotalInCents = Math.round(parseFloat(order.total) * 100);
    console.log('Order total for', orderId, '=', orderTotalInCents, 'cents');

    // Validate amount is positive
    if (orderTotalInCents <= 0 || isNaN(orderTotalInCents)) {
      console.error('Invalid order amount:', { 
        originalTotal: order.total,
        convertedCents: orderTotalInCents 
      });
      return NextResponse.json(
        { message: 'Order not found or invalid total' },
        { status: 404 }
      );
    }

    // Create Stripe PaymentIntent
    console.log('Creating Stripe PaymentIntent...');
    const paymentIntent = await stripe!.paymentIntents.create({
      amount: orderTotalInCents,
      currency: 'eur',
      payment_method_types: ['card', 'ideal', 'bancontact'],
      metadata: { 
        orderId: orderId.toString(),
        orderNumber: order.number || orderId.toString(),
        customerEmail: order.billing?.email || '',
      },
      description: `Order #${order.number || orderId} - ${order.billing?.email || 'Guest'}`,
    });

    console.log('PaymentIntent created successfully:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    });

    // Update WooCommerce order with payment intent ID (non-blocking)
    updateOrderWithPaymentIntent(orderId, paymentIntent.id).catch(err => {
      console.error('Failed to update WooCommerce order (non-blocking):', err);
    });

    // Return the client secret and publishable key
    const response = {
      clientSecret: paymentIntent.client_secret,
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    };
    
    console.log('Returning success response with clientSecret');
    return NextResponse.json(response);

  } catch (error: any) {
    console.error('Error in stripe-intent route:', {
      name: error.name,
      message: error.message,
      type: error.type,
      stack: error.stack,
      requestBody
    });

    // Handle specific Stripe errors
    if (error.type === 'StripeAuthenticationError') {
      return NextResponse.json(
        { message: 'Invalid Stripe API key' },
        { status: 401 }
      );
    }

    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { message: error.message || 'Invalid payment request' },
        { status: 400 }
      );
    }

    if (error.type === 'StripeRateLimitError') {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}