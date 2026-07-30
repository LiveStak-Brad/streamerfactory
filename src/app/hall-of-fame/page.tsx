import type { Metadata } from "next";
import { HallOfFamePageView } from "@/components/hall-of-fame/HallOfFamePageView";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Factory Hall of Fame",
  description:
    "Streamer Factory Hall of Fame — monthly champions, runner-ups, network leadership, and lifetime Factory Legends.",
  path: "/hall-of-fame",
  ogImage: "/branding/og/rankings.png",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HallOfFamePage() {
  return <HallOfFamePageView />;
}
