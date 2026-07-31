import Link from "next/link";
import {
  LIBRARY_CATEGORIES,
  LIBRARY_KIND_LABELS,
  type LibraryResource,
} from "@/lib/streameru-library/types";
import { streamerULibraryHref, streamerULibraryResourceHref } from "@/lib/streameru-library/urls";
import { streamerULessonHref } from "@/lib/streameru-url";
import { getCurriculumLesson } from "@/lib/resources/curriculum";
import { getResourcesForLesson } from "@/lib/streameru-library/by-lesson";

type Props = {
  resource: LibraryResource;
};

export function PlaceholderResourceView({ resource }: Props) {
  const category =
    LIBRARY_CATEGORIES.find((c) => c.id === resource.category)?.label ?? resource.category;
  const primarySlug = resource.lessonSlugs[0];
  const lesson = primarySlug ? getCurriculumLesson(primarySlug) : null;
  const readyAlternates = primarySlug
    ? getResourcesForLesson(primarySlug).filter(
        (r) => r.status === "ready" && r.id !== resource.id,
      )
    : [];

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-border/80 bg-surface/90 p-6 sm:p-8">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent dark:text-accent-muted">
        {category} · {LIBRARY_KIND_LABELS[resource.kind]}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{resource.title}</h1>
      <p className="mt-3 text-base leading-relaxed text-muted">{resource.description}</p>
      <div className="mt-6 rounded-xl border border-dashed border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-950 dark:text-amber-100">
        <p className="font-semibold">Coming soon</p>
        <p className="mt-1 leading-relaxed opacity-90">
          {resource.comingSoonNote ??
            "This printable is on the StreamerU roadmap. Check back as we expand the library."}
        </p>
      </div>

      {readyAlternates.length > 0 ? (
        <div className="mt-8">
          <p className="text-sm font-semibold text-foreground">Ready to print for this lesson</p>
          <ul className="mt-3 space-y-2">
            {readyAlternates.map((alt) => (
              <li key={alt.id}>
                <Link
                  href={streamerULibraryResourceHref(alt.id)}
                  className="font-semibold text-accent hover:underline dark:text-accent-muted"
                >
                  {alt.title} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={streamerULibraryHref()}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
        >
          Browse library
        </Link>
        {lesson ? (
          <Link
            href={streamerULessonHref(lesson.slug)}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground"
          >
            Back to lesson
          </Link>
        ) : null}
      </div>
    </div>
  );
}
