import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendMail, isMailConfigured } from '@/lib/mail';
import { woocommerce } from '@/lib/woocommerce';
import { fulfilPaidOrder, updateOrderStatus } from '@/lib/order-fulfilment';
import { OrderRecoveryEmail } from '@/app/emails/OrderRecovery';
import { brutoStukprijs } from '@/lib/orderAmounts';

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
const WC_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || process.env.WOOCOMMERCE_URL || '';
const WC_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

// Log configuration status (remove in production)
console.log('[Webhook] WooCommerce URL configured:', WC_URL ? 'Yes' : 'No');
console.log('[Webhook] WooCommerce credentials configured:', WC_CONSUMER_KEY && WC_CONSUMER_SECRET ? 'Yes' : 'No');

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

          const result = await fulfilPaidOrder(paymentIntent, orderId);

          // A paid order must never silently stay pending: let Stripe retry the event
          if (result === 'update-failed') {
            return NextResponse.json(
              { error: 'Order update failed, please retry' },
              { status: 500 }
            );
          }

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

          // A failed retry attempt must not downgrade an order that was paid through another attempt
          const currentOrder = await woocommerce.getOrder(failedOrderId).catch(() => null);
          if (!currentOrder?.id || !['pending', 'failed'].includes(currentOrder.status)) {
            console.log(`[Webhook] Order ${failedOrderId} is not awaiting payment, ignoring failed attempt`);
            break;
          }

          // Update order status to failed
          await updateOrderStatus(
            failedOrderId,
            'failed'
          );

          // Stuur direct een failed order email
          try {
            const endpoint = `${WC_URL}/orders/${failedOrderId}`;
            const response = await fetch(endpoint, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64'),
              },
            });

            if (response.ok) {
              const orderData = await response.json();
              const customerEmail = failedPaymentIntent.metadata.customerEmail || orderData.billing?.email;

              if (customerEmail) {
                // Stuur failed order email DIRECT
                if (isMailConfigured()) {
                  // Inclusief btw; WooCommerce levert regelbedragen exclusief.
                  const items = orderData.line_items.map((item: any) => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: brutoStukprijs(item).toFixed(2),
                  }));

                  const total = parseFloat(orderData.total).toFixed(2);
                  const customerName = orderData.billing.first_name || 'Klant';
                  const checkoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`;

                  const emailHtml = OrderRecoveryEmail({
                    customerName,
                    orderNumber: orderData.number.toString(),
                    items,
                    total,
                    checkoutUrl,
                  });

                  await sendMail({
                    to: customerEmail,
                    subject: '❌ Betaling mislukt - Probeer opnieuw | Stones for Health',
                    html: emailHtml,
                  });

                  console.log(`[Failed Order] Email sent to ${customerEmail} for order ${failedOrderId}`);
                }
              }
            }
          } catch (error) {
            console.error(`[Failed Order] Failed to send email for order ${failedOrderId}:`, error);
          }

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
          // Order status is only set by payment_intent.succeeded, where the amount is verified
          console.log(`Charge succeeded for order ${chargeOrderId}`);
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