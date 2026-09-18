import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';
import { sendMail } from '@/lib/mail';
import { WelcomeDiscountEmail } from '@/app/emails/WelcomeDiscount';

// Functie om unieke kortingscode te genereren
function generateCouponCode(): string {
  const prefix = 'WELKOM10';
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${randomSuffix}`;
}

// Functie om vervaldatum te berekenen (30 dagen vanaf nu)
function getExpiryDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Valideer email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Ongeldig e-mailadres' },
        { status: 400 }
      );
    }

    // Check hoeveel coupons dit email adres al heeft
    const existingCoupons = await woocommerce.getCouponsByEmail(email);
    console.log(`[Newsletter] Email ${email} heeft al ${existingCoupons.length} kortingscodes`);

    if (existingCoupons.length >= 2) {
      return NextResponse.json(
        { error: 'Je hebt al het maximale aantal kortingscodes ontvangen voor dit e-mailadres.' },
        { status: 400 }
      );
    }

    // Genereer unieke kortingscode
    const couponCode = generateCouponCode();
    const expiryDate = getExpiryDate();

    // Maak kortingscode aan in WooCommerce
    const coupon = await woocommerce.createCoupon({
      code: couponCode,
      amount: '10',
      discount_type: 'fixed_cart',
      description: `Nieuwsbrief welkomstkorting voor ${email}`,
      date_expires: expiryDate,
      minimum_amount: '25.00',
      // Geen maximum_amount - we willen geen limiet op het maximale bedrag
      usage_limit: 1,
      usage_limit_per_user: 1,
      email_restrictions: [email],
      individual_use: true,
      free_shipping: false,
    });

    console.log('[Newsletter] Kortingscode aangemaakt:', {
      code: coupon.code,
      email: email,
      expires: expiryDate,
    });

    // Verstuur email met kortingscode
    try {
      const emailHtml = WelcomeDiscountEmail({
        couponCode: coupon.code,
        expiryDate: expiryDate,
      });

      const sent = await sendMail({
        to: email,
        subject: '🎉 Jouw €10 Kortingscode is Klaar!',
        html: emailHtml,
      });
      if (!sent) {
        throw new Error('Mail is not configured');
      }

      console.log('[Newsletter] Email verzonden naar:', email);
    } catch (emailError: any) {
      console.error('[Newsletter] Email verzenden mislukt:', emailError);

      // Don't claim the code was sent when it wasn't: the customer would wait for nothing
      return NextResponse.json(
        { error: 'Je kortingscode kon niet worden verstuurd. Probeer het later opnieuw.' },
        { status: 502 }
      );
    }

    // Return alleen success bericht - kortingscode wordt via email verzonden
    return NextResponse.json({
      success: true,
      message: 'Kortingscode is verzonden naar je e-mailadres',
    });
  } catch (error: any) {
    console.error('[Newsletter] Fout bij aanmaken kortingscode:', error);

    return NextResponse.json(
      {
        error: 'Er is een fout opgetreden bij het aanmaken van je kortingscode. Probeer het later opnieuw.',
        details: error.message
      },
      { status: 500 }
    );
  }
}
