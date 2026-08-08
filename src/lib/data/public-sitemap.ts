/**
 * Публичная карта сайта для пользователя (подвал, /karta-sajta).
 * Без админки, API, служебных и noindex-служебных зон.
 */
import { blogArticles } from "./blog";
import { defaultCaseStudies } from "./cases-defaults";
import { cylinderLandings } from "./cylinder-landings";
import { cylinderModelsSeo } from "./fiber-cylinders";
import {
  cityLandings,
  keywordLandings,
  moscowLanding,
  spbLanding,
} from "./landing-pages";
import { applications } from "./applications";
import { catalogItemPath } from "@/lib/seo/catalog-routes";
import { applicationPath, ROUTES } from "@/lib/seo/routes";

export interface PublicSitemapLink {
  href: string;
  label: string;
}

export interface PublicSitemapGroup {
  id: string;
  title: string;
  /** Ссылка на «все» в группе, если есть */
  moreHref?: string;
  links: PublicSitemapLink[];
}

/** Пути, которые нельзя светить в публичной карте */
export function isPublicUserPath(href: string): boolean {
  if (!href || href.startsWith("#")) return false;
  const path = href.split("?")[0].split("#")[0];
  if (path.startsWith("/admin")) return false;
  if (path.startsWith("/api")) return false;
  if (path.startsWith("/data")) return false;
  if (path.includes("..")) return false;
  // login админки
  if (path === "/admin/login" || path.startsWith("/admin/")) return false;
  return true;
}

function filterPublic(links: PublicSitemapLink[]): PublicSitemapLink[] {
  return links.filter((l) => isPublicUserPath(l.href));
}

/** Полные группы для HTML-карты и подвала */
export function getPublicSitemapGroups(): PublicSitemapGroup[] {
  const groups: PublicSitemapGroup[] = [
    {
      id: "main",
      title: "Основные разделы",
      links: filterPublic([
        { href: "/", label: "Главная" },
        { href: ROUTES.catalog, label: "Каталог" },
        { href: ROUTES.applications, label: "Сферы применения" },
        { href: ROUTES.blog, label: "Блог" },
        { href: ROUTES.about, label: "О компании" },
        { href: ROUTES.whyUs, label: "Почему мы" },
        { href: ROUTES.advantages, label: "Преимущества" },
        { href: ROUTES.services, label: "Услуги" },
        { href: ROUTES.delivery, label: "Доставка и оплата" },
        { href: ROUTES.faq, label: "Частые вопросы" },
        { href: ROUTES.contacts, label: "Контакты" },
        { href: ROUTES.sitemapPage, label: "Карта сайта" },
      ]),
    },
    {
      id: "catalog",
      title: "Каталог товаров",
      moreHref: ROUTES.catalog,
      links: filterPublic([
        { href: catalogItemPath("optovolokno"), label: "Оптоволокно" },
        {
          href: catalogItemPath("optovolokno", "g657", "g657a2"),
          label: "G.657.A2 242 мкм",
        },
        {
          href: catalogItemPath("optovolokno", "g657", "g657a1"),
          label: "G.657.A1 242 мкм",
        },
        {
          href: catalogItemPath("optovolokno", "g652", "g652d"),
          label: "G.652.D 242 мкм",
        },
        {
          href: catalogItemPath("optovolokno", "g655", "g655"),
          label: "G.655 242 мкм",
        },
        {
          href: catalogItemPath("optovolokonnye-cilindry"),
          label: "Оптоволоконные цилиндры",
        },
        {
          href: catalogItemPath("komplektuyushchie", "patch-kordy", "patch-kordy-lc-lc"),
          label: "Патч-корды LC/LC",
        },
        {
          href: catalogItemPath("na-zakaz", "nestandartnaya-dlina", "nestandartnaya-dlina"),
          label: "Нестандартная длина",
        },
        { href: ROUTES.cart, label: "Корзина" },
      ]),
    },
    {
      id: "seo",
      title: "Популярные запросы",
      moreHref: ROUTES.sitemapPage,
      links: filterPublic(
        keywordLandings.map((p) => ({
          href: `/${p.slug}`,
          label: p.primaryKeyword ?? p.h1,
        }))
      ),
    },
    {
      id: "cities",
      title: "Оптоволокно по городам",
      links: filterPublic([
        { href: `/${moscowLanding.slug}`, label: moscowLanding.cityName ?? "Москва" },
        { href: `/${spbLanding.slug}`, label: spbLanding.cityName ?? "Санкт-Петербург" },
        ...cityLandings.map((c) => ({
          href: `/${c.slug}`,
          label: c.cityName ?? c.slug,
        })),
      ]),
    },
    {
      id: "applications",
      title: "Сферы применения",
      moreHref: ROUTES.applications,
      links: filterPublic(
        applications.map((app) => ({
          href: applicationPath(app.slug),
          label: app.navLabel,
        }))
      ),
    },
    {
      id: "cylinders",
      title: "Цилиндры FO-0.25",
      moreHref: catalogItemPath("optovolokonnye-cilindry"),
      links: filterPublic([
        ...cylinderModelsSeo.map((m) => ({
          href: catalogItemPath("optovolokonnye-cilindry", "fo-0-25", m.slug),
          label: `${m.modelCode} · ${m.km} км`,
        })),
        ...cylinderLandings.map((p) => ({
          href: `/${p.slug}`,
          label: p.primaryKeyword ?? p.h1,
        })),
      ]),
    },
    {
      id: "cases",
      title: "Кейсы",
      links: filterPublic(
        defaultCaseStudies.map((c) => ({
          href: `/cases/${c.slug}`,
          label: c.title,
        }))
      ),
    },
    {
      id: "blog",
      title: "Блог",
      moreHref: ROUTES.blog,
      links: filterPublic(
        blogArticles.map((a) => ({
          href: `/blog/${a.slug}`,
          label: a.h1,
        }))
      ),
    },
    {
      id: "legal",
      title: "Документы",
      links: filterPublic([
        { href: ROUTES.offer, label: "Публичная оферта" },
        { href: ROUTES.privacy, label: "Политика конфиденциальности" },
        { href: ROUTES.sitemapPage, label: "Карта сайта (HTML)" },
        { href: "/sitemap.xml", label: "Sitemap XML" },
      ]),
    },
  ];

  return groups.filter((g) => g.links.length > 0);
}

/** Компактные группы для подвала (не раздувать 100+ ссылками цилиндров/блога) */
export function getFooterSitemapGroups(): PublicSitemapGroup[] {
  const all = getPublicSitemapGroups();
  const compactIds = new Set([
    "main",
    "catalog",
    "seo",
    "cities",
    "applications",
    "legal",
  ]);

  return all
    .filter((g) => compactIds.has(g.id))
    .map((g) => {
      if (g.id === "seo") {
        // Топ demand + ключевые товарные посадочные
        const priority = [
          "opticheskoe-volokno",
          "optovolokno-internet",
          "optovolokno-kabel",
          "katushka-optovolokna",
          "opticheskoe-volokno-g652",
          "optovolokno-wifi",
          "kabel-optovolokno-dlya-interneta",
          "g657a1-kupit",
          "g657a2-kupit",
          "cena-optovolokna",
          "kupit-optovolokno",
          "optovolokno-optom",
        ];
        const byHref = new Map(g.links.map((l) => [l.href.replace(/^\//, ""), l]));
        const picked = priority
          .map((slug) => byHref.get(slug))
          .filter((l): l is PublicSitemapLink => Boolean(l));
        const rest = g.links.filter((l) => !priority.includes(l.href.replace(/^\//, "")));
        return {
          ...g,
          links: [...picked, ...rest].slice(0, 16),
          moreHref: ROUTES.sitemapPage,
        };
      }
      if (g.id === "cities") {
        return { ...g, links: g.links.slice(0, 12), moreHref: ROUTES.sitemapPage };
      }
      return g;
    });
}
