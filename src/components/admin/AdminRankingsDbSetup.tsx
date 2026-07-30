"use client";

import { useState, useTransition } from "react";
import { AdminAlert } from "@/components/admin/ui/AdminAlert";

export function AdminRankingsDbSetup({ tablesMissing }: { tablesMissing: boolean }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!tablesMissing) return null;

  return (
    <AdminAlert title="Database setup required" tone="warning">
      <p>
        Rankings tables are not available yet. Either paste{" "}
        <code className="rounded bg-black/5 px-1 dark:bg-white/10">supabase/apply-rankings-now.sql</code>{" "}
        in Supabase SQL Editor, or set{" "}
        <code className="rounded bg-black/5 px-1 dark:bg-white/10">SUPABASE_DB_URL</code> on the server
        and run setup below.
      </p>
      {error ? (
        <p className="mt-3 text-sm font-medium text-rose-700 dark:text-rose-300" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="mt-3 text-sm font-medium text-emerald-800 dark:text-emerald-200">{message}</p>
      ) : null}
      <button
        type="button"
        disabled={pending}
        className="mt-4 rounded-xl bg-amber-900 px-4 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:opacity-60 dark:bg-amber-100 dark:text-amber-950"
        onClick={() =>
          startTransition(async () => {
            setError(null);
            setMessage(null);
            const res = await fetch("/api/admin/apply-rankings-migration", { method: "POST" });
            const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
            if (!res.ok || !data.ok) {
              setError(data.error ?? "Setup failed.");
              return;
            }
            setMessage(data.message ?? "Done. Reload this page.");
            window.location.reload();
          })
        }
      >
        {pending ? "Applying…" : "Apply rankings migration (server)"}
      </button>
    </AdminAlert>
  );
}
