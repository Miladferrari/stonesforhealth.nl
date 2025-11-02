interface WelcomeDiscountEmailProps {
  couponCode: string;
  expiryDate: string;
}

export const WelcomeDiscountEmail = ({
  couponCode,
  expiryDate,
}: WelcomeDiscountEmailProps) => {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jouw €10 Kortingscode</title>
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
                🎉 Gefeliciteerd!
              </h1>
              <p style="margin: 12px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">
                Jouw welkomstkorting is klaar
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #3b223b; font-size: 16px; line-height: 1.6;">
                Bedankt voor je aanmelding bij <strong>Stones for Health</strong>!
              </p>
              <p style="margin: 0 0 30px; color: #3b223b; font-size: 16px; line-height: 1.6;">
                Als welkom cadeau krijg je van ons <strong style="color: #492c4a;">€10 korting</strong> op je eerste bestelling. Gebruik de onderstaande kortingscode bij het afrekenen:
              </p>

              <!-- Coupon Code Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td style="background: linear-gradient(135deg, #fbe022 0%, #e6cc1f 100%); border-radius: 16px; padding: 30px; text-align: center; border: 3px dashed #492c4a;">
                    <p style="margin: 0 0 12px; color: #492c4a; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                      Jouw kortingscode
                    </p>
                    <p style="margin: 0; color: #492c4a; font-size: 36px; font-weight: bold; font-family: 'Courier New', monospace; letter-spacing: 2px;">
                      ${couponCode}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Benefits -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; background-color: #faf8f4; border-radius: 12px; padding: 20px;">
                <tr>
                  <td>
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td width="30" valign="top">
                          <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #492c4a; color: white; text-align: center; font-size: 12px; line-height: 20px;">✓</div>
                        </td>
                        <td style="color: #3b223b; font-size: 15px;">
                          <strong>€10 korting</strong> op je bestelling
                        </td>
                      </tr>
                      <tr>
                        <td width="30" valign="top">
                          <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #492c4a; color: white; text-align: center; font-size: 12px; line-height: 20px;">✓</div>
                        </td>
                        <td style="color: #3b223b; font-size: 15px;">
                          Minimale besteding: <strong>€25</strong>
                        </td>
                      </tr>
                      <tr>
                        <td width="30" valign="top">
                          <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #492c4a; color: white; text-align: center; font-size: 12px; line-height: 20px;">✓</div>
                        </td>
                        <td style="color: #3b223b; font-size: 15px;">
                          Geldig tot: <strong>${new Date(expiryDate).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
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
                    <a href="https://stonesforhealth.nl/bestsellers" style="display: inline-block; background: linear-gradient(135deg, #fbe022 0%, #e6cc1f 100%); color: #000000; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 12px rgba(251, 224, 34, 0.3);">
                      🛍️ Start met winkelen
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0; color: #3b223b; font-size: 14px; line-height: 1.6; opacity: 0.8; text-align: center;">
                Ontdek onze collectie van authentieke edelstenen en kristallen, met liefde geselecteerd voor jouw spirituele reis. ✨
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
          Je ontvangt deze email omdat je je hebt aangemeld voor onze nieuwsbrief op stonesforhealth.nl
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};
