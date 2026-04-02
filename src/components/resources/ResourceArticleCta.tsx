import Link from "next/link";

/**
 * End-of-article conversion block: primary path to Apply, secondary paths for trust + depth.
 */
export function ResourceArticleCta() {
  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-zinc-950 px-6 py-10 text-zinc-50 shadow-[0_28px_90px_-50px_rgba(99,102,241,0.65)] dark:border-zinc-800/90 dark:bg-zinc-950 sm:px-10 sm:py-12"
      aria-labelledby="resource-cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_80%_0%,rgba(99,102,241,0.35),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent dark:from-black/40" aria-hidden />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-muted">
          Ready for real support?
        </p>
        <h2
          id="resource-cta-heading"
          className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          Take the next step with Streamer Factory
        </h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          If you want structure, coaching, and a team behind your TikTok LIVE growth, apply and
          tell us where you are today—we will take it from there.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/apply"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-xl"
          >
            Apply now
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/10"
          >
            About Streamer Factory
          </Link>
          <Link
            href="/resources"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
          >
            More resources
          </Link>
        </div>
      </div>
    </section>
  );
}
