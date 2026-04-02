/**
 * Curated "Start Here" learning path for new TikTok LIVE creators.
 * Edit slugs here as you publish or reorder guides — no CMS changes required.
 */

export type StartHereResolvedItem =
  | {
      kind: "article";
      slug: string;
      stepLabel: string;
      sectionTitle: string;
      sectionIntro: string;
      cardTitle: string;
      cardDescription: string;
      href: string;
      exists: true;
    }
  | {
      kind: "article";
      slug: string;
      stepLabel: string;
      sectionTitle: string;
      sectionIntro: string;
      cardTitle: string;
      cardDescription: string;
      /** Published article missing — link to library instead of a 404. */
      exists: false;
      browseHref: string;
    }
  | {
      kind: "hub";
      stepLabel: string;
      sectionTitle: string;
      sectionIntro: string;
      cardTitle: string;
      cardDescription: string;
      href: string;
      hrefLabel: string;
    };

export type StartHereSection = {
  id: string;
  stepLabel: string;
  title: string;
  intro: string;
  items: StartHereResolvedItem[];
};

/** Slugs that belong to the Start Here path (for article page promos). Keep in sync with START_HERE_PATH article steps. */
export const START_HERE_ARTICLE_SLUGS = [
  "first-10-tiktok-live-sessions",
  "content-loops-repeatable-segments",
  "gifts-goals-momentum",
  "structure-your-first-battle-week",
] as const;

export function isStartHereArticleSlug(slug: string): boolean {
  return (START_HERE_ARTICLE_SLUGS as readonly string[]).includes(slug);
}

/**
 * Ordered path: one primary item per step (article slug or hub link).
 * If a slug is missing or unpublished, the resolver shows a soft placeholder using fallback copy.
 */
export const START_HERE_PATH = [
  {
    id: "basics",
    stepLabel: "Step 1",
    title: "TikTok LIVE basics",
    intro:
      "Lock in audio, framing, and pacing before you chase trends — viewers decide in seconds whether to stay.",
    primarySlug: "first-10-tiktok-live-sessions",
    fallbackTitle: "Your first 10 LIVE sessions",
    fallbackDescription:
      "A practical checklist for lighting, audio, pacing, and calls-to-action—so early streams feel intentional, not chaotic.",
  },
  {
    id: "consistency",
    stepLabel: "Step 2",
    title: "First streams & consistency",
    intro:
      "Build repeatable segments and a rhythm viewers recognize — consistency beats random viral attempts.",
    primarySlug: "content-loops-repeatable-segments",
    fallbackTitle: "Content loops & repeatable segments",
    fallbackDescription:
      "A simple framework for hooks, value, interaction, and callbacks — so every LIVE has structure.",
  },
  {
    id: "battles",
    stepLabel: "Step 3",
    title: "Battles & collaboration",
    intro:
      "LIVE battles are a core growth lever. Plan the week, lock times, then use Battle Hub and the calendar so everyone sees the same truth.",
    hubHref: "/battle-hub",
    hubLabel: "Open Battle Hub",
    cardTitle: "Schedule & join network battles",
    cardDescription:
      "Use Battle Hub to create events, share flyers, and see what’s coming on the shared calendar — coordination beats DMs in group chats.",
    secondarySlug: "structure-your-first-battle-week",
    secondaryFallbackTitle: "Structure your first battle week",
    secondaryFallbackDescription:
      "Partners, time zones, and promotion — a simple shape for the week so battles feel organized, not chaotic.",
  },
  {
    id: "monetization",
    stepLabel: "Step 4",
    title: "Monetization & growth",
    intro:
      "Think about gifts and goals as a system: energy, trust, and sustainable schedules — not endless grind sessions.",
    primarySlug: "gifts-goals-momentum",
    fallbackTitle: "Gifts, goals, and momentum",
    fallbackDescription:
      "How to think about monetization on LIVE: clear goals, recovery, and audience trust.",
  },
] as const;
