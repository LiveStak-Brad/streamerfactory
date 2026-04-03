/**
 * Canonical URL path for StreamerU (matches `src/app/streameru/`).
 * `/resources/*` rewrites to the same routes in next.config for backwards compatibility.
 */
export const STREAMERU_BASE = "/streameru";

export function streamerULessonHref(slug: string): string {
  return `${STREAMERU_BASE}/${slug}`;
}
