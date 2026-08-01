/**
 * Gold-standard printable packs for Growth Mastery (Program 6).
 */

import type { LibraryResource } from "@/lib/streameru-library/types";

export const GROWTH_MASTERY_RESOURCES: LibraryResource[] = [
  // —— GR-01 The Growth Diagnosis Framework ——
  {
    id: "growth-diagnosis-worksheet",
    title: "Growth Diagnosis Worksheet",
    description:
      "Sort your growth problem into Discovery / Retention / Conversion / Consistency with evidence, then name one leak.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["growth-diagnosis-framework"],
    blocks: [
      {
        type: "intro",
        text: "Run the Consistency check first — a broken calendar outranks every other theory. Use 2–4 weeks of real evidence, not one session.",
      },
      {
        type: "table",
        title: "Evidence by category",
        columns: ["Category", "Evidence / symptom", "How strong is the pattern?"],
        rows: 4,
        hint: "Rows: Discovery · Retention · Conversion · Consistency.",
      },
      {
        type: "fill_lines",
        title: "Consistency veto",
        lines: [
          { label: "Sessions planned vs. actually run (last 2–4 weeks)", rows: 1 },
          { label: "Did Consistency fail? If yes, stop here and fix that first.", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "The one leak",
        lines: [
          { label: "My single biggest leak (one evidence-backed sentence)", rows: 2 },
          { label: "One observation I will test on my next LIVE", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "This worksheet becomes the opening evidence page of your 30-day Growth Capstone. Diagnose now, honestly, so future-you has real evidence to build from.",
      },
    ],
  },
  {
    id: "bottleneck-evidence-log",
    title: "Bottleneck Evidence Log",
    description: "Session-by-session tracker for your 2–4 week diagnosis review window.",
    category: "business",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["growth-diagnosis-framework"],
    blocks: [
      {
        type: "intro",
        text: "Log every session in your review window — do not cherry-pick only the good or bad nights.",
      },
      {
        type: "table",
        title: "Session log",
        columns: ["Date", "Format (solo/battle)", "New viewers?", "Watch time / drop-off note", "Returners?"],
        rows: 8,
      },
      {
        type: "notes",
        title: "Pattern I'm starting to see (optional)",
        lines: 3,
      },
    ],
  },
  {
    id: "one-leak-decision-card",
    title: "One-Leak Decision Card",
    description: "A single-sentence diagnosis plus the one observation you'll test next — resist fixing four things at once.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["growth-diagnosis-framework"],
    blocks: [
      {
        type: "fill_lines",
        title: "The decision",
        lines: [
          { label: "My leak (one sentence, evidence-backed)", rows: 2 },
          { label: "The one observation I will test this LIVE", rows: 2 },
          { label: "What I am deliberately NOT changing yet", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "The One-Leak Rule: name one leak, write one sentence, test one observation. Fixing everything at once destroys your ability to learn what worked.",
      },
    ],
  },

  // —— GR-02 Retention Science Beyond the Basics ——
  {
    id: "mid-live-drop-off-map",
    title: "Mid-LIVE Drop-Off Map",
    description: "Five/ten-minute block timeline for locating the exact minute your room leaks viewers.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["retention-science-beyond-the-basics"],
    blocks: [
      {
        type: "intro",
        text: "Pick one recent full-length session (45+ minutes). Break it into blocks and note what you observed in each.",
      },
      {
        type: "table",
        title: "Session block-by-block",
        columns: ["Time block", "Viewer trend", "Chat activity", "Segment / loop running"],
        rows: 8,
      },
      {
        type: "fill_lines",
        title: "The leak point",
        lines: [
          { label: "Where does the drop-off repeat across sessions?", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "retention-redesign-sheet",
    title: "Retention Redesign Sheet",
    description: "Leak point, one structural change, and what you expect to observe if it works.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["retention-science-beyond-the-basics"],
    blocks: [
      {
        type: "fill_lines",
        title: "The redesign",
        lines: [
          { label: "Leak point (from the Drop-Off Map)", rows: 1 },
          { label: "Structural change (alters the run-of-show, not just delivery)", rows: 2 },
          { label: "What I expect to observe if this works", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "A structural change alters the shape of the session at the leak point. A cosmetic change only alters delivery — it does not count here.",
      },
    ],
  },
  {
    id: "two-session-comparison-log",
    title: "Two-Session Comparison Log",
    description: "Before/after leak-point tracker across two real sessions — one session is not proof.",
    category: "content",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["retention-science-beyond-the-basics"],
    blocks: [
      {
        type: "table",
        title: "Comparison",
        columns: ["Session", "Date", "Did the leak point move/shrink/disappear?", "Notes"],
        rows: 2,
        hint: "Row 1: mission LIVE. Row 2: second comparison session within the same week.",
      },
      {
        type: "fill_lines",
        title: "Conclusion",
        lines: [
          { label: "Keep / adapt / kill this structural change", rows: 2 },
        ],
      },
    ],
  },

  // —— GR-03 Analytics Deep Dive for LIVE Creators ——
  {
    id: "monthly-analytics-review-template",
    title: "Monthly Analytics Review Template",
    description: "Four-week trend rows across your diagnosis categories — read the month, not one loud week.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["analytics-deep-dive-for-live-creators"],
    blocks: [
      {
        type: "table",
        title: "Weekly rows",
        columns: ["Week", "Consistency trend", "Diagnosis-category trend", "Leading-behavior trend"],
        rows: 4,
      },
      {
        type: "fill_lines",
        title: "Reading the trend",
        lines: [
          { label: "What repeated across weeks, not just one week?", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "leading-vs-lagging-indicators-card",
    title: "Leading vs Lagging Indicators Card",
    description: "Paired examples and a rewrite guide for turning lagging-indicator wishes into leading behaviors.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["analytics-deep-dive-for-live-creators"],
    blocks: [
      {
        type: "fill_lines",
        title: "Leading indicators (behaviors I control now)",
        lines: [
          { label: "Leading behavior 1", rows: 1 },
          { label: "Leading behavior 2", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Lagging indicators (results that follow later)",
        lines: [
          { label: "Lagging indicator 1", rows: 1 },
          { label: "Lagging indicator 2", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "\"I need more followers\" is a wish, not a decision. \"Deliver the callback line before every transition\" is a leading behavior you can execute Tuesday night.",
      },
    ],
  },
  {
    id: "three-decisions-max-worksheet",
    title: "Three-Decisions Max Worksheet",
    description: "Ranked observations, top three decisions, and an OS calendar action for each — never twelve, never zero.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["analytics-deep-dive-for-live-creators"],
    blocks: [
      {
        type: "notes",
        title: "All observations this month (brainstorm, unranked)",
        lines: 4,
      },
      {
        type: "table",
        title: "Top three decisions (ranked by leverage)",
        columns: ["Decision (leading behavior)", "Diagnosis category", "OS calendar action + checkpoint"],
        rows: 3,
      },
    ],
  },

  // —— GR-04 Experiment Design for Creators ——
  {
    id: "clean-experiment-design-sheet",
    title: "Clean Experiment Design Sheet",
    description: "Variable, outcome measure, baseline, sample size, and dual kill criteria — before session one.",
    category: "business",
    kind: "template",
    status: "ready",
    lessonSlugs: ["experiment-design-for-creators"],
    blocks: [
      {
        type: "fill_lines",
        title: "Design",
        lines: [
          { label: "Variable (the one thing changing)", rows: 1 },
          { label: "Outcome measure (a number, not a feeling)", rows: 1 },
          { label: "Baseline (last 3–5 comparable sessions)", rows: 2 },
          { label: "Committed sample size before I trust a result", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Kill criteria",
        lines: [
          { label: "Safety kill (stop immediately if...)", rows: 2 },
          { label: "Statistical kill (stop at sample size if...)", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "sample-size-humility-card",
    title: "Sample-Size Humility Card",
    description: "One-session vs early-read vs committed-sample guidance so one good night never becomes a myth.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["experiment-design-for-creators"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Sample-size ladder",
        items: [
          "One session = a data point, not a result",
          "Three to four sessions = an early read, too small for success",
          "Five to eight sessions across two to three weeks = enough for an honest keep/adapt/kill call",
        ],
      },
      {
        type: "fill_lines",
        title: "My commitment",
        lines: [
          { label: "Minimum sessions I need before trusting this result", rows: 1 },
        ],
      },
    ],
  },
  {
    id: "experiment-conclusion-log",
    title: "Experiment Conclusion Log",
    description: "Session rows plus a final one-sentence decision field a stranger could understand.",
    category: "business",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["experiment-design-for-creators"],
    blocks: [
      {
        type: "table",
        title: "Session log",
        columns: ["Date", "Variable present? Y/N", "Outcome number", "Baseline", "Note"],
        rows: 8,
      },
      {
        type: "fill_lines",
        title: "Final conclusion (at committed sample size)",
        lines: [
          { label: "What changed, by how much, against what baseline, and my decision", rows: 3 },
        ],
      },
    ],
  },

  // —— GR-05 Scheduling as Strategy ——
  {
    id: "schedule-strategy-sheet",
    title: "Schedule Strategy Sheet",
    description: "Current slot, alternative slot, and audience time reality notes — schedule as a growth lever, not a diary entry.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["scheduling-as-strategy"],
    blocks: [
      {
        type: "fill_lines",
        title: "Current state",
        lines: [
          { label: "Current LIVE slot(s)", rows: 1 },
          { label: "Baseline numbers at that slot (attendance, watch time)", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "The test",
        lines: [
          { label: "Alternative slot backed by my own audience data", rows: 1 },
          { label: "Why I believe this slot might be better (real evidence, not a chart)", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "two-week-schedule-test-log",
    title: "Two-Week Schedule Test Log",
    description: "Attendance, peak, and watched-time tracker per session across the full two-week test window.",
    category: "business",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["scheduling-as-strategy"],
    blocks: [
      {
        type: "table",
        title: "Two-week log",
        columns: ["Date", "Attendance at start", "Peak attendance", "Avg watched time", "Returners?"],
        rows: 6,
      },
      {
        type: "fill_lines",
        title: "Verdict after two full weeks",
        lines: [
          { label: "Keep new slot / keep old slot — and why", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "sustainable-cadence-planner",
    title: "Sustainable Cadence Planner",
    description: "Anchor, stack, and minimum viable cadence options — built around your worst week, not your best one.",
    category: "business",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["scheduling-as-strategy"],
    blocks: [
      {
        type: "fill_lines",
        title: "Cadence options",
        lines: [
          { label: "Anchor cadence (same days/times every week)", rows: 1 },
          { label: "Stack cadence (clustered on high-capacity days)", rows: 1 },
          { label: "Minimum viable cadence (smallest commitment I keep on a hard week)", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "Choose the pattern that survives your worst realistic week, then build up from there.",
      },
    ],
  },

  // —— GR-06 Discovery Inventory ——
  {
    id: "four-week-discovery-inventory-board",
    title: "Four-Week Discovery Inventory Board",
    description: "Rolling weekly columns for clip moments, CTAs, promos, and status — logistics, not editing craft.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["discovery-inventory-never-miss-a-publish-window"],
    blocks: [
      {
        type: "intro",
        text: "This is a logistics board, not a production schedule. Refresh weekly: drop the oldest week, add a new one.",
      },
      {
        type: "table",
        title: "Rolling four weeks",
        columns: ["Week", "Clip moments captured", "CTAs queued", "Session promo", "Status (logged/drafted/published)"],
        rows: 4,
      },
    ],
  },
  {
    id: "clip-moment-capture-log",
    title: "Clip Moment Capture Log",
    description: "Timestamp, one-line reason, and target publish window per entry — flag, don't produce.",
    category: "content",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["discovery-inventory-never-miss-a-publish-window"],
    blocks: [
      {
        type: "table",
        title: "Captured moments",
        columns: ["Timestamp", "One-line reason it worked", "Target publish window"],
        rows: 8,
      },
      {
        type: "callout",
        text: "Flag it in one line and keep going. Editing craft belongs to dedicated time in Content Creation Mastery, not this log.",
      },
    ],
  },
  {
    id: "publish-window-checklist",
    title: "Publish Window Checklist",
    description: "Clip / CTA / promo readiness check before each publish window — never scramble at the deadline.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["discovery-inventory-never-miss-a-publish-window"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Before this window closes",
        items: [
          "A flagged clip moment is ready",
          "A CTA line is queued and tied to my real schedule",
          "A specific session promo is written",
        ],
      },
      {
        type: "fill_lines",
        title: "If any box is empty",
        lines: [
          { label: "What I'll pull from the inventory board instead of improvising", rows: 2 },
        ],
      },
    ],
  },

  // —— GR-07 Algorithm-Durable Growth ——
  {
    id: "growth-myth-audit-worksheet",
    title: "Growth Myth Audit Worksheet",
    description: "Score any growth tip against three verification questions before you adopt it.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["algorithm-durable-growth"],
    blocks: [
      {
        type: "table",
        title: "Audit at least five tips you've tried, heard, or considered",
        columns: ["Tip", "Can I verify it (real behavior)?", "Comfortable explaining it publicly?", "Update-proof?", "Verdict: myth or durable"],
        rows: 5,
      },
    ],
  },
  {
    id: "durable-tactics-list",
    title: "Durable Tactics List",
    description: "Your personal consistency, clarity, return offer, and promotion plan — the four habits that survive updates.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["algorithm-durable-growth"],
    blocks: [
      {
        type: "fill_lines",
        title: "The four durable habits",
        lines: [
          { label: "Consistency — my real, sustainable rhythm", rows: 1 },
          { label: "Clarity — what a new viewer understands in ten seconds", rows: 1 },
          { label: "Return offer — the specific reason to come back", rows: 1 },
          { label: "Ethical promotion — where and how I talk about my LIVE honestly", rows: 1 },
        ],
      },
    ],
  },
  {
    id: "algorithm-proof-principles-card",
    title: "Algorithm-Proof Principles Card",
    description: "A pocket reference of what to reject outright and what to trust — no guessing at the algorithm.",
    category: "business",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["algorithm-durable-growth"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Reject outright, no audit needed",
        items: [
          "Engagement bait (fake cliffhangers, manufactured outrage)",
          "Spam behavior (mass-follow, mass-comment, room-flooding)",
          "Buying followers or engagement",
          "Follow-for-follow schemes",
          "Fake engagement of any kind",
        ],
      },
      {
        type: "checkbox_list",
        title: "Trust and build on",
        items: ["Consistency", "Clarity", "Return offers", "Ethical promotion"],
      },
    ],
  },

  // —— GR-08 Clips, Discovery, and LIVE ——
  {
    id: "weekly-clip-workflow-checklist",
    title: "Weekly Clip Workflow Checklist",
    description: "Capture, minimal edit, CTA, and post steps — a light weekly task, not a second job.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["clips-discovery-and-live"],
    blocks: [
      {
        type: "checkbox_list",
        title: "This week's workflow",
        items: [
          "Captured moment notes during or right after LIVE",
          "Picked best 1–2 moments for the week",
          "Trimmed and captioned minimally — no heavy production",
          "Added a clip-to-LIVE CTA naming a specific day/time",
          "Posted on a light, repeatable rhythm",
        ],
      },
    ],
  },
  {
    id: "clip-to-live-cta-templates",
    title: "Clip-to-LIVE CTA Templates",
    description: "Fill-in lines that name a specific next session — never a vague 'follow for more.'",
    category: "content",
    kind: "template",
    status: "ready",
    lessonSlugs: ["clips-discovery-and-live"],
    blocks: [
      {
        type: "fill_lines",
        title: "CTA template",
        lines: [
          { label: "What happened in this clip", rows: 1 },
          { label: "When I'm live next (day/time)", rows: 1 },
          { label: "Why it matters to show up", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "\"I'm live [day] at [time] finishing this story — pull up\" sends somewhere real. A generic follow ask sends nowhere.",
      },
    ],
  },
  {
    id: "focus-guardrails-card",
    title: "Focus Guardrails Card",
    description: "The boundaries clip work is not allowed to cross, so a light habit never eats your LIVE time.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["clips-discovery-and-live"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Protected, no exceptions",
        items: [
          "LIVE prep time",
          "Real-time hosting attention during the session",
          "Rest / life time already protected",
        ],
      },
      {
        type: "fill_lines",
        title: "If a guardrail gets crossed",
        lines: [
          { label: "What happened and how I'll scale the edit back down next time", rows: 2 },
        ],
      },
    ],
  },

  // —— GR-09 AI for LIVE Creators ——
  {
    id: "ai-assisted-prep-workflow",
    title: "AI-Assisted Prep Workflow",
    description: "The research, brainstorming, and recap steps AI can help with — never delivery, never presence.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["ai-for-live-creators"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Where AI can help",
        items: [
          "Research — summarize background, verify facts before stating them live",
          "Segment brainstorming — generate angles, then rewrite in my own voice",
          "Recap notes — turn messy session notes into a clean summary",
        ],
      },
      {
        type: "callout",
        text: "Treat every AI output as a first draft written by an assistant who has never met your audience.",
      },
    ],
  },
  {
    id: "authenticity-rules-card",
    title: "Authenticity Rules Card",
    description: "What AI can draft, what it can never generate as-is, and your disclosure line.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["ai-for-live-creators"],
    blocks: [
      {
        type: "fill_lines",
        title: "My rules",
        lines: [
          { label: "What AI can draft (research, brainstorm, recap)", rows: 1 },
          { label: "What AI can never generate as-is (personal stories, claims about me)", rows: 1 },
          { label: "My disclosure line if a viewer asks directly", rows: 1 },
          { label: "What happens if I catch myself relying on AI too much", rows: 1 },
        ],
      },
    ],
  },
  {
    id: "ai-use-decision-checklist",
    title: "AI Use Decision Checklist",
    description: "Four questions to run before any AI-assisted output reaches LIVE.",
    category: "business",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["ai-for-live-creators"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Before it reaches LIVE",
        items: [
          "Is this task research, brainstorming, or recap — not delivery?",
          "Have I verified any facts AI provided?",
          "Have I rewritten anything personal or story-based into my own words?",
          "Would I be comfortable telling my audience exactly how this was prepared?",
        ],
      },
    ],
  },

  // —— GR-10 Collaboration Growth Without Begging ——
  {
    id: "collab-outreach-template",
    title: "Collab Outreach Template",
    description: "The three-part value-exchange message structure — what you offer before what you want.",
    category: "business",
    kind: "template",
    status: "ready",
    lessonSlugs: ["collaboration-growth-without-begging"],
    blocks: [
      {
        type: "fill_lines",
        title: "Message structure",
        lines: [
          { label: "One line of specific, genuine context about their content", rows: 2 },
          { label: "One line naming what I'm offering", rows: 2 },
          { label: "One concrete proposal (format, timeframe, easy yes)", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Three or four specific sentences beat a long, vague pitch. Follow up once, gracefully, then move on.",
      },
    ],
  },
  {
    id: "value-exchange-planner",
    title: "Value Exchange Planner",
    description: "What you offer, what a prospective partner offers, and the proposed format.",
    category: "business",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["collaboration-growth-without-begging"],
    blocks: [
      {
        type: "table",
        title: "Prospects",
        columns: ["Creator", "Content/audience fit", "What I offer", "What they offer", "Proposed format"],
        rows: 5,
      },
    ],
  },
  {
    id: "post-collab-retention-plan",
    title: "Post-Collab Retention Plan",
    description: "Welcome line, specific next-step offer, and follow-up note so a collab audience doesn't wander off.",
    category: "business",
    kind: "template",
    status: "ready",
    lessonSlugs: ["collaboration-growth-without-begging"],
    blocks: [
      {
        type: "fill_lines",
        title: "The plan",
        lines: [
          { label: "Welcome line for crossover viewers", rows: 2 },
          { label: "Specific, low-friction next-step offer", rows: 2 },
          { label: "Follow-up note to my collaborator afterward", rows: 2 },
        ],
      },
    ],
  },

  // —— GR-11 From Spike to Stable Growth ——
  {
    id: "spike-capture-playbook",
    title: "Spike Capture Playbook",
    description: "Full welcome ritual, return offer, and pacing steps — installed before you need it.",
    category: "business",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["from-spike-to-stable-growth"],
    blocks: [
      {
        type: "intro",
        text: "Build this now, while nothing is happening, so it's automatic when a real spike hits.",
      },
      {
        type: "fill_lines",
        title: "Playbook",
        lines: [
          { label: "Welcome ritual (who I am, what this room is, 30-second orientation)", rows: 2 },
          { label: "Return offer (specific day/time or low-friction ask)", rows: 2 },
          { label: "Pacing rules for the days after a spike", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "welcome-ritual-script-card",
    title: "Welcome Ritual Script Card",
    description: "The two-sentence orientation line, ready to read the moment a surge hits.",
    category: "business",
    kind: "script",
    status: "ready",
    lessonSlugs: ["from-spike-to-stable-growth"],
    blocks: [
      {
        type: "fill_lines",
        title: "Script",
        lines: [
          { label: "Acknowledge the surge honestly", rows: 1 },
          { label: "Who I am + what this room is (one or two sentences)", rows: 2 },
          { label: "What's happening now / what's next", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "post-spike-pacing-planner",
    title: "Post-Spike Pacing Planner",
    description: "Days-after tracker to avoid burnout and over-promising once a surge settles.",
    category: "business",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["from-spike-to-stable-growth"],
    blocks: [
      {
        type: "table",
        title: "Days after the spike",
        columns: ["Day", "Ran normal-length session?", "Any new promises made?", "Notes"],
        rows: 4,
      },
      {
        type: "callout",
        text: "The best proof for a returning viewer is a normal, well-run session shortly after the spike — not a bigger promise you can't sustain.",
      },
    ],
  },

  // —— GR-12 Growth Capstone ——
  {
    id: "thirty-day-growth-experiment-dossier-checklist",
    title: "30-Day Growth Experiment Dossier Checklist",
    description: "All required artifacts for a reviewable Growth Capstone.",
    category: "business",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["growth-capstone-30-day-growth-experiment"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Required packet",
        items: [
          "Diagnosis summary — real bottleneck, named with evidence",
          "One primary experiment brief — variable, before metric, review date",
          "Schedule and discovery notes across the 30-day window",
          "Analytics review — before and after, not vibes",
          "Lessons learned — honest, including what didn't work",
          "Presentation-ready results narrative",
        ],
      },
      {
        type: "callout",
        text: "Optional Growth Lab can sharpen this packet after certification — it never gates the Growth Mastery Certificate.",
      },
    ],
  },
  {
    id: "growth-capstone-30-day-planner",
    title: "Growth Capstone 30-Day Planner",
    description: "Diagnosis, variable, before metric, test window, and review date — the kickoff packet.",
    category: "business",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["growth-capstone-30-day-growth-experiment"],
    blocks: [
      {
        type: "fill_lines",
        title: "Kickoff plan",
        lines: [
          { label: "Diagnosis summary (one primary bottleneck)", rows: 2 },
          { label: "Variable I'm testing this month", rows: 1 },
          { label: "Before metric (captured on kickoff day)", rows: 1 },
          { label: "Test window (dates)", rows: 1 },
          { label: "Review date", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "One experiment, not five. Pick one variable and hold everything else steady for the full month.",
      },
    ],
  },
  {
    id: "growth-results-narrative-worksheet",
    title: "Growth Results Narrative Worksheet",
    description: "Before/after comparison, lessons learned, and next test — readable by a stranger, cold.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["growth-capstone-30-day-growth-experiment"],
    blocks: [
      {
        type: "fill_lines",
        title: "The narrative",
        lines: [
          { label: "What I diagnosed and why", rows: 2 },
          { label: "What I tested and how I held everything else steady", rows: 2 },
          { label: "What the analytics review found (before vs. after)", rows: 2 },
          { label: "What I'll keep or drop going forward", rows: 2 },
          { label: "What I'd test next", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "An honest 'inconclusive, worth a longer test' is a legitimate finding — often more useful than a forced success story.",
      },
    ],
  },
];
