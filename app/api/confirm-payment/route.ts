import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getOrderWithKey } from '@/lib/order-security';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
});

/**
 * Tells the thank-you page how the payment went.
 * This route is read-only: the order status itself is only changed by the Stripe webhook.
 */
export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, orderId, orderKey } = await request.json();

    if (!paymentIntentId || !orderId || !orderKey) {
      return NextResponse.json(
        { error: 'Missing payment intent ID, order ID or order key' },
        { status: 400 }
      );
    }

    const order = await getOrderWithKey(orderId, orderKey);
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const intentOrderId = paymentIntent.metadata?.orderId || paymentIntent.metadata?.order_id;
    if (String(intentOrderId) !== String(order.id)) {
      return NextResponse.json(
        { success: false, error: 'Payment does not belong to this order' },
        { status: 400 }
      );
    }

    if (paymentIntent.status === 'succeeded') {
      return NextResponse.json({
        success: true,
        status: 'succeeded',
        message: 'Payment confirmed successfully'
      });
    } else if (paymentIntent.status === 'processing') {
      return NextResponse.json({
        success: true,
        status: 'processing',
        message: 'Payment is being processed'
      });
    } else if (paymentIntent.status === 'requires_payment_method') {
      return NextResponse.json({
        success: false,
        status: 'requires_payment_method',
        message: 'Payment requires a payment method'
      });
    } else {
      return NextResponse.json({
        success: false,
        status: paymentIntent.status,
        message: 'Payment not completed'
      });
    }

  } catch (error: any) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to confirm payment'
      },
      { status: 500 }
    );
  }
}
