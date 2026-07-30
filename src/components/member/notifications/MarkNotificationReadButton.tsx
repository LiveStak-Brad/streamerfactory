"use client";

import { useTransition } from "react";
import { markNotificationReadAction } from "@/lib/growth/actions";

export function MarkNotificationReadButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => void markNotificationReadAction(id))}
      className="shrink-0 rounded-lg border border-border/80 px-2 py-1 text-xs font-semibold text-muted hover:text-foreground disabled:opacity-60 dark:border-zinc-700"
    >
      Mark read
    </button>
  );
}
