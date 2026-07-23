import { NextResponse } from "next/server";
import { LIMITS } from "./constants";
import {
  isBotSubmission,
  isValidEmail,
  isValidInn,
  isValidPhone,
  sanitizeCartItem,
  sanitizeText,
  type BotCheckInput,
} from "./validate";

export interface SecureContactInput extends BotCheckInput {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  quantity?: unknown;
  comment?: unknown;
  type?: unknown;
  companyName?: unknown;
  inn?: unknown;
  kpp?: unknown;
  legalAddress?: unknown;
  city?: unknown;
  deliveryAddress?: unknown;
  preferredDate?: unknown;
  paymentMethod?: unknown;
  cart?: unknown;
  total?: unknown;
}

export interface SanitizedContactPayload {
  name: string;
  phone: string;
  email?: string;
  quantity?: string;
  comment?: string;
  type?: "callback" | "contact" | "order" | "invoice";
  companyName?: string;
  inn?: string;
  kpp?: string;
  legalAddress?: string;
  city?: string;
  deliveryAddress?: string;
  preferredDate?: string;
  paymentMethod?: string;
  cart?: ReturnType<typeof sanitizeCartItem>[];
  total?: number;
}

export function guardContactRequest(
  raw: SecureContactInput
): { ok: true; data: SanitizedContactPayload } | { ok: false; response: NextResponse } {
  if (isBotSubmission(raw)) {
    return {
      ok: false,
      response: NextResponse.json({ success: true }),
    };
  }

  const name = sanitizeText(raw.name, LIMITS.maxNameLength);
  const phone = sanitizeText(raw.phone, LIMITS.maxPhoneLength);

  if (!name || !phone) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Укажите имя и телефон" },
        { status: 400 }
      ),
    };
  }

  if (!isValidPhone(phone)) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Некорректный номер телефона" },
        { status: 400 }
      ),
    };
  }

  const email = sanitizeText(raw.email, LIMITS.maxEmailLength);
  if (email && !isValidEmail(email)) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Некорректный email" },
        { status: 400 }
      ),
    };
  }

  const inn = sanitizeText(raw.inn, 12);
  if (!isValidInn(inn)) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Некорректный ИНН" }, { status: 400 }),
    };
  }

  const allowedTypes = ["callback", "contact", "order", "invoice"] as const;
  const type = allowedTypes.includes(raw.type as (typeof allowedTypes)[number])
    ? (raw.type as SanitizedContactPayload["type"])
    : undefined;

  let cart: SanitizedContactPayload["cart"];
  if (Array.isArray(raw.cart)) {
    cart = raw.cart
      .slice(0, LIMITS.maxCartItems)
      .map((item) => sanitizeCartItem(item as SecureContactInput));
  }

  const total = cart?.length
    ? Math.min(Math.max(Number(raw.total) || 0, 0), 99_999_999_999)
    : undefined;

  const city = sanitizeText(raw.city, 100);
  const deliveryAddress = sanitizeText(raw.deliveryAddress, 500);
  const preferredDate = sanitizeText(raw.preferredDate, 30);
  const allowedPayments = ["prepayment", "invoice"] as const;
  const paymentRaw = sanitizeText(raw.paymentMethod, 30);
  const paymentMethod = allowedPayments.includes(
    paymentRaw as (typeof allowedPayments)[number]
  )
    ? paymentRaw
    : undefined;

  if (cart?.length) {
    if (!city || city.length < 2) {
      return {
        ok: false,
        response: NextResponse.json(
          { error: "Укажите город доставки" },
          { status: 400 }
        ),
      };
    }
    if (!deliveryAddress || deliveryAddress.length < 10) {
      return {
        ok: false,
        response: NextResponse.json(
          { error: "Укажите полный адрес доставки" },
          { status: 400 }
        ),
      };
    }
  }

  return {
    ok: true,
    data: {
      name,
      phone,
      email: email || undefined,
      quantity: sanitizeText(raw.quantity, 20) || undefined,
      comment: sanitizeText(raw.comment) || undefined,
      type: cart?.length ? "order" : type,
      companyName: sanitizeText(raw.companyName, 200) || undefined,
      inn: inn || undefined,
      kpp: sanitizeText(raw.kpp, 9) || undefined,
      legalAddress: sanitizeText(raw.legalAddress) || undefined,
      city: city || undefined,
      deliveryAddress: deliveryAddress || undefined,
      preferredDate: preferredDate || undefined,
      paymentMethod: paymentMethod || undefined,
      cart,
      total,
    },
  };
}

export function checkBodySize(contentLength: string | null): boolean {
  if (!contentLength) return true;
  const size = parseInt(contentLength, 10);
  return !Number.isNaN(size) && size <= LIMITS.maxBodyBytes;
}