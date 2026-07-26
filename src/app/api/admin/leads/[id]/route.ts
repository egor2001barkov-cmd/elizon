import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import {
  loadLeads,
  markLeadRead,
  updateLeadStatus,
  type LeadStatus,
} from "@/lib/data/leads-store";
import { isAllowedOrigin } from "@/lib/security/origin";

export const dynamic = "force-dynamic";

interface Ctx {
  params: Promise<{ id: string }>;
}

const STATUSES: LeadStatus[] = ["new", "in_progress", "done"];

/** Never leak PII without session — even error bodies stay generic. */
function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(_req: Request, ctx: Ctx) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  const { id } = await ctx.params;
  // Prevent path traversal / injection via id
  if (!/^ld_[a-z0-9]+_[a-f0-9]+$/i.test(id) && !/^[a-zA-Z0-9_-]{6,80}$/.test(id)) {
    return NextResponse.json({ error: "Не найден" }, { status: 404 });
  }

  const all = await loadLeads();
  const lead = all.find((l) => l.id === id);
  if (!lead) return NextResponse.json({ error: "Не найден" }, { status: 404 });
  return NextResponse.json(
    { lead },
    {
      headers: {
        "Cache-Control": "no-store, private",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    }
  );
}

export async function PATCH(request: Request, ctx: Ctx) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  // Block cross-site state changes (CSRF-style)
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;
  try {
    const body = await request.json();

    if (typeof body.read === "boolean" && body.status === undefined) {
      const updated = await markLeadRead(id, body.read);
      if (!updated) return NextResponse.json({ error: "Не найден" }, { status: 404 });
      return NextResponse.json({ success: true, lead: updated });
    }

    if (body.status !== undefined) {
      const status = body.status as LeadStatus;
      if (!STATUSES.includes(status)) {
        return NextResponse.json({ error: "Некорректный статус" }, { status: 400 });
      }
      const note = typeof body.note === "string" ? body.note : undefined;
      const updated = await updateLeadStatus(id, status, note);
      if (!updated) return NextResponse.json({ error: "Не найден" }, { status: 404 });
      if (typeof body.read === "boolean") {
        await markLeadRead(id, body.read);
      }
      return NextResponse.json({ success: true, lead: updated });
    }

    return NextResponse.json({ error: "Нет изменений" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
