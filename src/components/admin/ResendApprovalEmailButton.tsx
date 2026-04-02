"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  userId: string;
};

export function ResendApprovalEmailButton({ userId }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Drop stale messages after navigation or deploy (older errors looked like the button was still broken).
  useEffect(() => {
    setError(null);
    setSuccess(false);
  }, [userId]);

  return (
    <div className="flex flex-col items-end gap-2">
      <Button
        type="button"
        variant="primary"
        disabled={pending}
        title="Send the membership-approved welcome email again"
        className="!min-h-[40px] !px-4 !py-2 !text-sm"
        onClick={() =>
          startTransition(async () => {
            setError(null);
            setSuccess(false);
            const url = new URL("/api/admin/resend-approval-email", window.location.origin).href;
            const res = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "same-origin",
              cache: "no-store",
              body: JSON.stringify({ userId }),
            });
            const data = (await res.json().catch(() => ({}))) as {
              ok?: boolean;
              error?: string;
              checks?: {
                apiKeyPresent?: boolean;
                transactionalFromPresent?: boolean;
                fromEmailPresent?: boolean;
              };
            };
            if (!res.ok || !data.ok) {
              let msg = data.error ?? "Could not send.";
              if (data.checks) {
                msg += ` [env: apiKey=${data.checks.apiKeyPresent ? "yes" : "no"}, transactionalFrom=${data.checks.transactionalFromPresent ? "yes" : "no"}, fromEmail=${data.checks.fromEmailPresent ? "yes" : "no"}]`;
              }
              setError(msg);
              return;
            }
            setSuccess(true);
            router.refresh();
          })
        }
      >
        {pending ? "Sending…" : "Resend approval email"}
      </Button>
      {error ? (
        <p className="max-w-[280px] text-right text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="text-right text-xs font-medium text-emerald-700 dark:text-emerald-400" role="status">
          Sent
        </p>
      ) : null}
    </div>
  );
}
