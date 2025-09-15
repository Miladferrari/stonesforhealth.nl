import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

// Cache for shipping zones and methods to reduce API calls
let shippingCache: {
  zones: any[] | null;
  methods: { [zoneId: string]: any[] };
  timestamp: number;
} = {
  zones: null,
  methods: {},
  timestamp: 0
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// Fetch shipping zones from WooCommerce
async function fetchShippingZones() {
  const now = Date.now();

  // Return cached data if still valid
  if (shippingCache.zones && (now - shippingCache.timestamp) < CACHE_DURATION) {
    return shippingCache.zones;
  }

  try {
    console.log('[Shipping API] Fetching zones from WooCommerce');
    const zones = await woocommerce.getShippingZones();

    if (zones && Array.isArray(zones)) {
      shippingCache.zones = zones;
      shippingCache.timestamp = now;
      console.log('[Shipping API] Found zones:', zones.map((z: any) => ({ id: z.id, name: z.name })));
      return zones;
    }

    return [];
  } catch (error) {
    console.error('[Shipping API] Failed to fetch zones:', error);
    return [];
  }
}

// Fetch shipping methods for a specific zone
async function fetchZoneMethods(zoneId: number) {
  const now = Date.now();

  // Return cached methods if still valid
  if (shippingCache.methods[zoneId] && (now - shippingCache.timestamp) < CACHE_DURATION) {
    return shippingCache.methods[zoneId];
  }

  try {
    console.log(`[Shipping API] Fetching methods for zone ${zoneId}`);
    const methods = await woocommerce.getShippingZoneMethods(zoneId);

    if (methods && Array.isArray(methods)) {
      shippingCache.methods[zoneId] = methods;
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
  const zones = await fetchShippingZones();
  const rates: any[] = [];

  // Find the zone for this country
  let applicableZone = null;

  for (const zone of zones) {
    if (zone.id === 0) continue; // Skip rest of world zone initially

    try {
      const locations = await woocommerce.getShippingZoneLocations(zone.id);

      if (locations && Array.isArray(locations)) {
        const hasCountry = locations.some((loc: any) =>
          loc.type === 'country' && loc.code === country
        );

        if (hasCountry) {
          applicableZone = zone;
          break;
        }
      }
    } catch (error) {
      console.error(`[Shipping API] Error checking zone ${zone.id}:`, error);
    }
  }

  // If no specific zone found, check for "rest of world" zone
  if (!applicableZone) {
    applicableZone = zones.find(z => z.id === 0);
  }

  if (!applicableZone) {
    console.log(`[Shipping API] No shipping zone found for country: ${country}`);
    return [];
  }

  console.log(`[Shipping API] Using zone: ${applicableZone.name} (ID: ${applicableZone.id}) for country: ${country}`);

  // Get methods for this zone
  const methods = await fetchZoneMethods(applicableZone.id);

  for (const method of methods) {
    if (!method.enabled) continue;

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

      // Default to 2.95 if cost parsing fails (your WooCommerce setting)
      if (cost === 0 && (country === 'BE' || country === 'NL')) {
        cost = 2.95;
      }

      rates.push({
        method_id: `${method.method_id}:${method.instance_id}`,
        method_title: method.title || method.method_title || 'Verzending',
        cost: cost,
        free: false,
        delivery_time: country === 'NL' ? '1-2 werkdagen' : '2-3 werkdagen'
      });
    } else if (method.method_id === 'free_shipping') {
      // Check if free shipping conditions are met
      const minAmount = parseFloat(settings.min_amount?.value || '0');

      if (total >= minAmount) {
        rates.push({
          method_id: `${method.method_id}:${method.instance_id}`,
          method_title: method.title || 'Gratis verzending',
          cost: 0,
          free: true,
          delivery_time: country === 'NL' ? '1-2 werkdagen' : '2-3 werkdagen'
        });
      }
    } else if (method.method_id === 'local_pickup') {
      rates.push({
        method_id: `${method.method_id}:${method.instance_id}`,
        method_title: method.title || 'Afhalen',
        cost: 0,
        free: true,
        delivery_time: 'Direct beschikbaar'
      });
    }
  }

  // If no rates found but country is BE or NL, provide default rate
  if (rates.length === 0 && (country === 'BE' || country === 'NL')) {
    console.log('[Shipping API] No rates found, using default €2.95 for BE/NL');
    rates.push({
      method_id: 'flat_rate:1',
      method_title: 'Verzending',
      cost: 2.95,
      free: false,
      delivery_time: country === 'NL' ? '1-2 werkdagen' : '2-3 werkdagen'
    });
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
        return NextResponse.json({
          rates: [{
            method_id: 'flat_rate:1',
            method_title: 'Verzending',
            cost: 2.95,
            free: false,
            delivery_time: country === 'NL' ? '1-2 werkdagen' : '2-3 werkdagen'
          }],
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