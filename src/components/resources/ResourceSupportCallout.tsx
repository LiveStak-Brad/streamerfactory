/**
 * Subtle mid-article brand reinforcement (not a second CTA wall).
 */
export function ResourceSupportCallout() {
  return (
    <aside
      className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/[0.08] via-surface to-surface p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55)] dark:from-accent/[0.06] dark:via-zinc-900/40 dark:to-zinc-950/80 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-6"
      aria-label="About Streamer Factory"
    >
      <div
        className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-accent/15 blur-2xl dark:bg-accent/10"
        aria-hidden
      />
      <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-accent dark:text-accent-muted">
        Built for creators serious about growth
      </p>
      <p className="relative mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        Streamer Factory is a TikTok LIVE agency: structured onboarding, day-to-day support, and
        strategy so you can show up consistently and scale with intention—not guesswork.
      </p>
    </aside>
  );
}
