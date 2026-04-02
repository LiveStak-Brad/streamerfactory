import Link from "next/link";

import { Container } from "@/components/ui/Container";

type Props = {
  variant: "guest" | "pending";
  sessionEmail?: string;
  hasActiveApplication?: boolean;
};

export function BattleFinderLockedGate({ variant, sessionEmail, hasActiveApplication = false }: Props) {
  const isPending = variant === "pending";

  return (
    <div className="relative pb-24 pt-14 sm:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(420px,65vh)] bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(99,102,241,0.14),transparent_65%)]"
        aria-hidden
      />
      <Container className="relative max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Battle Finder
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          Member access only
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Battle Finder is where members post open battle requests and fill slots — before anything hits the
          shared calendar. Less back-and-forth in group chats; more clarity for your crew.
        </p>

        {isPending ? (
          <div className="mt-8 rounded-2xl border border-amber-200/90 bg-amber-50/90 px-5 py-6 dark:border-amber-900/50 dark:bg-amber-950/30 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-200">
              Membership pending
            </p>
            <p className="mt-3 text-sm leading-relaxed text-amber-950/90 dark:text-amber-100/95">
              Once staff approves you as a member, you can browse requests, join slots, and promote matches
              into real calendar events. Until then, use the buttons below — we&apos;ll route you to Apply or
              Application status based on whether you&apos;ve already submitted.
            </p>
            {sessionEmail ? (
              <p className="mt-3 text-xs text-amber-900/80 dark:text-amber-200/80">
                Signed in as <span className="font-medium">{sessionEmail}</span>
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={hasActiveApplication ? "/application-status" : "/apply"}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-amber-300/90 bg-surface px-5 py-2.5 text-sm font-semibold text-amber-950 dark:border-amber-800 dark:bg-zinc-950 dark:text-amber-100"
              >
                {hasActiveApplication ? "View application status" : "Apply to join"}
              </Link>
              <Link
                href="/auth/signout"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-amber-900/90 underline-offset-2 hover:underline dark:text-amber-200"
              >
                Sign out
              </Link>
            </div>
            <p className="mt-4 text-sm text-amber-900/85 dark:text-amber-200/85">
              <Link
                href="/application-status"
                className="font-semibold text-amber-950 underline-offset-2 hover:underline dark:text-amber-100"
              >
                Application status
              </Link>{" "}
              — same place as Battle Hub: one source of truth for your review.
            </p>
          </div>
        ) : (
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/login?next=%2Fbattle-hub%2Ffinder"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
            >
              Sign in
            </Link>
            <Link
              href="/login?next=%2Fapplication-status"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
            >
              Track an application
            </Link>
            <Link
              href="/apply"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
            >
              Apply
            </Link>
            <Link
              href="/battle-hub"
              className="inline-flex min-h-[48px] items-center justify-center px-4 py-3 text-sm font-semibold text-zinc-600 hover:text-accent dark:text-zinc-400 dark:hover:text-accent-muted"
            >
              ← Battle Hub
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
