"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { completeOnboardingTaskAction } from "@/lib/growth/actions";

export type OnboardingTaskView = {
  id: string;
  key: string;
  title: string;
  description: string | null;
  href: string | null;
  required: boolean;
  completed_at: string | null;
  sort_order: number;
};

export function OnboardingChecklistClient({
  initialTasks,
}: {
  initialTasks: OnboardingTaskView[];
}) {
  const [tasks, setTasks] = useState(initialTasks);
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function markDone(taskKey: string) {
    setError(null);
    setPendingKey(taskKey);
    startTransition(() => {
      void completeOnboardingTaskAction(taskKey).then((res) => {
        setPendingKey(null);
        if ("error" in res && res.error) {
          setError(res.error);
          return;
        }
        setTasks((prev) =>
          prev.map((t) =>
            t.key === taskKey ? { ...t, completed_at: t.completed_at ?? new Date().toISOString() } : t,
          ),
        );
      });
    });
  }

  return (
    <div className="space-y-3">
      {error ? (
        <p className="rounded-xl border border-rose-200/80 bg-rose-50/80 px-4 py-3 text-sm text-rose-950 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-100">
          {error}
        </p>
      ) : null}
      <ul className="space-y-2">
        {tasks.map((task) => {
          const done = Boolean(task.completed_at);
          return (
            <li
              key={task.id}
              className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-surface/90 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-950/45"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span
                  className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                    done
                      ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-200"
                      : "bg-muted-bg text-muted"
                  }`}
                >
                  {done ? "✓" : "○"}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground">
                    {task.title}
                    {!task.required ? (
                      <span className="ml-2 text-[0.65rem] font-semibold uppercase tracking-wider text-muted">
                        Optional
                      </span>
                    ) : null}
                  </p>
                  {task.description ? (
                    <p className="mt-1 text-xs leading-relaxed text-muted">{task.description}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
                {task.href ? (
                  <Link
                    href={task.href}
                    className="inline-flex min-h-[40px] items-center rounded-xl border border-border/80 px-3 text-sm font-semibold text-foreground hover:border-accent/40 dark:border-zinc-700"
                  >
                    Open
                  </Link>
                ) : null}
                {!done ? (
                  <button
                    type="button"
                    disabled={pending && pendingKey === task.key}
                    onClick={() => markDone(task.key)}
                    className="inline-flex min-h-[40px] items-center rounded-xl bg-accent px-3 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-60"
                  >
                    Mark done
                  </button>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
