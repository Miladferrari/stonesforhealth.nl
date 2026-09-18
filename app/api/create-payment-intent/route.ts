import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getOrderWithKey, orderTotalInCents } from '@/lib/order-security';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
});

// Orders in these statuses are still awaiting payment
const PAYABLE_STATUSES = ['pending', 'failed'];

export async function POST(request: NextRequest) {
  try {
    const { paymentMethod, orderId, orderKey } = await request.json();

    if (!paymentMethod || !orderId || !orderKey) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // The amount is never taken from the client: the WooCommerce order is the source of truth
    const order = await getOrderWithKey(orderId, orderKey);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    if (!PAYABLE_STATUSES.includes(order.status)) {
      return NextResponse.json(
        { error: 'Deze bestelling kan niet (meer) betaald worden' },
        { status: 409 }
      );
    }

    const amount = orderTotalInCents(order);
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid order total' },
        { status: 400 }
      );
    }

    // Create payment intent with specific payment method types
    const paymentMethodTypes = paymentMethod === 'card'
      ? ['card']
      : paymentMethod === 'ideal'
      ? ['ideal']
      : paymentMethod === 'bancontact'
      ? ['bancontact']
      : ['card'];

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: String(order.currency).toLowerCase(),
      payment_method_types: paymentMethodTypes,
      metadata: {
        orderId: order.id.toString(),
      },
      receipt_email: order.billing?.email || undefined,
      description: `Order #${order.id} - Stones for Health`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error: any) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
