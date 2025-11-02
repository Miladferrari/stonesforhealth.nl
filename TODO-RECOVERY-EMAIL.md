# TODO: Failed Order Recovery Email Implementatie

## Status: DISABLED (Tijdelijk)

De failed order recovery email feature is tijdelijk uitgeschakeld omdat deze niet werkt in Vercel's serverless omgeving zonder database.

## Wat werkt WEL:
✅ Newsletter popup met kortingscode
✅ Coupon validatie en generatie
✅ Order bevestiging emails (klant + eigenaar)
✅ Alle bestaande checkout functionaliteit

## Wat NIET werkt (tijdelijk disabled):
❌ Recovery emails voor mislukte betalingen

## Om dit te fixen:

### 1. Installeer Vercel KV
```bash
# In Vercel dashboard:
# Storage → Create → KV Database → Connect to project
```

### 2. Installeer dependencies
```bash
npm install @vercel/kv
```

### 3. Update failedOrderCache.ts
Vervang de in-memory Map door Vercel KV:

```typescript
import { kv } from '@vercel/kv';

export async function registerFailedOrder(orderId: string, customerEmail: string, orderData: any) {
  await kv.set(`failed:${orderId}`, {
    orderId,
    timestamp: Date.now(),
    emailSent: false,
    customerEmail,
    orderData,
  }, { ex: 86400 }); // 24 uur TTL

  console.log(`[Failed Order] Registered failed order ${orderId} for email recovery`);
}

export async function markOrderAsSuccessful(orderId: string): Promise<void> {
  await kv.del(`failed:${orderId}`);
  console.log(`[Failed Order] Removed ${orderId} from failed orders - payment succeeded`);
}

export async function markRecoveryEmailSent(orderId: string): Promise<void> {
  const order = await kv.get<FailedOrderData>(`failed:${orderId}`);
  if (order) {
    order.emailSent = true;
    await kv.set(`failed:${orderId}`, order, { ex: 86400 });
    console.log(`[Failed Order] Marked recovery email as sent for ${orderId}`);
  }
}

export async function getOrdersReadyForRecovery(): Promise<FailedOrderData[]> {
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;

  // Scan all failed order keys
  const keys = await kv.keys('failed:*');
  const orders: FailedOrderData[] = [];

  for (const key of keys) {
    const order = await kv.get<FailedOrderData>(key);
    if (order) {
      const age = now - order.timestamp;
      if (age >= fiveMinutes && !order.emailSent) {
        orders.push(order);
      }
    }
  }

  return orders;
}

export async function cleanupOldFailedOrders(): Promise<void> {
  // KV TTL handelt dit automatisch af (ex: 86400 = 24 uur)
  // Geen handmatige cleanup nodig
}

export async function isOrderInFailedList(orderId: string): Promise<boolean> {
  const order = await kv.get(`failed:${orderId}`);
  return order !== null;
}
```

### 4. Uncomment webhook code
In `/app/api/stripe-webhook/route.ts`:
- Uncomment regel 5: `import { registerFailedOrder, markOrderAsSuccessful } from '@/app/utils/failedOrderCache';`
- Uncomment regel 381-382: `markOrderAsSuccessful(orderId);`
- Uncomment regel 421-445: Failed order registratie code

### 5. Re-enable cron job
In `/vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/send-recovery-emails",
      "schedule": "*/15 * * * *"
    }
  ]
}
```

### 6. Test
1. Trigger een failed payment
2. Wacht 15+ minuten
3. Check of recovery email is verstuurd

## Bestanden betrokken:
- `/app/utils/failedOrderCache.ts` - Update naar KV
- `/app/api/stripe-webhook/route.ts` - Uncomment code
- `/app/api/send-recovery-emails/route.ts` - Klaar voor gebruik
- `/app/emails/OrderRecovery.tsx` - Klaar voor gebruik
- `/vercel.json` - Re-enable cron

## Geschatte tijd: 1-2 uur
