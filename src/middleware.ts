import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveCatalogInternalPath } from "@/lib/seo/catalog-routes";
import { isBlockedPath } from "@/lib/security/blocked-paths";
import { LIMITS } from "@/lib/security/constants";
import { getClientIp } from "@/lib/security/get-client-ip";
import { applySecurityHeaders } from "@/lib/security/headers";
import { checkRateLimit } from "@/lib/security/rate-limit";

function isAdminPath(pathname: string): boolean {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/api/admin/")
  );
}

function sealAdmin(response: NextResponse): void {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  response.headers.set("Cache-Control", "no-store, private, max-age=0");
  response.headers.set("Pragma", "no-cache");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const admin = isAdminPath(pathname);

  if (isBlockedPath(pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  if (pathname.startsWith("/api/")) {
    // Spec PDF + admin APIs that use session auth may allow GET
    const allowGet =
      pathname.startsWith("/api/spec") ||
      pathname.startsWith("/api/admin/session") ||
      pathname.startsWith("/api/admin/cases") ||
      pathname.startsWith("/api/admin/leads");
    if (
      (request.method === "GET" || request.method === "HEAD") &&
      !allowGet
    ) {
      const response = NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
      applySecurityHeaders(response, request);
      if (admin) sealAdmin(response);
      return response;
    }

    const ip = getClientIp(request);
    const limit = checkRateLimit(ip, pathname);

    if (!limit.ok) {
      const response = NextResponse.json(
        { error: "Слишком много запросов. Подождите и попробуйте снова." },
        { status: 429 }
      );
      response.headers.set("Retry-After", String(limit.retryAfter));
      applySecurityHeaders(response, request);
      if (admin) sealAdmin(response);
      return response;
    }

    if (request.method === "POST" || request.method === "PUT" || request.method === "PATCH") {
      const contentLength = request.headers.get("content-length");
      if (contentLength && parseInt(contentLength, 10) > LIMITS.maxBodyBytes) {
        const response = NextResponse.json(
          { error: "Слишком большой запрос" },
          { status: 413 }
        );
        applySecurityHeaders(response, request);
        if (admin) sealAdmin(response);
        return response;
      }
    }
  }

  const catalogInternalPath = resolveCatalogInternalPath(pathname);
  if (catalogInternalPath && catalogInternalPath !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = catalogInternalPath;
    const response = NextResponse.rewrite(url);
    applySecurityHeaders(response, request);
    return response;
  }

  const response = NextResponse.next();
  applySecurityHeaders(response, request);
  if (admin) sealAdmin(response);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|favicon\\.svg|favicon-.*\\.png|apple-touch-icon\\.png|android-chrome-.*\\.png|logo\\.png|og-image\\.(svg|png)|images|site\\.webmanifest|robots\\.txt|sitemap\\.xml|yandex_.*\\.html).*)",
  ],
};
