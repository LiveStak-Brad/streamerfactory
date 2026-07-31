import type { Metadata } from "next";
import { StreamerUCourseShell } from "@/components/streameru/StreamerUCourseShell";
import { CURRICULUM } from "@/lib/resources/curriculum";
import { getPublishedPostsInCurriculumOrder } from "@/lib/resources/queries";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { JsonLd, courseSchema } from "@/lib/seo/json-ld";
import { ACADEMY_SEO, PUBLISHED_LESSON_COUNT } from "@/lib/streameru/academy-meta";

export const metadata: Metadata = createPageMetadata({
  title: ACADEMY_SEO.title,
  description: ACADEMY_SEO.description,
  path: "/streameru",
  keywords: [...ACADEMY_SEO.keywords],
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
          name: ACADEMY_SEO.title,
          description: `${ACADEMY_SEO.shortDescription} ${PUBLISHED_LESSON_COUNT} lessons available now.`,
          path: "/streameru",
          lessonsCount: CURRICULUM.length,
        })}
      />
      <StreamerUCourseShell publishedSlugs={publishedSlugs}>{children}</StreamerUCourseShell>
    </>
  );
}
