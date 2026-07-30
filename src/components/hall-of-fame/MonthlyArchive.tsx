import { ChampionCard } from "@/components/hall-of-fame/ChampionCard";
import { Reveal } from "@/components/hall-of-fame/Reveal";
import { RunnerUpCard } from "@/components/hall-of-fame/RunnerUpCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatYearMonthLabel, tracksRunnerUps } from "@/lib/hall-of-fame/months";
import type { HallOfFameMonth } from "@/lib/hall-of-fame/types";

type MonthlyArchiveProps = {
  months: HallOfFameMonth[];
  liveMonth: HallOfFameMonth | null;
  runnerUpStartMonth: string;
};

function MonthStandings({
  month,
  provisional = false,
}: {
  month: HallOfFameMonth;
  provisional?: boolean;
}) {
  const champion = month.placements.find((p) => p.place === 1);
  const runners = month.placements.filter((p) => p.place >= 2).sort((a, b) => a.place - b.place);
  const showRunners = tracksRunnerUps(month.yearMonth);

  return (
    <article className="min-w-0 overflow-hidden rounded-3xl bg-white/[0.03] px-3 py-6 sm:px-6 sm:py-8">
      <header className="flex min-w-0 flex-col items-center gap-3 border-b border-white/10 pb-5 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-zinc-500">
            {provisional ? "In progress" : "Archived"}
          </p>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
            {formatYearMonthLabel(month.yearMonth)}
          </h3>
        </div>
        {provisional ? (
          <span className="shrink-0 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-cyan-200">
            Live board
          </span>
        ) : (
          <span className="shrink-0 rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-amber-100">
            Locked forever
          </span>
        )}
      </header>

      {champion ? (
        <div className="mx-auto mt-6 w-full min-w-0 max-w-lg sm:mt-8">
          <ChampionCard
            placement={champion}
            yearMonth={month.yearMonth}
            featured
            provisional={provisional}
          />
        </div>
      ) : null}

      {showRunners ? (
        <div className="mt-6 min-w-0 sm:mt-8">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Runner-ups
          </p>
          {runners.length > 0 ? (
            <div className="mx-auto mt-4 grid min-w-0 max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {runners.map((p) => (
                <div key={`${month.yearMonth}-${p.place}`} className="min-w-0">
                  <RunnerUpCard placement={p} />
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-center text-sm text-zinc-500">
              Places 2–5 will appear when this month is locked.
            </p>
          )}
        </div>
      ) : (
        <p className="mt-5 text-center text-sm text-zinc-500">
          Champion-only era — runner-up tracking starts {formatYearMonthLabel("2026-07")}.
        </p>
      )}
    </article>
  );
}

export function MonthlyArchive({
  months,
  liveMonth,
  runnerUpStartMonth,
}: MonthlyArchiveProps) {
  const showLive =
    liveMonth != null &&
    tracksRunnerUps(liveMonth.yearMonth) &&
    !months.some((m) => m.yearMonth === liveMonth.yearMonth);

  return (
    <section aria-labelledby="runner-ups-heading">
      <SectionHeader
        eyebrow="Standings"
        title="Runner-Ups & Monthly Archive"
        description={`From ${formatYearMonthLabel(runnerUpStartMonth)} onward, every completed month locks places 2–5 into permanent history.`}
        tone="inverse"
        align="center"
      />
      <h2 id="runner-ups-heading" className="sr-only">
        Runner-Ups and Monthly Archive
      </h2>

      <div className="mt-10 min-w-0 space-y-8">
        {showLive && liveMonth ? (
          <Reveal className="min-w-0">
            <MonthStandings month={liveMonth} provisional />
          </Reveal>
        ) : null}

        {months.length === 0 && !showLive ? (
          <p className="text-center text-zinc-500">
            Completed months will archive here automatically after each month-end lock.
          </p>
        ) : (
          months.map((month, i) => (
            <Reveal key={month.yearMonth} className="min-w-0" delayMs={Math.min(i * 50, 200)}>
              <MonthStandings month={month} />
            </Reveal>
          ))
        )}
      </div>
    </section>
  );
}
