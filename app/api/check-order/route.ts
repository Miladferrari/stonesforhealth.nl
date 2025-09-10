import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';

async function handleOrderCheck(orderId: string | null, orderKey: string | null) {
  if (!orderId) {
    return NextResponse.json(
      { error: 'Order ID is required' },
      { status: 400 }
    );
  }
  
  console.log('[API Route] Checking order status for ID:', orderId);
  
  try {
    // Get order details
    const order = await woocommerce.getOrder(parseInt(orderId));
    
    // Verify order key if provided
    if (orderKey && order.order_key !== orderKey) {
      return NextResponse.json(
        { error: 'Invalid order key' },
        { status: 403 }
      );
    }
    
    // Include all needed fields for the thank you page
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        status: order.status,
        total: order.total,
        currency: order.currency,
        payment_method: order.payment_method,
        payment_method_title: order.payment_method_title,
        date_created: order.date_created,
        customer: {
          email: order.billing?.email || '',
          first_name: order.billing?.first_name || '',
          last_name: order.billing?.last_name || '',
          address_1: order.billing?.address_1 || '',
          city: order.billing?.city || '',
          postcode: order.billing?.postcode || ''
        },
        items: order.line_items?.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })) || []
      }
    });
  } catch (error: any) {
    console.error('[API Route] Order check error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to check order status'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get('orderId');
  const orderKey = searchParams.get('key');
  
  return handleOrderCheck(orderId, orderKey);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { orderId, orderKey } = body;
  
  return handleOrderCheck(orderId, orderKey || null);
}