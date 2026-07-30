"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { cancelBattleEventAction, deleteBattleEventAction } from "@/lib/battle-hub/admin-actions";

type Props = {
  eventId: string;
  status: string;
};

export function AdminCalendarEventActions({ eventId, status }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const canCancel = status === "scheduled";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/admin/calendar/${eventId}/edit`}
        className="rounded-lg border border-border/90 px-3 py-1.5 text-sm font-semibold text-foreground transition hover:bg-muted-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-zinc-700"
      >
        Edit
      </Link>
      {canCancel ? (
        <button
          type="button"
          disabled={pending}
          className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-950 transition hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:opacity-60 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100 dark:hover:bg-amber-950/70"
          onClick={() =>
            startTransition(async () => {
              await cancelBattleEventAction(eventId);
              router.refresh();
            })
          }
        >
          Cancel
        </button>
      ) : null}
      <button
        type="button"
        disabled={pending}
        className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-900 transition hover:bg-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 disabled:opacity-60 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200 dark:hover:bg-rose-950/70"
        onClick={() => {
          if (!confirm("Permanently delete this event and all participants?")) return;
          startTransition(async () => {
            await deleteBattleEventAction(eventId);
            router.refresh();
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}
