import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProseBlockProps {
  title?: string;
  paragraphs: string[];
  list?: string[];
  delay?: number;
}

export function ProseBlock({ title, paragraphs, list, delay = 0 }: ProseBlockProps) {
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
              {p}
            </p>
          ))}
          {list && list.length > 0 && (
            <ul className="space-y-2">
              {list.map((item) => (
                <li
                  key={item.slice(0, 40)}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[#8BA4BC] md:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6ECFFF]" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </ScrollReveal>
  );
}