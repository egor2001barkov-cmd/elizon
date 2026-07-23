"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const advantages = [
  {
    icon: "↯",
    title: "Максимальная гибкость",
    text: "Радиус изгиба 7,5 мм — одно из лучших значений в классе. Удобно в лотках, колодцах и на вводе в здание.",
  },
  {
    icon: "◎",
    title: "Стабильность на объекте",
    text: "Плотная прокладка, перепады температуры, вибрация оборудования — характеристики остаются в норме.",
  },
  {
    icon: "⬡",
    title: "Сети доступа и FTTH",
    text: "Маленький радиус изгиба упрощает монтаж в подъездах, на техэтажах и в ограниченных каналах.",
  },
  {
    icon: "→",
    title: "Надёжность на дистанции",
    text: "Низкое затухание в O, C, L — сигнал держится на длинных магистральных участках.",
  },
  {
    icon: "⊕",
    title: "Меньше сварок",
    text: "50,4 км на катушке — на типичном объекте это минус несколько стыков и часов работы бригады.",
  },
];

export function AdvantagesSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          title="Почему именно G.657.A2"
          subtitle="Пять вещей, которые реально отличают это волокно от обычного G.652."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.07}>
              <GlassCard className="h-full">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00D4FF]/10 text-lg text-[#00D4FF]">
                  {item.icon}
                </span>
                <h3 className="mt-4 text-lg font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">{item.text}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}