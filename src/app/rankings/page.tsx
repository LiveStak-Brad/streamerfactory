import type { Metadata } from "next";
import { RankingsPageView, parseRankingsSearchParams } from "@/components/rankings/RankingsPageView";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Factory rankings",
  description:
    "Streamer Factory network creator leaderboard — coins, stream hours, activeness, and battle performance.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RankingsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const { periodKind, anchor } = parseRankingsSearchParams(sp);

  return (
    <>
      <Section className="!pt-12 sm:!pt-16" variant="default" containerClassName="max-w-6xl">
        <RankingsPageView periodKind={periodKind} anchor={anchor} showAdminHint />
      </Section>
    </>
  );
}
