import { NextResponse } from "next/server";
import { getContactInboxEmail, sendContactEmail } from "@/lib/email/send-mail";
import { guardContactRequest, type SanitizedContactPayload } from "@/lib/security/api-guard";
import { LIMITS } from "@/lib/security/constants";
import { PAYMENT_LABELS } from "@/lib/data/order-form";

interface CartItemPayload {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  km?: number;
  isCustom?: boolean;
  leadTime?: string;
}

function formatCartLines(cart: CartItemPayload[]): string[] {
  return cart.map((item) => {
    const line = `• ${item.name}`;
    const qty = item.km ? `${item.km} км` : `× ${item.quantity}`;
    const price = (item.unitPrice * item.quantity).toLocaleString("ru-RU");
    const custom = item.isCustom ? " [под заказ 14–21 дн.]" : "";
    return `${line} — ${qty} — ${price} ₽${custom}`;
  });
}

function formatMessage(body: SanitizedContactPayload): { html: string; plain: string } {
  const title =
    body.type === "callback"
      ? "Заявка на обратный звонок ELIZON"
      : body.type === "invoice"
        ? "Запрос на выставление счёта ELIZON"
        : body.type === "order" || body.cart?.length
          ? "Заказ из корзины ELIZON"
          : "Новая заявка ELIZON";

  const lines = [
    title,
    "",
    body.companyName ? `Организация: ${body.companyName}` : "",
    body.inn ? `ИНН: ${body.inn}` : "",
    body.kpp ? `КПП: ${body.kpp}` : "",
    body.legalAddress ? `Юр. адрес: ${body.legalAddress}` : "",
    `Контактное лицо: ${body.name}`,
    `Телефон: ${body.phone}`,
    body.email ? `Email: ${body.email}` : "",
    body.quantity ? `Катушек: ${body.quantity}` : "",
    body.comment
      ? body.type === "invoice"
        ? `Состав счёта: ${body.comment}`
        : `Комментарий: ${body.comment}`
      : "",
  ];

  if (body.cart?.length) {
    lines.push("", "Доставка:");
    if (body.city) lines.push(`Город: ${body.city}`);
    if (body.deliveryAddress) lines.push(`Адрес: ${body.deliveryAddress}`);
    if (body.preferredDate) lines.push(`Желаемая дата: ${body.preferredDate}`);
    if (body.paymentMethod) {
      lines.push(
        `Оплата: ${PAYMENT_LABELS[body.paymentMethod as keyof typeof PAYMENT_LABELS] ?? body.paymentMethod}`
      );
    }
    lines.push("", "Состав заказа:");
    lines.push(...formatCartLines(body.cart));
    if (body.total) {
      lines.push("", `Итого: ${body.total.toLocaleString("ru-RU")} ₽`);
    }
  }

  const plain = lines.filter(Boolean).join("\n");
  return { html: plain, plain };
}

async function sendTelegram(message: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

function buildEmailSubject(body: SanitizedContactPayload): string {
  if (body.type === "callback") return "Обратный звонок ELIZON";
  if (body.type === "invoice" || body.paymentMethod === "invoice") {
    return "Запрос счёта ELIZON";
  }
  if (body.type === "order" || body.cart?.length) {
    return body.paymentMethod === "prepayment"
      ? "Заказ ELIZON — предоплата безналом"
      : "Заказ ELIZON";
  }
  return "Заявка ELIZON";
}

export async function POST(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > LIMITS.maxBodyBytes) {
    return NextResponse.json({ error: "Слишком большой запрос" }, { status: 413 });
  }

  try {
    const raw = await request.json();
    const guard = guardContactRequest(raw);

    if (!guard.ok) {
      return guard.response;
    }

    const body = guard.data;
    const { plain } = formatMessage(body);

    const inbox = getContactInboxEmail();

    const [telegramSent, emailSent] = await Promise.all([
      sendTelegram(plain),
      sendContactEmail({
        subject: buildEmailSubject(body),
        text: plain,
        replyTo: body.email,
      }),
    ]);

    if (!telegramSent && !emailSent) {
      console.log(`[ELIZON Contact Form → ${inbox}]`, plain);
      return NextResponse.json({
        success: true,
        note: "Заявка принята (режим разработки)",
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Не удалось отправить заявку" },
      { status: 500 }
    );
  }
}