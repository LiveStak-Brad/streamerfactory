"use client";

import { useMemo, useState } from "react";
import { ResourceCard } from "@/components/streameru/library/ResourceCard";
import {
  getLibraryByCategory,
  getLibraryCategoryCounts,
  getReadyResourceCount,
} from "@/lib/streameru-library/by-lesson";
import {
  LIBRARY_CATEGORIES,
  type LibraryCategoryId,
} from "@/lib/streameru-library/types";
import { PUBLISHED_LESSON_COUNT, getLibraryHubStats } from "@/lib/streameru/academy-meta";

type Filter = "all" | LibraryCategoryId;

export function LibraryHome() {
  const [filter, setFilter] = useState<Filter>("all");
  const resources = useMemo(() => getLibraryByCategory(filter), [filter]);
  const readyCount = getReadyResourceCount();
  const total = getLibraryByCategory("all").length;
  const stats = getLibraryHubStats();
  const categoryCounts = getLibraryCategoryCounts();

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Free Live Streaming Academy
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
          Free worksheets &amp; checklists
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Printable checklists, worksheets, planners, and trackers for StreamerU — branded for
          Streamer Factory creators. Print or Save as PDF, fill them in, then come back to complete
          your LIVE exam.
        </p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border/70 bg-surface/90 px-3 py-3 dark:border-zinc-800">
            <dt className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">Ready now</dt>
            <dd className="mt-1 text-lg font-bold tabular-nums text-foreground">{readyCount}</dd>
          </div>
          <div className="rounded-xl border border-border/70 bg-surface/90 px-3 py-3 dark:border-zinc-800">
            <dt className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">
              Beginner packs
            </dt>
            <dd className="mt-1 text-lg font-bold tabular-nums text-foreground">
              {stats.beginnerReady}
            </dd>
          </div>
          <div className="rounded-xl border border-border/70 bg-surface/90 px-3 py-3 dark:border-zinc-800">
            <dt className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">
              Lesson checklists
            </dt>
            <dd className="mt-1 text-lg font-bold tabular-nums text-foreground">
              {stats.readyChecklists}
            </dd>
            <p className="mt-0.5 text-[11px] text-muted">Across all {PUBLISHED_LESSON_COUNT} lessons</p>
          </div>
        </dl>
        <p className="mt-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {readyCount} ready to print · {total} tools in the library
          {stats.placeholder > 0
            ? ` · ${stats.placeholder} additional worksheets coming soon`
            : ""}
        </p>
      </header>

      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter by category"
      >
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label="All"
        />
        {LIBRARY_CATEGORIES.map((cat) => (
          <FilterChip
            key={cat.id}
            active={filter === cat.id}
            onClick={() => setFilter(cat.id)}
            label={`${cat.label}${categoryCounts[cat.id] ? ` (${categoryCounts[cat.id]})` : ""}`}
          />
        ))}
      </div>

      {filter !== "all" ? (
        <p className="text-sm text-muted">
          {LIBRARY_CATEGORIES.find((c) => c.id === filter)?.description}
        </p>
      ) : null}

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {resources.map((resource) => (
          <li key={resource.id}>
            <ResourceCard resource={resource} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        active
          ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
          : "border border-border/80 bg-surface text-foreground hover:bg-muted-bg dark:border-zinc-800"
      }`}
    >
      {label}
    </button>
  );
}
