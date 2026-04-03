import Link from "next/link";
import { CURRICULUM_TOTAL_LESSONS, curriculumByProgram } from "@/lib/resources/curriculum";

/**
 * Full program map on the StreamerU hub — strict order, school-style.
 */
export function CurriculumOutline({ className = "" }: { className?: string }) {
  const groups = curriculumByProgram();

  return (
    <section
      id="curriculum"
      className={`scroll-mt-28 border-t border-zinc-200/80 pt-14 dark:border-zinc-800/80 lg:pt-16 ${className}`}
      aria-labelledby="curriculum-outline-heading"
    >
      <div className="max-w-3xl">
        <h2
          id="curriculum-outline-heading"
          className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          Full curriculum ({CURRICULUM_TOTAL_LESSONS} lessons in order)
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          The single training sequence for StreamerU — each lesson is study + execution (a real TikTok LIVE). Follow in
          order; difficulty and time on LIVE increase as you progress.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        {groups.map(({ programName, lessons }) => (
          <div key={programName}>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{programName}</h3>
            <ol className="mt-4 list-none space-y-2 border-l-2 border-accent/30 pl-4 dark:border-accent/25">
              {lessons.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/streameru/${l.slug}`}
                    className="group inline-flex flex-wrap items-baseline gap-x-2 text-sm"
                  >
                    <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                      {l.globalOrder}.
                    </span>
                    <span className="font-semibold text-zinc-800 group-hover:text-accent dark:text-zinc-200 dark:group-hover:text-accent-muted">
                      {l.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
