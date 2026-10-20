#!/usr/bin/env node
/**
 * Пинг IndexNow (Яндекс + Bing) — сообщает поисковикам об изменённых URL.
 *
 *   node scripts/ping-indexnow.mjs https://elizon.ru/sitemap.xml
 *   node scripts/ping-indexnow.mjs https://elizon.ru/ https://elizon.ru/blog
 *
 * Ключ лежит в public/indexnow-<key>.txt; сюда он передаётся переменной
 * INDEXNOW_KEY (или берётся единственный файл public/indexnow-*.txt).
 * Отправляются только URL хоста elizon.ru по https.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const HOST = "elizon.ru";
const args = process.argv.slice(2);

function findKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY;
  const pub = join(process.cwd(), "public");
  const f = readdirSync(pub).find((n) => /^indexnow-[0-9a-f]{16,}\.txt$/.test(n));
  if (!f) throw new Error("IndexNow-ключ не найден в public/");
  return readFileSync(join(pub, f), "utf8").trim();
}

function safeUrls(list) {
  return list.filter((u) => {
    try {
      const url = new URL(u);
      return url.protocol === "https:" && url.hostname === HOST;
    } catch {
      return false;
    }
  });
}

async function fromSitemap(sitemapUrl) {
  const xml = await (await fetch(sitemapUrl)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const key = findKey();
  let urls = [];
  for (const a of args) {
    if (a.endsWith(".xml")) urls.push(...(await fromSitemap(a)));
    else urls.push(a);
  }
  urls = safeUrls([...new Set(urls)]);
  if (urls.length === 0) {
    console.error("Нет валидных URL хоста " + HOST);
    process.exit(1);
  }

  const body = {
    host: HOST,
    key,
    keyLocation: `https://${HOST}/indexnow-${key}.txt`,
    urlList: urls.slice(0, 10000),
  };

  for (const endpoint of ["api.indexnow.org", "yandex.com/indexnow", "bing.com/indexnow"]) {
    try {
      const res = await fetch(`https://${endpoint}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });
      console.log(`${endpoint}: HTTP ${res.status} (${urls.length} URL)`);
    } catch (e) {
      console.error(`${endpoint}: ошибка ${String(e).slice(0, 80)}`);
    }
  }
}

main().catch((e) => {
  console.error(String(e));
  process.exit(1);
});
