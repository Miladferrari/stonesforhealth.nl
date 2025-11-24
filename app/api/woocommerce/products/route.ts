import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const params: any = {};

    if (searchParams.get('per_page')) {
      params.per_page = parseInt(searchParams.get('per_page')!);
    }
    if (searchParams.get('page')) {
      params.page = parseInt(searchParams.get('page')!);
    }
    if (searchParams.get('orderby')) {
      params.orderby = searchParams.get('orderby');
    }
    if (searchParams.get('order')) {
      params.order = searchParams.get('order') as 'asc' | 'desc';
    }
    if (searchParams.get('category')) {
      params.category = searchParams.get('category');
    }
    if (searchParams.get('include')) {
      params.include = searchParams.get('include')!.split(',').map(id => parseInt(id));
    }
    if (searchParams.get('featured')) {
      params.featured = searchParams.get('featured') === 'true';
    }
    if (searchParams.get('on_sale')) {
      params.on_sale = searchParams.get('on_sale') === 'true';
    }
    if (searchParams.get('status')) {
      params.status = searchParams.get('status');
    }

    console.log('[API /woocommerce/products] Fetching products with params:', params);

    // Fetch products from WooCommerce with pagination info
    const result = await woocommerce.getProducts(params);

    // Validate response
    if (!result || !Array.isArray(result.products)) {
      console.error('[API /woocommerce/products] Invalid response from WooCommerce:', typeof result);
      return NextResponse.json(
        { error: 'Invalid data format from WooCommerce' },
        { status: 500 }
      );
    }

    console.log('[API /woocommerce/products] Successfully fetched', result.products.length, 'products (total:', result.total, ')');

    // Return response with pagination headers and cache control
    const response = NextResponse.json(result.products);
    response.headers.set('X-WP-Total', result.total.toString());
    response.headers.set('X-WP-TotalPages', result.totalPages.toString());
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');

    return response;
  } catch (error: any) {
    console.error('[API /woocommerce/products] Error fetching products:', error.message || error);
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        message: error.message || 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}