import type { Metadata } from "next";
import { FounderPageView } from "@/components/founder/FounderPageView";
import {
  FOUNDER,
  FOUNDER_FAQS,
  FOUNDER_PERSON_DESCRIPTION,
} from "@/lib/founder/content";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  personSchema,
} from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Meet Brad Morris (CannaStreams) | Founder of Streamer Factory",
  description:
    "Learn how Brad Morris (CannaStreams) built audiences across multiple livestreaming platforms, became a TikTok LIVE creator, and founded Streamer Factory to help creators grow through proven strategies and real-world experience.",
  path: "/founder",
  keywords: [
    "Brad Morris",
    "CannaStreams",
    "Streamer Factory founder",
    "TikTok LIVE agency",
    "TikTok LIVE creator",
    "TikTok LIVE coach",
    "TikTok LIVE expert",
    "live streaming mentor",
    "live streaming coach",
    "TikTok LIVE growth",
    "creator education",
    "creator network",
    "live streaming strategies",
    "how to grow on TikTok LIVE",
  ],
});

export default function FounderPage() {
  return (
    <>
      <JsonLd
        id="founder-person"
        data={personSchema({
          name: FOUNDER.name,
          alternateName: FOUNDER.alias,
          jobTitle: FOUNDER.title,
          description: FOUNDER_PERSON_DESCRIPTION,
          image: FOUNDER.photo,
          path: "/founder",
          sameAs: [
            `https://www.tiktok.com/@${FOUNDER.tiktokHandle}`,
            site.url,
          ],
          knowsAbout: [
            "TikTok LIVE",
            "TikTok LIVE agency",
            "TikTok LIVE growth",
            "live streaming coach",
            "creator education",
            "creator network",
            "livestream battles",
            "audience retention",
            "creator monetization",
          ],
          founderOfName: site.name,
          founderOfUrl: site.url,
        })}
      />
      <JsonLd id="founder-faq" data={faqSchema([...FOUNDER_FAQS])} />
      <JsonLd
        id="founder-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Founder", path: "/founder" },
        ])}
      />
      <FounderPageView />
    </>
  );
}
