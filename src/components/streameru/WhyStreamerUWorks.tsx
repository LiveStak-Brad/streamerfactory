const CARDS = [
  {
    title: "Learn from real experience",
    body: "Built from years of livestreaming across multiple platforms — not theory written for clicks.",
  },
  {
    title: "Avoid beginner mistakes",
    body: "Structure, pacing, and safety habits that stop costly early errors before they compound.",
  },
  {
    title: "Grow faster",
    body: "Retention, battles, and consistency systems designed for creators who show up weekly.",
  },
  {
    title: "Protect your account",
    body: "Essential rules and safety sit in Program 1 — before you stream regularly.",
  },
  {
    title: "Build long-term income",
    body: "Goals, gifts, and habits that support sustainable LIVE income — not one-off spikes.",
  },
] as const;

/**
 * Social-proof / why-it-works section — experience-led, not hype-led.
 */
export function WhyStreamerUWorks() {
  return (
    <section
      className="rounded-2xl border border-border/80 bg-surface/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-8"
      aria-labelledby="why-su-works-heading"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        Why StreamerU works
      </p>
      <h2
        id="why-su-works-heading"
        className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
      >
        Built from real-world LIVE testing
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        This academy packages hard-won livestreaming experience into free lessons, quizzes, LIVE
        exams, printables, and certificates — so new creators don&apos;t have to learn every lesson
        the expensive way.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <li
            key={card.title}
            className="rounded-xl border border-border/70 bg-muted-bg/40 p-4 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-accent/30 motion-reduce:transform-none dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <h3 className="text-sm font-bold text-foreground">{card.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">{card.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
