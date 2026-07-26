import { NextResponse } from "next/server";
import {
  createSessionToken,
  sessionCookieOptions,
  verifyCredentials,
} from "@/lib/admin/auth";
import { isAllowedOrigin } from "@/lib/security/origin";
import { LIMITS } from "@/lib/security/constants";

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > LIMITS.maxBodyBytes) {
    return NextResponse.json({ error: "Too large" }, { status: 413 });
  }

  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";

    // Constant-time-ish delay to slow brute force
    const ok = verifyCredentials(email, password);
    await new Promise((r) => setTimeout(r, 400 + Math.floor(Math.random() * 200)));

    if (!ok) {
      return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
    }

    const token = createSessionToken(email.trim());
    const res = NextResponse.json({ success: true });
    const cookie = sessionCookieOptions(token);
    res.cookies.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite,
      path: cookie.path,
      maxAge: cookie.maxAge,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Ошибка входа" }, { status: 500 });
  }
}
