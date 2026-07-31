import type { Metadata } from "next";
import { AcademyHubFooterBridge } from "@/components/streameru/AcademyHubFooterBridge";
import { StreamerUAcademyHome } from "@/components/streameru/StreamerUAcademyHome";
import { getSessionProfile } from "@/lib/auth/server";
import { getPublishedPostsInCurriculumOrder } from "@/lib/resources/queries";
import { ACADEMY_SEO } from "@/lib/streameru/academy-meta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: ACADEMY_SEO.title,
  description: ACADEMY_SEO.description,
  keywords: [...ACADEMY_SEO.keywords],
  openGraph: {
    title: `${ACADEMY_SEO.title} | ${site.name}`,
    description: ACADEMY_SEO.shortDescription,
    images: [{ url: "/branding/og/streameru.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: ACADEMY_SEO.title,
    description: ACADEMY_SEO.shortDescription,
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

  const session = await getSessionProfile();
  const isSignedIn = Boolean(session?.user);

  return (
    <div className="max-w-4xl">
      <StreamerUAcademyHome publishedSlugs={publishedSlugs} />
      <AcademyHubFooterBridge isSignedIn={isSignedIn} />
    </div>
  );
}
