/**
 * Maps StreamerU lesson slugs → related public knowledge-center guides.
 * Used for internal linking without hardcoding in every lesson page.
 */
export const LESSON_RELATED_GUIDES: Record<string, string[]> = {
  "start-strong-on-tiktok-live": [
    "tiktok-live-tips-for-beginners",
    "tiktok-live-streaming-setup",
    "how-to-join-tiktok-live-agency",
  ],
  "your-first-live-structure": ["tiktok-live-tips", "tiktok-live-tips-for-beginners"],
  "first-10-tiktok-live-sessions": ["tiktok-live-tips", "tiktok-growth"],
  "hooks-and-first-impressions": ["tiktok-live-tips", "tiktok-growth"],
  "understanding-battles": ["tiktok-live-battles", "tiktok-live-battle-strategy"],
  "content-loops-repeatable-segments": ["tiktok-live-tips", "tiktok-monetization-guide"],
};

export function getRelatedGuideSlugsForLesson(lessonSlug: string): string[] {
  return LESSON_RELATED_GUIDES[lessonSlug] ?? ["tiktok-live-tips", "creator-academy", "streamer-resources"];
}
