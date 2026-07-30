"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  /** Visible label when idle */
  label: string;
  pendingLabel?: string;
  confirmMessage: string;
  onConfirm: () => Promise<{ ok: boolean; error?: string } | void>;
  /** Visual treatment */
  variant?: "danger-text" | "danger-button";
  className?: string;
};

/**
 * Destructive action with confirm() + pending + error — use for delete/remove.
 */
export function AdminConfirmAction({
  label,
  pendingLabel = "Working…",
  confirmMessage,
  onConfirm,
  variant = "danger-text",
  className = "",
}: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const run = () => {
    if (!confirm(confirmMessage)) return;
    setError(null);
    startTransition(async () => {
      const res = await onConfirm();
      if (res && !res.ok) setError(res.error ?? "Action failed.");
    });
  };

  if (variant === "danger-button") {
    return (
      <div className={`flex flex-col items-end gap-2 ${className}`}>
        {error ? (
          <p className="text-right text-xs text-rose-600 dark:text-rose-400" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="button"
          disabled={pending}
          onClick={run}
          className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-900 transition hover:bg-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 disabled:opacity-60 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200 dark:hover:bg-rose-950/70"
        >
          {pending ? pendingLabel : label}
        </button>
      </div>
    );
  }

  return (
    <div className={`mt-4 flex flex-col items-end gap-2 ${className}`}>
      {error ? (
        <p className="text-right text-xs text-rose-600 dark:text-rose-400" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="button"
        disabled={pending}
        onClick={run}
        className="text-sm font-semibold text-muted underline-offset-2 transition hover:text-rose-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60 dark:hover:text-rose-400"
      >
        {pending ? pendingLabel : label}
      </button>
    </div>
  );
}

/** Thin wrapper kept for call sites that want design-system Button primary CTAs. */
export function AdminPrimaryActionButton({
  children,
  pending,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  pending?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="primary"
      className="min-h-[40px] px-4 text-sm"
      disabled={disabled || pending}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
