import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia' as any,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, currency = 'eur', metadata = {} } = body;

    console.log('[Stripe Intent] Creating payment intent for order:', orderId);

    // Validate order ID
    if (!orderId || orderId === 0) {
      return NextResponse.json(
        { error: 'Valid order ID is required' },
        { status: 400 }
      );
    }

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        order_id: orderId.toString(),
        ...metadata
      },
    });

    console.log('[Stripe Intent] Payment intent created:', paymentIntent.id);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });

  } catch (error: any) {
    console.error('[Stripe Intent] Error:', error);

    // Handle Stripe-specific errors
    if (error.type === 'StripeCardError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}