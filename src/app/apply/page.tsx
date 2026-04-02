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

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to join Streamer Factory — TikTok LIVE creator agency for recruitment, training, and growth.",
};

export default async function ApplyPage() {
  const session = await getSessionProfile();

  if (session?.profile && canScheduleBattles(session.profile.role)) {
    redirect("/welcome");
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
    <Section className="!pt-12 sm:!pt-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Membership application
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
          Apply to Streamer Factory
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
          This is your <strong className="font-semibold text-foreground">application</strong> — not member
          onboarding. After approval, you&apos;ll use <Link href="/welcome" className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted">Getting started</Link> to set up your
          profile, resources, and battles.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted sm:text-xl">
          Tell us about your TikTok LIVE presence. We review every application and follow up when there’s a
          potential fit. Sign in first so we can tie your submission to your account — then track status on{" "}
          <Link
            href="/application-status"
            className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
          >
            Application status
          </Link>
          .
        </p>

        <ApplyTrustSection />

        {session?.user && !canScheduleBattles(session.profile?.role) && !isResubmitAfterReject ? (
          <p className="mt-6 text-sm leading-relaxed text-muted">
            You&apos;re signed in — track where you are anytime on{" "}
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
            <p className="mt-2 text-base font-medium text-foreground">You&apos;re applying again</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              We&apos;ll use the answers below as your updated application. After you submit, you&apos;ll go
              to{" "}
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
            <p className="text-base font-medium text-foreground">Sign in to apply</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Create an account or log in with the email you will use as a creator. The application form
              opens after you are signed in.
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
