import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

// All transactional mail goes through Mailgun SMTP.
// EU domains use smtp.eu.mailgun.org, US domains smtp.mailgun.org.
const SMTP_HOST = process.env.MAILGUN_SMTP_HOST || 'smtp.eu.mailgun.org';
const SMTP_PORT = parseInt(process.env.MAILGUN_SMTP_PORT || '587', 10);

export const MAIL_FROM = process.env.MAIL_FROM || 'Stones for Health <noreply@stonesforhealth.nl>';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@stonesforhealth.nl';

let transporter: nodemailer.Transporter | null = null;

export function isMailConfigured(): boolean {
  return Boolean(process.env.MAILGUN_SMTP_USER && process.env.MAILGUN_SMTP_PASSWORD);
}

function getTransporter(): nodemailer.Transporter | null {
  if (!isMailConfigured()) {
    console.warn('[Mail] MAILGUN_SMTP_USER / MAILGUN_SMTP_PASSWORD not configured - emails will not be sent');
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: process.env.MAILGUN_SMTP_USER,
        pass: process.env.MAILGUN_SMTP_PASSWORD,
      },
    });
  }

  return transporter;
}

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: Mail.Attachment[];
}

/**
 * Send a transactional email. Returns false when mail is not configured,
 * throws when Mailgun rejects the message.
 */
export async function sendMail(options: SendMailOptions): Promise<boolean> {
  const transport = getTransporter();
  if (!transport) return false;

  await transport.sendMail({
    from: options.from || MAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    replyTo: options.replyTo,
    attachments: options.attachments,
  });

  return true;
}
