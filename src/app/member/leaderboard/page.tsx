import { RankingsPageView, parseRankingsSearchParams } from "@/components/rankings/RankingsPageView";
import { Section } from "@/components/ui/Section";
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
    <div className="border-b border-zinc-200/80 bg-muted-bg/30 pb-16 pt-12 dark:border-zinc-800 dark:bg-zinc-950/40 sm:pt-16">
      <Section variant="default" containerClassName="max-w-6xl" className="!py-0">
        <RankingsPageView
          periodKind={periodKind}
          anchor={anchor}
          highlightProfileId={userId}
          showAdminHint
        />
      </Section>
    </div>
  );
}
