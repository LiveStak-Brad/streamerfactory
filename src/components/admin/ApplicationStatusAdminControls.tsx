"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { setApplicationStatusAction } from "@/lib/applications/actions";
import type { ApplicationPipelineStatus } from "@/lib/applications/types";

type Props = {
  applicationId: string;
  status: ApplicationPipelineStatus;
};

export function ApplicationStatusAdminControls({ applicationId, status }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (status === "approved" || status === "rejected") {
    return null;
  }

  function run(next: ApplicationPipelineStatus) {
    setError(null);
    startTransition(async () => {
      const res = await setApplicationStatusAction(applicationId, next);
      if (!res.ok) {
        setError(res.error ?? "Could not update");
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="mt-4 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/80">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Pipeline
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {status === "submitted" ? (
          <button
            type="button"
            disabled={pending}
            onClick={() => run("in_review")}
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Mark in review
          </button>
        ) : null}
        <button
          type="button"
          disabled={pending}
          onClick={() => run("rejected")}
          className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-900 transition hover:bg-rose-100 disabled:opacity-60 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-100 dark:hover:bg-rose-950/60"
        >
          Reject
        </button>
      </div>
      {error ? <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p> : null}
      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
        Approve accounts from{" "}
        <a href="/admin/members" className="font-semibold text-accent hover:underline dark:text-accent-muted">
          Members
        </a>
        .
      </p>
    </div>
  );
}
