import Link from "next/link";

import { formatLabelToDisplay } from "@/lib/battle-hub/formats";
import { formatBattleScheduleTime } from "@/lib/battle-hub/display";
import { requestTypeLabel } from "@/lib/battle-finder/labels";
import { slotFillSummary } from "@/lib/battle-finder/slots";
import type { BattleRequestWithSlots } from "@/lib/battle-finder/types";

export function BattleFinderRequestCard({ req }: { req: BattleRequestWithSlots }) {
  const { filled, total, open } = slotFillSummary(req);
  const title = (req.title ?? "").trim() || "Open battle request";
  const when = req.preferred_at
    ? formatBattleScheduleTime(req.preferred_at, req.timezone)
    : "Flexible timing";

  return (
    <article className="group rounded-2xl border border-zinc-200/90 bg-white/80 p-5 shadow-sm transition duration-200 hover:border-accent/35 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-accent/40 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent dark:text-accent-muted">
            {requestTypeLabel(req.request_type)}
          </p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">{title}</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Posted by <span className="font-medium text-zinc-700 dark:text-zinc-300">@{req.creator_display_handle}</span>
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          {req.promoted_battle_event_id ? (
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-200">
              On calendar
            </span>
          ) : null}
          <span className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200">
            {filled}/{total} filled
          </span>
        </div>
      </div>
      <dl className="mt-4 grid gap-2 text-sm text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Format</dt>
          <dd className="mt-0.5 font-medium text-zinc-900 dark:text-zinc-100">
            {formatLabelToDisplay(req.preferred_format, req.participant_count)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Headcount</dt>
          <dd className="mt-0.5 font-medium text-zinc-900 dark:text-zinc-100">{req.participant_count} creators</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Preferred time</dt>
          <dd className="mt-0.5">{when}</dd>
        </div>
      </dl>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/80">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {open > 0 ? (
            <>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">{open}</span> open slot
              {open === 1 ? "" : "s"}
            </>
          ) : (
            <span className="text-zinc-500">No open slots</span>
          )}
        </p>
        <Link
          href={`/battle-hub/finder/${req.id}`}
          className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          View & join
        </Link>
      </div>
    </article>
  );
}
