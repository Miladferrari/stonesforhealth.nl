// Email Template 2: Sent after 24 hours and every 3 days
// Includes 5% discount code "COMEBACK5"

interface CartItem {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface AbandonedCartEmail2Props {
  customerName: string;
  cartItems: CartItem[];
  cartTotal: number;
  recoveryLink: string;
  couponCode: string;
  emailCount: number; // To customize message based on how many emails sent
}

export const AbandonedCartEmail2 = ({
  customerName,
  cartItems,
  cartTotal,
  recoveryLink,
  couponCode,
  emailCount,
}: AbandonedCartEmail2Props) => {
  const firstName = customerName.split(' ')[0] || 'daar';
  const isFirstDiscountEmail = emailCount === 2; // Second email overall, first with discount

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isFirstDiscountEmail ? '🎁 Speciaal voor jou: 5% EXTRA korting!' : '⏰ Laatste kans: 5% korting loopt af!'}</title>
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
                ${isFirstDiscountEmail ? '🎁 Speciaal voor jou!' : '⏰ Laatste kans!'}
              </h1>
              <p style="margin: 12px 0 0; color: #ffffff; font-size: 18px; opacity: 0.95; font-weight: 600;">
                5% EXTRA korting op je winkelwagen
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
                ${isFirstDiscountEmail
                  ? 'We missen je! 💜 Omdat we je graag als klant willen verwelkomen, geven we je <strong style="color: #492c4a;">5% EXTRA korting</strong> op je winkelwagen. Dit aanbod is exclusief voor jou!'
                  : 'Dit is je laatste herinnering! Je hebt nog steeds <strong style="color: #492c4a;">5% EXTRA korting</strong> op je winkelwagen. Mis deze kans niet! 🎁'}
              </p>

              <!-- Coupon Code Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td style="background: linear-gradient(135deg, #fbe022 0%, #e6cc1f 100%); border-radius: 16px; padding: 30px; text-align: center; border: 3px dashed #492c4a;">
                    <p style="margin: 0 0 12px; color: #492c4a; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                      Jouw exclusieve kortingscode
                    </p>
                    <p style="margin: 0; color: #492c4a; font-size: 36px; font-weight: bold; font-family: 'Courier New', monospace; letter-spacing: 2px;">
                      ${couponCode}
                    </p>
                    <p style="margin: 12px 0 0; color: #000000; font-size: 14px; font-weight: 600;">
                      🎉 Krijg 5% korting op je hele bestelling!
                    </p>
                  </td>
                </tr>
              </table>

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

                    <!-- Total with discount -->
                    <table width="100%" cellpadding="12" cellspacing="0" style="margin-top: 20px; border-top: 2px solid #e8dcc6;">
                      <tr>
                        <td style="text-align: right;">
                          <p style="margin: 0 0 5px; color: #3b223b; font-size: 14px; text-decoration: line-through; opacity: 0.6;">
                            €${cartTotal.toFixed(2)}
                          </p>
                          <p style="margin: 0; color: #492c4a; font-size: 24px; font-weight: bold;">
                            Nu: €${(cartTotal * 0.95).toFixed(2)}
                          </p>
                          <p style="margin: 5px 0 0; color: #16a34a; font-size: 14px; font-weight: 600;">
                            ✓ Je bespaart €${(cartTotal * 0.05).toFixed(2)}
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
                          5% EXTRA korting (bovenop andere kortingen!)
                        </td>
                      </tr>
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
                      💎 Claim je 5% korting nu!
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0; color: #3b223b; font-size: 14px; line-height: 1.6; opacity: 0.8; text-align: center;">
                ${isFirstDiscountEmail
                  ? 'Deze code is exclusief voor jou en beperkt geldig. Bestel nu en bespaar!'
                  : '⏰ Dit is je laatste herinnering! Gebruik je korting voordat het te laat is.'}
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
          Je ontvangt deze email omdat je items hebt toegevoegd aan je winkelwagen op stonesforhealth.nl.
          Wil je geen herinneringen meer? <a href="https://stonesforhealth.nl" style="color: #492c4a;">Klik hier</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};
