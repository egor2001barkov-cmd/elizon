"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FormSecurityFields } from "@/components/forms/FormSecurityFields";
import { useFormSecurity } from "@/components/forms/useFormSecurity";

interface InvoiceModalProps {
  open: boolean;
  onClose: () => void;
}

const emptyForm = {
  companyName: "",
  inn: "",
  kpp: "",
  legalAddress: "",
  contactName: "",
  phone: "",
  email: "",
  orderDetails: "",
};

export function InvoiceModal({ open, onClose }: InvoiceModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { honeypot, setHoneypot, securityPayload } = useFormSecurity();

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#8BA4BC]/50 outline-none transition-colors focus:border-[#6ECFFF]/50 focus:bg-white/[0.06]";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "invoice",
          name: form.contactName,
          phone: form.phone,
          email: form.email,
          companyName: form.companyName,
          inn: form.inn,
          kpp: form.kpp,
          legalAddress: form.legalAddress,
          comment: form.orderDetails,
          ...securityPayload,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка отправки");
      }

      setStatus("success");
      setForm(emptyForm);
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
            className="fixed left-1/2 top-1/2 z-[90] flex max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border border-[#6ECFFF]/15 bg-[#0A2540]/95 shadow-[0_0_60px_rgba(110,207,255,0.1)] backdrop-blur-xl"
            role="dialog"
            aria-labelledby="invoice-title"
          >
            <div className="shrink-0 border-b border-white/10 px-6 py-5 md:px-8">
              <h2 id="invoice-title" className="font-display text-xl font-medium text-white">
                Запросить счёт
              </h2>
              <p className="mt-1 text-sm text-[#8BA4BC]">
                Укажите данные вашей организации — мы выставим счёт и отправим на email.
              </p>
            </div>

            <div className="overflow-y-auto px-6 py-5 md:px-8">
              {status === "success" ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#6ECFFF]/15 text-2xl text-[#6ECFFF]">
                    ✓
                  </div>
                  <p className="text-lg font-medium text-white">Заявка отправлена</p>
                  <p className="mt-2 text-sm text-[#8BA4BC]">
                    Счёт подготовим и отправим на указанный email в ближайшее время.
                  </p>
                  <Button className="mt-6 w-full" onClick={handleClose}>
                    Закрыть
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-4">
                  <FormSecurityFields value={honeypot} onChange={setHoneypot} />

                  <input
                    type="text"
                    required
                    placeholder="Название организации *"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className={inputClass}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      required
                      placeholder="ИНН *"
                      value={form.inn}
                      onChange={(e) => setForm({ ...form, inn: e.target.value })}
                      className={inputClass}
                    />
                    <input
                      type="text"
                      placeholder="КПП"
                      value={form.kpp}
                      onChange={(e) => setForm({ ...form, kpp: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Юридический адрес"
                    value={form.legalAddress}
                    onChange={(e) => setForm({ ...form, legalAddress: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Контактное лицо *"
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className={inputClass}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="tel"
                      required
                      placeholder="Телефон *"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email для счёта *"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <textarea
                    rows={3}
                    required
                    placeholder="Что выставить в счёте: товар, количество, сумма *"
                    value={form.orderDetails}
                    onChange={(e) => setForm({ ...form, orderDetails: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />

                  {status === "error" && (
                    <p className="text-sm text-red-400">{errorMsg}</p>
                  )}

                  <Button type="submit" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? "Отправляем..." : "Запросить счёт"}
                  </Button>
                </form>
              )}
            </div>

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