import type { Metadata } from "next";
import { HallOfFamePageView } from "@/components/hall-of-fame/HallOfFamePageView";
import { Container } from "@/components/ui/Container";
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
  return (
    <div className="border-b border-border/70 bg-muted-bg/30 pb-16 pt-8 dark:border-zinc-800 dark:bg-zinc-950/40 sm:pt-10">
      <Container className="max-w-6xl">
        <HallOfFamePageView />
      </Container>
    </div>
  );
}
