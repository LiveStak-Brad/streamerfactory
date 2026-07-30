/**
 * Case study / creator story content model.
 * Publish only when verified creator permission and public-safe data exist.
 */

export type CreatorStoryStatus = "draft_awaiting_verification" | "published";

export type CreatorStorySection = {
  heading: string;
  body: string;
};

export type CreatorStory = {
  slug: string;
  title: string;
  /** Public handle only — never email or private IDs */
  publicHandle: string;
  status: CreatorStoryStatus;
  summary: string;
  timeline?: { label: string; detail: string }[];
  trainingCompleted?: string[];
  battleHighlights?: string[];
  lessonsLearned?: string[];
  interviewQuotes?: { quote: string; context?: string }[];
  beforeAfter?: { before: string; after: string };
  relatedGuideSlugs?: string[];
  relatedLessonHrefs?: string[];
  /** ISO date — required when published */
  publishedAt?: string;
  updatedAt?: string;
};

/**
 * Empty until real, approved creator stories exist.
 * Do not invent stories to fill this array.
 */
export const CREATOR_STORIES: CreatorStory[] = [];

export function getPublishedCreatorStories(): CreatorStory[] {
  return CREATOR_STORIES.filter((s) => s.status === "published");
}

export function getCreatorStoryBySlug(slug: string): CreatorStory | undefined {
  return CREATOR_STORIES.find((s) => s.slug === slug && s.status === "published");
}
