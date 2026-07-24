import type { CatalogCategory } from "./catalog-categories";
import { fiberCylinderProducts } from "./fiber-cylinders";
import { LEAD_TIME_DAYS, PRODUCTS_BASE } from "@/lib/constants";

const leadTime = { min: LEAD_TIME_DAYS.min, max: LEAD_TIME_DAYS.max };

export interface Product {
  id: string;
  slug: string;
  /** SEO URL segment: /catalog/{category}/{subcategory}/{slug} */
  categorySlug: string;
  subcategorySlug: string;
  name: string;
  shortName: string;
  price: number;
  oldPrice?: number;
  unit: string;
  inStock: boolean;
  category: CatalogCategory;
  kmPerSpool: number;
  pricePer50Km: number;
  leadTimeDays?: { min: number; max: number };
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  priceOnRequest?: boolean;
  seoH1?: string;
  seoTitle?: string;
  seoDescription?: string;
  recommendedUse?: string;
  modelCode?: string;
  specPdfUrl?: string;
}

export const flagshipProduct: Product = {
  id: "g657a2-242",
  slug: "g657a2",
  categorySlug: "optovolokno",
  subcategorySlug: "g657",
  name: "Волокно оптическое G.657.A2 242 мкм",
  shortName: "G.657.A2 242 мкм",
  price: 150_000,
  oldPrice: 165_000,
  unit: "катушка 50 км",
  inStock: false,
  category: "fiber",
  kmPerSpool: 50,
  pricePer50Km: 150_000,
  leadTimeDays: leadTime,
  description:
    "Одномодовое волокно с минимальным радиусом изгиба 7,5 мм. Катушка на 50 км — меньше стыков на объекте. Под заказ, срок 14–21 день.",
  highlights: [
    "Радиус изгиба всего 7,5 мм",
    "Наднизкое затухание в диапазонах O, C, L",
    "Без водяного пика",
    "Увеличенный диаметр модового поля",
    "Готово к сварке с обеих сторон",
  ],
  specs: [
    { label: "Тип волокна", value: "G.657.A2 (нечувствительное к изгибу)" },
    { label: "Диаметр оболочки", value: "242 ± 5 мкм" },
    { label: "Диаметр модового поля", value: "9,2 мкм" },
    { label: "Минимальный радиус изгиба", value: "7,5 мм" },
    { label: "Затухание @ 1310 нм", value: "≤ 0,35 дБ/км" },
    { label: "Затухание @ 1550 нм", value: "≤ 0,22 дБ/км" },
    { label: "Длина на катушке", value: "50 км" },
    { label: "Срок поставки", value: "14–21 рабочий день" },
    { label: "Тип катушки", value: "Стандартная заводская катушка" },
    { label: "Рабочие диапазоны", value: "диапазоны O, C, L" },
    { label: "Стандарт", value: "МСЭ-Т G.657.A2" },
    { label: "Водяной пик", value: "Отсутствует" },
    { label: "Совместимость", value: "G.652.D, G.657.A1" },
  ],
};

export const catalogProducts: Product[] = [
  flagshipProduct,
  {
    id: "g652d-242",
    slug: "g652d",
    categorySlug: "optovolokno",
    subcategorySlug: "g652",
    name: "Волокно G.652.D 242 мкм",
    shortName: "G.652.D",
    price: 120_000,
    unit: "катушка 50 км",
    inStock: false,
    category: "fiber",
    kmPerSpool: 50,
    pricePer50Km: 120_000,
    leadTimeDays: leadTime,
    description:
      "Классическое одномодовое волокно для магистральных и городских сетей. Под заказ, 14–21 день.",
    highlights: [
      "Стандарт МСЭ-Т G.652.D",
      "Подходит для систем спектрального уплотнения",
      "Низкое затухание на 1550 нм",
    ],
    specs: [
      { label: "Тип", value: "G.652.D" },
      { label: "Длина", value: "50 км" },
      { label: "Срок поставки", value: "14–21 день" },
    ],
  },
  {
    id: "g657a1-242",
    slug: "g657a1",
    categorySlug: "optovolokno",
    subcategorySlug: "g657",
    name: "Волокно G.657.A1 242 мкм",
    shortName: "G.657.A1",
    price: 135_000,
    unit: "катушка 50 км",
    inStock: false,
    category: "fiber",
    kmPerSpool: 50,
    pricePer50Km: 135_000,
    leadTimeDays: leadTime,
    description:
      "Промежуточный вариант с улучшенной гибкостью. Под заказ, 14–21 день.",
    highlights: [
      "Радиус изгиба 10 мм",
      "Совместимость с G.652.D",
      "Подходит для абонентского доступа",
    ],
    specs: [
      { label: "Тип", value: "G.657.A1" },
      { label: "Радиус изгиба", value: "10 мм" },
      { label: "Срок поставки", value: "14–21 день" },
    ],
  },
  {
    id: "g655-242",
    slug: "g655",
    categorySlug: "optovolokno",
    subcategorySlug: "g655",
    name: "Волокно G.655 242 мкм",
    shortName: "G.655",
    price: 145_000,
    unit: "катушка 50 км",
    inStock: false,
    category: "fiber",
    kmPerSpool: 50,
    pricePer50Km: 145_000,
    leadTimeDays: leadTime,
    description:
      "Для длинных магистралей и спектрального уплотнения. Заказываем у производителя после подтверждения.",
    highlights: [
      "Низкая дисперсия",
      "Для дальних магистралей",
      "совместимость со спектральным уплотнением",
    ],
    specs: [
      { label: "Тип", value: "G.655" },
      { label: "Длина", value: "50 км" },
      { label: "Срок поставки", value: "14–21 день" },
    ],
  },
  {
    id: "patch-cable",
    slug: "patch-kordy-lc-lc",
    categorySlug: "komplektuyushchie",
    subcategorySlug: "patch-kordy",
    name: "Патч-корды LC/LC",
    shortName: "Патч-корды",
    price: 450,
    unit: "шт.",
    inStock: false,
    category: "accessories",
    kmPerSpool: 0,
    pricePer50Km: 0,
    leadTimeDays: leadTime,
    description:
      "Патч-корды под заказ. Разные длины, коннекторы LC, SC, FC.",
    highlights: [
      "Любая длина от 0,5 м",
      "полировка торца разъёма",
      "Рефлектометрический контроль при отгрузке",
    ],
    specs: [
      { label: "Коннекторы", value: "LC, SC, FC" },
      { label: "Срок", value: "14–21 день" },
    ],
  },
  {
    id: "custom-length",
    slug: "nestandartnaya-dlina",
    categorySlug: "na-zakaz",
    subcategorySlug: "nestandartnaya-dlina",
    name: "Волокно нестандартной длины",
    shortName: "Нестандарт",
    price: 0,
    unit: "по расчёту",
    inStock: false,
    category: "custom",
    kmPerSpool: 50,
    pricePer50Km: 150_000,
    leadTimeDays: leadTime,
    description:
      "Катушка на 25, 75 или 100 км — или другой тип волокна. Изготовим под заказ.",
    highlights: [
      "Любая длина от 10 км",
      "Любой тип G.652 / G.657",
      "Документы и рефлектометрический контроль",
    ],
    specs: [
      { label: "Срок", value: "14–21 рабочий день" },
      { label: "Минимальный заказ", value: "от 1 катушки" },
    ],
  },
  ...fiberCylinderProducts,
];

export function isPriceOnRequest(product: Product): boolean {
  return Boolean(product.priceOnRequest);
}

export function formatProductPrice(product: Product): string {
  if (isPriceOnRequest(product)) return "Цена по запросу";
  if (product.price === 0) return "По расчёту";
  return `${product.price.toLocaleString("ru-RU")} ₽`;
}

export function getProductById(id: string): Product | undefined {
  return catalogProducts.find((p) => p.id === id);
}

export function getProductDetailHref(product: Product): string {
  return `${PRODUCTS_BASE}/${product.categorySlug}/${product.subcategorySlug}/${product.slug}`;
}

export function getAvailabilityLabel(product: Product): string {
  if (product.leadTimeDays) {
    return `Под заказ · ${product.leadTimeDays.min}–${product.leadTimeDays.max} дн.`;
  }
  return "Под заказ";
}

export function calcPriceByKm(pricePer50Km: number, km: number): number {
  return Math.round((km / 50) * pricePer50Km);
}

export function calcSpoolsNeeded(km: number, kmPerSpool: number): number {
  if (kmPerSpool <= 0) return 1;
  return Math.ceil(km / kmPerSpool);
}