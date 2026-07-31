import type { Metadata } from "next";
import { HomeCta } from "@/components/home/HomeCta";
import { HomeFollowBand } from "@/components/home/HomeFollowBand";
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
import { orderMembersByActivity } from "@/lib/members/order-by-activity";
import { getLeaderboard } from "@/lib/rankings/queries";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/seo/json-ld";
import { site } from "@/lib/site";
import { TIKTOK_ROOT_SITE_VERIFICATION_LINE } from "@/lib/tiktok/site-verification";

export const metadata: Metadata = createPageMetadata({
  title: `${site.name} — Free TikTok LIVE Creator Network`,
  description:
    "Streamer Factory is a free TikTok LIVE creator network. Membership is free. StreamerU education is included. Join for free, start streaming, and grow with real creator ops — creators never pay us.",
  path: "/",
  keywords: [
    "TikTok LIVE agency",
    "TikTok Creator Network",
    "TikTok creator agency",
    "Streamer Factory",
    "join TikTok LIVE agency",
    "free TikTok LIVE creator network",
    "free StreamerU",
  ],
  ogImage: "/branding/og/homepage.png",
});

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [directory, board] = await Promise.all([
    getNetworkMembersForDirectory().catch(() => ({
      members: [],
      importedAt: null,
      fromImport: false,
    })),
    getLeaderboard("monthly").catch(() => [] as Awaited<ReturnType<typeof getLeaderboard>>),
  ]);
  const members = directory.members ?? [];
  const rankings = board ?? [];
  /** Hero + network strip: most active this month first (not A–Z / photo-only). */
  const previewMembers = orderMembersByActivity(members, rankings);

  return (
    <>
      <JsonLd id="org-schema" data={organizationSchema()} />
      <JsonLd id="website-schema" data={websiteSchema()} />
      <p className="sr-only" aria-hidden="true">
        {TIKTOK_ROOT_SITE_VERIFICATION_LINE}
      </p>
      <HomeHero
        memberCount={members.length}
        previewMembers={previewMembers}
        topCreators={rankings.slice(0, 5)}
      />
      <HomeNetworkStrip members={previewMembers} memberCount={members.length} />
      <HomeFollowBand />
      <HomePlatformPreview />
      <WhatWeDo />
      <HomeRankingPreview entries={rankings} totalCount={rankings.length} />
      <WhyStreamerFactory />
      <HomeMemberUnlock />
      <LatestResources />
      <HowItWorks />
      <HomeCta />
    </>
  );
}

