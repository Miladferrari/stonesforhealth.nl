import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  try {
    const { sessionId, orderId } = await request.json();

    if (!sessionId || !orderId) {
      return NextResponse.json(
        { error: 'Missing session ID or order ID' },
        { status: 400 }
      );
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check payment status
    const paymentStatus = session.payment_status;

    if (paymentStatus === 'paid') {
      // Update WooCommerce order status to processing
      const wooCommerceUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;
      const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
      const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

      if (!wooCommerceUrl || !consumerKey || !consumerSecret) {
        console.error('WooCommerce credentials not configured');
        // Still return success if payment is complete
        return NextResponse.json({
          success: true,
          status: 'paid',
          message: 'Payment verified successfully'
        });
      }

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
              transaction_id: session.payment_intent,
              payment_method: session.payment_method_types[0],
              payment_method_title: session.payment_method_types[0].toUpperCase(),
              paid: true,
            }),
          }
        );

        if (!updateResponse.ok) {
          console.error('Failed to update WooCommerce order:', await updateResponse.text());
        }
      } catch (wooError) {
        console.error('WooCommerce update error:', wooError);
        // Don't fail the whole request if WooCommerce update fails
      }

      return NextResponse.json({
        success: true,
        status: 'paid',
        message: 'Payment verified and order updated successfully'
      });

    } else if (paymentStatus === 'unpaid') {
      return NextResponse.json({
        success: false,
        status: 'unpaid',
        message: 'Payment not completed'
      });
    } else {
      return NextResponse.json({
        success: false,
        status: paymentStatus,
        message: 'Payment status unknown'
      });
    }

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to verify payment'
      },
      { status: 500 }
    );
  }
}