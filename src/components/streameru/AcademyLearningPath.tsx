const PATH = [
  "Setup",
  "Safety",
  "Streaming",
  "Growth",
  "Battles",
  "Monetization",
  "Advanced Creator",
  "Manager College",
  "Hall of Fame",
] as const;

/**
 * Compact learning-path story for the academy hub.
 */
export function AcademyLearningPath() {
  return (
    <section
      className="rounded-2xl border border-border/80 bg-surface/80 p-5 dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-6"
      aria-labelledby="su-path-heading"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        Learning path
      </p>
      <h2
        id="su-path-heading"
        className="mt-1 text-lg font-bold tracking-tight text-foreground sm:text-xl"
      >
        From first LIVE to Hall of Fame
      </h2>
      <ol className="mt-5 flex flex-wrap items-center gap-1.5">
        {PATH.map((step, index) => (
          <li key={step} className="flex items-center gap-1.5">
            <span className="inline-flex items-center rounded-lg border border-border/70 bg-muted-bg/50 px-2.5 py-1.5 text-xs font-bold text-foreground dark:border-zinc-700 dark:bg-zinc-900/50">
              {step}
            </span>
            {index < PATH.length - 1 ? (
              <span className="text-xs font-bold text-accent/70 dark:text-accent-muted/80" aria-hidden>
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
