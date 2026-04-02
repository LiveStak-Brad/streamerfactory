"use client";

import { useTransition } from "react";
import { approveMemberAction } from "@/lib/profiles/actions";

export function MemberApproveButton({ userId }: { userId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await approveMemberAction(userId);
        })
      }
      className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
    >
      {pending ? "Approving…" : "Approve as network member"}
    </button>
  );
}
