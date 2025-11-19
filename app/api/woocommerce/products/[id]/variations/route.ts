import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Fetch product variations from WooCommerce
    const variations = await woocommerce.getProductVariations(productId);

    return NextResponse.json(variations);
  } catch (error: any) {
    console.error('Error fetching product variations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product variations', details: error.message },
      { status: 500 }
    );
  }
}
