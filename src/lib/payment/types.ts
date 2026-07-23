export interface PaymentCartItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  km?: number;
}

export interface PaymentSession {
  orderRef: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: PaymentCartItem[];
  createdAt: number;
}

export interface CreatePaymentInput {
  orderRef: string;
  amount: number;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  returnUrl: string;
  description?: string;
}

export interface CreatePaymentResult {
  ok: boolean;
  redirectUrl?: string;
  paymentId?: string;
  error?: string;
}