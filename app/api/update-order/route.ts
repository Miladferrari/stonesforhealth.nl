import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

/**
 * POST /api/update-order
 * Updates an existing WooCommerce order with new cart data
 */
export async function POST(request: NextRequest) {
  try {
    const { orderId, updateData } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    console.log(`Updating order ${orderId} with new data:`, updateData);

    // First, get the existing order
    const existingOrder = await woocommerce.getOrder(orderId);

    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Only update if order is still in pending status
    if (existingOrder.status !== 'pending') {
      console.log(`Order ${orderId} is not pending (status: ${existingOrder.status}), skipping update`);
      return NextResponse.json({
        success: true,
        message: 'Order is not in pending status, no update needed',
        order: existingOrder
      });
    }

    // Update the order with new data
    const updatedOrder = await woocommerce.updateOrder(orderId, updateData);

    console.log(`Successfully updated order ${orderId}`);

    return NextResponse.json({
      success: true,
      order: updatedOrder
    });

  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      {
        error: 'Failed to update order',
        details: error.message
      },
      { status: 500 }
    );
  }
}