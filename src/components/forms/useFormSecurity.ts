"use client";

import { useRef, useState } from "react";
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from "@/lib/security/constants";

export function useFormSecurity() {
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(Date.now());

  const securityPayload = {
    [HONEYPOT_FIELD]: honeypot,
    [TIMESTAMP_FIELD]: startedAt.current,
  };

  return { honeypot, setHoneypot, securityPayload };
}