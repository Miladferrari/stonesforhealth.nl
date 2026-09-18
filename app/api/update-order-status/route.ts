import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';
import { getOrderWithKey } from '@/lib/order-security';

// A customer may only give up on their own unpaid order.
// Every other status change (processing, completed, refunded, ...) comes from the
// Stripe webhook or the WooCommerce admin, never from the browser.
const CUSTOMER_ALLOWED_STATUSES = ['cancelled', 'failed'];
const UNPAID_STATUSES = ['pending', 'failed'];

export async function POST(request: NextRequest) {
  try {
    const { orderId, orderKey, status, note } = await request.json();

    // Validate required fields
    if (!orderId || !orderKey || !status) {
      return NextResponse.json(
        { error: 'Order ID, order key and status are required' },
        { status: 400 }
      );
    }

    if (!CUSTOMER_ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: 'Status not allowed' },
        { status: 403 }
      );
    }

    const order = await getOrderWithKey(orderId, orderKey);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    if (!UNPAID_STATUSES.includes(order.status)) {
      return NextResponse.json(
        { error: 'Order can no longer be changed' },
        { status: 409 }
      );
    }

    const updatedOrder = await woocommerce.updateOrder(order.id, { status });

    // Add order note if provided
    if (note) {
      try {
        await woocommerce.createOrderNote(order.id, {
          note: String(note).slice(0, 500),
          customer_note: false
        });
      } catch (noteError) {
        console.error('Failed to add order note:', noteError);
        // Continue even if note fails
      }
    }

    console.log(`[Order Status Update] Order ${order.id} updated to ${status}`);

    return NextResponse.json({
      success: true,
      orderId: updatedOrder.id,
      status: updatedOrder.status,
      message: `Order status updated to ${status}`,
      orderNumber: updatedOrder.number || updatedOrder.id
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}
