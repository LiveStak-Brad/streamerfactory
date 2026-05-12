/**
 * Concise trust copy for the join / website-access page — not legal boilerplate.
 */
export function ApplyTrustSection() {
  return (
    <div className="mt-10 space-y-5">
      <div className="rounded-2xl border border-zinc-200/90 bg-muted-bg/40 px-5 py-5 dark:border-zinc-800 dark:bg-zinc-950/35 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
          Who this is for
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          TikTok LIVE creators who joined (or are joining) the Streamer Factory Creator Network through
          TikTok — and now need the companion website for scheduling, the shared calendar, Battle Finder, and
          StreamerU training.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200/90 bg-muted-bg/40 px-5 py-5 dark:border-zinc-800 dark:bg-zinc-950/35 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
          What happens next
        </p>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-muted">
          <li>TikTok handles Creator Network membership; we don&apos;t replace that step.</li>
          <li>
            This form tells us who you are so we can match your TikTok profile and turn on website access
            manually after verification.
          </li>
          <li>We may follow up by email if we need to confirm details.</li>
          <li>When we promote your login to member, Battle Hub and the rest of the tools unlock here.</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-zinc-200/90 bg-muted-bg/40 px-5 py-5 dark:border-zinc-800 dark:bg-zinc-950/35 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
          What you&apos;re not signing up for
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This isn&apos;t a promise of instant growth or guaranteed income. It&apos;s a professional network
          with real tools — worth it when you&apos;re ready to coordinate LIVE like an operator, not a one-off
          experiment.
        </p>
      </div>
    </div>
  );
}
