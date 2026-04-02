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
        className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-semibold text-zinc-800 hover:bg-muted-bg dark:border-zinc-700 dark:text-zinc-200"
      >
        Edit
      </Link>
      {canCancel && (
        <button
          type="button"
          disabled={pending}
          className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-950 hover:bg-amber-100 disabled:opacity-60 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100 dark:hover:bg-amber-950/70"
          onClick={() =>
            startTransition(async () => {
              await cancelBattleEventAction(eventId);
              router.refresh();
            })
          }
        >
          Cancel
        </button>
      )}
      <button
        type="button"
        disabled={pending}
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-900 hover:bg-red-100 disabled:opacity-60 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200 dark:hover:bg-red-950/70"
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
