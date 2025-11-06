import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { addNotification } from '@/app/utils/purchaseNotificationCache';
import { registerFailedOrder, markOrderAsSuccessful } from '@/app/utils/failedOrderCache';
import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/app/emails/OrderConfirmation';
import { NewOrderNotificationEmail } from '@/app/emails/NewOrderNotification';
import { OrderRecoveryEmail } from '@/app/emails/OrderRecovery';

// Lazy initialize Resend to avoid build-time errors
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[Email] RESEND_API_KEY not configured - emails will not be sent');
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Initialize Stripe with the secret key from environment variables
 * Using the same API version as the intent route for consistency
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15' as Stripe.LatestApiVersion,
});

// Webhook endpoint secret for signature verification
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// WooCommerce API configuration
const WC_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || process.env.WOOCOMMERCE_URL || '';
const WC_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

// Log configuration status (remove in production)
console.log('[Webhook] WooCommerce URL configured:', WC_URL ? 'Yes' : 'No');
console.log('[Webhook] WooCommerce credentials configured:', WC_CONSUMER_KEY && WC_CONSUMER_SECRET ? 'Yes' : 'No');

/**
 * Type definition for order status update
 */
type OrderStatus = 'processing' | 'failed' | 'completed' | 'cancelled';

/**
 * Updates the WooCommerce order status based on Stripe payment events
 * @param orderId - The WooCommerce order ID
 * @param status - The new order status
 * @param transactionId - Optional Stripe transaction/charge ID for reference
 */
async function updateOrderStatus(
  orderId: string, 
  status: OrderStatus, 
  transactionId?: string
): Promise<void> {
  try {
    // Prepare the update payload
    const updateData: any = {
      status: status,
    };

    // Add transaction reference if provided
    if (transactionId) {
      updateData.transaction_id = transactionId;
      updateData.meta_data = [
        {
          key: '_stripe_charge_id',
          value: transactionId,
        },
        {
          key: '_payment_method',
          value: 'stripe',
        },
        {
          key: '_payment_completed_at',
          value: new Date().toISOString(),
        },
      ];
    }

    // Check if WooCommerce is configured
    if (!WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
      console.error('[Webhook] WooCommerce API not configured properly');
      console.error('[Webhook] WC_URL:', WC_URL ? 'Set' : 'Missing');
      console.error('[Webhook] WC_CONSUMER_KEY:', WC_CONSUMER_KEY ? 'Set' : 'Missing');
      console.error('[Webhook] WC_CONSUMER_SECRET:', WC_CONSUMER_SECRET ? 'Set' : 'Missing');
      throw new Error('WooCommerce API configuration missing');
    }

    // Make authenticated request to WooCommerce
    const endpoint = `${WC_URL}/orders/${orderId}`;
    console.log(`[Webhook] Updating order ${orderId} at: ${endpoint}`);

    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64'),
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`WooCommerce API error: ${response.status} - ${errorText}`);
    }

    const updatedOrder = await response.json();
    console.log(`[Webhook] Successfully updated order ${orderId} to status: ${status}`);
    console.log(`[Webhook] Order update response:`, { id: updatedOrder.id, status: updatedOrder.status });
    
  } catch (error) {
    console.error(`[Webhook] Failed to update order ${orderId} status:`, error);
    console.error(`[Webhook] Error details:`, {
      orderId,
      status,
      wcUrl: WC_URL ? 'configured' : 'missing',
      credentials: WC_CONSUMER_KEY && WC_CONSUMER_SECRET ? 'configured' : 'missing'
    });
    // Don't throw - we want to return 200 to Stripe even if WooCommerce update fails
    // This prevents Stripe from retrying the webhook unnecessarily
  }
}

/**
 * Generate invoice PDF for an order
 * @param order - The WooCommerce order object
 * @returns PDF buffer or null if generation fails
 */
async function generateInvoicePDF(order: any): Promise<Buffer | null> {
  try {
    console.log('[Invoice] Generating invoice PDF for order:', order.number);

    // Dynamically import @react-pdf/renderer to avoid build-time issues
    const { renderToBuffer } = await import('@react-pdf/renderer');
    const { default: InvoiceTemplate } = await import('@/app/pdfs/InvoiceTemplate');
    const React = await import('react');

    const invoiceData = {
      invoiceNumber: `INV-${order.number}`,
      orderNumber: order.number.toString(),
      invoiceDate: new Date().toLocaleDateString('nl-NL'),
      orderDate: new Date(order.date_created).toLocaleDateString('nl-NL'),

      companyName: 'Stones for Health',
      companyAddress: 'Adres van je bedrijf', // TODO: Update
      companyPostcode: '1234 AB', // TODO: Update
      companyCity: 'Amsterdam', // TODO: Update
      companyCountry: 'Nederland',
      companyEmail: 'info@stonesforhealth.nl',
      companyPhone: '+31 (0)6 12345678', // TODO: Update
      companyKVK: '12345678', // TODO: Update
      companyVAT: 'NL123456789B01', // TODO: Update
      companyIBAN: 'NL12 ABCD 0123 4567 89', // TODO: Update

      customerName: `${order.billing.first_name} ${order.billing.last_name}`,
      customerEmail: order.billing.email,
      customerPhone: order.billing.phone,
      billingAddress: `${order.billing.address_1}${order.billing.address_2 ? ' ' + order.billing.address_2 : ''}`,
      billingPostcode: order.billing.postcode,
      billingCity: order.billing.city,
      billingCountry: order.billing.country,

      shippingName: `${order.shipping.first_name} ${order.shipping.last_name}`,
      shippingAddress: `${order.shipping.address_1}${order.shipping.address_2 ? ' ' + order.shipping.address_2 : ''}`,
      shippingPostcode: order.shipping.postcode,
      shippingCity: order.shipping.city,
      shippingCountry: order.shipping.country,

      items: order.line_items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price),
        total: parseFloat(item.total),
      })),

      subtotal: parseFloat(order.total) - parseFloat(order.shipping_total || '0') + parseFloat(order.discount_total || '0'),
      discount: parseFloat(order.discount_total || '0'),
      discountCode: order.coupon_lines && order.coupon_lines.length > 0 ? order.coupon_lines[0].code : '',
      shippingCost: parseFloat(order.shipping_total || '0'),
      shippingMethod: order.shipping_lines && order.shipping_lines.length > 0 ? order.shipping_lines[0].method_title : 'Standaard Verzending',
      tax: 0,
      total: parseFloat(order.total),

      paymentMethod: order.payment_method_title || 'Online Betaling',
      paymentStatus: 'Betaald',

      customerNotes: order.customer_note || '',
    };

    const InvoiceDoc = React.createElement(InvoiceTemplate, { data: invoiceData });
    const pdfBuffer = await renderToBuffer(InvoiceDoc as any);

    console.log('[Invoice] Invoice PDF generated successfully, size:', pdfBuffer.length, 'bytes');
    return pdfBuffer;
  } catch (error) {
    console.error('[Invoice] Failed to generate invoice PDF:', error);
    return null;
  }
}

/**
 * Verstuur order emails naar klant en shop eigenaar
 * @param orderId - The WooCommerce order ID
 */
async function sendOrderEmails(orderId: string): Promise<void> {
  try {
    // Check if WooCommerce is configured
    if (!WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
      console.error('[Email] WooCommerce API not configured properly');
      return;
    }

    // Haal order details op van WooCommerce
    const endpoint = `${WC_URL}/orders/${orderId}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64'),
      },
    });

    if (!response.ok) {
      console.error(`[Email] Failed to fetch order ${orderId}: ${response.status}`);
      return;
    }

    const order = await response.json();

    // Bereid order data voor emails
    const orderDate = new Date(order.date_created).toLocaleString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const items = order.line_items.map((item: any) => ({
      name: item.name,
      quantity: item.quantity,
      price: parseFloat(item.price).toFixed(2),
      total: parseFloat(item.total).toFixed(2),
    }));

    const shippingAddress = {
      firstName: order.shipping.first_name,
      lastName: order.shipping.last_name,
      address1: order.shipping.address_1,
      address2: order.shipping.address_2,
      city: order.shipping.city,
      postcode: order.shipping.postcode,
      country: order.shipping.country,
    };

    const billingAddress = {
      firstName: order.billing.first_name,
      lastName: order.billing.last_name,
      address1: order.billing.address_1,
      address2: order.billing.address_2,
      city: order.billing.city,
      postcode: order.billing.postcode,
      country: order.billing.country,
    };

    const subtotal = (parseFloat(order.total) - parseFloat(order.shipping_total) - parseFloat(order.total_tax || '0')).toFixed(2);
    const shippingCost = parseFloat(order.shipping_total).toFixed(2);
    const discount = order.discount_total && parseFloat(order.discount_total) > 0
      ? parseFloat(order.discount_total).toFixed(2)
      : undefined;
    const total = parseFloat(order.total).toFixed(2);

    const paymentMethodLabels: { [key: string]: string } = {
      'stripe': 'iDEAL / Bancontact / Creditcard',
      'bacs': 'Bankoverschrijving',
      'cheque': 'Cheque',
      'cod': 'Rembours',
    };
    const paymentMethod = paymentMethodLabels[order.payment_method] || order.payment_method_title || 'Online betaling';

    // Generate invoice PDF
    const invoicePDF = await generateInvoicePDF(order);

    // Verstuur klant email
    const resend = getResend();
    if (resend) {
      try {
        const customerEmailHtml = OrderConfirmationEmail({
          orderNumber: order.number.toString(),
          orderDate,
          customerName: `${order.billing.first_name} ${order.billing.last_name}`,
          customerEmail: order.billing.email,
          items,
          shippingAddress,
          billingAddress,
          subtotal,
          shippingCost,
          discount,
          total,
          paymentMethod,
        });

        // Prepare email payload
        const emailPayload: any = {
          from: 'Stones for Health <noreply@stonesforhealth.nl>',
          to: order.billing.email,
          subject: `Bestelbevestiging #${order.number} - Stones for Health`,
          html: customerEmailHtml,
        };

        // Add invoice PDF as attachment if generated successfully
        if (invoicePDF) {
          emailPayload.attachments = [
            {
              filename: `Factuur-${order.number}.pdf`,
              content: invoicePDF,
            },
          ];
          console.log('[Email] Invoice PDF attached to customer email');
        }

        await resend.emails.send(emailPayload);

        console.log(`[Email] Order confirmation sent to customer: ${order.billing.email}`);
      } catch (error) {
        console.error('[Email] Failed to send customer email:', error);
      }

      // Verstuur shop eigenaar email
      try {
        const ownerEmailHtml = NewOrderNotificationEmail({
          orderNumber: order.number.toString(),
          orderDate,
          customerName: `${order.billing.first_name} ${order.billing.last_name}`,
          customerEmail: order.billing.email,
          customerPhone: order.billing.phone,
          items,
          shippingAddress,
          billingAddress,
          subtotal,
          shippingCost,
          discount,
          total,
          paymentMethod,
        });

        // Prepare owner email payload
        const ownerEmailPayload: any = {
          from: 'Stones for Health <noreply@stonesforhealth.nl>',
          to: 'info@stonesforhealth.nl',
          subject: `🎉 Nieuwe Bestelling #${order.number} - stonesforhealth.nl`,
          html: ownerEmailHtml,
        };

        // Add invoice PDF as attachment if generated successfully
        if (invoicePDF) {
          ownerEmailPayload.attachments = [
            {
              filename: `Factuur-${order.number}.pdf`,
              content: invoicePDF,
            },
          ];
        }

        await resend.emails.send(ownerEmailPayload);

        console.log(`[Email] New order notification sent to shop owner`);
      } catch (error) {
        console.error('[Email] Failed to send owner email:', error);
      }
    } else {
      console.warn('[Email] Skipping emails - Resend not configured');
    }

  } catch (error) {
    console.error(`[Email] Failed to send emails for order ${orderId}:`, error);
    // Don't throw - we don't want to fail the webhook if email sending fails
  }
}

/**
 * Haalt order details op van WooCommerce en maakt een purchase notification
 * @param orderId - The WooCommerce order ID
 */
async function createPurchaseNotification(orderId: string): Promise<void> {
  try {
    // Check if WooCommerce is configured
    if (!WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
      console.error('[Notification] WooCommerce API not configured properly');
      return;
    }

    // Haal order details op van WooCommerce
    const endpoint = `${WC_URL}/orders/${orderId}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64'),
      },
    });

    if (!response.ok) {
      console.error(`[Notification] Failed to fetch order ${orderId}: ${response.status}`);
      return;
    }

    const order = await response.json();

    // Haal klantnaam op (alleen voornaam)
    const customerName = order.billing?.first_name || 'Een klant';

    // Haal eerste product op (of meerdere producten samenvatten)
    let productName = 'een product';
    if (order.line_items && order.line_items.length > 0) {
      if (order.line_items.length === 1) {
        // Eén product
        productName = order.line_items[0].name;
      } else {
        // Meerdere producten - toon eerste product + aantal extra
        const firstProduct = order.line_items[0].name;
        const extraCount = order.line_items.length - 1;
        productName = `${firstProduct} + ${extraCount} andere`;
      }
    }

    // Maak de notificatie
    await addNotification({
      orderId: parseInt(orderId, 10),
      customerName,
      productName,
    });

    console.log(`[Notification] Created purchase notification for order ${orderId}`);
  } catch (error) {
    console.error(`[Notification] Failed to create notification for order ${orderId}:`, error);
    // Don't throw - we don't want to fail the webhook if notification creation fails
  }
}

/**
 * POST /api/stripe-webhook
 * Handles incoming Stripe webhook events
 */
export async function POST(request: NextRequest) {
  // Step 1: Read the raw request body and signature header
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  // Validate signature header is present
  if (!signature) {
    console.error('Webhook Error: No stripe-signature header present');
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  // Validate endpoint secret is configured
  if (!endpointSecret) {
    console.error('Webhook Error: STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json(
      { error: 'Webhook endpoint not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    // Step 2: Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      endpointSecret
    );
    
    console.log(`Webhook received: ${event.type} - ${event.id}`);
    
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  // Step 3: Handle the event based on type
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        // Payment was successful
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata.orderId || paymentIntent.metadata.order_id;
        
        if (orderId) {
          console.log(`Processing successful payment for order ${orderId}`);

          // Verwijder uit failed orders lijst (als de klant alsnog heeft betaald)
          await markOrderAsSuccessful(orderId);

          // Update order status to processing (payment successful, awaiting fulfillment)
          await updateOrderStatus(
            orderId,
            'processing',
            paymentIntent.id
          );

          // Maak purchase notification voor real-time display
          await createPurchaseNotification(orderId);

          // Verstuur order emails naar klant en shop eigenaar
          await sendOrderEmails(orderId);

          // Log additional payment details for debugging
          console.log(`Payment details - Amount: ${paymentIntent.amount/100} ${paymentIntent.currency.toUpperCase()}, Customer: ${paymentIntent.metadata.customerEmail}`);
        } else {
          console.warn('PaymentIntent succeeded but no orderId found in metadata');
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        // Payment failed
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        const failedOrderId = failedPaymentIntent.metadata.orderId || failedPaymentIntent.metadata.order_id;

        if (failedOrderId) {
          console.log(`Processing failed payment for order ${failedOrderId}`);

          // Update order status to failed
          await updateOrderStatus(
            failedOrderId,
            'failed'
          );

          // Stuur direct een failed order email
          try {
            const endpoint = `${WC_URL}/orders/${failedOrderId}`;
            const response = await fetch(endpoint, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64'),
              },
            });

            if (response.ok) {
              const orderData = await response.json();
              const customerEmail = failedPaymentIntent.metadata.customerEmail || orderData.billing?.email;

              if (customerEmail) {
                // Stuur failed order email DIRECT
                const resend = getResend();
                if (resend) {
                  const items = orderData.line_items.map((item: any) => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: parseFloat(item.price).toFixed(2),
                  }));

                  const total = parseFloat(orderData.total).toFixed(2);
                  const customerName = orderData.billing.first_name || 'Klant';
                  const checkoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`;

                  const emailHtml = OrderRecoveryEmail({
                    customerName,
                    orderNumber: orderData.number.toString(),
                    items,
                    total,
                    checkoutUrl,
                  });

                  await resend.emails.send({
                    from: 'Stones for Health <noreply@stonesforhealth.nl>',
                    to: customerEmail,
                    subject: '❌ Betaling mislukt - Probeer opnieuw | Stones for Health',
                    html: emailHtml,
                  });

                  console.log(`[Failed Order] Email sent to ${customerEmail} for order ${failedOrderId}`);
                }
              }
            }
          } catch (error) {
            console.error(`[Failed Order] Failed to send email for order ${failedOrderId}:`, error);
          }

          // Log failure reason for debugging
          const lastError = failedPaymentIntent.last_payment_error;
          console.log(`Payment failure reason: ${lastError?.message || 'Unknown error'}`);
        } else {
          console.warn('PaymentIntent failed but no orderId found in metadata');
        }
        break;
      }

      case 'charge.succeeded': {
        // Charge succeeded (additional confirmation)
        const charge = event.data.object as Stripe.Charge;
        const chargeOrderId = charge.metadata.orderId || charge.metadata.order_id;
        
        if (chargeOrderId) {
          console.log(`Charge succeeded for order ${chargeOrderId}`);
          
          // Update with charge ID (this provides additional payment reference)
          await updateOrderStatus(
            chargeOrderId,
            'processing',
            charge.id
          );
        }
        break;
      }

      case 'charge.failed': {
        // Charge failed
        const failedCharge = event.data.object as Stripe.Charge;
        const failedChargeOrderId = failedCharge.metadata.orderId || failedCharge.metadata.order_id;
        
        if (failedChargeOrderId) {
          console.log(`Charge failed for order ${failedChargeOrderId}`);
          
          await updateOrderStatus(
            failedChargeOrderId,
            'failed'
          );
        }
        break;
      }

      case 'payment_method.attached': {
        // Payment method was attached to a customer
        console.log('Payment method attached to customer');
        break;
      }

      default:
        // Log unhandled events for monitoring
        console.log(`Unhandled webhook event type: ${event.type}`);
    }

    // Step 4: Return 200 response to acknowledge receipt
    return NextResponse.json(
      { 
        received: true,
        type: event.type,
        id: event.id,
      },
      { status: 200 }
    );

  } catch (error: any) {
    // Log the error but still return 200 to prevent Stripe retries
    console.error('Error processing webhook:', error);
    
    // Return 200 to acknowledge receipt even if processing failed
    // This prevents Stripe from retrying and potentially creating duplicate orders
    return NextResponse.json(
      { 
        received: true,
        error: 'Processing error occurred but webhook was received',
      },
      { status: 200 }
    );
  }
}

/**
 * Stripe requires webhook endpoints to be POST only
 * Return 405 Method Not Allowed for other HTTP methods
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}