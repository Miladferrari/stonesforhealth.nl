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
    if (searchParams.get('hide_empty')) {
      params.hide_empty = searchParams.get('hide_empty') === 'true';
    }
    if (searchParams.get('parent')) {
      params.parent = parseInt(searchParams.get('parent')!);
    }
    
    // Fetch categories from WooCommerce
    const categories = await woocommerce.getCategories(params);
    
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', details: error.message },
      { status: 500 }
    );
  }
}