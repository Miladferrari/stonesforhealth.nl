import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { country, postcode } = await request.json();

    // Default shipping rates for Netherlands
    const defaultRates = [
      {
        id: 'flat_rate',
        label: 'Standaard verzending',
        cost: country === 'NL' ? '4.95' : '9.95',
        method_id: 'flat_rate',
        method_title: 'Flat rate',
        delivery_time: country === 'NL' ? '1-2 werkdagen' : '3-5 werkdagen'
      },
      {
        id: 'free_shipping',
        label: 'Gratis verzending (vanaf €50)',
        cost: '0.00',
        method_id: 'free_shipping',
        method_title: 'Free shipping',
        delivery_time: country === 'NL' ? '1-2 werkdagen' : '3-5 werkdagen',
        min_amount: '50.00'
      }
    ];

    // Return shipping rates
    return NextResponse.json({
      rates: defaultRates,
      country,
      postcode
    });

  } catch (error) {
    console.error('Shipping calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate shipping' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return allowed countries for shipping
  const countries = [
    { code: 'NL', name: 'Nederland' },
    { code: 'BE', name: 'België' },
    { code: 'DE', name: 'Duitsland' },
    { code: 'FR', name: 'Frankrijk' },
    { code: 'LU', name: 'Luxemburg' }
  ];

  return NextResponse.json({ countries });
}