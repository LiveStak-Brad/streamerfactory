import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MemberPageHeader } from "@/components/member/MemberPageHeader";
import { getSessionProfile } from "@/lib/auth/server";
import {
  getOnboardingChecklist,
  syncOnboardingChecklist,
} from "@/lib/growth/onboarding/checklist";
import { OnboardingChecklistClient } from "@/components/member/onboarding/OnboardingChecklistClient";

export const metadata = {
  title: "Member onboarding",
  description: "Complete your Streamer Factory onboarding checklist.",
};

export const dynamic = "force-dynamic";

export default async function MemberOnboardingPage() {
  const session = await getSessionProfile();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }

  await syncOnboardingChecklist(userId).catch(() => undefined);
  const checklist = await getOnboardingChecklist(userId);
  const tasksForClient = checklist.map((t) => ({
    id: t.task_id,
    key: t.key,
    title: t.title,
    description: t.description,
    href: t.href === "/member/onboarding" ? null : t.href,
    required: t.required,
    completed_at: t.completed_at,
    sort_order: t.sort_order,
  }));
  const completed = checklist.filter((t) => t.completed_at).length;
  const requiredTotal = checklist.filter((t) => t.required).length;
  const requiredDone = checklist.filter((t) => t.required && t.completed_at).length;
  const percent = checklist.length
    ? Math.round((completed / checklist.length) * 100)
    : 0;
  const allRequiredDone = requiredTotal > 0 && requiredDone === requiredTotal;

  return (
    <div className="border-b border-border/70 bg-muted-bg/40 pb-16 pt-8 dark:border-zinc-800 dark:bg-zinc-950/50 sm:pt-10">
      <Container className="max-w-3xl space-y-8">
        <MemberPageHeader
          eyebrow="Getting started"
          title="Your onboarding checklist"
          description="Finish these steps once — progress saves to your account and follows you across devices."
        />

        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">
            {percent}% complete · {requiredDone}/{requiredTotal} required
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-muted-bg dark:bg-zinc-900">
            <div
              className="h-full rounded-full bg-accent transition-[width]"
              style={{ width: `${percent}%` }}
              aria-hidden
            />
          </div>
        </div>

        {allRequiredDone ? (
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 px-5 py-5 dark:border-emerald-900/40 dark:bg-emerald-950/25">
            <p className="text-base font-bold text-emerald-950 dark:text-emerald-100">
              You&apos;re ready for the Factory
            </p>
            <p className="mt-1 text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-100/80">
              Required checklist items are done. Head to your dashboard for today&apos;s missions.
            </p>
            <Link
              href="/member/dashboard"
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
            >
              Go to dashboard
            </Link>
          </div>
        ) : null}

        <OnboardingChecklistClient initialTasks={tasksForClient} />
      </Container>
    </div>
  );
}
