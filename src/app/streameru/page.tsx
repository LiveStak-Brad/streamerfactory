import type { Metadata } from "next";
import Link from "next/link";
import { StreamerUAcademyHome } from "@/components/streameru/StreamerUAcademyHome";
import { Button } from "@/components/ui/Button";
import { getPublishedPostsInCurriculumOrder } from "@/lib/resources/queries";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "StreamerU",
  description:
    "Structured TikTok LIVE training — Streamer University from Streamer Factory. One curriculum, 24 lessons.",
  openGraph: {
    title: "StreamerU | Streamer Factory",
    description:
      "Structured TikTok LIVE training — Streamer University from Streamer Factory. One curriculum, 24 lessons.",
    images: [{ url: "/branding/og/streameru.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/branding/og/streameru.png"],
  },
};

export default async function StreamerUPage() {
  let publishedSlugs: string[] = [];
  try {
    const posts = await getPublishedPostsInCurriculumOrder();
    publishedSlugs = posts.map((p) => p.slug);
  } catch {
    publishedSlugs = [];
  }

  return (
    <div className="max-w-4xl">
      <StreamerUAcademyHome publishedSlugs={publishedSlugs} />

      <div className="mt-12 flex flex-wrap gap-3 border-t border-border/80 pt-10 dark:border-zinc-800">
        <Button href={tiktokCreatorNetworkApplyUrl} external variant="primary" className="min-h-[44px] px-5">
          Join on TikTok
        </Button>
        <Link
          href="/apply"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground dark:border-zinc-700"
        >
          Request website access
        </Link>
        <Link
          href="/about"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground dark:border-zinc-700"
        >
          How we support creators
        </Link>
      </div>
    </div>
  );
}
