import Link from "next/link";
import type { ReactNode } from "react";
import { SuProgressBar } from "@/components/streameru/SuProgressBar";
import {
  difficultyBadgeClass,
  difficultyShortLabel,
  difficultyTrackAccentClass,
  type DifficultyLevel,
} from "@/lib/resources/difficulty-styles";
import { formatMinutesLabel } from "@/lib/resources/mission-minutes";

export type ModuleLessonStatus = "completed" | "current" | "available" | "unpublished";

export type ProgramUnlockItem = {
  label: string;
  detail?: string;
};

type CourseModuleCardProps = {
  programName: string;
  lessonCount: number;
  completedCount: number;
  href: string;
  status: ModuleLessonStatus;
  description?: string;
  index: number;
  /** Typical difficulty band for this program */
  difficulty?: DifficultyLevel | string | null;
  /** Sum of study minutes across lessons in the program */
  estimatedStudyMinutes?: number;
  /** Optional badge override (e.g. Required for Rules & Safety) */
  badgeLabel?: string | null;
  /** Callout under description — e.g. safety guidance */
  guidanceNote?: string | null;
  /** Real completion unlocks only — never fabricate */
  unlocks?: ProgramUnlockItem[];
  children?: ReactNode;
};

const statusLabel: Record<ModuleLessonStatus, string> = {
  completed: "Completed",
  current: "In progress",
  available: "Available",
  unpublished: "Coming soon",
};

/**
 * StreamerU program card. Status must reflect real completion or publish state — not fake locks.
 */
export function CourseModuleCard({
  programName,
  lessonCount,
  completedCount,
  href,
  status,
  description,
  index,
  difficulty,
  estimatedStudyMinutes,
  badgeLabel,
  guidanceNote,
  unlocks,
  children,
}: CourseModuleCardProps) {
  const accent = difficultyTrackAccentClass(difficulty ?? null);
  const disabled = status === "unpublished";
  const pct = lessonCount > 0 ? Math.min(100, (completedCount / lessonCount) * 100) : 0;
  const diffLabel = badgeLabel ?? difficultyShortLabel(difficulty ?? null);

  const inner = (
    <>
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent}`}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            Program {index + 1}
          </p>
          <span
            className={`rounded-lg px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${
              status === "completed"
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                : status === "current"
                  ? "bg-accent-soft text-accent dark:text-accent-muted"
                  : status === "unpublished"
                    ? "bg-muted-bg text-muted"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {statusLabel[status]}
          </span>
        </div>
        <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">{programName}</h3>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        ) : null}
        {guidanceNote ? (
          <p className="mt-3 rounded-lg border border-teal-500/25 bg-teal-500/10 px-3 py-2 text-xs font-medium leading-relaxed text-teal-900 dark:border-teal-400/25 dark:bg-teal-500/10 dark:text-teal-100">
            {guidanceNote}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {diffLabel ? (
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${
                badgeLabel
                  ? "border-teal-500/35 bg-teal-500/12 text-teal-800 dark:border-teal-400/30 dark:bg-teal-500/15 dark:text-teal-200"
                  : difficultyBadgeClass(difficulty)
              }`}
            >
              {diffLabel}
            </span>
          ) : null}
          {estimatedStudyMinutes != null && estimatedStudyMinutes > 0 ? (
            <span className="text-xs font-semibold tabular-nums text-muted">
              ~{formatMinutesLabel(estimatedStudyMinutes)} study
            </span>
          ) : null}
        </div>
        <p className="mt-4 text-sm font-semibold text-foreground/80">
          {completedCount}/{lessonCount} Live Exams done
        </p>
        <SuProgressBar
          className="mt-2"
          value={pct}
          label={`${programName} program progress`}
        />
        {unlocks && unlocks.length > 0 ? (
          <ul className="mt-4 space-y-1.5" aria-label={`What completing ${programName} unlocks`}>
            {unlocks.map((item) => (
              <li
                key={item.label}
                className="flex items-start gap-2 text-xs leading-snug text-muted"
              >
                <span
                  className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden
                />
                <span>
                  <span className="font-semibold text-foreground/85">{item.label}</span>
                  {item.detail ? <span className="text-muted"> — {item.detail}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        {children}
        {!disabled ? (
          <p className="mt-4 text-sm font-semibold text-accent dark:text-accent-muted">
            Open program →
          </p>
        ) : null}
      </div>
    </>
  );

  if (disabled) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-border/80 bg-surface/60 p-6 opacity-80 dark:border-zinc-700 dark:bg-zinc-950/40">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="relative block overflow-hidden rounded-2xl border border-border/80 bg-surface/95 p-6 shadow-sm transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transform-none dark:border-zinc-800 dark:bg-zinc-950/55"
    >
      {inner}
    </Link>
  );
}
