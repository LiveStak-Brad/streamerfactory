"use client";

import { useState, useTransition } from "react";
import { archiveHallOfFameMonthAction } from "@/lib/hall-of-fame/actions";
import { formatYearMonthLabel } from "@/lib/hall-of-fame/months";
import type { HallOfFamePlacement } from "@/lib/hall-of-fame/types";

type HallOfFameArchivePanelProps = {
  yearMonth: string;
  alreadyArchived: boolean;
  preview: HallOfFamePlacement[];
  tablesMissing?: boolean;
};

export function HallOfFameArchivePanel({
  yearMonth,
  alreadyArchived,
  preview,
  tablesMissing = false,
}: HallOfFameArchivePanelProps) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onArchive() {
    setMessage(null);
    setError(null);
    const label = formatYearMonthLabel(yearMonth);
    const ok = window.confirm(
      `Lock ${label} into Hall of Fame history?\n\nThis cannot be overwritten. Places 1–${preview.length || 5} from the current leaderboard will become permanent.`,
    );
    if (!ok) return;

    startTransition(async () => {
      const result = await archiveHallOfFameMonthAction(yearMonth);
      if (result.ok) {
        setMessage(`Locked ${formatYearMonthLabel(result.yearMonth)} (${result.placed} placements).`);
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <div className="rounded-2xl border border-border/80 bg-surface p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60 sm:p-6">
      <h2 className="text-lg font-bold tracking-tight text-foreground">Month-end archive</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        One update per month: lock the live leaderboard into permanent Hall of Fame history. Previous
        months are never overwritten. The next month’s live board continues on Rankings automatically.
      </p>

      {tablesMissing ? (
        <p className="mt-4 rounded-xl border border-amber-300/40 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
          Apply the <code className="text-xs">hall_of_fame</code> Supabase migration before archiving.
          Seed history (May–June 2026) still shows on the public page from code.
        </p>
      ) : null}

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border/70 bg-muted-bg/50 px-4 py-3 dark:border-zinc-800">
          <dt className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted">Target month</dt>
          <dd className="mt-1 text-base font-semibold text-foreground">
            {formatYearMonthLabel(yearMonth)}
          </dd>
        </div>
        <div className="rounded-xl border border-border/70 bg-muted-bg/50 px-4 py-3 dark:border-zinc-800">
          <dt className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted">Status</dt>
          <dd className="mt-1 text-base font-semibold text-foreground">
            {alreadyArchived ? "Already locked" : "Ready to lock"}
          </dd>
        </div>
      </dl>

      {preview.length > 0 ? (
        <ol className="mt-5 space-y-2">
          {preview.map((p) => (
            <li
              key={p.place}
              className="flex items-center justify-between gap-3 rounded-xl border border-border/70 px-3 py-2 text-sm dark:border-zinc-800"
            >
              <span className="font-semibold text-foreground">
                #{p.place} {p.displayName}
              </span>
              <span className="truncate text-muted">@{p.tiktokUsername}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-5 text-sm text-muted">No live standings to preview. Sync rankings first.</p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={pending || alreadyArchived || tablesMissing || preview.length === 0}
          onClick={onArchive}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-[filter,transform] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending
            ? "Archiving…"
            : alreadyArchived
              ? "Month already locked"
              : `Lock & archive ${formatYearMonthLabel(yearMonth)}`}
        </button>
        <a
          href="/hall-of-fame"
          className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
        >
          View Hall of Fame →
        </a>
      </div>

      {message ? (
        <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300">{message}</p>
      ) : null}
      {error ? (
        <p className="mt-4 text-sm font-semibold text-rose-700 dark:text-rose-300">{error}</p>
      ) : null}
    </div>
  );
}
