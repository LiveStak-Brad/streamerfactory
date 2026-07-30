"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setOwnerNetworkViewModeAction } from "@/lib/auth/network-view-actions";
import type { OwnerNetworkViewMode } from "@/lib/auth/network-view";

type Props = {
  mode: OwnerNetworkViewMode;
};

export function NetworkViewToggle({ mode }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function setMode(next: OwnerNetworkViewMode) {
    if (next === mode) return;
    startTransition(async () => {
      await setOwnerNetworkViewModeAction(next);
      router.refresh();
    });
  }

  return (
    <div
      className="inline-flex w-full items-center rounded-lg bg-muted-bg p-0.5 text-[0.7rem] font-semibold dark:bg-zinc-900"
      role="group"
      aria-label="Owner network view preview"
    >
      <button
        type="button"
        disabled={pending}
        onClick={() => setMode("visitor")}
        className={`flex-1 rounded-md px-2 py-1.5 transition ${
          mode === "visitor"
            ? "bg-surface text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
            : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        }`}
      >
        Visitor
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => setMode("member")}
        className={`flex-1 rounded-md px-2 py-1.5 transition ${
          mode === "member"
            ? "bg-surface text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
            : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        }`}
      >
        Member
      </button>
    </div>
  );
}
