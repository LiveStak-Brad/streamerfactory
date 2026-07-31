import {
  PLANNED_CURRICULUM_LESSON_COUNT,
  PLANNED_TRACK_COUNT,
  PUBLISHED_LESSON_COUNT,
  getPublishedProgramCount,
} from "@/lib/streameru/academy-meta";

const UPCOMING_SUBJECTS = [
  "Equipment & production",
  "Moderation",
  "Creator business",
  "Analytics",
  "Music creators",
  "Manager leadership",
] as const;

/**
 * Honest current-vs-future curriculum clarity — does not invent release dates.
 */
export function StreamerUGrowingRoadmap() {
  const programs = getPublishedProgramCount();

  return (
    <section
      className="rounded-2xl border border-dashed border-border/90 bg-gradient-to-br from-accent-soft/40 via-surface to-surface p-6 dark:border-zinc-700 dark:from-accent/10 dark:via-zinc-950 dark:to-zinc-950 sm:p-8"
      aria-labelledby="su-growing-heading"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        Roadmap
      </p>
      <h2
        id="su-growing-heading"
        className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
      >
        StreamerU is growing
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        The academy you can take today is real and complete for its published path. The university
        roadmap expands beginner-to-professional tracks over time — without claiming unpublished
        lessons are live.
      </p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border/70 bg-surface/90 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/60">
          <dt className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">
            Available now
          </dt>
          <dd className="mt-1 text-lg font-bold tabular-nums text-foreground">
            {PUBLISHED_LESSON_COUNT} lessons
          </dd>
          <p className="mt-0.5 text-xs text-muted">{programs} programs published</p>
        </div>
        <div className="rounded-xl border border-border/70 bg-surface/90 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/60">
          <dt className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">
            Curriculum roadmap
          </dt>
          <dd className="mt-1 text-lg font-bold tabular-nums text-foreground">
            {PLANNED_CURRICULUM_LESSON_COUNT} lessons
          </dd>
          <p className="mt-0.5 text-xs text-muted">{PLANNED_TRACK_COUNT} tracks planned</p>
        </div>
        <div className="rounded-xl border border-border/70 bg-surface/90 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/60">
          <dt className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">Status</dt>
          <dd className="mt-1 text-lg font-bold text-foreground">Expanding</dd>
          <p className="mt-0.5 text-xs text-muted">New lessons added continually</p>
        </div>
      </dl>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          Upcoming subjects in development
        </p>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Upcoming subject areas">
          {UPCOMING_SUBJECTS.map((subject) => (
            <li
              key={subject}
              className="rounded-lg border border-border/70 bg-muted-bg/50 px-3 py-1.5 text-xs font-semibold text-foreground/90 dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              {subject}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
