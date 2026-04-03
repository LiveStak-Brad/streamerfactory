import type { Metadata } from "next";
import { StreamerUCourseShell } from "@/components/streameru/StreamerUCourseShell";
import { getPublishedPostsInCurriculumOrder } from "@/lib/resources/queries";

export const metadata: Metadata = {
  title: "StreamerU",
  description:
    "Streamer University — structured TikTok LIVE training with a clear curriculum and lesson missions.",
  openGraph: {
    title: "StreamerU | Streamer Factory",
    description: "Course-style training for TikTok LIVE creators — curriculum, lessons, and execution.",
  },
};

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

  return <StreamerUCourseShell publishedSlugs={publishedSlugs}>{children}</StreamerUCourseShell>;
}
