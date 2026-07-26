import { promises as fs } from "fs";
import path from "path";
import type { CaseStudy } from "@/lib/data/cases-defaults";
import { defaultCaseStudies } from "@/lib/data/cases-defaults";

function dataPath(): string {
  if (process.env.CASES_DATA_PATH) return process.env.CASES_DATA_PATH;
  // Statically scoped under data/ so Turbopack NFT does not trace whole project
  return path.join(/* turbopackIgnore: true */ process.cwd(), "data", "cases.json");
}

let cache: CaseStudy[] | null = null;
let cacheMtime = 0;

function sanitizeString(v: unknown, max = 20_000): string {
  if (typeof v !== "string") return "";
  return v
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .slice(0, max)
    .trim();
}

export function sanitizeCase(input: unknown): CaseStudy | null {
  if (!input || typeof input !== "object") return null;
  const c = input as Record<string, unknown>;
  const id = sanitizeString(c.id, 80);
  const slug = sanitizeString(c.slug, 80)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-");
  if (!id || !slug) return null;

  const sectionsRaw = Array.isArray(c.sections) ? c.sections : [];
  const sections = sectionsRaw.slice(0, 20).map((s) => {
    const sec = (s || {}) as Record<string, unknown>;
    const paragraphs = Array.isArray(sec.paragraphs)
      ? sec.paragraphs.map((p) => sanitizeString(p, 8000)).filter(Boolean)
      : [];
    return {
      title: sanitizeString(sec.title, 200) || "Раздел",
      paragraphs: paragraphs.length ? paragraphs : [""],
    };
  });

  const tags = Array.isArray(c.tags)
    ? c.tags.map((t) => sanitizeString(t, 40)).filter(Boolean).slice(0, 12)
    : [];
  const highlights = Array.isArray(c.highlights)
    ? c.highlights.map((h) => sanitizeString(h, 200)).filter(Boolean).slice(0, 12)
    : [];

  let beforeAfter: CaseStudy["beforeAfter"];
  if (c.beforeAfter && typeof c.beforeAfter === "object") {
    const b = c.beforeAfter as Record<string, unknown>;
    beforeAfter = {
      jointsBefore: sanitizeString(b.jointsBefore, 200),
      jointsAfter: sanitizeString(b.jointsAfter, 200),
      daysBefore: sanitizeString(b.daysBefore, 200),
      daysAfter: sanitizeString(b.daysAfter, 200),
      note: sanitizeString(b.note, 500) || undefined,
    };
  }

  return {
    id,
    slug,
    title: sanitizeString(c.title, 200) || slug,
    client: sanitizeString(c.client, 200),
    location: sanitizeString(c.location, 200),
    volume: sanitizeString(c.volume, 200),
    result: sanitizeString(c.result, 200),
    description: sanitizeString(c.description, 2000),
    image: sanitizeString(c.image, 300) || "/images/cases/case-magistral.svg",
    imageAlt: sanitizeString(c.imageAlt, 300),
    tags,
    intro: sanitizeString(c.intro, 8000),
    sections: sections.length ? sections : [{ title: "Описание", paragraphs: [""] }],
    conclusion: sanitizeString(c.conclusion, 4000),
    highlights,
    beforeAfter,
  };
}

export async function loadCases(): Promise<CaseStudy[]> {
  const file = dataPath();
  try {
    const stat = await fs.stat(file);
    const mtime = stat.mtimeMs;
    if (cache && cacheMtime === mtime) return cache;

    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) throw new Error("invalid");
    const list = parsed
      .map((item) => sanitizeCase(item))
      .filter((x): x is CaseStudy => Boolean(x));
    if (!list.length) throw new Error("empty");
    cache = list;
    cacheMtime = mtime;
    return list;
  } catch {
    cache = defaultCaseStudies.map((c) => ({ ...c, sections: c.sections.map((s) => ({ ...s, paragraphs: [...s.paragraphs] })) }));
    cacheMtime = 0;
    return cache;
  }
}

export async function saveCases(cases: CaseStudy[]): Promise<void> {
  const list = cases
    .map((c) => sanitizeCase(c))
    .filter((x): x is CaseStudy => Boolean(x));
  if (!list.length) throw new Error("Нет кейсов для сохранения");

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

export async function getCaseBySlug(slug: string): Promise<CaseStudy | undefined> {
  const all = await loadCases();
  return all.find((c) => c.slug === slug);
}

export async function getAllCaseSlugs(): Promise<string[]> {
  const all = await loadCases();
  return all.map((c) => c.slug);
}

export async function updateCase(
  slug: string,
  patch: Partial<CaseStudy>
): Promise<CaseStudy> {
  const all = await loadCases();
  const idx = all.findIndex((c) => c.slug === slug);
  if (idx < 0) throw new Error("Кейс не найден");

  const merged = sanitizeCase({ ...all[idx], ...patch, slug: all[idx].slug, id: all[idx].id });
  if (!merged) throw new Error("Некорректные данные");
  all[idx] = merged;
  await saveCases(all);
  return merged;
}

export function invalidateCasesCache(): void {
  cache = null;
  cacheMtime = 0;
}
