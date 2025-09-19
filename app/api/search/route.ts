import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json([]);
    }

    // Search for products
    const products = await woocommerce.searchProducts(query, {
      per_page: 10, // Limit to 10 results for search
      page: 1
    });

    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Failed to search products', details: error.message },
      { status: 500 }
    );
  }
}