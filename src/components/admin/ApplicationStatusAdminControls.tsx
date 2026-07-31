"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { setApplicationStatusAction } from "@/lib/applications/actions";
import type { ApplicationPipelineStatus } from "@/lib/applications/types";
import { approveMemberAction } from "@/lib/profiles/actions";

type Props = {
  applicationId: string;
  userId: string | null;
  status: ApplicationPipelineStatus;
};

export function ApplicationStatusAdminControls({ applicationId, userId, status }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState<"approve" | "reject" | "review" | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (status === "approved" || status === "rejected") {
    return null;
  }

  function runStatus(next: ApplicationPipelineStatus) {
    if (next === "rejected" && !confirm("Reject this application?")) return;
    setError(null);
    setBusy(next === "rejected" ? "reject" : "review");
    startTransition(async () => {
      const res = await setApplicationStatusAction(applicationId, next);
      setBusy(null);
      if (!res.ok) {
        setError(res.error ?? "Could not update");
        return;
      }
      router.refresh();
    });
  }

  function runApprove() {
    if (!userId) {
      setError("No linked account — this application cannot be approved until the user signs up.");
      return;
    }
    if (!confirm("Approve this applicant as a network member?")) return;
    setError(null);
    setBusy("approve");
    startTransition(async () => {
      const res = await approveMemberAction(userId);
      setBusy(null);
      if (!res.ok) {
        setError(res.error ?? "Could not approve");
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="mt-4 border-t border-border/70 pt-4 dark:border-zinc-800">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">Pipeline</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {status === "submitted" ? (
          <button
            type="button"
            disabled={pending}
            onClick={() => runStatus("in_review")}
            className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-border/90 bg-surface px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-muted-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950"
          >
            {busy === "review" ? "Updating…" : "Mark in review"}
          </button>
        ) : null}
        <button
          type="button"
          disabled={pending || !userId}
          onClick={runApprove}
          title={userId ? undefined : "No linked account"}
          className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-60 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100 dark:hover:bg-emerald-950/60"
        >
          {busy === "approve" ? "Approving…" : "Approve"}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => runStatus("rejected")}
          className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-900 transition hover:bg-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 disabled:opacity-60 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-100 dark:hover:bg-rose-950/60"
        >
          {busy === "reject" ? "Rejecting…" : "Reject"}
        </button>
      </div>
      {error ? <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{error}</p> : null}
      {!userId ? (
        <p className="mt-3 text-xs text-muted">
          No linked account on this application — Approve stays off until they sign up.
        </p>
      ) : null}
    </div>
  );
}
