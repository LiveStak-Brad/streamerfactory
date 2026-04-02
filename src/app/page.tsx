import { HomeCta } from "@/components/home/HomeCta";
import { HomeHero } from "@/components/home/HomeHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { WhyStreamerFactory } from "@/components/home/WhyStreamerFactory";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WhatWeDo />
      <WhyStreamerFactory />
      <HowItWorks />
      <HomeCta />
    </>
  );
}
