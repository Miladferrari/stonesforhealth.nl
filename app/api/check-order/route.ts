import { NextRequest, NextResponse } from 'next/server';
import { fetchFromWooCommerce } from '@/lib/woocommerce';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Fetch order from WooCommerce
    const order = await fetchFromWooCommerce(`orders/${orderId}`);

    if (!order || order.code === 'woocommerce_rest_shop_order_invalid_id') {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Return order details
    return NextResponse.json({
      id: order.id,
      status: order.status,
      total: order.total,
      currency: order.currency,
      payment_method: order.payment_method,
      payment_method_title: order.payment_method_title,
      date_created: order.date_created,
      billing: {
        first_name: order.billing.first_name,
        last_name: order.billing.last_name,
        email: order.billing.email,
        phone: order.billing.phone,
        address_1: order.billing.address_1,
        city: order.billing.city,
        postcode: order.billing.postcode,
        country: order.billing.country
      },
      shipping: {
        first_name: order.shipping.first_name,
        last_name: order.shipping.last_name,
        address_1: order.shipping.address_1,
        city: order.shipping.city,
        postcode: order.shipping.postcode,
        country: order.shipping.country
      },
      line_items: order.line_items?.map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total
      })),
      shipping_lines: order.shipping_lines?.map((line: any) => ({
        method_title: line.method_title,
        total: line.total
      })),
      coupon_lines: order.coupon_lines?.map((coupon: any) => ({
        code: coupon.code,
        discount: coupon.discount
      }))
    });

  } catch (error) {
    console.error('Error checking order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check order status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Fetch order from WooCommerce
    const order = await fetchFromWooCommerce(`orders/${orderId}`);

    if (!order || order.code === 'woocommerce_rest_shop_order_invalid_id') {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if payment is completed
    const isPaid = ['processing', 'completed'].includes(order.status);

    // Return in the format expected by thank-you page
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        status: order.status,
        isPaid,
        total: order.total,
        currency: order.currency,
        orderNumber: order.number || order.id,
        customer: {
          first_name: order.billing.first_name,
          last_name: order.billing.last_name,
          email: order.billing.email,
          phone: order.billing.phone,
          address_1: order.billing.address_1,
          address_2: order.billing.address_2 || '',
          city: order.billing.city,
          postcode: order.billing.postcode,
          country: order.billing.country
        },
        items: order.line_items?.map((item: any) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
          images: item.image ? [{ src: item.image.src }] : []
        })) || [],
        shipping_method: order.shipping_lines?.[0]?.method_title || 'Standaard verzending',
        shipping_total: order.shipping_total || '0',
        coupon: order.coupon_lines?.[0] ? {
          code: order.coupon_lines[0].code,
          discount: order.coupon_lines[0].discount
        } : null
      }
    });

  } catch (error) {
    console.error('Error checking order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check order' },
      { status: 500 }
    );
  }
}