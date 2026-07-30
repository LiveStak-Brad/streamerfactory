import Link from "next/link";
import { TrackedCta } from "@/components/analytics/TrackedCta";
import { CreatorAvatar } from "@/components/members/CreatorAvatar";
import { RankBadge } from "@/components/ui/RankBadge";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import type { NetworkMember } from "@/lib/members/network-members";
import type { LeaderboardEntry } from "@/lib/rankings/types";
import { site, tiktokCreatorNetworkApplyUrl } from "@/lib/site";

export type HomeHeroProps = {
  memberCount: number;
  previewMembers: NetworkMember[];
  topCreators: LeaderboardEntry[];
};

function fallbackInitial(name: string): string {
  const cleaned = name.replace(/[^\p{L}\p{N}]/gu, "").trim();
  return (cleaned[0] || "?").toUpperCase();
}

function avatarTone(index: number): string {
  const tones = [
    "bg-gradient-to-br from-indigo-500 to-violet-600",
    "bg-gradient-to-br from-fuchsia-500 to-pink-600",
    "bg-gradient-to-br from-violet-500 to-indigo-700",
    "bg-gradient-to-br from-sky-500 to-indigo-600",
    "bg-gradient-to-br from-rose-500 to-violet-600",
  ];
  return tones[index % tones.length];
}

export function HomeHero({ memberCount, previewMembers, topCreators }: HomeHeroProps) {
  const podium = topCreators.slice(0, 3);
  const floating = previewMembers.slice(0, 6);

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#07060c] pb-16 pt-12 text-zinc-50 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_20%_-10%,rgba(99,102,241,0.42),transparent_55%),radial-gradient(ellipse_60%_45%_at_90%_10%,rgba(168,85,247,0.28),transparent_50%),radial-gradient(ellipse_50%_40%_at_60%_90%,rgba(236,72,153,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_20%,black,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300 backdrop-blur-md">
              <span className="live-dot" aria-hidden />
              Live creator network
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.28em] text-accent-muted sm:text-base">
              {site.name}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[1.05] xl:text-[3.6rem]">
              The TikTok LIVE agency that feels like a{" "}
              <span className="text-gradient-brand">thriving creator network</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
              Train in StreamerU, climb factory rankings, schedule battles in Battle Hub, and grow with creators who
              treat LIVE like a business — not a dead Discord invite.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-2.5">
                {floating.slice(0, 5).map((m, i) => (
                  <CreatorAvatar
                    key={m.username}
                    username={m.username}
                    preferredImageUrl={m.avatarUrl}
                    fallbackBackdropClass={avatarTone(i)}
                    fallbackInitial={fallbackInitial(m.displayName || m.username)}
                    className="h-10 w-10 ring-2 ring-[#07060c]"
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-zinc-400">
                <span className="font-bold text-white">{memberCount}</span> network creators · rankings updated from
                Creator Network
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedCta
                href={tiktokCreatorNetworkApplyUrl}
                external
                variant="primary"
                className="min-h-[52px] px-8 sm:min-w-[220px]"
                eventMetadata={{ location: "home_hero", cta: "join_tiktok_cn" }}
              >
                Join on TikTok
              </TrackedCta>
              <TrackedCta
                href="/apply"
                variant="secondaryOnDark"
                className="min-h-[52px] px-8 sm:min-w-[220px]"
                eventMetadata={{ location: "home_hero", cta: "request_access" }}
              >
                Request website access
              </TrackedCta>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500">
              Two steps. TikTok handles network membership — we unlock StreamerU and Battle Hub after verification.{" "}
              <Link
                href="/guides/how-to-join-tiktok-live-agency"
                className="font-semibold text-zinc-300 underline-offset-2 hover:text-white hover:underline"
              >
                Full join guide →
              </Link>
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/25 via-violet-500/10 to-fuchsia-500/20 blur-2xl"
              aria-hidden
            />

            <GlassCard tone="dark" className="relative p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-zinc-500">This month</p>
                  <p className="mt-1 text-lg font-bold tracking-tight text-white">Factory rankings</p>
                </div>
                <Link
                  href="/rankings"
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                >
                  View all
                </Link>
              </div>

              <ul className="mt-5 space-y-3">
                {podium.length > 0 ? (
                  podium.map((entry, index) => {
                    const rank = entry.rank_position ?? index + 1;
                    const handle = entry.tiktok_username?.replace(/^@/, "") || "creator";
                    return (
                      <li key={entry.profile_id || handle}>
                        <div
                          className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                            rank === 1
                              ? "border-amber-400/30 bg-gradient-to-r from-amber-400/15 to-transparent"
                              : "border-white/8 bg-white/[0.03]"
                          }`}
                        >
                          <RankBadge rank={rank} size="sm" />
                          <CreatorAvatar
                            username={handle}
                            preferredImageUrl={entry.avatar_url}
                            fallbackBackdropClass={avatarTone(index)}
                            fallbackInitial={fallbackInitial(handle)}
                            className="h-10 w-10"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-white">@{handle}</p>
                            <p className="truncate text-xs text-zinc-500">
                              {entry.coins_earned.toLocaleString()} diamonds · {entry.hours_streamed.toFixed(0)}h
                            </p>
                          </div>
                          {rank === 1 ? (
                            <span className="hidden rounded-md bg-amber-400/15 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-amber-200 sm:inline">
                              Champion
                            </span>
                          ) : null}
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-zinc-500">
                    Rankings sync from Creator Network when available.
                  </li>
                )}
              </ul>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { label: "Creators", value: String(memberCount) },
                  { label: "Tools", value: "Battle Hub" },
                  { label: "Training", value: "StreamerU" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/8 bg-black/20 px-2.5 py-2.5 text-center"
                  >
                    <p className="truncate text-[0.65rem] font-bold uppercase tracking-[0.16em] text-zinc-500">
                      {stat.label}
                    </p>
                    <p className="mt-1 truncate text-sm font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {floating[0] ? (
              <div className="absolute -left-2 top-8 hidden w-44 animate-float-soft sm:block lg:-left-8">
                <GlassCard tone="dark" className="p-3">
                  <div className="flex items-center gap-2.5">
                    <CreatorAvatar
                      username={floating[0].username}
                      preferredImageUrl={floating[0].avatarUrl}
                      fallbackBackdropClass={avatarTone(0)}
                      fallbackInitial={fallbackInitial(floating[0].displayName)}
                      className="h-9 w-9"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-white">
                        @{floating[0].username}
                      </p>
                      <p className="text-[0.65rem] text-emerald-400">In the network</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ) : null}

            {floating[1] ? (
              <div
                className="absolute -right-1 bottom-16 hidden w-40 animate-float-soft sm:block lg:-right-6"
                style={{ animationDelay: "1.2s" }}
              >
                <GlassCard tone="dark" className="p-3">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-zinc-500">Next up</p>
                  <p className="mt-1 text-xs font-semibold text-white">Battle Hub</p>
                  <p className="mt-0.5 text-[0.7rem] text-zinc-400">Schedule · flyers · calendar</p>
                </GlassCard>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
