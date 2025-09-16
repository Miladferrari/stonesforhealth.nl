import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      formData,
      items,
      shippingRate,
      couponCode,
      totals
    } = body;

    console.log('[Create Order] Processing order with data:', {
      itemCount: items.length,
      shipping: shippingRate,
      coupon: couponCode,
      total: totals.total
    });

    // Prepare line items for WooCommerce
    const lineItems = items.map((item: any) => ({
      product_id: item.product.id,
      quantity: item.quantity,
      subtotal: (parseFloat(item.product.price) * item.quantity).toString(),
      total: (parseFloat(item.product.price) * item.quantity).toString()
    }));

    // Prepare order data for WooCommerce
    const orderData = {
      payment_method: 'stripe',
      payment_method_title: 'Credit Card (Stripe)',
      status: 'pending',
      currency: 'EUR',
      billing: {
        first_name: formData.billingAddressSame ? formData.firstName : formData.billingFirstName,
        last_name: formData.billingAddressSame ? formData.lastName : formData.billingLastName,
        address_1: formData.billingAddressSame ? formData.address : formData.billingAddress,
        address_2: formData.billingAddressSame ? formData.address2 : formData.billingAddress2,
        city: formData.billingAddressSame ? formData.city : formData.billingCity,
        postcode: formData.billingAddressSame ? formData.postcode : formData.billingPostcode,
        country: formData.billingAddressSame ? formData.country : formData.billingCountry,
        email: formData.email,
        phone: formData.phone || '',
        company: formData.company || '',
        state: ''
      },
      shipping: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        address_2: formData.address2 || '',
        city: formData.city,
        postcode: formData.postcode,
        country: formData.country,
        company: formData.company || '',
        state: ''
      },
      line_items: lineItems,
      shipping_lines: shippingRate ? [{
        method_id: shippingRate.method_id,
        method_title: shippingRate.method_title,
        total: shippingRate.cost.toString()
      }] : [],
      coupon_lines: couponCode ? [{
        code: couponCode
      }] : [],
      customer_note: formData.orderNotes || '',
      meta_data: [
        {
          key: '_stripe_payment_intent',
          value: ''
        }
      ]
    };

    console.log('[Create Order] Creating WooCommerce order:', orderData);

    // Create the order in WooCommerce
    const order = await woocommerce.createOrder(orderData);

    console.log('[Create Order] Order created successfully:', {
      id: order.id,
      order_key: order.order_key,
      status: order.status,
      total: order.total
    });

    // Return order details
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        order_key: order.order_key,
        status: order.status,
        total: order.total,
        currency: order.currency
      }
    });

  } catch (error: any) {
    console.error('[Create Order] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create order',
        details: error.response?.data || error
      },
      { status: 500 }
    );
  }
}