import { Reveal } from "@/components/hall-of-fame/Reveal";
import { CreatorAvatar } from "@/components/members/CreatorAvatar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { FactoryLegend } from "@/lib/hall-of-fame/types";
import { memberProfileUrl } from "@/lib/members/network-members";

type FactoryLegendsProps = {
  legends: FactoryLegend[];
};

export function FactoryLegends({ legends }: FactoryLegendsProps) {
  const sorted = [...legends].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section aria-labelledby="factory-legends-heading">
      <SectionHeader
        eyebrow="Lifetime"
        title="Factory Legends"
        description="Lifetime achievements reserved for history-makers. New categories can be added anytime — holders appear when earned."
        tone="inverse"
        align="center"
      />
      <h2 id="factory-legends-heading" className="sr-only">
        Factory Legends
      </h2>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((legend, i) => {
          const holder = legend.holder;
          const handle = holder?.tiktokUsername.replace(/^@/, "") ?? "";
          const inner = (
            <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-[border-color,transform] hover:border-accent/35 motion-reduce:transform-none sm:p-6">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent-muted">
                Legend
              </p>
              <h3 className="mt-3 text-lg font-bold tracking-tight text-white">{legend.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                {legend.description}
              </p>
              {holder ? (
                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                  <CreatorAvatar
                    username={handle}
                    preferredImageUrl={holder.avatarUrl}
                    fallbackBackdropClass="bg-gradient-to-br from-[#5B3BFF] to-[#FF2ED1]"
                    fallbackInitial={(handle[0] || "?").toUpperCase()}
                    className="h-11 w-11"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">{holder.displayName}</p>
                    <p className="truncate text-sm text-zinc-400">@{handle}</p>
                    {holder.valueLabel ? (
                      <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-amber-200/90">
                        {holder.valueLabel}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold text-zinc-500">Awaiting legend</p>
                  <p className="mt-0.5 text-xs text-zinc-600">Unclaimed — make history</p>
                </div>
              )}
            </article>
          );

          return (
            <li key={legend.key}>
              <Reveal delayMs={Math.min(i * 40, 240)}>
                {holder && handle ? (
                  <a
                    href={memberProfileUrl(handle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transform-none"
                    aria-label={`${legend.title}: @${handle}`}
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
