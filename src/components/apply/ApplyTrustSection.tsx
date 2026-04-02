/**
 * Concise trust copy for the Apply page — not legal boilerplate.
 */
export function ApplyTrustSection() {
  return (
    <div className="mt-10 space-y-5">
      <div className="rounded-2xl border border-zinc-200/90 bg-muted-bg/40 px-5 py-5 dark:border-zinc-800 dark:bg-zinc-950/35 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
          Who this is for
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          TikTok LIVE creators who want structure — consistent shows, clear communication, and help thinking
          about growth and income like a business. We review fit, not just follower count.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200/90 bg-muted-bg/40 px-5 py-5 dark:border-zinc-800 dark:bg-zinc-950/35 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
          What happens next
        </p>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-muted">
          <li>We confirm we received your answers — you can track status anytime after you sign in.</li>
          <li>Our team reviews fit and readiness; we may follow up by email with questions.</li>
          <li>If we move forward, we promote your account to member and you complete short onboarding.</li>
          <li>
            Then Battle Hub, scheduling, the shared calendar, Battle Finder, and member resources unlock in the
            app.
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-zinc-200/90 bg-muted-bg/40 px-5 py-5 dark:border-zinc-800 dark:bg-zinc-950/35 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
          What you&apos;re not signing up for
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This isn&apos;t a promise of instant growth or guaranteed income. It&apos;s a professional network
          with real tools — worth it when you&apos;re ready to coordinate LIVE like an operator, not a
          one‑off experiment.
        </p>
      </div>
    </div>
  );
}
