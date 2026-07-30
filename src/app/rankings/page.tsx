import type { Metadata } from "next";
import { RankingsPageView, parseRankingsSearchParams } from "@/components/rankings/RankingsPageView";
import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Factory rankings",
  description:
    "Streamer Factory network creator leaderboard — diamonds, stream hours, activeness, and battle performance.",
  path: "/rankings",
  ogImage: "/branding/og/rankings.png",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RankingsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const { periodKind, anchor } = parseRankingsSearchParams(sp);

  return (
    <div className="border-b border-border/70 bg-muted-bg/30 pb-16 pt-8 dark:border-zinc-800 dark:bg-zinc-950/40 sm:pt-10">
      <Container className="max-w-6xl">
        <RankingsPageView periodKind={periodKind} anchor={anchor} showAdminHint />
      </Container>
    </div>
  );
}
