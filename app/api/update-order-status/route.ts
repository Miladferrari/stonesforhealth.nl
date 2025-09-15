import { NextRequest, NextResponse } from 'next/server';
import { fetchFromWooCommerce } from '@/lib/woocommerce';

// Valid WooCommerce order statuses
const VALID_STATUSES = [
  'pending',
  'processing',
  'on-hold',
  'completed',
  'cancelled',
  'refunded',
  'failed'
];

export async function POST(request: NextRequest) {
  try {
    const { orderId, status, note, transactionId } = await request.json();

    // Validate required fields
    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Order ID and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {
      status
    };

    // Add transaction ID if provided (for payment confirmations)
    if (transactionId) {
      updateData.transaction_id = transactionId;
      updateData.meta_data = [
        {
          key: '_stripe_payment_intent',
          value: transactionId
        }
      ];
    }

    // Update order in WooCommerce
    const updatedOrder = await fetchFromWooCommerce(
      `orders/${orderId}`,
      {
        method: 'PUT',
        body: JSON.stringify(updateData)
      }
    );

    if (!updatedOrder || updatedOrder.code === 'woocommerce_rest_shop_order_invalid_id') {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Add order note if provided
    if (note) {
      try {
        await fetchFromWooCommerce(
          `orders/${orderId}/notes`,
          {
            method: 'POST',
            body: JSON.stringify({
              note: note,
              customer_note: false
            })
          }
        );
      } catch (noteError) {
        console.error('Failed to add order note:', noteError);
        // Continue even if note fails
      }
    }

    // Log status update
    console.log(`[Order Status Update] Order ${orderId} updated to ${status}`);

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

// GET endpoint to check current order status
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

    // Fetch order from WooCommerce
    const order = await fetchFromWooCommerce(`orders/${orderId}`);

    if (!order || order.code === 'woocommerce_rest_shop_order_invalid_id') {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      transactionId: order.transaction_id,
      total: order.total,
      currency: order.currency,
      dateModified: order.date_modified
    });

  } catch (error) {
    console.error('Error fetching order status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order status' },
      { status: 500 }
    );
  }
}