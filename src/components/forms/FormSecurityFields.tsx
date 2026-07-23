"use client";

import { HONEYPOT_FIELD } from "@/lib/security/constants";

interface FormSecurityFieldsProps {
  value: string;
  onChange: (value: string) => void;
}

export function FormSecurityFields({ value, onChange }: FormSecurityFieldsProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
    >
      <label htmlFor={HONEYPOT_FIELD}>Не заполняйте это поле</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}