import Link from "next/link";
import { BattleHubFlyerTemplateShowcase } from "@/components/battle-hub/BattleHubFlyerTemplateShowcase";
import { Container } from "@/components/ui/Container";

export function BattleHubMemberHome() {
  return (
    <div className="relative pb-24 pt-14 sm:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(420px,65vh)] bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(99,102,241,0.14),transparent_65%)]"
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
          Schedule LIVE battles with flexible headcounts and formats, drop a branded flyer, and publish to
          the shared calendar. Built so a future Battle Finder can match creators on the same data.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/battle-hub/scheduler"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
          >
            Open scheduler
          </Link>
          <Link
            href="/battle-hub/calendar"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
          >
            Network calendar
          </Link>
          <Link
            href="/resources"
            className="inline-flex min-h-[48px] items-center justify-center px-4 py-3 text-sm font-semibold text-zinc-600 hover:text-accent dark:text-zinc-400 dark:hover:text-accent-muted"
          >
            Resources
          </Link>
        </div>

        <BattleHubFlyerTemplateShowcase
          className="mt-16 border-t border-zinc-200/80 pt-14 dark:border-zinc-800/80"
          heading="Flyer preview (example)"
        />
      </Container>
    </div>
  );
}
