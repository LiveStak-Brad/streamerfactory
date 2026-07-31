import {
  ACADEMY_RELEASE,
  PLANNED_CURRICULUM_LESSON_COUNT,
  PUBLISHED_LESSON_COUNT,
  getPublishedAcademyStudyHoursLabel,
} from "@/lib/streameru/academy-meta";

/**
 * Premium statistic cards for the academy hub — facts only.
 */
export function AcademyStatCards() {
  const studyHours = getPublishedAcademyStudyHoursLabel();

  const stats = [
    {
      value: String(PUBLISHED_LESSON_COUNT),
      label: "Lessons available",
      detail: ACADEMY_RELEASE.versionLabel,
    },
    {
      value: String(PLANNED_CURRICULUM_LESSON_COUNT),
      label: "Lessons planned",
      detail: "University roadmap",
    },
    {
      value: studyHours.replace(/^~/, ""),
      label: "Complete program",
      detail: "Study time · current academy",
    },
    { value: "100%", label: "Creators never pay", detail: "Free forever" },
    { value: "6+", label: "Platforms mastered", detail: undefined },
    { value: "100Ks", label: "Earned LIVE", detail: "Hundreds of thousands" },
  ] as const;

  return (
    <section aria-labelledby="su-stats-heading">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 id="su-stats-heading" className="text-sm font-bold text-foreground">
          {ACADEMY_RELEASE.currentReleaseLabel}
        </h2>
        <p className="text-xs font-semibold text-muted">
          {PUBLISHED_LESSON_COUNT} lessons · {ACADEMY_RELEASE.cadence}
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <li
            key={stat.label}
            className="rounded-2xl border border-border/80 bg-gradient-to-b from-surface to-muted-bg/50 px-3 py-4 text-center shadow-sm transition-[transform,border-color] hover:-translate-y-0.5 hover:border-accent/30 motion-reduce:transform-none dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-900/40 sm:px-4 sm:py-5"
          >
            <p className="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted">
              {stat.label}
            </p>
            {stat.detail ? (
              <p className="mt-0.5 text-[11px] text-zinc-500">{stat.detail}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
