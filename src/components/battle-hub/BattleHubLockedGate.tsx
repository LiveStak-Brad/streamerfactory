import Link from "next/link";
import { BattleHubFlyerTemplateShowcase } from "@/components/battle-hub/BattleHubFlyerTemplateShowcase";
import { Container } from "@/components/ui/Container";

type Props = {
  /** `guest` = signed out; `pending` = signed in but not yet approved as a network member. */
  variant?: "guest" | "pending";
  sessionEmail?: string;
  /** Applicant has a non-rejected application on file (show status link vs apply). */
  hasActiveApplication?: boolean;
};

export function BattleHubLockedGate({
  variant = "guest",
  sessionEmail,
  hasActiveApplication = false,
}: Props) {
  const isPending = variant === "pending";

  return (
    <div className="relative pb-24 pt-14 sm:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(480px,70vh)] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(91, 59, 255,0.16),transparent_65%)]"
        aria-hidden
      />
      <Container className="relative max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Network tools
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          Battle Hub
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Schedule TikTok LIVE battles, generate share-ready flyers, and keep your crew aligned on a shared
          calendar — so you&apos;re not chasing dates across DMs. This is a member workspace; approval keeps
          the network intentional.
        </p>

        {isPending ? (
          <div className="mt-8 rounded-2xl border border-amber-200/90 bg-amber-50/90 px-5 py-6 dark:border-amber-900/50 dark:bg-amber-950/30 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-200">
              Membership pending
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-amber-950/90 dark:text-amber-100/95">
              You&apos;re signed in, but Battle Hub stays locked until staff approves you as a member — same
              tools everyone sees below, but your real battles, flyers, and calendar sync unlock after
              approval. That&apos;s how we keep scheduling and coordination inside the network.
            </p>
            {sessionEmail && (
              <p className="mt-3 text-xs text-amber-900/80 dark:text-amber-200/80">
                Signed in as <span className="font-medium">{sessionEmail}</span>
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={hasActiveApplication ? "/application-status" : "/apply"}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-amber-300/90 bg-surface px-5 py-2.5 text-sm font-semibold text-amber-950 dark:border-amber-800 dark:bg-zinc-950 dark:text-amber-100"
              >
                {hasActiveApplication ? "View application status" : "Join FREE"}
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
              — see where you are in the approval process.
            </p>
          </div>
        ) : null}

        <div className={`mt-8 flex flex-wrap gap-3 ${isPending ? "opacity-95" : ""}`}>
          {!isPending && (
            <>
              <Link
                href="/login?next=%2Fbattle-hub"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
              >
                Sign in
              </Link>
              <Link
                href="/login?next=%2Fapplication-status"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
              >
                Sign in to track application
              </Link>
            </>
          )}
          <Link
            href="/apply"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
          >
            Apply to Streamer Factory
          </Link>
          <Link
            href="/battle-hub/scheduler"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
          >
            Preview scheduler (demo UI)
          </Link>
          <Link
            href="/battle-hub/calendar"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
          >
            Preview calendar
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-200/90 bg-muted-bg/40 px-5 py-6 dark:border-zinc-800 dark:bg-zinc-950/40 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            {isPending ? "What unlocks after approval" : "Why members only"}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {isPending
              ? "Once promoted to member, you get the full scheduler, live network calendar, Battle Finder, and saved battles — the same rails we use to run LIVE with less friction than ad‑hoc group chats. Below is the public template preview everyone sees."
              : "Scheduling, the full flyer builder, and the live network calendar unlock after you sign in with an approved member account — so everyone on the calendar is part of the same network. Below you can preview layouts — no account required."}
          </p>
        </div>

        <BattleHubFlyerTemplateShowcase
          className="mt-14 border-t border-zinc-200/80 pt-14 dark:border-zinc-800/80"
          heading="Battle advertisement templates"
          intro={
            <p className="mt-2 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
              Preview how share-ready battle ads render for 1v1, free-for-all, and 2v2. Same 9:16 story frame
              for each; four-person samples use identical handles so you can compare layouts.
            </p>
          }
        />

        <p className="mt-10 text-center text-xs text-zinc-500">
          <Link href="/battle-hub/calendar" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            Calendar
          </Link>{" "}
          and{" "}
          <Link href="/battle-hub/scheduler" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            scheduler demos
          </Link>{" "}
          {isPending
            ? "use sample data until your account is approved as a member."
            : "use sample data until you sign in as a member."}
        </p>
      </Container>
    </div>
  );
}
