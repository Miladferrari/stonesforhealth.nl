import { NextRequest, NextResponse } from 'next/server';
import { getOrdersReadyForRecovery, markRecoveryEmailSent, cleanupOldFailedOrders } from '@/app/utils/failedOrderCache';
import { Resend } from 'resend';
import { OrderRecoveryEmail } from '@/app/emails/OrderRecovery';

// Lazy initialize Resend to avoid build-time errors
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Deze endpoint wordt aangeroepen door een cron job (bijv. Vercel Cron of externe service)
 * om recovery emails te versturen naar klanten met mislukte betalingen
 */
export async function POST(request: NextRequest) {
  try {
    console.log('[Recovery] Checking for orders ready for recovery emails...');

    // Cleanup oude entries eerst
    cleanupOldFailedOrders();

    // Haal orders op die klaar zijn voor recovery email
    const ordersToRecover = await getOrdersReadyForRecovery();

    console.log(`[Recovery] Found ${ordersToRecover.length} orders ready for recovery`);

    if (ordersToRecover.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No orders ready for recovery',
        sent: 0,
      });
    }

    let emailsSent = 0;
    const errors: any[] = [];

    // Verstuur recovery email voor elke order
    for (const failedOrder of ordersToRecover) {
      try {
        const order = failedOrder.orderData;

        // Bereid items voor email
        const items = order.line_items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price).toFixed(2),
        }));

        const total = parseFloat(order.total).toFixed(2);
        const customerName = order.billing.first_name || 'Klant';

        // Maak checkout URL (klant kan direct terug naar betaling)
        const checkoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`;

        // Genereer email HTML
        const emailHtml = OrderRecoveryEmail({
          customerName,
          orderNumber: order.number.toString(),
          items,
          total,
          checkoutUrl,
        });

        // Verstuur email
        const resend = getResend();
        await resend.emails.send({
          from: 'Stones for Health <noreply@stonesforhealth.nl>',
          to: failedOrder.customerEmail,
          subject: '🛒 Je winkelwagen wacht op je - Stones for Health',
          html: emailHtml,
        });

        // Markeer als verstuurd
        markRecoveryEmailSent(failedOrder.orderId);
        emailsSent++;

        console.log(`[Recovery] Recovery email sent to ${failedOrder.customerEmail} for order ${failedOrder.orderId}`);
      } catch (error) {
        console.error(`[Recovery] Failed to send email for order ${failedOrder.orderId}:`, error);
        errors.push({
          orderId: failedOrder.orderId,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      sent: emailsSent,
      errors: errors.length > 0 ? errors : undefined,
    });

  } catch (error) {
    console.error('[Recovery] Error in recovery email process:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Allow GET for manual triggers (remove in production)
export async function GET(request: NextRequest) {
  // Check for authorization header or secret token
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.CRON_SECRET || 'your-secret-token';

  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Forward to POST handler
  return POST(request);
}
