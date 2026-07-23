export const COLORS = {
  navy: "#0A2540",
  cyan: "#00D4FF",
  navyLight: "#0F3254",
  navyDark: "#061829",
  surface: "#0D2D4A",
  textMuted: "#8BA4BC",
} as const;

export const LEAD_TIME_DAYS = { min: 14, max: 21 } as const;

export const LEAD_TIME_LABEL = `${LEAD_TIME_DAYS.min}–${LEAD_TIME_DAYS.max} дн.`;

import { ROUTES } from "@/lib/seo/routes";

export const LAYOUT_MAX_WIDTH = "max-w-[1600px]";

/** Базовый путь разделов каталога — корень сайта, без /katalog. */
export const PRODUCTS_BASE = "";

export const NAV_LINKS = [
  { href: ROUTES.catalog, label: "Каталог", megaMenu: "catalog" as const },
  { href: ROUTES.applications, label: "Сферы", megaMenu: "applications" as const },
  { href: ROUTES.blog, label: "Блог" },
  { href: ROUTES.about, label: "Компания", megaMenu: "company" as const },
] as const;

export const FOOTER_LINKS = {
  company: [
    { href: ROUTES.about, label: "О компании" },
    { href: ROUTES.whyUs, label: "Почему мы" },
    { href: ROUTES.advantages, label: "Преимущества" },
    { href: ROUTES.services, label: "Услуги" },
    { href: ROUTES.contacts, label: "Контакты" },
  ],
  info: [
    { href: ROUTES.delivery, label: "Доставка и оплата" },
    { href: ROUTES.faq, label: "FAQ" },
    { href: ROUTES.blog, label: "Блог" },
    { href: ROUTES.catalog, label: "Каталог" },
  ],
  legal: [
    { href: ROUTES.offer, label: "Публичная оферта" },
    { href: ROUTES.privacy, label: "Политика конфиденциальности" },
    { href: ROUTES.sitemapPage, label: "Карта сайта" },
  ],
} as const;

export const COMPANY = {
  name: "ELIZON",
  legalName: "ИП Баркова Инна Теймуразовна",
  phone: "+7 (926) 449-41-04",
  phoneTel: "+79264494104",
  email: "support@elizon.ru",
  address: "г. Москва, ул. Арбат, 27",
  coordinates: {
    lat: 55.751522,
    lon: 37.591278,
  },
  yandexMaps: {
    rating: 4.7,
    maxRating: 5,
    url: "https://yandex.ru/maps/?text=%D0%93.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D1%83%D0%BB.%20%D0%90%D1%80%D0%B1%D0%B0%D1%82%2C%2027",
  },
  telegram: "https://t.me/elizon_fiber",
} as const;

export function buildYandexMapEmbedUrl(
  lat: number,
  lon: number,
  zoom = 17
): string {
  return `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=${zoom}&pt=${lon}%2C${lat}%2Cpm2rdm`;
}