import { ChampionCard } from "@/components/hall-of-fame/ChampionCard";
import { Reveal } from "@/components/hall-of-fame/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatYearMonthLabel } from "@/lib/hall-of-fame/months";
import type { HallOfFameMonth, HallOfFamePlacement } from "@/lib/hall-of-fame/types";

type MonthlyChampionsProps = {
  months: HallOfFameMonth[];
  liveMonth: HallOfFameMonth | null;
};

function championOf(month: HallOfFameMonth): HallOfFamePlacement | null {
  return month.placements.find((p) => p.place === 1) ?? month.placements[0] ?? null;
}

export function MonthlyChampions({ months, liveMonth }: MonthlyChampionsProps) {
  const lockedChampions = months
    .map((m) => {
      const champ = championOf(m);
      return champ ? { month: m, champ } : null;
    })
    .filter((row): row is { month: HallOfFameMonth; champ: HallOfFamePlacement } => row != null);

  const liveChamp = liveMonth ? championOf(liveMonth) : null;

  return (
    <section aria-labelledby="monthly-champions-heading">
      <SectionHeader
        eyebrow="Champions"
        title="Monthly Champions"
        description="Permanent Factory Champions — every month’s #1 is preserved forever."
        tone="inverse"
        align="center"
      />
      <h2 id="monthly-champions-heading" className="sr-only">
        Monthly Champions
      </h2>

      {liveChamp && liveMonth ? (
        <Reveal className="mx-auto mt-10 max-w-xl">
          <ChampionCard
            placement={liveChamp}
            yearMonth={liveMonth.yearMonth}
            featured
            provisional
          />
        </Reveal>
      ) : null}

      {lockedChampions.length === 0 && !liveChamp ? (
        <p className="mt-10 text-center text-zinc-500">
          Champions will appear here as months are archived.
        </p>
      ) : (
        <ol className="relative mx-auto mt-12 max-w-2xl space-y-8 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-px before:bg-gradient-to-b before:from-amber-300/50 before:via-accent/35 before:to-transparent sm:before:left-5">
          {lockedChampions.map(({ month, champ }, i) => (
            <li key={month.yearMonth} className="relative pl-12 sm:pl-14">
              <span
                className="absolute left-1.5 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-amber-300/40 bg-[#0b0a12] text-xs shadow-[0_0_18px_-4px_rgba(251,191,36,0.55)] sm:left-2.5 sm:h-7 sm:w-7"
                aria-hidden
              >
                🥇
              </span>
              <Reveal delayMs={i * 70}>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-200/80">
                  {formatYearMonthLabel(month.yearMonth)}
                  <span className="ml-2 font-semibold tracking-normal text-zinc-500">
                    · Permanent record
                  </span>
                </p>
                <ChampionCard placement={champ} yearMonth={month.yearMonth} featured />
              </Reveal>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
