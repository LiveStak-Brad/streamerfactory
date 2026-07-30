import Link from "next/link";
import { getGuideBySlug } from "@/lib/guides";
import { getRelatedGuideSlugsForLesson } from "@/lib/guides/lesson-links";

export function RelatedGuidesForLesson({ lessonSlug }: { lessonSlug: string }) {
  const slugs = getRelatedGuideSlugsForLesson(lessonSlug);
  const guides = slugs.map((s) => getGuideBySlug(s)).filter(Boolean);

  if (guides.length === 0) return null;

  return (
    <aside className="mt-12 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
      <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
        Related knowledge center guides
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Public ecosystem explainers that pair with this StreamerU lesson.
      </p>
      <ul className="mt-4 space-y-2">
        {guides.map((guide) =>
          guide ? (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
              >
                {guide.title} →
              </Link>
            </li>
          ) : null,
        )}
      </ul>
      <p className="mt-4">
        <Link
          href="/guides"
          className="text-sm font-semibold text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-400"
        >
          Browse all guides
        </Link>
      </p>
    </aside>
  );
}
