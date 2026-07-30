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
      className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl border border-border/80 px-3 text-sm font-semibold text-muted transition-colors hover:border-accent/40 hover:text-foreground disabled:opacity-60 dark:border-zinc-700"
    >
      {pending ? "Saving…" : "Mark read"}
    </button>
  );
}
