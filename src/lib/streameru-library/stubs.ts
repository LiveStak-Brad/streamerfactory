/**
 * Lessons 6–24: ready mission checklists + placeholder worksheets.
 * Plus library-only category seeds (branding / business / future battle & monetization tools).
 */

import { CURRICULUM } from "@/lib/resources/curriculum";
import {
  buildMissionChecklistResource,
  buildPlaceholderWorksheet,
} from "@/lib/streameru-library/checklist-from-mission";
import type { LibraryResource } from "@/lib/streameru-library/types";

/** Placeholder worksheet titles per lesson slug (lessons 6–24). */
const PLACEHOLDER_BY_SLUG: Record<
  string,
  { id: string; title: string; description: string; kind?: LibraryResource["kind"] }
> = {
  // talking-with-empty-room, hooks-and-first-impressions, content-loops-repeatable-segments,
  // structuring-longer-lives, growth-weekly-system, understanding-battles, and
  // preparing-for-your-first-battle ship gold-standard `ready` packs in
  // live-streaming-mastery.ts / battles.ts instead of a stub placeholder —
  // see LIVE_STREAMING_MASTERY_RESOURCES and BATTLES_RESOURCES.
  "structure-your-first-battle-week": {
    id: "battle-script-sheet",
    title: "Battle Script Sheet",
    description: "Energy calls, thank-yous, and structure for your first network battle.",
    kind: "script",
  },
  "improving-battle-performance": {
    id: "battle-performance-debrief",
    title: "Battle Performance Debrief",
    description: "What worked, one fix, and the drill for next match.",
    kind: "journal",
  },
  "building-battle-partners": {
    id: "partner-tracker",
    title: "Partner Tracker",
    description: "Track collab partners, follow-ups, and next battle asks.",
    kind: "tracker",
  },
  "gifts-goals-momentum": {
    id: "gift-literacy-sheet",
    title: "Gift Literacy Sheet",
    description: "Explain gifts clearly — goals and gratitude without guilt.",
    kind: "worksheet",
  },
  "creating-reasons-to-gift": {
    id: "value-stack-planner",
    title: "Value Stack Planner",
    description: "Design three ‘reasons to stay’ segments worth supporting.",
    kind: "planner",
  },
  "setting-goals-during-lives": {
    id: "goal-planner",
    title: "Goal Planner",
    description: "Start / mid / end goal checkpoints for a goal-forward LIVE.",
    kind: "planner",
  },
  "scaling-consistency": {
    id: "daily-volume-log",
    title: "Daily Volume Log",
    description: "Log 60–120 minute volume days without sacrificing quality.",
    kind: "tracker",
  },
  "building-income-habits": {
    id: "monthly-income-worksheet",
    title: "Monthly Income Worksheet",
    description: "Sustainable pacing and income habit tracking for LIVE weeks.",
    kind: "tracker",
  },
};

/** Custom checklist titles for stub lessons (clearer than default). */
const CHECKLIST_TITLE_BY_SLUG: Record<string, string> = {
  "talking-with-empty-room": "Empty Room Mission Checklist",
  "hooks-and-first-impressions": "Hook Practice Mission Checklist",
  "content-loops-repeatable-segments": "Retention Mission Checklist",
  "structuring-longer-lives": "Long LIVE Mission Checklist",
  "growth-weekly-system": "Repeat Viewer Mission Checklist",
  "understanding-battles": "Battle Study Mission Checklist",
  "preparing-for-your-first-battle": "Battle Prep Mission Checklist",
  "structure-your-first-battle-week": "First Battle Mission Checklist",
  "improving-battle-performance": "Battle Improve Mission Checklist",
  "building-battle-partners": "Partner Pipeline Mission Checklist",
  "gifts-goals-momentum": "Gifting Mission Checklist",
  "creating-reasons-to-gift": "Value LIVE Mission Checklist",
  "setting-goals-during-lives": "Goals Mission Checklist",
  "scaling-consistency": "Volume Day Mission Checklist",
  "building-income-habits": "Income Habits Mission Checklist",
  "your-creator-operating-system": "OS Proof Mission Checklist",
};

/** Lessons covered by gold-standard packs (not stubbed with placeholders). */
const GOLD_PACK_SLUGS = new Set([
  "start-strong-on-tiktok-live",
  "your-first-live-structure",
  "first-10-tiktok-live-sessions",
  "first-week-of-lives-consistency",
  "common-live-mistakes-new-creators",
  "platform-rules-new-live-creators",
  "what-gets-you-banned",
  "how-to-avoid-violations",
  "long-term-account-safety",
  "your-creator-operating-system",
  "creator-brand-that-survives-the-feed",
  "reading-your-live-numbers",
  "creative-planning-for-real-weeks",
  "growth-experiments-that-dont-wreck-your-show",
  "professional-standards-on-live",
  "privacy-security-and-personal-boundaries",
  "advanced-creator-capstone-30-day-pro-sprint",
]);

export function buildStubLessonResources(): LibraryResource[] {
  const out: LibraryResource[] = [];

  for (const lesson of CURRICULUM) {
    if (GOLD_PACK_SLUGS.has(lesson.slug)) continue;

    const checklist = buildMissionChecklistResource(lesson.slug, {
      title: CHECKLIST_TITLE_BY_SLUG[lesson.slug],
    });
    if (checklist) out.push(checklist);

    const ph = PLACEHOLDER_BY_SLUG[lesson.slug];
    if (ph) {
      out.push(
        buildPlaceholderWorksheet(lesson.slug, {
          id: ph.id,
          title: ph.title,
          description: ph.description,
          kind: ph.kind,
        }),
      );
    }
  }

  return out;
}

/** Library-only seeds so categories feel alive beyond lesson attachments. */
/** Library-hub seeds (not attached to lesson pages — avoids cluttering Downloads). */
export const CATEGORY_SEED_PLACEHOLDERS: LibraryResource[] = [
  {
    id: "gift-tracker",
    title: "Gift Tracker",
    description: "Track gifts, milestones, and thank-you habits across sessions.",
    category: "monetization",
    kind: "tracker",
    status: "placeholder",
    lessonSlugs: [],
    comingSoonNote:
      "Coming soon — use the Gifting Mission Checklist on the monetization lessons today.",
  },
  {
    id: "creator-brand-workbook",
    title: "Creator Brand Workbook",
    description: "Positioning, visual identity, and voice guidelines for your LIVE brand.",
    category: "branding",
    kind: "worksheet",
    status: "placeholder",
    lessonSlugs: [],
    comingSoonNote:
      "On the roadmap. Start with the Profile Optimization Worksheet from Lesson 1.",
  },
  {
    id: "content-calendar",
    title: "Content Calendar",
    description: "Weekly LIVE + short-form calendar so promotion and streaming stay aligned.",
    category: "branding",
    kind: "planner",
    status: "placeholder",
    lessonSlugs: [],
    comingSoonNote:
      "Coming soon. Use the First Week Planner and Weekly Consistency Calendar meanwhile.",
  },
  {
    id: "clip-planning-sheet",
    title: "Clip Planning Sheet",
    description: "Plan which LIVE moments become clips before you go live.",
    category: "branding",
    kind: "worksheet",
    status: "placeholder",
    lessonSlugs: [],
    comingSoonNote: "Coming soon — hook practice tools ship with the content pack expansion.",
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    description: "Gear, software, and promo spend tracking for creator businesses.",
    category: "business",
    kind: "tracker",
    status: "placeholder",
    lessonSlugs: [],
    comingSoonNote: "Business pack on the roadmap. Focus on LIVE habits first — tools follow.",
  },
  {
    id: "sponsorship-planner",
    title: "Sponsorship Planner",
    description: "Rate card notes, deliverables, and brand-safe talk tracks.",
    category: "business",
    kind: "planner",
    status: "placeholder",
    lessonSlugs: [],
    comingSoonNote: "Coming as the business library expands. Keep streaming consistently first.",
  },
  {
    id: "tax-prep-checklist",
    title: "Tax Prep Checklist",
    description: "Year-end checklist for LIVE income records and deductible habits.",
    category: "business",
    kind: "checklist",
    status: "placeholder",
    lessonSlugs: [],
    comingSoonNote:
      "Placeholder for the business pack. Income Habits Mission Checklist is ready on Lesson 20.",
  },
  {
    id: "lighting-guide",
    title: "Lighting Guide",
    description: "Printable lighting setups for phone LIVE — budget to better.",
    category: "beginner",
    kind: "guide",
    status: "placeholder",
    lessonSlugs: [],
    comingSoonNote: "Coming soon. First Stream Checklist covers lighting basics today.",
  },
  {
    id: "microphone-guide",
    title: "Microphone Guide",
    description: "Mic options and placement tips for clearer LIVE audio.",
    category: "beginner",
    kind: "guide",
    status: "placeholder",
    lessonSlugs: [],
    comingSoonNote: "On the roadmap. Use First Stream Checklist for today’s audio gate.",
  },
  {
    id: "obs-cheat-sheet",
    title: "OBS Cheat Sheet",
    description: "Quick reference for scenes, audio, and go-live when you move beyond phone-only.",
    category: "content",
    kind: "guide",
    status: "placeholder",
    lessonSlugs: [],
    comingSoonNote: "Coming later in the content library expansion.",
  },
  {
    id: "networking-worksheet",
    title: "Networking Worksheet",
    description: "Warm outreach scripts and follow-ups for creator collaborations.",
    category: "battles",
    kind: "worksheet",
    status: "placeholder",
    lessonSlugs: [],
    comingSoonNote: "Partner Tracker ships with the battles pack — mission checklists are ready now.",
  },
];