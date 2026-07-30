import { CreatorCard } from "@/components/ui/CreatorCard";
import { rankingBadge } from "@/lib/rankings/scoring";
import type { LeaderboardEntry } from "@/lib/rankings/types";
import { displayLabelForHandle } from "@/lib/rankings/leaderboard-from-seed";

type MembersFeaturedProps = {
  topCreators: LeaderboardEntry[];
};

/** Featured strip: top-ranked creators from the real monthly board. */
export function MembersFeatured({ topCreators }: MembersFeaturedProps) {
  const featured = topCreators.slice(0, 4);
  if (featured.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
            Featured
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            Top-ranked creators
          </h2>
          <p className="mt-1 text-sm text-muted">From this month&apos;s factory leaderboard.</p>
        </div>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((entry, index) => {
          const handle = entry.tiktok_username?.replace(/^@/, "") || "";
          if (!handle) return null;
          return (
            <li key={entry.profile_id || handle}>
              <CreatorCard
                featured
                username={handle}
                displayName={displayLabelForHandle(handle)}
                avatarUrl={entry.avatar_url}
                rankPosition={entry.rank_position}
                badge={rankingBadge(entry.rank_position, true)}
                toneIndex={index}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
