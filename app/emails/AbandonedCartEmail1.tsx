// Email Template 1: Sent after 2 hours - "Je winkelwagen wacht op je!"
// No discount code, just a friendly reminder

interface CartItem {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface AbandonedCartEmail1Props {
  customerName: string;
  cartItems: CartItem[];
  cartTotal: number;
  recoveryLink: string;
}

export const AbandonedCartEmail1 = ({
  customerName,
  cartItems,
  cartTotal,
  recoveryLink,
}: AbandonedCartEmail1Props) => {
  const firstName = customerName.split(' ')[0] || 'daar';

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Je winkelwagen wacht op je!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F5F1E8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F1E8; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(73, 44, 74, 0.15);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #492c4a 0%, #6b4069 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #fbe022; font-size: 32px; font-weight: bold; letter-spacing: -0.5px;">
                🛒 Je winkelwagen wacht op je!
              </h1>
              <p style="margin: 12px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">
                Vergeet je niet iets?
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #3b223b; font-size: 16px; line-height: 1.6;">
                Hoi ${firstName},
              </p>
              <p style="margin: 0 0 30px; color: #3b223b; font-size: 16px; line-height: 1.6;">
                We zagen dat je wat mooie items hebt toegevoegd aan je winkelwagen, maar je bestelling nog niet hebt afgerond. Je items staan nog steeds voor je klaar! ✨
              </p>

              <!-- Cart Items -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; background-color: #faf8f4; border-radius: 12px; padding: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 15px; color: #492c4a; font-size: 18px; font-weight: bold;">
                      In je winkelwagen:
                    </p>
                    ${cartItems.map(item => `
                      <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 15px;">
                        <tr>
                          <td width="80" valign="top">
                            <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 2px solid #e8dcc6;" />
                          </td>
                          <td valign="top">
                            <p style="margin: 0 0 4px; color: #3b223b; font-size: 15px; font-weight: 600;">
                              ${item.name}
                            </p>
                            <p style="margin: 0; color: #3b223b; font-size: 14px; opacity: 0.7;">
                              ${item.quantity}x - €${item.price.toFixed(2)}
                            </p>
                          </td>
                        </tr>
                      </table>
                    `).join('')}

                    <!-- Total -->
                    <table width="100%" cellpadding="12" cellspacing="0" style="margin-top: 20px; border-top: 2px solid #e8dcc6;">
                      <tr>
                        <td style="text-align: right;">
                          <p style="margin: 0; color: #492c4a; font-size: 20px; font-weight: bold;">
                            Totaal: €${cartTotal.toFixed(2)}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Benefits -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; background: linear-gradient(135deg, #fbe022 0%, #e6cc1f 100%); border-radius: 12px; padding: 20px;">
                <tr>
                  <td>
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td width="30" valign="top">
                          <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #492c4a; color: white; text-align: center; font-size: 12px; line-height: 20px;">✓</div>
                        </td>
                        <td style="color: #000000; font-size: 15px; font-weight: 600;">
                          Gratis verzending vanaf €30
                        </td>
                      </tr>
                      <tr>
                        <td width="30" valign="top">
                          <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #492c4a; color: white; text-align: center; font-size: 12px; line-height: 20px;">✓</div>
                        </td>
                        <td style="color: #000000; font-size: 15px; font-weight: 600;">
                          30 dagen retourgarantie
                        </td>
                      </tr>
                      <tr>
                        <td width="30" valign="top">
                          <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #492c4a; color: white; text-align: center; font-size: 12px; line-height: 20px;">✓</div>
                        </td>
                        <td style="color: #000000; font-size: 15px; font-weight: 600;">
                          100% Authentieke edelstenen
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${recoveryLink}" style="display: inline-block; background: linear-gradient(135deg, #492c4a 0%, #6b4069 100%); color: #fbe022; text-decoration: none; padding: 18px 50px; border-radius: 50px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 12px rgba(73, 44, 74, 0.3);">
                      🛍️ Rond je bestelling af
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0; color: #3b223b; font-size: 14px; line-height: 1.6; opacity: 0.8; text-align: center;">
                Je items blijven nog even voor je gereserveerd. Bestel snel voor ze uitverkocht zijn! ✨
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f4; padding: 30px; text-align: center; border-top: 1px solid #e8dcc6;">
              <p style="margin: 0 0 10px; color: #492c4a; font-size: 18px; font-weight: bold;">
                Stones for Health
              </p>
              <p style="margin: 0 0 15px; color: #3b223b; font-size: 14px; opacity: 0.7;">
                Authentieke Kristallen & Edelstenen
              </p>
              <p style="margin: 0; color: #3b223b; font-size: 13px; opacity: 0.6;">
                <a href="https://stonesforhealth.nl" style="color: #492c4a; text-decoration: none;">stonesforhealth.nl</a>
                <span style="margin: 0 8px;">•</span>
                <a href="mailto:info@stonesforhealth.nl" style="color: #492c4a; text-decoration: none;">info@stonesforhealth.nl</a>
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer Note -->
        <p style="margin: 20px 0 0; color: #3b223b; font-size: 12px; opacity: 0.6; text-align: center; max-width: 500px;">
          Je ontvangt deze email omdat je items hebt toegevoegd aan je winkelwagen op stonesforhealth.nl
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};
