/** @deprecated Use landing-pages.ts — kept for backward compatibility */
export type { LandingPage as RegionPage } from "./landing-pages";
export {
  moscowLanding as moscowRegion,
  spbLanding as spbRegion,
  cityLandings as additionalRegions,
  cityLandings,
  getLandingBySlug as getRegionBySlug,
  dynamicLandingSlugs as getAllRegionSlugs,
} from "./landing-pages";