/**
 * Gold-standard printable packs for Battles & Collaboration lessons 15–19
 * (understanding-battles through building-battle-partners).
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

  // —— Running your first battle ——
  {
    id: "battle-week-checklist",
    title: "Battle Week Checklist",
    description:
      "Scheduling, explicit partner confirmation, day-of promotion, and hosting structure for the week you run your first real battle.",
    category: "battles",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["structure-your-first-battle-week"],
    blocks: [
      {
        type: "intro",
        text: "This is game day, not another rehearsal. Work through this before you promote anything, and keep it visible during the battle itself.",
      },
      {
        type: "checkbox_list",
        title: "Scheduling & confirmation",
        items: [
          "Battle scheduled in Battle Hub with a real date, start time, and format visible to the network",
          "Explicit yes received from your partner — 'confirmed, see you then,' not a soft maybe",
          "Reschedule plan and tone boundaries already agreed on from your partner agreement",
        ],
      },
      {
        type: "fill_lines",
        title: "Day-of promotion timeline",
        lines: [
          { label: "Announcement video (posted day before or morning of)", rows: 1 },
          { label: "Hashtags used (3–5, specific and relevant)", rows: 1 },
          { label: "Story reminder (time visible)", rows: 1 },
          { label: "Optional cross-post closer to start time", rows: 1 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Hosting shape — Open, Play, Recover, Close",
        items: [
          "Open: welcomed both rooms, named the format, set the tone",
          "Play: called scoreboard swings with steady energy in either direction",
          "Recover: used gaps between rounds deliberately — recap, thank-you, setup",
          "Close: thanked opponent by name, thanked both chats, named what's next",
        ],
      },
      {
        type: "callout",
        text: "The single rule this week: no ghosting. If something goes wrong, say so out loud and finish the commitment — communicating through a problem is professional, disappearing is not.",
      },
    ],
  },
  {
    id: "three-question-debrief-card",
    title: "Three-Question Debrief Card",
    description:
      "The same-night debrief framework that turns one battle into real, trackable improvement instead of a vibe check.",
    category: "battles",
    kind: "journal",
    status: "ready",
    lessonSlugs: ["structure-your-first-battle-week", "improving-battle-performance"],
    blocks: [
      {
        type: "intro",
        text: "Fill this out within an hour of ending the LIVE, while the match is still fresh. Skipping this is the single most common reason creators battle repeatedly without visibly improving.",
      },
      {
        type: "fill_lines",
        title: "Tonight's debrief",
        lines: [
          { label: "What worked?", rows: 2 },
          { label: "What's one specific thing that didn't, or could be better?", rows: 2 },
          { label: "What will I test next time?", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "One specific, testable change compounds fast across five or six matches. Ten vague ones don't compound at all — they just create a pile of guilt. Pick one.",
      },
      {
        type: "notes",
        title: "Next battle: did the fix I tested actually work?",
        lines: 3,
      },
    ],
  },

  // —— Improving battle performance ——
  {
    id: "battle-iteration-log",
    title: "Battle Iteration Log",
    description:
      "Track battles over time — date, partner, tested change, result — so you respond to real patterns instead of one outlier.",
    category: "battles",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["improving-battle-performance"],
    blocks: [
      {
        type: "intro",
        text: "One battle tells you almost nothing reliable. Five battles, logged and reviewed, tell you a lot. Log every match here, even briefly.",
      },
      {
        type: "table",
        title: "Battle log",
        columns: ["Date", "Partner", "One thing tested", "Result / what happened"],
        rows: 6,
      },
      {
        type: "checkbox_list",
        title: "Review every 3–5 battles",
        items: [
          "Do I consistently lose energy in a specific round?",
          "Does a particular type of energy call reliably get a response?",
          "Are certain partners consistently more collaborative than others?",
        ],
      },
      {
        type: "callout",
        text: "Treat each battle as one rep in a longer pattern, not a referendum on your ability. Recovery time between battles is part of the improvement loop, not a break from it.",
      },
    ],
  },
  {
    id: "healthy-vs-toxic-ask-reference",
    title: "Healthy vs. Toxic Ask Language Reference Sheet",
    description:
      "The momentum-vs-begging distinction with example phrases, plus the removal test to run on your own language mid-stream.",
    category: "battles",
    kind: "guide",
    status: "ready",
    lessonSlugs: ["improving-battle-performance"],
    blocks: [
      {
        type: "intro",
        text: "Momentum is energy-forward and inclusive. Begging is need-forward and exclusionary. Keep this nearby until the distinction is automatic.",
      },
      {
        type: "table",
        title: "Momentum vs. begging examples",
        columns: ["Healthy momentum", "Toxic pressure (avoid)"],
        rows: 4,
        hint: "Example: 'We're closing the gap fast, I think we've got this' vs. 'Come on, nobody's gifted in five minutes.'",
      },
      {
        type: "checkbox_list",
        title: "The removal test",
        items: [
          "Would this line still make sense if I removed all mention of gifting?",
          "If it collapses into nothing without the ask attached, rewrite it before saying it again.",
        ],
      },
      {
        type: "callout",
        text: "Say thank you before you ask for anything else, every single time. Protect what worked just as carefully as you fix what didn't.",
      },
    ],
  },

  // —— Building battle partners ——
  {
    id: "battle-finder-outreach-template",
    title: "Battle Finder Outreach Message Template",
    description:
      "A specific, low-pressure first-contact script for reaching new partners through Battle Finder.",
    category: "battles",
    kind: "template",
    status: "ready",
    lessonSlugs: ["building-battle-partners"],
    blocks: [
      {
        type: "intro",
        text: "A specific first message gets a faster, clearer answer than an open-ended one, and signals you're someone who plans.",
      },
      {
        type: "fill_lines",
        title: "First outreach message",
        lines: [
          { label: "Who you are / what you do", rows: 1 },
          { label: "Why your styles or audience sizes fit", rows: 1 },
          { label: "One concrete day range or format proposed", rows: 1 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Fit checklist before you reach out",
        items: [
          "Similar audience size",
          "Overlapping availability",
          "Complementary, not directly competing, content style",
        ],
      },
      {
        type: "callout",
        text: "Battle Hub is a relationship tool, not just a scoreboard. Use it the way you'd use a real professional network — specific asks, honest follow-through.",
      },
    ],
  },
  {
    id: "partner-reliability-tracker",
    title: "Partner Reliability Tracker",
    description:
      "Track name, date, effort match, and follow-through across collaborations so your go-to bench is built on evidence, not one impression.",
    category: "battles",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["building-battle-partners"],
    blocks: [
      {
        type: "table",
        title: "Partner log",
        columns: ["Name", "Date", "Promotion / energy match", "Followed through on next step?"],
        rows: 6,
      },
      {
        type: "checkbox_list",
        title: "Every collab-forward session",
        items: [
          "Gave at least one specific, genuine shout-out early in the session",
          "Gave a second shout-out near the close",
          "Asked directly, on camera, for a next collab before ending",
        ],
      },
      {
        type: "callout",
        text: "Reputation compounds whether you notice it or not. A creator known for reliability gets asked back — a creator known for flakiness gets quietly removed from people's shortlist.",
      },
      {
        type: "notes",
        title: "Reciprocity check-in — is promotional effort roughly balanced?",
        lines: 2,
      },
    ],
  },
];
