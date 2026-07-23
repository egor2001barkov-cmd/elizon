import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { catalogItemPath } from "@/lib/seo/catalog-routes";
import { ROUTES } from "@/lib/seo/routes";
import {
  applicationLandings,
  applicationLandingSlugs,
  getFooterApplications,
} from "./application-landings";
import {
  cylinderLandings,
  cylinderLandingSlugs,
  getFooterCylinders,
} from "./cylinder-landings";

export { applicationLandings, applicationLandingSlugs, getFooterApplications };
export { cylinderLandings, cylinderLandingSlugs, getFooterCylinders };

export type LandingType = "city" | "keyword" | "application" | "cylinder";

export interface LandingSection {
  title: string;
  paragraphs: string[];
}

export interface LandingPage {
  slug: string;
  type: LandingType;
  h1: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  sections: LandingSection[];
  deliveryDays: string;
  deliveryNote: string;
  ctaTitle: string;
  catalogHref: string;
  /** Для городов — именительный падеж */
  cityName?: string;
  /** Предложный падеж для «в …» */
  cityIn?: string;
  region?: string;
  caseReference?: string;
  /** Для ключевых страниц и сфер применения */
  primaryKeyword?: string;
  /** ID сферы из applications.ts */
  applicationId?: string;
  specPdfUrl?: string;
}

const CATALOG_G657 = catalogItemPath("optovolokno", "g657", "g657a2");

function cityLanding(
  slug: string,
  cityName: string,
  cityIn: string,
  region: string,
  deliveryDays: string,
  deliveryNote: string,
  localNote: string,
  extra?: Partial<LandingPage>
): LandingPage {
  return {
    slug,
    type: "city",
    cityName,
    cityIn,
    region,
    h1: `Оптоволокно в ${cityIn} — купить G.657.A2 с доставкой`,
    title: `Оптоволокно в ${cityName} — G.657.A2 от 150 000 ₽ | ELIZON`,
    description: `Купить оптоволокно G.657.A2 в ${cityIn} и ${region}. Прямые поставки ELIZON, срок 14–21 день, доставка ${deliveryDays}. От 150 000 ₽/50 км.`,
    keywords: [
      `оптоволокно ${cityName}`,
      `купить оптоволокно ${cityName}`,
      "G.657.A2",
      "поставщик оптоволокна",
      "катушка 50 км",
    ],
    intro: localNote,
    deliveryDays,
    deliveryNote,
    ctaTitle: `Запросите цену на оптоволокно в ${cityIn}`,
    catalogHref: CATALOG_G657,
    sections: [
      {
        title: `Поставки оптоволокна в ${cityIn}`,
        paragraphs: [
          `ELIZON поставляет G.657.A2, G.652.D, G.657.A1 и G.655 в ${cityIn} и ${region}. Прямые поставки с завода — без посредников. На каждую партию: паспорт качества, спецификация PDF, OTDR-отчёт по запросу.`,
          "Фиксация цены от 10 катушек. Оплата: 100% предоплата безналом или счёт на организацию.",
        ],
      },
      {
        title: "Почему заказывают у ELIZON",
        paragraphs: [
          "Склад комплектации в Москве — приёмка и контроль качества перед отгрузкой в регион. Реальные фото катушек на складе, рейтинг 4,7 на Яндекс.Картах.",
          "Менеджер отвечает на заявку за 15 минут в рабочее время. Срок производства фиксируется в счёте: 14–21 рабочий день.",
        ],
      },
    ],
    ...extra,
  };
}

export const moscowLanding: LandingPage = {
  ...cityLanding(
    "moscow",
    "Москва",
    "Москве",
    "Москва и Московская область",
    "1–2 дня после готовности",
    "Самовывоз: г. Москва, ул. Арбат, 27. Курьер по Москве и МО — от 3 000 ₽.",
    "ELIZON базируется в Москве. Работаем с операторами связи, монтажными компаниями Подмосковья и подрядчиками FTTH."
  ),
  h1: "Оптоволокно в Москве — купить G.657.A2 с доставкой",
  title: "Оптоволокно в Москве — купить G.657.A2 от 150 000 ₽",
  description:
    "Купите оптоволокно G.657.A2 в Москве и МО. Прямые поставки ELIZON, самовывоз с ул. Арбат, доставка за 1–2 дня. От 150 000 ₽/50 км.",
  cityName: "Москва",
  cityIn: "Москве",
  caseReference: "/cases/moscow-ring",
  sections: [
    {
      title: "Поставки в Москве и МО",
      paragraphs: [
        "Офис и склад комплектации — г. Москва, ул. Арбат, 27. Самовывоз в день уведомления. Доставка на объект по Москве и области собственным транспортом.",
        "Кейс: 12 катушек G.657.A2 на трассу 38 км в Подмосковье — 3 стыка вместо 8, сдача на 4 дня раньше срока.",
      ],
    },
    {
      title: "Документы и гарантии",
      paragraphs: [
        "Полный пакет для бухгалтерии и технической приёмки: ТОРГ-12, счёт-фактура, паспорт качества, OTDR по запросу.",
        "Рейтинг 4,7 на Яндекс.Картах. Прямые поставки с завода — цена в счёте без наценок дилеров.",
      ],
    },
  ],
};

export const spbLanding: LandingPage = {
  ...cityLanding(
    "spb",
    "Санкт-Петербург",
    "Санкт-Петербурге",
    "Санкт-Петербург и Ленинградская область",
    "2–4 дня после готовности",
    "Деловые Линии, ПЭК — до терминала или адреса в СПб и Ленобласти.",
    "Поставляем волокно для городских сетей, FTTH и магистралей Северо-Западного региона."
  ),
  h1: "Оптоволокно в Санкт-Петербурге — поставки для телеком-проектов",
  title: "Оптоволокно в Санкт-Петербурге — G.657.A2 за 14–21 день",
  cityName: "Санкт-Петербург",
  cityIn: "Санкт-Петербурге",
  sections: [
    {
      title: "Логистика в Санкт-Петербурге",
      paragraphs: [
        "Отгрузка со склада комплектации в Москве. Доставка транспортными компаниями 2–4 дня после готовности партии.",
        "ЖД-перевозка для крупных заказов от 20 катушек — индивидуальный расчёт.",
      ],
    },
    {
      title: "Для кого поставляем в СПб",
      paragraphs: [
        "Операторы связи, монтажные организации, подрядчики FTTH и магистральных проектов в Ленобласти.",
        "G.657.A2 — радиус изгиба 7,5 мм, катушка 50 км, от 150 000 ₽. Документы ITU-T на партию.",
      ],
    },
  ],
};

export const cityLandings: LandingPage[] = [
  cityLanding(
    "novosibirsk",
    "Новосибирск",
    "Новосибирске",
    "Новосибирская область и Сибирь",
    "5–8 дней",
    "Деловые Линии, ПЭК, ЖД для крупных партий.",
    "Поставки для телеком-операторов и монтажных компаний Сибири. FTTH и магистральные проекты."
  ),
  cityLanding(
    "ekaterinburg",
    "Екатеринбург",
    "Екатеринбурге",
    "Свердловская область и Урал",
    "4–7 дней",
    "ТК по России, ЖД для партий от 20 катушек.",
    "Магистральные и городские сети на Урале. Прямые поставки G.657.A2 и G.652.D."
  ),
  cityLanding(
    "kazan",
    "Казань",
    "Казани",
    "Республика Татарстан и Поволжье",
    "3–6 дней",
    "Деловые Линии, ПЭК — до терминала или адреса.",
    "Работаем с операторами связи и монтажными организациями Поволжья."
  ),
  cityLanding(
    "nizhniy-novgorod",
    "Нижний Новгород",
    "Нижнем Новгороде",
    "Нижегородская область",
    "3–5 дней",
    "Деловые Линии, ПЭК.",
    "Поставки для городской связи и FTTH в Нижегородской области."
  ),
  cityLanding(
    "samara",
    "Самара",
    "Самаре",
    "Самарская область",
    "3–6 дней",
    "Деловые Линии, ПЭК.",
    "Оптоволокно для операторов и монтажных бригад Самарского региона."
  ),
  cityLanding(
    "rostov-na-donu",
    "Ростов-на-Дону",
    "Ростове-на-Дону",
    "Ростовская область и Юг России",
    "3–5 дней",
    "Деловые Линии, ПЭК, доставка на объект.",
    "Поставки для южных магистралей и городских сетей."
  ),
  cityLanding(
    "krasnodar",
    "Краснодар",
    "Краснодаре",
    "Краснодарский край",
    "3–5 дней",
    "Деловые Линии, ПЭК.",
    "FTTH и магистральные проекты на Юге. G.657.A2 под заказ 14–21 день."
  ),
  cityLanding(
    "chelyabinsk",
    "Челябинск",
    "Челябинске",
    "Челябинская область",
    "4–7 дней",
    "Транспортные компании, ЖД.",
    "Промышленные и телеком-проекты Урала."
  ),
  cityLanding(
    "krasnoyarsk",
    "Красноярск",
    "Красноярске",
    "Красноярский край",
    "6–9 дней",
    "Деловые Линии, ПЭК, ЖД.",
    "Длинные магистрали и городская связь Сибири."
  ),
  cityLanding(
    "voronezh",
    "Воронеж",
    "Воронеже",
    "Воронежская область",
    "3–5 дней",
    "Деловые Линии, ПЭК.",
    "Городские сети и FTTH в Центрально-Чернозёмном регионе."
  ),
  cityLanding(
    "perm",
    "Пермь",
    "Перми",
    "Пермский край",
    "4–6 дней",
    "Деловые Линии, ПЭК.",
    "Поставки для Урала и Приволжья."
  ),
  cityLanding(
    "ufa",
    "Уфа",
    "Уфе",
    "Республика Башкортостан",
    "4–6 дней",
    "Деловые Линии, ПЭК.",
    "Операторы связи и монтажные организации Башкортостана."
  ),
  cityLanding(
    "volgograd",
    "Волгоград",
    "Волгограде",
    "Волгоградская область",
    "3–6 дней",
    "Деловые Линии, ПЭК.",
    "Магистральные и городские проекты Поволжья."
  ),
  cityLanding(
    "saratov",
    "Саратов",
    "Саратове",
    "Саратовская область",
    "3–6 дней",
    "Деловые Линии, ПЭК.",
    "FTTH и распределительные сети Саратовской области."
  ),
  cityLanding(
    "tyumen",
    "Тюмень",
    "Тюмени",
    "Тюменская область",
    "5–8 дней",
    "ТК и ЖД.",
    "Поставки для Западной Сибири и нефтегазовых проектов."
  ),
  cityLanding(
    "barnaul",
    "Барнаул",
    "Барнауле",
    "Алтайский край",
    "6–9 дней",
    "Деловые Линии, ПЭК.",
    "Телеком-проекты Алтая и Сибири."
  ),
];

function keywordLanding(
  slug: string,
  h1: string,
  title: string,
  description: string,
  primaryKeyword: string,
  keywords: string[],
  intro: string,
  sections: LandingSection[],
  catalogHref = CATALOG_G657
): LandingPage {
  return {
    slug,
    type: "keyword",
    h1,
    title,
    description,
    keywords: [primaryKeyword, ...keywords],
    primaryKeyword,
    intro,
    deliveryDays: "14–21 день производство + доставка по РФ",
    deliveryNote: "Деловые Линии, ПЭК, ЖД. Самовывоз в Москве.",
    ctaTitle: "Запросите цену и счёт",
    catalogHref,
    sections,
  };
}

export const keywordLandings: LandingPage[] = [
  keywordLanding(
    "kupit-optovolokno",
    "Купить оптоволокно — прямые поставки с завода",
    "Купить оптоволокно — G.657.A2 от 150 000 ₽/50 км",
    "Купить оптоволокно G.657.A2, G.652.D напрямую у поставщика ELIZON. Катушка 50 км от 150 000 ₽, срок 14–21 день, документы на партию.",
    "купить оптоволокно",
    ["волокно оптическое купить", "оптоволокно цена", "катушка 50 км"],
    "ELIZON — прямой канал поставок оптического волокна для операторов связи и монтажных организаций. Без посредников, с фиксированным сроком и полным пакетом документов.",
    [
      {
        title: "Что можно купить",
        paragraphs: [
          "G.657.A2 242 мкм — от 150 000 ₽/50 км. G.652.D — от 120 000 ₽. G.657.A1, G.655, патч-корды, нестандартные длины.",
          "Минимальный заказ — от 1 катушки. Фиксация цены от 10 катушек на квартал.",
        ],
      },
    ]
  ),
  keywordLanding(
    "optovolokno-optom",
    "Оптоволокно оптом — цены от производителя",
    "Оптоволокно оптом — от 3 000 ₽/км | ELIZON",
    "Оптоволокно оптом без посредников. G.657.A2 от 150 000 ₽ за 50 км, фиксация цены на объём, срок 14–21 день.",
    "оптоволокно оптом",
    ["оптом оптоволокно", "оптовые цены", "поставщик оптом"],
    "Оптовые закупки с фиксацией цены и графиком поставок. Резервирование производственных слотов для постоянных клиентов.",
    [
      {
        title: "Условия для оптовиков",
        paragraphs: [
          "Фиксация цены от 10 катушек. OTDR-отчёты и паспорта на каждую партию. Отсрочка — по договорённости.",
        ],
      },
    ]
  ),
  keywordLanding(
    "g657a2-kupit",
    "G.657.A2 купить — катушка 50 км от 150 000 ₽",
    "G.657.A2 купить — радиус изгиба 7,5 мм | ELIZON",
    "Купить G.657.A2 242 мкм: катушка 50 км от 150 000 ₽, радиус изгиба 7,5 мм, срок 14–21 день. Прямые поставки, OTDR-отчёт.",
    "G.657.A2 купить",
    ["G.657.A2 цена", "волокно G.657", "bend insensitive"],
    "G.657.A2 — флагман ELIZON. Лучший радиус изгиба в классе, 50 км в катушке, совместимость с G.652.D.",
    [
      {
        title: "Характеристики G.657.A2",
        paragraphs: [
          "Радиус изгиба 7,5 мм. Затухание ≤ 0,35 дБ/км @ 1310 нм. Без водяного пика. ITU-T G.657.A2.",
        ],
      },
    ]
  ),
  keywordLanding(
    "optovolokno-g657a2",
    "Оптоволокно G.657.A2 — купить у прямого поставщика",
    "Оптоволокно G.657.A2 — цена и заказ",
    "Оптоволокно G.657.A2 242 мкм под заказ. Катушка 50 км, прямые поставки, документы ITU-T, доставка по России.",
    "оптоволокно G.657.A2",
    ["G657A2", "волокно A2", "оптика G.657"],
    "Поставляем G.657.A2 напрямую с завода для FTTH, магистралей и городских сетей.",
    [
      {
        title: "Сферы применения G.657.A2",
        paragraphs: [
          "FTTH, плотная прокладка в колодцах, магистрали до 50 км без промежуточных стыков, дата-центры.",
        ],
      },
    ]
  ),
  keywordLanding(
    "postavshchik-optovolokna",
    "Поставщик оптоволокна — прямые поставки ELIZON",
    "Поставщик оптоволокна — официальный канал с завода",
    "Поставщик оптоволокна ELIZON: прямые поставки G.657.A2, G.652.D. Срок 14–21 день, документы, рейтинг 4,7.",
    "поставщик оптоволокна",
    ["дистрибьютор оптоволокна", "прямой поставщик", "официальный поставщик"],
    "Мы не перекупщики — официальный канал дистрибуции заводского волокна. Цена в счёте, OTDR на партию.",
    [
      {
        title: "Почему ELIZON",
        paragraphs: [
          "Прямые контракты с производителем. Ответ на заявку за 15 минут. Склад комплектации в Москве с контролем качества.",
        ],
      },
    ]
  ),
  keywordLanding(
    "optovolokno-pod-zakaz",
    "Оптоволокно под заказ — срок 14–21 день",
    "Оптоволокно под заказ — фиксированный срок поставки",
    "Оптоволокно под заказ напрямую с завода. Срок 14–21 рабочий день фиксируется в счёте. G.657.A2, G.652.D и др.",
    "оптоволокно под заказ",
    ["заказать оптоволокно", "производство под заказ", "срок поставки"],
    "Поставки под заказ — стандартная практика для качественного волокна. Срок не «уточняется», а фиксируется в договоре.",
    [
      {
        title: "Как оформить заказ",
        paragraphs: [
          "Заявка → КП за 15 минут → счёт → оплата → производство 14–21 день → отгрузка с документами.",
        ],
      },
    ]
  ),
  keywordLanding(
    "katushka-optovolokna-50-km",
    "Катушка оптоволокна 50 км — G.657.A2 от 150 000 ₽",
    "Катушка оптоволокна 50 км — купить с доставкой",
    "Катушка оптоволокна 50 км G.657.A2 — от 150 000 ₽. Меньше сварок на трассе, прямые поставки, срок 14–21 день.",
    "катушка оптоволокна 50 км",
    ["катушка 50 км", "бухта 50 км", "50 км оптоволокно"],
    "Длинная катушка сокращает число стыков на объекте. На трассе 38 км — 3 стыка вместо 8.",
    [
      {
        title: "Нестандартные длины",
        paragraphs: [
          "Также изготавливаем катушки 25, 75, 100 км — под заказ с тем же сроком 14–21 день.",
        ],
      },
    ]
  ),
  keywordLanding(
    "volokno-opticheskoe-kupit",
    "Волокно оптическое купить — одномодовое G.657 и G.652",
    "Волокно оптическое купить — каталог ELIZON",
    "Купить волокно оптическое одномодовое G.657.A2, G.652.D. Прямые поставки, ITU-T, срок 14–21 день.",
    "волокно оптическое купить",
    ["оптическое волокно", "одномодовое волокно", "SM волокно"],
    "Одномодовое волокно для магистралей, FTTH, DWDM. Полный каталог стандартов ITU-T.",
    [
      {
        title: "Стандарты волокна",
        paragraphs: [
          "G.657.A2 — плотная прокладка. G.652.D — магистрали. G.655 — дальние DWDM. Консультация по выбору — бесплатно.",
        ],
      },
    ]
  ),
  keywordLanding(
    "optovolokno-g652d",
    "Оптоволокно G.652.D — купить катушку 50 км",
    "G.652.D оптоволокно — от 120 000 ₽/50 км",
    "Купить оптоволокно G.652.D 242 мкм. Катушка 50 км от 120 000 ₽, для магистралей и DWDM. Под заказ 14–21 день.",
    "оптоволокно G.652.D",
    ["G.652.D купить", "стандартное волокно"],
    "G.652.D — классика магистральных сетей. Низкое затухание на 1550 нм, совместимость с DWDM.",
    [
      {
        title: "Когда выбрать G.652.D",
        paragraphs: [
          "Магистрали без плотных изгибов, DWDM, бюджетные проекты. Сравнение с G.657.A2 — в блоге.",
        ],
      },
    ],
    catalogItemPath("optovolokno", "g652", "g652d")
  ),
  keywordLanding(
    "cena-optovolokna",
    "Цена оптоволокна — актуальные цены ELIZON 2026",
    "Цена оптоволокна — G.657.A2 от 150 000 ₽",
    "Цена оптоволокна: G.657.A2 от 150 000 ₽/50 км, G.652.D от 120 000 ₽. Прямые поставки, калькулятор на сайте.",
    "цена оптоволокна",
    ["стоимость оптоволокна", "сколько стоит оптоволокно", "прайс"],
    "Цены напрямую с завода. Точный расчёт — в коммерческом предложении за 15 минут.",
    [
      {
        title: "Ориентиры цен",
        paragraphs: [
          "G.657.A2 — от 150 000 ₽/50 км. G.657.A1 — от 135 000 ₽. G.652.D — от 120 000 ₽. G.655 — от 145 000 ₽.",
        ],
      },
    ],
    ROUTES.catalog
  ),
];

export const allLandings: LandingPage[] = [
  moscowLanding,
  spbLanding,
  ...cityLandings,
  ...keywordLandings,
  ...applicationLandings,
  ...cylinderLandings,
];

export const keywordLandingSlugs: string[] = keywordLandings.map((l) => l.slug);

/**
 * Slugs for dynamic root [slug] route.
 * Application landings live under /sfery/[sphere] — not here.
 * Moscow/spb — separate static pages.
 */
export const dynamicLandingSlugs: string[] = [
  ...cityLandings.map((l) => l.slug),
  ...keywordLandingSlugs,
  ...cylinderLandingSlugs,
];

export function getLandingBySlug(slug: string): LandingPage | undefined {
  return allLandings.find((l) => l.slug === slug);
}

export function getFooterCities(): { href: string; label: string; title: string }[] {
  return [moscowLanding, spbLanding, ...cityLandings].map((l) => ({
    href: `/${l.slug}`,
    label: l.cityName ?? l.slug,
    title: l.title,
  }));
}

export function getFooterKeywords(): { href: string; label: string; title: string }[] {
  return keywordLandings.map((l) => ({
    href: `/${l.slug}`,
    label: l.primaryKeyword ?? l.h1.slice(0, 40),
    title: l.title,
  }));
}

export function buildLandingBreadcrumbs(landing: LandingPage): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: "Главная", href: "/" },
  ];

  if (landing.type === "city") {
    items.push({ label: `Оптоволокно в ${landing.cityName ?? landing.slug}` });
  } else if (landing.type === "application") {
    items.push({ label: "Сферы", href: ROUTES.applications });
    items.push({ label: landing.primaryKeyword ?? landing.h1 });
  } else if (landing.type === "cylinder") {
    items.push({ label: "Каталог", href: ROUTES.catalog });
    items.push({ label: "Оптоволоконные цилиндры", href: catalogItemPath("optovolokonnye-cilindry") });
    items.push({ label: landing.primaryKeyword ?? landing.h1 });
  } else {
    items.push({ label: "Каталог", href: ROUTES.catalog });
    items.push({ label: landing.primaryKeyword ?? landing.h1 });
  }

  return items;
}