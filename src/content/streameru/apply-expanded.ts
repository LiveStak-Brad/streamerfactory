import { getExpandedLesson } from "@/content/streameru/lessons";
import type { ResourcePostWithCategory } from "@/lib/resources/types";

/**
 * Prefer version-controlled curriculum bodies when present.
 * Keeps titles/metadata from the CMS row; replaces excerpt + content.
 *
 * Fail-safe: unregistered / missing expanded modules return the CMS post unchanged.
 * This must never swallow parse/import errors — broken lesson modules fail the build
 * when TypeScript loads them; absence simply means “use CMS content.”
 */
export function applyExpandedLessonContent<T extends ResourcePostWithCategory>(
  post: T,
): T {
  const expanded = getExpandedLesson(post.slug);
  if (!expanded) return post;
  return {
    ...post,
    excerpt: expanded.excerpt,
    content: expanded.content,
  };
}
