import { NextResponse } from 'next/server';
import { storeAPI } from '@/lib/woocommerce-store';

export async function GET() {
  try {
    // Test getting the cart from Store API
    const cart = await storeAPI.getCart();

    return NextResponse.json({
      success: true,
      message: 'Store API is working!',
      cart: {
        items_count: cart.items_count,
        needs_payment: cart.needs_payment,
        needs_shipping: cart.needs_shipping,
        totals: cart.totals
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to connect to Store API'
    }, { status: 500 });
  }
}