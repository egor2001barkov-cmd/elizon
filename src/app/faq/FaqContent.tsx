"use client";

import Link from "next/link";
import { faqItems } from "@/lib/data/faq";
import { ContentPageShell } from "@/components/content/ContentPageShell";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { CtaBanner } from "@/components/content/CtaBanner";
import { ROUTES } from "@/lib/seo/routes";

export function FaqContent() {
  return (
    <ContentPageShell
      breadcrumbPage="faq"
      title="Частые вопросы об оптоволокне ELIZON"
      subtitle="15 ответов на вопросы о ценах, сроках, доставке, документах и совместимости волокна."
    >
      <FaqAccordion items={faqItems} />
      <p className="text-sm text-[#8BA4BC]">
        Не нашли ответ?{" "}
        <Link href={`${ROUTES.contacts}#form`} className="text-[#6ECFFF] hover:underline">
          Напишите нам
        </Link>{" "}
        или смотрите раздел{" "}
        <Link href={ROUTES.delivery} className="text-[#6ECFFF] hover:underline">
          Доставка и оплата
        </Link>
        .
      </p>
      <CtaBanner />
    </ContentPageShell>
  );
}