import { NextRequest, NextResponse } from 'next/server';
import { storeAPI } from '@/lib/woocommerce-store';
import { woocommerce } from '@/lib/woocommerce';

export async function POST(request: NextRequest) {
  try {
    const {
      formData,
      shippingMethod,
      paymentMethod = 'woocommerce_payments',
      returnUrl
    } = await request.json();

    console.log('[Checkout Store API] Processing checkout with Store API');

    // Step 1: Update customer information in cart
    await storeAPI.updateCustomer({
      billing_address: {
        first_name: formData.billingAddressSame ? formData.firstName : formData.billingFirstName,
        last_name: formData.billingAddressSame ? formData.lastName : formData.billingLastName,
        address_1: formData.billingAddressSame ? formData.address : formData.billingAddress,
        address_2: formData.billingAddressSame ? formData.address2 : formData.billingAddress2,
        city: formData.billingAddressSame ? formData.city : formData.billingCity,
        postcode: formData.billingAddressSame ? formData.postcode : formData.billingPostcode,
        country: formData.billingAddressSame ? formData.country : formData.billingCountry,
        email: formData.email,
        phone: formData.phone,
        state: ''
      },
      shipping_address: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        address_2: formData.address2,
        city: formData.city,
        postcode: formData.postcode,
        country: formData.country,
        state: ''
      }
    });

    // Step 2: Select shipping method if provided
    if (shippingMethod) {
      await storeAPI.selectShippingRate(0, shippingMethod);
    }

    // Step 3: Process checkout through Store API
    const checkoutData = {
      billing_address: {
        first_name: formData.billingAddressSame ? formData.firstName : formData.billingFirstName,
        last_name: formData.billingAddressSame ? formData.lastName : formData.billingLastName,
        address_1: formData.billingAddressSame ? formData.address : formData.billingAddress,
        address_2: formData.billingAddressSame ? formData.address2 : formData.billingAddress2,
        city: formData.billingAddressSame ? formData.city : formData.billingCity,
        postcode: formData.billingAddressSame ? formData.postcode : formData.billingPostcode,
        country: formData.billingAddressSame ? formData.country : formData.billingCountry,
        email: formData.email,
        phone: formData.phone,
        state: ''
      },
      shipping_address: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        address_2: formData.address2,
        city: formData.city,
        postcode: formData.postcode,
        country: formData.country,
        state: ''
      },
      payment_method: paymentMethod,
      customer_note: formData.orderNotes || ''
    };

    console.log('[Checkout Store API] Sending checkout data:', checkoutData);

    const checkoutResult = await storeAPI.processCheckout(checkoutData);

    console.log('[Checkout Store API] Checkout result:', checkoutResult);

    // The Store API checkout creates an order and returns order details
    if (checkoutResult.order_id) {
      // Get the full order details from REST API for compatibility
      const order = await woocommerce.getOrder(checkoutResult.order_id);

      return NextResponse.json({
        success: true,
        order: {
          id: order.id,
          order_key: order.order_key,
          status: order.status,
          total: order.total,
          currency: order.currency,
          payment_url: checkoutResult.payment_result?.redirect_url ||
                      await woocommerce.getPaymentUrl(order.id, order.order_key)
        },
        checkoutResult
      });
    } else {
      throw new Error('No order ID returned from checkout');
    }

  } catch (error: any) {
    console.error('[Checkout Store API] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Checkout failed',
        details: error.response?.data || error
      },
      { status: 500 }
    );
  }
}