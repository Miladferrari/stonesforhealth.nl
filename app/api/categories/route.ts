import { NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export async function GET() {
  try {
    const categories = await woocommerce.getCategories({ per_page: 100, hide_empty: false });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;