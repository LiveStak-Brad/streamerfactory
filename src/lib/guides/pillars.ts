/**
 * Compatibility shim — prefer `@/lib/guides` (index).
 * Re-exports the authority Phase 2 registry so older imports keep working.
 */
export {
  ALL_GUIDES,
  GUIDE_PILLARS,
  getAllGuideSlugs,
  getAllGuides,
  getBeginnerPathway,
  getFeaturedGuides,
  getGuideBySlug,
  getGuidesByCategory,
  getRelatedGuides,
  GUIDE_REDIRECTS,
  GUIDE_CATEGORIES,
  getCategory,
} from "./index";

export type { GuideDocument, GuidePillar, GuideFaq, GuideSection } from "./types";
