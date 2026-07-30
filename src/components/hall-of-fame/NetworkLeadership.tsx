import { Reveal } from "@/components/hall-of-fame/Reveal";
import { CreatorAvatar } from "@/components/members/CreatorAvatar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { NetworkManager } from "@/lib/hall-of-fame/types";

type NetworkLeadershipProps = {
  managers: NetworkManager[];
};

export function NetworkLeadership({ managers }: NetworkLeadershipProps) {
  const sorted = [...managers].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section aria-labelledby="network-leadership-heading">
      <SectionHeader
        eyebrow="Leadership"
        title="Network Leadership"
        description="The people building Streamer Factory — expand this roster as the network grows."
        tone="inverse"
        align="center"
      />
      <div
        className={`mt-10 grid gap-5 ${
          sorted.length === 1
            ? "mx-auto max-w-md grid-cols-1"
            : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {sorted.map((manager, i) => {
          const handle = manager.contactHandle.replace(/^@/, "");
          return (
            <Reveal key={manager.id} delayMs={i * 80}>
              <article
                className={`relative overflow-hidden rounded-3xl border p-6 sm:p-7 ${
                  manager.isPrimary
                    ? "border-accent/35 bg-gradient-to-b from-accent/20 via-white/[0.05] to-transparent shadow-[0_0_40px_-12px_rgba(160,32,240,0.45)]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div
                  className="pointer-events-none absolute -left-8 top-0 h-32 w-32 rounded-full bg-[rgba(0,229,255,0.12)] blur-3xl"
                  aria-hidden
                />
                {manager.isPrimary ? (
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent-muted">
                    Current manager
                  </p>
                ) : (
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Manager
                  </p>
                )}
                <div className="mt-5 flex items-center gap-4">
                  <CreatorAvatar
                    username={manager.displayName}
                    preferredImageUrl={manager.avatarUrl}
                    fallbackBackdropClass="bg-gradient-to-br from-[#5B3BFF] via-[#A020F0] to-[#FF2ED1]"
                    fallbackInitial={(manager.displayName[0] || "?").toUpperCase()}
                    className="h-16 w-16 ring-2 ring-white/15"
                    priority={Boolean(manager.isPrimary)}
                    tiktokFallback={false}
                  />
                  <div className="min-w-0">
                    <h3
                      id={i === 0 ? "network-leadership-heading" : undefined}
                      className="truncate text-xl font-bold tracking-tight text-white"
                    >
                      {manager.displayName}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">{manager.title}</p>
                  </div>
                </div>
                <dl className="mt-6 border-t border-white/10 pt-4">
                  <div>
                    <dt className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-zinc-500">
                      Primary contact
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`https://www.tiktok.com/@${handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-accent-muted transition-colors hover:text-white"
                      >
                        @{handle}
                      </a>
                    </dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
