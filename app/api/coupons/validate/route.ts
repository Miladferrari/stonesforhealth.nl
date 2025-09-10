import { NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export async function POST(request: Request) {
  try {
    const { code, cartTotal } = await request.json();

    if (!code) {
      return NextResponse.json(
        { valid: false, error: 'Geen kortingscode opgegeven' },
        { status: 400 }
      );
    }

    console.log('=== COUPON VALIDATION START ===');
    console.log('Validating coupon:', code);
    console.log('Cart total:', cartTotal);

    // Use the woocommerce library to validate the coupon
    const validationResult = await woocommerce.validateCoupon(code, cartTotal);
    
    console.log('Validation result:', validationResult);

    if (!validationResult.valid) {
      return NextResponse.json(
        { valid: false, error: validationResult.error },
        { status: 400 }
      );
    }

    const coupon = validationResult.coupon;
    if (!coupon) {
      return NextResponse.json(
        { valid: false, error: 'Ongeldige kortingscode' },
        { status: 404 }
      );
    }
    
    console.log('All validation checks passed!');
    console.log('=== COUPON VALIDATION SUCCESS ===');
    
    // Return valid coupon data
    const validResponse = {
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        amount: coupon.amount,
        discount_type: coupon.discount_type,
        description: coupon.description || '',
      }
    };
    
    console.log('Returning valid response:', JSON.stringify(validResponse, null, 2));
    return NextResponse.json(validResponse);

  } catch (error) {
    console.error('=== COUPON VALIDATION ERROR ===');
    console.error('Error details:', error);
    return NextResponse.json(
      { valid: false, error: 'Er is een fout opgetreden bij het valideren van de kortingscode' },
      { status: 500 }
    );
  }
}