import Link from "next/link";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProseTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

interface ProseBlockProps {
  title?: string;
  paragraphs: string[];
  list?: string[];
  table?: ProseTable;
  delay?: number;
}

/** Инлайн-ссылки формата [текст](/внутренний-путь) внутри абзацев и ячеек таблиц. */
function renderWithLinks(p: string) {
  const parts = p.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m && m[2].startsWith("/") && !m[2].startsWith("//")) {
      return (
        <Link key={i} href={m[2]} className="text-[#6ECFFF] hover:underline">
          {m[1]}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ProseBlock({ title, paragraphs, list, table, delay = 0 }: ProseBlockProps) {
  return (
    <ScrollReveal delay={delay}>
      <section className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 md:p-8">
        {title && (
          <h2 className="font-display text-xl font-medium text-white md:text-2xl">
            {title}
          </h2>
        )}
        <div className={title ? "mt-4 space-y-4" : "space-y-4"}>
          {paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-[#8BA4BC] md:text-base">
              {renderWithLinks(p)}
            </p>
          ))}
          {table && table.rows.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#6ECFFF]/8">
                    {table.headers.map((h) => (
                      <th
                        key={h}
                        className="border-b border-white/10 px-3 py-2.5 font-medium text-white md:px-4"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, ri) => (
                    <tr key={ri} className="odd:bg-white/[0.02]">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="border-b border-white/6 px-3 py-2.5 align-top text-[#8BA4BC] md:px-4"
                        >
                          {renderWithLinks(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {table?.caption && (
            <p className="text-xs text-[#8BA4BC]/70">{table.caption}</p>
          )}
          {list && list.length > 0 && (
            <ul className="space-y-2">
              {list.map((item) => (
                <li
                  key={item.slice(0, 40)}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[#8BA4BC] md:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6ECFFF]" />
                  <span>{renderWithLinks(item)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </ScrollReveal>
  );
}
