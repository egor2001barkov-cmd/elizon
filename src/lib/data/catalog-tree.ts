import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import type { CatalogCategory as CatalogCategoryId } from "./catalog-categories";
import { catalogProducts, getProductById, type Product } from "./products";

import { PRODUCTS_BASE } from "@/lib/constants";
import { ROUTES } from "@/lib/seo/routes";

export const CATALOG_HUB_PATH = ROUTES.catalog;

export interface CatalogSubcategoryNode {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  intro: string;
  productIds: string[];
}

export interface CatalogCategoryNode {
  slug: string;
  id: CatalogCategoryId;
  title: string;
  h1: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  intro: string;
  subcategories: CatalogSubcategoryNode[];
}

export const catalogHubSeo = {
  h1: "Каталог оптоволокна и телеком-оборудования",
  metaTitle: "Каталог оптоволокна — цены и заказ",
  description:
    "Каталог ELIZON: оптоволокно G.657.A2, G.652.D, оптоволоконные цилиндры FO-0.25, патч-корды, нестандартные длины. Прямые поставки, срок 14–21 день.",
  keywords: [
    "каталог оптоволокна",
    "купить оптоволокно",
    "G.657.A2",
    "цена оптоволокна",
    "оптом",
  ],
  intro:
    "Полный каталог оптического волокна и комплектующих. Все позиции — под заказ напрямую с завода, срок 14–21 рабочий день. Выберите раздел или воспользуйтесь калькулятором.",
};

export const catalogTree: CatalogCategoryNode[] = [
  {
    slug: "optovolokno",
    id: "fiber",
    title: "Оптоволокно",
    h1: "Оптоволокно купить — каталог ELIZON",
    metaTitle: "Оптоволокно купить оптом — G.657, G.652, G.655",
    description:
      "Купить оптоволокно G.657.A2, G.652.D, G.657.A1 и G.655. Катушки 50 км под заказ, прямые поставки с завода, срок 14–21 день. Цены от 120 000 ₽/50 км.",
    keywords: [
      "оптоволокно купить",
      "волокно оптическое",
      "G.657.A2",
      "G.652.D",
      "катушка 50 км",
    ],
    intro:
      "Одномодовое оптическое волокно стандартов ITU-T для FTTH, магистралей, городских сетей и DWDM. Прямые поставки, документы на партию, фиксация цены от 10 катушек.",
    subcategories: [
      {
        slug: "g657",
        title: "Волокно G.657",
        h1: "Оптоволокно G.657 — bend-insensitive волокно",
        metaTitle: "G.657 оптоволокно — G.657.A2 и G.657.A1 купить",
        description:
          "Оптоволокно G.657.A2 и G.657.A1 с улучшенной устойчивостью к изгибу. Радиус 7,5 мм и 10 мм. Для FTTH, колодцев и плотной прокладки. От 135 000 ₽/50 км.",
        keywords: ["G.657", "G.657.A2", "G.657.A1", "bend insensitive", "радиус изгиба"],
        intro:
          "Семейство G.657 — волокно с пониженной чувствительностью к изгибу. G.657.A2 (радиус 7,5 мм) — флагман для плотной прокладки. G.657.A1 (радиус 10 мм) — баланс цены и гибкости.",
        productIds: ["g657a2-242", "g657a1-242"],
      },
      {
        slug: "g652",
        title: "Волокно G.652",
        h1: "Оптоволокно G.652.D — стандартное одномодовое волокно",
        metaTitle: "G.652.D оптоволокно купить — катушка 50 км",
        description:
          "Купить G.652.D 242 мкм — классическое волокно для магистралей и DWDM. Катушка 50 км от 120 000 ₽, поставка 14–21 день.",
        keywords: ["G.652.D", "стандартное волокно", "магистральное оптоволокно", "DWDM"],
        intro:
          "G.652.D — наиболее распространённый стандарт одномодового волокна. Нулевая дисперсия около 1310 нм, низкое затухание на 1550 нм. Для магистралей и городских сетей.",
        productIds: ["g652d-242"],
      },
      {
        slug: "g655",
        title: "Волокно G.655",
        h1: "Оптоволокно G.655 — для дальних DWDM-магистралей",
        metaTitle: "G.655 оптоволокно купить — магистраль DWDM",
        description:
          "G.655 242 мкм для длинных магистралей и DWDM-систем. Ненулевая смещённая дисперсия. Катушка 50 км от 145 000 ₽, под заказ 14–21 день.",
        keywords: ["G.655", "DWDM магистраль", "нулевая дисперсия", "дальняя магистраль"],
        intro:
          "G.655 оптимизировано для дальних магистральных линий со спектральным уплотнением DWDM. Снижает потребность в компенсаторах дисперсии на трассе.",
        productIds: ["g655-242"],
      },
    ],
  },
  {
    slug: "komplektuyushchie",
    id: "accessories",
    title: "Комплектующие",
    h1: "Комплектующие для оптических сетей",
    metaTitle: "Комплектующие для оптоволокна — патч-корды",
    description:
      "Патч-корды LC/LC, SC, FC для оптических сетей. Любая длина от 0,5 м, APC/UPC, OTDR-тест при отгрузке. Под заказ 14–21 день.",
    keywords: ["патч-корд", "комплектующие оптика", "LC LC", "оптический патч-корд"],
    intro:
      "Патч-корды и расходники для монтажа и эксплуатации оптических сетей. Изготовление под заказ с тестированием.",
    subcategories: [
      {
        slug: "patch-kordy",
        title: "Патч-корды",
        h1: "Патч-корды оптические — LC, SC, FC",
        metaTitle: "Патч-корды купить — LC/LC, SC, FC под заказ",
        description:
          "Оптические патч-корды LC/LC, SC, FC любой длины от 0,5 м. APC/UPC полировка, OTDR-тест. Под заказ от 450 ₽, срок 14–21 день.",
        keywords: ["патч-корд LC", "патч-корд купить", "оптический патч-корд", "LC LC"],
        intro:
          "Патч-корды для кроссов, серверных и узлов связи. Коннекторы LC, SC, FC. Тестирование OTDR при отгрузке.",
        productIds: ["patch-cable"],
      },
    ],
  },
  {
    slug: "na-zakaz",
    id: "custom",
    title: "Под заказ",
    h1: "Оптоволокно нестандартной длины под заказ",
    metaTitle: "Оптоволокно под заказ — нестандартная длина катушки",
    description:
      "Волокно нестандартной длины: 25, 75, 100 км. Любой тип G.652/G.657. Изготовление под заказ за 14–21 день, OTDR-тест и документы.",
    keywords: ["оптоволокно под заказ", "нестандартная длина", "катушка 25 км", "катушка 100 км"],
    intro:
      "Нестандартные длины катушек и типы волокна — изготовим на заводе под ваш проект. Минимальный заказ от 1 катушки.",
    subcategories: [
      {
        slug: "nestandartnaya-dlina",
        title: "Нестандартная длина",
        h1: "Катушки оптоволокна нестандартной длины",
        metaTitle: "Катушка оптоволокна 25, 75, 100 км — под заказ",
        description:
          "Изготовление катушек оптоволокна 25, 75, 100 км и других длин. G.652, G.657. Срок 14–21 день, OTDR-отчёт, документы на партию.",
        keywords: ["катушка 25 км", "катушка 100 км", "нестандартная катушка", "волокно под заказ"],
        intro:
          "Закажите катушку нужной длины — от 10 км. Подберём тип волокна под проект и рассчитаем стоимость.",
        productIds: ["custom-length"],
      },
    ],
  },
  {
    slug: "optovolokonnye-cilindry",
    id: "cylinders",
    title: "Оптоволоконные цилиндры",
    h1: "Оптоволоконные цилиндры FO-0.25 — купить",
    metaTitle: "Оптоволоконные цилиндры — серия FO-0.25 | G.657A2",
    description:
      "Оптоволоконные цилиндры серии FO-0.25: волокно G.657A2, длина 1–90 км, затухание 0.185 дБ/км, диаметр 0.25 мм. Для полевых работ, дронов и высокогорных платформ. Цена по запросу.",
    keywords: [
      "оптоволоконный цилиндр",
      "FO-0.25",
      "G.657A2",
      "оптический трос",
      "цилиндр 1 км",
      "цилиндр 10 км",
    ],
    intro:
      "Компактные оптоволоконные цилиндры с волокном G.657A2 — готовое решение для быстрого развёртывания линии связи в полевых и экстремальных условиях. 15 моделей от 1 до 90 км. Цена по запросу.",
    subcategories: [
      {
        slug: "fo-0-25",
        title: "Серия FO-0.25",
        h1: "Оптоволоконные цилиндры серии FO-0.25",
        metaTitle: "Цилиндры FO-0.25 — G.657A2, 1–90 км | ELIZON",
        description:
          "Серия FO-0.25: оптоволоконные цилиндры 1, 2, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60 и 90 км. G.657A2, 0.185 дБ/км. Цена по запросу.",
        keywords: [
          "FO-0.25-1",
          "FO-0.25-15",
          "оптоволоконный цилиндр купить",
          "цилиндр G.657A2",
        ],
        intro:
          "15 моделей оптоволоконных цилиндров с волокном G.657A2. Компактный корпус ABS, защита от ЭМП, температура −40…+85°C. Скачайте спецификацию и запросите цену.",
        productIds: [
          "fo-0-25-1",
          "fo-0-25-2",
          "fo-0-25-3",
          "fo-0-25-4",
          "fo-0-25-5",
          "fo-0-25-6",
          "fo-0-25-7",
          "fo-0-25-8",
          "fo-0-25-9",
          "fo-0-25-10",
          "fo-0-25-11",
          "fo-0-25-12",
          "fo-0-25-13",
          "fo-0-25-14",
          "fo-0-25-15",
        ],
      },
    ],
  },
];

export function getCategoryBySlug(slug: string): CatalogCategoryNode | undefined {
  return catalogTree.find((c) => c.slug === slug);
}

export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): { category: CatalogCategoryNode; subcategory: CatalogSubcategoryNode } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const subcategory = category.subcategories.find((s) => s.slug === subcategorySlug);
  if (!subcategory) return undefined;
  return { category, subcategory };
}

export function getProductsForSubcategory(subcategory: CatalogSubcategoryNode): Product[] {
  return subcategory.productIds
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p));
}

export function getProductsForCategory(category: CatalogCategoryNode): Product[] {
  return category.subcategories.flatMap((sub) => getProductsForSubcategory(sub));
}

export function getProductCatalogPath(product: Product): string {
  for (const category of catalogTree) {
    for (const sub of category.subcategories) {
      if (sub.productIds.includes(product.id)) {
        return `${PRODUCTS_BASE}/${category.slug}/${sub.slug}/${product.slug}`;
      }
    }
  }
  return CATALOG_HUB_PATH;
}

export function resolveProductByPath(
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string
): { category: CatalogCategoryNode; subcategory: CatalogSubcategoryNode; product: Product } | undefined {
  const resolved = getSubcategoryBySlug(categorySlug, subcategorySlug);
  if (!resolved) return undefined;
  const product = getProductsForSubcategory(resolved.subcategory).find((p) => p.slug === productSlug);
  if (!product) return undefined;
  return { ...resolved, product };
}

export function getAllCategorySlugs(): string[] {
  return catalogTree.map((c) => c.slug);
}

export function getAllSubcategoryParams(): { category: string; subcategory: string }[] {
  return catalogTree.flatMap((c) =>
    c.subcategories.map((s) => ({ category: c.slug, subcategory: s.slug }))
  );
}

export function getAllProductParams(): { category: string; subcategory: string; product: string }[] {
  return catalogTree.flatMap((c) =>
    c.subcategories.flatMap((s) =>
      getProductsForSubcategory(s).map((p) => ({
        category: c.slug,
        subcategory: s.slug,
        product: p.slug,
      }))
    )
  );
}

export function buildCatalogBreadcrumbs(
  category?: CatalogCategoryNode,
  subcategory?: CatalogSubcategoryNode,
  product?: Product
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: CATALOG_HUB_PATH },
  ];

  if (category) {
    items.push({
      label: category.title,
      href: product || subcategory ? `${PRODUCTS_BASE}/${category.slug}` : undefined,
    });
  }

  if (category && subcategory) {
    items.push({
      label: subcategory.title,
      href: product ? `${PRODUCTS_BASE}/${category.slug}/${subcategory.slug}` : undefined,
    });
  }

  if (product) {
    items.push({ label: product.shortName });
  }

  return items;
}

export function getCatalogSiblings(
  categorySlug: string,
  subcategorySlug?: string
): CatalogSubcategoryNode[] | CatalogCategoryNode[] {
  if (!subcategorySlug) return catalogTree;
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories ?? [];
}