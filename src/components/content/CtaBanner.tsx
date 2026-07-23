import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/seo/routes";

interface CtaBannerProps {
  title?: string;
  text?: string;
}

export function CtaBanner({
  title = "Запросите цену на G.657.A2",
  text = "Менеджер ответит за 15 минут в рабочее время. Выставим счёт на организацию.",
}: CtaBannerProps) {
  return (
    <div className="rounded-2xl border border-[#6ECFFF]/20 bg-gradient-to-br from-[#6ECFFF]/10 to-transparent p-8 text-center">
      <h2 className="font-display text-xl font-medium text-white md:text-2xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm text-[#8BA4BC] md:text-base">{text}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Button href={`${ROUTES.contacts}#form`}>Запросить цену</Button>
        <Button href="/optovolokno/g657/g657a2" variant="secondary">
          G.657.A2 в каталоге
        </Button>
      </div>
    </div>
  );
}