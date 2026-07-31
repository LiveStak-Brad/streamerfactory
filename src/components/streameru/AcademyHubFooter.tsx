import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FIRST_PROGRAM_LESSON_SLUG } from "@/lib/resources/curriculum";
import { FREE_NETWORK } from "@/lib/positioning/free-network";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

type Props = {
  isSignedIn: boolean;
  /** When the learner has device progress, prefer Continue. */
  hasProgress: boolean;
  continueHref?: string | null;
};

/**
 * Academy footer — free education + free network, one account.
 */
export function AcademyHubFooter({ isSignedIn, hasProgress, continueHref }: Props) {
  const lessonOneHref = `/streameru/${FIRST_PROGRAM_LESSON_SLUG}`;
  const primaryHref = hasProgress && continueHref ? continueHref : lessonOneHref;
  const primaryLabel = hasProgress ? "Continue your creator journey" : "Start StreamerU Today";

  if (isSignedIn) {
    return (
      <div className="mt-12 border-t border-border/80 pt-10 dark:border-zinc-800">
        <p className="mb-4 text-sm font-medium text-muted">{FREE_NETWORK.strip}</p>
        <div className="flex flex-wrap gap-3">
          <Button href={primaryHref} variant="primary" className="min-h-[44px] px-5">
            {primaryLabel}
          </Button>
          <Link
            href="/streameru#course-roadmap"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground dark:border-zinc-700"
          >
            Earn Your First Certificate
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
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 border-t border-border/80 pt-10 dark:border-zinc-800">
      <p className="mb-4 text-sm font-medium text-muted">{FREE_NETWORK.strip}</p>
      <div className="flex flex-wrap gap-3">
        <Button
          href={tiktokCreatorNetworkApplyUrl}
          external
          variant="primary"
          className="min-h-[44px] px-5"
        >
          {FREE_NETWORK.joinAndLearnCta}
        </Button>
        <Link
          href={lessonOneHref}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground dark:border-zinc-700"
        >
          Start StreamerU Today
        </Link>
        <Link
          href="/apply"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground dark:border-zinc-700"
        >
          {FREE_NETWORK.applyCta}
        </Link>
        <Link
          href="/founder"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-muted hover:text-foreground"
        >
          Meet the Founder
        </Link>
      </div>
    </div>
  );
}
