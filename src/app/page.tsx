import type { Metadata } from "next";
import { HomeCta } from "@/components/home/HomeCta";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeMemberUnlock } from "@/components/home/HomeMemberUnlock";
import { HomeNetworkStrip } from "@/components/home/HomeNetworkStrip";
import { HomePlatformPreview } from "@/components/home/HomePlatformPreview";
import { HomeRankingPreview } from "@/components/home/HomeRankingPreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LatestResources } from "@/components/home/LatestResources";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { WhyStreamerFactory } from "@/components/home/WhyStreamerFactory";
import { getNetworkMembersForDirectory } from "@/lib/members/members-directory-data";
import { getLeaderboard } from "@/lib/rankings/queries";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/seo/json-ld";
import { site } from "@/lib/site";
import { TIKTOK_ROOT_SITE_VERIFICATION_LINE } from "@/lib/tiktok/site-verification";

export const metadata: Metadata = createPageMetadata({
  title: `${site.name} — TikTok LIVE Creator Agency`,
  description:
    "Streamer Factory is a TikTok LIVE creator agency. Join the Creator Network, train in StreamerU, schedule battles, and grow with real creator ops — not empty promises.",
  path: "/",
  keywords: [
    "TikTok LIVE agency",
    "TikTok Creator Network",
    "TikTok creator agency",
    "Streamer Factory",
    "join TikTok LIVE agency",
  ],
});

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [{ members }, board] = await Promise.all([
    getNetworkMembersForDirectory(),
    getLeaderboard("monthly").catch(() => [] as Awaited<ReturnType<typeof getLeaderboard>>),
  ]);

  return (
    <>
      <JsonLd id="org-schema" data={organizationSchema()} />
      <JsonLd id="website-schema" data={websiteSchema()} />
      <p className="sr-only" aria-hidden="true">
        {TIKTOK_ROOT_SITE_VERIFICATION_LINE}
      </p>
      <HomeHero
        memberCount={members.length}
        previewMembers={members}
        topCreators={board.slice(0, 5)}
      />
      <HomeNetworkStrip members={members} memberCount={members.length} />
      <HomePlatformPreview />
      <WhatWeDo />
      <HomeRankingPreview entries={board} totalCount={board.length} />
      <WhyStreamerFactory />
      <HomeMemberUnlock />
      <LatestResources />
      <HowItWorks />
      <HomeCta />
    </>
  );
}
