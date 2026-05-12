"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { refreshTikTokStatsAction, type TikTokRefreshState } from "@/lib/tiktok/actions";
import { Button } from "@/components/ui/Button";

function SubmitRefresh() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" className="min-h-[44px] px-5" disabled={pending}>
      {pending ? "Refreshing…" : "Refresh TikTok stats"}
    </Button>
  );
}

export function TikTokRefreshForm() {
  const [state, formAction] = useActionState(refreshTikTokStatsAction, {
    ok: true,
    refreshed: false,
  } as TikTokRefreshState);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <SubmitRefresh />
      {state && !state.ok && state.error ? (
        <p className="text-sm font-medium text-rose-700 dark:text-rose-300" role="alert">
          {state.error}
        </p>
      ) : null}
      {state?.refreshed ? (
        <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">Stats updated.</p>
      ) : null}
    </form>
  );
}
