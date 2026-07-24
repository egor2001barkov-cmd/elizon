import type { Metadata } from "next";
import { ROUTES } from "@/lib/seo/routes";

export const SITE_NAME = "ELIZON";
export const SITE_URL = "https://elizon.ru";

/** Default share image for Open Graph / Twitter */
export const DEFAULT_OG_IMAGE = "/images/products/spool-warehouse.jpg";

const DEFAULT_KEYWORDS = [
  "оптоволокно",
  "G.657.A2",
  "волокно оптическое",
  "купить оптоволокно",
  "катушка 50 км",
  "телекоммуникации",
  "абонентский доступ",
  "ELIZON",
] as const;

type PageKey =
  | "home"
  | "catalog"
  | "productG657a2"
  | "cart"
  | "payment"
  | "applications"
  | "about"
  | "whyUs"
  | "advantages"
  | "services"
  | "delivery"
  | "faq"
  | "offer"
  | "privacy"
  | "sitemapPage"
  | "blog"
  | "moscow"
  | "spb"
  | "contacts"
  | "notFound";

interface PageSeo {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  titleAbsolute?: boolean;
}

/** Avoid "ELIZON | ELIZON" when brand is already in the title. */
export function titleContainsBrand(title: string): boolean {
  return /\bELIZON\b/i.test(title);
}

/** Document title for <title> and OG (no double brand). */
export function formatDocumentTitle(title: string, forceAbsolute = false): string {
  if (forceAbsolute || titleContainsBrand(title)) return title;
  return `${title} | ${SITE_NAME}`;
}

/** Next.js metadata title field — absolute when brand already present. */
export function resolveMetadataTitle(
  title: string,
  forceAbsolute = false
): NonNullable<Metadata["title"]> {
  if (forceAbsolute || titleContainsBrand(title)) {
    return { absolute: title };
  }
  return title;
}

export const PAGE_SEO: Record<PageKey, PageSeo> = {
  home: {
    title: "ELIZON — Оптоволокно G.657.A2 купить от 150 000 ₽ | Прямая поставка",
    description:
      "Оптоволокно G.657.A2 242 мкм от поставщика. Катушка 50 км — от 150 000 ₽, радиус 7,5 мм. Срок 14–21 день. телеком, абонентский доступ, магистрали.",
    path: "/",
    titleAbsolute: true,
    ogImage: DEFAULT_OG_IMAGE,
  },
  catalog: {
    title: "Каталог оптоволокна — цены и заказ",
    description:
      "Каталог оптоволокна: G.657.A2, G.652.D, G.655, патч-корды, цилиндры. Катушки 50 км, срок 14–21 день, цены от завода. Калькулятор и счёт.",
    path: ROUTES.catalog,
    keywords: [...DEFAULT_KEYWORDS, "каталог оптоволокна", "цена оптоволокна"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  productG657a2: {
    title: "G.657.A2 242 мкм — купить катушку 50 км от 150 000 ₽",
    description:
      "Волокно G.657.A2 242 мкм — катушка 50 км от 150 000 ₽. Радиус 7,5 мм, без водяного пика. Под заказ 14–21 день. Характеристики и PDF.",
    path: "/optovolokno/g657/g657a2",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "G.657.A2 купить",
      "волокно 242 мкм",
      "радиус изгиба 7.5 мм",
    ],
    ogImage: DEFAULT_OG_IMAGE,
  },
  cart: {
    title: "Оформление заказа оптоволокна",
    description:
      "Оформление заказа оптоволокна: контакты, доставка, оплата. Менеджер подтвердит цену и срок 14–21 день.",
    path: ROUTES.cart,
    keywords: [...DEFAULT_KEYWORDS, "заказ оптоволокна", "купить катушку"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  payment: {
    title: "Оплата заказа",
    description:
      "Оплата заказа оптоволокна: 100% предоплата безналом через банковский эквайринг.",
    path: ROUTES.payment,
    keywords: [...DEFAULT_KEYWORDS, "оплата заказа", "предоплата безналом"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  applications: {
    title: "Оптоволокно по сферам применения — телеком, абонентский доступ, магистрали",
    description:
      "Оптоволокно по сферам: телеком, абонентский доступ, магистрали, ЦОД, промышленность, спектральное уплотнение, дроны. G.657.A2 и G.652.D, срок 14–21 день.",
    path: ROUTES.applications,
    keywords: [
      ...DEFAULT_KEYWORDS,
      "оптоволокно по сферам применения",
      "применение оптоволокна",
      "оптоволокно для абонентского доступа",
      "магистральное оптоволокно",
      "оптоволокно телекоммуникации",
      "оптоволокно дата-центр",
      "оптоволокно для спектрального уплотнения",
      "оптоволокно для дронов",
      "оптический трос БПЛА",
    ],
    ogImage: DEFAULT_OG_IMAGE,
  },
  about: {
    title: "О компании — прямой поставщик оптоволокна",
    description:
      "ELIZON — поставки оптоволокна G.657.A2 с заводов. Срок 14–21 день, МСЭ-Т, фиксация цены от 10 катушек. Москва, доставка по РФ.",
    path: ROUTES.about,
    keywords: [...DEFAULT_KEYWORDS, "поставщик оптоволокна", "прямые поставки", "официальный дистрибьютор"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  whyUs: {
    title: "Почему мы — 5 причин выбрать ELIZON",
    description:
      "Почему выбирают ELIZON: прямые поставки, G.657.A2 радиус 7,5 мм, катушка 50 км, срок 14–21 день. Отзывы, рейтинг 4,7.",
    path: ROUTES.whyUs,
    keywords: [...DEFAULT_KEYWORDS, "почему ELIZON", "прямой поставщик", "отзывы"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  advantages: {
    title: "Наши преимущества — 8 причин купить оптоволокно у ELIZON",
    description:
      "Преимущества ELIZON: заводские цены, склад в Москве, доставка по РФ, от 150 000 ₽/50 км, гарантия и сертификаты МСЭ-Т.",
    path: ROUTES.advantages,
    keywords: [...DEFAULT_KEYWORDS, "преимущества", "оптом", "гарантия"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  services: {
    title: "Услуги — поставка, подбор волокна, рефлектометрический контроль",
    description:
      "Услуги: поставка оптоволокна, подбор типа волокна, фиксация цены, рефлектометрический контроль, нестандартные длины катушек.",
    path: ROUTES.services,
    keywords: [...DEFAULT_KEYWORDS, "услуги", "подбор волокна", "рефлектометрия"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  delivery: {
    title: "Доставка и оплата оптоволокна",
    description:
      "Доставка оптоволокна по России: Москва, СПб, регионы. Предоплата безналом или счёт. Срок 14–21 день. Самовывоз в Москве.",
    path: ROUTES.delivery,
    keywords: [...DEFAULT_KEYWORDS, "доставка оптоволокна", "оплата", "запросить счёт"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  faq: {
    title: "Частые вопросы — частые вопросы об оптоволокне",
    description:
      "Ответы на частые вопросы: цена G.657.A2, сроки, документы, доставка, оплата, совместимость G.657.A2 и G.652.D.",
    path: ROUTES.faq,
    keywords: [...DEFAULT_KEYWORDS, "частые вопросы", "вопросы", "G.657.A2 цена"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  offer: {
    title: "Публичная оферта",
    description:
      "Публичная оферта на поставку оптоволокна и телеком-оборудования. Условия заказа, оплаты, доставки и гарантии.",
    path: ROUTES.offer,
    keywords: [...DEFAULT_KEYWORDS, "оферта", "договор"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  privacy: {
    title: "Политика конфиденциальности",
    description:
      "Политика обработки персональных данных. Cookies, аналитика, права пользователей по 152-ФЗ.",
    path: ROUTES.privacy,
    keywords: ["политика конфиденциальности", "персональные данные", "ELIZON"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  sitemapPage: {
    title: "Карта сайта",
    description:
      "Карта сайта: каталог, блог, регионы, сферы применения, услуги, частые вопросы, юридические документы.",
    path: ROUTES.sitemapPage,
    keywords: [...DEFAULT_KEYWORDS, "карта сайта"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  blog: {
    title: "Блог — статьи об оптоволокне и телекоме",
    description:
      "Статьи: выбор G.657.A2, сравнения, монтаж, абонентский доступ, цены, поставки. Материалы для инженеров и закупок.",
    path: ROUTES.blog,
    keywords: [...DEFAULT_KEYWORDS, "блог", "статьи", "G.657.A2 vs G.652.D"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  moscow: {
    title: "Оптоволокно в Москве — купить G.657.A2 от 150 000 ₽",
    description:
      "Оптоволокно G.657.A2 в Москве и МО. Прямые поставки, самовывоз Арбат, доставка 1–2 дня после готовности.",
    path: "/moscow",
    keywords: [...DEFAULT_KEYWORDS, "оптоволокно Москва", "купить Москва"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  spb: {
    title: "Оптоволокно в Санкт-Петербурге — G.657.A2 за 14–21 день",
    description:
      "Оптоволокно G.657.A2 в Санкт-Петербурге и ЛО. Прямые поставки, доставка 2–4 дня после готовности.",
    path: "/spb",
    keywords: [...DEFAULT_KEYWORDS, "оптоволокно Санкт-Петербург", "G.657.A2 СПб"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  contacts: {
    title: "Контакты — запросить цену и счёт",
    description:
      "Контакты: телефон, email, форма заявки. Цена на G.657.A2 и счёт на организацию — ответ за 15 минут в рабочее время.",
    path: ROUTES.contacts,
    keywords: [...DEFAULT_KEYWORDS, "запросить цену", "выставить счёт", "контакты ELIZON"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  notFound: {
    title: "Страница не найдена",
    description:
      "Страница не найдена. Перейдите в каталог оптоволокна или закажите G.657.A2 — от 150 000 ₽/50 км, срок 14–21 день.",
    path: "/404",
    titleAbsolute: true,
    ogImage: DEFAULT_OG_IMAGE,
  },
};

const NOINDEX_KEYS = new Set<PageKey>(["cart", "payment", "notFound"]);

export function createPageMetadata(key: PageKey, overrides?: Metadata): Metadata {
  const seo = PAGE_SEO[key];
  const canonicalPath = seo.path === "/404" ? undefined : seo.path;
  const ogImage = seo.ogImage ?? DEFAULT_OG_IMAGE;
  const ogTitle = formatDocumentTitle(seo.title, seo.titleAbsolute);
  const noindex = NOINDEX_KEYS.has(key);

  return {
    title: resolveMetadataTitle(seo.title, seo.titleAbsolute),
    description: seo.description,
    keywords: seo.keywords ? [...seo.keywords] : [...DEFAULT_KEYWORDS],
    ...(canonicalPath && { alternates: { canonical: canonicalPath } }),
    openGraph: {
      title: ogTitle,
      description: seo.description,
      ...(canonicalPath && { url: `${SITE_URL}${canonicalPath}` }),
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "website",
      images: [{ url: ogImage, alt: `${SITE_NAME} — оптоволокно` }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: seo.description,
      images: [ogImage],
    },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    ...overrides,
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createPageMetadata("home"),
  title: {
    default: PAGE_SEO.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};
