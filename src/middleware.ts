import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveCatalogInternalPath } from "@/lib/seo/catalog-routes";
import { isBlockedPath } from "@/lib/security/blocked-paths";
import { LIMITS } from "@/lib/security/constants";
import { getClientIp } from "@/lib/security/get-client-ip";
import { applySecurityHeaders } from "@/lib/security/headers";
import { checkRateLimit } from "@/lib/security/rate-limit";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isBlockedPath(pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  if (pathname.startsWith("/api/")) {
    const ip = getClientIp(request);
    const limit = checkRateLimit(ip, pathname);

    if (!limit.ok) {
      const response = NextResponse.json(
        { error: "Слишком много запросов. Подождите и попробуйте снова." },
        { status: 429 }
      );
      response.headers.set("Retry-After", String(limit.retryAfter));
      applySecurityHeaders(response, request);
      return response;
    }

    if (request.method === "POST") {
      const contentLength = request.headers.get("content-length");
      if (contentLength && parseInt(contentLength, 10) > LIMITS.maxBodyBytes) {
        const response = NextResponse.json(
          { error: "Слишком большой запрос" },
          { status: 413 }
        );
        applySecurityHeaders(response, request);
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
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.svg|og-image\\.svg|images|robots\\.txt|sitemap\\.xml).*)",
  ],
};