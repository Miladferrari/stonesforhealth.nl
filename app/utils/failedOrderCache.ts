/**
 * Cache voor mislukte bestellingen die wachten op recovery email
 * Key: orderId, Value: { timestamp, emailSent, orderData }
 */

interface FailedOrderData {
  orderId: string;
  timestamp: number;
  emailSent: boolean;
  customerEmail: string;
  orderData: any;
}

// In-memory cache (in productie zou je Redis of database gebruiken)
const failedOrders = new Map<string, FailedOrderData>();

/**
 * Registreer een mislukte bestelling
 */
export function registerFailedOrder(orderId: string, customerEmail: string, orderData: any): void {
  failedOrders.set(orderId, {
    orderId,
    timestamp: Date.now(),
    emailSent: false,
    customerEmail,
    orderData,
  });

  console.log(`[Failed Order] Registered failed order ${orderId} for email recovery`);
}

/**
 * Markeer een bestelling als succesvol (zodat recovery email niet wordt verstuurd)
 */
export function markOrderAsSuccessful(orderId: string): void {
  if (failedOrders.has(orderId)) {
    failedOrders.delete(orderId);
    console.log(`[Failed Order] Removed ${orderId} from failed orders - payment succeeded`);
  }
}

/**
 * Markeer recovery email als verstuurd
 */
export function markRecoveryEmailSent(orderId: string): void {
  const order = failedOrders.get(orderId);
  if (order) {
    order.emailSent = true;
    console.log(`[Failed Order] Marked recovery email as sent for ${orderId}`);
  }
}

/**
 * Haal alle mislukte bestellingen op die klaar zijn voor recovery email
 * (ouder dan 5 minuten en email nog niet verstuurd)
 */
export function getOrdersReadyForRecovery(): FailedOrderData[] {
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000; // 5 minuten in milliseconds

  const ready: FailedOrderData[] = [];

  failedOrders.forEach((order) => {
    const age = now - order.timestamp;
    if (age >= fiveMinutes && !order.emailSent) {
      ready.push(order);
    }
  });

  return ready;
}

/**
 * Cleanup oude entries (ouder dan 24 uur)
 */
export function cleanupOldFailedOrders(): void {
  const now = Date.now();
  const oneDayAgo = now - (24 * 60 * 60 * 1000);

  let cleanedCount = 0;
  failedOrders.forEach((order, orderId) => {
    if (order.timestamp < oneDayAgo) {
      failedOrders.delete(orderId);
      cleanedCount++;
    }
  });

  if (cleanedCount > 0) {
    console.log(`[Failed Order] Cleaned up ${cleanedCount} old failed orders`);
  }
}

/**
 * Check of een bestelling in de failed list staat
 */
export function isOrderInFailedList(orderId: string): boolean {
  return failedOrders.has(orderId);
}
