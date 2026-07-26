"use client";

/**
 * Встраиваемый обзор Метрики.
 * Полные отчёты Яндекс отдаёт только владельцу счётчика (сессия yandex.ru).
 */
export function MetrikaEmbed({ counterId }: { counterId: string }) {
  const overview = `https://metrika.yandex.ru/overview?id=${counterId}`;
  const dashboard = `https://metrika.yandex.ru/dashboard?id=${counterId}`;

  return (
    <div className="mt-8 space-y-6">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-sm text-[#8BA4BC]">Обзор · счётчик {counterId}</p>
          <a
            href={overview}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#6ECFFF] hover:underline"
          >
            На весь экран
          </a>
        </div>
        <div className="relative h-[min(70vh,720px)] w-full bg-[#071018]">
          <iframe
            title="Яндекс.Метрика — обзор"
            src={overview}
            className="h-full w-full border-0"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-sm text-[#8BA4BC]">Дашборд</p>
          <a
            href={dashboard}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#6ECFFF] hover:underline"
          >
            На весь экран
          </a>
        </div>
        <div className="relative h-[min(60vh,560px)] w-full bg-[#071018]">
          <iframe
            title="Яндекс.Метрика — дашборд"
            src={dashboard}
            className="h-full w-full border-0"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>

      <p className="text-xs text-[#8BA4BC]">
        Если iframe пустой — Яндекс блокирует встраивание; пользуйтесь кнопкой «Открыть кабинет
        Метрики». Счётчик на сайте при этом продолжает работать для всех посетителей;{" "}
        <strong className="text-white/80">эта страница видна только после входа в /admin</strong>.
      </p>
    </div>
  );
}
