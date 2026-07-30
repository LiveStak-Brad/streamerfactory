import Link from "next/link";
import { CreatorAvatar } from "@/components/members/CreatorAvatar";
import { AchievementBadge } from "@/components/ui/AchievementBadge";
import { Button } from "@/components/ui/Button";
import { memberProfileUrl } from "@/lib/members/network-members";
import type { DashboardNextAction } from "@/lib/member/dashboard-next-action";
import type { RankingBadge } from "@/lib/rankings/types";

type MemberDashboardWelcomeProps = {
  greeting: string;
  displayName: string;
  handle: string | null;
  avatarUrl: string | null;
  rankPosition: number | null;
  badge: RankingBadge;
  nextAction: DashboardNextAction;
  email: string | null;
};

export function MemberDashboardWelcome({
  greeting,
  displayName,
  handle,
  avatarUrl,
  rankPosition,
  badge,
  nextAction,
  email,
}: MemberDashboardWelcomeProps) {
  const initial = (displayName.replace(/[^\p{L}\p{N}]/gu, "")[0] || "?").toUpperCase();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0F1A] px-5 py-6 text-zinc-50 shadow-[0_24px_60px_-36px_rgba(91, 59, 255,0.55)] sm:px-8 sm:py-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_0%_0%,rgba(91, 59, 255,0.35),transparent_55%),radial-gradient(ellipse_50%_60%_at_100%_20%,rgba(160, 32, 240,0.22),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 [mask-image:radial-gradient(ellipse_80%_70%_at_30%_20%,black,transparent)]"
        aria-hidden
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-4 sm:gap-5">
          <CreatorAvatar
            username={handle ?? "creator"}
            preferredImageUrl={avatarUrl}
            fallbackBackdropClass="bg-gradient-to-br from-indigo-500 to-violet-600"
            fallbackInitial={initial}
            className="h-16 w-16 sm:h-20 sm:w-20"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-muted">
              {greeting}
            </p>
            <h1 className="mt-1 truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {displayName}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {handle ? (
                <Link
                  href={memberProfileUrl(handle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-sm font-semibold text-zinc-300 hover:text-white"
                >
                  @{handle}
                </Link>
              ) : email ? (
                <span className="truncate text-sm text-zinc-400">{email}</span>
              ) : null}
              <AchievementBadge badge={badge} size="sm" />
              {rankPosition != null ? (
                <span className="rounded-lg border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs font-bold text-zinc-200">
                  Rank #{rankPosition}
                </span>
              ) : (
                <span className="rounded-lg border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs font-bold text-zinc-400">
                  Rank pending
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="w-full shrink-0 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-md sm:max-w-sm lg:w-auto lg:min-w-[280px]">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
            What should I do next?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">{nextAction.reason}</p>
          <div className="mt-4">
            <Button
              href={nextAction.href}
              external={nextAction.external}
              variant="primary"
              className="min-h-[48px] w-full px-5"
            >
              {nextAction.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
