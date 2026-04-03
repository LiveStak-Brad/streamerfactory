/**
 * “Start here” is **lessons 1–4 of the main curriculum** — not a separate program.
 * Order and titles come only from `curriculum.ts` (see `getStartHereCurriculumLessons`).
 */

import { getStartHereCurriculumLessons } from "@/lib/resources/curriculum";

/** Intros for each of the first four curriculum slugs (Learning section context). */
const STEP_INTRO_BY_SLUG: Record<string, string> = {
  "start-strong-on-tiktok-live":
    "Lock in how LIVE works on TikTok, your profile, audio, and framing — viewers decide in seconds whether to stay.",
  "your-first-live-structure":
    "Give every session a beginning, middle, and end so you are never stuck staring at a quiet room without a plan.",
  "first-10-tiktok-live-sessions":
    "Treat your first longer sessions as practice reps: one improvement per LIVE until the basics feel automatic.",
  "first-week-of-lives-consistency":
    "Stack seven intentional go-lives in one week — rhythm beats random long streams for building a real habit.",
};

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
      exists: false;
      browseHref: string;
    };

export type StartHereSection = {
  id: string;
  stepLabel: string;
  title: string;
  intro: string;
  items: StartHereResolvedItem[];
};

export type StartHerePathStep = {
  id: string;
  stepLabel: string;
  title: string;
  intro: string;
  primarySlug: string;
  fallbackTitle: string;
  fallbackDescription: string;
};

function buildStartHerePath(): StartHerePathStep[] {
  const four = getStartHereCurriculumLessons();
  return four.map((lesson, i) => ({
    id: `curriculum-${lesson.globalOrder}`,
    stepLabel: `Step ${i + 1}`,
    title: lesson.title,
    intro: STEP_INTRO_BY_SLUG[lesson.slug] ?? "",
    primarySlug: lesson.slug,
    fallbackTitle: lesson.title,
    fallbackDescription: "Open this lesson in the StreamerU program once it is published.",
  }));
}

/** Resolved at module load from `curriculum.ts` — always aligned with lessons 1–4. */
export const START_HERE_PATH: readonly StartHerePathStep[] = buildStartHerePath();

/** For lesson-page promos — same four slugs as the start path. */
export const START_HERE_ARTICLE_SLUGS = getStartHereCurriculumLessons().map((l) => l.slug) as readonly string[];

export function isStartHereArticleSlug(slug: string): boolean {
  return (START_HERE_ARTICLE_SLUGS as readonly string[]).includes(slug);
}
