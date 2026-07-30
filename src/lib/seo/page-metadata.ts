import type { Metadata } from "next";
import { brandAssets } from "@/lib/brand/assets";
import { site } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogType?: "website" | "article";
  noIndex?: boolean;
  /** Absolute or site-relative OG image path. */
  ogImage?: string;
};

/**
 * Consistent per-page metadata: title template, description, canonical, OG, Twitter.
 */
export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  ogType = "website",
  noIndex = false,
  ogImage = brandAssets.og.homepage,
}: PageMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${site.url}${canonicalPath === "/" ? "" : canonicalPath}`;
  const isAbsoluteTitle = title.includes(site.name) || canonicalPath === "/";
  const fullTitle = isAbsoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: isAbsoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: ogType,
      locale: "en_US",
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
  };
}
