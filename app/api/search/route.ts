import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';
import { zoekProducten } from '@/lib/productSearch';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const perPage = Math.min(100, Math.max(1, parseInt(searchParams.get('per_page') || '10') || 10));
    const page = Math.max(1, parseInt(searchParams.get('page') || '1') || 1);

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ products: [], total: 0, totalPages: 0 });
    }

    const treffers = zoekProducten(await woocommerce.getSearchCatalog(), query);
    // De omschrijvingen zijn alleen nodig om te zoeken, niet om te tonen.
    const products = treffers
      .slice((page - 1) * perPage, page * perPage)
      .map(({ description, short_description, ...product }) => product);

    return NextResponse.json({
      products,
      total: treffers.length,
      totalPages: Math.ceil(treffers.length / perPage),
    });
  } catch (error: any) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Failed to search products', details: error.message },
      { status: 500 }
    );
  }
}
