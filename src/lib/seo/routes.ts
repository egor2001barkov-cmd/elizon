/** Публичные SEO-URL: транслит с понятными русскими корнями. */
export const ROUTES = {
  home: "/",
  catalog: "/katalog",
  applications: "/sfery",
  blog: "/blog",
  about: "/o-kompanii",
  contacts: "/kontakty",
  whyUs: "/pochemu-my",
  advantages: "/preimushchestva",
  services: "/uslugi",
  delivery: "/dostavka",
  faq: "/faq",
  offer: "/oferta",
  privacy: "/politika",
  sitemapPage: "/karta-sajta",
  cart: "/korzina",
  payment: "/korzina/oplata",
} as const;

/** Устаревшие публичные пути (301 → актуальные ROUTES). */
export const LEGACY_PUBLIC_PATHS = {
  applications: "/aplikacii",
  privacy: "/privasi",
} as const;

/** Публичный путь хаба сфер или подраздела /sfery/{sphere} */
export function applicationPath(sphere?: string): string {
  if (!sphere) return ROUTES.applications;
  return `${ROUTES.applications}/${sphere}`;
}

/**
 * 301 со старых корневых SEO-URL сфер на /sfery/{slug}.
 * Держим здесь (без path-alias), чтобы next.config мог импортировать.
 */
export const APPLICATION_LEGACY_REDIRECTS = [
  { source: "/optovolokno-telekommunikacii", destination: "/sfery/telekommunikacii" },
  { source: "/optovolokno-ftth", destination: "/sfery/ftth" },
  { source: "/optovolokno-magistral", destination: "/sfery/magistral" },
  { source: "/optovolokno-data-centr", destination: "/sfery/data-centr" },
  { source: "/optovolokno-promyshlennost", destination: "/sfery/promyshlennost" },
  { source: "/optovolokno-dwdm", destination: "/sfery/dwdm" },
  { source: "/optovolokno-drony", destination: "/sfery/drony" },
  { source: "/aplikacii", destination: "/sfery" },
  { source: "/aplikacii/:sphere", destination: "/sfery/:sphere" },
  { source: "/privasi", destination: "/politika" },
] as const;

/**
 * SEO-склейка 20.10.2026: один интент — одна страница.
 * Парные коммерческие лендинги уводим 301 на карточки товаров/каталог,
 * города без заметного спроса — на каталог.
 */
export const SEO_LANDING_REDIRECTS = [
  // «купить G.657.A2 / G.657.A1 / G.652.D» — карточка товара каноническая
  { source: "/g657a2-kupit", destination: "/optovolokno/g657/g657a2" },
  { source: "/optovolokno-g657a2", destination: "/optovolokno/g657/g657a2" },
  { source: "/g657a1-kupit", destination: "/optovolokno/g657/g657a1" },
  { source: "/optovolokno-g657a1", destination: "/optovolokno/g657/g657a1" },
  { source: "/optovolokno-g652d", destination: "/optovolokno/g652/g652d" },
  { source: "/opticheskoe-volokno-g652", destination: "/optovolokno/g652" },
  // синонимы общего интента «купить оптоволокно»
  { source: "/volokno-opticheskoe-kupit", destination: "/kupit-optovolokno" },
  { source: "/optovolokno-pod-zakaz", destination: "/kupit-optovolokno" },
  // «катушка оптоволокна»: один лендинг вместо двух
  { source: "/katushka-optovolokna-50-km", destination: "/katushka-optovolokna" },
  // интернет/wi-fi/кабель — сводим к двум сильным страницам
  { source: "/optovolokno-wifi", destination: "/optovolokno-internet" },
  { source: "/kabel-optovolokno-dlya-interneta", destination: "/optovolokno-internet" },
  { source: "/opticheskoe-volokno-kabel", destination: "/optovolokno-kabel" },
  // каннибализация 27.10: тонкие старые статьи склеены с сильными страницами
  { source: "/blog/optovolokno-pod-zakaz", destination: "/kupit-optovolokno" },
  { source: "/blog/optovolokno-moskva", destination: "/moscow" },
  { source: "/blog/optovolokno-spb", destination: "/spb" },
  { source: "/blog/optovolokno-regiony", destination: "/dostavka" },
  { source: "/blog/optovolokno-datacenter", destination: "/blog/optovolokno-dlya-tcod" },
  { source: "/blog/svarka-g657a2-s-g652d", destination: "/blog/svarka-g657a2" },
] as const;

/** Внутренние пути App Router (папки в app/). */
export const INTERNAL_ROUTES = {
  catalog: "/catalog",
  applications: "/applications",
  blog: "/blog",
  about: "/about",
  contacts: "/contacts",
  whyUs: "/why-us",
  advantages: "/advantages",
  services: "/services",
  delivery: "/delivery",
  faq: "/faq",
  offer: "/offer",
  privacy: "/privacy",
  sitemapPage: "/sitemap-page",
  cart: "/catalog/cart",
  payment: "/catalog/cart/payment",
} as const;

export const ABOUT_NAV_CHILDREN = [
  { href: ROUTES.about, label: "О компании" },
  { href: ROUTES.whyUs, label: "Почему мы" },
  { href: ROUTES.advantages, label: "Преимущества" },
  { href: ROUTES.services, label: "Услуги" },
  { href: ROUTES.contacts, label: "Контакты" },
] as const;

const PUBLIC_TO_INTERNAL: Record<string, string> = {
  [ROUTES.catalog]: INTERNAL_ROUTES.catalog,
  [ROUTES.applications]: INTERNAL_ROUTES.applications,
  [ROUTES.blog]: INTERNAL_ROUTES.blog,
  [ROUTES.about]: INTERNAL_ROUTES.about,
  [ROUTES.contacts]: INTERNAL_ROUTES.contacts,
  [ROUTES.whyUs]: INTERNAL_ROUTES.whyUs,
  [ROUTES.advantages]: INTERNAL_ROUTES.advantages,
  [ROUTES.services]: INTERNAL_ROUTES.services,
  [ROUTES.delivery]: INTERNAL_ROUTES.delivery,
  [ROUTES.faq]: INTERNAL_ROUTES.faq,
  [ROUTES.offer]: INTERNAL_ROUTES.offer,
  [ROUTES.privacy]: INTERNAL_ROUTES.privacy,
  [ROUTES.sitemapPage]: INTERNAL_ROUTES.sitemapPage,
  [ROUTES.cart]: INTERNAL_ROUTES.cart,
  [ROUTES.payment]: INTERNAL_ROUTES.payment,
};

const INTERNAL_TO_PUBLIC: Record<string, string> = Object.fromEntries(
  Object.entries(PUBLIC_TO_INTERNAL).map(([pub, internal]) => [internal, pub])
);

export function toPublicPath(pathname: string): string {
  if (pathname === INTERNAL_ROUTES.catalog) return ROUTES.catalog;
  if (pathname.startsWith(`${INTERNAL_ROUTES.catalog}/cart/payment`)) {
    return ROUTES.payment;
  }
  if (pathname.startsWith(`${INTERNAL_ROUTES.catalog}/cart`)) {
    return ROUTES.cart;
  }
  if (pathname.startsWith(`${INTERNAL_ROUTES.catalog}/`)) {
    return pathname.slice(INTERNAL_ROUTES.catalog.length);
  }
  if (pathname === INTERNAL_ROUTES.applications) return ROUTES.applications;
  if (pathname.startsWith(`${INTERNAL_ROUTES.applications}/`)) {
    return `${ROUTES.applications}${pathname.slice(INTERNAL_ROUTES.applications.length)}`;
  }

  for (const [internal, pub] of Object.entries(INTERNAL_TO_PUBLIC)) {
    if (pathname === internal) return pub;
  }

  return pathname;
}

export function toInternalPath(pathname: string): string | null {
  if (pathname === ROUTES.applications) return INTERNAL_ROUTES.applications;
  if (pathname.startsWith(`${ROUTES.applications}/`)) {
    return `${INTERNAL_ROUTES.applications}${pathname.slice(ROUTES.applications.length)}`;
  }
  return PUBLIC_TO_INTERNAL[pathname] ?? null;
}

export const SEO_ROUTE_REWRITES = [
  { source: ROUTES.payment, destination: INTERNAL_ROUTES.payment },
  { source: ROUTES.cart, destination: INTERNAL_ROUTES.cart },
  { source: ROUTES.catalog, destination: INTERNAL_ROUTES.catalog },
  {
    source: `${ROUTES.applications}/:sphere`,
    destination: `${INTERNAL_ROUTES.applications}/:sphere`,
  },
  { source: ROUTES.applications, destination: INTERNAL_ROUTES.applications },
  { source: ROUTES.about, destination: INTERNAL_ROUTES.about },
  { source: ROUTES.contacts, destination: INTERNAL_ROUTES.contacts },
  { source: ROUTES.whyUs, destination: INTERNAL_ROUTES.whyUs },
  { source: ROUTES.advantages, destination: INTERNAL_ROUTES.advantages },
  { source: ROUTES.services, destination: INTERNAL_ROUTES.services },
  { source: ROUTES.delivery, destination: INTERNAL_ROUTES.delivery },
  { source: ROUTES.offer, destination: INTERNAL_ROUTES.offer },
  { source: ROUTES.privacy, destination: INTERNAL_ROUTES.privacy },
  { source: ROUTES.sitemapPage, destination: INTERNAL_ROUTES.sitemapPage },
] as const;

export const SEO_ROUTE_REDIRECTS = [
  { source: INTERNAL_ROUTES.payment, destination: ROUTES.payment, permanent: true },
  { source: INTERNAL_ROUTES.cart, destination: ROUTES.cart, permanent: true },
  { source: INTERNAL_ROUTES.catalog, destination: ROUTES.catalog, permanent: true },
  { source: `${INTERNAL_ROUTES.catalog}/:path+`, destination: "/:path+", permanent: true },
  { source: `${ROUTES.catalog}/:path+`, destination: "/:path+", permanent: true },
  {
    source: `${INTERNAL_ROUTES.applications}/:sphere`,
    destination: `${ROUTES.applications}/:sphere`,
    permanent: true,
  },
  { source: INTERNAL_ROUTES.applications, destination: ROUTES.applications, permanent: true },
  { source: INTERNAL_ROUTES.about, destination: ROUTES.about, permanent: true },
  { source: INTERNAL_ROUTES.contacts, destination: ROUTES.contacts, permanent: true },
  { source: INTERNAL_ROUTES.whyUs, destination: ROUTES.whyUs, permanent: true },
  { source: INTERNAL_ROUTES.advantages, destination: ROUTES.advantages, permanent: true },
  { source: INTERNAL_ROUTES.services, destination: ROUTES.services, permanent: true },
  { source: INTERNAL_ROUTES.delivery, destination: ROUTES.delivery, permanent: true },
  { source: INTERNAL_ROUTES.offer, destination: ROUTES.offer, permanent: true },
  { source: INTERNAL_ROUTES.privacy, destination: ROUTES.privacy, permanent: true },
  { source: INTERNAL_ROUTES.sitemapPage, destination: ROUTES.sitemapPage, permanent: true },
] as const;
