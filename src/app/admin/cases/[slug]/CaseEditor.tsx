"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CaseStudy, CaseStudySection } from "@/lib/data/cases-defaults";

export function CaseEditor({ initial }: { initial: CaseStudy }) {
  const router = useRouter();
  const [data, setData] = useState<CaseStudy>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  const setField = <K extends keyof CaseStudy>(key: K, value: CaseStudy[K]) => {
    setData((d) => ({ ...d, [key]: value }));
  };

  const setSection = (idx: number, patch: Partial<CaseStudySection>) => {
    setData((d) => {
      const sections = d.sections.map((s, i) => (i === idx ? { ...s, ...patch } : s));
      return { ...d, sections };
    });
  };

  const setParagraph = (sIdx: number, pIdx: number, value: string) => {
    setData((d) => {
      const sections = d.sections.map((s, i) => {
        if (i !== sIdx) return s;
        const paragraphs = s.paragraphs.map((p, j) => (j === pIdx ? value : p));
        return { ...s, paragraphs };
      });
      return { ...d, sections };
    });
  };

  const addParagraph = (sIdx: number) => {
    setData((d) => {
      const sections = d.sections.map((s, i) =>
        i === sIdx ? { ...s, paragraphs: [...s.paragraphs, ""] } : s
      );
      return { ...d, sections };
    });
  };

  const addSection = () => {
    setData((d) => ({
      ...d,
      sections: [...d.sections, { title: "Новый раздел", paragraphs: [""] }],
    }));
  };

  const save = async () => {
    setStatus("saving");
    setError("");
    try {
      const res = await fetch(`/api/admin/cases/${data.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ case: data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Ошибка сохранения");
      setStatus("ok");
      if (json.case) setData(json.case);
      router.refresh();
      setTimeout(() => setStatus("idle"), 2000);
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Ошибка");
    }
  };

  const input =
    "mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#6ECFFF]/50";
  const label = "block text-sm text-[#8BA4BC]";

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/cases" className="text-sm text-[#6ECFFF] hover:underline">
            ← Все кейсы
          </Link>
          <h1 className="mt-2 font-display text-2xl text-white">Редактирование кейса</h1>
          <p className="text-xs text-[#8BA4BC]">/cases/{data.slug}</p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={status === "saving"}
          className="rounded-xl bg-[#4DB8E8] px-5 py-2.5 text-sm font-medium text-[#071e33] disabled:opacity-60"
        >
          {status === "saving" ? "Сохранение…" : "Сохранить"}
        </button>
      </div>

      {status === "ok" ? (
        <p className="mb-4 text-sm text-emerald-400">Сохранено. Обновите публичную страницу кейса.</p>
      ) : null}
      {error ? <p className="mb-4 text-sm text-[#ff8a8a]">{error}</p> : null}

      <div className="space-y-5">
        <label className={label}>
          Заголовок (H1)
          <input
            className={input}
            value={data.title}
            onChange={(e) => setField("title", e.target.value)}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Клиент
            <input
              className={input}
              value={data.client}
              onChange={(e) => setField("client", e.target.value)}
            />
          </label>
          <label className={label}>
            Локация
            <input
              className={input}
              value={data.location}
              onChange={(e) => setField("location", e.target.value)}
            />
          </label>
          <label className={label}>
            Объём
            <input
              className={input}
              value={data.volume}
              onChange={(e) => setField("volume", e.target.value)}
            />
          </label>
          <label className={label}>
            Результат (кратко)
            <input
              className={input}
              value={data.result}
              onChange={(e) => setField("result", e.target.value)}
            />
          </label>
        </div>

        <label className={label}>
          Краткое описание (карточка)
          <textarea
            className={`${input} min-h-[80px]`}
            value={data.description}
            onChange={(e) => setField("description", e.target.value)}
          />
        </label>

        <label className={label}>
          Вступление
          <textarea
            className={`${input} min-h-[120px]`}
            value={data.intro}
            onChange={(e) => setField("intro", e.target.value)}
          />
        </label>

        <label className={label}>
          Теги (через запятую)
          <input
            className={input}
            value={data.tags.join(", ")}
            onChange={(e) =>
              setField(
                "tags",
                e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
          />
        </label>

        <label className={label}>
          Highlights (каждый с новой строки)
          <textarea
            className={`${input} min-h-[80px]`}
            value={data.highlights.join("\n")}
            onChange={(e) =>
              setField(
                "highlights",
                e.target.value
                  .split("\n")
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
          />
        </label>

        <fieldset className="rounded-2xl border border-white/10 p-4">
          <legend className="px-1 text-sm text-[#6ECFFF]">До / после</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["jointsBefore", "Стыки — было"],
                ["jointsAfter", "Стыки — стало"],
                ["daysBefore", "Сроки — было"],
                ["daysAfter", "Сроки — стало"],
              ] as const
            ).map(([key, lab]) => (
              <label key={key} className={label}>
                {lab}
                <input
                  className={input}
                  value={data.beforeAfter?.[key] ?? ""}
                  onChange={(e) =>
                    setField("beforeAfter", {
                      jointsBefore: data.beforeAfter?.jointsBefore ?? "",
                      jointsAfter: data.beforeAfter?.jointsAfter ?? "",
                      daysBefore: data.beforeAfter?.daysBefore ?? "",
                      daysAfter: data.beforeAfter?.daysAfter ?? "",
                      note: data.beforeAfter?.note,
                      [key]: e.target.value,
                    })
                  }
                />
              </label>
            ))}
            <label className={`${label} sm:col-span-2`}>
              Примечание
              <input
                className={input}
                value={data.beforeAfter?.note ?? ""}
                onChange={(e) =>
                  setField("beforeAfter", {
                    jointsBefore: data.beforeAfter?.jointsBefore ?? "",
                    jointsAfter: data.beforeAfter?.jointsAfter ?? "",
                    daysBefore: data.beforeAfter?.daysBefore ?? "",
                    daysAfter: data.beforeAfter?.daysAfter ?? "",
                    note: e.target.value,
                  })
                }
              />
            </label>
          </div>
        </fieldset>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Разделы текста</h2>
            <button
              type="button"
              onClick={addSection}
              className="text-sm text-[#6ECFFF] hover:underline"
            >
              + Раздел
            </button>
          </div>
          {data.sections.map((sec, sIdx) => (
            <div key={sIdx} className="rounded-2xl border border-white/10 p-4">
              <label className={label}>
                Заголовок раздела
                <input
                  className={input}
                  value={sec.title}
                  onChange={(e) => setSection(sIdx, { title: e.target.value })}
                />
              </label>
              {sec.paragraphs.map((p, pIdx) => (
                <label key={pIdx} className={`${label} mt-3`}>
                  Абзац {pIdx + 1}
                  <textarea
                    className={`${input} min-h-[100px]`}
                    value={p}
                    onChange={(e) => setParagraph(sIdx, pIdx, e.target.value)}
                  />
                </label>
              ))}
              <button
                type="button"
                onClick={() => addParagraph(sIdx)}
                className="mt-2 text-xs text-[#6ECFFF] hover:underline"
              >
                + Абзац
              </button>
            </div>
          ))}
        </div>

        <label className={label}>
          Заключение
          <textarea
            className={`${input} min-h-[100px]`}
            value={data.conclusion}
            onChange={(e) => setField("conclusion", e.target.value)}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Путь к картинке
            <input
              className={input}
              value={data.image}
              onChange={(e) => setField("image", e.target.value)}
            />
          </label>
          <label className={label}>
            Alt картинки
            <input
              className={input}
              value={data.imageAlt}
              onChange={(e) => setField("imageAlt", e.target.value)}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={save}
          disabled={status === "saving"}
          className="w-full rounded-xl bg-[#4DB8E8] py-3 text-sm font-medium text-[#071e33] disabled:opacity-60 sm:w-auto sm:px-8"
        >
          {status === "saving" ? "Сохранение…" : "Сохранить изменения"}
        </button>
      </div>
    </div>
  );
}
