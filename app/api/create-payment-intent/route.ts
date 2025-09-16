import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'eur', paymentMethod, orderId, customerEmail } = await request.json();

    if (!amount || !paymentMethod || !orderId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      payment_method_types: paymentMethodTypes,
      metadata: {
        orderId: orderId.toString(),
      },
      receipt_email: customerEmail,
      description: `Order #${orderId} - Stones for Health`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error: any) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}