import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { loadCases, saveCases, sanitizeCase } from "@/lib/data/cases-store";
import type { CaseStudy } from "@/lib/data/cases-defaults";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cases = await loadCases();
  return NextResponse.json({ cases });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!Array.isArray(body.cases)) {
      return NextResponse.json({ error: "Ожидается { cases: [] }" }, { status: 400 });
    }
    const list = body.cases
      .map((c: unknown) => sanitizeCase(c))
      .filter((x: CaseStudy | null): x is CaseStudy => Boolean(x));
    await saveCases(list);
    return NextResponse.json({ success: true, count: list.length });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Ошибка сохранения" },
      { status: 500 }
    );
  }
}
