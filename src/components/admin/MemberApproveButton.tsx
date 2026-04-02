"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { approveMemberAction } from "@/lib/profiles/actions";

export function MemberApproveButton({ userId }: { userId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-end gap-2">
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
            const res = await approveMemberAction(userId);
            if (!res.ok) setError(res.error ?? "Could not approve.");
            else router.refresh();
          })
        }
        className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        {pending ? "Approving…" : "Approve as network member"}
      </button>
    </div>
  );
}
