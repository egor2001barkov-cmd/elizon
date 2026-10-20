import { COMPANY } from "@/lib/constants";

export function getContactInboxEmail(): string {
  return process.env.CONTACT_EMAIL?.trim() || COMPANY.email;
}

/**
 * Дубли заявок на личную почту владельца.
 * По умолчанию — egor.freeman@yandex.ru; переопределяется LEADS_CC_EMAIL
 * (несколько адресов через запятую). Пустое значение отключает дубли.
 */
export function getLeadsCcEmails(): string {
  const raw = process.env.LEADS_CC_EMAIL;
  if (raw === undefined) return "egor.freeman@yandex.ru";
  return raw
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean)
    .join(", ");
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
  const cc = getLeadsCcEmails();
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[ELIZON Email] SMTP не настроен — письмо не отправлено");
    }
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
      ...(cc ? { cc } : {}),
      replyTo: replyTo?.trim() || undefined,
      subject,
      text,
    });

    return true;
  } catch {
    // Do not log message body / recipient details
    console.error("[ELIZON Email] send failed");
    return false;
  }
}