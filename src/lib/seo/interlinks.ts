import { catalogItemPath } from "@/lib/seo/catalog-routes";
import { applicationPath, ROUTES } from "@/lib/seo/routes";

export interface SeoLink {
  href: string;
  label: string;
  /** Короткий SEO-анкор / подсказка */
  description?: string;
  /** Ключевое слово для title-атрибута */
  title?: string;
}

export interface SeoLinkGroup {
  id: string;
  title: string;
  links: SeoLink[];
}

const CATALOG_A1 = catalogItemPath("optovolokno", "g657", "g657a1");
const CATALOG_A2 = catalogItemPath("optovolokno", "g657", "g657a2");
const CATALOG_G652 = catalogItemPath("optovolokno", "g652", "g652d");
const CATALOG_G657 = catalogItemPath("optovolokno", "g657");
const CATALOG_FIBER = catalogItemPath("optovolokno");

/** Кластер G.657.A1 — посадочные, каталог, сравнения, сферы */
export const g657a1Cluster: SeoLinkGroup[] = [
  {
    id: "product",
    title: "Купить G.657.A1",
    links: [
      {
        href: CATALOG_A1,
        label: "G.657.A1 в каталоге",
        description: "Катушка 50 км от 120 000 ₽",
        title: "Волокно G.657.A1 242 мкм — купить катушку 50 км",
      },
      {
        href: "/g657a1-kupit",
        label: "G.657.A1 купить",
        description: "Цена, срок, документы",
        title: "Купить G.657.A1 — прямые поставки ELIZON",
      },
      {
        href: "/optovolokno-g657a1",
        label: "Оптоволокно G.657.A1",
        description: "Обзор стандарта и поставки",
        title: "Оптоволокно G.657.A1 — радиус 10 мм",
      },
      {
        href: "/cena-optovolokna",
        label: "Цена оптоволокна",
        description: "Прайс по типам волокна",
        title: "Актуальные цены на оптоволокно ELIZON",
      },
    ],
  },
  {
    id: "compare",
    title: "Сравнить с другими типами",
    links: [
      {
        href: CATALOG_A2,
        label: "G.657.A2 242 мкм",
        description: "Радиус 7,5 мм — от 150 000 ₽",
        title: "Волокно G.657.A2 — флагман для плотной прокладки",
      },
      {
        href: "/g657a2-kupit",
        label: "G.657.A2 купить",
        description: "Радиус 7,5 мм, катушка 50 км",
        title: "Купить G.657.A2 катушку 50 км",
      },
      {
        href: CATALOG_G652,
        label: "G.652.D",
        description: "Классика магистралей",
        title: "Оптоволокно G.652.D — от 120 000 ₽/50 км",
      },
      {
        href: "/blog/g657a1-vs-g657a2",
        label: "A1 vs A2: отличия",
        description: "Когда какой тип выбрать",
        title: "Сравнение G.657.A1 и G.657.A2",
      },
      {
        href: "/blog/g657a2-vs-g652d",
        label: "G.657 vs G.652.D",
        description: "Гибкость и магистрали",
        title: "Сравнение G.657.A2 и G.652.D",
      },
    ],
  },
  {
    id: "use",
    title: "Сферы применения",
    links: [
      {
        href: applicationPath("ftth"),
        label: "Абонентский доступ",
        description: "Оптика до дома и подъезды",
        title: "Оптоволокно для FTTH / абонентского доступа",
      },
      {
        href: applicationPath("telekommunikacii"),
        label: "Телекоммуникации",
        description: "Операторы и городские сети",
        title: "Оптоволокно для телеком-операторов",
      },
      {
        href: applicationPath("magistral"),
        label: "Магистрали",
        description: "Междугородние трассы",
        title: "Оптоволокно для магистральных сетей",
      },
      {
        href: ROUTES.applications,
        label: "Все сферы",
        description: "Обзор применений",
        title: "Сферы применения оптоволокна ELIZON",
      },
    ],
  },
  {
    id: "service",
    title: "Доставка и сервис",
    links: [
      {
        href: ROUTES.delivery,
        label: "Доставка по России",
        description: "ТК, самовывоз, сроки",
        title: "Доставка оптоволокна ELIZON",
      },
      {
        href: "/moscow",
        label: "Оптоволокно в Москве",
        description: "Офис и самовывоз",
        title: "Купить оптоволокно в Москве",
      },
      {
        href: "/lobnya",
        label: "Склад в Лобне",
        description: "Комплектация ~5000 м²",
        title: "Склад оптоволокна ELIZON в Лобне",
      },
      {
        href: ROUTES.faq,
        label: "Частые вопросы",
        description: "Выбор волокна и заказ",
        title: "FAQ по оптоволокну ELIZON",
      },
      {
        href: ROUTES.contacts,
        label: "Запросить счёт",
        description: "Ответ за 15 минут",
        title: "Контакты ELIZON — заявка на оптоволокно",
      },
    ],
  },
];

/** Кластер G.657.A2 и общие keyword-лендинги */
export const g657a2Cluster: SeoLinkGroup[] = [
  {
    id: "product",
    title: "Купить G.657.A2",
    links: [
      {
        href: CATALOG_A2,
        label: "G.657.A2 в каталоге",
        description: "Катушка 50 км от 150 000 ₽",
        title: "Волокно G.657.A2 242 мкм — купить",
      },
      {
        href: "/g657a2-kupit",
        label: "G.657.A2 купить",
        description: "Цена и характеристики",
        title: "Купить G.657.A2 — ELIZON",
      },
      {
        href: "/optovolokno-g657a2",
        label: "Оптоволокно G.657.A2",
        description: "Обзор стандарта",
        title: "Оптоволокно G.657.A2 — поставки",
      },
      {
        href: "/katushka-optovolokna-50-km",
        label: "Катушка 50 км",
        description: "Меньше стыков на трассе",
        title: "Катушка оптоволокна 50 км",
      },
    ],
  },
  {
    id: "siblings",
    title: "Другие типы волокна",
    links: [
      {
        href: CATALOG_A1,
        label: "G.657.A1 от 120 000 ₽",
        description: "Радиус 10 мм — выгоднее",
        title: "Купить G.657.A1 — 120 000 ₽/50 км",
      },
      {
        href: "/g657a1-kupit",
        label: "G.657.A1 купить",
        description: "Радиус 10 мм, от 120 000 ₽",
        title: "G.657.A1 купить катушку 50 км",
      },
      {
        href: CATALOG_G652,
        label: "G.652.D",
        description: "Магистральный стандарт",
        title: "Оптоволокно G.652.D",
      },
      {
        href: CATALOG_G657,
        label: "Всё семейство G.657",
        description: "A1 и A2 в одном разделе",
        title: "Оптоволокно G.657 — каталог",
      },
      {
        href: "/blog/g657a1-vs-g657a2",
        label: "A1 vs A2",
        description: "Что выбрать под задачу",
        title: "G.657.A1 или G.657.A2",
      },
    ],
  },
  {
    id: "use",
    title: "Сферы и кейсы",
    links: [
      {
        href: applicationPath("ftth"),
        label: "Абонентский доступ",
        description: "Плотная прокладка 7,5 мм",
        title: "G.657.A2 для FTTH",
      },
      {
        href: applicationPath("drony"),
        label: "Дроны и FPV",
        description: "Оптический трос",
        title: "Оптоволокно для дронов",
      },
      {
        href: applicationPath("data-centr"),
        label: "Дата-центры",
        description: "Лотки и стойки",
        title: "Оптоволокно для ЦОД",
      },
      {
        href: ROUTES.catalog,
        label: "Весь каталог",
        description: "Волокно и цилиндры",
        title: "Каталог оптоволокна ELIZON",
      },
    ],
  },
];

/** Городские посадочные — перелинковка на продукты и ключевые запросы */
export const cityCluster: SeoLinkGroup[] = [
  {
    id: "products",
    title: "Что заказывают чаще",
    links: [
      {
        href: CATALOG_A1,
        label: "G.657.A1 — от 120 000 ₽",
        description: "50 км, радиус 10 мм",
        title: "G.657.A1 купить",
      },
      {
        href: CATALOG_A2,
        label: "G.657.A2 — от 150 000 ₽",
        description: "50 км, радиус 7,5 мм",
        title: "G.657.A2 купить",
      },
      {
        href: CATALOG_G652,
        label: "G.652.D",
        description: "Магистрали",
        title: "G.652.D купить",
      },
      {
        href: "/kupit-optovolokno",
        label: "Купить оптоволокно",
        description: "Все варианты",
        title: "Купить оптоволокно у ELIZON",
      },
    ],
  },
  {
    id: "geo",
    title: "Другие города и склад",
    links: [
      { href: "/moscow", label: "Москва", description: "Офис и самовывоз" },
      { href: "/spb", label: "Санкт-Петербург", description: "СЗФО" },
      { href: "/lobnya", label: "Лобня — склад", description: "~5000 м²" },
      { href: "/kazan", label: "Казань", description: "Поволжье" },
      { href: "/ekaterinburg", label: "Екатеринбург", description: "Урал" },
      { href: ROUTES.delivery, label: "Доставка", description: "По всей РФ" },
    ],
  },
];

/** Общий keyword-кластер */
export const keywordCluster: SeoLinkGroup[] = [
  {
    id: "buy",
    title: "Популярные запросы",
    links: [
      { href: "/kupit-optovolokno", label: "Купить оптоволокно", description: "Прямые поставки" },
      { href: "/opticheskoe-volokno", label: "Оптическое волокно", description: "G.657 и G.652" },
      { href: "/optovolokno-internet", label: "Оптоволокно интернет", description: "Сети доступа" },
      { href: "/optovolokno-kabel", label: "Оптоволокно кабель", description: "Волокно vs кабель" },
      { href: "/katushka-optovolokna", label: "Катушка оптоволокна", description: "50 км от 120 000 ₽" },
      { href: "/opticheskoe-volokno-g652", label: "Оптическое волокно G.652", description: "от 120 000 ₽" },
    ],
  },
  {
    id: "more",
    title: "Подбор и цены",
    links: [
      { href: "/optovolokno-wifi", label: "Оптоволокно и Wi‑Fi", description: "Оптика до узла" },
      {
        href: "/kabel-optovolokno-dlya-interneta",
        label: "Кабель для интернета",
        description: "ВОЛС и доступ",
      },
      {
        href: "/opticheskoe-volokno-kabel",
        label: "Оптическое волокно кабель",
        description: "Сырьё для ВОЛС",
      },
      { href: "/g657a1-kupit", label: "G.657.A1 купить", description: "от 120 000 ₽/50 км" },
      { href: "/g657a2-kupit", label: "G.657.A2 купить", description: "от 150 000 ₽/50 км" },
      { href: "/cena-optovolokna", label: "Цена оптоволокна", description: "Прайс 2026" },
    ],
  },
  {
    id: "nav",
    title: "Разделы сайта",
    links: [
      { href: CATALOG_FIBER, label: "Каталог оптоволокна", description: "G.657, G.652, G.655" },
      { href: ROUTES.applications, label: "Сферы применения", description: "Под вашу задачу" },
      { href: ROUTES.blog, label: "Блог", description: "Сравнения и гайды" },
      { href: ROUTES.faq, label: "FAQ", description: "Ответы на вопросы" },
      { href: ROUTES.sitemapPage, label: "Карта сайта", description: "Все разделы" },
      { href: ROUTES.contacts, label: "Контакты", description: "Счёт за 15 минут" },
    ],
  },
];

export type InterlinkPreset =
  | "g657a1"
  | "g657a2"
  | "city"
  | "keyword"
  | "product-a1"
  | "product-a2";

export function getInterlinkGroups(preset: InterlinkPreset): SeoLinkGroup[] {
  switch (preset) {
    case "g657a1":
    case "product-a1":
      return g657a1Cluster;
    case "g657a2":
    case "product-a2":
      return g657a2Cluster;
    case "city":
      return cityCluster;
    case "keyword":
    default:
      return keywordCluster;
  }
}

/** Определить пресет по slug лендинга */
export function interlinkPresetForLanding(
  slug: string,
  type: string
): InterlinkPreset {
  if (slug.includes("g657a1") || slug === "optovolokno-g657a1") return "g657a1";
  if (
    slug.includes("g657a2") ||
    slug === "optovolokno-g657a2" ||
    slug === "katushka-optovolokna-50-km"
  ) {
    return "g657a2";
  }
  if (type === "city") return "city";
  return "keyword";
}
