interface NewOrderNotificationEmailProps {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: string;
    total: string;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    postcode: string;
    country: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    postcode: string;
    country: string;
  };
  subtotal: string;
  shippingCost: string;
  discount?: string;
  total: string;
  paymentMethod: string;
}

export function NewOrderNotificationEmail({
  orderNumber,
  orderDate,
  customerName,
  customerEmail,
  customerPhone,
  items,
  shippingAddress,
  billingAddress,
  subtotal,
  shippingCost,
  discount,
  total,
  paymentMethod,
}: NewOrderNotificationEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nieuwe Bestelling - Stones for Health</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🎉 Nieuwe Bestelling!</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">stonesforhealth.nl</p>
            </td>
          </tr>

          <!-- Alert Box -->
          <tr>
            <td style="padding: 30px 40px 20px 40px;">
              <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px;">
                <p style="margin: 0; color: #1e40af; font-weight: 600; font-size: 14px;">
                  ⚡ Nieuwe bestelling ontvangen - actie vereist
                </p>
              </div>
            </td>
          </tr>

          <!-- Order Info -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #111827;">Bestelnummer:</strong>
                    <span style="color: #374151; float: right; font-weight: 600; font-size: 16px;">#${orderNumber}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
                    <strong style="color: #111827;">Datum & Tijd:</strong>
                    <span style="color: #374151; float: right;">${orderDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
                    <strong style="color: #111827;">Totaalbedrag:</strong>
                    <span style="color: #16a34a; float: right; font-weight: 700; font-size: 18px;">€${total}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
                    <strong style="color: #111827;">Betaalmethode:</strong>
                    <span style="color: #374151; float: right;">${paymentMethod}</span>
                  </td>
                </tr>
              </table>

              <!-- Customer Info -->
              <h2 style="color: #111827; font-size: 20px; margin: 30px 0 15px 0;">Klantgegevens</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #111827;">Naam:</strong>
                    <span style="color: #374151; float: right;">${customerName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
                    <strong style="color: #111827;">Email:</strong>
                    <a href="mailto:${customerEmail}" style="color: #3b82f6; text-decoration: none; float: right;">${customerEmail}</a>
                  </td>
                </tr>
                ${customerPhone ? `
                <tr>
                  <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
                    <strong style="color: #111827;">Telefoon:</strong>
                    <span style="color: #374151; float: right;">${customerPhone}</span>
                  </td>
                </tr>
                ` : ''}
              </table>

              <!-- Products -->
              <h2 style="color: #111827; font-size: 20px; margin: 30px 0 15px 0;">Bestelde producten</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; color: #111827; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Product</th>
                    <th style="padding: 12px; text-align: center; color: #111827; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Aantal</th>
                    <th style="padding: 12px; text-align: right; color: #111827; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Prijs</th>
                    <th style="padding: 12px; text-align: right; color: #111827; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Totaal</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map((item, index) => `
                    <tr style="${index > 0 ? 'border-top: 1px solid #e5e7eb;' : ''}">
                      <td style="padding: 12px; color: #374151;">${item.name}</td>
                      <td style="padding: 12px; text-align: center; color: #374151;">${item.quantity}</td>
                      <td style="padding: 12px; text-align: right; color: #374151;">€${item.price}</td>
                      <td style="padding: 12px; text-align: right; color: #374151; font-weight: 600;">€${item.total}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <!-- Order Total -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; background-color: #f9fafb; padding: 15px; border-radius: 8px;">
                <tr>
                  <td style="padding: 8px 0; text-align: right; color: #374151;">
                    <span>Subtotaal:</span>
                    <span style="margin-left: 40px; font-weight: 600;">€${subtotal}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; text-align: right; color: #374151;">
                    <span>Verzendkosten:</span>
                    <span style="margin-left: 40px; font-weight: 600;">€${shippingCost}</span>
                  </td>
                </tr>
                ${discount ? `
                <tr>
                  <td style="padding: 8px 0; text-align: right; color: #16a34a;">
                    <span>Korting:</span>
                    <span style="margin-left: 40px; font-weight: 600;">-€${discount}</span>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 0; text-align: right; border-top: 2px solid #111827; margin-top: 8px;">
                    <span style="font-size: 18px; font-weight: bold; color: #111827;">Totaal:</span>
                    <span style="margin-left: 40px; font-size: 20px; font-weight: bold; color: #16a34a;">€${total}</span>
                  </td>
                </tr>
              </table>

              <!-- Addresses -->
              <h2 style="color: #111827; font-size: 20px; margin: 30px 0 15px 0;">Verzend- en factuuradres</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48%" valign="top">
                    <h3 style="color: #111827; font-size: 16px; margin: 0 0 10px 0;">📦 Verzendadres</h3>
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; color: #374151; line-height: 1.6; font-size: 14px;">
                      <strong>${shippingAddress.firstName} ${shippingAddress.lastName}</strong><br>
                      ${shippingAddress.address1}<br>
                      ${shippingAddress.address2 ? `${shippingAddress.address2}<br>` : ''}
                      ${shippingAddress.postcode} ${shippingAddress.city}<br>
                      ${shippingAddress.country}
                    </div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" valign="top">
                    <h3 style="color: #111827; font-size: 16px; margin: 0 0 10px 0;">📄 Factuuradres</h3>
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; color: #374151; line-height: 1.6; font-size: 14px;">
                      <strong>${billingAddress.firstName} ${billingAddress.lastName}</strong><br>
                      ${billingAddress.address1}<br>
                      ${billingAddress.address2 ? `${billingAddress.address2}<br>` : ''}
                      ${billingAddress.postcode} ${billingAddress.city}<br>
                      ${billingAddress.country}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Action Required -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-top: 30px; border-radius: 4px;">
                <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">⚠️ Actie vereist</h3>
                <p style="margin: 0; color: #78350f; line-height: 1.6; font-size: 14px;">
                  Verwerk deze bestelling in je WooCommerce admin en stuur een Track & Trace code naar de klant zodra het pakket onderweg is.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 13px;">
                Dit is een automatische notificatie van je Stones for Health webshop
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
