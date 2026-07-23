import { COMPANY } from "@/lib/constants";

export function getContactInboxEmail(): string {
  return process.env.CONTACT_EMAIL?.trim() || COMPANY.email;
}

export interface SendMailOptions {
  subject: string;
  text: string;
  replyTo?: string;
}

export async function sendContactEmail({
  subject,
  text,
  replyTo,
}: SendMailOptions): Promise<boolean> {
  const to = getContactInboxEmail();
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("[ELIZON Email] SMTP не настроен — письмо не отправлено на", to);
    return false;
  }

  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port) || 587,
      secure: Number(port) === 465,
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM?.trim() || `"ELIZON" <${user}>`,
      to,
      replyTo: replyTo?.trim() || undefined,
      subject,
      text,
    });

    return true;
  } catch (err) {
    console.error("[ELIZON Email]", err);
    return false;
  }
}