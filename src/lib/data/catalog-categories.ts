import { LEAD_TIME_DAYS } from "@/lib/constants";

export type CatalogCategory = "fiber" | "accessories" | "custom" | "cylinders";

export interface CatalogCategoryInfo {
  id: CatalogCategory;
  title: string;
  description: string;
  anchor: string;
}

export const catalogCategories: CatalogCategoryInfo[] = [
  {
    id: "fiber",
    title: "Оптоволокно",
    description: `Катушки под заказ напрямую у производителя — срок ${LEAD_TIME_DAYS.min}–${LEAD_TIME_DAYS.max} рабочих дней`,
    anchor: "fiber",
  },
  {
    id: "accessories",
    title: "Комплектующие",
    description: "Патч-корды и расходники — по запросу",
    anchor: "accessories",
  },
  {
    id: "custom",
    title: "Нестандарт",
    description: "Нестандартные длины и типы волокна",
    anchor: "custom",
  },
  {
    id: "cylinders",
    title: "Оптоволоконные цилиндры",
    description: "Серия FO-0.25 — G.657A2, 1–90 км, цена по запросу",
    anchor: "cylinders",
  },
];

export const ORDER_INFO = {
  minDays: LEAD_TIME_DAYS.min,
  maxDays: LEAD_TIME_DAYS.max,
  description: `Все катушки изготавливаем под заказ после подтверждения. Срок поставки — ${LEAD_TIME_DAYS.min}–${LEAD_TIME_DAYS.max} рабочих дней. Точную дату менеджер скажет при оформлении.`,
};