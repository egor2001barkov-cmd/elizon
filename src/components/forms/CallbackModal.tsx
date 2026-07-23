"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FormSecurityFields } from "@/components/forms/FormSecurityFields";
import { useFormSecurity } from "@/components/forms/useFormSecurity";

interface CallbackModalProps {
  open: boolean;
  onClose: () => void;
}

export function CallbackModal({ open, onClose }: CallbackModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { honeypot, setHoneypot, securityPayload } = useFormSecurity();

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#8BA4BC]/50 outline-none transition-colors focus:border-[#00D4FF]/50 focus:bg-white/[0.06]";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, type: "callback", ...securityPayload }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка отправки");
      }

      setStatus("success");
      setName("");
      setPhone("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Что-то пошло не так");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setErrorMsg("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 340 }}
            className="fixed left-1/2 top-1/2 z-[90] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#00D4FF]/15 bg-[#0A2540]/95 p-6 shadow-[0_0_60px_rgba(0,212,255,0.12)] backdrop-blur-xl md:p-8"
            role="dialog"
            aria-labelledby="callback-title"
          >
            {status === "success" ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00D4FF]/15 text-2xl text-[#00D4FF]">
                  ✓
                </div>
                <h2 id="callback-title" className="text-xl font-medium text-white">
                  Приняли заявку
                </h2>
                <p className="mt-2 text-sm text-[#8BA4BC]">
                  Перезвоним в течение 15 минут в рабочее время.
                </p>
                <Button className="mt-6 w-full" onClick={handleClose}>
                  Закрыть
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 id="callback-title" className="font-display text-xl font-medium text-white">
                    Перезвоните мне
                  </h2>
                  <p className="mt-2 text-sm text-[#8BA4BC]">
                    Оставьте имя и телефон — менеджер свяжется с вами.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="relative space-y-4">
                  <FormSecurityFields value={honeypot} onChange={setHoneypot} />
                  <div>
                    <label htmlFor="cb-name" className="mb-1.5 block text-sm text-[#8BA4BC]">
                      Имя *
                    </label>
                    <input
                      id="cb-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      placeholder="Как к вам обращаться"
                    />
                  </div>
                  <div>
                    <label htmlFor="cb-phone" className="mb-1.5 block text-sm text-[#8BA4BC]">
                      Телефон *
                    </label>
                    <input
                      id="cb-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-400">{errorMsg}</p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Отправляем..." : "Жду звонка"}
                    </Button>
                    <Button type="button" variant="ghost" onClick={handleClose}>
                      Отмена
                    </Button>
                  </div>
                </form>
              </>
            )}

            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-[#8BA4BC] hover:bg-white/5 hover:text-white"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}