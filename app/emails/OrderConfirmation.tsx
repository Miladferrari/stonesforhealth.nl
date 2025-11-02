interface OrderConfirmationEmailProps {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
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

export function OrderConfirmationEmail({
  orderNumber,
  orderDate,
  customerName,
  customerEmail,
  items,
  shippingAddress,
  billingAddress,
  subtotal,
  shippingCost,
  discount,
  total,
  paymentMethod,
}: OrderConfirmationEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bestelbevestiging - Stones for Health</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #faf8f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f4; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #492c4a 0%, #6b4069 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #fbe022; font-size: 32px; font-weight: bold;">Bedankt voor je bestelling!</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px;">Je bestelling is succesvol ontvangen</p>
            </td>
          </tr>

          <!-- Order Info -->
          <tr>
            <td style="padding: 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #f3f0e8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <table width="100%">
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #492c4a;">Bestelnummer:</strong>
                          <span style="color: #3b223b; float: right; font-weight: 600;">#${orderNumber}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #e5e1d8;">
                          <strong style="color: #492c4a;">Datum:</strong>
                          <span style="color: #3b223b; float: right;">${orderDate}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #e5e1d8;">
                          <strong style="color: #492c4a;">Betaalmethode:</strong>
                          <span style="color: #3b223b; float: right;">${paymentMethod}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <h2 style="color: #492c4a; font-size: 24px; margin: 30px 0 20px 0;">Bestelde producten</h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; color: #492c4a; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Product</th>
                    <th style="padding: 12px; text-align: center; color: #492c4a; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Aantal</th>
                    <th style="padding: 12px; text-align: right; color: #492c4a; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Prijs</th>
                    <th style="padding: 12px; text-align: right; color: #492c4a; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Totaal</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map((item, index) => `
                    <tr style="${index > 0 ? 'border-top: 1px solid #e5e7eb;' : ''}">
                      <td style="padding: 12px; color: #3b223b;">${item.name}</td>
                      <td style="padding: 12px; text-align: center; color: #3b223b;">${item.quantity}</td>
                      <td style="padding: 12px; text-align: right; color: #3b223b;">€${item.price}</td>
                      <td style="padding: 12px; text-align: right; color: #3b223b; font-weight: 600;">€${item.total}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <!-- Order Total -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                <tr>
                  <td style="padding: 8px 0; text-align: right; color: #3b223b;">
                    <span>Subtotaal:</span>
                    <span style="margin-left: 40px; font-weight: 600;">€${subtotal}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; text-align: right; color: #3b223b;">
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
                  <td style="padding: 12px 0; text-align: right; border-top: 2px solid #492c4a; margin-top: 8px;">
                    <span style="font-size: 18px; font-weight: bold; color: #492c4a;">Totaal:</span>
                    <span style="margin-left: 40px; font-size: 20px; font-weight: bold; color: #492c4a;">€${total}</span>
                  </td>
                </tr>
              </table>

              <!-- Addresses -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td width="48%" valign="top">
                    <h3 style="color: #492c4a; font-size: 18px; margin: 0 0 15px 0;">Verzendadres</h3>
                    <div style="background-color: #f3f0e8; padding: 15px; border-radius: 8px; color: #3b223b; line-height: 1.6;">
                      <strong>${shippingAddress.firstName} ${shippingAddress.lastName}</strong><br>
                      ${shippingAddress.address1}<br>
                      ${shippingAddress.address2 ? `${shippingAddress.address2}<br>` : ''}
                      ${shippingAddress.postcode} ${shippingAddress.city}<br>
                      ${shippingAddress.country}
                    </div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" valign="top">
                    <h3 style="color: #492c4a; font-size: 18px; margin: 0 0 15px 0;">Factuuradres</h3>
                    <div style="background-color: #f3f0e8; padding: 15px; border-radius: 8px; color: #3b223b; line-height: 1.6;">
                      <strong>${billingAddress.firstName} ${billingAddress.lastName}</strong><br>
                      ${billingAddress.address1}<br>
                      ${billingAddress.address2 ? `${billingAddress.address2}<br>` : ''}
                      ${billingAddress.postcode} ${billingAddress.city}<br>
                      ${billingAddress.country}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <div style="background-color: #eff6ff; border-left: 4px solid #492c4a; padding: 20px; margin-top: 30px; border-radius: 4px;">
                <h3 style="margin: 0 0 10px 0; color: #492c4a; font-size: 18px;">Wat nu?</h3>
                <p style="margin: 0; color: #3b223b; line-height: 1.6;">
                  We gaan direct aan de slag met je bestelling! Je ontvangt een Track & Trace code zodra je pakket onderweg is.
                  Heb je vragen? Neem gerust contact met ons op via <a href="mailto:info@stonesforhealth.nl" style="color: #492c4a; text-decoration: none; font-weight: 600;">info@stonesforhealth.nl</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                Met vriendelijke groet,<br>
                <strong style="color: #492c4a;">Team Stones for Health</strong>
              </p>
              <p style="margin: 20px 0 0 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} Stones for Health. Alle rechten voorbehouden.
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
