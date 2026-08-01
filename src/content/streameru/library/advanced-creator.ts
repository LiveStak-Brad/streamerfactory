/**
 * Gold-standard printable packs for Advanced Creator (Program 5).
 */

import type { LibraryResource } from "@/lib/streameru-library/types";

export const ADVANCED_CREATOR_RESOURCES: LibraryResource[] = [
  // —— AC-01 Your Creator Operating System ——
  {
    id: "creator-weekly-operating-system",
    title: "Creator Weekly Operating System",
    description:
      "One-page professional OS: weekly aim, LIVE calendar, one metric, capacity rules, and space to revise for 30 days.",
    category: "business",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["your-creator-operating-system"],
    blocks: [
      {
        type: "intro",
        text: "Fill this before your OS Proof LIVE. Keep it to one page. If it does not fit, you are over-planning. This page becomes Capstone dossier page one.",
      },
      {
        type: "fill_lines",
        title: "Layer 1 — Weekly aim (one sentence)",
        lines: [
          { label: "This week is for…", rows: 2 },
          { label: "How I will know Sunday night whether I did it", rows: 2 },
        ],
      },
      {
        type: "table",
        title: "Layer 2 — LIVE calendar",
        columns: ["Day", "Plan (length / focus)", "Recovery?"],
        rows: 7,
        hint: "Mark recovery as deliberately as LIVE days. 'Maybe' days do not belong on the OS.",
      },
      {
        type: "fill_lines",
        title: "Layer 3 — One metric this month",
        lines: [
          { label: "Primary metric (behavior-linked)", rows: 1 },
          { label: "Why this metric — and what vanity number I am demoting to optional notes", rows: 2 },
          { label: "30-day target (simple and honest)", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Layer 4 — Capacity rules (2–3 non-negotiables)",
        lines: [
          { label: "Rule 1", rows: 1 },
          { label: "Rule 2", rows: 1 },
          { label: "Rule 3 (optional)", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Today's LIVE (mission)",
        lines: [
          { label: "Today's one-sentence session aim", rows: 1 },
          { label: "Planned segment I will protect", rows: 1 },
          { label: "Next LIVE day/time I will say in the close", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Mini-review within 15 minutes of ending",
        lines: [
          { label: "Plan", rows: 1 },
          { label: "Actual", rows: 1 },
          { label: "One change", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "Capstone connection: revise this page across your 30-Day Pro Sprint. Honors Lab review (optional) can evaluate the finished dossier after your Advanced Creator Certificate — labs never gate certification.",
      },
    ],
  },
  {
    id: "weekly-review-ritual-checklist",
    title: "Weekly Review Ritual Checklist",
    description:
      "A 15–20 minute weekly review: plan vs actual vs one change — plus a quick capacity and metric check.",
    category: "business",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["your-creator-operating-system"],
    blocks: [
      {
        type: "intro",
        text: "Run this on the same day each week. Keep it under 20 minutes. Long reviews become chores you skip.",
      },
      {
        type: "checkbox_list",
        title: "Before you start (2 minutes)",
        items: [
          "Open last week's OS page and calendar",
          "Have this week's draft calendar nearby",
          "Silence notifications for 15–20 minutes",
        ],
      },
      {
        type: "fill_lines",
        title: "The only three questions",
        lines: [
          { label: "What did I plan?", rows: 2 },
          { label: "What did I actually run?", rows: 2 },
          { label: "What is the one change for next week?", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Quick health checks",
        items: [
          "Primary metric logged for the week (even if imperfect)",
          "Capacity rules still realistic — or rewritten honestly",
          "Recovery days protected on next week's calendar",
          "Next week's aim written in one checkable sentence",
        ],
      },
      {
        type: "callout",
        text: "If you missed days, shrink next week's plan. Do not revenge-stack. Calibration is professionalism.",
      },
      {
        type: "notes",
        title: "Anything else worth remembering (optional — keep short)",
        lines: 3,
      },
    ],
  },
  {
    id: "one-metric-this-month-scorecard",
    title: "One Metric This Month Scorecard",
    description:
      "30-day tracker for your single primary OS metric — with space to demote vanity numbers to notes.",
    category: "business",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["your-creator-operating-system"],
    blocks: [
      {
        type: "intro",
        text: "One primary metric for 30 days. Everything else is optional notes. Change the primary metric at month's end, not every Tuesday.",
      },
      {
        type: "fill_lines",
        title: "Metric contract",
        lines: [
          { label: "Primary metric", rows: 1 },
          { label: "How I measure it (definition)", rows: 2 },
          { label: "30-day target", rows: 1 },
          { label: "Vanity numbers I will only jot as notes", rows: 2 },
        ],
      },
      {
        type: "table",
        title: "Weekly scoreboard (4 weeks)",
        columns: ["Week", "Result", "What drove it?", "Decision for next week"],
        rows: 4,
      },
      {
        type: "checkbox_list",
        title: "Month-end review",
        items: [
          "I can explain the month's result in two sentences",
          "I know whether to keep, tighten, or replace this metric",
          "This scorecard is filed with my Capstone dossier materials",
        ],
      },
      {
        type: "notes",
        title: "Optional vanity / context notes (not the scoreboard)",
        lines: 4,
      },
    ],
  },

  // —— AC-02 Creator Brand That Survives the Feed ——
  {
    id: "brand-one-pager",
    title: "Brand One-Pager",
    description:
      "Four-box brand spine: who it's for, promise, three proof behaviors, and off-limits — Capstone dossier page two.",
    category: "branding",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["creator-brand-that-survives-the-feed"],
    blocks: [
      {
        type: "intro",
        text: "Fill this before your Brand Proof LIVE. Keep it to one page. Freeze it for 30 days unless something is factually false — then file it with your Creator OS for the Capstone.",
      },
      {
        type: "fill_lines",
        title: "Box 1 — Who it is for",
        lines: [
          { label: "Viewer type (not 'everyone')", rows: 2 },
          { label: "What situation they are usually in when they find you", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Box 2 — The promise (one or two sentences)",
        lines: [
          { label: "If they stay, they get…", rows: 2 },
          { label: "One-breath version I can say on LIVE", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Box 3 — Three proof behaviors",
        lines: [
          { label: "Behavior 1 (observable on LIVE)", rows: 1 },
          { label: "Behavior 2", rows: 1 },
          { label: "Behavior 3", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Box 4 — Off-limits",
        lines: [
          { label: "I will not do this even if it trends…", rows: 2 },
          { label: "Why that protects recognition", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Capstone connection: this page sits beside your Creator Weekly Operating System. Optional Honors Lab review can later check whether LIVE matched the paper — labs never gate certification.",
      },
    ],
  },
  {
    id: "profile-live-alignment-checklist",
    title: "Profile / LIVE Alignment Checklist",
    description:
      "Confirm photo, name, bio, open, close, and schedule language all match your brand promise and OS capacity.",
    category: "branding",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["creator-brand-that-survives-the-feed"],
    blocks: [
      {
        type: "intro",
        text: "Run this after the Brand One-Pager and before Go Live. Brand is honesty at scale — profile claims must match the week you can actually run.",
      },
      {
        type: "checkbox_list",
        title: "Silent audition (profile)",
        items: [
          "Photo is a readable face that matches who appears on LIVE",
          "Name / nickname is sayable and not spam-cluttered",
          "Bio states who it's for + the promise in plain language",
          "Any schedule language matches my real Creator OS calendar",
          "Recent promo posts do not contradict the same promise",
        ],
      },
      {
        type: "checkbox_list",
        title: "On-LIVE alignment",
        items: [
          "Open line states today's version of the promise in one sentence",
          "I know when I will hit each of my three proof behaviors",
          "Close restates who it's for + next LIVE day/time from my OS",
          "I am not planning a format that my off-limits list forbids",
        ],
      },
      {
        type: "fill_lines",
        title: "If anything failed the checklist",
        lines: [
          { label: "What contradicted the promise?", rows: 2 },
          { label: "One fix I will make before going live", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "brand-leak-repair-sheet",
    title: "Brand Leak Repair Sheet",
    description:
      "Spot a promise-vs-behavior contradiction and choose one repair without panic-rebranding.",
    category: "branding",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["creator-brand-that-survives-the-feed"],
    blocks: [
      {
        type: "intro",
        text: "Use when viewers still ask what you do, or when your LIVE week did not match your bio. One leak, one fix — not a full identity reboot.",
      },
      {
        type: "fill_lines",
        title: "The leak",
        lines: [
          { label: "What I promised (bio / open / one-pager)", rows: 2 },
          { label: "What I actually did on LIVE", rows: 2 },
          { label: "Where people would feel the contradiction", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Choose one repair path",
        items: [
          "Rewrite the promise so it matches what I can honestly sustain",
          "Keep the promise and change one proof behavior / segment plan",
          "Update bio and open the same day so paper and LIVE match",
          "Hold the one-pager for 30 days — this was one quiet day, not a leak",
        ],
      },
      {
        type: "fill_lines",
        title: "The one change",
        lines: [
          { label: "My single fix for this week", rows: 2 },
          { label: "How I will check it in Sunday's OS review", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Rebranding every quiet Tuesday is a leak of a different kind. Freeze the one-pager for the Capstone sprint unless it is factually false.",
      },
    ],
  },

  // —— AC-03 Reading Your LIVE Numbers ——
  {
    id: "weekly-live-analytics-scorecard",
    title: "Weekly LIVE Analytics Scorecard",
    description:
      "Integrity / Experience / Relationship scorecard with vanity notes margin and exactly one decision for next week.",
    category: "business",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["reading-your-live-numbers"],
    blocks: [
      {
        type: "intro",
        text: "Fill this during your weekly OS review. Three metrics. One decision. File it for the Capstone dossier.",
      },
      {
        type: "fill_lines",
        title: "Week covered",
        lines: [
          { label: "Dates / sessions included", rows: 1 },
          { label: "Brand promise reminder (one line)", rows: 1 },
        ],
      },
      {
        type: "table",
        title: "Three metrics",
        columns: ["Metric type", "Definition I used", "Result", "Notes"],
        rows: 3,
        hint: "Row 1 Integrity · Row 2 Experience · Row 3 Relationship",
      },
      {
        type: "fill_lines",
        title: "Vanity notes (not the throne)",
        lines: [
          { label: "Peaks / spikes / comparisons worth remembering", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Diagnosis",
        lines: [
          { label: "What surprised me?", rows: 2 },
          { label: "What did I control?", rows: 2 },
          { label: "One change for next week (behavior or schedule)", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "If Integrity failed, restore the calendar before inventing a growth crisis. Capstone reviewers (and optional Honors Labs) look for honest one-change discipline.",
      },
    ],
  },
  {
    id: "vanity-metrics-parking-lot",
    title: "Vanity Metrics Parking Lot",
    description:
      "Capture peaks, spikes, and comparisons without crowning them as your weekly operating scoreboard.",
    category: "business",
    kind: "journal",
    status: "ready",
    lessonSlugs: ["reading-your-live-numbers"],
    blocks: [
      {
        type: "intro",
        text: "Use this when a number is loud but should not run your week. Park it. Keep Integrity / Experience / Relationship on the throne.",
      },
      {
        type: "table",
        title: "Parked numbers",
        columns: ["Number", "Why it felt loud", "Why it is a note", "Keep / discard next week"],
        rows: 5,
      },
      {
        type: "checkbox_list",
        title: "Before you leave the parking lot",
        items: [
          "My primary three scorecard metrics are still filled",
          "I wrote one decision that does not depend on a stranger's totals",
          "I did not revenge-stack volume because of a spike or a dip",
        ],
      },
    ],
  },
  {
    id: "one-decision-log",
    title: "One-Decision Log",
    description:
      "30-day log of weekly analytics decisions — Capstone evidence that you iterate instead of thrash.",
    category: "business",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["reading-your-live-numbers"],
    blocks: [
      {
        type: "intro",
        text: "One line per week. After 30 days you should see a pattern of disciplined changes — gold for the Advanced Creator Capstone.",
      },
      {
        type: "table",
        title: "Weekly decisions",
        columns: ["Week of", "One change", "Did I run it?", "Result in one sentence"],
        rows: 5,
      },
      {
        type: "notes",
        title: "Month pattern (optional)",
        lines: 3,
      },
    ],
  },

  // —— AC-04 Creative Planning ——
  {
    id: "two-week-creative-plan",
    title: "Two-Week Creative Plan",
    description:
      "Theme, primary/secondary segments, hooks, and empty-room contingencies mapped to your OS calendar.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["creative-planning-for-real-weeks"],
    blocks: [
      {
        type: "intro",
        text: "Plan two weeks only. Tie every theme to your brand promise. File with Capstone materials.",
      },
      {
        type: "fill_lines",
        title: "Sprint framing",
        lines: [
          { label: "Brand promise reminder", rows: 1 },
          { label: "Two-week theme focus", rows: 1 },
        ],
      },
      {
        type: "table",
        title: "Week A LIVE days",
        columns: ["Day", "Theme tag", "Primary segment", "Backup", "Hook", "Empty-room default"],
        rows: 4,
      },
      {
        type: "table",
        title: "Week B LIVE days",
        columns: ["Day", "Theme tag", "Primary segment", "Backup", "Hook", "Empty-room default"],
        rows: 4,
      },
      {
        type: "callout",
        text: "If a day is 'maybe,' it is not on the plan. Maybes are vibes.",
      },
    ],
  },
  {
    id: "segment-bank-10",
    title: "Segment Bank (10+)",
    description: "Named reusable LIVE blocks with jobs and empty-room-safe flags.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["creative-planning-for-real-weeks"],
    blocks: [
      {
        type: "intro",
        text: "Minimum ten segments. Steal structure, not someone else's personality. Star reuse winners after each LIVE.",
      },
      {
        type: "table",
        title: "Segment bank",
        columns: ["Name", "Job (what it does)", "Empty-room safe? Y/N", "Reuse notes"],
        rows: 10,
      },
    ],
  },
  {
    id: "hooks-library-card",
    title: "Hooks Library Card",
    description: "Five to eight rotatable open lines matched to your brand promise.",
    category: "content",
    kind: "script",
    status: "ready",
    lessonSlugs: ["creative-planning-for-real-weeks"],
    blocks: [
      {
        type: "fill_lines",
        title: "Open lines",
        lines: [
          { label: "Hook 1", rows: 1 },
          { label: "Hook 2", rows: 1 },
          { label: "Hook 3", rows: 1 },
          { label: "Hook 4", rows: 1 },
          { label: "Hook 5", rows: 1 },
          { label: "Hook 6 (optional)", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "Update weekly. Do not invent a masterpiece at second zero every night.",
      },
    ],
  },

  // —— AC-05 Growth Experiments ——
  {
    id: "experiment-brief",
    title: "Experiment Brief",
    description: "One variable, success criteria, kill rule, and two-week window dates.",
    category: "business",
    kind: "template",
    status: "ready",
    lessonSlugs: ["growth-experiments-that-dont-wreck-your-show"],
    blocks: [
      {
        type: "fill_lines",
        title: "Experiment design",
        lines: [
          { label: "Single variable (schedule / hook / topic / CTA)", rows: 1 },
          { label: "What stays stable (brand + OS capacity)", rows: 2 },
          { label: "Success criteria (observable)", rows: 2 },
          { label: "Kill rule", rows: 2 },
          { label: "Window start → end", rows: 1 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Ethics gate",
        items: [
          "Does not break platform safety",
          "Does not violate brand off-limits",
          "Does not require guilt/pressure CTAs to 'work'",
        ],
      },
    ],
  },
  {
    id: "experiment-results-log",
    title: "Experiment Results Log",
    description: "Session-by-session tracker for the experiment window.",
    category: "business",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["growth-experiments-that-dont-wreck-your-show"],
    blocks: [
      {
        type: "table",
        title: "Sessions",
        columns: ["Date", "Variable present? Y/N", "Integrity note", "One observation"],
        rows: 8,
      },
    ],
  },
  {
    id: "keep-adapt-kill-decision-card",
    title: "Keep / Adapt / Kill Decision Card",
    description: "End-of-window decision one-pager for Capstone evidence.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["growth-experiments-that-dont-wreck-your-show"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Decision",
        items: ["Keep", "Adapt", "Kill"],
      },
      {
        type: "fill_lines",
        title: "Why (one to three sentences)",
        lines: [
          { label: "Decision rationale", rows: 3 },
          { label: "What I will do next week because of this", rows: 2 },
        ],
      },
    ],
  },

  // —— AC-06 Professional Standards ——
  {
    id: "personal-professional-standards-sheet",
    title: "Personal Professional Standards Sheet",
    description: "Time, chat, recovery, and reputation standards you can keep on tired days.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["professional-standards-on-live"],
    blocks: [
      {
        type: "fill_lines",
        title: "Time standards",
        lines: [
          { label: "Start window / delay communication rule", rows: 2 },
          { label: "Cancel / no-show rule", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Chat standards",
        lines: [
          { label: "What good looks like", rows: 2 },
          { label: "What ends participation", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Recovery + reputation",
        lines: [
          { label: "Recovery pattern (acknowledge / fix / continue)", rows: 2 },
          { label: "Reputation hygiene rules", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "recovery-script-card",
    title: "Recovery Script Card",
    description: "Short acknowledge / fix / continue lines for glitches and awkward moments.",
    category: "business",
    kind: "script",
    status: "ready",
    lessonSlugs: ["professional-standards-on-live"],
    blocks: [
      {
        type: "fill_lines",
        title: "Scripts",
        lines: [
          { label: "Tech glitch line", rows: 2 },
          { label: "Late start line", rows: 2 },
          { label: "Awkward silence reset line", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "delay-cancel-communication-checklist",
    title: "Delay & Cancel Communication Checklist",
    description: "How you tell people when plans change — silence is not a strategy.",
    category: "business",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["professional-standards-on-live"],
    blocks: [
      {
        type: "checkbox_list",
        title: "When delayed",
        items: [
          "Post a delay note before or at the posted time when possible",
          "State the new target window",
          "Acknowledge briefly on stream if you still go live",
        ],
      },
      {
        type: "checkbox_list",
        title: "When canceling",
        items: [
          "Say so before the slot when possible",
          "Offer the next real OS calendar day",
          "Update the OS — do not ghost the week",
        ],
      },
    ],
  },

  // —— AC-07 Privacy & Security ——
  {
    id: "privacy-security-checklist",
    title: "Privacy & Security Checklist",
    description: "Account hygiene + monthly re-check for creator career safety.",
    category: "safety",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["privacy-security-and-personal-boundaries"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Account hygiene",
        items: [
          "Recovery email accessible",
          "Recovery phone current",
          "2FA enabled where available",
          "Unique credentials / passkeys in use",
          "Stale device/partner access revoked",
          "No sketchy tools holding login access",
        ],
      },
      {
        type: "checkbox_list",
        title: "Monthly re-check",
        items: [
          "Tested recovery path",
          "Reviewed connected apps/devices",
          "Re-read on-camera boundaries list",
        ],
      },
    ],
  },
  {
    id: "on-camera-boundaries-list",
    title: "On-Camera Boundaries List",
    description: "Location, family, workplace, and never-on-LIVE rules.",
    category: "safety",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["privacy-security-and-personal-boundaries"],
    blocks: [
      {
        type: "fill_lines",
        title: "Boundaries",
        lines: [
          { label: "Location / routine rules", rows: 2 },
          { label: "Family / household rules", rows: 2 },
          { label: "Workplace / client rules", rows: 2 },
          { label: "Never-on-LIVE list", rows: 3 },
        ],
      },
    ],
  },
  {
    id: "privacy-boundary-script-card",
    title: "Boundary Script Card",
    description: "Short lines for pushy chat — say once, then continue the show.",
    category: "safety",
    kind: "script",
    status: "ready",
    lessonSlugs: ["privacy-security-and-personal-boundaries"],
    blocks: [
      {
        type: "fill_lines",
        title: "Scripts",
        lines: [
          { label: "Home / location pushback", rows: 1 },
          { label: "Family details pushback", rows: 1 },
          { label: "Other private ask", rows: 1 },
        ],
      },
    ],
  },

  // —— AC-08 Capstone ——
  {
    id: "capstone-dossier-checklist",
    title: "Capstone Dossier Checklist",
    description: "All required Advanced Creator artifacts for an objectively reviewable Capstone.",
    category: "business",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["advanced-creator-capstone-30-day-pro-sprint"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Required packet",
        items: [
          "Creator Weekly OS pages for the month",
          "Brand One-Pager (dated if revised)",
          "Four weekly analytics scorecards",
          "Creative plan + segment bank",
          "One experiment brief + results + keep/adapt/kill",
          "Professional standards sheet",
          "Privacy & security checklist applied",
          "Before snapshot + after retrospective",
        ],
      },
      {
        type: "callout",
        text: "Optional Honors Lab can review this packet after certification — labs never gate the Advanced Creator Certificate.",
      },
    ],
  },
  {
    id: "thirty-day-pro-sprint-planner",
    title: "30-Day Pro Sprint Planner",
    description: "Sprint goal, capacity, experiment window, review date, and before snapshot.",
    category: "business",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["advanced-creator-capstone-30-day-pro-sprint"],
    blocks: [
      {
        type: "fill_lines",
        title: "Sprint design",
        lines: [
          { label: "One-sentence sprint goal", rows: 2 },
          { label: "Capacity rules for these 30 days", rows: 2 },
          { label: "Experiment variable + window dates", rows: 2 },
          { label: "Final retrospective date", rows: 1 },
          { label: "Before snapshot (Integrity / brand / Experience note)", rows: 3 },
        ],
      },
    ],
  },
  {
    id: "before-after-retrospective-worksheet",
    title: "Before/After Retrospective Worksheet",
    description: "Capstone close: what changed, 90-day keep habit, next Mastery Path choice.",
    category: "business",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["advanced-creator-capstone-30-day-pro-sprint"],
    blocks: [
      {
        type: "fill_lines",
        title: "Retrospective",
        lines: [
          { label: "What I planned", rows: 2 },
          { label: "What I actually ran", rows: 2 },
          { label: "Standard or privacy default that saved me", rows: 2 },
          { label: "Experiment learning (keep/adapt/kill)", rows: 2 },
          { label: "One operating habit I will keep for 90 days", rows: 2 },
          { label: "Next Mastery Path + why (Presence recommended for most)", rows: 2 },
        ],
      },
    ],
  },
];
