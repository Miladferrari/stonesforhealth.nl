import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';
import { calculateShippingRates } from '@/lib/shipping';

interface PricedItem {
  productId: number;
  variationId?: number;
  quantity: number;
  unitPrice: number;
}

/**
 * Look up the real price in WooCommerce. Prices sent by the client are ignored.
 */
async function priceItem(item: any): Promise<PricedItem> {
  const productId = parseInt(item?.product?.id, 10);
  const quantity = parseInt(item?.quantity, 10);
  const variationId = item?.variation_id ? parseInt(item.variation_id, 10) : undefined;

  if (!Number.isInteger(productId) || productId <= 0 || !Number.isInteger(quantity) || quantity <= 0 || quantity > 999) {
    throw new Error('Ongeldig product in winkelwagen');
  }

  let price: string | undefined;
  if (variationId) {
    const variations = await woocommerce.getProductVariations(productId);
    price = variations.find((v: any) => v.id === variationId)?.price;
  } else {
    price = (await woocommerce.getProduct(productId, { fresh: true }))?.price;
  }

  const unitPrice = parseFloat(price || '');
  if (!Number.isFinite(unitPrice) || unitPrice < 0) {
    throw new Error('Product is niet (meer) beschikbaar');
  }

  return { productId, variationId, quantity, unitPrice };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData, items, shippingRate, couponCode } = body;

    if (!formData?.email || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Bestelgegevens zijn onvolledig' },
        { status: 400 }
      );
    }

    const pricedItems = await Promise.all(items.map(priceItem));

    let itemsTotal = 0;
    const lineItems = pricedItems.map((item) => {
      itemsTotal += item.unitPrice * item.quantity;

      // No subtotal/total here: WooCommerce prices the line itself, so VAT
      // (prices including or excluding tax) is always handled correctly
      const lineItem: any = {
        product_id: item.productId,
        quantity: item.quantity
      };

      // Add variation_id if the item has one (for variable products)
      if (item.variationId) {
        lineItem.variation_id = item.variationId;
      }

      return lineItem;
    });

    // Shipping is recalculated here; the client only indicates which method it picked
    const rates = await calculateShippingRates(formData.country, itemsTotal, formData.postcode);
    const selectedRate = rates.find((rate: any) => rate.method_id === shippingRate?.method_id) || rates[0];

    if (!selectedRate) {
      return NextResponse.json(
        { success: false, error: 'Verzending naar dit land is niet mogelijk' },
        { status: 400 }
      );
    }

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
      shipping_lines: [{
        method_id: selectedRate.method_id,
        method_title: selectedRate.method_title,
        total: Number(selectedRate.cost).toFixed(2)
      }],
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

    // Create the order in WooCommerce
    let order = await woocommerce.createOrder(orderData);

    // Line and shipping totals in the REST API are excluding tax. Rather than guessing the
    // tax setup, correct them based on what WooCommerce calculated for this order.
    const adjustments: any = {};

    // The shipping cost shown to the customer includes VAT
    const shippingLine = order.shipping_lines?.[0];
    const shippingCost = Number(selectedRate.cost);
    const shippingTax = parseFloat(shippingLine?.total_tax || '0');
    if (shippingLine && shippingCost > 0 && shippingTax > 0) {
      adjustments.shipping_lines = [{
        id: shippingLine.id,
        total: (shippingCost * shippingCost / (shippingCost + shippingTax)).toFixed(2)
      }];
    }

    if (Object.keys(adjustments).length > 0) {
      order = await woocommerce.updateOrder(order.id, adjustments);
    }

    console.log('[Create Order] Order created:', {
      id: order.id,
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
        error: error.message || 'Failed to create order'
      },
      { status: 500 }
    );
  }
}
