import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/hall-of-fame/Reveal";
import { CreatorAvatar } from "@/components/members/CreatorAvatar";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FOUNDER_PHOTO } from "@/lib/founder/content";
import type { NetworkManager } from "@/lib/hall-of-fame/types";

type NetworkLeadershipProps = {
  managers: NetworkManager[];
};

export function NetworkLeadership({ managers }: NetworkLeadershipProps) {
  const sorted = [...managers].sort((a, b) => a.sortOrder - b.sortOrder);
  const primary = sorted.find((m) => m.isPrimary) ?? sorted[0];
  const others = sorted.filter((m) => m.id !== primary?.id);

  if (!primary) return null;

  const handle = primary.contactHandle.replace(/^@/, "");
  const photo = primary.avatarUrl || FOUNDER_PHOTO;

  return (
    <section aria-labelledby="network-leadership-heading">
      <SectionHeader
        eyebrow="Leadership"
        title="Meet the Founder"
        description="The story behind Streamer Factory — years of live streaming turned into a system creators can learn."
        tone="inverse"
        align="center"
      />

      <Reveal>
        <article className="relative mt-10 overflow-hidden rounded-[2rem] border border-accent/35 bg-gradient-to-br from-accent/20 via-white/[0.05] to-transparent shadow-[0_0_50px_-12px_rgba(160,32,240,0.5)]">
          <div
            className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-[rgba(0,229,255,0.14)] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-[rgba(255,46,209,0.12)] blur-3xl"
            aria-hidden
          />

          <div className="relative grid items-stretch gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Link
              href="/founder"
              className="relative block aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-[360px]"
            >
              <Image
                src={photo}
                alt={`${primary.displayName}, founder of Streamer Factory`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-top transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0a12]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0b0a12]/40"
                aria-hidden
              />
            </Link>

            <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent-muted">
                Founder
              </p>
              <h3
                id="network-leadership-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                {primary.displayName}
              </h3>
              <p className="mt-2 text-base text-zinc-400">{primary.title}</p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-300">
                Better known online as{" "}
                <span className="font-semibold text-white">CannaStreams</span>. Years of proving
                live streaming success isn&apos;t luck — it&apos;s a system.
              </p>
              <dl className="mt-6">
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
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/founder" variant="primary" className="min-h-[48px] px-7">
                  View founder story
                </Button>
                <Button href="/founder#why-i-built" variant="secondaryOnDark" className="min-h-[48px] px-7">
                  See the journey
                </Button>
              </div>
            </div>
          </div>
        </article>
      </Reveal>

      {others.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((manager, i) => {
            const otherHandle = manager.contactHandle.replace(/^@/, "");
            return (
              <Reveal key={manager.id} delayMs={i * 80}>
                <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Manager
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <CreatorAvatar
                      username={manager.displayName}
                      preferredImageUrl={manager.avatarUrl}
                      fallbackBackdropClass="bg-gradient-to-br from-[#5B3BFF] via-[#A020F0] to-[#FF2ED1]"
                      fallbackInitial={(manager.displayName[0] || "?").toUpperCase()}
                      className="h-16 w-16 ring-2 ring-white/15"
                      tiktokFallback={false}
                    />
                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-bold tracking-tight text-white">
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
                          href={`https://www.tiktok.com/@${otherHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-semibold text-accent-muted transition-colors hover:text-white"
                        >
                          @{otherHandle}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
