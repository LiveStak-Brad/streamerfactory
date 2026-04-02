/**
 * Topic groupings for /resources — maps DB category slugs to editorial sections.
 * Does not duplicate CMS data; only controls discovery order and copy.
 */

export type ResourceHubSection = {
  id: string;
  title: string;
  description: string;
  /** Match `resource_categories.slug` values; posts in any of these appear here. */
  categorySlugs: string[];
};

export const RESOURCE_HUB_SECTIONS: ResourceHubSection[] = [
  {
    id: "beginner",
    title: "Beginner essentials",
    description: "TikTok LIVE fundamentals — sound, framing, and early sessions that feel intentional.",
    categorySlugs: ["tiktok-live-basics"],
  },
  {
    id: "battles",
    title: "Battle strategy & collaboration",
    description: "Line up partners, structure battle weeks, and promote collabs with clarity.",
    categorySlugs: ["battles-collaboration"],
  },
  {
    id: "growth-money",
    title: "Growth, monetization & membership",
    description: "Weekly systems, gifts and goals, and how agency partnership fits together.",
    categorySlugs: ["monetization", "creator-growth"],
  },
  {
    id: "rules",
    title: "Rules, safety & compliance",
    description: "Stay in bounds while you scale — guidelines, moderation, and account health.",
    categorySlugs: ["platform-rules-safety"],
  },
  {
    id: "content",
    title: "Content & promotion",
    description: "Segments, hooks, and how you talk about battles without noise.",
    categorySlugs: ["content-strategy"],
  },
];
