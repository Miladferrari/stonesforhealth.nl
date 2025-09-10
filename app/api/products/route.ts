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
    
    // Fetch products from WooCommerce
    const products = await woocommerce.getProducts(params);
    
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}