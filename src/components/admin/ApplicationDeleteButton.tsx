"use client";

import { useState, useTransition } from "react";
import { deleteApplicationAction } from "@/lib/applications/actions";

export function ApplicationDeleteButton({ applicationId }: { applicationId: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mt-4 flex flex-col items-end gap-2">
      {error ? (
        <p className="text-right text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const res = await deleteApplicationAction(applicationId);
            if (!res.ok) setError(res.error ?? "Could not delete.");
          })
        }
        className="text-sm font-semibold text-zinc-500 underline-offset-2 transition hover:text-red-600 hover:underline dark:text-zinc-400 dark:hover:text-red-400"
      >
        {pending ? "Removing…" : "Remove from list"}
      </button>
    </div>
  );
}
