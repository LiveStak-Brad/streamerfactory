import Link from "next/link";
import { BattleSchedulerWizard } from "@/components/battle-hub/BattleSchedulerWizard";
import { Container } from "@/components/ui/Container";
import { requireBattleScheduler } from "@/lib/auth/server";

export default async function NewBattlePage() {
  await requireBattleScheduler("/battle-hub/scheduler/new");

  return (
    <section className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <Link
          href="/battle-hub/scheduler"
          className="text-sm font-semibold text-zinc-500 hover:text-accent dark:hover:text-accent-muted"
        >
          ← Scheduler
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
          New battle / event
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Walk through format, creators, schedule, and flyer—then save to the network calendar.
        </p>
        <div className="mt-10 rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40 sm:p-8">
          <BattleSchedulerWizard />
        </div>
      </Container>
    </section>
  );
}
