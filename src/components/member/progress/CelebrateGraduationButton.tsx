"use client";

import { useState, useTransition } from "react";
import { celebrateGraduationAction } from "@/lib/growth/actions";

export function CelebrateGraduationButton() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="space-y-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
        <p className="text-base font-bold text-emerald-800 dark:text-emerald-200">
          Congratulations. You are now a StreamerU Graduate.
        </p>
        <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80">
          Your profile now shows StreamerU Diploma · Certified LIVE Creator. Your name has been
          added to Hall of Fame → StreamerU Graduates. Career Path: StreamerU Graduate.
        </p>
        <a
          href="/hall-of-fame#streameru-graduates-heading"
          className="inline-flex text-sm font-semibold text-accent underline-offset-2 hover:underline"
        >
          View StreamerU Graduates
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            const result = await celebrateGraduationAction();
            if ("error" in result) {
              setError(result.error);
              return;
            }
            setDone(true);
          });
        }}
        className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-accent px-5 text-sm font-bold text-white transition hover:bg-accent-hover disabled:opacity-60"
      >
        {pending ? "Celebrating…" : "Claim your StreamerU Diploma"}
      </button>
      {error ? <p className="text-xs text-rose-600 dark:text-rose-300">{error}</p> : null}
    </div>
  );
}
