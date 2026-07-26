"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Mode =
  | { mode: "single"; id: string; label?: string }
  | { mode: "many"; ids: string[]; label?: string };

/**
 * X button to permanently delete a lead (message/order) or a batch (client history).
 * Asks for confirmation before calling the admin API.
 */
export function DeleteLeadButton(props: Mode & { className?: string; compact?: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const label =
    props.label ||
    (props.mode === "many"
      ? `Удалить все обращения (${props.ids.length})`
      : "Удалить");

  const run = async () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setBusy(true);
    try {
      if (props.mode === "single") {
        const res = await fetch(`/api/admin/leads/${encodeURIComponent(props.id)}`, {
          method: "DELETE",
          credentials: "same-origin",
        });
        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(json.error || "Не удалось удалить");
        }
      } else {
        const res = await fetch("/api/admin/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ action: "delete_many", ids: props.ids }),
        });
        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(json.error || "Не удалось удалить");
        }
      }
      setConfirming(false);
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Ошибка удаления");
      setConfirming(false);
    } finally {
      setBusy(false);
    }
  };

  const cancel = () => setConfirming(false);

  if (confirming) {
    return (
      <div
        className={`inline-flex flex-wrap items-center gap-2 ${props.className ?? ""}`}
        role="group"
        aria-label="Подтверждение удаления"
      >
        <span className="text-xs text-[#ff8a8a]">Удалить навсегда?</span>
        <button
          type="button"
          disabled={busy}
          onClick={run}
          className="rounded-lg bg-[#ff4d4d]/20 px-2.5 py-1 text-xs text-[#ff8a8a] hover:bg-[#ff4d4d]/30 disabled:opacity-50"
        >
          {busy ? "…" : "Да"}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={cancel}
          className="rounded-lg border border-white/15 px-2.5 py-1 text-xs text-[#8BA4BC] hover:text-white disabled:opacity-50"
        >
          Нет
        </button>
      </div>
    );
  }

  if (props.compact) {
    return (
      <button
        type="button"
        disabled={busy}
        onClick={run}
        title={label}
        aria-label={label}
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[#8BA4BC] transition-colors hover:border-[#ff8a8a]/50 hover:bg-[#ff4d4d]/10 hover:text-[#ff8a8a] disabled:opacity-50 ${props.className ?? ""}`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
          className="pointer-events-none"
        >
          <path
            d="M3 3l8 8M11 3L3 11"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={run}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-[#8BA4BC] transition-colors hover:border-[#ff8a8a]/50 hover:bg-[#ff4d4d]/10 hover:text-[#ff8a8a] disabled:opacity-50 ${props.className ?? ""}`}
    >
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d="M3 3l8 8M11 3L3 11"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
      {label}
    </button>
  );
}
