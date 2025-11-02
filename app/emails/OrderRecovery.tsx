interface OrderRecoveryEmailProps {
  customerName: string;
  orderNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: string;
    image?: string;
  }>;
  total: string;
  checkoutUrl: string;
}

export function OrderRecoveryEmail({
  customerName,
  orderNumber,
  items,
  total,
  checkoutUrl,
}: OrderRecoveryEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Je winkelwagen wacht op je - Stones for Health</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #faf8f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f4; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #492c4a 0%, #6b4069 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #fbe022; font-size: 32px; font-weight: bold;">Je bestelling wacht op je! 🛒</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px;">We hebben gezien dat je betaling niet is gelukt</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px 0; color: #3b223b; font-size: 16px; line-height: 1.6;">
                Hoi ${customerName},
              </p>
              <p style="margin: 0 0 20px 0; color: #3b223b; font-size: 16px; line-height: 1.6;">
                We zagen dat je probeerde een bestelling te plaatsen, maar dat de betaling helaas niet is gelukt.
                Geen zorgen - je winkelwagen staat nog klaar voor je!
              </p>

              <!-- Alert Box -->
              <div style="background-color: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 14px;">
                  💡 <strong>Tip:</strong> Controleer of je voldoende saldo hebt of probeer een andere betaalmethode.
                </p>
              </div>

              <h2 style="color: #492c4a; font-size: 24px; margin: 30px 0 20px 0;">Je producten wachten op je</h2>

              <!-- Products -->
              ${items.map(item => `
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
                  <tr>
                    <td width="80%" valign="middle">
                      <div style="color: #3b223b; font-size: 16px; font-weight: 600; margin-bottom: 5px;">${item.name}</div>
                      <div style="color: #6b7280; font-size: 14px;">
                        Aantal: ${item.quantity} × €${item.price}
                      </div>
                    </td>
                    <td width="20%" align="right" valign="middle">
                      <div style="color: #492c4a; font-size: 18px; font-weight: bold;">
                        €${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                </table>
              `).join('')}

              <!-- Total -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0; background-color: #f3f0e8; padding: 20px; border-radius: 8px;">
                <tr>
                  <td style="font-size: 20px; font-weight: bold; color: #492c4a;">
                    Totaalbedrag:
                  </td>
                  <td align="right" style="font-size: 24px; font-weight: bold; color: #492c4a;">
                    €${total}
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${checkoutUrl}" style="display: inline-block; background: linear-gradient(135deg, #fbe022 0%, #e6cc1f 100%); color: #000000; text-decoration: none; padding: 18px 40px; border-radius: 50px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s;">
                      ✨ Voltooi je bestelling nu
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6;">
                Deze producten zijn populair en kunnen snel uitverkocht raken.<br>
                Bestel nu en ontvang je bestelling binnen 2-3 werkdagen!
              </p>

              <!-- Benefits -->
              <div style="background-color: #eff6ff; padding: 25px; margin-top: 30px; border-radius: 12px;">
                <h3 style="margin: 0 0 15px 0; color: #492c4a; font-size: 18px; text-align: center;">Waarom bij Stones for Health?</h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="33%" align="center" style="padding: 10px;">
                      <div style="font-size: 32px; margin-bottom: 8px;">✓</div>
                      <div style="color: #3b223b; font-size: 14px; font-weight: 600;">Authentieke edelstenen</div>
                    </td>
                    <td width="33%" align="center" style="padding: 10px;">
                      <div style="font-size: 32px; margin-bottom: 8px;">📦</div>
                      <div style="color: #3b223b; font-size: 14px; font-weight: 600;">Gratis verzending vanaf €25</div>
                    </td>
                    <td width="33%" align="center" style="padding: 10px;">
                      <div style="font-size: 32px; margin-bottom: 8px;">💚</div>
                      <div style="color: #3b223b; font-size: 14px; font-weight: 600;">14 dagen retourrecht</div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Help -->
              <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                  Hulp nodig bij je bestelling?<br>
                  Neem contact met ons op via <a href="mailto:info@stonesforhealth.nl" style="color: #492c4a; text-decoration: none; font-weight: 600;">info@stonesforhealth.nl</a>
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
              <p style="margin: 20px 0 10px 0; color: #9ca3af; font-size: 12px;">
                Je ontvangt deze email omdat je een bestelling probeerde te plaatsen op stonesforhealth.nl
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
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
