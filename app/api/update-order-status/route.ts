import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status, paymentIntentId } = body;
    
    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Order ID and status are required' },
        { status: 400 }
      );
    }
    
    console.log(`[API Route] Updating order ${orderId} status to: ${status}`);
    
    // Prepare update data
    const updateData: any = {
      status: status,
    };
    
    // Add payment details if payment succeeded
    if (status === 'processing' && paymentIntentId) {
      updateData.transaction_id = paymentIntentId;
      updateData.meta_data = [
        {
          key: '_stripe_intent_id',
          value: paymentIntentId,
        },
        {
          key: '_payment_completed_at',
          value: new Date().toISOString(),
        }
      ];
    }
    
    // Update order in WooCommerce
    const updatedOrder = await woocommerce.updateOrder(parseInt(orderId), updateData);
    
    console.log(`[API Route] Successfully updated order ${orderId} to status: ${status}`);
    
    return NextResponse.json({
      success: true,
      order: {
        id: updatedOrder.id,
        status: updatedOrder.status,
        transaction_id: updatedOrder.transaction_id
      }
    });
    
  } catch (error: any) {
    console.error('[API Route] Order status update error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to update order status'
      },
      { status: 500 }
    );
  }
}