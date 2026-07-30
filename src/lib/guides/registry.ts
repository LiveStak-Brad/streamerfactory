import type { GuideDocument } from "./types";

/**
 * Central registry — populated by `index.ts` after documents + comparisons load.
 * Use helpers below rather than hardcoding related links in UI.
 */

let documents: GuideDocument[] = [];

export function setGuideDocuments(all: GuideDocument[]) {
  documents = all;
}

export function getAllGuides(): GuideDocument[] {
  return documents;
}

export function getGuideBySlug(slug: string): GuideDocument | undefined {
  return documents.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return documents.map((g) => g.slug);
}

export function getGuidesByCategory(categoryId: string): GuideDocument[] {
  return documents.filter((g) => g.categoryId === categoryId);
}

export function getRelatedGuides(slug: string): GuideDocument[] {
  const guide = getGuideBySlug(slug);
  if (!guide) return [];
  return guide.relatedSlugs
    .map((related) => getGuideBySlug(related))
    .filter((g): g is GuideDocument => Boolean(g));
}

export function getFeaturedGuides(): GuideDocument[] {
  const featured = [
    "tiktok-live-agency",
    "tiktok-creator-network",
    "how-to-join-tiktok-live-agency",
    "tiktok-monetization-guide",
    "creator-academy",
    "tiktok-live-tips",
    "tiktok-live-agency-vs-going-solo",
    "tiktok-live-battles",
  ];
  return featured.map((slug) => getGuideBySlug(slug)).filter((g): g is GuideDocument => Boolean(g));
}

export function getBeginnerPathway(): GuideDocument[] {
  const pathway = [
    "tiktok-live-tips-for-beginners",
    "tiktok-live-streaming-setup",
    "how-to-join-tiktok-live-agency",
    "creator-academy",
    "tiktok-live-tips",
  ];
  return pathway.map((slug) => getGuideBySlug(slug)).filter((g): g is GuideDocument => Boolean(g));
}

/** Slugs removed for cannibalization — redirect targets */
export const GUIDE_REDIRECTS: Record<string, string> = {
  "tiktok-agency": "tiktok-live-agency",
  "tiktok-streaming-agency": "livestream-agency",
  "content-creator-agency": "creator-agency",
  "creator-monetization": "tiktok-monetization-guide",
};
