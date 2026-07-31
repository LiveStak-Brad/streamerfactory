"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { SuProgressBar } from "@/components/streameru/SuProgressBar";
import { brandAssets } from "@/lib/brand/assets";
import { CURRICULUM_TOTAL_LESSONS } from "@/lib/resources/curriculum";
import {
  countCompletedLessons,
  subscribeStreamerUProgress,
} from "@/lib/resources/streameru-progress";

type Props = {
  /** Compact variant for lesson footers */
  variant?: "full" | "compact";
  className?: string;
};

let cached = 0;
let cachedKey = "";

function readCompleted(): number {
  const n = countCompletedLessons();
  const key = String(n);
  if (key === cachedKey) return cached;
  cachedKey = key;
  cached = n;
  return cached;
}

/**
 * Graduate certificate progress — uses real device-local mission completions only.
 */
export function StreamerUCertificatePanel({ variant = "full", className = "" }: Props) {
  const completed = useSyncExternalStore(
    subscribeStreamerUProgress,
    readCompleted,
    () => 0,
  );
  const percent =
    CURRICULUM_TOTAL_LESSONS > 0 ? (completed / CURRICULUM_TOTAL_LESSONS) * 100 : 0;
  const graduated = completed >= CURRICULUM_TOTAL_LESSONS;

  if (variant === "compact" && completed === 0) return null;

  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-[#0b0a12] via-[#12101c] to-[#0b0f1a] p-6 text-zinc-50 shadow-sm sm:p-8 ${className}`}
      aria-labelledby="su-certificate-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_0%,rgba(91,59,255,0.28),transparent_55%)]"
        aria-hidden
      />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative mx-auto h-24 w-24 shrink-0 sm:mx-0 sm:h-28 sm:w-28">
          {/* eslint-disable-next-line @next/next/no-img-element -- local SVG badge; next/image SVG requires special config */}
          <img
            src={brandAssets.badges.streameruGraduate}
            alt="StreamerU Graduate badge"
            width={112}
            height={112}
            className={`h-full w-full object-contain ${graduated ? "" : "opacity-40 grayscale"}`}
          />
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent-muted">
            Credential
          </p>
          <h2
            id="su-certificate-heading"
            className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            {graduated ? "StreamerU Graduate" : "StreamerU Graduate Certificate"}
          </h2>
          {graduated ? (
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              You completed all {CURRICULUM_TOTAL_LESSONS} Live Exams on this device. Wear the graduate
              badge with pride — keep sharpening on the Battle Hub.
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Complete every Live Exam in the 24-lesson academy to unlock your StreamerU Graduate
                credential on this device.
              </p>
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-xs font-semibold text-zinc-400">
                  <span>Progress toward certificate</span>
                  <span className="tabular-nums text-zinc-200">
                    {completed}/{CURRICULUM_TOTAL_LESSONS}
                  </span>
                </div>
                <SuProgressBar
                  value={percent}
                  label="Certificate progress"
                  trackClassName="h-2 bg-white/10"
                />
              </div>
            </>
          )}
          <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
            <Link
              href="/streameru"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-[transform] hover:-translate-y-0.5"
            >
              {graduated ? "Back to academy" : "View course roadmap"}
            </Link>
            {graduated ? (
              <Link
                href="/battle-hub"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40"
              >
                Battle Hub →
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
