import Link from "next/link";
import { RankingsPageView, parseRankingsSearchParams } from "@/components/rankings/RankingsPageView";
import { Container } from "@/components/ui/Container";
import { RecordRankingsViewed } from "@/components/member/RecordRankingsViewed";
import { getSessionProfile } from "@/lib/auth/server";

export const metadata = {
  title: "Leaderboard",
  description: "Streamer Factory network creator rankings.",
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Member leaderboard — same view as public /rankings with your row highlighted. */
export default async function MemberLeaderboardPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const session = await getSessionProfile();
  const userId = session?.user?.id ?? null;
  const { periodKind, anchor } = parseRankingsSearchParams(sp);

  return (
    <div className="border-b border-border/70 bg-muted-bg/30 pb-16 pt-8 dark:border-zinc-800 dark:bg-zinc-950/40 sm:pt-10">
      <RecordRankingsViewed />
      <Container className="max-w-6xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            Member view — your row is highlighted when stats match your TikTok.
          </p>
          <Link
            href="/member/dashboard"
            className="text-sm font-semibold text-muted transition-colors hover:text-accent dark:hover:text-accent-muted"
          >
            ← Dashboard
          </Link>
        </div>
        <RankingsPageView
          periodKind={periodKind}
          anchor={anchor}
          highlightProfileId={userId}
          showAdminHint
        />
      </Container>
    </div>
  );
}
