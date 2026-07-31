"use client";

import Link from "next/link";
import { TrackedCta } from "@/components/analytics/TrackedCta";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { trackClientEvent } from "@/lib/analytics/client";

/**
 * End-of-article conversion block: primary path to Apply, secondary paths for trust + depth.
 */
export function ResourceArticleCta() {
  function trackResourceCta(href: string, cta: string) {
    trackClientEvent({
      event: AnalyticsEvents.RESOURCE_CTA_CLICKED,
      metadata: { href, cta, location: "resource_article_cta" },
    });
  }

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-zinc-950 px-6 py-10 text-zinc-50 shadow-[0_28px_90px_-50px_rgba(91,59,255,0.65)] dark:border-zinc-800/90 dark:bg-zinc-950 sm:px-10 sm:py-12"
      aria-labelledby="resource-cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_80%_0%,rgba(91,59,255,0.35),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent dark:from-black/40"
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-muted">
          Free academy · Free creator network
        </p>
        <h2
          id="resource-cta-heading"
          className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          Join Streamer Factory FREE
        </h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          Membership is free. StreamerU is included. Get structure, coaching, community, rankings, and
          Battle Hub without paying membership fees — creators never pay us.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <TrackedCta
            href="/apply"
            variant="inverse"
            className="min-h-[48px] px-6"
            eventMetadata={{ location: "resource_article_cta", cta: "apply" }}
          >
            Apply to join the free creator network
          </TrackedCta>
          <Link
            href="/guides/tiktok-live-agency"
            onClick={() => trackResourceCta("/guides/tiktok-live-agency", "agency_guide")}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/10"
          >
            TikTok LIVE Agency guide
          </Link>
          <Link
            href="/streameru/start-here"
            onClick={() => trackResourceCta("/streameru/start-here", "start_here")}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/10"
          >
            Start your training
          </Link>
          <Link
            href="/guides"
            onClick={() => trackResourceCta("/guides", "guides_hub")}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
          >
            All guides
          </Link>
        </div>
      </div>
    </section>
  );
}
