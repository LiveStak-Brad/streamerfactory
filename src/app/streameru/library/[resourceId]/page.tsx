import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderResourceView } from "@/components/streameru/library/PlaceholderResourceView";
import { PrintableSheet } from "@/components/streameru/library/PrintableSheet";
import { PrintToolbar } from "@/components/streameru/library/PrintToolbar";
import "@/components/streameru/library/streameru-print.css";
import { getLibraryResource, getAllLibraryResources } from "@/lib/streameru-library/catalog";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/json-ld";

type Props = {
  params: Promise<{ resourceId: string }>;
};

export function generateStaticParams() {
  return getAllLibraryResources().map((r) => ({ resourceId: r.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { resourceId } = await params;
  const resource = getLibraryResource(resourceId);
  if (!resource) return { title: "Resource" };
  return createPageMetadata({
    title: `${resource.title} · StreamerU Library`,
    description: resource.description,
    path: `/streameru/library/${resource.id}`,
  });
}

export default async function StreamerULibraryResourcePage({ params }: Props) {
  const { resourceId } = await params;
  const resource = getLibraryResource(resourceId);
  if (!resource) notFound();

  const primarySlug = resource.lessonSlugs[0] ?? null;

  return (
    <div className="su-library-resource mx-auto max-w-3xl pb-16">
      <JsonLd
        id="library-resource-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "StreamerU", path: "/streameru" },
          { name: "Resource Library", path: "/streameru/library" },
          { name: resource.title, path: `/streameru/library/${resource.id}` },
        ])}
      />

      {resource.status === "ready" ? (
        <>
          <PrintToolbar
            resourceTitle={resource.title}
            lessonSlug={primarySlug}
            pdfUrl={resource.pdfUrl}
          />
          <PrintableSheet resource={resource} />
        </>
      ) : (
        <PlaceholderResourceView resource={resource} />
      )}
    </div>
  );
}
