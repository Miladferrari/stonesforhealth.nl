import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, orderId } = await request.json();

    if (!paymentIntentId || !orderId) {
      return NextResponse.json(
        { error: 'Missing payment intent ID or order ID' },
        { status: 400 }
      );
    }

    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Check payment status
    if (paymentIntent.status === 'succeeded') {
      // Update WooCommerce order status to processing
      const wooCommerceUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;
      const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
      const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

      if (wooCommerceUrl && consumerKey && consumerSecret) {
        try {
          // Update order status in WooCommerce
          const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
          const updateResponse = await fetch(
            `${wooCommerceUrl}/wp-json/wc/v3/orders/${orderId}`,
            {
              method: 'PUT',
              headers: {
                'Authorization': `Basic ${authString}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                status: 'processing',
                transaction_id: paymentIntent.id,
                payment_method: paymentIntent.payment_method_types[0],
                payment_method_title: paymentIntent.payment_method_types[0].toUpperCase(),
                paid: true,
              }),
            }
          );

          if (!updateResponse.ok) {
            console.error('Failed to update WooCommerce order:', await updateResponse.text());
          }
        } catch (wooError) {
          console.error('WooCommerce update error:', wooError);
        }
      }

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
        error: error.message || 'Failed to confirm payment'
      },
      { status: 500 }
    );
  }
}