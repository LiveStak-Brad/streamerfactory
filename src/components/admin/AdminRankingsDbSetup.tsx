"use client";

import { useState, useTransition } from "react";

export function AdminRankingsDbSetup({ tablesMissing }: { tablesMissing: boolean }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!tablesMissing) return null;

  return (
    <div className="mb-8 rounded-2xl border border-amber-200/90 bg-amber-50/80 p-5 dark:border-amber-900/50 dark:bg-amber-950/30">
      <p className="font-semibold text-amber-950 dark:text-amber-100">Database setup required</p>
      <p className="mt-2 text-sm text-amber-900/90 dark:text-amber-200/90">
        Rankings tables are not available yet. Either paste{" "}
        <code className="rounded bg-amber-100/80 px-1 dark:bg-amber-900/40">supabase/apply-rankings-now.sql</code> in
        Supabase SQL Editor, or set <code className="rounded bg-amber-100/80 px-1 dark:bg-amber-900/40">SUPABASE_DB_URL</code>{" "}
        on the server and run setup below.
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
        className="mt-4 rounded-xl bg-amber-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 dark:bg-amber-100 dark:text-amber-950"
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
    </div>
  );
}
