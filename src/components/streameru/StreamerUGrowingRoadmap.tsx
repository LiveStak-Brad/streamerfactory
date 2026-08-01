import { SuProgressBar } from "@/components/streameru/SuProgressBar";
import {
  ACADEMY_RELEASE,
  PLANNED_CURRICULUM_LESSON_COUNT,
  PLANNED_TRACK_COUNT,
  PUBLISHED_LESSON_COUNT,
  getActiveProgramCount,
} from "@/lib/streameru/academy-meta";

const CURRENTLY_BUILDING = [
  { label: "Creator Branding", status: "In Development" },
  { label: "Analytics", status: "In Development" },
  { label: "Leadership", status: "Planned" },
  { label: "Moderation", status: "Planned" },
] as const;

const COMING_NEXT = [
  "Mindset Mastery",
  "Manager College (internal)",
  "Gaming LIVE Mastery (not started)",
] as const;

/**
 * Honest current-vs-future curriculum — software-style “alive” roadmap.
 */
export function StreamerUGrowingRoadmap() {
  const programs = getActiveProgramCount();
  const roadPct = Math.min(
    100,
    (PUBLISHED_LESSON_COUNT / PLANNED_CURRICULUM_LESSON_COUNT) * 100,
  );

  return (
    <section
      className="rounded-2xl border border-dashed border-border/90 bg-gradient-to-br from-accent-soft/40 via-surface to-surface p-6 dark:border-zinc-700 dark:from-accent/10 dark:via-zinc-950 dark:to-zinc-950 sm:p-8"
      aria-labelledby="su-growing-heading"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        Roadmap · {ACADEMY_RELEASE.versionLabel}
      </p>
      <h2
        id="su-growing-heading"
        className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
      >
        StreamerU is growing
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        {ACADEMY_RELEASE.cadence}. Essential safety lives in Beginner Foundations. Advanced Creator,
        Presence Mastery, Content Creation Mastery, Growth Mastery, Community Mastery, Professional
        Creator Mastery, Production Mastery, Battle Mastery, and Music LIVE Mastery are published Mastery-path craft on the road to a{" "}
        {PLANNED_CURRICULUM_LESSON_COUNT}-lesson university curriculum.
      </p>

      <div className="mt-6 rounded-xl border border-border/70 bg-surface/90 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950/60">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-sm font-bold text-foreground">StreamerU Road to 171 Lessons</p>
            <p className="mt-0.5 text-xs text-muted">
              {PUBLISHED_LESSON_COUNT} / {PLANNED_CURRICULUM_LESSON_COUNT} lessons published
            </p>
          </div>
          <p className="text-xs font-semibold tabular-nums text-accent dark:text-accent-muted">
            {Math.round(roadPct)}%
          </p>
        </div>
        <SuProgressBar
          value={roadPct}
          label="Road to 171 lessons"
          trackClassName="h-2.5"
        />
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Coming next</p>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Coming next topics">
          {COMING_NEXT.map((topic) => (
            <li
              key={topic}
              className="inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent/[0.07] px-3 py-1.5 text-xs font-semibold text-foreground dark:border-accent/20 dark:bg-accent/10"
            >
              <span className="text-accent dark:text-accent-muted" aria-hidden>
                ✓
              </span>
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          Currently building
        </p>
        <ul className="mt-3 space-y-2" aria-label="Subjects currently building">
          {CURRENTLY_BUILDING.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-muted-bg/40 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]"
                aria-hidden
              />
              <span className="font-semibold text-foreground">{item.label}</span>
              <span className="ml-auto text-[11px] font-bold uppercase tracking-wider text-muted">
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border/70 bg-surface/90 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/60">
          <dt className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">
            Available now
          </dt>
          <dd className="mt-1 text-lg font-bold tabular-nums text-foreground">
            {PUBLISHED_LESSON_COUNT} lessons
          </dd>
          <p className="mt-0.5 text-xs text-muted">{programs} active programs</p>
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
          <dd className="mt-1 text-lg font-bold text-foreground">Growing</dd>
          <p className="mt-0.5 text-xs text-muted">{ACADEMY_RELEASE.cadence}</p>
        </div>
      </dl>
    </section>
  );
}
