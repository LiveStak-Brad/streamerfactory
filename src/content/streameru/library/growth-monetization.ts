/**
 * Gold-standard printable packs for Growth & Monetization lesson 20
 * (gifts-goals-momentum). Matches the depth of the Battles / Beginner
 * Foundations packs.
 */

import type { LibraryResource } from "@/lib/streameru-library/types";

export const GROWTH_MONETIZATION_RESOURCES: LibraryResource[] = [
  // —— How gifting works ——
  {
    id: "gift-literacy-cheat-sheet",
    title: "Gift Literacy Cheat Sheet",
    description:
      "The coins → gifts → creator value flow explained in plain language, ready to recite confidently in under 15 seconds.",
    category: "monetization",
    kind: "guide",
    status: "ready",
    lessonSlugs: ["gifts-goals-momentum"],
    blocks: [
      {
        type: "intro",
        text: "Your job is to understand the flow well enough to explain it in two sentences without hedging — not to memorize coin prices or quote exact payout thresholds on stream.",
      },
      {
        type: "fill_lines",
        title: "Write it in your own words",
        lines: [
          { label: "The flow, in one sentence (real money → coins → gifts → creator value)", rows: 2 },
          { label: "What I'll say if a new viewer asks 'how does this even work?'", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Why people actually gift",
        items: [
          "Recognition — name or handle seen and acknowledged",
          "Status and play — leaderboards, animations, streaks as a small game",
          "Reciprocity — returning value you gave them first",
          "Belonging — reinforcing they're part of the room",
          "Support for a person, not a transaction",
        ],
      },
      {
        type: "callout",
        text: "This is currency literacy, not accounting. A short, confident answer beats a long, defensive one every time.",
      },
    ],
  },
  {
    id: "one-sentence-goal-template",
    title: "One-Sentence Goal Template",
    description:
      "Write your transparent session goal — what and why — in advance so you don't improvise it live.",
    category: "monetization",
    kind: "template",
    status: "ready",
    lessonSlugs: ["gifts-goals-momentum"],
    blocks: [
      {
        type: "fill_lines",
        title: "Tonight's goal",
        lines: [
          { label: "What I'm working toward", rows: 1 },
          { label: "Why it matters to me (honest, not exaggerated)", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Transparency check",
        items: [
          "The goal is real, not an invented number designed to manufacture urgency",
          "The reason behind it is honest, not exaggerated for sympathy",
          "I'll state it once near the start and let it sit in the background",
        ],
      },
      {
        type: "callout",
        text: "'I'm saving toward a better mic so the audio keeps improving for you all' is transparent. A dramatized guilt story is not — and viewers can tell the difference.",
      },
    ],
  },
  {
    id: "gratitude-phrase-bank",
    title: "Gratitude Phrase Bank",
    description:
      "Five to six varied acknowledgment lines to rotate through live, so thank-yous never start sounding automated.",
    category: "monetization",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["gifts-goals-momentum"],
    blocks: [
      {
        type: "fill_lines",
        title: "My gratitude rotation",
        lines: [
          { label: "Phrase 1 (small gift)", rows: 1 },
          { label: "Phrase 2 (small gift)", rows: 1 },
          { label: "Phrase 3 (medium gift)", rows: 1 },
          { label: "Phrase 4 (medium gift)", rows: 1 },
          { label: "Phrase 5 (large gift)", rows: 1 },
          { label: "Phrase 6 (large gift)", rows: 1 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Every reaction",
        items: [
          "React immediately — don't let a gift sit unacknowledged",
          "Use the name or handle when visible",
          "Connect it to something real in one sentence, without turning it into a speech",
          "Never make non-gifters feel like second-class viewers",
        ],
      },
    ],
  },
  {
    id: "momentum-vs-begging-self-audit",
    title: "Momentum vs. Begging Self-Audit",
    description:
      "Sort your own common gifting-related phrases into keep or rewrite using the removal test from this lesson.",
    category: "monetization",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["gifts-goals-momentum"],
    blocks: [
      {
        type: "intro",
        text: "Momentum is energy-forward and inclusive. Begging is need-forward and exclusionary. Run the removal test: would this line still make sense if you removed all mention of gifting?",
      },
      {
        type: "table",
        title: "My phrases, sorted",
        columns: ["Phrase I catch myself saying", "Keep or rewrite?"],
        rows: 5,
      },
      {
        type: "callout",
        text: "Momentum works even if the goal is never hit. Begging only makes sense if it succeeds — and it's the line between education and a hard sell.",
      },
    ],
  },
];
