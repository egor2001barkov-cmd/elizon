import { COMPANY } from "@/lib/constants";
import { flagshipProduct } from "@/lib/data/products";

function escapePdf(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

export function generateSpecPdf(): Uint8Array {
  const product = flagshipProduct;
  const lines = [
    "ELIZON - Technical Specification",
    "",
    product.name,
    `Price: ${product.price.toLocaleString("ru-RU")} RUB per ${product.unit}`,
    "",
    "SPECIFICATIONS:",
    ...product.specs.map((s) => `${s.label}: ${s.value}`),
    "",
    "HIGHLIGHTS:",
    ...product.highlights.map((h) => `- ${h}`),
    "",
    `Contact: ${COMPANY.email} | ${COMPANY.phone}`,
    "www.elizon.ru",
  ];

  let y = 780;
  const fontSize = 11;
  const streamParts: string[] = ["BT", `/F1 ${fontSize} Tf`];

  for (const line of lines) {
    if (line === "") {
      y -= 14;
      continue;
    }
    const isHeader = line === lines[0] || line === product.name;
    const size = isHeader ? 14 : line.startsWith("SPEC") || line.startsWith("HIGH") ? 12 : fontSize;
    if (isHeader) streamParts.push(`/F1 ${size} Tf`);
    streamParts.push(`50 ${y} Td (${escapePdf(line)}) Tj`);
    streamParts.push(`0 -${isHeader ? 20 : 16} Td`);
    if (isHeader) streamParts.push(`/F1 ${fontSize} Tf`);
    y -= isHeader ? 20 : 16;
  }

  streamParts.push("ET");
  const stream = streamParts.join("\n");
  const streamLen = new TextEncoder().encode(stream).length;

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n",
    `4 0 obj\n<< /Length ${streamLen} >>\nstream\n${stream}\nendstream\nendobj\n`,
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];

  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (const offset of offsets) {
    pdf += `${offset.toString().padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}