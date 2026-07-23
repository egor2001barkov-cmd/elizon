import { COMPANY } from "@/lib/constants";

function YandexLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="24" height="24" rx="6" fill="#FC3F1D" />
      <path
        d="M13.2 6H10.5C8.1 6 6.6 7.4 6.6 9.5C6.6 11.1 7.5 12.2 9.1 12.8L6.3 17.5H8.5L11 13.3H12.1V17.5H14.2V6H13.2ZM10.8 11.4C9.7 11.4 9 10.8 9 9.6C9 8.4 9.7 7.8 10.8 7.8H12.1V11.4H10.8Z"
        fill="white"
      />
    </svg>
  );
}

export function YandexRatingBadge() {
  const { rating, maxRating, url } = COMPANY.yandexMaps;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-[#0A2540]/90 px-3.5 py-2.5 shadow-lg backdrop-blur-sm transition-colors hover:border-[#FC3F1D]/40"
      aria-label={`Рейтинг ${rating} из ${maxRating} на Яндекс Картах`}
    >
      <YandexLogo className="h-8 w-8 shrink-0" />
      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-lg font-medium leading-none text-white">
            {rating}
          </span>
          <span className="text-sm text-[#8BA4BC]">/ {maxRating}</span>
        </div>
        <p className="mt-0.5 text-xs text-[#8BA4BC]">Яндекс Карты</p>
      </div>
    </a>
  );
}