import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { catalogItemPath } from "@/lib/seo/catalog-routes";
import { ROUTES } from "@/lib/seo/routes";

export const BREADCRUMBS = {
  catalog: [
    { label: "Главная", href: "/" },
    { label: "Каталог" },
  ],
  productG657a2: [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: ROUTES.catalog },
    { label: "Оптоволокно", href: catalogItemPath("optovolokno") },
    { label: "Волокно G.657", href: catalogItemPath("optovolokno", "g657") },
    { label: "G.657.A2 242 мкм" },
  ],
  cart: [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: ROUTES.catalog },
    { label: "Оформление заказа" },
  ],
  payment: [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: ROUTES.catalog },
    { label: "Оформление заказа", href: ROUTES.cart },
    { label: "Оплата" },
  ],
  applications: [
    { label: "Главная", href: "/" },
    { label: "Сферы" },
  ],
  about: [
    { label: "Главная", href: "/" },
    { label: "О компании" },
  ],
  whyUs: [
    { label: "Главная", href: "/" },
    { label: "Почему мы" },
  ],
  advantages: [
    { label: "Главная", href: "/" },
    { label: "Наши преимущества" },
  ],
  services: [
    { label: "Главная", href: "/" },
    { label: "Услуги" },
  ],
  delivery: [
    { label: "Главная", href: "/" },
    { label: "Доставка и оплата" },
  ],
  faq: [
    { label: "Главная", href: "/" },
    { label: "Частые вопросы" },
  ],
  offer: [
    { label: "Главная", href: "/" },
    { label: "Публичная оферта" },
  ],
  privacy: [
    { label: "Главная", href: "/" },
    { label: "Политика конфиденциальности" },
  ],
  sitemapPage: [
    { label: "Главная", href: "/" },
    { label: "Карта сайта" },
  ],
  blog: [
    { label: "Главная", href: "/" },
    { label: "Блог" },
  ],
  moscow: [
    { label: "Главная", href: "/" },
    { label: "Оптоволокно в Москве" },
  ],
  spb: [
    { label: "Главная", href: "/" },
    { label: "Оптоволокно в Санкт-Петербурге" },
  ],
  region: [
    { label: "Главная", href: "/" },
    { label: "Регионы", href: "/moscow" },
  ],
  contacts: [
    { label: "Главная", href: "/" },
    { label: "Контакты" },
  ],
  notFound: [
    { label: "Главная", href: "/" },
    { label: "Страница не найдена" },
  ],
} as const satisfies Record<string, BreadcrumbItem[]>;

export type BreadcrumbPage = keyof typeof BREADCRUMBS;