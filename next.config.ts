import type { NextConfig } from "next";
import {
  APPLICATION_LEGACY_REDIRECTS,
  ROUTES,
  SEO_ROUTE_REDIRECTS,
  SEO_ROUTE_REWRITES,
} from "./src/lib/seo/routes";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async rewrites() {
    return [...SEO_ROUTE_REWRITES];
  },
  async redirects() {
    return [
      ...SEO_ROUTE_REDIRECTS,
      ...APPLICATION_LEGACY_REDIRECTS.map((r) => ({
        source: r.source,
        destination: r.destination,
        permanent: true,
      })),
      {
        source: "/product-g657a2",
        destination: "/optovolokno/g657/g657a2",
        permanent: true,
      },
      {
        source: "/catalog/products/g657a2",
        destination: "/optovolokno/g657/g657a2",
        permanent: true,
      },
      {
        source: "/catalog/products",
        destination: ROUTES.catalog,
        permanent: true,
      },
      {
        source: "/regions/:gorod",
        destination: "/:gorod",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;