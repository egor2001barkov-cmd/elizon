export const RATE_LIMITS = {
  contact: { windowMs: 60_000, max: 5 },
  contactHourly: { windowMs: 3_600_000, max: 20 },
  spec: { windowMs: 60_000, max: 30 },
  global: { windowMs: 60_000, max: 200 },
} as const;

export const LIMITS = {
  maxBodyBytes: 65_536,
  minFormDelayMs: 3_000,
  maxFormDelayMs: 3_600_000,
  maxFieldLength: 500,
  maxNameLength: 100,
  maxPhoneLength: 30,
  maxEmailLength: 120,
  maxCartItems: 50,
} as const;

export const HONEYPOT_FIELD = "_hp";
export const TIMESTAMP_FIELD = "_ts";