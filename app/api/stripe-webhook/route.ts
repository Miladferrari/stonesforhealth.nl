import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

/**
 * Initialize Stripe with the secret key from environment variables
 * Using the same API version as the intent route for consistency
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15' as Stripe.LatestApiVersion,
});

// Webhook endpoint secret for signature verification
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// WooCommerce API configuration
const WC_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || '';

/**
 * Type definition for order status update
 */
type OrderStatus = 'processing' | 'failed' | 'completed' | 'cancelled';

/**
 * Updates the WooCommerce order status based on Stripe payment events
 * @param orderId - The WooCommerce order ID
 * @param status - The new order status
 * @param transactionId - Optional Stripe transaction/charge ID for reference
 */
async function updateOrderStatus(
  orderId: string, 
  status: OrderStatus, 
  transactionId?: string
): Promise<void> {
  try {
    // Prepare the update payload
    const updateData: any = {
      status: status,
    };

    // Add transaction reference if provided
    if (transactionId) {
      updateData.transaction_id = transactionId;
      updateData.meta_data = [
        {
          key: '_stripe_charge_id',
          value: transactionId,
        },
        {
          key: '_payment_method',
          value: 'stripe',
        },
        {
          key: '_payment_completed_at',
          value: new Date().toISOString(),
        },
      ];
    }

    // Make authenticated request to WooCommerce
    const endpoint = `${WC_URL}/wp-json/wc/v3/orders/${orderId}`;
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64'),
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`WooCommerce API error: ${response.status} - ${errorText}`);
    }

    const updatedOrder = await response.json();
    console.log(`Successfully updated order ${orderId} to status: ${status}`);
    
  } catch (error) {
    console.error(`Failed to update order ${orderId} status:`, error);
    // Don't throw - we want to return 200 to Stripe even if WooCommerce update fails
    // This prevents Stripe from retrying the webhook unnecessarily
  }
}

/**
 * POST /api/stripe-webhook
 * Handles incoming Stripe webhook events
 */
export async function POST(request: NextRequest) {
  // Step 1: Read the raw request body and signature header
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  // Validate signature header is present
  if (!signature) {
    console.error('Webhook Error: No stripe-signature header present');
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  // Validate endpoint secret is configured
  if (!endpointSecret) {
    console.error('Webhook Error: STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json(
      { error: 'Webhook endpoint not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    // Step 2: Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      endpointSecret
    );
    
    console.log(`Webhook received: ${event.type} - ${event.id}`);
    
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  // Step 3: Handle the event based on type
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        // Payment was successful
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata.orderId || paymentIntent.metadata.order_id;
        
        if (orderId) {
          console.log(`Processing successful payment for order ${orderId}`);
          
          // Update order status to processing (ready for fulfillment)
          await updateOrderStatus(
            orderId,
            'processing',
            paymentIntent.id
          );
          
          // Log additional payment details for debugging
          console.log(`Payment details - Amount: ${paymentIntent.amount/100} ${paymentIntent.currency.toUpperCase()}, Customer: ${paymentIntent.metadata.customerEmail}`);
        } else {
          console.warn('PaymentIntent succeeded but no orderId found in metadata');
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        // Payment failed
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        const failedOrderId = failedPaymentIntent.metadata.orderId || failedPaymentIntent.metadata.order_id;
        
        if (failedOrderId) {
          console.log(`Processing failed payment for order ${failedOrderId}`);
          
          // Update order status to failed
          await updateOrderStatus(
            failedOrderId,
            'failed'
          );
          
          // Log failure reason for debugging
          const lastError = failedPaymentIntent.last_payment_error;
          console.log(`Payment failure reason: ${lastError?.message || 'Unknown error'}`);
        } else {
          console.warn('PaymentIntent failed but no orderId found in metadata');
        }
        break;
      }

      case 'charge.succeeded': {
        // Charge succeeded (additional confirmation)
        const charge = event.data.object as Stripe.Charge;
        const chargeOrderId = charge.metadata.orderId || charge.metadata.order_id;
        
        if (chargeOrderId) {
          console.log(`Charge succeeded for order ${chargeOrderId}`);
          
          // Update with charge ID (this provides additional payment reference)
          await updateOrderStatus(
            chargeOrderId,
            'processing',
            charge.id
          );
        }
        break;
      }

      case 'charge.failed': {
        // Charge failed
        const failedCharge = event.data.object as Stripe.Charge;
        const failedChargeOrderId = failedCharge.metadata.orderId || failedCharge.metadata.order_id;
        
        if (failedChargeOrderId) {
          console.log(`Charge failed for order ${failedChargeOrderId}`);
          
          await updateOrderStatus(
            failedChargeOrderId,
            'failed'
          );
        }
        break;
      }

      case 'payment_method.attached': {
        // Payment method was attached to a customer
        console.log('Payment method attached to customer');
        break;
      }

      default:
        // Log unhandled events for monitoring
        console.log(`Unhandled webhook event type: ${event.type}`);
    }

    // Step 4: Return 200 response to acknowledge receipt
    return NextResponse.json(
      { 
        received: true,
        type: event.type,
        id: event.id,
      },
      { status: 200 }
    );

  } catch (error: any) {
    // Log the error but still return 200 to prevent Stripe retries
    console.error('Error processing webhook:', error);
    
    // Return 200 to acknowledge receipt even if processing failed
    // This prevents Stripe from retrying and potentially creating duplicate orders
    return NextResponse.json(
      { 
        received: true,
        error: 'Processing error occurred but webhook was received',
      },
      { status: 200 }
    );
  }
}

/**
 * Stripe requires webhook endpoints to be POST only
 * Return 405 Method Not Allowed for other HTTP methods
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}