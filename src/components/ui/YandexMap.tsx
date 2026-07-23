import { buildYandexMapEmbedUrl, COMPANY } from "@/lib/constants";
import { YandexRatingBadge } from "@/components/ui/YandexRatingBadge";

export function YandexMap() {
  const { lat, lon } = COMPANY.coordinates;
  const mapSrc = buildYandexMapEmbedUrl(lat, lon);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#8BA4BC]">{COMPANY.address}</p>
        <YandexRatingBadge />
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10">
        <iframe
          src={mapSrc}
          width="100%"
          height="300"
          allowFullScreen
          style={{ border: 0, display: "block" }}
          title={`Карта — ELIZON, ${COMPANY.address}`}
          loading="lazy"
        />
      </div>
    </div>
  );
}