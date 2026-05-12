import type { Metadata } from "next";
import Link from "next/link";
import { ResourceBreadcrumb } from "@/components/resources/ResourceBreadcrumb";
import { StreamerUContinueGuidance } from "@/components/guidance/StreamerUContinueGuidance";
import { Button } from "@/components/ui/Button";
import { FIRST_PROGRAM_LESSON_SLUG, getCurriculumLesson } from "@/lib/resources/curriculum";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "StreamerU",
  description:
    "Structured TikTok LIVE training — Streamer University from Streamer Factory. One curriculum, 24 lessons.",
};

export default function StreamerUPage() {
  const lesson1 = getCurriculumLesson(FIRST_PROGRAM_LESSON_SLUG);
  const lesson1Title = lesson1?.title ?? "Lesson 1";

  return (
    <div className="max-w-3xl">
      <ResourceBreadcrumb items={[{ label: "Home", href: "/" }, { label: "StreamerU" }]} />

      <header className="mt-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Streamer University
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          StreamerU
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          A single course path: 24 lessons from setup through advanced LIVE work. Use the outline on the left to move in
          order — study, then execute each session on stream.
        </p>
      </header>

      <StreamerUContinueGuidance />

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/streameru/start-here"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-md transition-[transform,box-shadow] hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950"
        >
          Start your training
        </Link>
        <Link
          href={`/streameru/${FIRST_PROGRAM_LESSON_SLUG}`}
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-200/90 bg-surface px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:border-accent/40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        >
          Open lesson 1 · {lesson1Title}
        </Link>
      </div>

      <section className="mt-14 rounded-2xl border border-zinc-200/90 bg-surface/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-8">
        <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">How this course works</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <li>
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">Learning</strong> — concepts and
            explanation in each lesson page.
          </li>
          <li>
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">Execution</strong> — a real TikTok LIVE
            mission after each lesson; mark the session complete when you&apos;re done.
          </li>
          <li>
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">Tracks</strong> — beginner, battles,
            growth, etc. appear as context on each lesson; the order is always the numbered path in the sidebar.
          </li>
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap gap-3 border-t border-zinc-200/80 pt-10 dark:border-zinc-800">
        <Button href={tiktokCreatorNetworkApplyUrl} external variant="primary" className="min-h-[44px] px-5">
          Join on TikTok
        </Button>
        <Link
          href="/apply"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200/90 px-5 py-2.5 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-200"
        >
          Request website access
        </Link>
        <Link
          href="/about"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200/90 px-5 py-2.5 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-200"
        >
          How we support creators
        </Link>
      </div>
    </div>
  );
}
