import type { CreatePaymentInput, CreatePaymentResult } from "./types";

/**
 * Создаёт платёжную сессию. Подключите банк через переменные окружения:
 * PAYMENT_MERCHANT_ID, PAYMENT_SECRET_KEY, PAYMENT_API_URL
 */
export async function createPayment(
  input: CreatePaymentInput
): Promise<CreatePaymentResult> {
  const merchantId = process.env.PAYMENT_MERCHANT_ID;
  const secretKey = process.env.PAYMENT_SECRET_KEY;
  const apiUrl = process.env.PAYMENT_API_URL;

  if (!merchantId || !secretKey || !apiUrl) {
    return {
      ok: false,
      error:
        "Платёжный шлюз пока не подключён. Заказ принят — менеджер свяжется с вами для оплаты.",
    };
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        merchantId,
        orderRef: input.orderRef,
        amount: input.amount,
        currency: "RUB",
        customer: {
          name: input.customerName,
          email: input.customerEmail,
          phone: input.customerPhone,
        },
        returnUrl: input.returnUrl,
        description: input.description ?? `Заказ ${input.orderRef}`,
      }),
    });

    if (!response.ok) {
      return { ok: false, error: "Банк отклонил создание платежа. Попробуйте позже." };
    }

    const data = (await response.json()) as {
      paymentId?: string;
      redirectUrl?: string;
      payment_url?: string;
    };

    const redirectUrl = data.redirectUrl ?? data.payment_url;
    if (!redirectUrl) {
      return { ok: false, error: "Банк не вернул ссылку на оплату." };
    }

    return {
      ok: true,
      redirectUrl,
      paymentId: data.paymentId,
    };
  } catch {
    return { ok: false, error: "Не удалось связаться с платёжным шлюзом." };
  }
}