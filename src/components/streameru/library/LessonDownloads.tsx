import Link from "next/link";
import {
  LIBRARY_KIND_LABELS,
  type LibraryResource,
} from "@/lib/streameru-library/types";
import { streamerULibraryHref, streamerULibraryResourceHref } from "@/lib/streameru-library/urls";

type Props = {
  resources: LibraryResource[];
};

export function LessonDownloads({ resources }: Props) {
  if (resources.length === 0) return null;

  const ready = resources.filter((r) => r.status === "ready");
  const placeholders = resources.filter((r) => r.status === "placeholder");

  return (
    <section
      className="rounded-2xl border border-border/80 bg-surface/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/40 sm:p-8"
      aria-labelledby="lesson-downloads-heading"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        Downloads
      </p>
      <h2
        id="lesson-downloads-heading"
        className="mt-1 text-xl font-bold tracking-tight text-foreground"
      >
        Printable resources
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        Print these before your LIVE mission. Fill them in, then return here to mark the mission
        complete and keep building your library habit.
      </p>

      {ready.length > 0 ? (
        <ul className="mt-6 space-y-3">
          {ready.map((resource) => (
            <li key={resource.id}>
              <Link
                href={streamerULibraryResourceHref(resource.id)}
                className="flex flex-col gap-1 rounded-xl border border-border/70 bg-background/60 px-4 py-3 transition-colors hover:border-accent/35 hover:bg-muted-bg/80 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>
                  <span className="text-sm font-semibold text-foreground">{resource.title}</span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {LIBRARY_KIND_LABELS[resource.kind]} · Print / Save as PDF
                  </span>
                </span>
                <span className="text-sm font-semibold text-accent dark:text-accent-muted">
                  Open →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {placeholders.length > 0 ? (
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            Coming soon for this lesson
          </p>
          <ul className="mt-3 space-y-2">
            {placeholders.map((resource) => (
              <li
                key={resource.id}
                className="rounded-xl border border-dashed border-zinc-300/90 px-4 py-3 dark:border-zinc-700"
              >
                <p className="text-sm font-semibold text-foreground/90">{resource.title}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {LIBRARY_KIND_LABELS[resource.kind]} · {resource.comingSoonNote ?? "On the roadmap"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-6 text-sm">
        <Link
          href={streamerULibraryHref()}
          className="font-semibold text-accent transition-colors hover:underline dark:text-accent-muted"
        >
          Browse full Resource Library →
        </Link>
      </p>
    </section>
  );
}
