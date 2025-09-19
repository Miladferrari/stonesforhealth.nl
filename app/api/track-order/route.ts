import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

// Status mapping for customer-friendly display
const STATUS_MAPPING: Record<string, {
  label: string;
  description: string;
  color: string;
  icon: string;
}> = {
  'pending': {
    label: 'Bestelling ontvangen',
    description: 'We hebben je bestelling ontvangen en gaan deze verwerken',
    color: 'gray',
    icon: '📋'
  },
  'processing': {
    label: 'Bestelling wordt verwerkt',
    description: 'Je bestelling wordt klaargemaakt voor verzending',
    color: 'blue',
    icon: '📦'
  },
  'on-hold': {
    label: 'Wachten op betaling',
    description: 'We wachten op de bevestiging van je betaling',
    color: 'yellow',
    icon: '⏳'
  },
  'completed': {
    label: 'Bestelling verzonden',
    description: 'Je bestelling is verzonden en onderweg naar jou',
    color: 'green',
    icon: '✅'
  },
  'shipped': {
    label: 'Onderweg',
    description: 'Je pakket is onderweg met de bezorgdienst',
    color: 'blue',
    icon: '🚚'
  },
  'delivered': {
    label: 'Afgeleverd',
    description: 'Je bestelling is succesvol afgeleverd',
    color: 'green',
    icon: '📬'
  },
  'cancelled': {
    label: 'Geannuleerd',
    description: 'Deze bestelling is geannuleerd',
    color: 'red',
    icon: '❌'
  },
  'refunded': {
    label: 'Terugbetaald',
    description: 'Het bedrag is teruggestort',
    color: 'purple',
    icon: '💰'
  },
  'failed': {
    label: 'Betaling mislukt',
    description: 'De betaling voor deze bestelling is mislukt',
    color: 'red',
    icon: '⚠️'
  }
};

export async function POST(request: NextRequest) {
  try {
    const { email, orderNumber } = await request.json();

    // Validate input
    if (!email || !orderNumber) {
      return NextResponse.json(
        {
          success: false,
          error: 'E-mailadres en bestelnummer zijn verplicht'
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ongeldig e-mailadres'
        },
        { status: 400 }
      );
    }

    // Clean order number (remove # if present)
    const cleanOrderNumber = orderNumber.toString().replace('#', '');

    console.log(`[Track Order] Looking up order ${cleanOrderNumber} for email ${email}`);

    try {
      // Fetch order from WooCommerce
      const order = await woocommerce.getOrder(cleanOrderNumber);

      if (!order) {
        return NextResponse.json(
          {
            success: false,
            error: 'Bestelling niet gevonden. Controleer je bestelnummer.'
          },
          { status: 404 }
        );
      }

      // Verify email matches (case-insensitive)
      const orderEmail = order.billing?.email?.toLowerCase();
      const providedEmail = email.toLowerCase();

      if (orderEmail !== providedEmail) {
        console.log(`[Track Order] Email mismatch: ${orderEmail} !== ${providedEmail}`);
        return NextResponse.json(
          {
            success: false,
            error: 'E-mailadres komt niet overeen met deze bestelling'
          },
          { status: 403 }
        );
      }

      // Extract tracking information from meta_data
      const metaData = order.meta_data || [];
      const trackingNumber = metaData.find((m: any) => m.key === '_tracking_number')?.value || null;
      const trackingCarrier = metaData.find((m: any) => m.key === '_tracking_carrier')?.value || null;
      const trackingUrl = metaData.find((m: any) => m.key === '_tracking_url')?.value || null;
      const shipmentDate = metaData.find((m: any) => m.key === '_shipment_date')?.value || null;
      const estimatedDelivery = metaData.find((m: any) => m.key === '_estimated_delivery')?.value || null;

      // Get status mapping
      const statusInfo = STATUS_MAPPING[order.status] || {
        label: order.status,
        description: 'Status wordt bijgewerkt',
        color: 'gray',
        icon: '📋'
      };

      // Calculate estimated delivery if not set
      let estimatedDeliveryDate = estimatedDelivery;
      if (!estimatedDeliveryDate && shipmentDate) {
        const shipDate = new Date(shipmentDate);
        shipDate.setDate(shipDate.getDate() + 3); // Add 3 business days
        estimatedDeliveryDate = shipDate.toISOString().split('T')[0];
      }

      // Prepare order timeline
      const timeline = getOrderTimeline(order.status, order.date_created, shipmentDate);

      // Return sanitized order data
      return NextResponse.json({
        success: true,
        order: {
          id: order.id,
          orderNumber: order.id,
          status: order.status,
          statusInfo,
          timeline,
          dateCreated: order.date_created,
          dateModified: order.date_modified,
          total: order.total,
          currency: order.currency || 'EUR',
          paymentMethod: order.payment_method_title || 'Onbekend',

          // Customer info (limited for privacy)
          customer: {
            firstName: order.billing.first_name,
            lastName: order.billing.last_name,
            city: order.shipping?.city || order.billing.city,
            postcode: order.shipping?.postcode || order.billing.postcode,
          },

          // Shipping info
          shipping: {
            method: order.shipping_lines?.[0]?.method_title || 'Standaard verzending',
            total: order.shipping_total || '0',
            address: {
              city: order.shipping?.city || order.billing.city,
              postcode: order.shipping?.postcode || order.billing.postcode,
              country: order.shipping?.country || order.billing.country || 'NL',
            }
          },

          // Tracking information
          tracking: {
            hasTracking: !!trackingNumber,
            trackingNumber,
            carrier: trackingCarrier,
            trackingUrl,
            shipmentDate,
            estimatedDelivery: estimatedDeliveryDate
          },

          // Order items (simplified)
          items: order.line_items?.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            total: item.total,
            price: item.price,
            image: item.image?.src || null
          })) || [],

          // Order notes visible to customer
          customerNotes: order.customer_note || null,
        }
      });

    } catch (wooError: any) {
      console.error('[Track Order] WooCommerce API error:', wooError);

      // Check if it's a 404 (order not found)
      if (wooError.message?.includes('404') || wooError.message?.includes('not found')) {
        return NextResponse.json(
          {
            success: false,
            error: 'Bestelling niet gevonden. Controleer je bestelnummer.'
          },
          { status: 404 }
        );
      }

      throw wooError;
    }

  } catch (error: any) {
    console.error('[Track Order] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Er is een fout opgetreden. Probeer het later opnieuw.'
      },
      { status: 500 }
    );
  }
}

// Helper function to generate order timeline
function getOrderTimeline(status: string, dateCreated: string, shipmentDate?: string) {
  const timeline = [];
  const createdDate = new Date(dateCreated);

  // Always show order received
  timeline.push({
    step: 'received',
    label: 'Bestelling ontvangen',
    date: createdDate.toLocaleDateString('nl-NL'),
    completed: true,
    active: status === 'pending'
  });

  // Show processing if applicable
  if (['processing', 'on-hold', 'completed', 'shipped', 'delivered'].includes(status)) {
    timeline.push({
      step: 'processing',
      label: 'In behandeling',
      date: status === 'processing' ? 'Nu' : createdDate.toLocaleDateString('nl-NL'),
      completed: true,
      active: status === 'processing'
    });
  }

  // Show shipped if applicable
  if (['completed', 'shipped', 'delivered'].includes(status)) {
    timeline.push({
      step: 'shipped',
      label: 'Verzonden',
      date: shipmentDate ? new Date(shipmentDate).toLocaleDateString('nl-NL') : 'Binnenkort',
      completed: ['shipped', 'delivered'].includes(status) || !!shipmentDate,
      active: status === 'completed' || status === 'shipped'
    });
  }

  // Show delivery
  if (['completed', 'shipped', 'delivered'].includes(status)) {
    timeline.push({
      step: 'delivered',
      label: 'Afgeleverd',
      date: status === 'delivered' ? 'Afgeleverd' : 'Verwacht binnen 2-3 dagen',
      completed: status === 'delivered',
      active: status === 'delivered'
    });
  }

  return timeline;
}