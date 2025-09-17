import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
});

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount, currency, paymentMethod, customerEmail, returnUrl } = await request.json();

    if (!orderId || !amount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a payment session based on the payment method
    if (paymentMethod === 'ideal') {
      // Create a Stripe checkout session for iDEAL
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['ideal'],
        mode: 'payment',
        success_url: `${returnUrl || process.env.NEXT_PUBLIC_URL}/thank-you?order=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${returnUrl || process.env.NEXT_PUBLIC_URL}/checkout/payment?orderId=${orderId}&total=${amount}`,
        metadata: {
          orderId: orderId.toString(),
        },
        line_items: [
          {
            price_data: {
              currency: currency || 'eur',
              product_data: {
                name: `Order #${orderId}`,
                description: 'Stones for Health bestelling',
              },
              unit_amount: Math.round(amount * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        customer_email: customerEmail,
      });

      return NextResponse.json({
        url: session.url,
        sessionId: session.id,
      });

    } else if (paymentMethod === 'bancontact') {
      // Create a Stripe checkout session for Bancontact
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['bancontact'],
        mode: 'payment',
        success_url: `${returnUrl || process.env.NEXT_PUBLIC_URL}/thank-you?order=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${returnUrl || process.env.NEXT_PUBLIC_URL}/checkout/payment?orderId=${orderId}&total=${amount}`,
        metadata: {
          orderId: orderId.toString(),
        },
        line_items: [
          {
            price_data: {
              currency: currency || 'eur',
              product_data: {
                name: `Order #${orderId}`,
                description: 'Stones for Health bestelling',
              },
              unit_amount: Math.round(amount * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        customer_email: customerEmail,
      });

      return NextResponse.json({
        url: session.url,
        sessionId: session.id,
      });

    } else if (paymentMethod === 'card') {
      // Create a Stripe checkout session for card payments
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${returnUrl || process.env.NEXT_PUBLIC_URL}/thank-you?order=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${returnUrl || process.env.NEXT_PUBLIC_URL}/checkout/payment?orderId=${orderId}&total=${amount}`,
        metadata: {
          orderId: orderId.toString(),
        },
        line_items: [
          {
            price_data: {
              currency: currency || 'eur',
              product_data: {
                name: `Order #${orderId}`,
                description: 'Stones for Health bestelling',
              },
              unit_amount: Math.round(amount * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        customer_email: customerEmail,
        billing_address_collection: 'required',
      });

      return NextResponse.json({
        url: session.url,
        sessionId: session.id,
      });

    } else {
      return NextResponse.json(
        { error: 'Unsupported payment method' },
        { status: 400 }
      );
    }

  } catch (error: any) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process payment' },
      { status: 500 }
    );
  }
}