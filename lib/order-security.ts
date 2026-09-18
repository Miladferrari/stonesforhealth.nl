import { timingSafeEqual } from 'crypto';
import type Stripe from 'stripe';
import { woocommerce } from '@/lib/woocommerce';

/**
 * Order IDs are sequential, so an ID alone must never grant access to an order.
 * The WooCommerce order_key acts as the shared secret between us and the customer.
 */
export function orderKeyMatches(order: any, orderKey: unknown): boolean {
  if (typeof orderKey !== 'string' || !orderKey || typeof order?.order_key !== 'string') {
    return false;
  }
  const a = Buffer.from(order.order_key);
  const b = Buffer.from(orderKey);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Fetch an order and verify the caller knows its order_key.
 * Returns null when the order does not exist or the key is wrong.
 */
export async function getOrderWithKey(orderId: unknown, orderKey: unknown): Promise<any | null> {
  const id = parseInt(String(orderId), 10);
  if (!Number.isInteger(id) || id <= 0) return null;

  try {
    const order = await woocommerce.getOrder(id);
    if (!order?.id || !orderKeyMatches(order, orderKey)) return null;
    return order;
  } catch {
    return null;
  }
}

/** Order total in cents, as WooCommerce calculated it */
export function orderTotalInCents(order: any): number {
  return Math.round(parseFloat(order.total) * 100);
}

export type PaymentCheck =
  | { ok: true; order: any }
  | { ok: false; reason: string; order?: any };

/**
 * Verify that a succeeded PaymentIntent really pays for the given order:
 * it must be created for this order and cover the full WooCommerce total.
 */
export async function verifyPaymentForOrder(
  paymentIntent: Stripe.PaymentIntent,
  orderId: string
): Promise<PaymentCheck> {
  const intentOrderId = paymentIntent.metadata?.orderId || paymentIntent.metadata?.order_id;
  if (!intentOrderId || String(intentOrderId) !== String(orderId)) {
    return { ok: false, reason: `PaymentIntent ${paymentIntent.id} hoort niet bij order ${orderId}` };
  }

  let order: any;
  try {
    order = await woocommerce.getOrder(orderId);
  } catch {
    return { ok: false, reason: `Order ${orderId} kon niet worden opgehaald` };
  }
  if (!order?.id) {
    return { ok: false, reason: `Order ${orderId} bestaat niet` };
  }

  const expected = orderTotalInCents(order);
  const received = paymentIntent.amount_received;
  const currencyOk = paymentIntent.currency.toLowerCase() === String(order.currency).toLowerCase();

  if (!currencyOk || received < expected) {
    return {
      ok: false,
      order,
      reason: `Bedrag komt niet overeen: ontvangen ${received} ${paymentIntent.currency}, verwacht ${expected} ${order.currency} (PaymentIntent ${paymentIntent.id})`,
    };
  }

  return { ok: true, order };
}
