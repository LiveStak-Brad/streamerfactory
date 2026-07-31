import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FIRST_PROGRAM_LESSON_SLUG } from "@/lib/resources/curriculum";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

type Props = {
  isSignedIn: boolean;
  /** When the learner has device progress, prefer Continue. */
  hasProgress: boolean;
  continueHref?: string | null;
};

/**
 * Academy-first footer actions. TikTok network path stays available but is not dominant.
 */
export function AcademyHubFooter({ isSignedIn, hasProgress, continueHref }: Props) {
  const lessonOneHref = `/streameru/${FIRST_PROGRAM_LESSON_SLUG}`;
  const primaryHref = hasProgress && continueHref ? continueHref : lessonOneHref;
  const primaryLabel = hasProgress ? "Continue Learning" : "Start Lesson 1";

  if (isSignedIn) {
    return (
      <div className="mt-12 flex flex-wrap gap-3 border-t border-border/80 pt-10 dark:border-zinc-800">
        <Button href={primaryHref} variant="primary" className="min-h-[44px] px-5">
          {primaryLabel}
        </Button>
        <Link
          href="/streameru#course-roadmap"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground dark:border-zinc-700"
        >
          Browse the Course Roadmap
        </Link>
        <Link
          href="/streameru/library"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground dark:border-zinc-700"
        >
          Open Resource Library
        </Link>
        <Link
          href="/founder"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground dark:border-zinc-700"
        >
          Meet the Founder
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-muted hover:text-foreground"
        >
          Join Streamer Factory
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-12 flex flex-wrap gap-3 border-t border-border/80 pt-10 dark:border-zinc-800">
      <Button href={lessonOneHref} variant="primary" className="min-h-[44px] px-5">
        Start Learning Free
      </Button>
      <Link
        href="/streameru#course-roadmap"
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground dark:border-zinc-700"
      >
        Browse StreamerU
      </Link>
      <Link
        href="/founder"
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground dark:border-zinc-700"
      >
        Meet the Founder
      </Link>
      <Link
        href="/apply"
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground dark:border-zinc-700"
      >
        Join the Network
      </Link>
      <a
        href={tiktokCreatorNetworkApplyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-muted hover:text-foreground"
      >
        TikTok Creator Network
      </a>
    </div>
  );
}
