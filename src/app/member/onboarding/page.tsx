import Link from "next/link";
import { Container } from "@/components/ui/Container";
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
    href: t.href,
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

  return (
    <div className="border-b border-border/70 bg-muted-bg/40 pb-16 pt-8 dark:border-zinc-800 dark:bg-zinc-950/50 sm:pt-10">
      <Container className="max-w-3xl space-y-8">
        <header className="space-y-3">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
            Getting started
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your onboarding checklist
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Finish these steps once — progress saves to your account and follows you across devices.
          </p>
          <p className="text-sm font-semibold text-foreground">
            {percent}% complete · {requiredDone}/{requiredTotal} required
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-muted-bg dark:bg-zinc-900">
            <div
              className="h-full rounded-full bg-accent transition-[width]"
              style={{ width: `${percent}%` }}
            />
          </div>
        </header>

        <OnboardingChecklistClient initialTasks={tasksForClient} />

        <p className="text-sm text-muted">
          Prefer to explore first?{" "}
          <Link href="/member/dashboard" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            Go to your dashboard
          </Link>
          .
        </p>
      </Container>
    </div>
  );
}
