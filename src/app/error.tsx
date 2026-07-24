"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center"
      style={{ backgroundColor: "#071e33", color: "#ffffff" }}
    >
      <h1 className="font-display text-2xl font-medium text-white">
        Не удалось загрузить страницу
      </h1>
      <p className="mt-3 max-w-md text-sm text-[#8BA4BC]">
        Обновите страницу. Если ошибка повторяется — напишите на support@elizon.ru
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 min-h-[44px] rounded-xl bg-[#4DB8E8] px-6 text-sm font-medium text-[#071e33]"
      >
        Попробовать снова
      </button>
    </div>
  );
}
