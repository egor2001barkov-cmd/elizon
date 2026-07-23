import { NextResponse } from "next/server";
import { generateSpecPdf } from "@/lib/generateSpecPdf";

export async function GET() {
  try {
    const pdf = generateSpecPdf();

    return new Response(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="ELIZON-G657A2-specification.pdf"',
        "Cache-Control": "public, max-age=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Не удалось сгенерировать файл" }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ error: "Метод не поддерживается" }, { status: 405 });
}