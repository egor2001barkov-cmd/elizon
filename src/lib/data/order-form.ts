export interface OrderFormData {
  name: string;
  phone: string;
  email: string;
  companyName: string;
  inn: string;
  kpp: string;
  city: string;
  deliveryAddress: string;
  preferredDate: string;
  paymentMethod: "prepayment" | "invoice";
  comment: string;
}

export const emptyOrderForm: OrderFormData = {
  name: "",
  phone: "",
  email: "",
  companyName: "",
  inn: "",
  kpp: "",
  city: "",
  deliveryAddress: "",
  preferredDate: "",
  paymentMethod: "prepayment",
  comment: "",
};

export const PAYMENT_OPTIONS = [
  { value: "prepayment", label: "100% предоплата безналом" },
  { value: "invoice", label: "Запросить счёт" },
] as const;

export const PAYMENT_LABELS: Record<OrderFormData["paymentMethod"], string> = {
  prepayment: "100% предоплата безналом",
  invoice: "Запросить счёт",
};
