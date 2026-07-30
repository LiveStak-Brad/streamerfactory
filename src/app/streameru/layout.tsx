import type { Metadata } from "next";
import { StreamerUCourseShell } from "@/components/streameru/StreamerUCourseShell";
import { CURRICULUM } from "@/lib/resources/curriculum";
import { getPublishedPostsInCurriculumOrder } from "@/lib/resources/queries";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { JsonLd, courseSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "StreamerU — TikTok LIVE Creator Academy",
  description:
    "Streamer University — structured TikTok LIVE training with a clear 24-lesson curriculum, missions, and creator academy paths.",
  path: "/streameru",
  keywords: [
    "StreamerU",
    "TikTok LIVE training",
    "creator academy",
    "TikTok LIVE tips",
    "streamer training",
  ],
});

export default async function StreamerULayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let publishedSlugs: string[] = [];
  try {
    const posts = await getPublishedPostsInCurriculumOrder();
    publishedSlugs = posts.map((p) => p.slug);
  } catch {
    publishedSlugs = [];
  }

  return (
    <>
      <JsonLd
        id="streameru-course"
        data={courseSchema({
          name: "StreamerU — TikTok LIVE Creator Academy",
          description:
            "Structured TikTok LIVE training with curriculum lessons and execution missions for Streamer Factory creators.",
          path: "/streameru",
          lessonsCount: CURRICULUM.length,
        })}
      />
      <StreamerUCourseShell publishedSlugs={publishedSlugs}>{children}</StreamerUCourseShell>
    </>
  );
}
