"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { approveMemberAction } from "@/lib/profiles/actions";

export function MemberApproveButton({ userId }: { userId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-end gap-2">
      {error ? (
        <p className="text-right text-xs text-rose-600 dark:text-rose-400" role="alert">
          {error}
        </p>
      ) : null}
      <Button
        type="button"
        variant="primary"
        className="min-h-[40px] px-4 text-sm"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const res = await approveMemberAction(userId);
            if (!res.ok) setError(res.error ?? "Could not approve.");
            else router.refresh();
          })
        }
      >
        {pending ? "Approving…" : "Approve as network member"}
      </Button>
    </div>
  );
}
