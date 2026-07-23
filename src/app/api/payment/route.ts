import { NextResponse } from "next/server";
import { createPayment } from "@/lib/payment/provider";
import { LIMITS } from "@/lib/security/constants";
import { isValidPhone, sanitizeText } from "@/lib/security/validate";

export async function POST(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > LIMITS.maxBodyBytes) {
    return NextResponse.json({ error: "Слишком большой запрос" }, { status: 413 });
  }

  try {
    const raw = await request.json();
    const orderRef = sanitizeText(raw.orderRef, 40);
    const customerName = sanitizeText(raw.customerName, LIMITS.maxNameLength);
    const customerPhone = sanitizeText(raw.customerPhone, LIMITS.maxPhoneLength);
    const customerEmail = sanitizeText(raw.customerEmail, LIMITS.maxEmailLength);
    const returnUrl = sanitizeText(raw.returnUrl, 500);
    const amount = Math.min(Math.max(Number(raw.amount) || 0, 0), 99_999_999_999);

    if (!orderRef || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: "Укажите номер заказа и контактные данные" },
        { status: 400 }
      );
    }

    if (!isValidPhone(customerPhone)) {
      return NextResponse.json(
        { error: "Некорректный номер телефона" },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json({ error: "Некорректная сумма заказа" }, { status: 400 });
    }

    const result = await createPayment({
      orderRef,
      amount,
      customerName,
      customerPhone,
      customerEmail: customerEmail || undefined,
      returnUrl: returnUrl || `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/catalog/cart/payment`,
      description: sanitizeText(raw.description, 200) || undefined,
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error, pendingIntegration: true },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      redirectUrl: result.redirectUrl,
      paymentId: result.paymentId,
    });
  } catch {
    return NextResponse.json({ error: "Не удалось создать платёж" }, { status: 500 });
  }
}