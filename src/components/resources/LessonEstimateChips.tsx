import type { LessonEstimate } from "@/lib/resources/lesson-estimate";

type Props = {
  estimate: LessonEstimate;
  className?: string;
};

export function LessonEstimateChips({ estimate, className = "" }: Props) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-2 ${className}`}
      aria-label="Estimated completion time"
    >
      <li className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/90 bg-surface/90 px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200">
        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Study
        </span>
        <span className="tabular-nums">{estimate.studyLabel}</span>
      </li>
      {estimate.liveLabel ? (
        <li className="inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent/[0.08] px-2.5 py-1 text-xs font-semibold text-accent dark:border-accent/30 dark:bg-accent/10 dark:text-accent-muted">
          <span className="text-[0.65rem] font-bold uppercase tracking-wider opacity-80">
            Live exam
          </span>
          <span className="tabular-nums">{estimate.liveLabel}</span>
        </li>
      ) : null}
      <li className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-900/10 bg-zinc-950/[0.04] px-2.5 py-1 text-xs font-semibold text-zinc-800 dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-100">
        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Total
        </span>
        <span className="tabular-nums">{estimate.totalLabel}</span>
      </li>
    </ul>
  );
}
