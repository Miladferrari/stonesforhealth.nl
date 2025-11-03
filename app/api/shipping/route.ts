import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

// Fetch shipping zones from WooCommerce (no caching for real-time updates)
async function fetchShippingZones() {
  try {
    console.log('[Shipping API] Fetching zones from WooCommerce');
    const zones = await woocommerce.getShippingZones();

    if (zones && Array.isArray(zones)) {
      console.log('[Shipping API] Found zones:', zones.map((z: any) => ({ id: z.id, name: z.name })));
      return zones;
    }

    return [];
  } catch (error) {
    console.error('[Shipping API] Failed to fetch zones:', error);
    return [];
  }
}

// Fetch shipping methods for a specific zone (no caching for real-time updates)
async function fetchZoneMethods(zoneId: number) {
  try {
    console.log(`[Shipping API] Fetching methods for zone ${zoneId}`);
    const methods = await woocommerce.getShippingZoneMethods(zoneId);

    if (methods && Array.isArray(methods)) {
      console.log(`[Shipping API] Zone ${zoneId} methods:`, methods.map((m: any) => ({
        id: m.id,
        title: m.title,
        enabled: m.enabled,
        method_id: m.method_id,
        settings: m.settings?.cost
      })));
      return methods;
    }

    return [];
  } catch (error) {
    console.error(`[Shipping API] Failed to fetch methods for zone ${zoneId}:`, error);
    return [];
  }
}

// Get allowed countries from WooCommerce zones
async function getAllowedCountries() {
  const zones = await fetchShippingZones();
  const countries: { [key: string]: string } = {};

  for (const zone of zones) {
    // Skip "Locations not covered by your other zones" (usually id: 0)
    if (zone.id === 0 || zone.name === 'Locations not covered by your other zones') {
      continue;
    }

    // Fetch zone locations
    try {
      const locations = await woocommerce.getShippingZoneLocations(zone.id);

      if (locations && Array.isArray(locations)) {
        for (const location of locations) {
          if (location.type === 'country' && location.code) {
            // Map country codes to names
            const countryNames: { [key: string]: string } = {
              'NL': 'Nederland',
              'BE': 'België',
              'DE': 'Duitsland',
              'FR': 'Frankrijk',
              'LU': 'Luxemburg',
              'AT': 'Oostenrijk',
              'ES': 'Spanje',
              'IT': 'Italië',
              'GB': 'Verenigd Koninkrijk',
              'US': 'Verenigde Staten'
            };

            countries[location.code] = countryNames[location.code] || location.code;
          }
        }
      }
    } catch (error) {
      console.error(`[Shipping API] Failed to fetch locations for zone ${zone.id}:`, error);
    }
  }

  // If no countries found in zones, default to BE and NL (as per your WooCommerce setup)
  if (Object.keys(countries).length === 0) {
    console.log('[Shipping API] No countries found in zones, using default BE and NL');
    return {
      'BE': 'België',
      'NL': 'Nederland'
    };
  }

  console.log('[Shipping API] Allowed countries:', countries);
  return countries;
}

// Calculate shipping rates based on country and cart total
async function calculateShippingRates(country: string, total: number, postcode?: string) {
  // OVERRIDE: For BE and NL, always use our new shipping rates (€4.95 / free from €30)
  if (country === 'BE' || country === 'NL') {
    console.log(`[Shipping API] Using override rates for ${country}: €4.95 / free from €30`);

    const rates: any[] = [];

    // Check if free shipping threshold is met (€30)
    if (total >= 30) {
      console.log('[Shipping API] Free shipping threshold met (€30)');
      rates.push({
        method_id: 'free_shipping:1',
        method_title: 'Gratis verzekerde verzending + Track and trace | Boven €30',
        cost: 0,
        free: true,
        delivery_time: country === 'NL' ? '1-2 werkdagen' : '2-3 werkdagen'
      });
    } else {
      // Add paid shipping rate with remaining amount for free shipping
      rates.push({
        method_id: 'flat_rate:1',
        method_title: 'Verzekerde verzending + Track and trace | 1-2 dagen thuis',
        cost: 4.95,
        free: false,
        delivery_time: country === 'NL' ? '1-2 werkdagen' : '2-3 werkdagen',
        free_shipping_remaining: 30 - total
      });
    }

    console.log(`[Shipping API] Override rates for ${country}:`, rates);
    return rates;
  }

  // For other countries, use WooCommerce zones
  const zones = await fetchShippingZones();
  const rates: any[] = [];

  // Check ALL zones for shipping methods
  const applicableZones: any[] = [];

  for (const zone of zones) {
    try {
      // For zone 0 (rest of world), always include it as a fallback
      if (zone.id === 0) {
        applicableZones.push(zone);
        continue;
      }

      const locations = await woocommerce.getShippingZoneLocations(zone.id);

      if (locations && Array.isArray(locations)) {
        const hasCountry = locations.some((loc: any) =>
          loc.type === 'country' && loc.code === country
        );

        if (hasCountry) {
          applicableZones.push(zone);
        }
      }
    } catch (error) {
      console.error(`[Shipping API] Error checking zone ${zone.id}:`, error);
    }
  }

  if (applicableZones.length === 0) {
    console.log(`[Shipping API] No shipping zones found for country: ${country}`);
    return [];
  }

  console.log(`[Shipping API] Found ${applicableZones.length} applicable zones for country: ${country}`);

  // Process methods from ALL applicable zones
  for (const zone of applicableZones) {
    console.log(`[Shipping API] Processing zone: ${zone.name} (ID: ${zone.id})`);

    // Get methods for this zone
    const methods = await fetchZoneMethods(zone.id);

    for (const method of methods) {
    console.log(`[Shipping API] Processing method:`, {
      id: method.id,
      method_id: method.method_id,
      instance_id: method.instance_id,
      title: method.title,
      enabled: method.enabled,
      settings: method.settings
    });

    if (!method.enabled) {
      console.log(`[Shipping API] Skipping disabled method: ${method.title}`);
      continue;
    }

    // Parse method settings
    const settings = method.settings || {};
    let cost = 0;

    // Handle different method types
    if (method.method_id === 'flat_rate') {
      // Parse cost from settings
      if (settings.cost?.value) {
        cost = parseFloat(settings.cost.value) || 0;
      } else if (typeof settings.cost === 'string') {
        cost = parseFloat(settings.cost) || 0;
      } else if (typeof settings.cost === 'number') {
        cost = settings.cost;
      }

      // Convert from cents to euros if the value is too high (likely in cents)
      if (cost > 100) {
        cost = cost / 100;
      }

      const flatRate = {
        method_id: `${method.method_id}:${method.instance_id}`,
        method_title: method.title || method.method_title || 'Verzending',
        cost: cost,
        free: false,
        delivery_time: country === 'NL' ? '1-2 werkdagen' : '2-3 werkdagen'
      };
      console.log(`[Shipping API] Adding flat_rate:`, flatRate);
      rates.push(flatRate);
    } else if (method.method_id === 'free_shipping') {
      // Check if free shipping conditions are met
      const minAmount = parseFloat(settings.min_amount?.value || '0');
      console.log(`[Shipping API] Free shipping min amount: ${minAmount}, cart total: ${total}`);

      if (total >= minAmount) {
        const freeShipping = {
          method_id: `${method.method_id}:${method.instance_id}`,
          method_title: method.title || 'Gratis verzending',
          cost: 0,
          free: true,
          delivery_time: country === 'NL' ? '1-2 werkdagen' : '2-3 werkdagen'
        };
        console.log(`[Shipping API] Adding free_shipping:`, freeShipping);
        rates.push(freeShipping);
      } else {
        console.log(`[Shipping API] Free shipping not met: total ${total} < min ${minAmount}`);
      }
    } else if (method.method_id === 'local_pickup') {
      const pickup = {
        method_id: `${method.method_id}:${method.instance_id}`,
        method_title: method.title || 'Afhalen',
        cost: 0,
        free: true,
        delivery_time: 'Direct beschikbaar'
      };
      console.log(`[Shipping API] Adding local_pickup:`, pickup);
      rates.push(pickup);
    } else {
      console.log(`[Shipping API] Unknown method type: ${method.method_id}`);
    }
    }
  }

  console.log(`[Shipping API] Calculated rates for ${country}:`, rates);
  return rates;
}

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

      if (country === 'BE' || country === 'NL') {
        const rates = [];

        // Check if free shipping threshold is met (€30)
        if (total >= 30) {
          rates.push({
            method_id: 'free_shipping:1',
            method_title: 'Gratis verzending',
            cost: 0,
            free: true,
            delivery_time: country === 'NL' ? '1-2 werkdagen' : '2-3 werkdagen'
          });
        } else {
          rates.push({
            method_id: 'flat_rate:1',
            method_title: 'Verzending',
            cost: 4.95,
            free: false,
            delivery_time: country === 'NL' ? '1-2 werkdagen' : '2-3 werkdagen',
            free_shipping_remaining: 30 - total
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
      countries: ['BE', 'NL'],
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