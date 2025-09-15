import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting: Store IP addresses with timestamp
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 3; // Max 3 requests per minute

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for') || 'unknown';

    // Check rate limit
    const now = Date.now();
    const lastRequest = rateLimitMap.get(clientIp);

    if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW) {
      return NextResponse.json(
        { error: 'Te veel verzoeken. Probeer het later opnieuw.' },
        { status: 429 }
      );
    }

    rateLimitMap.set(clientIp, now);

    // Clean up old entries
    for (const [ip, timestamp] of rateLimitMap.entries()) {
      if (now - timestamp > RATE_LIMIT_WINDOW * 2) {
        rateLimitMap.delete(ip);
      }
    }

    // Parse request body
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Naam, e-mail en bericht zijn verplicht.' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ongeldig e-mailadres.' },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Naam moet tussen 2 en 100 karakters zijn.' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Bericht moet tussen 10 en 5000 karakters zijn.' },
        { status: 400 }
      );
    }

    // Create transporter with environment variables
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { error: 'E-mail service is tijdelijk niet beschikbaar. Probeer het later opnieuw.' },
        { status: 503 }
      );
    }

    // Format current date and time
    const now_date = new Date();
    const dateStr = now_date.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const timeStr = now_date.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Create HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #492c4a 0%, #6b4670 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e0e0e0;
              border-radius: 0 0 10px 10px;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: #f8f8f8;
              border-left: 4px solid #492c4a;
              border-radius: 5px;
            }
            .field-label {
              font-weight: bold;
              color: #492c4a;
              margin-bottom: 5px;
              display: block;
            }
            .field-value {
              color: #555;
              word-wrap: break-word;
            }
            .message-field {
              background: #fff;
              border: 1px solid #ddd;
              padding: 20px;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e0e0e0;
              text-align: center;
              color: #777;
              font-size: 14px;
            }
            .timestamp {
              background: #fbe022;
              color: #333;
              padding: 10px;
              border-radius: 5px;
              text-align: center;
              margin-bottom: 20px;
              font-weight: bold;
            }
            a {
              color: #492c4a;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Nieuw Contactformulier Bericht</h1>
            <p style="margin: 5px 0; opacity: 0.9;">Stones for Health</p>
          </div>

          <div class="content">
            <div class="timestamp">
              📅 ${dateStr} om ${timeStr}
            </div>

            <div class="field">
              <span class="field-label">👤 Naam:</span>
              <span class="field-value">${name}</span>
            </div>

            <div class="field">
              <span class="field-label">✉️ E-mail:</span>
              <span class="field-value"><a href="mailto:${email}">${email}</a></span>
            </div>

            ${phone ? `
            <div class="field">
              <span class="field-label">📞 Telefoon:</span>
              <span class="field-value">${phone}</span>
            </div>
            ` : ''}

            ${subject ? `
            <div class="field">
              <span class="field-label">📋 Onderwerp:</span>
              <span class="field-value">${subject}</span>
            </div>
            ` : ''}

            <div class="message-field">
              <span class="field-label">💬 Bericht:</span>
              <div class="field-value" style="margin-top: 10px; white-space: pre-wrap;">${message}</div>
            </div>

            <div class="footer">
              <p>Dit bericht is verzonden via het contactformulier op stonesforhealth.nl</p>
              <p>IP Adres: ${clientIp}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version for fallback
    const textContent = `
Nieuw Contactformulier Bericht - Stones for Health

Ontvangen op: ${dateStr} om ${timeStr}

CONTACT DETAILS:
================
Naam: ${name}
E-mail: ${email}
${phone ? `Telefoon: ${phone}` : ''}
${subject ? `Onderwerp: ${subject}` : ''}

BERICHT:
========
${message}

---
Dit bericht is verzonden via het contactformulier op stonesforhealth.nl
IP Adres: ${clientIp}
    `;

    // Email options
    const mailOptions = {
      from: `"Stones for Health Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: subject || `Nieuw contact van ${name} - Stones for Health`,
      text: textContent,
      html: htmlContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send auto-reply to customer
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #492c4a 0%, #6b4670 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e0e0e0;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              background: #fbe022;
              color: #333;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 25px;
              font-weight: bold;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Bedankt voor uw bericht!</h1>
            <p>Stones for Health</p>
          </div>

          <div class="content">
            <p>Beste ${name},</p>

            <p>Hartelijk dank voor uw bericht. We hebben uw vraag in goede orde ontvangen en zullen zo spoedig mogelijk contact met u opnemen.</p>

            <p><strong>Wat kunt u verwachten?</strong></p>
            <ul>
              <li>We streven ernaar binnen 24 uur te reageren</li>
              <li>Voor dringende vragen kunt u ons telefonisch bereiken</li>
              <li>Openingstijden: Ma-Vr 09:00-17:00, Za 10:00-16:00</li>
            </ul>

            <p><strong>Uw bericht:</strong></p>
            <div style="background: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
              ${message}
            </div>

            <p>Met vriendelijke groet,<br>
            Team Stones for Health</p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">

            <p style="font-size: 12px; color: #777; text-align: center;">
              Stones for Health<br>
              Koperhoek 54, 3162 LA Rhoon<br>
              KVK: 95898476<br>
              <a href="https://stonesforhealth.nl" style="color: #492c4a;">stonesforhealth.nl</a>
            </p>
          </div>
        </body>
      </html>
    `;

    const autoReplyOptions = {
      from: `"Stones for Health" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Bevestiging: We hebben uw bericht ontvangen - Stones for Health',
      html: autoReplyHtml,
    };

    // Send auto-reply
    try {
      await transporter.sendMail(autoReplyOptions);
    } catch (autoReplyError) {
      console.error('Auto-reply failed:', autoReplyError);
      // Don't fail the main request if auto-reply fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Uw bericht is succesvol verzonden! We nemen zo snel mogelijk contact met u op.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        error: 'Er is iets misgegaan bij het verzenden van uw bericht. Probeer het later opnieuw of stuur een e-mail naar info@stonesforhealth.nl'
      },
      { status: 500 }
    );
  }
}