import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";
import type {
  ClientSummary,
  Lead,
  LeadCartItem,
  LeadKind,
  LeadStatus,
} from "@/lib/data/leads-types";
import { MESSAGE_SUBJECTS } from "@/lib/data/leads-types";

export type {
  ClientSummary,
  Lead,
  LeadCartItem,
  LeadKind,
  LeadStatus,
} from "@/lib/data/leads-types";

export {
  LEAD_KIND_LABELS,
  LEAD_STATUS_LABELS,
  MESSAGE_SUBJECTS,
} from "@/lib/data/leads-types";

const MAX_LEADS = 5_000;

function dataPath(): string {
  if (process.env.LEADS_DATA_PATH) return process.env.LEADS_DATA_PATH;
  return path.join(/* turbopackIgnore: true */ process.cwd(), "data", "leads.json");
}

let cache: Lead[] | null = null;
let cacheMtime = 0;

function sanitizeString(v: unknown, max = 2000): string {
  if (typeof v !== "string") return "";
  return v
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .slice(0, max)
    .trim();
}

/** Normalize phone for client matching: digits only, last 10 for RU mobiles */
export function phoneKey(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length >= 10) return digits.slice(-10);
  return digits || phone.trim().toLowerCase();
}

function newId(): string {
  return `ld_${Date.now().toString(36)}_${randomBytes(4).toString("hex")}`;
}

function sanitizeCartItem(raw: unknown): LeadCartItem | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const name = sanitizeString(r.name, 200);
  if (!name) return null;
  return {
    productId: sanitizeString(r.productId, 80) || "unknown",
    name,
    quantity: Math.min(Math.max(Number(r.quantity) || 1, 1), 10_000),
    unitPrice: Math.min(Math.max(Number(r.unitPrice) || 0, 0), 99_999_999),
    km: r.km != null ? Math.min(Math.max(Number(r.km) || 0, 0), 1_000_000) : undefined,
    isCustom: Boolean(r.isCustom),
    leadTime: sanitizeString(r.leadTime, 50) || undefined,
  };
}

export function generateOrderRef(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rnd = randomBytes(3).toString("hex").toUpperCase();
  return `ELZ-${y}${m}${day}-${rnd}`;
}

export function sanitizeLead(input: unknown): Lead | null {
  if (!input || typeof input !== "object") return null;
  const c = input as Record<string, unknown>;
  const name = sanitizeString(c.name, 100);
  const phone = sanitizeString(c.phone, 30);
  if (!name || !phone) return null;

  const kinds: LeadKind[] = ["contact", "callback", "order", "invoice", "payment"];
  const kindRaw = sanitizeString(c.kind, 20) as LeadKind;
  const kind = kinds.includes(kindRaw) ? kindRaw : "contact";

  const statuses: LeadStatus[] = ["new", "in_progress", "done"];
  const statusRaw = sanitizeString(c.status, 20) as LeadStatus;
  const status = statuses.includes(statusRaw) ? statusRaw : "new";

  let cart: LeadCartItem[] | undefined;
  if (Array.isArray(c.cart)) {
    cart = c.cart
      .map(sanitizeCartItem)
      .filter((x): x is LeadCartItem => Boolean(x))
      .slice(0, 50);
    if (!cart.length) cart = undefined;
  }

  const createdAt =
    typeof c.createdAt === "string" && c.createdAt
      ? c.createdAt
      : new Date().toISOString();

  const subject =
    sanitizeString(c.subject, 200) || MESSAGE_SUBJECTS[kind] || "Сообщение ELIZON";

  return {
    id: sanitizeString(c.id, 80) || newId(),
    createdAt,
    kind,
    status,
    read: Boolean(c.read),
    name,
    phone,
    phoneKey: phoneKey(phone),
    email: sanitizeString(c.email, 120) || undefined,
    companyName: sanitizeString(c.companyName, 200) || undefined,
    inn: sanitizeString(c.inn, 12) || undefined,
    kpp: sanitizeString(c.kpp, 9) || undefined,
    legalAddress: sanitizeString(c.legalAddress, 500) || undefined,
    city: sanitizeString(c.city, 100) || undefined,
    deliveryAddress: sanitizeString(c.deliveryAddress, 500) || undefined,
    preferredDate: sanitizeString(c.preferredDate, 30) || undefined,
    paymentMethod: sanitizeString(c.paymentMethod, 40) || undefined,
    quantity: sanitizeString(c.quantity, 20) || undefined,
    comment: sanitizeString(c.comment, 2000) || undefined,
    cart,
    total:
      c.total != null
        ? Math.min(Math.max(Number(c.total) || 0, 0), 99_999_999_999)
        : undefined,
    orderRef: sanitizeString(c.orderRef, 40) || undefined,
    paymentId: sanitizeString(c.paymentId, 80) || undefined,
    note: sanitizeString(c.note, 1000) || undefined,
    subject,
  };
}

export async function loadLeads(): Promise<Lead[]> {
  const file = dataPath();
  try {
    const stat = await fs.stat(file);
    const mtime = stat.mtimeMs;
    if (cache && cacheMtime === mtime) return cache;

    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) throw new Error("invalid");
    const list = parsed
      .map((item) => sanitizeLead(item))
      .filter((x): x is Lead => Boolean(x));
    cache = list;
    cacheMtime = mtime;
    return list;
  } catch {
    cache = [];
    cacheMtime = 0;
    return cache;
  }
}

async function saveLeads(leads: Lead[]): Promise<void> {
  const list = leads
    .map((c) => sanitizeLead(c))
    .filter((x): x is Lead => Boolean(x))
    .slice(0, MAX_LEADS);

  const file = dataPath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(list, null, 2), "utf8");
  await fs.rename(tmp, file);
  cache = list;
  try {
    const stat = await fs.stat(file);
    cacheMtime = stat.mtimeMs;
  } catch {
    cacheMtime = Date.now();
  }
}

export type NewLeadInput = Omit<Lead, "id" | "createdAt" | "phoneKey" | "status"> & {
  status?: LeadStatus;
  id?: string;
  createdAt?: string;
};

export async function appendLead(input: NewLeadInput): Promise<Lead> {
  const kind = input.kind || "contact";
  const needsOrderRef =
    (kind === "order" || kind === "invoice" || Boolean(input.cart?.length)) &&
    !input.orderRef;

  const lead = sanitizeLead({
    ...input,
    id: input.id || newId(),
    createdAt: input.createdAt || new Date().toISOString(),
    status: input.status || "new",
    read: false,
    phoneKey: phoneKey(input.phone),
    orderRef: input.orderRef || (needsOrderRef ? generateOrderRef() : undefined),
    subject: input.subject || MESSAGE_SUBJECTS[kind],
  });
  if (!lead) throw new Error("Некорректные данные заявки");

  const all = await loadLeads();
  all.unshift(lead);
  if (all.length > MAX_LEADS) all.length = MAX_LEADS;
  await saveLeads(all);
  return lead;
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  note?: string
): Promise<Lead | null> {
  const all = await loadLeads();
  const idx = all.findIndex((l) => l.id === id);
  if (idx < 0) return null;
  all[idx] = {
    ...all[idx],
    status,
    note: note !== undefined ? sanitizeString(note, 1000) || undefined : all[idx].note,
  };
  await saveLeads(all);
  return all[idx];
}

export async function markLeadRead(id: string, read = true): Promise<Lead | null> {
  const all = await loadLeads();
  const idx = all.findIndex((l) => l.id === id);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], read };
  await saveLeads(all);
  return all[idx];
}

export async function markAllLeadsRead(): Promise<number> {
  const all = await loadLeads();
  let n = 0;
  for (const lead of all) {
    if (!lead.read) {
      lead.read = true;
      n += 1;
    }
  }
  if (n) await saveLeads(all);
  return n;
}

/** Permanently remove one lead by id. Returns true if something was deleted. */
export async function deleteLead(id: string): Promise<boolean> {
  const all = await loadLeads();
  const next = all.filter((l) => l.id !== id);
  if (next.length === all.length) return false;
  await saveLeads(next);
  return true;
}

/** Permanently remove many leads (e.g. all submissions of one client). */
export async function deleteLeadsByIds(ids: string[]): Promise<number> {
  if (!ids.length) return 0;
  const set = new Set(ids);
  const all = await loadLeads();
  const next = all.filter((l) => !set.has(l.id));
  const removed = all.length - next.length;
  if (removed) await saveLeads(next);
  return removed;
}

export function isOrderLead(lead: Lead): boolean {
  return (
    lead.kind === "order" ||
    lead.kind === "invoice" ||
    lead.kind === "payment" ||
    Boolean(lead.cart?.length) ||
    Boolean(lead.orderRef)
  );
}

export async function loadOrders(): Promise<Lead[]> {
  const all = await loadLeads();
  return all.filter(isOrderLead);
}

export async function loadClients(): Promise<ClientSummary[]> {
  const all = await loadLeads();
  const map = new Map<string, ClientSummary>();

  const chronological = [...all].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  for (const lead of chronological) {
    const key = lead.phoneKey || lead.email?.toLowerCase() || lead.id;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, {
        id: key,
        phoneKey: lead.phoneKey,
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        companyName: lead.companyName,
        inn: lead.inn,
        firstSeen: lead.createdAt,
        lastSeen: lead.createdAt,
        submissionsCount: 1,
        ordersCount: isOrderLead(lead) ? 1 : 0,
        kinds: [lead.kind],
        lastComment: lead.comment,
        totalSpent: lead.total || 0,
        leadIds: [lead.id],
      });
    } else {
      existing.lastSeen = lead.createdAt;
      existing.submissionsCount += 1;
      if (isOrderLead(lead)) existing.ordersCount += 1;
      if (!existing.kinds.includes(lead.kind)) existing.kinds.push(lead.kind);
      if (lead.name) existing.name = lead.name;
      if (lead.phone) existing.phone = lead.phone;
      if (lead.email) existing.email = lead.email;
      if (lead.companyName) existing.companyName = lead.companyName;
      if (lead.inn) existing.inn = lead.inn;
      if (lead.comment) existing.lastComment = lead.comment;
      if (lead.total) existing.totalSpent = (existing.totalSpent || 0) + lead.total;
      existing.leadIds.push(lead.id);
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
  );
}
