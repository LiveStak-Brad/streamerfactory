import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ApplyTrustSection } from "@/components/apply/ApplyTrustSection";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { hasActiveNonRejectedApplication } from "@/lib/applications/helpers";
import { getMyApplication } from "@/lib/applications/queries";
import { canScheduleBattles } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Join the TikTok LIVE Creator Network",
  description:
    "Join the Streamer Factory Creator Network on TikTok, then request website access for Battle Hub, scheduling, and StreamerU training.",
  path: "/apply",
  keywords: [
    "join TikTok LIVE agency",
    "TikTok Creator Network apply",
    "Streamer Factory application",
  ],
  ogImage: "/branding/og/join.png",
});

export default async function ApplyPage() {
  const session = await getSessionProfile();

  if (session?.profile && canScheduleBattles(session.profile.role)) {
    return (
      <Section className="!pt-12 sm:!pt-16">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
            Membership
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
            You&apos;re already in the network
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
            This page is for creators who still need TikTok Creator Network or website access. Your account
            already has member tools — use{" "}
            <Link
              href="/streameru"
              className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
            >
              StreamerU
            </Link>{" "}
            for training and{" "}
            <Link
              href="/battle-hub"
              className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
            >
              Battle Hub
            </Link>{" "}
            for scheduling and battles.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/streameru" variant="primary" className="min-h-[52px] px-8">
              Open StreamerU
            </Button>
            <Button href="/battle-hub" variant="secondary" className="min-h-[52px] px-8">
              Open Battle Hub
            </Button>
            <Button href={tiktokCreatorNetworkApplyUrl} external variant="secondary" className="min-h-[52px] px-8">
              TikTok Creator Network page
            </Button>
            <Button href="/" variant="secondary" className="min-h-[52px] px-8">
              Back to home
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  let existingApplication = null as Awaited<ReturnType<typeof getMyApplication>>;
  if (session?.user && !canScheduleBattles(session.profile?.role)) {
    try {
      existingApplication = await getMyApplication(session.user.id);
    } catch {
      existingApplication = null;
    }
    if (hasActiveNonRejectedApplication(existingApplication)) {
      redirect("/application-status");
    }
  }

  const isResubmitAfterReject = existingApplication?.status === "rejected";

  return (
    <Section className="!pt-10 sm:!pt-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-border/80 bg-gradient-to-b from-accent-soft/50 to-surface px-5 py-7 dark:border-zinc-800 dark:from-accent/10 dark:to-zinc-950/60 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Join Streamer Factory
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
          Creator Network on TikTok, then this site
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
          Membership in the{" "}
          <strong className="font-semibold text-foreground">TikTok Creator Network</strong> runs through
          TikTok&apos;s official flow. After you&apos;re in, use the form below so we can match your account and
          manually grant access to{" "}
          <Link href="/battle-hub" className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted">
            Battle Hub
          </Link>
          , scheduling, and{" "}
          <Link href="/streameru" className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted">
            StreamerU
          </Link>{" "}
          on this website.
        </p>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-200/90 bg-muted-bg/50 p-6 dark:border-zinc-800 dark:bg-zinc-950/40 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            Step 1 · TikTok Creator Network
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Apply on TikTok first — invitations and review happen there. This is the only path to join the
            Creator Network itself.
          </p>
          <Button
            href={tiktokCreatorNetworkApplyUrl}
            external
            variant="primary"
            className="mt-6 min-h-[52px] px-8"
          >
            Open TikTok Creator Network →
          </Button>
          <p className="mt-4 text-sm text-muted">
            Opens{" "}
            <span className="break-all font-medium text-foreground">{tiktokCreatorNetworkApplyUrl}</span> in a
            new tab.
          </p>
        </div>

        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            Step 2 · Website access
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Send your contact details
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            After TikTok accepts you into the network, submit this form (sign in required) so our team can verify
            you and turn on member tools here. Track progress anytime on{" "}
            <Link
              href="/application-status"
              className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
            >
              Application status
            </Link>
            .
          </p>
        </div>

        <ApplyTrustSection />

        {session?.user && !canScheduleBattles(session.profile?.role) && !isResubmitAfterReject ? (
          <p className="mt-6 text-sm leading-relaxed text-muted">
            You&apos;re signed in — track your request on{" "}
            <Link
              href="/application-status"
              className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
            >
              application status
            </Link>
            .
          </p>
        ) : null}

        {isResubmitAfterReject ? (
          <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 px-5 py-5 dark:border-zinc-700 dark:bg-zinc-900/40 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              New submission
            </p>
            <p className="mt-2 text-base font-medium text-foreground">You&apos;re submitting again</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              We&apos;ll use the answers below as your updated website access request. After you submit,
              you&apos;ll go to{" "}
              <Link
                href="/application-status"
                className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
              >
                application status
              </Link>
              .
            </p>
          </div>
        ) : null}

        {!session?.user ? (
          <div className="mt-12 rounded-2xl border border-zinc-200/90 bg-surface p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.65)_inset,0_8px_32px_-28px_rgba(15,23,42,0.12)] dark:border-zinc-800 dark:bg-zinc-950/40 dark:shadow-none">
            <p className="text-base font-medium text-foreground">Sign in to continue</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Create an account or log in with the email you want tied to website access. The form opens after
              you&apos;re signed in.
            </p>
            <Button href="/login?next=/apply" variant="primary" className="mt-6">
              Sign in to continue
            </Button>
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.65)_inset,0_8px_32px_-28px_rgba(15,23,42,0.12)] sm:p-10 dark:border-zinc-800 dark:bg-zinc-950/40 dark:shadow-none">
            <ApplyForm />
          </div>
        )}
      </div>
    </Section>
  );
}
