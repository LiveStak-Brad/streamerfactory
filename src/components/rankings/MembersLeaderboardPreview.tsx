import Link from "next/link";
import { LeaderboardTable } from "@/components/rankings/LeaderboardTable";
import { Button } from "@/components/ui/Button";
import { getLeaderboardFromBackstageSeed } from "@/lib/rankings/leaderboard-from-seed";

/** Top of member directory — same backstage snapshot as /rankings. */
export function MembersLeaderboardPreview() {
  const board = getLeaderboardFromBackstageSeed();
  const top = board.slice(0, 10);

  return (
    <section className="mt-14 border-t border-zinc-200/90 pt-14 dark:border-zinc-800">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent dark:text-accent-muted">
          Creator performance
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Factory rankings
        </h2>
        <p className="mt-3 text-muted">
          Ranked by diamonds earned from TikTok Creator Network backstage. SunShine leads with{" "}
          {top[0]?.coins_earned.toLocaleString() ?? "—"} diamonds this period.
        </p>
        <div className="mt-6">
          <Button href="/rankings" variant="primary">
            View full leaderboard ({board.length})
          </Button>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-4xl">
        <LeaderboardTable entries={top} />
        <p className="mt-6 text-center text-sm text-muted">
          Showing top 10.{" "}
          <Link href="/rankings" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            See all {board.length} creators →
          </Link>
        </p>
      </div>
    </section>
  );
}
