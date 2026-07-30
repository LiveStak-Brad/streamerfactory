import { COMPARISON_DOCUMENTS } from "./comparisons";
import { GUIDE_DOCUMENTS } from "./documents";
import { setGuideDocuments } from "./registry";
import type { GuideDocument } from "./types";

export type {
  GuideCategoryId,
  GuideComparisonRow,
  GuideDocument,
  GuideFaq,
  GuideFormat,
  GuideLink,
  GuidePillar,
  GuideProcessStep,
  GuideSection,
} from "./types";

export { GUIDE_CATEGORIES, getCategory } from "./categories";
export {
  getAllGuideSlugs,
  getAllGuides,
  getBeginnerPathway,
  getFeaturedGuides,
  getGuideBySlug,
  getGuidesByCategory,
  getRelatedGuides,
  GUIDE_REDIRECTS,
} from "./registry";

/** All public guide documents (pillars + support + comparisons). */
export const ALL_GUIDES: GuideDocument[] = [...GUIDE_DOCUMENTS, ...COMPARISON_DOCUMENTS];

setGuideDocuments(ALL_GUIDES);

/** @deprecated Use ALL_GUIDES / getAllGuides — kept for older imports */
export const GUIDE_PILLARS = ALL_GUIDES;
