import { isCatalogItemPath } from "@/lib/seo/catalog-routes";
import { ROUTES } from "@/lib/seo/routes";

const ABOUT_PATHS = [
  ROUTES.about,
  ROUTES.whyUs,
  ROUTES.advantages,
  ROUTES.services,
  ROUTES.contacts,
] as const;

export function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === ROUTES.catalog) {
    return pathname === ROUTES.catalog || isCatalogItemPath(pathname);
  }
  if (href === ROUTES.applications) {
    return (
      pathname === ROUTES.applications || pathname.startsWith(`${ROUTES.applications}/`)
    );
  }
  if (href === ROUTES.blog) {
    return pathname === ROUTES.blog || pathname.startsWith(`${ROUTES.blog}/`);
  }
  if (href === ROUTES.about) {
    return ABOUT_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isAboutSectionPath(pathname: string): boolean {
  return ABOUT_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}