import { Resend } from 'resend';

export const MAIL_FROM = process.env.MAIL_FROM || 'Stones for Health <noreply@stonesforhealth.nl>';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@stonesforhealth.nl';

// Lazy initialize Resend to avoid build-time errors
let resend: Resend | null = null;

export function isMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function getResend(): Resend | null {
  if (!isMailConfigured()) {
    console.warn('[Mail] RESEND_API_KEY not configured - emails will not be sent');
    return null;
  }

  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }

  return resend;
}

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer | string }[];
}

/**
 * Send a transactional email. Returns false when mail is not configured,
 * throws when Resend rejects the message (e.g. daily limit reached).
 */
export async function sendMail(options: SendMailOptions): Promise<boolean> {
  const client = getResend();
  if (!client) return false;

  const { error } = await client.emails.send({
    from: options.from || MAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    replyTo: options.replyTo,
    attachments: options.attachments,
  });

  // The Resend SDK reports failures in the response instead of throwing
  if (error) {
    throw new Error(`[Mail] Resend error: ${error.name} - ${error.message}`);
  }

  return true;
}
