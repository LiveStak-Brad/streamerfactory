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
      className="inline-flex items-center rounded-xl border border-zinc-200/90 bg-muted-bg/60 p-0.5 text-xs font-semibold dark:border-zinc-700 dark:bg-zinc-900/60"
      role="group"
      aria-label="Network view preview"
    >
      <button
        type="button"
        disabled={pending}
        onClick={() => setMode("visitor")}
        className={`rounded-lg px-2.5 py-1.5 transition sm:px-3 ${
          mode === "visitor"
            ? "bg-surface text-zinc-950 shadow-sm dark:bg-zinc-950 dark:text-zinc-50"
            : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        }`}
      >
        Visitor
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => setMode("member")}
        className={`rounded-lg px-2.5 py-1.5 transition sm:px-3 ${
          mode === "member"
            ? "bg-surface text-zinc-950 shadow-sm dark:bg-zinc-950 dark:text-zinc-50"
            : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        }`}
      >
        Member
      </button>
    </div>
  );
}
