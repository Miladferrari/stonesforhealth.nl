import { NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export async function GET() {
  try {
    console.log('[API /categories] Fetching categories from WooCommerce...');
    const categories = await woocommerce.getCategories({ per_page: 100, hide_empty: false });

    // Validate response
    if (!Array.isArray(categories)) {
      console.error('[API /categories] WooCommerce returned non-array data:', typeof categories);
      return NextResponse.json(
        { error: 'Invalid data format from WooCommerce' },
        { status: 500 }
      );
    }

    console.log('[API /categories] Successfully fetched', categories.length, 'categories');

    // Add cache headers to prevent stale data
    const response = NextResponse.json(categories);
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');

    return response;
  } catch (error: any) {
    console.error('[API /categories] Failed to fetch categories:', error.message || error);

    return NextResponse.json(
      {
        error: 'Failed to fetch categories',
        message: error.message || 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;