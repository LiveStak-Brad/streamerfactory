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
  /** Prefer creators with Backstage photos for above-the-fold hero avatars. */
  const previewMembers = [...members].sort((a, b) => {
    const aPhoto = a.avatarUrl ? 0 : 1;
    const bPhoto = b.avatarUrl ? 0 : 1;
    if (aPhoto !== bPhoto) return aPhoto - bPhoto;
    return 0;
  });

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
