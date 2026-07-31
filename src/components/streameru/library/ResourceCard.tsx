import Link from "next/link";
import {
  LIBRARY_CATEGORIES,
  LIBRARY_KIND_LABELS,
  type LibraryResource,
} from "@/lib/streameru-library/types";
import { streamerULibraryResourceHref } from "@/lib/streameru-library/urls";

type Props = {
  resource: LibraryResource;
};

export function ResourceCard({ resource }: Props) {
  const category =
    LIBRARY_CATEGORIES.find((c) => c.id === resource.category)?.label ?? resource.category;
  const kind = LIBRARY_KIND_LABELS[resource.kind];
  const ready = resource.status === "ready";

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-accent dark:text-accent-muted">
          {category} · {kind}
        </p>
        <span
          className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${
            ready
              ? "bg-emerald-500/15 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
              : "bg-amber-500/15 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300"
          }`}
        >
          {ready ? "Printable" : "Coming soon"}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground">{resource.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{resource.description}</p>
      {ready ? (
        <p className="mt-4 text-sm font-semibold text-accent dark:text-accent-muted">
          Open &amp; print →
        </p>
      ) : (
        <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Preview in library →
        </p>
      )}
    </>
  );

  return (
    <Link
      href={streamerULibraryResourceHref(resource.id)}
      className="block rounded-2xl border border-border/80 bg-surface/80 p-5 transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/40"
    >
      {inner}
    </Link>
  );
}
