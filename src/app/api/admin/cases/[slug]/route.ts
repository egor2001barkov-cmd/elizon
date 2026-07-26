import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { getCaseBySlug, updateCase } from "@/lib/data/cases-store";

export const dynamic = "force-dynamic";

interface Ctx {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, ctx: Ctx) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await ctx.params;
  const item = await getCaseBySlug(slug);
  if (!item) return NextResponse.json({ error: "Не найден" }, { status: 404 });
  return NextResponse.json({ case: item });
}

export async function PUT(request: Request, ctx: Ctx) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await ctx.params;
  try {
    const body = await request.json();
    const patch = body.case ?? body;
    const updated = await updateCase(slug, patch);
    return NextResponse.json({ success: true, case: updated });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Ошибка" },
      { status: 400 }
    );
  }
}
