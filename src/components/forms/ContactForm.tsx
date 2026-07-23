"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FormSecurityFields } from "@/components/forms/FormSecurityFields";
import { useFormSecurity } from "@/components/forms/useFormSecurity";

interface ContactFormProps {
  id?: string;
  compact?: boolean;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  quantity: string;
  comment: string;
}

export function ContactForm({ id = "form", compact = false }: ContactFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    quantity: "",
    comment: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { honeypot, setHoneypot, securityPayload } = useFormSecurity();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...form, ...securityPayload }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка отправки");
      }

      setStatus("success");
      setForm({ name: "", phone: "", email: "", quantity: "", comment: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Что-то пошло не так");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#8BA4BC]/50 outline-none transition-colors focus:border-[#00D4FF]/50 focus:bg-white/[0.06]";

  if (status === "success") {
    return (
      <div
        id={id}
        className="rounded-2xl border border-[#00D4FF]/30 bg-[#00D4FF]/5 p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00D4FF]/20 text-2xl">
          ✓
        </div>
        <h3 className="text-xl font-medium text-white">Заявка отправлена</h3>
        <p className="mt-2 text-[#8BA4BC]">
          Менеджер свяжется с вами в течение 15 минут в рабочее время.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Отправить ещё одну
        </Button>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="relative space-y-4">
      <FormSecurityFields value={honeypot} onChange={setHoneypot} />
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-[#8BA4BC]">
            Имя *
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            placeholder="Как к вам обращаться"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm text-[#8BA4BC]">
            Телефон *
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
            placeholder="+7 (___) ___-__-__"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-[#8BA4BC]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            placeholder="email@company.ru"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="mb-1.5 block text-sm text-[#8BA4BC]">
            Количество катушек
          </label>
          <input
            id="quantity"
            type="text"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className={inputClass}
            placeholder="Например, 5"
          />
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor="comment" className="mb-1.5 block text-sm text-[#8BA4BC]">
            Комментарий
          </label>
          <textarea
            id="comment"
            rows={4}
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className={`${inputClass} resize-none`}
            placeholder="Куда отгружать, сроки, особые требования..."
          />
        </div>
      )}

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full sm:w-auto"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Отправляем..." : "Отправить заявку"}
      </Button>
    </form>
  );
}