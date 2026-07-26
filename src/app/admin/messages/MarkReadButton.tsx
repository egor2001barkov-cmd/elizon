"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MarkReadButton({
  id,
  read,
  all,
}: {
  id?: string;
  read?: boolean;
  all?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    try {
      if (all) {
        await fetch("/api/admin/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ action: "mark_all_read" }),
        });
      } else if (id) {
        await fetch(`/api/admin/leads/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ read: !read }),
        });
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  if (all) {
    return (
      <button
        type="button"
        disabled={busy}
        onClick={run}
        className="rounded-xl border border-white/15 px-3 py-2 text-xs text-[#8BA4BC] hover:border-[#6ECFFF]/40 hover:text-white disabled:opacity-50"
      >
        {busy ? "…" : "Отметить все прочитанными"}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={run}
      className="text-xs text-[#6ECFFF] hover:underline disabled:opacity-50"
    >
      {busy ? "…" : read ? "Непрочитанное" : "Прочитано"}
    </button>
  );
}
