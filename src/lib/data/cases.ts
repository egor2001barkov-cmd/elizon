/**
 * Публичный API кейсов.
 * Данные: data/cases.json (редактируется в /admin), иначе defaults.
 */
export type {
  CaseStudy,
  CaseStudySection,
} from "@/lib/data/cases-defaults";

export { defaultCaseStudies } from "@/lib/data/cases-defaults";

import type { CaseStudy } from "@/lib/data/cases-defaults";
import { defaultCaseStudies } from "@/lib/data/cases-defaults";

/** Синхронный fallback для client components (до гидрации / SSR props) */
export const caseStudies: CaseStudy[] = defaultCaseStudies;

export async function loadCaseStudies(): Promise<CaseStudy[]> {
  if (typeof window !== "undefined") return defaultCaseStudies;
  const { loadCases } = await import("@/lib/data/cases-store");
  return loadCases();
}

export async function getCaseBySlug(slug: string): Promise<CaseStudy | undefined> {
  if (typeof window !== "undefined") {
    return defaultCaseStudies.find((c) => c.slug === slug);
  }
  const { getCaseBySlug: get } = await import("@/lib/data/cases-store");
  return get(slug);
}

export async function getAllCaseSlugs(): Promise<string[]> {
  if (typeof window !== "undefined") {
    return defaultCaseStudies.map((c) => c.slug);
  }
  const { getAllCaseSlugs: get } = await import("@/lib/data/cases-store");
  return get();
}
