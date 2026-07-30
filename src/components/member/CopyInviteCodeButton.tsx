"use client";

import { useState } from "react";

export function CopyInviteCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void onCopy()}
      className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-border/80 bg-muted-bg/50 px-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 dark:border-zinc-700"
      aria-label={`Copy invite code ${code}`}
    >
      <span className="font-mono tracking-wide">{code}</span>
      <span className="text-xs text-accent dark:text-accent-muted">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
