import type { Metadata } from "next";
import Link from "next/link";

import { ApplicationStatusPanel } from "@/components/applications/ApplicationStatusPanel";
import { Section } from "@/components/ui/Section";
import { getMyApplication } from "@/lib/applications/queries";
import { resolveApplicationUi } from "@/lib/applications/status";
import { getSessionProfile } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Application status",
  description:
    "Track your Streamer Factory website access request after joining the TikTok Creator Network — from submission to member tools.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/application-status" },
};

export const dynamic = "force-dynamic";

export default async function ApplicationStatusPage() {
  const session = await getSessionProfile();

  if (!session) {
    return (
      <Section className="!pt-12 sm:!pt-16">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
            Membership
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Application status
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Sign in to see your website access request and next steps. New to the process? Start on{" "}
            <Link
              href="/apply"
              className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
            >
              Join
            </Link>
            .
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login?next=%2Fapplication-status"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
            >
              Sign in
            </Link>
            <Link
              href="/apply"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
            >
              Join &amp; request access
            </Link>
          </div>
        </div>
      </Section>
    );
  }

  let application = null;
  try {
    application = await getMyApplication(session.user.id);
  } catch {
    application = null;
  }

  const ui = resolveApplicationUi(session.profile?.role ?? null, application);

  return (
    <Section className="!pt-12 sm:!pt-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Membership
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Application status
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          From website access request to full tools — training stays available before and after approval.{" "}
          <Link href="/streameru/start-here" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            Start your training
          </Link>{" "}
          and{" "}
          <Link href="/streameru" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            StreamerU
          </Link>{" "}
          anytime; Battle Hub unlocks once site access is approved.
        </p>

        <div className="mt-10">
          <ApplicationStatusPanel ui={ui} email={session.user.email} />
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="font-semibold text-zinc-600 hover:underline dark:text-zinc-300">
            Home
          </Link>
          {" · "}
          <Link href="/about" className="font-semibold text-zinc-600 hover:underline dark:text-zinc-300">
            About
          </Link>
          {" · "}
          Questions?{" "}
          <Link href="/contact" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            Contact
          </Link>
        </p>
      </div>
    </Section>
  );
}
