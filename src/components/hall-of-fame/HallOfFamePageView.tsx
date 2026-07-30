import Link from "next/link";
import { FactoryLegends } from "@/components/hall-of-fame/FactoryLegends";
import { MonthlyArchive } from "@/components/hall-of-fame/MonthlyArchive";
import { MonthlyChampions } from "@/components/hall-of-fame/MonthlyChampions";
import { NetworkLeadership } from "@/components/hall-of-fame/NetworkLeadership";
import { Button } from "@/components/ui/Button";
import { getHallOfFamePageData } from "@/lib/hall-of-fame/queries";

export async function HallOfFamePageView() {
  const data = await getHallOfFamePageData();

  return (
    <div className="relative overflow-hidden border-b border-white/5 bg-[#0b0a12] text-zinc-50">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-15%,rgba(251,191,36,0.16),transparent_50%),radial-gradient(ellipse_55%_45%_at_95%_15%,rgba(160,32,240,0.28),transparent_50%),radial-gradient(ellipse_50%_40%_at_5%_70%,rgba(91,59,255,0.22),transparent_50%),radial-gradient(ellipse_40%_30%_at_80%_85%,rgba(255,46,209,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden
      />

      <header className="relative border-b border-white/10 px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200/90">Legacy</p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            Factory Hall of Fame
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Celebrate creators, preserve network history, and compete for a permanent place in
            Streamer Factory lore.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/rankings" variant="primary">
              View live rankings
            </Button>
            <Link
              href="#monthly-champions-heading"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse champions
            </Link>
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6 sm:py-16 lg:space-y-24 lg:px-8">
        <NetworkLeadership managers={data.managers} />
        <MonthlyChampions months={data.archivedMonths} liveMonth={data.liveMonth} />
        <MonthlyArchive
          months={data.archivedMonths}
          liveMonth={data.liveMonth}
          runnerUpStartMonth={data.runnerUpStartMonth}
        />
        <FactoryLegends legends={data.legends} />
      </div>
    </div>
  );
}
