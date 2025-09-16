import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

/**
 * Test endpoint to manually update order status
 * This helps verify if the WooCommerce API integration is working
 */
export async function POST(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Order ID and status are required' },
        { status: 400 }
      );
    }

    console.log(`[Test Update] Attempting to update order ${orderId} to status: ${status}`);

    // Update order in WooCommerce
    const updatedOrder = await woocommerce.updateOrder(orderId, {
      status: status,
      meta_data: [
        {
          key: '_payment_completed_at',
          value: new Date().toISOString()
        },
        {
          key: '_updated_via',
          value: 'test_endpoint'
        }
      ]
    });

    if (!updatedOrder || updatedOrder.code === 'woocommerce_rest_shop_order_invalid_id') {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Add a note to the order
    try {
      await woocommerce.createOrderNote(orderId, {
        note: `Order status manually updated to ${status} via test endpoint`,
        customer_note: false
      });
    } catch (noteError) {
      console.error('Failed to add order note:', noteError);
    }

    console.log(`[Test Update] Successfully updated order ${orderId} to ${status}`);

    return NextResponse.json({
      success: true,
      orderId: updatedOrder.id,
      status: updatedOrder.status,
      message: `Order ${orderId} updated to ${status}`,
      orderDetails: {
        number: updatedOrder.number,
        total: updatedOrder.total,
        currency: updatedOrder.currency,
        date_modified: updatedOrder.date_modified
      }
    });

  } catch (error: any) {
    console.error('[Test Update] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to update order status',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check current order status
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const order = await woocommerce.getOrder(orderId);

    if (!order || order.code === 'woocommerce_rest_shop_order_invalid_id') {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      total: order.total,
      currency: order.currency,
      payment_method: order.payment_method,
      payment_method_title: order.payment_method_title,
      transaction_id: order.transaction_id,
      date_created: order.date_created,
      date_modified: order.date_modified,
      meta_data: order.meta_data
    });

  } catch (error: any) {
    console.error('[Test Update] Error fetching order:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch order',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}