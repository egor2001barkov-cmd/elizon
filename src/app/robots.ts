import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/seo/routes";

const SITE = "https://elizon.ru";

const DISALLOW = [
  ROUTES.cart,
  `${ROUTES.cart}/`,
  ROUTES.payment,
  "/api/",
  "/api/*",
  "/admin",
  "/admin/",
  "/admin/*",
  "/data/",
  "/data/*",
  // служебное / утечки конфигов (на всякий случай)
  "/.env",
  "/.git",
  "/package.json",
  "/node_modules/",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/images/"],
        disallow: DISALLOW,
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "YandexImages",
        allow: ["/", "/images/"],
        disallow: DISALLOW,
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}