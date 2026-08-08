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
      "Прямые поставки G.657.A2 242 мкм: катушка 50 км от 150 000 ₽, радиус изгиба 7,5 мм, срок 14–21 рабочий день. Для операторов связи и монтажных бригад по всей России.",
    path: "/",
    titleAbsolute: true,
    ogImage: DEFAULT_OG_IMAGE,
  },
  catalog: {
    title: "Каталог оптоволокна — цены и заказ",
    description:
      "Позиции в наличии под заказ: G.657.A2, G.652.D, G.655, патч-корды, FO-цилиндры. Цены с завода, калькулятор длины, счёт на организацию за 15 минут.",
    path: ROUTES.catalog,
    keywords: [...DEFAULT_KEYWORDS, "каталог оптоволокна", "цена оптоволокна"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  productG657a2: {
    title: "G.657.A2 242 мкм — купить катушку 50 км от 150 000 ₽",
    description:
      "Карточка G.657.A2 242 мкм: 50 км на катушке, 7,5 мм радиус, ≤0,22 дБ/км @1550 нм. Спецификация PDF, паспорт и рефлектограмма на партию. Отгрузка 14–21 день.",
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
      "Корзина ELIZON: укажите контакты, город и адрес — менеджер подтвердит цену, срок 14–21 день и способ оплаты.",
    path: ROUTES.cart,
    keywords: [...DEFAULT_KEYWORDS, "заказ оптоволокна", "купить катушку"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  payment: {
    title: "Оплата заказа",
    description:
      "Оплата заказа оптоволокна ELIZON: 100% предоплата безналом. После оплаты фиксируем партию и срок отгрузки.",
    path: ROUTES.payment,
    keywords: [...DEFAULT_KEYWORDS, "оплата заказа", "предоплата безналом"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  applications: {
    title: "Оптоволокно по сферам применения — телеком, абонентский доступ, магистрали",
    description:
      "Где ставят наше волокно: городские сети, FTTH, магистрали, ЦОД, промышленность, DWDM и тросы БПЛА. Подбор типа волокна и срок 14–21 день.",
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
      "ELIZON — канал поставок G.657.A2 и G.652.D с заводов. Москва, Арбат 27. Работаем с юрлицами: счета, паспорта, отгрузка по РФ за 14–21 день.",
    path: ROUTES.about,
    keywords: [...DEFAULT_KEYWORDS, "поставщик оптоволокна", "прямые поставки", "официальный дистрибьютор"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  whyUs: {
    title: "Почему мы — 5 причин выбрать ELIZON",
    description:
      "Чем отличаемся от перекупщиков: цена с завода, катушки 50 км, G.657.A2 с радиусом 7,5 мм, фиксированный срок и менеджер на связи за 15 минут.",
    path: ROUTES.whyUs,
    keywords: [...DEFAULT_KEYWORDS, "почему ELIZON", "прямой поставщик", "отзывы"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  advantages: {
    title: "Преимущества ELIZON — G.657.A2, цена, срок 14–21 день",
    description:
      "Почему берут оптоволокно у ELIZON: прямые поставки, G.657.A2 радиус 7,5 мм, катушка 50 км, доставка по РФ, документы МСЭ-Т. Для телекома, FTTH и БПЛА.",
    path: ROUTES.advantages,
    keywords: [
      ...DEFAULT_KEYWORDS,
      "преимущества поставщика оптоволокна",
      "G.657.A2 преимущества",
      "оптоволокно для БПЛА",
      "оптоволокно оптом",
      "прямой поставщик",
    ],
    ogImage: DEFAULT_OG_IMAGE,
  },
  services: {
    title: "Услуги — поставка, подбор волокна, рефлектометрический контроль",
    description:
      "Подбор G.652/G.657, нестандартные длины, фиксация цены на объём, OTDR-контроль по запросу. Поставка катушек под график бригад.",
    path: ROUTES.services,
    keywords: [...DEFAULT_KEYWORDS, "услуги", "подбор волокна", "рефлектометрия"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  delivery: {
    title: "Доставка и оплата оптоволокна",
    description:
      "Самовывоз Москва · Деловые Линии и ПЭК в регионы · ЖД от крупных партий. Оплата: счёт или 100% предоплата. Срок производства 14–21 день.",
    path: ROUTES.delivery,
    keywords: [...DEFAULT_KEYWORDS, "доставка оптоволокна", "оплата", "запросить счёт"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  faq: {
    title: "FAQ: цена, сроки и документы на оптоволокно",
    description:
      "Сколько стоит G.657.A2, когда привезут, какие документы, чем A2 отличается от G.652.D, как оплатить счёт — короткие ответы без воды.",
    path: ROUTES.faq,
    keywords: [...DEFAULT_KEYWORDS, "FAQ оптоволокно", "G.657.A2 цена", "срок поставки"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  offer: {
    title: "Публичная оферта",
    description:
      "Условия публичной оферты ELIZON: заказ, оплата, поставка оптоволокна и сопутствующего оборудования, ответственность сторон.",
    path: ROUTES.offer,
    keywords: [...DEFAULT_KEYWORDS, "оферта", "договор"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  privacy: {
    title: "Политика конфиденциальности",
    description:
      "Как ELIZON обрабатывает персональные данные из форм и звонков: цели, сроки хранения, права субъекта по 152-ФЗ, cookies и аналитика.",
    path: ROUTES.privacy,
    keywords: ["политика конфиденциальности", "персональные данные", "ELIZON"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  sitemapPage: {
    title: "Карта сайта",
    description:
      "Полная навигация по elizon.ru: каталог, сферы, кейсы, блог, города, FAQ, доставка и юридические страницы.",
    path: ROUTES.sitemapPage,
    keywords: [...DEFAULT_KEYWORDS, "карта сайта"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  blog: {
    title: "Блог — статьи об оптоволокне и телекоме",
    description:
      "Практические заметки: G.657.A2 vs G.652.D, монтаж, OTDR, FTTH, цены и закупка оптом. Для инженеров, прорабов и закупок.",
    path: ROUTES.blog,
    keywords: [...DEFAULT_KEYWORDS, "блог", "статьи", "G.657.A2 vs G.652.D"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  moscow: {
    title: "Оптоволокно в Москве — купить G.657.A2 от 150 000 ₽",
    description:
      "Поставки G.657.A2 в Москву и МО: самовывоз с Арбата, курьер 1–2 дня после готовности партии, счёт на юрлицо, паспорт на катушку.",
    path: "/moscow",
    keywords: [...DEFAULT_KEYWORDS, "оптоволокно Москва", "купить Москва"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  spb: {
    title: "Оптоволокно в Санкт-Петербурге — G.657.A2 за 14–21 день",
    description:
      "G.657.A2 для СПб и Ленобласти: производство 14–21 день, доставка ТК 2–4 дня, документы для приёмки, фиксация цены от 10 катушек.",
    path: "/spb",
    keywords: [...DEFAULT_KEYWORDS, "оптоволокно Санкт-Петербург", "G.657.A2 СПб"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  contacts: {
    title: "Контакты — запросить цену и счёт",
    description:
      "Телефон +7 (926) 449-41-04, support@elizon.ru, Telegram @egorconsult. Заявка на цену G.657.A2 и счёт — обычно отвечаем за 15 минут.",
    path: ROUTES.contacts,
    keywords: [...DEFAULT_KEYWORDS, "запросить цену", "выставить счёт", "контакты ELIZON"],
    ogImage: DEFAULT_OG_IMAGE,
  },
  notFound: {
    title: "Страница не найдена",
    description:
      "Такой страницы нет. Загляните в каталог или оставьте заявку на G.657.A2 — от 150 000 ₽ за 50 км, срок 14–21 день.",
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
      images: [
        {
          url: ogImage,
          alt: `${SITE_NAME} — оптоволокно G.657.A2`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: seo.description,
      images: [ogImage],
    },
    // Google/Yandex: крупные сниппеты и превью, без смены title/description
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-120.png", sizes: "120x120", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};
