import { applicationLandings } from "./application-landings";
import { applications } from "./applications";
import { cylinderLandings } from "./cylinder-landings";
import { cylinderModelsSeo } from "./fiber-cylinders";
import { cityLandings, keywordLandings } from "./landing-pages";
import { catalogItemPath } from "@/lib/seo/catalog-routes";
import { applicationPath, ROUTES } from "@/lib/seo/routes";

export interface SitemapNode {
  label: string;
  href?: string;
  children?: SitemapNode[];
}

export const sitemapTree: SitemapNode[] = [
  { label: "Главная", href: "/" },
  {
    label: "Каталог",
    href: ROUTES.catalog,
    children: [
      {
        label: "Оптоволокно",
        href: catalogItemPath("optovolokno"),
        children: [
          {
            label: "Волокно G.657",
            href: catalogItemPath("optovolokno", "g657"),
            children: [
              { label: "G.657.A2 242 мкм", href: catalogItemPath("optovolokno", "g657", "g657a2") },
              { label: "G.657.A1 242 мкм", href: catalogItemPath("optovolokno", "g657", "g657a1") },
            ],
          },
          {
            label: "Волокно G.652",
            href: catalogItemPath("optovolokno", "g652"),
            children: [{ label: "G.652.D 242 мкм", href: catalogItemPath("optovolokno", "g652", "g652d") }],
          },
          {
            label: "Волокно G.655",
            href: catalogItemPath("optovolokno", "g655"),
            children: [{ label: "G.655 242 мкм", href: catalogItemPath("optovolokno", "g655", "g655") }],
          },
        ],
      },
      {
        label: "Комплектующие",
        href: catalogItemPath("komplektuyushchie"),
        children: [
          {
            label: "Патч-корды",
            href: catalogItemPath("komplektuyushchie", "patch-kordy"),
            children: [
              {
                label: "Патч-корды LC/LC",
                href: catalogItemPath("komplektuyushchie", "patch-kordy", "patch-kordy-lc-lc"),
              },
            ],
          },
        ],
      },
      {
        label: "Оптоволоконные цилиндры",
        href: catalogItemPath("optovolokonnye-cilindry"),
        children: [
          {
            label: "Серия FO-0.25",
            href: catalogItemPath("optovolokonnye-cilindry", "fo-0-25"),
            children: cylinderModelsSeo.map((model) => ({
              label: `${model.modelCode} · ${model.km} км`,
              href: catalogItemPath("optovolokonnye-cilindry", "fo-0-25", model.slug),
            })),
          },
        ],
      },
      {
        label: "Под заказ",
        href: catalogItemPath("na-zakaz"),
        children: [
          {
            label: "Нестандартная длина",
            href: catalogItemPath("na-zakaz", "nestandartnaya-dlina"),
            children: [
              {
                label: "Волокно нестандартной длины",
                href: catalogItemPath("na-zakaz", "nestandartnaya-dlina", "nestandartnaya-dlina"),
              },
            ],
          },
        ],
      },
      { label: "Оформление заказа", href: `${ROUTES.cart}` },
    ],
  },
  {
    label: "Сферы применения",
    href: ROUTES.applications,
    children: applications.map((app) => ({
      label: app.navLabel,
      href: applicationPath(app.slug),
    })),
  },
  { label: "Кейсы", href: "/#cases" },
  { label: "О компании", href: ROUTES.about },
  { label: "Почему мы", href: ROUTES.whyUs },
  { label: "Наши преимущества", href: ROUTES.advantages },
  { label: "Услуги", href: ROUTES.services },
  { label: "Доставка и оплата", href: ROUTES.delivery },
  { label: "Блог", href: "/blog" },
  { label: "Частые вопросы", href: "/faq" },
  { label: "Контакты", href: ROUTES.contacts },
  {
    label: "Оптоволокно по городам",
    children: [
      { label: "Москва", href: "/moscow" },
      { label: "Санкт-Петербург", href: "/spb" },
      ...cityLandings.map((city) => ({
        label: city.cityName ?? city.slug,
        href: `/${city.slug}`,
      })),
    ],
  },
  {
    label: "Оптоволоконные цилиндры — запросы",
    children: cylinderLandings.map((page) => ({
      label: page.primaryKeyword ?? page.h1,
      href: `/${page.slug}`,
    })),
  },
  {
    label: "Популярные запросы",
    children: keywordLandings.map((page) => ({
      label: page.primaryKeyword ?? page.h1,
      href: `/${page.slug}`,
    })),
  },
  {
    label: "Оптоволокно по сферам применения",
    href: ROUTES.applications,
    children: applicationLandings.map((page) => ({
      label: page.primaryKeyword ?? page.h1,
      href: applicationPath(page.slug),
    })),
  },
  { label: "Публичная оферта", href: ROUTES.offer },
  { label: "Политика конфиденциальности", href: ROUTES.privacy },
];