"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { syncStreamerUMediaBriefsAction } from "@/lib/streameru-media/actions";

export function SyncBriefsButton() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-start gap-1">
      <Button
        type="button"
        variant="secondary"
        className="min-h-[40px] px-4 text-sm"
        disabled={pending}
        onClick={() => {
          setMessage(null);
          startTransition(async () => {
            const result = await syncStreamerUMediaBriefsAction();
            if (!result.ok) {
              setMessage(result.error ?? "Sync failed");
              return;
            }
            setMessage(`Synced ${result.inserted ?? 0} brief rows`);
          });
        }}
      >
        {pending ? "Syncing…" : "Sync production briefs to DB"}
      </Button>
      {message ? <p className="text-xs text-muted">{message}</p> : null}
    </div>
  );
}
