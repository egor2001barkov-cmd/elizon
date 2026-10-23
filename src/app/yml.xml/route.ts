import { catalogProducts, type Product } from "@/lib/data/products";
import { getProductCatalogPath } from "@/lib/data/catalog-tree";
import { SITE_NAME } from "@/lib/seo/metadata";

export const dynamic = "force-static";
export const revalidate = 86400;

const SITE = "https://elizon.ru";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const CATEGORIES: Record<string, { name: string; parent?: string }> = {
  fiber: { name: "Оптоволокно" },
  cylinders: { name: "Оптоволоконные цилиндры" },
  accessories: { name: "Комплектующие" },
  custom: { name: "Волокно под заказ", parent: "fiber" },
};

function ymlOffer(p: Product): string {
  const url = `${SITE}${getProductCatalogPath(p)}`;
  const id = escapeXml(p.id);
  const name = escapeXml(`${p.name} — катушка ${p.kmPerSpool} км`);
  const description = escapeXml(p.description.slice(0, 175));
  // Готовность к отправке честная: под заказ → available=false, на складе → true
  const available = p.inStock ? "true" : "false";

  const params = p.specs
    .slice(0, 6)
    .map((s) => `        <param name="${escapeXml(s.label)}">${escapeXml(s.value)}</param>`)
    .join("\n");

  const delivery = p.leadTimeDays
    ? `        <delivery>${Math.max(p.leadTimeDays.min, 2)}-${p.leadTimeDays.max + 3}</delivery>`
    : "        <delivery>17-24</delivery>";

  return `    <offer id="${id}" available="${available}">
      <name>${name}</name>
      <vendor>ELIZON</vendor>
      <url>${url}</url>
      <price>${p.price}</price>
      <currencyId>RUB</currencyId>
      <categoryId>${p.category}</categoryId>
      ${delivery}
      ${p.oldPrice ? `<oldprice>${p.oldPrice}</oldprice>\n      ` : ""}<description>${description}…</description>
      <sales_notes>Оплата по счёту, без НДС. Минимальный заказ — 1 катушка.</sales_notes>
${params}
    </offer>`;
}

/** YML-фид для Яндекс-товаров / Маркета: категории + офферы каталога. */
export function GET() {
  const cats = Object.entries(CATEGORIES)
    .map(
      ([id, c]) =>
        `    <category id="${id}"${c.parent ? ` parentId="${c.parent}"` : ""}>${c.name}</category>`
    )
    .join("\n");

  const offers = catalogProducts
    .filter((p) => !p.priceOnRequest)
    .map(ymlOffer)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${new Date().toISOString().slice(0, 19)}">
  <shop>
    <name>${escapeXml(SITE_NAME)}</name>
    <company>${escapeXml("ИП Баркова Инна Теймуразовна")}</company>
    <url>${SITE}</url>
    <email>support@elizon.ru</email>
    <currencies>
      <currency id="RUB" rate="1"/>
    </currencies>
    <categories>
${cats}
    </categories>
    <offers>
${offers}
    </offers>
  </shop>
</yml_catalog>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
