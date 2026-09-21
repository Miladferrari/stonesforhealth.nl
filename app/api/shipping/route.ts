import { NextRequest, NextResponse } from 'next/server';
import { getAllowedCountries, calculateShippingRates } from '@/lib/shipping';
import { VERZENDKOSTEN, VERZENDLANDEN, LEVERTIJD, isGratisVerzending, restTotGratis } from '@/lib/shippingConfig';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');

  try {
    // Return allowed countries
    if (action === 'countries') {
      const countries = await getAllowedCountries();

      return NextResponse.json({
        countries: Object.keys(countries),
        countriesWithNames: countries
      });
    }

    // Calculate shipping rates
    if (action === 'calculate') {
      const country = searchParams.get('country') || 'NL';
      const total = parseFloat(searchParams.get('total') || '0');
      const postcode = searchParams.get('postcode') || '';

      // Get allowed countries
      const allowedCountries = await getAllowedCountries();

      // Check if country is allowed
      if (!allowedCountries[country]) {
        return NextResponse.json({
          error: 'Verzending naar dit land is niet beschikbaar',
          rates: []
        });
      }

      // Calculate rates
      const rates = await calculateShippingRates(country, total, postcode);

      return NextResponse.json({
        rates,
        country,
        postcode,
        total
      });
    }

    // Default response - return allowed countries
    const countries = await getAllowedCountries();

    return NextResponse.json({
      countries: Object.keys(countries),
      countriesWithNames: countries
    });

  } catch (error) {
    console.error('[Shipping API] Error:', error);

    // Fallback to BE and NL with default rate if WooCommerce fails
    console.log('[Shipping API] Falling back to default BE/NL configuration');

    if (action === 'calculate') {
      const country = searchParams.get('country') || 'NL';
      const total = parseFloat(searchParams.get('total') || '0');

      if (VERZENDLANDEN[country]) {
        const rates = [];
        const levertijd = LEVERTIJD[country];

        if (isGratisVerzending(total)) {
          rates.push({
            method_id: 'free_shipping:1',
            method_title: 'Gratis verzending',
            cost: 0,
            free: true,
            delivery_time: levertijd,
          });
        } else {
          rates.push({
            method_id: 'flat_rate:1',
            method_title: 'Verzending',
            cost: VERZENDKOSTEN,
            free: false,
            delivery_time: levertijd,
            free_shipping_remaining: restTotGratis(total),
          });
        }

        return NextResponse.json({
          rates,
          country,
          postcode: searchParams.get('postcode') || '',
          total
        });
      }
    }

    return NextResponse.json({
      countries: Object.keys(VERZENDLANDEN),
      countriesWithNames: {
        'BE': 'België',
        'NL': 'Nederland'
      }
    });
  }
}

// POST endpoint for backwards compatibility
export async function POST(request: NextRequest) {
  try {
    const { country, postcode, total } = await request.json();

    // Get allowed countries
    const allowedCountries = await getAllowedCountries();

    // Check if country is allowed
    if (!allowedCountries[country]) {
      return NextResponse.json({
        error: 'Verzending naar dit land is niet beschikbaar',
        rates: []
      });
    }

    // Calculate rates
    const rates = await calculateShippingRates(country, total || 0, postcode);

    return NextResponse.json({
      rates,
      country,
      postcode
    });

  } catch (error) {
    console.error('[Shipping API] POST error:', error);

    // Fallback response
    return NextResponse.json({
      error: 'Failed to calculate shipping',
      rates: []
    }, { status: 500 });
  }
}