export type LeadKind = "contact" | "callback" | "order" | "invoice" | "payment";
export type LeadStatus = "new" | "in_progress" | "done";

export interface LeadCartItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  km?: number;
  isCustom?: boolean;
  leadTime?: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  kind: LeadKind;
  status: LeadStatus;
  /** Soft-read flag for inbox (Письма) */
  read?: boolean;
  name: string;
  phone: string;
  phoneKey: string;
  email?: string;
  companyName?: string;
  inn?: string;
  kpp?: string;
  legalAddress?: string;
  city?: string;
  deliveryAddress?: string;
  preferredDate?: string;
  paymentMethod?: string;
  quantity?: string;
  comment?: string;
  cart?: LeadCartItem[];
  total?: number;
  orderRef?: string;
  paymentId?: string;
  note?: string;
  /** Email-style subject stored for inbox */
  subject?: string;
}

export const MESSAGE_SUBJECTS: Record<LeadKind, string> = {
  contact: "Заявка с сайта ELIZON",
  callback: "Обратный звонок ELIZON",
  order: "Заказ ELIZON",
  invoice: "Запрос счёта ELIZON",
  payment: "Онлайн-оплата ELIZON",
};

export interface ClientSummary {
  id: string;
  phoneKey: string;
  name: string;
  phone: string;
  email?: string;
  companyName?: string;
  inn?: string;
  firstSeen: string;
  lastSeen: string;
  submissionsCount: number;
  ordersCount: number;
  kinds: LeadKind[];
  lastComment?: string;
  totalSpent?: number;
  leadIds: string[];
}

export const LEAD_KIND_LABELS: Record<LeadKind, string> = {
  contact: "Контактная форма",
  callback: "Обратный звонок",
  order: "Заказ",
  invoice: "Счёт",
  payment: "Оплата",
};

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Новый",
  in_progress: "В работе",
  done: "Закрыт",
};
