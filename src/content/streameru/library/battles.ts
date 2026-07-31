/**
 * Gold-standard printable packs for Battles & Collaboration lessons 15–16
 * (understanding-battles, preparing-for-your-first-battle).
 * Matches the depth of the Beginner Foundations / Live Streaming Mastery packs.
 */

import type { LibraryResource } from "@/lib/streameru-library/types";

export const BATTLES_RESOURCES: LibraryResource[] = [
  // —— Understanding battles ——
  {
    id: "battle-observation-debrief",
    title: "Battle Observation Debrief",
    description:
      "Watch a real battle or recap, capture one specific tactic, and plan how you'll apply it on your own LIVE.",
    category: "battles",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["understanding-battles"],
    blocks: [
      {
        type: "intro",
        text: "Complete this before your mission LIVE. You are studying a battle — not booking or running one yet. Watch at least 20 minutes, live or a recap, from any creator.",
      },
      {
        type: "fill_lines",
        title: "What you watched",
        lines: [
          { label: "Creator(s) watched", rows: 1 },
          { label: "Format (1v1 / team / themed)", rows: 1 },
          { label: "Live or recap, approximate length watched", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "One specific tactic",
        lines: [
          { label: "What happened (comeback call, handling a loss, keeping energy up, etc.)", rows: 2 },
          { label: "Approximate timestamp", rows: 1 },
          { label: "Exact words or move you noticed", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Applying it tonight",
        lines: [
          { label: "How I'll bring this into my own 45+ minute LIVE", rows: 2 },
          { label: "Exact line I'll say when I reference what I saw", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Before you go live",
        items: [
          "Observation completed — at least 20 minutes watched",
          "One specific tactic written down, not a vague impression",
          "Reminder set to apply the tactic out loud during tonight's session",
        ],
      },
      {
        type: "callout",
        text: "This mission connects theory to practice. You are not scheduling or running a real battle tonight — that comes in the next lesson.",
      },
      {
        type: "notes",
        title: "After your LIVE: how did applying the tactic feel?",
        lines: 3,
      },
    ],
  },
  {
    id: "battle-vocabulary-sportsmanship-guide",
    title: "Battle Vocabulary & Sportsmanship Guide",
    description:
      "Plain-language battle definitions plus a five-point sportsmanship checklist to say regardless of win or loss.",
    category: "battles",
    kind: "guide",
    status: "ready",
    lessonSlugs: ["understanding-battles"],
    blocks: [
      {
        type: "intro",
        text: "Keep this nearby the first few times you watch or discuss battles. Vocabulary first, sportsmanship habits second — both matter before you ever step into one.",
      },
      {
        type: "table",
        title: "Battle vocabulary",
        columns: ["Term", "Plain-language meaning"],
        rows: 6,
        hint: "Suggested terms: gift bar, round, comeback, blowout, multi-guest, PK.",
      },
      {
        type: "checkbox_list",
        title: "Sportsmanship checklist — say these regardless of outcome",
        items: [
          "Congratulate your opponent genuinely, on camera, before anything else",
          "Thank both chats by name where you can",
          "Never mock a losing opponent's numbers or accuse anyone of 'buying' a win",
          "Keep your energy identical whether you're ahead or behind",
          "Close with a specific, forward-looking line — not a silent, abrupt exit",
        ],
      },
      {
        type: "callout",
        text: "Every battle is an audition for your next one. Partners and viewers remember who was gracious far longer than they remember the final score.",
      },
    ],
  },

  // —— Preparing for your first battle ——
  {
    id: "battle-day-checklist",
    title: "Battle Day Prep Checklist",
    description:
      "Account, tech, format, and backup-connection gate to run through before you ever confirm a battle date.",
    category: "battles",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["preparing-for-your-first-battle"],
    blocks: [
      {
        type: "intro",
        text: "Run through this before you promote anything — including tonight's dry-run mission. The goal is solving logistics here, on paper, instead of live, mid-conversation, with a partner watching.",
      },
      {
        type: "checkbox_list",
        title: "Account & format",
        items: [
          "Account is in good standing with LIVE features unrestricted",
          "Time zone confirmed explicitly (not assumed)",
          "Format decided: number of rounds, approximate duration, themed or standard 1v1",
        ],
      },
      {
        type: "checkbox_list",
        title: "Tech",
        items: [
          "Device charged with enough storage for a long session",
          "Backup connection plan ready (e.g. mobile data fallback)",
          "Audio tested; notifications silenced so they won't hijack the session",
          "Phone orientation confirmed (portrait for a clean split screen)",
        ],
      },
      {
        type: "fill_lines",
        title: "Tonight's dry-run plan",
        lines: [
          { label: "Announcement video posted (time)", rows: 1 },
          { label: "Hashtags used (3–5)", rows: 1 },
          { label: "Story reminder posted (time)", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "Mission target: 45+ minutes with a clean four-touchpoint promotion funnel, executed like it's a real battle — because tonight is where you rehearse it.",
      },
      {
        type: "notes",
        title: "After your LIVE: what logistics felt shaky?",
        lines: 3,
      },
    ],
  },
  {
    id: "partner-agreement-promotion-funnel",
    title: "Partner Agreement & Promotion Funnel Template",
    description:
      "A lightweight written agreement plus a fill-in video caption, hashtag set, and story text for battle-day promotion.",
    category: "battles",
    kind: "template",
    status: "ready",
    lessonSlugs: ["preparing-for-your-first-battle"],
    blocks: [
      {
        type: "intro",
        text: "You don't need a contract — you need a shared understanding both people said yes to, in writing, somewhere you can both see it. Fill this even for a hypothetical future partner tonight.",
      },
      {
        type: "fill_lines",
        title: "Partner agreement",
        lines: [
          { label: "Date and start time (with time zone)", rows: 1 },
          { label: "Format (rounds, approximate duration)", rows: 1 },
          { label: "Reschedule plan if someone needs to move it", rows: 2 },
          { label: "Tone / content boundaries", rows: 2 },
          { label: "Single point of contact", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Promotion funnel — four touchpoints",
        lines: [
          { label: "Announcement video caption", rows: 2 },
          { label: "Hashtags (3–5, specific and relevant)", rows: 1 },
          { label: "Story reminder text (same-day, with visible time)", rows: 2 },
          { label: "Optional cross-post closer to start time", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Before you post anything",
        items: [
          "Explicit yes received — not just a soft 'sounds good'",
          "Details confirmed on Battle Hub or a shared note, not only a disappearing chat",
          "Promotion spread across the day — no repeated identical posts within an hour",
        ],
      },
      {
        type: "callout",
        text: "A battle that only exists in a screenshot of a DM is easy to forget, double-book, or dispute later. Once you're ready to book for real, Battle Hub's scheduler is the source of truth.",
      },
    ],
  },
];
