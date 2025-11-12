import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderData } = body;

    console.log('[Generate Invoice] Generating invoice for order:', orderData.orderNumber);

    // Dynamically import @react-pdf/renderer to avoid build-time issues
    const { renderToBuffer } = await import('@react-pdf/renderer');
    const { default: InvoiceTemplate } = await import('@/app/pdfs/InvoiceTemplate');
    const React = await import('react');

    // Format the invoice data
    const invoiceData = {
      // Invoice details
      invoiceNumber: `INV-${orderData.orderNumber}`,
      orderNumber: orderData.orderNumber,
      invoiceDate: new Date().toLocaleDateString('nl-NL'),
      orderDate: orderData.orderDate || new Date().toLocaleDateString('nl-NL'),

      // Company info - Stones for Health
      companyName: 'Stones for Health',
      companyAddress: 'Adres van je bedrijf', // TODO: Update with actual address
      companyPostcode: '1234 AB', // TODO: Update with actual postcode
      companyCity: 'Amsterdam', // TODO: Update with actual city
      companyCountry: 'Nederland',
      companyEmail: 'info@stonesforhealth.nl',
      companyPhone: '+31 (0)6 12345678', // TODO: Update with actual phone
      companyKVK: '12345678', // TODO: Update with actual KVK number
      companyVAT: 'NL123456789B01', // TODO: Update with actual VAT number
      companyIBAN: 'NL12 ABCD 0123 4567 89', // TODO: Update with actual IBAN

      // Customer billing info
      customerName: `${orderData.billing.first_name} ${orderData.billing.last_name}`,
      customerEmail: orderData.billing.email,
      customerPhone: orderData.billing.phone,
      billingAddress: `${orderData.billing.address_1}${orderData.billing.address_2 ? ' ' + orderData.billing.address_2 : ''}`,
      billingPostcode: orderData.billing.postcode,
      billingCity: orderData.billing.city,
      billingCountry: orderData.billing.country,

      // Customer shipping info
      shippingName: `${orderData.shipping.first_name} ${orderData.shipping.last_name}`,
      shippingAddress: `${orderData.shipping.address_1}${orderData.shipping.address_2 ? ' ' + orderData.shipping.address_2 : ''}`,
      shippingPostcode: orderData.shipping.postcode,
      shippingCity: orderData.shipping.city,
      shippingCountry: orderData.shipping.country,

      // Order items
      items: orderData.items.map((item: any) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: parseFloat(item.product.price),
        total: parseFloat(item.product.price) * item.quantity,
      })),

      // Pricing
      subtotal: orderData.totals.subtotal,
      discount: orderData.totals.discount || 0,
      discountCode: orderData.couponCode || '',
      shippingCost: orderData.totals.shipping,
      shippingMethod: orderData.shippingRate?.method_title || 'Standaard Verzending',
      tax: 0, // Netherlands usually includes VAT in price
      total: orderData.totals.total,

      // Payment info
      paymentMethod: getPaymentMethodName(orderData.paymentMethod || 'card'),
      paymentStatus: orderData.paymentStatus || 'Betaald',

      // Notes
      customerNotes: orderData.formData?.orderNotes || '',
    };

    // Generate PDF
    const InvoiceDoc = React.createElement(InvoiceTemplate, { data: invoiceData });
    const pdfBuffer = await renderToBuffer(InvoiceDoc as any);

    console.log('[Generate Invoice] Invoice generated successfully, size:', pdfBuffer.length, 'bytes');

    // Return the PDF as a buffer with proper headers
    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Invoice-${orderData.orderNumber}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });

  } catch (error: any) {
    console.error('[Generate Invoice] Error generating invoice:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate invoice',
      },
      { status: 500 }
    );
  }
}

// Helper function to get readable payment method names
function getPaymentMethodName(method: string): string {
  const paymentMethods: { [key: string]: string } = {
    'card': 'Creditcard/Bancontact',
    'ideal': 'iDEAL',
    'bancontact': 'Bancontact',
    'stripe': 'Creditcard (Stripe)',
    'paypal': 'PayPal',
    'klarna': 'Klarna',
  };

  return paymentMethods[method.toLowerCase()] || 'Online Betaling';
}
