"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { LeadStatus } from "@/lib/data/leads-types";
import { LEAD_STATUS_LABELS } from "@/lib/data/leads-types";

export function OrderStatusSelect({
  id,
  status,
}: {
  id: string;
  status: LeadStatus;
}) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [busy, setBusy] = useState(false);

  const onChange = async (next: LeadStatus) => {
    setValue(next);
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error("fail");
      router.refresh();
    } catch {
      setValue(status);
    } finally {
      setBusy(false);
    }
  };

  return (
    <select
      value={value}
      disabled={busy}
      onChange={(e) => onChange(e.target.value as LeadStatus)}
      className="rounded-lg border border-white/15 bg-[#0a1628] px-2 py-1.5 text-xs text-white outline-none focus:border-[#6ECFFF]/50 disabled:opacity-50"
      aria-label="Статус заказа"
    >
      {(Object.keys(LEAD_STATUS_LABELS) as LeadStatus[]).map((s) => (
        <option key={s} value={s}>
          {LEAD_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
