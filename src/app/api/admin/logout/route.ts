import { NextResponse } from "next/server";
import { clearSessionCookieOptions } from "@/lib/admin/auth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  const cookie = clearSessionCookieOptions();
  res.cookies.set(cookie.name, cookie.value, {
    httpOnly: cookie.httpOnly,
    secure: cookie.secure,
    sameSite: cookie.sameSite,
    path: cookie.path,
    maxAge: cookie.maxAge,
  });
  return res;
}
