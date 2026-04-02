import type { Metadata } from "next";
import Link from "next/link";

import { BattleFinderNewForm } from "@/components/battle-finder/BattleFinderNewForm";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "New battle request",
  description: `Post a battle partner request on ${site.name}.`,
};

export default function BattleFinderNewPage() {
  return (
    <div className="relative pb-24 pt-14 sm:pt-20">
      <Container className="relative max-w-2xl">
        <Link
          href="/battle-hub/finder"
          className="text-sm font-semibold text-zinc-500 transition hover:text-accent dark:hover:text-accent-muted"
        >
          ← Battle Finder
        </Link>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Post a battle request</h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          You&apos;ll occupy the first slot. Other members can join open spots — when everyone&apos;s in, head to the
          scheduler with one click.
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-200/90 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40 sm:p-8">
          <BattleFinderNewForm />
        </div>
      </Container>
    </div>
  );
}
