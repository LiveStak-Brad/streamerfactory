import { HomeCta } from "@/components/home/HomeCta";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeMemberUnlock } from "@/components/home/HomeMemberUnlock";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LatestResources } from "@/components/home/LatestResources";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { WhyStreamerFactory } from "@/components/home/WhyStreamerFactory";
import { TIKTOK_ROOT_SITE_VERIFICATION_LINE } from "@/lib/tiktok/site-verification";

export default function HomePage() {
  return (
    <>
      <p className="sr-only" aria-hidden="true">
        {TIKTOK_ROOT_SITE_VERIFICATION_LINE}
      </p>
      <HomeHero />
      <WhatWeDo />
      <WhyStreamerFactory />
      <HomeMemberUnlock />
      <LatestResources />
      <HowItWorks />
      <HomeCta />
    </>
  );
}
