import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { woocommerce } from '@/lib/woocommerce';

// Create transporter with Gmail configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Format price for display
const formatPrice = (price: string | number) => {
  return `€${parseFloat(price.toString()).toFixed(2).replace('.', ',')}`;
};

// Generate order confirmation HTML email
const generateOrderConfirmationEmail = (order: any) => {
  const shippingMethod = order.shipping_lines?.[0]?.method_title || 'Standaard verzending';
  const shippingCost = order.shipping_lines?.[0]?.total || '0';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Georgia', serif; color: #2D2D2D; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #492c4a 0%, #6b4a6c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e8dcc6; border-radius: 0 0 10px 10px; }
        .order-info { background: #f9f7f4; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table th { background: #492c4a; color: white; padding: 12px; text-align: left; }
        .table td { padding: 12px; border-bottom: 1px solid #e8dcc6; }
        .total-row { font-weight: bold; background: #f9f7f4; }
        .button { display: inline-block; padding: 12px 30px; background: #FAD14C; color: #2D2D2D; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e8dcc6; }
        .address-section { display: flex; justify-content: space-between; margin: 20px 0; }
        .address-block { flex: 1; padding: 15px; background: #f9f7f4; border-radius: 8px; margin: 0 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">Bedankt voor je bestelling!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Stones for Health</p>
        </div>

        <div class="content">
          <p>Beste ${order.billing.first_name || ''} ${order.billing.last_name},</p>

          <p>We hebben je bestelling ontvangen en zullen deze zo spoedig mogelijk verwerken. Hieronder vind je de details van je bestelling.</p>

          <div class="order-info">
            <h2 style="color: #492c4a; margin-top: 0;">Bestelnummer: #${order.id}</h2>
            <p><strong>Datum:</strong> ${new Date(order.date_created).toLocaleDateString('nl-NL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p><strong>Status:</strong> ${order.status === 'processing' ? 'In behandeling' : 'Ontvangen'}</p>
          </div>

          <h3 style="color: #492c4a;">Bestelgegevens</h3>
          <table class="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Aantal</th>
                <th>Prijs</th>
                <th>Totaal</th>
              </tr>
            </thead>
            <tbody>
              ${order.line_items.map((item: any) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>${formatPrice(item.price)}</td>
                  <td>${formatPrice(item.total)}</td>
                </tr>
              `).join('')}
              ${order.coupon_lines?.length > 0 ? `
                <tr>
                  <td colspan="3">Kortingscode: ${order.coupon_lines[0].code}</td>
                  <td>-${formatPrice(order.coupon_lines[0].discount)}</td>
                </tr>
              ` : ''}
              <tr>
                <td colspan="3">Verzendmethode: ${shippingMethod}</td>
                <td>${parseFloat(shippingCost) === 0 ? 'Gratis' : formatPrice(shippingCost)}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3">Totaal</td>
                <td>${formatPrice(order.total)}</td>
              </tr>
            </tbody>
          </table>

          <div class="address-section">
            <div class="address-block">
              <h4 style="color: #492c4a; margin-top: 0;">Verzendadres</h4>
              <p style="margin: 5px 0;">
                ${order.shipping.first_name || ''} ${order.shipping.last_name}<br>
                ${order.shipping.address_1}<br>
                ${order.shipping.address_2 ? order.shipping.address_2 + '<br>' : ''}
                ${order.shipping.postcode} ${order.shipping.city}<br>
                ${order.shipping.country === 'NL' ? 'Nederland' : order.shipping.country}
              </p>
            </div>

            <div class="address-block">
              <h4 style="color: #492c4a; margin-top: 0;">Factuuradres</h4>
              <p style="margin: 5px 0;">
                ${order.billing.first_name || ''} ${order.billing.last_name}<br>
                ${order.billing.address_1}<br>
                ${order.billing.address_2 ? order.billing.address_2 + '<br>' : ''}
                ${order.billing.postcode} ${order.billing.city}<br>
                ${order.billing.country === 'NL' ? 'Nederland' : order.billing.country}
              </p>
            </div>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p><strong>Geschatte levering:</strong> ${
              order.shipping.country === 'NL' ? '1-2 werkdagen' : '3-5 werkdagen'
            }</p>
          </div>

          <div class="footer">
            <p>Heb je vragen over je bestelling? Neem contact met ons op via:</p>
            <p>
              Email: info@stonesforhealth.nl<br>
              Telefoon: +31 6 12345678
            </p>
            <p style="margin-top: 20px;">
              Met vriendelijke groet,<br>
              <strong>Het Stones for Health Team</strong>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    const { orderId, sendToAdmin = true } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing');
      // Don't expose configuration issues to client
      return NextResponse.json(
        {
          success: true,
          message: 'Order confirmation process initiated',
          warning: 'Email service not configured'
        }
      );
    }

    // Fetch order from WooCommerce
    const order = await woocommerce.getOrder(orderId);

    if (!order || order.code === 'woocommerce_rest_shop_order_invalid_id') {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Create email transporter
    const transporter = createTransporter();

    // Generate email HTML
    const emailHTML = generateOrderConfirmationEmail(order);

    // Send email to customer
    try {
      await transporter.sendMail({
        from: `"Stones for Health" <${process.env.EMAIL_USER}>`,
        to: order.billing.email,
        subject: `Orderbevestiging #${order.id} - Stones for Health`,
        html: emailHTML,
        text: `Bedankt voor je bestelling! Je bestelnummer is #${order.id}. We zullen je bestelling zo spoedig mogelijk verwerken.`
      });

      console.log(`Order confirmation email sent to ${order.billing.email} for order #${order.id}`);
    } catch (emailError) {
      console.error('Failed to send customer email:', emailError);
      // Continue even if customer email fails
    }

    // Send notification to admin if requested
    if (sendToAdmin && process.env.ADMIN_EMAIL) {
      try {
        const adminEmailHTML = `
          <h2>Nieuwe bestelling ontvangen</h2>
          <p><strong>Bestelnummer:</strong> #${order.id}</p>
          <p><strong>Klant:</strong> ${order.billing.first_name} ${order.billing.last_name}</p>
          <p><strong>Email:</strong> ${order.billing.email}</p>
          <p><strong>Telefoon:</strong> ${order.billing.phone || 'Niet opgegeven'}</p>
          <p><strong>Totaal:</strong> ${formatPrice(order.total)}</p>
          <p><strong>Betaalmethode:</strong> ${order.payment_method_title}</p>
          <hr>
          ${emailHTML}
        `;

        await transporter.sendMail({
          from: `"Stones for Health Orders" <${process.env.EMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: `Nieuwe bestelling #${order.id} - ${order.billing.first_name} ${order.billing.last_name}`,
          html: adminEmailHTML
        });

        console.log(`Admin notification sent for order #${order.id}`);
      } catch (adminEmailError) {
        console.error('Failed to send admin email:', adminEmailError);
        // Continue even if admin email fails
      }
    }

    // Close transporter
    transporter.close();

    return NextResponse.json({
      success: true,
      message: 'Order confirmation email sent successfully',
      orderId: order.id,
      customerEmail: order.billing.email
    });

  } catch (error) {
    console.error('Error sending order confirmation:', error);
    return NextResponse.json(
      { error: 'Failed to send order confirmation' },
      { status: 500 }
    );
  }
}