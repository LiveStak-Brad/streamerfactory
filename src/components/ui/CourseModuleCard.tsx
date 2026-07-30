import Link from "next/link";
import type { ReactNode } from "react";

export type ModuleLessonStatus = "completed" | "current" | "available" | "unpublished";

type CourseModuleCardProps = {
  programName: string;
  lessonCount: number;
  completedCount: number;
  href: string;
  status: ModuleLessonStatus;
  description?: string;
  index: number;
  children?: ReactNode;
};

const accents = [
  "from-indigo-500/20 to-transparent",
  "from-violet-500/20 to-transparent",
  "from-fuchsia-500/20 to-transparent",
  "from-sky-500/20 to-transparent",
  "from-emerald-500/15 to-transparent",
] as const;

const statusLabel: Record<ModuleLessonStatus, string> = {
  completed: "Completed",
  current: "In progress",
  available: "Available",
  unpublished: "Coming soon",
};

/**
 * StreamerU module / program card. Status must reflect real completion or publish state — not fake locks.
 */
export function CourseModuleCard({
  programName,
  lessonCount,
  completedCount,
  href,
  status,
  description,
  index,
  children,
}: CourseModuleCardProps) {
  const accent = accents[index % accents.length];
  const disabled = status === "unpublished";

  const inner = (
    <>
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent}`}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            Module {index + 1}
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
        <p className="mt-4 text-sm font-semibold text-foreground/80">
          {completedCount}/{lessonCount} missions done
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted-bg dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-brand transition-[width] duration-500 motion-reduce:transition-none"
            style={{
              width: `${lessonCount > 0 ? Math.min(100, (completedCount / lessonCount) * 100) : 0}%`,
            }}
          />
        </div>
        {children}
        {!disabled ? (
          <p className="mt-4 text-sm font-semibold text-accent dark:text-accent-muted">
            Open module →
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
      className="relative block overflow-hidden rounded-2xl border border-border/80 bg-surface/95 p-6 shadow-sm transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-md motion-reduce:transform-none dark:border-zinc-800 dark:bg-zinc-950/55"
    >
      {inner}
    </Link>
  );
}
