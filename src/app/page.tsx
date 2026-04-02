import { HomeCta } from "@/components/home/HomeCta";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeMemberUnlock } from "@/components/home/HomeMemberUnlock";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LatestResources } from "@/components/home/LatestResources";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { WhyStreamerFactory } from "@/components/home/WhyStreamerFactory";

export default function HomePage() {
  return (
    <>
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
