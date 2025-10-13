import { NextResponse } from 'next/server';
import { storeAPI } from '@/lib/woocommerce-store';

export async function POST() {
  try {
    // Test adding product ID 89 to cart (valid product)
    const cart = await storeAPI.addToCart(89, 1);

    return NextResponse.json({
      success: true,
      message: 'Product added to cart!',
      cart: {
        items_count: cart.items_count,
        items: cart.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.prices.price
        })),
        totals: {
          subtotal: cart.totals.total_items,
          tax: cart.totals.total_tax,
          shipping: cart.totals.total_shipping,
          total: cart.totals.total_price,
          currency: cart.totals.currency_code
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to add to cart'
    }, { status: 500 });
  }
}