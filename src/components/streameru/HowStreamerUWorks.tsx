/** Learner-facing path — only steps the assessment system actually supports. */
const STEPS = [
  { title: "Study the lesson", detail: "Read the lesson and use printables when available." },
  { title: "Pass the quiz", detail: "Confirm the concepts before you go LIVE." },
  { title: "Complete the LIVE exam", detail: "Execute the mission on stream, then mark it done." },
  { title: "Pass the Program Final", detail: "Prove the whole program before the certificate." },
  { title: "Earn the Program Certificate", detail: "Missions + final unlock the program credential." },
  { title: "Pass Graduation", detail: "Take the Graduation Exam after the five-program path." },
  { title: "Earn the Diploma", detail: "Unlock the StreamerU Diploma and graduate recognition." },
] as const;

/**
 * Visual “How StreamerU works” path — mirrors PROGRESSION_STEPS without unsupported steps.
 */
export function HowStreamerUWorks() {
  return (
    <section
      id="how-streameru-works"
      className="rounded-2xl border border-border/80 bg-surface/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-8"
      aria-labelledby="how-su-works-heading"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        Path
      </p>
      <h2
        id="how-su-works-heading"
        className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
      >
        How StreamerU works
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        One clear progression from first lesson to diploma. Programs stay open — we recommend order,
        we don&apos;t hard-lock lessons.
      </p>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="relative flex gap-3 rounded-xl border border-border/70 bg-muted-bg/40 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-xs font-bold text-white dark:bg-white dark:text-zinc-950"
              aria-hidden
            >
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{step.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-xs text-muted">
        After the diploma: Manager College is listed on the academy path and coming as StreamerU
        expands — not a published track yet.
      </p>
    </section>
  );
}
