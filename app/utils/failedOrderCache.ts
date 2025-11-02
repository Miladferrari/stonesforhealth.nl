/**
 * WooCommerce-based failed order tracking
 * Uses order metadata instead of external cache/database
 */

// WooCommerce API configuration
const WC_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || process.env.WOOCOMMERCE_URL || '';
const WC_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

export interface FailedOrderData {
  orderId: string;
  timestamp: number;
  emailSent: boolean;
  customerEmail: string;
  orderData: any;
}

/**
 * Registreer een mislukte bestelling via WooCommerce metadata
 */
export async function registerFailedOrder(orderId: string, customerEmail: string, orderData: any): Promise<void> {
  try {
    const endpoint = `${WC_URL}/orders/${orderId}`;

    await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64'),
      },
      body: JSON.stringify({
        meta_data: [
          {
            key: '_recovery_email_scheduled',
            value: Date.now().toString(),
          },
          {
            key: '_recovery_email_sent',
            value: 'false',
          },
        ],
      }),
    });

    console.log(`[Failed Order] Registered failed order ${orderId} for email recovery`);
  } catch (error) {
    console.error(`[Failed Order] Failed to register order ${orderId}:`, error);
  }
}

/**
 * Markeer een bestelling als succesvol (verwijder recovery metadata)
 */
export async function markOrderAsSuccessful(orderId: string): Promise<void> {
  try {
    const endpoint = `${WC_URL}/orders/${orderId}`;

    // Haal huidige order op
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64'),
      },
    });

    if (!response.ok) return;

    const order = await response.json();

    // Verwijder recovery metadata
    const updatedMetaData = order.meta_data.filter((meta: any) =>
      meta.key !== '_recovery_email_scheduled' &&
      meta.key !== '_recovery_email_sent'
    );

    await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64'),
      },
      body: JSON.stringify({
        meta_data: updatedMetaData,
      }),
    });

    console.log(`[Failed Order] Removed ${orderId} from failed orders - payment succeeded`);
  } catch (error) {
    console.error(`[Failed Order] Failed to mark order ${orderId} as successful:`, error);
  }
}

/**
 * Markeer recovery email als verstuurd
 */
export async function markRecoveryEmailSent(orderId: string): Promise<void> {
  try {
    const endpoint = `${WC_URL}/orders/${orderId}`;

    await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64'),
      },
      body: JSON.stringify({
        meta_data: [
          {
            key: '_recovery_email_sent',
            value: 'true',
          },
        ],
      }),
    });

    console.log(`[Failed Order] Marked recovery email as sent for ${orderId}`);
  } catch (error) {
    console.error(`[Failed Order] Failed to mark email sent for ${orderId}:`, error);
  }
}

/**
 * Haal alle mislukte bestellingen op die klaar zijn voor recovery email
 */
export async function getOrdersReadyForRecovery(): Promise<FailedOrderData[]> {
  try {
    const now = Date.now();
    const fifteenMinutes = 15 * 60 * 1000; // 15 minuten

    // Haal alle failed orders op van de afgelopen 24 uur
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const endpoint = `${WC_URL}/orders?status=failed&after=${oneDayAgo}&per_page=100`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64'),
      },
    });

    if (!response.ok) {
      console.error('[Failed Order] Failed to fetch orders');
      return [];
    }

    const orders = await response.json();
    const readyOrders: FailedOrderData[] = [];

    for (const order of orders) {
      const scheduledMeta = order.meta_data?.find((m: any) => m.key === '_recovery_email_scheduled');
      const sentMeta = order.meta_data?.find((m: any) => m.key === '_recovery_email_sent');

      if (scheduledMeta && sentMeta?.value !== 'true') {
        const timestamp = parseInt(scheduledMeta.value);
        const age = now - timestamp;

        // Check of ouder dan 15 minuten
        if (age >= fifteenMinutes) {
          readyOrders.push({
            orderId: order.id.toString(),
            timestamp,
            emailSent: false,
            customerEmail: order.billing.email,
            orderData: order,
          });
        }
      }
    }

    console.log(`[Failed Order] Found ${readyOrders.length} orders ready for recovery`);
    return readyOrders;
  } catch (error) {
    console.error('[Failed Order] Failed to get orders ready for recovery:', error);
    return [];
  }
}

/**
 * Cleanup oude entries - niet meer nodig, WooCommerce handelt dit af
 */
export function cleanupOldFailedOrders(): void {
  // No-op - WooCommerce orders worden automatisch beheerd
  console.log('[Failed Order] Cleanup not needed - WooCommerce handles this');
}
