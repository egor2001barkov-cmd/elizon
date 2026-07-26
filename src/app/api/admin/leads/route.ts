import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { loadLeads, markAllLeadsRead } from "@/lib/data/leads-store";
import { isAllowedOrigin } from "@/lib/security/origin";

export const dynamic = "force-dynamic";

/**
 * Admin-only leads list. Never expose without session.
 * Prefer server components for pages; this API is for mark-all / tools only.
 */
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const leads = await loadLeads();
  return NextResponse.json(
    { leads },
    {
      headers: {
        "Cache-Control": "no-store, private",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    }
  );
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = await request.json();
    if (body.action === "mark_all_read") {
      const count = await markAllLeadsRead();
      return NextResponse.json({ success: true, count });
    }
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
