/**
 * Gold-standard printable packs for Live Streaming Mastery lessons 10–14
 * (talking-with-empty-room, hooks-and-first-impressions, content-loops-repeatable-segments,
 * structuring-longer-lives, growth-weekly-system).
 * Matches the depth of the Beginner Foundations packs — see beginner-foundations.ts.
 */

import type { LibraryResource } from "@/lib/streameru-library/types";

export const LIVE_STREAMING_MASTERY_RESOURCES: LibraryResource[] = [
  // —— Talking when no one is watching ——
  {
    id: "empty-room-talk-tracks",
    title: "Empty Room Talk Tracks",
    description:
      "Narrate / Plan / Teach prompt cards, a loop tracker, and a dead-air self-audit sheet for sustained empty-room sessions.",
    category: "content",
    kind: "script",
    status: "ready",
    lessonSlugs: ["talking-with-empty-room"],
    blocks: [
      {
        type: "intro",
        text: "Fill this before you go live. Keep it visible during your session — glance, pick a prompt, keep talking. Empty rooms are rehearsal, not judgment.",
      },
      {
        type: "fill_lines",
        title: "Five self-prompt cards (write before you go live)",
        lines: [
          { label: "1) What am I doing right now?", rows: 2 },
          { label: "2) What did I learn this week that surprised me?", rows: 2 },
          { label: "3) What's a common myth in my niche?", rows: 2 },
          { label: "4) What's my plan for the rest of this stream?", rows: 2 },
          { label: "5) What would I tell someone brand new to this?", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Narrate / Plan / Teach loop tracker (check each rotation)",
        items: [
          "Narrate — described what's happening right now (0–5 min)",
          "Teach — explained one small concept (5–8 min)",
          "Plan — talked through what's coming next (8–9 min)",
          "Narrate — repeat rotation (9–14 min)",
          "Teach — repeat rotation (14–17 min)",
          "Plan — repeat rotation (17–18 min)",
          "Continue rotating in ~9-minute cycles for the full 45+ minutes",
        ],
      },
      {
        type: "table",
        title: "Dead-air self-audit (log any pause over 10 seconds)",
        columns: ["Time", "Cause", "Which prompt got you talking again?"],
        rows: 6,
      },
      {
        type: "checkbox_list",
        title: "Before you go live",
        items: [
          "Five prompt cards written and visible",
          "Viewer count covered or minimized on screen",
          "20-second silence rule understood: silence past 20 seconds = jump to next prompt",
          "Reminder set: talk as if a silent viewer might already be there",
        ],
      },
      {
        type: "callout",
        text: "Mission target: 45+ minutes with fewer than 30 cumulative seconds of dead air. Never apologize for low viewers — it reads as a signal to leave, not stay.",
      },
      {
        type: "notes",
        title: "After your LIVE: one line on what felt hardest",
        lines: 3,
      },
    ],
  },

  // —— Hooks and first impressions ——
  {
    id: "hook-rotation-worksheet",
    title: "Hook Rotation Worksheet",
    description:
      "Script an opening hook, mid-stream reset, and late re-hook, plus a session timer cue card for delivering all three on schedule.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["hooks-and-first-impressions"],
    blocks: [
      {
        type: "intro",
        text: "Write all three hooks word-for-word before you go live — do not improvise them live. Keep this sheet or a timer cue visible during your session.",
      },
      {
        type: "fill_lines",
        title: "Opening hook (deliver in your first 10 seconds)",
        lines: [
          { label: "Topic + specific stakes", rows: 2 },
          { label: "Exact sentence you will say", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Mid-stream reset (deliver around 15:00)",
        lines: [
          { label: "What you're pivoting to", rows: 2 },
          { label: "Exact sentence you will say", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Late re-hook (deliver around 30:00)",
        lines: [
          { label: "Tease or challenge for the final stretch", rows: 2 },
          { label: "Exact sentence you will say", rows: 2 },
        ],
      },
      {
        type: "timed_segments",
        title: "Session timer cue card",
        segments: [
          { label: "Opening hook", minutes: "0:00", prompt: "First 10 seconds — specific, stakes-driven" },
          { label: "Mid-stream reset", minutes: "~15:00", prompt: "Pattern interrupt, run regardless of visible new arrivals" },
          { label: "Late re-hook", minutes: "~30:00", prompt: "Tease or challenge to fight drop-off" },
        ],
      },
      {
        type: "checkbox_list",
        title: "Verbal packaging check (for each hook)",
        items: [
          "States a specific topic, not a vague greeting",
          "Implies a payoff deliverable within the next few minutes",
          "Under two sentences",
          "Rehearsed out loud at least once before going live",
        ],
      },
      {
        type: "callout",
        text: "Deliver with eye contact on the lens, lean in slightly, and a touch more energy than your baseline voice — a flat recitation reads as rehearsed.",
      },
      {
        type: "notes",
        title: "After your LIVE: which hook landed best, and why?",
        lines: 3,
      },
    ],
  },

  // —— Viewer retention techniques ——
  {
    id: "retention-segment-planner",
    title: "Retention Segment Planner",
    description:
      "A one-page loop card, weekly segment menu, and live transition checklist so viewers always know what's next.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["content-loops-repeatable-segments"],
    blocks: [
      {
        type: "intro",
        text: "Fill this before your mission LIVE. Framework: Hook → Value → Interaction → Callback, run inside each named segment. Keep it visible while live.",
      },
      {
        type: "fill_lines",
        title: "Segment 1",
        lines: [
          { label: "Segment name + minute mark" },
          { label: "Hook line", rows: 2 },
          { label: "Interaction prompt", rows: 2 },
          { label: "Callback to Segment 2", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Segment 2",
        lines: [
          { label: "Segment name + minute mark" },
          { label: "Hook line", rows: 2 },
          { label: "Interaction prompt", rows: 2 },
          { label: "Callback to Segment 3", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Segment 3 (repeat this block for segments 4–5 if used)",
        lines: [
          { label: "Segment name + minute mark" },
          { label: "Hook line", rows: 2 },
          { label: "Interaction prompt", rows: 2 },
          { label: "Callback to next segment / close", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Default filler loop (use if a segment ends early)",
        lines: [
          { label: "Mini-tip hook", rows: 1 },
          { label: "90-second value beat", rows: 2 },
          { label: "One quick poll", rows: 1 },
          { label: "Callback to next named block", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Weekly segment menu",
        lines: [
          { label: "Segment names (3–5)", rows: 2 },
          { label: "Which days each segment appears", rows: 2 },
          { label: "Signature phrase you say when starting each segment", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Live transition checklist",
        items: [
          "Did I name the current segment out loud?",
          "Did I complete hook → value → interaction → callback?",
          "Did I preview the next segment before a pause?",
          "Did I avoid silent gaps between loops?",
        ],
      },
      {
        type: "callout",
        text: "Mission target: 60+ minutes with visible segment transitions throughout. Peak concurrent viewers is not the scoreboard — continuity is.",
      },
      {
        type: "notes",
        title: "After your LIVE: which segment held attention best?",
        lines: 3,
      },
    ],
  },

  // —— Structuring longer lives ——
  {
    id: "ninety-minute-run-of-show",
    title: "Four-Block Run-of-Show",
    description:
      "Fill-in time ranges and content for the opener, deep, recovery, and closer blocks of a 90-minute LIVE.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["structuring-longer-lives"],
    blocks: [
      {
        type: "intro",
        text: "Fill this before your mission LIVE. Four blocks, one honest energy arc: start strong, dip on purpose, rise for the close. This is a container to fill live with the hook and loop skills you already have — not a script.",
      },
      {
        type: "fill_lines",
        title: "Block one — opener and warm-up (0–20)",
        lines: [
          { label: "Opening hook", rows: 2 },
          { label: "Highest-energy loops planned for this block", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Block two — deep block (20–45)",
        lines: [
          { label: "Teach-mode topic or story", rows: 2 },
          { label: "Mid-stream reset hook", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Block three — recovery and interaction (45–70)",
        lines: [
          { label: "Lighter interaction loops planned", rows: 2 },
          { label: "Hydration / physical break narration line", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Block four — closer and re-hook (70–90+)",
        lines: [
          { label: "Late re-hook", rows: 2 },
          { label: "Wrap-up loop previewing next session", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Before you go live",
        items: [
          "Honesty check done: today supports 90 minutes, or I'm scaling to a 3-block 60",
          "All four blocks have at least one planned loop or topic",
          "Break is placed inside block three and will be narrated, not silent",
        ],
      },
      {
        type: "callout",
        text: "Mission target: 90+ minutes with visible four-block structure throughout. If you can't picture a block's content before going live, scale down to a shorter honest session instead.",
      },
      {
        type: "notes",
        title: "After your LIVE: where did your energy actually dip?",
        lines: 3,
      },
    ],
  },
  {
    id: "stretch-goal-energy-arc-tracker",
    title: "Stretch Goal & Energy Arc Tracker",
    description:
      "Three pre-written bonus segments for high-energy days, plus a per-block energy self-check for a 90-minute session.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["structuring-longer-lives"],
    blocks: [
      {
        type: "intro",
        text: "Write three stretch goals total for the whole session — not per block — so you're never stuck padding a block with improvised filler.",
      },
      {
        type: "fill_lines",
        title: "Stretch goals (deploy only if a block ends early with energy to spare)",
        lines: [
          { label: "Stretch goal 1", rows: 2 },
          { label: "Stretch goal 2", rows: 2 },
          { label: "Stretch goal 3", rows: 2 },
        ],
      },
      {
        type: "table",
        title: "Energy arc self-check (rate 1–5 at the end of each block)",
        columns: ["Block", "Energy (1–5)", "What I'd change next time"],
        rows: 4,
      },
      {
        type: "checkbox_list",
        title: "Physical needs as content checklist",
        items: [
          "Break placed inside block three, not improvised elsewhere",
          "Break narrated out loud the entire time",
          "No silent gaps left unexplained",
        ],
      },
      {
        type: "callout",
        text: "An honest energy dip in block three is more watchable than a forced peak for all 90 minutes. Let the arc show.",
      },
    ],
  },

  // —— Growth weekly system ——
  {
    id: "repeat-viewer-system-sheet",
    title: "Repeat Viewer System Sheet",
    description:
      "Continuity callback template, next-session tease worksheet, and a rough weekly schedule note.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["growth-weekly-system"],
    blocks: [
      {
        type: "intro",
        text: "Fill this before your mission LIVE. Write both lines out — the opening callback and the closing tease — so you say them near-verbatim instead of improvising continuity language for the first time on camera.",
      },
      {
        type: "fill_lines",
        title: "Opening callback (say this early in the session)",
        lines: [
          { label: "What I promised or mentioned last time", rows: 2 },
          { label: "Exact sentence I will say", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Closing tease (say this at the end of the session)",
        lines: [
          { label: "Specific plan for next session", rows: 2 },
          { label: "Rough day / time window", rows: 1 },
          { label: "Exact sentence I will say", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Rough weekly schedule",
        lines: [
          { label: "Days I'm usually live", rows: 1 },
          { label: "Usual time window", rows: 1 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Recognition ritual checklist",
        items: [
          "Chose at least one recognition method (username callouts, running thread, or both)",
          "Reviewed last session's notes for two minutes before going live",
          "Ready to acknowledge a returning viewer generously, even without full certainty",
        ],
      },
      {
        type: "callout",
        text: "Mission target: a return viewer would clearly recognize the continuity from your last session, not just enjoy this one in isolation.",
      },
      {
        type: "notes",
        title: "After your LIVE: did anyone react to the callback or tease?",
        lines: 3,
      },
    ],
  },
  {
    id: "returning-viewer-recognition-log",
    title: "Returning Viewer Recognition Log",
    description:
      "Simple sheet to jot usernames and context between sessions so your recognition ritual stays accurate over time.",
    category: "content",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["growth-weekly-system"],
    blocks: [
      {
        type: "intro",
        text: "Keep this between sessions. A quick two-minute review before you go live keeps your callbacks and recognition moments accurate instead of guessed.",
      },
      {
        type: "table",
        title: "Returning viewer log",
        columns: ["Username", "What they're into / last context", "Last seen"],
        rows: 8,
      },
      {
        type: "fill_lines",
        title: "Ongoing thread (a joke, project, or challenge repeat viewers follow)",
        lines: [{ label: "Current thread and where it left off", rows: 2 }],
      },
      {
        type: "callout",
        text: "Acknowledge generously when you're not fully certain of the details — a warm, general welcome beats an incorrect specific guess.",
      },
    ],
  },
];
