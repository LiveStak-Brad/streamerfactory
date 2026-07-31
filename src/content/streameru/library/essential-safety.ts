/**
 * Gold-standard printable packs for Essential Safety (curriculum lessons 3–6,
 * the `rules` track inside Beginner Foundations).
 * Matches the depth of beginner-foundations.ts — bespoke tools, not stub placeholders.
 */

import type { LibraryResource } from "@/lib/streameru-library/types";

export const ESSENTIAL_SAFETY_RESOURCES: LibraryResource[] = [
  // —— Lesson 3: TikTok rules explained ——
  {
    id: "risk-category-field-guide",
    title: "Risk Category Field Guide",
    description:
      "The seven durable risk categories plus your professional baseline, in one printable reference.",
    category: "safety",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["platform-rules-new-live-creators"],
    blocks: [
      {
        type: "intro",
        text: "Gold-standard Lesson 3 tool. Read this before every early LIVE until the categories become automatic. This is a mental model, not a memorized rulebook — specific policies update; these categories do not.",
      },
      {
        type: "checkbox_list",
        title: "The seven risk categories",
        items: [
          "Safety and harm — dangerous acts, self-harm content, real violence",
          "Minor safety — unsupervised minors, sexualized or endangering content, blurred-line interactions",
          "Harassment and hate — targeting people or groups, coordinated pile-ons",
          "Deception and manipulation — fake engagement, misleading claims, impersonation",
          "Regulated or restricted content — drugs, weapons, gambling and similar categories",
          "Intellectual property — unlicensed music, video, or branded content",
          "Nudity and sexual content — explicit or suggestive content beyond general-audience limits",
        ],
      },
      {
        type: "checkbox_list",
        title: "Professional baseline (apply every session)",
        items: [
          "I know who is in my room and address unfamiliar or ambiguous accounts",
          "My sound source is a platform library or a licensed track",
          "I do not chase controversy for a short-term view spike",
          "I moderate actively, not only after something escalates",
          "I could explain any five minutes of my last LIVE to a reviewer",
        ],
      },
      {
        type: "fill_lines",
        title: "Your notes",
        lines: [
          { label: "A moment this week that felt borderline — which category?", rows: 2 },
          { label: "How you handled it (or how you will next time)", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Self-check before any risky topic: could I explain any five minutes of this to a reviewer? If not, redirect.",
      },
    ],
  },
  {
    id: "professional-baseline-card",
    title: "Professional Baseline Card",
    description:
      "A pocket reference for sound sourcing, minor-safety defaults, and moderation habits before you go live.",
    category: "safety",
    kind: "template",
    status: "ready",
    lessonSlugs: ["platform-rules-new-live-creators"],
    blocks: [
      {
        type: "intro",
        text: "Keep this next to your setup. Run it as a 30-second pre-live gate, the same way you check audio and light.",
      },
      {
        type: "checkbox_list",
        title: "Before you go live",
        items: [
          "Sound source confirmed: platform library or licensed track only",
          "Redirect phrase ready for off-limits chat requests",
          "Phrase ready for an ambiguous minor-safety moment",
          "Moderator briefed or solo-watch plan active",
        ],
      },
      {
        type: "fill_lines",
        title: "Write your two go-to phrases",
        lines: [
          { label: "Redirect phrase (off-limits topic or dare)", rows: 2 },
          { label: "Minor-safety phrase (ambiguous account)", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Post-stream self-check: could I explain any five minutes of that LIVE to a reviewer?",
      },
    ],
  },

  // —— Lesson 4: What gets you banned ——
  {
    id: "red-line-reference-card",
    title: "Red-Line Reference Card",
    description:
      "The eight hard-stop behaviors that reliably escalate fast, plus the one-second self-check phrase.",
    category: "safety",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["what-gets-you-banned"],
    blocks: [
      {
        type: "intro",
        text: "Gold-standard Lesson 4 tool. These behaviors share one pattern: a vulnerable person, real danger, or bad-faith manipulation. Memorize the pattern, not just the list.",
      },
      {
        type: "checkbox_list",
        title: "Hard stops — always, no exceptions",
        items: [
          "Sexualized content involving minors, in any form",
          "Staged real danger or dangerous physical stunts",
          "Hate speech or targeted harassment, even framed as a joke",
          "Financial deception — fake charity, scams, pyramid pitches",
          "Doxxing or sharing private information",
          "Promoting illegal goods or services",
          "Ban evasion or engagement manipulation",
          "Explicit sexual content or solicitation",
        ],
      },
      {
        type: "callout",
        text: "One-second self-check: \"If a stranger clipped the next thirty seconds with no context and sent it to trust and safety, would I be comfortable with that clip existing?\" If no — skip, redirect, or reframe.",
      },
      {
        type: "fill_lines",
        title: "Your two ready-made redirect lines",
        lines: [
          { label: "For a risky dare or request", rows: 2 },
          { label: "For a hate-speech-adjacent joke", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "self-check-habit-tracker",
    title: "Self-Check Habit Tracker",
    description:
      "Log moments you ran the one-second self-check live, so the habit compounds session to session.",
    category: "safety",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["what-gets-you-banned"],
    blocks: [
      {
        type: "intro",
        text: "Fill this after each LIVE. The goal is not zero risky moments — it's proof you caught and redirected them before they became a problem.",
      },
      {
        type: "table",
        title: "Session log",
        columns: ["Date", "Moment that triggered the check", "What you did", "Would you handle it the same way again?"],
        rows: 6,
      },
      {
        type: "checkbox_list",
        title: "Habit check",
        items: [
          "I ran the self-check out loud at least once this session",
          "I declined or redirected without over-explaining",
          "I did not let audience reaction override the check",
        ],
      },
    ],
  },

  // —— Lesson 5: How to avoid violations ——
  {
    id: "moderator-brief-builder",
    title: "Moderator Brief Builder",
    description:
      "A fill-in template so you can brief a new moderator clearly in one message, before you ever need them.",
    category: "safety",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["how-to-avoid-violations"],
    blocks: [
      {
        type: "intro",
        text: "Gold-standard Lesson 5 tool. Recruit and brief moderators during calm sessions — never during a crisis. Fill this once, then send it directly to a trusted regular.",
      },
      {
        type: "fill_lines",
        title: "The brief",
        lines: [
          { label: "What you can act on immediately, without asking me (spam, obvious harassment, clear red-line content)", rows: 3 },
          { label: "What to flag to me quietly first (ambiguous situations, repeat minor offenders)", rows: 3 },
          { label: "How to reach me fast during a session (keyword, DM, signal)", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Before you send the brief",
        items: [
          "I picked a consistent, level-headed regular — not just the most active chatter",
          "I explained the role clearly instead of saying \"just keep chat nice\"",
          "I confirmed they know where their authority starts and stops",
        ],
      },
      {
        type: "callout",
        text: "Even one active moderator changes your entire risk profile. You cannot watch every message while also hosting.",
      },
    ],
  },
  {
    id: "topic-fence-planner",
    title: "Topic Fence Planner",
    description:
      "Decide your topic boundaries and exact bridge-back line before you go live — not while chat is already pulling you toward one.",
    category: "safety",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["how-to-avoid-violations"],
    blocks: [
      {
        type: "intro",
        text: "Fill this before every session until it becomes automatic. A fence removes a decision from the pressured moment — you already made the call before you went live.",
      },
      {
        type: "fill_lines",
        title: "Tonight's topic fences (minimum three)",
        lines: [
          { label: "Fence 1", rows: 1 },
          { label: "Fence 2", rows: 1 },
          { label: "Fence 3", rows: 1 },
          { label: "Fence 4 (optional)", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Your one bridge-back line",
        lines: [
          { label: "\"That's not something I get into on stream — let's...\"", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Standing habits to run alongside your fences",
        items: [
          "Sound source confirmed: platform library or licensed track only",
          "Chat norms pinned (3–4 max)",
          "Warning-then-timeout escalation plan clear in your head",
        ],
      },
    ],
  },

  // —— Lesson 6: Long-term account safety ——
  {
    id: "account-stewardship-audit",
    title: "Account Stewardship Audit",
    description:
      "A one-time deep pass on access recovery, collaborator permissions, and brand-deal fit — the capstone safety checklist.",
    category: "safety",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["long-term-account-safety"],
    blocks: [
      {
        type: "intro",
        text: "Gold-standard Lesson 6 tool. Run this once now, thoroughly. The Monthly Safety Self-Audit keeps it current after today.",
      },
      {
        type: "checkbox_list",
        title: "Access recovery",
        items: [
          "Recovery phone number is current and one I will control for years",
          "Recovery email is current and one I will control for years",
          "Two-factor authentication is enabled",
          "Backup codes stored in a password manager or durable physical location — not a screenshot",
        ],
      },
      {
        type: "fill_lines",
        title: "Collaborator and manager access",
        lines: [
          { label: "Current collaborators with account access", rows: 3 },
          { label: "Anyone who should be removed today", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Brand and sponsorship fit",
        lines: [
          { label: "Any pending offers to vet (what, disclosure needed, fit?)", rows: 3 },
        ],
      },
      {
        type: "callout",
        text: "A brand that pressures you to decide instantly, without letting you review terms, is telling you how they'll treat you later.",
      },
    ],
  },
  {
    id: "monthly-safety-self-audit",
    title: "Monthly Safety Self-Audit",
    description:
      "A repeatable one-page review — clips, fences, moderators, brand fit — run on a fixed date every month.",
    category: "safety",
    kind: "journal",
    status: "ready",
    lessonSlugs: ["long-term-account-safety"],
    blocks: [
      {
        type: "intro",
        text: "Pick a fixed date (e.g. the 1st) and run this every month, whether or not anything feels wrong. Drift is quiet — this habit is what catches it.",
      },
      {
        type: "fill_lines",
        title: "This month",
        lines: [
          { label: "Date" },
          { label: "Two recent clips I watched back", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Quick review",
        items: [
          "My topic fences still held this month — no quiet erosion",
          "My moderator bench is still active and briefed",
          "My pinned chat norms are still accurate and current",
          "No unreviewed brand or sponsorship offers are pending",
          "Recovery access still confirmed current",
        ],
      },
      {
        type: "fill_lines",
        title: "One thing to tighten next month",
        lines: [{ label: "", rows: 3 }],
      },
      {
        type: "notes",
        title: "Notes",
        lines: 3,
      },
    ],
  },
];
