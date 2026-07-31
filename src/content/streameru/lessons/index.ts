import type { ExpandedLesson } from "@/content/streameru/types";
import { lesson as startStrongOnTiktokLive } from "./start-strong-on-tiktok-live";
import { lesson as talkingWithEmptyRoom } from "./talking-with-empty-room";

/**
 * Expanded lesson bodies registered for override.
 * Unregistered curriculum slugs keep CMS/DB content via `applyExpandedLessonContent`
 * (missing modules fail open to CMS — they do not hide real content errors).
 */
const LESSONS: ExpandedLesson[] = [
  startStrongOnTiktokLive,
  talkingWithEmptyRoom,
];

const BY_SLUG = new Map(LESSONS.map((l) => [l.slug, l]));

export function getExpandedLesson(slug: string): ExpandedLesson | null {
  return BY_SLUG.get(slug) ?? null;
}

export function listExpandedLessons(): ExpandedLesson[] {
  return LESSONS;
}
