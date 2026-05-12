import Link from "next/link";
import type { ReactNode } from "react";

import type { ResolvedApplicationUi } from "@/lib/applications/status";
import { formatApplicationSubmitted } from "@/lib/applications/format-submitted";
import { Button } from "@/components/ui/Button";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

type Props = {
  ui: ResolvedApplicationUi;
  email?: string | null;
};

function Card({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "muted" | "positive" | "attention";
}) {
  const tones = {
    default:
      "border-zinc-200/90 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/40",
    muted: "border-zinc-200/80 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/30",
    positive:
      "border-emerald-200/90 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/25",
    attention:
      "border-amber-200/90 bg-amber-50/60 dark:border-amber-900/40 dark:bg-amber-950/20",
  } as const;
  return (
    <div className={`rounded-2xl border p-6 shadow-sm sm:p-8 ${tones[tone]}`}>
      {children}
    </div>
  );
}

export function ApplicationStatusPanel({ ui, email }: Props) {
  if (ui.kind === "not_applied") {
    return (
      <Card tone="muted">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Status · Not submitted
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          No website request yet
        </h2>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Join the <strong className="font-semibold text-zinc-800 dark:text-zinc-200">TikTok Creator Network</strong>{" "}
          through TikTok first — then send your contact details from the Join page so we can manually enable
          Battle Hub, scheduling, and StreamerU on this site. Read{" "}
          <Link href="/about" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            About
          </Link>{" "}
          for how the agency fits together.
        </p>
        {email ? (
          <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
            Signed in as <span className="font-medium text-zinc-700 dark:text-zinc-300">{email}</span>
          </p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            href={tiktokCreatorNetworkApplyUrl}
            external
            variant="primary"
            className="min-h-[48px] px-6"
          >
            Join on TikTok →
          </Button>
          <Button href="/apply" variant="secondary" className="min-h-[48px] px-6">
            Request website access
          </Button>
        </div>
      </Card>
    );
  }

  if (ui.kind === "submitted") {
    return (
      <Card tone="attention">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800/90 dark:text-amber-200/90">
          Status · Received
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          We have your website access request
        </h2>
        <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          Thanks — our team will verify your TikTok Creator Network membership and match you to this
          account. We&apos;ll use the email on your login if we need anything else — no need to resubmit unless
          we ask.
        </p>
        {ui.submittedAt ? (
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Submitted {formatApplicationSubmitted(ui.submittedAt)}
          </p>
        ) : null}
        <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          While you wait: skim{" "}
          <Link href="/streameru/start-here" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            Start your training
          </Link>
          , browse{" "}
          <Link href="/streameru" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            StreamerU
          </Link>
          , and read{" "}
          <Link
            href="/streameru/what-to-expect-when-you-apply"
            className="font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            what to expect when you apply
          </Link>{" "}
          and{" "}
          <Link href="/about" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            About
          </Link>{" "}
          — scheduling and member-only tools unlock after we approve site access.
        </p>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          Tip: keep an eye on the email tied to your account; that&apos;s where we&apos;ll reach out if we need
          more detail.
        </p>
      </Card>
    );
  }

  if (ui.kind === "in_review") {
    return (
      <Card tone="attention">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800/90 dark:text-amber-200/90">
          Status · In review
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Your website access request is in review
        </h2>
        <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          The team is actively reviewing your details and Creator Network verification. There&apos;s nothing
          else you need to do unless we contact you.
        </p>
        {ui.submittedAt ? (
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Submitted {formatApplicationSubmitted(ui.submittedAt)}
          </p>
        ) : null}
        <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          While you wait: explore{" "}
          <Link href="/streameru/start-here" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            Start your training
          </Link>
          ,{" "}
          <Link
            href="/streameru/what-to-expect-when-you-apply"
            className="font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            what to expect when you apply
          </Link>
          , and{" "}
          <Link href="/streameru" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            StreamerU
          </Link>{" "}
          so you&apos;re ready when access opens. See{" "}
          <Link href="/about" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            About
          </Link>{" "}
          for how the network fits together.
        </p>
      </Card>
    );
  }

  if (ui.kind === "rejected") {
    return (
      <Card tone="muted">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Status · Not moving forward
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          We&apos;re not moving forward right now
        </h2>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Thank you for your interest in Streamer Factory. This decision isn&apos;t a reflection of your
          worth as a creator — timing and fit matter, and we can only take on so many partners at once.
        </p>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          You&apos;re welcome to try again later if your situation changes (TikTok Creator Network first, then
          a new website access request from the Join page). We read every submission.
        </p>
        {ui.submittedAt ? (
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Last update {formatApplicationSubmitted(ui.submittedAt)}
          </p>
        ) : null}
        <Link
          href="/apply"
          className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-950 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-50"
        >
          Submit a new website access request
        </Link>
      </Card>
    );
  }

  /* approved */
  if (ui.accessUnlocked) {
    return (
      <Card tone="positive">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800/90 dark:text-emerald-200/90">
          Status · Approved
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          You&apos;re in — welcome to the network
        </h2>
        <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          TikTok Creator Network is separate from this site — you now have member tools here too. Start with
          StreamerU training, then open Battle Hub when you&apos;re ready to schedule.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/streameru"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
          >
            Open StreamerU
          </Link>
          <Link
            href="/battle-hub"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-emerald-800/20 px-6 py-3 text-sm font-semibold text-emerald-950 dark:border-emerald-700/50 dark:text-emerald-100"
          >
            Battle Hub
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card tone="positive">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800/90 dark:text-emerald-200/90">
        Status · Approved
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        You&apos;re approved — finishing setup
      </h2>
      <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        Your website access shows as approved. If member tools aren&apos;t visible yet, refresh the page or sign
        out and back in with {email ? <span className="font-medium">{email}</span> : "your account"}.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/streameru"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
        >
          Open StreamerU
        </Link>
        <Link
          href="/auth/signout"
          prefetch={false}
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-400"
        >
          Sign out
        </Link>
      </div>
    </Card>
  );
}
