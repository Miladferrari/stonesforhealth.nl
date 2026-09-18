import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';
import { calculateShippingRates } from '@/lib/shipping';

// Bundle discounts as offered on the product page: minimum quantity and discount percentage
const BUNDLE_RULES: Record<string, { minQuantity: number; discount: number }> = {
  duo: { minQuantity: 2, discount: 20 },
  family: { minQuantity: 3, discount: 25 },
};

interface PricedItem {
  productId: number;
  variationId?: number;
  quantity: number;
  bundleType?: string;
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
    price = (await woocommerce.getProduct(productId))?.price;
  }

  const unitPrice = parseFloat(price || '');
  if (!Number.isFinite(unitPrice) || unitPrice < 0) {
    throw new Error('Product is niet (meer) beschikbaar');
  }

  return { productId, variationId, quantity, bundleType: item.bundleType, unitPrice };
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

    // Variable bundles are added as separate lines, so bundle quantity is counted per product
    const bundleQuantities = new Map<string, number>();
    for (const item of pricedItems) {
      if (item.bundleType) {
        const key = `${item.productId}:${item.bundleType}`;
        bundleQuantities.set(key, (bundleQuantities.get(key) || 0) + item.quantity);
      }
    }

    let itemsTotal = 0;
    const lineItems = pricedItems.map((item) => {
      const rule = item.bundleType ? BUNDLE_RULES[item.bundleType] : undefined;
      const bundleQuantity = bundleQuantities.get(`${item.productId}:${item.bundleType}`) || 0;
      const discount = rule && bundleQuantity >= rule.minQuantity ? rule.discount : 0;

      const subtotal = item.unitPrice * item.quantity;
      const total = subtotal * (100 - discount) / 100;
      itemsTotal += total;

      const lineItem: any = {
        product_id: item.productId,
        quantity: item.quantity,
        subtotal: subtotal.toFixed(2),
        total: total.toFixed(2)
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
    const order = await woocommerce.createOrder(orderData);

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
