/**
 * Gold-standard printable packs for Content Creation Mastery.
 */

import type { LibraryResource } from "@/lib/streameru-library/types";

export const CONTENT_CREATION_RESOURCES: LibraryResource[] = [
  // —— CC-01 Finding Your Niche Without Boxing Yourself In ——
  {
    id: "niche-statement-worksheet",
    title: "Niche Statement Worksheet",
    description:
      "Draft a flexible niche statement: who you serve, the recurring feeling, and room to grow — without locking into one format forever.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["finding-your-niche-without-boxing-yourself-in"],
    blocks: [
      {
        type: "intro",
        text: "A niche is a direction, not a cage. Fill this before your Niche Proof LIVE. If your statement only fits one viral format, you boxed yourself in.",
      },
      {
        type: "fill_lines",
        title: "Core niche statement (one paragraph max)",
        lines: [
          { label: "Who I am for (viewer type + situation)", rows: 2 },
          { label: "The recurring feeling or outcome they get from staying", rows: 2 },
          { label: "What I do on LIVE that delivers that feeling (not a single gimmick)", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Flexibility test",
        lines: [
          { label: "Three different LIVE formats that still fit this statement", rows: 3 },
          { label: "One thing I could add in six months without rebranding", rows: 2 },
          { label: "One thing I will refuse even if it trends (boundary)", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "One-breath version for your open",
        lines: [
          { label: "Say it out loud in one sentence", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Revisit this at the end of CC-10, not every quiet Tuesday. A niche that survives is honest about who you are today with room for tomorrow.",
      },
    ],
  },
  {
    id: "in-out-boundary-card",
    title: "In / Out Boundary Card",
    description:
      "One-page card: what is in your niche lane, what is out, and the gray zone you will test carefully.",
    category: "content",
    kind: "template",
    status: "ready",
    lessonSlugs: ["finding-your-niche-without-boxing-yourself-in"],
    blocks: [
      {
        type: "intro",
        text: "Print this beside your setup. Boundaries protect recognition — they are not rejections of fun. Update only when something is factually wrong, not when a day was quiet.",
      },
      {
        type: "fill_lines",
        title: "In — always on-brand",
        lines: [
          { label: "Topic / mood 1", rows: 1 },
          { label: "Topic / mood 2", rows: 1 },
          { label: "Topic / mood 3", rows: 1 },
          { label: "Format or segment that fits", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Out — even if it spikes numbers",
        lines: [
          { label: "Topic / tone I will not do", rows: 2 },
          { label: "Why it breaks trust with my core viewer", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Gray zone — test once, then decide",
        lines: [
          { label: "What I might try", rows: 1 },
          { label: "How I will know if it belongs in or out", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Before a gray-zone LIVE",
        items: [
          "I can explain why this still serves my niche statement",
          "I have a rollback plan if chat or replay feels off-brand",
          "I will log the result on my Niche Proof Live Log",
        ],
      },
    ],
  },
  {
    id: "niche-proof-live-log",
    title: "Niche Proof Live Log",
    description:
      "Post-LIVE log: did today's session prove your niche statement — with space for four proof sessions.",
    category: "content",
    kind: "journal",
    status: "ready",
    lessonSlugs: ["finding-your-niche-without-boxing-yourself-in"],
    blocks: [
      {
        type: "intro",
        text: "Fill within 15 minutes of ending. Proof is behavior on LIVE, not vibes. Run at least four sessions before you rewrite your niche statement.",
      },
      {
        type: "table",
        title: "Proof sessions",
        columns: ["Date", "Niche moment (what proved it)", "Chat signal", "Keep / tweak / cut"],
        rows: 4,
        hint: "Chat signal = a quote, repeat question, or return viewer behavior — not just peak count.",
      },
      {
        type: "fill_lines",
        title: "After four sessions",
        lines: [
          { label: "What consistently proved the niche", rows: 2 },
          { label: "What felt forced or off-lane", rows: 2 },
          { label: "One tweak to niche statement (if any)", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "One quiet LIVE is not proof your niche is wrong. Look for patterns across sessions, not revenge pivots.",
      },
    ],
  },

  // —— CC-02 Becoming Memorable on LIVE ——
  {
    id: "memorability-kit",
    title: "Memorability Kit",
    description:
      "Build three memorable anchors: verbal hook, visual cue, and recurring bit — with a test plan for your next LIVE.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["becoming-memorable-on-live"],
    blocks: [
      {
        type: "intro",
        text: "Memorable is repeatable, not random. Pick anchors viewers can describe to a friend. Avoid stacking five new bits in one stream.",
      },
      {
        type: "fill_lines",
        title: "Verbal anchor",
        lines: [
          { label: "Phrase, greeting, or sign-off (sayable in one breath)", rows: 2 },
          { label: "When I will use it (open / segment / close)", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Visual anchor",
        lines: [
          { label: "Prop, overlay, outfit detail, or frame habit", rows: 2 },
          { label: "Why it reads on a phone screen", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Recurring bit (small, sustainable)",
        lines: [
          { label: "The bit in one sentence", rows: 2 },
          { label: "How often (every LIVE / weekly / themed weeks only)", rows: 1 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Memorability sanity check",
        items: [
          "Each anchor fits my niche statement from CC-01",
          "I can run all three without exhausting myself",
          "Nothing relies on insulting viewers or shock for shock's sake",
          "I wrote when each anchor hits on today's run-of-show",
        ],
      },
    ],
  },
  {
    id: "signature-moment-planner",
    title: "Signature Moment Planner",
    description:
      "Plan one signature moment per LIVE: setup, peak, and callback — so memorable beats are intentional.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["becoming-memorable-on-live"],
    blocks: [
      {
        type: "intro",
        text: "One signature moment beats three half-finished gimmicks. Plan it like a segment, not a surprise you hope happens.",
      },
      {
        type: "fill_lines",
        title: "Today's signature moment",
        lines: [
          { label: "Moment name (internal label)", rows: 1 },
          { label: "What the viewer gets (feeling or payoff)", rows: 2 },
          { label: "Setup — how I tee it up in the first third", rows: 2 },
        ],
      },
      {
        type: "timed_segments",
        title: "Run-of-show placement",
        segments: [
          { label: "Setup", minutes: "5–8", prompt: "Verbal or visual cue that this moment is coming" },
          { label: "Peak", minutes: "3–10", prompt: "The bit itself — protect this from chat chaos" },
          { label: "Callback", minutes: "1–2", prompt: "Reference it once later so it sticks in memory" },
        ],
      },
      {
        type: "fill_lines",
        title: "After LIVE",
        lines: [
          { label: "Did it land? (chat + replay evidence)", rows: 2 },
          { label: "Keep weekly / monthly / retire", rows: 1 },
        ],
      },
    ],
  },
  {
    id: "friend-describe-test-card",
    title: "Friend Describe Test Card",
    description:
      "Ask one trusted person to describe your LIVE in one sentence — capture gaps between intent and memory.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["becoming-memorable-on-live"],
    blocks: [
      {
        type: "intro",
        text: "Memorable means describable. If a friend cannot say what you do in one sentence after watching 10 minutes, your anchors are not landing.",
      },
      {
        type: "fill_lines",
        title: "Before the test",
        lines: [
          { label: "Who watched (friend / mod / creator peer)", rows: 1 },
          { label: "Clip or LIVE they saw (date / length)", rows: 1 },
          { label: "What I hoped they would say", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Their exact words (no coaching)",
        lines: [
          { label: "One-sentence description they gave", rows: 2 },
          { label: "Specific detail they remembered (phrase, visual, moment)", rows: 2 },
          { label: "What they got wrong or missed", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Repair options (pick one)",
        items: [
          "Strengthen one anchor from the Memorability Kit",
          "Move signature moment earlier in the stream",
          "Cut a competing bit that dilutes memory",
          "Update niche one-breath line to match what actually lands",
        ],
      },
      {
        type: "fill_lines",
        title: "One change for next LIVE",
        lines: [
          { label: "What I will do differently", rows: 2 },
        ],
      },
    ],
  },

  // —— CC-03 Creating Recurring Segments Viewers Expect ——
  {
    id: "segment-bible-template",
    title: "Segment Bible Template",
    description:
      "Document one recurring segment: purpose, timing, rules, and variations so you can run it consistently.",
    category: "content",
    kind: "template",
    status: "ready",
    lessonSlugs: ["creating-recurring-segments-viewers-expect"],
    blocks: [
      {
        type: "intro",
        text: "Viewers return for segments they can anticipate. A segment bible is the recipe — not a script word-for-word.",
      },
      {
        type: "fill_lines",
        title: "Segment identity",
        lines: [
          { label: "Segment name (sayable on LIVE)", rows: 1 },
          { label: "One-sentence purpose (why it exists)", rows: 2 },
          { label: "Default slot (e.g. minute 15–25, or after first gift wave)", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Structure",
        lines: [
          { label: "Open cue (how viewers know it started)", rows: 2 },
          { label: "Core activity (3–5 steps max)", rows: 3 },
          { label: "Close cue (how it ends cleanly)", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Rules and variations",
        lines: [
          { label: "Non-negotiable rules (time cap, tone, who participates)", rows: 2 },
          { label: "Allowed variations (themes, guests, difficulty)", rows: 2 },
          { label: "When to skip or shorten (bad day protocol)", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Launch with one segment, not five. Expectation beats variety in month one.",
      },
    ],
  },
  {
    id: "two-segment-launch-plan",
    title: "Two-Segment Launch Plan",
    description:
      "Four-week plan to introduce two recurring segments without overwhelming your LIVE flow.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["creating-recurring-segments-viewers-expect"],
    blocks: [
      {
        type: "intro",
        text: "Introduce segment A until chat asks for it by name, then add segment B. Parallel launches create chaos and forgotten bits.",
      },
      {
        type: "table",
        title: "Four-week rollout",
        columns: ["Week", "Segment A", "Segment B", "Verbal cue to viewers"],
        rows: 4,
        hint: "Weeks 1–2: A only. Week 3: tease B. Week 4: both on schedule.",
      },
      {
        type: "fill_lines",
        title: "Segment A summary",
        lines: [
          { label: "Name + default time slot", rows: 1 },
          { label: "Success signal (how I know viewers expect it)", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Segment B summary",
        lines: [
          { label: "Name + default time slot", rows: 1 },
          { label: "How B differs from A (no overlap confusion)", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Launch week checklist",
        items: [
          "Segment bible filled for each active segment",
          "Open mentions today's segment by name",
          "Close names next LIVE day and which segment returns",
          "Replay note logged for Segment Replay Rubric review",
        ],
      },
    ],
  },
  {
    id: "segment-replay-rubric",
    title: "Segment Replay Rubric",
    description:
      "Score a segment replay on clarity, energy, pacing, and expectation — with one fix per session.",
    category: "content",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["creating-recurring-segments-viewers-expect"],
    blocks: [
      {
        type: "intro",
        text: "Watch only the segment clip, not the whole VOD. Rate honestly 1–5. One fix beats a full redesign.",
      },
      {
        type: "fill_lines",
        title: "Session",
        lines: [
          { label: "Date / segment name", rows: 1 },
          { label: "Clip timestamp", rows: 1 },
        ],
      },
      {
        type: "table",
        title: "Rubric (1 = weak, 5 = strong)",
        columns: ["Criterion", "Score", "Evidence", "One fix"],
        rows: 4,
        hint: "Rows: Clarity (viewers knew what was happening), Energy, Pacing, Expectation (would they wait for it again).",
      },
      {
        type: "fill_lines",
        title: "Decision",
        lines: [
          { label: "Keep as-is / tweak bible / retire segment", rows: 1 },
          { label: "Specific bible change", rows: 2 },
        ],
      },
    ],
  },

  // —— CC-04 Running Themed Weeks ——
  {
    id: "themed-week-planner",
    title: "Themed Week Planner",
    description:
      "One-page planner: theme, daily angles, segment tie-ins, and a realistic capacity check for five LIVE days.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["running-themed-weeks"],
    blocks: [
      {
        type: "intro",
        text: "A themed week is one idea worn five different ways — not five unrelated specials. Plan recovery if you cannot run five days.",
      },
      {
        type: "fill_lines",
        title: "Week theme",
        lines: [
          { label: "Theme title (viewer-facing)", rows: 1 },
          { label: "Why this theme fits my niche", rows: 2 },
          { label: "One sentence promo hook for the week", rows: 2 },
        ],
      },
      {
        type: "table",
        title: "Daily LIVE map",
        columns: ["Day", "Angle (today's slice of theme)", "Segment focus", "Length"],
        rows: 5,
      },
      {
        type: "checkbox_list",
        title: "Capacity check",
        items: [
          "Theme does not require new props every day",
          "At least two days reuse core segments with theme skin",
          "I have one lighter day if energy dips mid-week",
          "Finale day has a clear peak planned (see Week Finale Checklist)",
        ],
      },
    ],
  },
  {
    id: "daily-angle-card",
    title: "Daily Angle Card",
    description:
      "Single-day card: today's theme angle, open tease, segment hook, and close callback to the week arc.",
    category: "content",
    kind: "template",
    status: "ready",
    lessonSlugs: ["running-themed-weeks"],
    blocks: [
      {
        type: "intro",
        text: "Print one card per themed day. The angle is today's flavor of the same week — not a new show.",
      },
      {
        type: "fill_lines",
        title: "Today",
        lines: [
          { label: "Day ___ of theme: ___________", rows: 1 },
          { label: "Today's angle in one sentence", rows: 2 },
          { label: "How today connects to yesterday (callback)", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "On-LIVE cues",
        lines: [
          { label: "Open tease (mention week + today's angle)", rows: 2 },
          { label: "Segment hook (which segment gets theme treatment)", rows: 2 },
          { label: "Close (tomorrow's angle + week finale tease if applicable)", rows: 2 },
        ],
      },
      {
        type: "notes",
        title: "Post-LIVE one-liner for tomorrow's callback",
        lines: 2,
      },
    ],
  },
  {
    id: "week-finale-checklist",
    title: "Week Finale Checklist",
    description:
      "Finale-day checklist: recap, peak moment, gratitude, and next-week bridge without burnout.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["running-themed-weeks"],
    blocks: [
      {
        type: "intro",
        text: "The finale pays off the week. Viewers should feel closure plus reason to return — not exhaustion from you.",
      },
      {
        type: "checkbox_list",
        title: "Before Go Live",
        items: [
          "I can name all five angles from memory",
          "Peak moment planned (not improvised hope)",
          "Segments shortened or merged if I am tired",
          "Promo for next week / next theme drafted",
        ],
      },
      {
        type: "checkbox_list",
        title: "During finale",
        items: [
          "Open callbacks to at least two prior days",
          "One viewer-facing recap (30–60 seconds max)",
          "Signature segment runs with theme payoff",
          "Close states next LIVE and whether theme continues",
        ],
      },
      {
        type: "fill_lines",
        title: "After finale (10 minutes)",
        lines: [
          { label: "Best moment of the week", rows: 2 },
          { label: "Repeat this theme in 90 days? Y / N — why", rows: 2 },
          { label: "One recovery rule for next week", rows: 1 },
        ],
      },
    ],
  },

  // —— CC-05 Story Arcs Across Multiple LIVEs ——
  {
    id: "multi-live-arc-map",
    title: "Multi-LIVE Arc Map",
    description:
      "Map a 3–5 LIVE story arc: beginning hook, mid-point turn, finale payoff, and optional branches.",
    category: "content",
    kind: "template",
    status: "ready",
    lessonSlugs: ["story-arcs-across-multiple-lives"],
    blocks: [
      {
        type: "intro",
        text: "Arcs work when each LIVE has its own value plus a thread forward. Plan checkpoints so late joiners are not lost.",
      },
      {
        type: "fill_lines",
        title: "Arc overview",
        lines: [
          { label: "Arc title (internal + viewer-facing if shared)", rows: 1 },
          { label: "Central question or tension", rows: 2 },
          { label: "Planned LIVE count", rows: 1 },
        ],
      },
      {
        type: "table",
        title: "LIVE-by-LIVE map",
        columns: ["LIVE #", "Role (setup / turn / payoff)", "Must-happen beat", "Catch-up line for new viewers"],
        rows: 5,
      },
      {
        type: "fill_lines",
        title: "Exit ramps",
        lines: [
          { label: "If I miss a LIVE, how the arc continues", rows: 2 },
          { label: "If arc ends early, minimum satisfying close", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "checkpoint-checklist",
    title: "Checkpoint Checklist",
    description:
      "Between-arc LIVE checklist: recap, progress signal, tease, and log — keeps serial viewers oriented.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["story-arcs-across-multiple-lives"],
    blocks: [
      {
        type: "intro",
        text: "Run at open and close of every arc LIVE. Checkpoints are kindness to people who missed yesterday.",
      },
      {
        type: "checkbox_list",
        title: "Open checkpoint (first 3 minutes)",
        items: [
          "Named the arc in one sentence",
          "30-second recap of last LIVE (or 'arc start' if LIVE 1)",
          "Stated today's beat role (setup / turn / payoff)",
          "Catch-up line ready for chat ('new here? here's where we are')",
        ],
      },
      {
        type: "checkbox_list",
        title: "Close checkpoint",
        items: [
          "Marked progress toward arc resolution (visible or verbal)",
          "Teased next LIVE beat without spoiling payoff",
          "Named next LIVE day/time",
          "Logged beat on Arc Debrief Sheet within 15 minutes",
        ],
      },
      {
        type: "fill_lines",
        title: "If chat is lost",
        lines: [
          { label: "Confusion I saw", rows: 1 },
          { label: "Extra recap I will add next time", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "arc-debrief-sheet",
    title: "Arc Debrief Sheet",
    description:
      "Post-arc review: planned vs actual beats, viewer retention signals, and reuse decision.",
    category: "content",
    kind: "journal",
    status: "ready",
    lessonSlugs: ["story-arcs-across-multiple-lives"],
    blocks: [
      {
        type: "intro",
        text: "Debrief when the arc ends — not after every LIVE unless you are mid-course correcting. Honest notes beat heroic memory.",
      },
      {
        type: "fill_lines",
        title: "Arc summary",
        lines: [
          { label: "Arc title / LIVE dates", rows: 1 },
          { label: "Planned payoff", rows: 2 },
          { label: "Actual payoff (what happened)", rows: 2 },
        ],
      },
      {
        type: "table",
        title: "Beat audit",
        columns: ["LIVE #", "Planned beat", "Actual", "Viewer signal"],
        rows: 5,
      },
      {
        type: "checkbox_list",
        title: "Reuse decision",
        items: [
          "Arc structure worth repeating with new topic",
          "Checkpoints worked — keep format",
          "Arc too long — shorten next time",
          "Standalone LIVEs still strong — arc is optional spice",
        ],
      },
      {
        type: "fill_lines",
        title: "One lesson for next arc",
        lines: [
          { label: "What I will do differently", rows: 2 },
        ],
      },
    ],
  },

  // —— CC-06 Community Events on LIVE ——
  {
    id: "event-run-of-show",
    title: "Event Run of Show",
    description:
      "Timed run-of-show for a community event LIVE: segments, roles, contingencies, and hard stop.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["community-events-on-live"],
    blocks: [
      {
        type: "intro",
        text: "Events need a run-of-show like a small broadcast. Chaos is optional; structure is professional.",
      },
      {
        type: "fill_lines",
        title: "Event header",
        lines: [
          { label: "Event name + date/time", rows: 1 },
          { label: "Viewer promise (why show up live)", rows: 2 },
          { label: "Hard stop time (protect your energy)", rows: 1 },
        ],
      },
      {
        type: "timed_segments",
        title: "Run of show",
        segments: [
          { label: "Pre-show hold", minutes: "2–5", prompt: "Music / chat / countdown — state start time" },
          { label: "Open + rules", minutes: "3–5", prompt: "What happens, how to participate, safety tone" },
          { label: "Main blocks", minutes: "___", prompt: "List 2–4 blocks with owners" },
          { label: "Peak / reveal", minutes: "___", prompt: "The moment worth promoting" },
          { label: "Close + next", minutes: "3–5", prompt: "Thanks, recap, next LIVE" },
        ],
      },
      {
        type: "fill_lines",
        title: "Contingencies",
        lines: [
          { label: "If tech fails", rows: 1 },
          { label: "If participation is low", rows: 1 },
          { label: "If energy drops early", rows: 1 },
        ],
      },
    ],
  },
  {
    id: "five-day-promo-checklist",
    title: "Five-Day Promo Checklist",
    description:
      "Day-by-day promo plan for an event: tease, proof, countdown, live reminder, and afterglow.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["community-events-on-live"],
    blocks: [
      {
        type: "intro",
        text: "Promo is a story, not one post. Five touches beat one megaphone the night before.",
      },
      {
        type: "table",
        title: "Five-day promo map",
        columns: ["Day", "Channel (LIVE / post / story)", "Message type", "Done?"],
        rows: 5,
        hint: "Day -5 tease, -3 proof, -1 countdown, day-of reminder, +1 afterglow.",
      },
      {
        type: "checkbox_list",
        title: "Each promo touch includes",
        items: [
          "Event name and date/time in platform timezone",
          "One reason to attend (not just 'big stream')",
          "How to participate (gift, keyword, guest, etc.)",
          "Visual or clip that matches event tone",
        ],
      },
      {
        type: "fill_lines",
        title: "Afterglow (+1 day)",
        lines: [
          { label: "Clip or highlight to post", rows: 2 },
          { label: "Thank-you line for participants", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "event-after-action-review",
    title: "Event After-Action Review",
    description:
      "Structured AAR: objectives, attendance signals, what broke, what to repeat — under 20 minutes.",
    category: "content",
    kind: "journal",
    status: "ready",
    lessonSlugs: ["community-events-on-live"],
    blocks: [
      {
        type: "intro",
        text: "Complete within 24 hours while memory is fresh. Events are experiments — file what you learned.",
      },
      {
        type: "fill_lines",
        title: "Objectives vs results",
        lines: [
          { label: "Primary objective", rows: 1 },
          { label: "Did we hit it? Evidence", rows: 2 },
          { label: "Secondary objective (optional)", rows: 1 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Signals",
        items: [
          "Peak concurrent vs typical LIVE",
          "Participation rate (chat, gifts, joins) vs plan",
          "New vs returning viewer mix noticeable",
          "Clips or quotes worth saving",
        ],
      },
      {
        type: "fill_lines",
        title: "What broke / what sang",
        lines: [
          { label: "One thing to fix before next event", rows: 2 },
          { label: "One thing to repeat exactly", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Next event",
        lines: [
          { label: "Run again in ___ weeks — or pause because", rows: 2 },
        ],
      },
    ],
  },

  // —— CC-07 Interactive Shows That Aren't Chaos ——
  {
    id: "interactive-format-card",
    title: "Interactive Format Card",
    description:
      "Define one interactive format: rules, participation limits, host script edges, and fun ceiling.",
    category: "content",
    kind: "template",
    status: "ready",
    lessonSlugs: ["interactive-shows-that-arent-chaos"],
    blocks: [
      {
        type: "intro",
        text: "Interactivity needs guardrails. The format card is the referee — viewers play inside the lines.",
      },
      {
        type: "fill_lines",
        title: "Format identity",
        lines: [
          { label: "Format name", rows: 1 },
          { label: "What viewers do (one verb)", rows: 1 },
          { label: "What I do as host", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Rules (say these out loud)",
        lines: [
          { label: "Who can participate / how often", rows: 2 },
          { label: "Time cap per round", rows: 1 },
          { label: "Topics or behaviors off limits", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Host edges",
        lines: [
          { label: "Open script (3 sentences max)", rows: 3 },
          { label: "When to pause or skip chat", rows: 2 },
          { label: "Close script", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "If you cannot explain the format in 30 seconds, simplify before Go Live.",
      },
    ],
  },
  {
    id: "roles-kill-switch-sheet",
    title: "Roles & Kill Switch Sheet",
    description:
      "Assign mod/host roles and pre-decide kill switches when interactive segments overheat.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["interactive-shows-that-arent-chaos"],
    blocks: [
      {
        type: "intro",
        text: "Chaos is unplanned interactivity. Kill switches are professional, not party-pooping — decide them before LIVE.",
      },
      {
        type: "table",
        title: "Role map",
        columns: ["Role", "Person", "Authority", "Hand signal / keyword"],
        rows: 4,
        hint: "Host, mod, co-host, timekeeper — adapt to your team size.",
      },
      {
        type: "checkbox_list",
        title: "Kill switch triggers (check any that apply)",
        items: [
          "Personal info appearing in chat",
          "Pile-on or harassment toward a participant",
          "Format drift — segment past time cap",
          "Host lost control of tone or topic",
          "Technical failure mid-round",
        ],
      },
      {
        type: "fill_lines",
        title: "Kill switch actions",
        lines: [
          { label: "Verbal line I will use to pause", rows: 2 },
          { label: "What happens next (skip round / break / end segment)", rows: 2 },
          { label: "Recovery line to restart or move on", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "interactive-replay-rubric",
    title: "Interactive Replay Rubric",
    description:
      "Score interactive segment replays: clarity, fairness, pacing, and chaos level — one fix per review.",
    category: "content",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["interactive-shows-that-arent-chaos"],
    blocks: [
      {
        type: "intro",
        text: "Watch the interactive block only. Goal: fun with structure. Score 1–5; one fix per session.",
      },
      {
        type: "fill_lines",
        title: "Session",
        lines: [
          { label: "Date / format name", rows: 1 },
          { label: "Clip range", rows: 1 },
        ],
      },
      {
        type: "table",
        title: "Rubric",
        columns: ["Criterion", "Score (1–5)", "Note", "Fix"],
        rows: 4,
        hint: "Clarity of rules, Fairness of participation, Pacing, Chaos (5 = controlled fun, 1 = spiral).",
      },
      {
        type: "fill_lines",
        title: "Format card update",
        lines: [
          { label: "Rule or script change for next time", rows: 2 },
        ],
      },
    ],
  },

  // —— CC-08 Seasonal Content Without Gimmicks ——
  {
    id: "ninety-day-seasonal-calendar",
    title: "90-Day Seasonal Calendar",
    description:
      "Quarter view of seasons and holidays: anchor events, light touches, and explicit skip list.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["seasonal-content-without-gimmicks"],
    blocks: [
      {
        type: "intro",
        text: "Seasonal content should feel native to your niche — not a costume change. Mark peaks, light touches, and skips.",
      },
      {
        type: "fill_lines",
        title: "Quarter header",
        lines: [
          { label: "Months covered", rows: 1 },
          { label: "Niche reminder (one line)", rows: 1 },
        ],
      },
      {
        type: "table",
        title: "Season map",
        columns: ["Date / season", "Tier (peak / light / skip)", "Angle tied to niche", "Asset needed?"],
        rows: 8,
        hint: "Peak = themed week or arc. Light = segment skin only. Skip = intentionally ignore.",
      },
      {
        type: "checkbox_list",
        title: "Anti-gimmick check",
        items: [
          "Every peak ties to niche statement, not just the calendar",
          "At least half of quarter is normal programming",
          "Skip list is honest (I am not doing this holiday)",
          "Props and prep fit my real capacity",
        ],
      },
    ],
  },
  {
    id: "season-peak-planner",
    title: "Season Peak Planner",
    description:
      "Deep plan for one seasonal peak: theme, segments, promo window, and exit back to normal.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["seasonal-content-without-gimmicks"],
    blocks: [
      {
        type: "intro",
        text: "One peak per season beats scattered holiday bits. Plan the entrance and the exit.",
      },
      {
        type: "fill_lines",
        title: "Peak identity",
        lines: [
          { label: "Season / holiday", rows: 1 },
          { label: "Niche-native angle (not generic)", rows: 2 },
          { label: "Dates of peak programming", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Programming",
        lines: [
          { label: "Segments that get seasonal skin", rows: 2 },
          { label: "One peak LIVE or mini-arc", rows: 2 },
          { label: "Promo start date (see Five-Day Promo if event-sized)", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Exit plan",
        lines: [
          { label: "Last themed LIVE date", rows: 1 },
          { label: "Close line returning to normal format", rows: 2 },
          { label: "Props to store or retire", rows: 1 },
        ],
      },
    ],
  },
  {
    id: "season-keep-cut-list",
    title: "Season Keep / Cut List",
    description:
      "After a season ends, decide what to keep, archive, or cut — so gimmicks do not accumulate.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["seasonal-content-without-gimmicks"],
    blocks: [
      {
        type: "intro",
        text: "Review within one week of season end. Keep what viewers still ask for; cut what only worked once.",
      },
      {
        type: "table",
        title: "Season inventory",
        columns: ["Bit / segment / prop", "Keep", "Archive", "Cut", "Why"],
        rows: 6,
      },
      {
        type: "checkbox_list",
        title: "Keep criteria (must meet at least two)",
        items: [
          "Fits niche without the holiday label",
          "Viewers asked for it unprompted",
          "Low prep cost to repeat",
          "Did not spike drama or moderation load",
        ],
      },
      {
        type: "fill_lines",
        title: "Next year",
        lines: [
          { label: "One seasonal peak to repeat with changes", rows: 2 },
          { label: "One thing I will never do again", rows: 2 },
        ],
      },
    ],
  },

  // —— CC-09 Building Anticipation Before and During LIVE ——
  {
    id: "anticipation-playbook",
    title: "Anticipation Playbook",
    description:
      "Tease-to-payoff map: pre-LIVE hooks, in-stream plants, and payoff moments with timing notes.",
    category: "content",
    kind: "guide",
    status: "ready",
    lessonSlugs: ["building-anticipation-before-and-during-live"],
    blocks: [
      {
        type: "intro",
        text: "Anticipation is a promise with a delivery date. Every tease needs a payoff window viewers can trust.",
      },
      {
        type: "fill_lines",
        title: "This LIVE's payoff",
        lines: [
          { label: "What viewers are waiting for", rows: 2 },
          { label: "When payoff happens (minute mark or segment)", rows: 1 },
          { label: "Minimum viable payoff if plan shrinks", rows: 2 },
        ],
      },
      {
        type: "table",
        title: "Tease timeline",
        columns: ["When", "Tease type", "Exact line or post", "Payoff link"],
        rows: 5,
        hint: "Rows: pre-LIVE post, open, mid-stream plant, reminder, payoff.",
      },
      {
        type: "checkbox_list",
        title: "Trust checks",
        items: [
          "I am not teasing something I cannot deliver today",
          "Payoff is visible to late joiners (brief recap)",
          "Tease language matches niche tone — not clickbait",
          "Logged in Kept Promise Log after LIVE",
        ],
      },
    ],
  },
  {
    id: "kept-promise-log",
    title: "Kept Promise Log",
    description:
      "Track teases vs payoffs across LIVEs — build a reputation for delivery, not hype fatigue.",
    category: "content",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["building-anticipation-before-and-during-live"],
    blocks: [
      {
        type: "intro",
        text: "Log every meaningful tease. Broken promises erode anticipation faster than silence.",
      },
      {
        type: "table",
        title: "Promise log",
        columns: ["Date", "Tease (what I promised)", "Payoff delivered?", "Evidence", "Fix if broken"],
        rows: 6,
      },
      {
        type: "fill_lines",
        title: "Monthly trust read",
        lines: [
          { label: "Promises kept vs broken", rows: 1 },
          { label: "Pattern if broken (over-tease / under-plan / chat misread)", rows: 2 },
          { label: "One rule for next month", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Delaying a payoff is fine if you name the new date the same LIVE. Silent delays feel like broken promises.",
      },
    ],
  },
  {
    id: "tease-to-payoff-card",
    title: "Tease-to-Payoff Card",
    description:
      "Single-LIVE pocket card: three tease lines, payoff checkpoint, and recovery if delayed.",
    category: "content",
    kind: "template",
    status: "ready",
    lessonSlugs: ["building-anticipation-before-and-during-live"],
    blocks: [
      {
        type: "intro",
        text: "Keep this visible during LIVE. Three teases maximum — more becomes noise.",
      },
      {
        type: "fill_lines",
        title: "Payoff",
        lines: [
          { label: "Today's payoff in one sentence", rows: 2 },
          { label: "Target minute / segment", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Three tease lines",
        lines: [
          { label: "Tease 1 (pre-LIVE or open)", rows: 2 },
          { label: "Tease 2 (mid-stream plant)", rows: 2 },
          { label: "Tease 3 (countdown / reminder)", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "If delayed",
        lines: [
          { label: "Honest line to chat", rows: 2 },
          { label: "New payoff time", rows: 1 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Payoff delivered",
        items: [
          "Payoff happened on camera",
          "Chat could see or hear the delivery",
          "Logged in Kept Promise Log",
        ],
      },
    ],
  },

  // —— CC-10 Content Creation Capstone: 7-Day Themed LIVE Series ——
  {
    id: "cc-capstone-evidence-checklist",
    title: "CC Capstone Evidence Checklist",
    description:
      "Capstone submission checklist: seven themed LIVEs, niche proof, segments, arc, and self-review artifacts.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["content-creation-capstone-7-day-themed-live-series"],
    blocks: [
      {
        type: "intro",
        text: "Use this to assemble your Content Creation Capstone evidence pack. Certification depends on completed work — not Honors Lab enrollment. Optional Honors Lab review can deepen feedback after you certify; labs never gate certification.",
      },
      {
        type: "checkbox_list",
        title: "Seven-day series core",
        items: [
          "Seven-Day Series Planner completed before day one",
          "Theme stated clearly on day one and referenced through day seven",
          "At least two recurring segments ran across the week",
          "Daily angles documented (Daily Angle Cards or equivalent notes)",
          "Week finale checklist completed on day seven",
        ],
      },
      {
        type: "checkbox_list",
        title: "Curriculum proof (CC-01 through CC-09)",
        items: [
          "Niche statement + at least one boundary card snapshot",
          "Memorability anchor used consistently (kit or notes)",
          "Segment bible or replay rubric score for one segment",
          "Multi-LIVE arc or checkpoint evidence (even mini-arc within the week)",
          "At least one anticipation tease with kept-promise log entry",
        ],
      },
      {
        type: "checkbox_list",
        title: "Submission artifacts",
        items: [
          "Series Review Scorecard filled after day seven (includes before/after comparison)",
          "Links or timestamps for 3–5 highlight clips",
          "One-page written reflection (500 words max or bullet equivalent)",
        ],
      },
      {
        type: "callout",
        text: "Honors Lab is optional enrichment after certification — submit your evidence for Capstone first. Lab reviewers never block your certificate.",
      },
    ],
  },
  {
    id: "seven-day-series-planner",
    title: "Seven-Day Series Planner",
    description:
      "Master planner for the Capstone themed week: theme, daily map, segments, promos, and finale peak.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["content-creation-capstone-7-day-themed-live-series"],
    blocks: [
      {
        type: "intro",
        text: "Plan the full Capstone week before day one. This is your operating document — adjust in margins, not mid-open panic.",
      },
      {
        type: "fill_lines",
        title: "Series header",
        lines: [
          { label: "Series title (viewer-facing)", rows: 1 },
          { label: "Niche statement (one line from CC-01)", rows: 2 },
          { label: "Capstone theme + why it fits your channel", rows: 2 },
          { label: "Start date / timezone", rows: 1 },
        ],
      },
      {
        type: "table",
        title: "Seven-day grid",
        columns: ["Day", "Angle", "Segments", "Arc beat", "Promo note", "Length"],
        rows: 7,
      },
      {
        type: "fill_lines",
        title: "Finale peak (day seven)",
        lines: [
          { label: "Payoff viewers waited for all week", rows: 2 },
          { label: "Callback to days 1–3 (minimum)", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Pre-flight",
        items: [
          "Recovery day scheduled within 48 hours after day seven",
          "Props and assets listed with prep dates",
          "Mod or friend on call for finale if interactive",
          "Evidence Checklist printed for post-week assembly",
        ],
      },
      {
        type: "callout",
        text: "Capstone grades the week you ran, not the week you imagined. Plan capacity you can actually hit.",
      },
    ],
  },
  {
    id: "series-review-scorecard",
    title: "Series Review Scorecard",
    description:
      "Post-series scorecard: daily grades, theme coherence, growth signals, and Capstone narrative draft.",
    category: "content",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["content-creation-capstone-7-day-themed-live-series"],
    blocks: [
      {
        type: "intro",
        text: "Complete within 48 hours of day seven. Honest scores beat heroic storytelling for Capstone reviewers.",
      },
      {
        type: "table",
        title: "Daily scoreboard (1–5)",
        columns: ["Day", "Theme clarity", "Segment quality", "Energy / capacity", "Standout moment"],
        rows: 7,
      },
      {
        type: "fill_lines",
        title: "Series-level read",
        lines: [
          { label: "Strongest day — why", rows: 2 },
          { label: "Weakest day — cause (not excuse)", rows: 2 },
          { label: "Did the week feel like one story? Evidence", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Capstone narrative hooks",
        items: [
          "I can name three CC skills I demonstrated with timestamps",
          "I completed the before/after comparison section below",
          "I know what I will keep running post-Capstone",
          "Evidence Checklist items are checked or honestly marked N/A",
        ],
      },
      {
        type: "fill_lines",
        title: "Before / after comparison (same rubric, two clips)",
        lines: [
          { label: "Before clip (date / timestamp / context)", rows: 2 },
          { label: "After clip (day seven or strongest day / timestamp)", rows: 2 },
          { label: "Niche clarity — what changed", rows: 1 },
          { label: "Memorable anchors — what changed", rows: 1 },
          { label: "Segment structure — what changed", rows: 1 },
          { label: "Before I… / This week I… / Next I will… (three sentences)", rows: 3 },
        ],
      },
      {
        type: "fill_lines",
        title: "Reflection draft (for written submission)",
        lines: [
          { label: "What this week proved about my niche", rows: 3 },
          { label: "One habit I am carrying forward", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Optional Honors Lab may review this scorecard later for deeper critique — enrollment never gates your Content Creation Certificate.",
      },
    ],
  },
];
