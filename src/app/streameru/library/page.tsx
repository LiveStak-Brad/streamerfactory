import type { Metadata } from "next";
import { LibraryHome } from "@/components/streameru/library/LibraryHome";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "Free Worksheets & Checklists | StreamerU",
  description:
    "Browse free StreamerU worksheets and checklists — printable tools for every published lesson. Included with free Streamer Factory membership.",
  path: "/streameru/library",
  keywords: [
    "StreamerU library",
    "free live streaming worksheets",
    "TikTok LIVE checklist",
    "streamer worksheets",
    "printable creator tools",
  ],
});

export default function StreamerULibraryPage() {
  return (
    <>
      <JsonLd
        id="library-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "StreamerU", path: "/streameru" },
          { name: "Resource Library", path: "/streameru/library" },
        ])}
      />
      <LibraryHome />
    </>
  );
}
