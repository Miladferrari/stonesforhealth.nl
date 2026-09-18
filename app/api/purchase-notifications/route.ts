import { NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';

interface PurchaseNotification {
  id: string;
  orderId: number;
  customerName: string; // Voornaam
  productName: string;
  timestamp: string; // ISO string
}

// Serverless has no writable disk, and every visitor polls this endpoint:
// keep a short in-memory copy so WooCommerce is asked at most once a minute per instance.
const CACHE_TTL = 60 * 1000;
let cached: { at: number; notifications: PurchaseNotification[] } | null = null;

/**
 * GET /api/purchase-notifications
 * Recente, echt betaalde bestellingen van de afgelopen 24 uur (alleen voornaam + product)
 */
export async function GET() {
  try {
    if (!cached || Date.now() - cached.at > CACHE_TTL) {
      const orders = await woocommerce.getRecentPaidOrders(5);

      cached = {
        at: Date.now(),
        notifications: orders
          .filter((order: any) => order.billing?.first_name && order.line_items?.[0]?.name)
          .map((order: any) => ({
            id: `order-${order.id}`,
            orderId: order.id,
            customerName: order.billing.first_name,
            productName: order.line_items[0].name,
            timestamp: order.date_paid_gmt ? `${order.date_paid_gmt}Z` : new Date().toISOString(),
          })),
      };
    }

    return NextResponse.json({
      success: true,
      notifications: cached.notifications,
      count: cached.notifications.length,
    });
  } catch (error) {
    console.error('Error fetching purchase notifications:', error);
    return NextResponse.json({ success: true, notifications: [], count: 0 });
  }
}
