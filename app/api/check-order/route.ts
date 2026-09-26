import { NextRequest, NextResponse } from 'next/server';
import { getOrderWithKey } from '@/lib/order-security';
import { brutoRegel, brutoStukprijs, brutoVerzending, brutoKorting, brutoSubtotaal, btwBedrag, totalenKloppen } from '@/lib/orderAmounts';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('orderId');
    const orderKey = searchParams.get('key');

    if (!orderId || !orderKey) {
      return NextResponse.json(
        { success: false, error: 'Order ID and key are required' },
        { status: 400 }
      );
    }

    // Order details contain personal data: only return them to someone who knows the order key
    const order = await getOrderWithKey(orderId, orderKey);

    if (!order) {
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
      // Bedragen inclusief btw: WooCommerce levert ze exclusief.
      line_items: order.line_items?.map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: brutoStukprijs(item).toFixed(2),
        total: brutoRegel(item).toFixed(2)
      })),
      shipping_lines: order.shipping_lines?.map((line: any) => ({
        method_title: line.method_title,
        total: brutoVerzending(order).toFixed(2)
      })),
      coupon_lines: order.coupon_lines?.map((coupon: any) => ({
        code: coupon.code,
        discount: brutoKorting(order).toFixed(2)
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
    const { orderId, orderKey } = await request.json();

    if (!orderId || !orderKey) {
      return NextResponse.json(
        { success: false, error: 'Order ID and key are required' },
        { status: 400 }
      );
    }

    const order = await getOrderWithKey(orderId, orderKey);

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if payment is completed
    const isPaid = ['processing', 'completed'].includes(order.status);

    if (!totalenKloppen(order)) {
      console.error(
        `[check-order] Totalen van order ${order.number || order.id} sluiten niet aan: ` +
        `subtotaal ${brutoSubtotaal(order).toFixed(2)} - korting ${brutoKorting(order).toFixed(2)} ` +
        `+ verzending ${brutoVerzending(order).toFixed(2)} != totaal ${order.total}`
      );
    }

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
        // Bedragen inclusief btw: WooCommerce levert ze exclusief.
        items: order.line_items?.map((item: any) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: brutoStukprijs(item).toFixed(2),
          total: brutoRegel(item).toFixed(2),
          images: item.image ? [{ src: item.image.src }] : []
        })) || [],
        shipping_method: order.shipping_lines?.[0]?.method_title || 'Standaard verzending',
        shipping_total: brutoVerzending(order).toFixed(2),
        subtotal: brutoSubtotaal(order).toFixed(2),
        tax: btwBedrag(order).toFixed(2),
        coupon: order.coupon_lines?.[0] ? {
          code: order.coupon_lines[0].code,
          discount: brutoKorting(order).toFixed(2)
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