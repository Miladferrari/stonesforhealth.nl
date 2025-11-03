import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Resend } from 'resend';
import { AbandonedCartEmail1 } from '@/app/emails/AbandonedCartEmail1';
import { AbandonedCartEmail2 } from '@/app/emails/AbandonedCartEmail2';
import { woocommerce } from '@/lib/woocommerce';

// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Initialize Resend
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

// Generate 5% discount coupon for abandoned cart
async function createRecoveryCoupon(email: string): Promise<string> {
  try {
    const couponCode = `COMEBACK5-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // Valid for 7 days

    await woocommerce.post('coupons', {
      code: couponCode,
      discount_type: 'percent',
      amount: '5',
      description: `Abandoned cart recovery - 5% discount for ${email}`,
      date_expires: expiryDate.toISOString().split('T')[0],
      usage_limit: 1,
      usage_limit_per_user: 1,
      email_restrictions: [email],
      individual_use: false,
      free_shipping: false,
    });

    console.log(`[Abandoned Cart Cron] Created coupon: ${couponCode} for ${email}`);
    return couponCode;
  } catch (error) {
    console.error('[Abandoned Cart Cron] Failed to create coupon:', error);
    // Fallback to generic code if coupon creation fails
    return 'COMEBACK5';
  }
}

// Main cron handler
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to ensure only Vercel can call this
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[Abandoned Cart Cron] Starting abandoned cart check...');

    const connection = await mysql.createConnection(dbConfig);
    const resend = getResend();
    const now = new Date();

    try {
      // Find abandoned carts that need emails
      const [carts]: any = await connection.execute(
        `SELECT *
         FROM wp_abandoned_carts
         WHERE status = 'pending'
         AND (
           -- Email 1: After 2 hours, no email sent yet
           (email_count = 0 AND TIMESTAMPDIFF(HOUR, created_at, NOW()) >= 2)
           OR
           -- Email 2: After 24 hours, only 1 email sent
           (email_count = 1 AND TIMESTAMPDIFF(HOUR, last_email_sent_at, NOW()) >= 22)
           OR
           -- Email 3+: Every 3 days after email 2
           (email_count >= 2 AND TIMESTAMPDIFF(DAY, last_email_sent_at, NOW()) >= 3)
         )
         LIMIT 50`
      );

      console.log(`[Abandoned Cart Cron] Found ${carts.length} carts to process`);

      let emailsSent = 0;

      for (const cart of carts) {
        try {
          const cartData = JSON.parse(cart.cart_data);
          const recoveryLink = `https://stonesforhealth.nl/cart-recovery?token=${cart.recovery_token}`;

          let emailHtml: string;
          let subject: string;
          let couponCode = '';

          // Determine which email to send
          if (cart.email_count === 0) {
            // Email 1: After 2 hours - no discount
            console.log(`[Abandoned Cart Cron] Sending email 1 to ${cart.customer_email}`);
            subject = '🛒 Je winkelwagen wacht op je!';
            emailHtml = AbandonedCartEmail1({
              customerName: cart.customer_name || 'daar',
              cartItems: cartData,
              cartTotal: parseFloat(cart.cart_total),
              recoveryLink
            });
          } else {
            // Email 2+: After 24 hours and every 3 days - with 5% discount
            console.log(`[Abandoned Cart Cron] Sending email ${cart.email_count + 1} to ${cart.customer_email}`);

            // Create unique coupon code for this customer
            couponCode = await createRecoveryCoupon(cart.customer_email);

            const isFirstDiscountEmail = cart.email_count === 1;
            subject = isFirstDiscountEmail
              ? '🎁 Speciaal voor jou: 5% EXTRA korting!'
              : '⏰ Laatste kans: 5% korting op je winkelwagen!';

            emailHtml = AbandonedCartEmail2({
              customerName: cart.customer_name || 'daar',
              cartItems: cartData,
              cartTotal: parseFloat(cart.cart_total),
              recoveryLink,
              couponCode,
              emailCount: cart.email_count + 1
            });
          }

          // Send email
          await resend.emails.send({
            from: 'Stones for Health <noreply@stonesforhealth.nl>',
            to: cart.customer_email,
            subject,
            html: emailHtml,
          });

          // Update database
          await connection.execute(
            `UPDATE wp_abandoned_carts
             SET last_email_sent_at = NOW(),
                 email_count = email_count + 1
             WHERE id = ?`,
            [cart.id]
          );

          emailsSent++;
          console.log(`[Abandoned Cart Cron] Email sent successfully to ${cart.customer_email}`);

          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));

        } catch (emailError) {
          console.error(`[Abandoned Cart Cron] Failed to send email to ${cart.customer_email}:`, emailError);
          // Continue with next cart
        }
      }

      // Clean up old abandoned carts (older than 30 days)
      await connection.execute(
        `UPDATE wp_abandoned_carts
         SET status = 'abandoned'
         WHERE status = 'pending'
         AND TIMESTAMPDIFF(DAY, created_at, NOW()) > 30`
      );

      await connection.end();

      console.log(`[Abandoned Cart Cron] Finished. Sent ${emailsSent} emails.`);

      return NextResponse.json({
        success: true,
        emailsSent,
        cartsProcessed: carts.length,
        timestamp: now.toISOString()
      });

    } catch (dbError) {
      await connection.end();
      throw dbError;
    }

  } catch (error) {
    console.error('[Abandoned Cart Cron] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process abandoned carts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// For manual testing (only in development)
export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }
  return GET(request);
}
