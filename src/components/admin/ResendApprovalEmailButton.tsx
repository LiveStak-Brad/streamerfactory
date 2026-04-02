"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  userId: string;
};

export function ResendApprovalEmailButton({ userId }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex flex-col items-end gap-1">
      {error ? (
        <p className="max-w-[260px] text-right text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="text-right text-xs font-medium text-emerald-700 dark:text-emerald-400" role="status">
          Sent
        </p>
      ) : null}
      <button
        type="button"
        disabled={pending}
        title="Send the membership-approved welcome email again"
        onClick={() =>
          startTransition(async () => {
            setError(null);
            setSuccess(false);
            const res = await fetch("/api/admin/resend-approval-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId }),
            });
            const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
            if (!res.ok || !data.ok) {
              setError(data.error ?? "Could not send.");
              return;
            }
            setSuccess(true);
            router.refresh();
          })
        }
        className="inline-flex min-h-[36px] items-center justify-center rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
      >
        {pending ? "Sending…" : "Resend approval email"}
      </button>
    </div>
  );
}
