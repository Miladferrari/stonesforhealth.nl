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
      const categoryParam = searchParams.get('category')!;

      // Check if category is a number (ID) or a slug
      if (isNaN(Number(categoryParam))) {
        // It's a slug, we need to convert it to an ID
        try {
          const categories = await woocommerce.getCategories({ per_page: 100 });
          const matchedCategory = categories.find(cat => cat.slug === categoryParam);

          if (matchedCategory) {
            params.category = matchedCategory.id.toString();
            console.log(`[Products API] Converted category slug "${categoryParam}" to ID ${matchedCategory.id}`);
          } else {
            console.warn(`[Products API] Category slug "${categoryParam}" not found, will return empty results`);
            // Still set it, but WooCommerce will return empty results
            params.category = categoryParam;
          }
        } catch (error) {
          console.error('[Products API] Failed to fetch categories for slug conversion:', error);
          // Fall back to using the slug as-is
          params.category = categoryParam;
        }
      } else {
        // It's already an ID
        params.category = categoryParam;
      }
    }
    if (searchParams.get('include')) {
      params.include = searchParams.get('include')!.split(',').map(id => parseInt(id));
    }

    // Fetch products from WooCommerce with pagination info
    const result = await woocommerce.getProducts(params);

    // Return response with pagination headers
    const response = NextResponse.json(result.products);
    response.headers.set('X-WP-Total', result.total.toString());
    response.headers.set('X-WP-TotalPages', result.totalPages.toString());

    return response;
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}