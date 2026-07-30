import type { Metadata } from "next";
import Link from "next/link";
import { MembersDirectory } from "@/components/members/MembersDirectory";
import { MembersFeatured } from "@/components/members/MembersFeatured";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getNetworkMembersForDirectory } from "@/lib/members/members-directory-data";
import { getLeaderboard } from "@/lib/rankings/queries";

export const metadata: Metadata = {
  title: "Network members",
  description:
    "Streamer Factory network creators on TikTok — find handles and open profiles to follow each other.",
  openGraph: {
    title: "Network members | Streamer Factory",
    description:
      "Find TikTok profiles for Streamer Factory network members and follow each other on TikTok.",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MembersPage() {
  const [{ members, importedAt, fromImport }, board] = await Promise.all([
    getNetworkMembersForDirectory(),
    getLeaderboard("monthly").catch(() => []),
  ]);

  return (
    <div className="border-b border-border/70 bg-muted-bg/30 pb-16 pt-8 dark:border-zinc-800 dark:bg-zinc-950/40 sm:pt-10">
      <Container className="max-w-6xl">
        <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface px-5 py-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60 sm:px-8 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,rgba(99,102,241,0.14),transparent_55%)]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent dark:text-accent-muted">
              Creator network
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
              Meet the factory
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {members.length} creators in the Streamer Factory network. Follow each other on TikTok and grow
              together on LIVE.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/rankings" variant="primary">
                View factory rankings
              </Button>
              <Button href="/apply" variant="secondary">
                Join the network
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">
              Rankings use Creator Network diamonds, hours, and activeness.{" "}
              <Link
                href="/rankings"
                className="font-semibold text-accent hover:underline dark:text-accent-muted"
              >
                Open leaderboard →
              </Link>
            </p>
          </div>
        </section>

        <div className="mt-12">
          <MembersFeatured topCreators={board} />
          <MembersDirectory
            members={members}
            importedAt={importedAt}
            fromImport={fromImport}
            rankings={board}
          />
        </div>
      </Container>
    </div>
  );
}
