import type { MetadataRoute } from "next";
import { ALL_GUIDES, GUIDE_CATEGORIES } from "@/lib/guides";
import { CURRICULUM } from "@/lib/resources/curriculum";
import { site } from "@/lib/site";

const STATIC_ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/founder", changeFrequency: "monthly", priority: 0.85 },
  { path: "/apply", changeFrequency: "weekly", priority: 0.95 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/members", changeFrequency: "daily", priority: 0.7 },
  { path: "/rankings", changeFrequency: "daily", priority: 0.75 },
  { path: "/hall-of-fame", changeFrequency: "monthly", priority: 0.7 },
  { path: "/streameru", changeFrequency: "weekly", priority: 0.9 },
  { path: "/streameru/start-here", changeFrequency: "weekly", priority: 0.85 },
  { path: "/battle-hub", changeFrequency: "weekly", priority: 0.7 },
  { path: "/guides", changeFrequency: "weekly", priority: 0.95 },
  { path: "/guides/editorial-standards", changeFrequency: "yearly", priority: 0.4 },
  { path: "/creator-stories", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${site.url}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryEntries = GUIDE_CATEGORIES.map((category) => ({
    url: `${site.url}/guides/category/${category.id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guideEntries = ALL_GUIDES.map((guide) => ({
    url: `${site.url}/guides/${guide.slug}`,
    lastModified: new Date(guide.dateModified),
    changeFrequency: "weekly" as const,
    priority: guide.priority,
  }));

  const lessonEntries = CURRICULUM.map((lesson) => ({
    url: `${site.url}/streameru/${lesson.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...categoryEntries, ...guideEntries, ...lessonEntries];
}
