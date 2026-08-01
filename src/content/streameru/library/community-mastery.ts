/**
 * Gold-standard printable packs for Community Mastery (Program 7).
 */

import type { LibraryResource } from "@/lib/streameru-library/types";

export const COMMUNITY_MASTERY_RESOURCES: LibraryResource[] = [
  // —— CM-01 Community Design: Belonging on Purpose ——
  {
    id: "community-design-one-pager",
    title: "Community Design One-Pager",
    description:
      "Define who belongs here, what the room protects, and what success looks like before you scale rituals or mods.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["community-design-belonging-on-purpose"],
    blocks: [
      {
        type: "intro",
        text: "Belonging is designed, not hoped for. Fill this before inventing new rituals — vague vibes become chaos under pressure.",
      },
      {
        type: "fill_lines",
        title: "Room identity",
        lines: [
          { label: "Who this community is for (one clear sentence)", rows: 2 },
          { label: "Who this community is NOT for (honest boundary)", rows: 2 },
          { label: "The feeling I want regulars to leave with", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Design commitments",
        lines: [
          { label: "Three behaviors we celebrate on purpose", rows: 3 },
          { label: "Two behaviors we refuse — even if they grow the room", rows: 2 },
          { label: "One sentence I will say when the room drifts off-design", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "This one-pager becomes Capstone evidence for why your appreciation event exists — not just that it happened.",
      },
    ],
  },
  {
    id: "weekly-rituals-planner",
    title: "Weekly Rituals Planner",
    description: "Name the recurring belonging beats that make return feel expected, not accidental.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["community-design-belonging-on-purpose"],
    blocks: [
      {
        type: "intro",
        text: "Rituals are small, repeatable, and hostable. Prefer three solid weekly beats over ten fragile ones.",
      },
      {
        type: "table",
        title: "Weekly rituals",
        columns: ["Day / slot", "Ritual name", "Who it serves", "Hostable in ≤5 min?"],
        rows: 5,
        hint: "Include open welcome, mid-session recognition, and close return cue if you can.",
      },
      {
        type: "fill_lines",
        title: "Protection rules",
        lines: [
          { label: "Which ritual I will keep even on a low-energy night", rows: 2 },
          { label: "Which ritual I will skip first if capacity is thin", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "community-values-worksheet",
    title: "Community Values Worksheet",
    description: "Translate brand values into observable chat and host behaviors — not slogans.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["community-design-belonging-on-purpose"],
    blocks: [
      {
        type: "table",
        title: "Values → behaviors",
        columns: ["Value (word)", "What it looks like on LIVE", "What violates it"],
        rows: 4,
      },
      {
        type: "fill_lines",
        title: "Enforcement line",
        lines: [
          { label: "My calm sentence when a value is crossed", rows: 2 },
          { label: "What I will NOT debate in public chat", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "If a value cannot be observed in chat or host behavior, it is decoration — rewrite it until it is testable.",
      },
    ],
  },

  // —— CM-02 Chat Culture and Return Viewer Habits ——
  {
    id: "open-close-community-script",
    title: "Open/Close Community Script",
    description: "Spoken open and close lines that orient newcomers and give regulars a reason to return.",
    category: "content",
    kind: "script",
    status: "ready",
    lessonSlugs: ["chat-culture-and-return-viewer-habits"],
    blocks: [
      {
        type: "fill_lines",
        title: "Open (first 60–90 seconds)",
        lines: [
          { label: "Who this room is + what we're doing today", rows: 2 },
          { label: "How chat works here (one clear norm)", rows: 2 },
          { label: "How newcomers can join in without pressure", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Close (last 2–3 minutes)",
        lines: [
          { label: "Specific thanks (behavior, not only gifts)", rows: 2 },
          { label: "Return cue (next day/time or next ritual)", rows: 2 },
          { label: "One identity line regulars can repeat", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "Open orients. Close returns. Neither is a dump of announcements — keep both speakable under pressure.",
      },
    ],
  },
  {
    id: "return-viewer-tracker",
    title: "Return Viewer Tracker",
    description: "Session log for noticing who comes back and which habits seem to invite return.",
    category: "content",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["chat-culture-and-return-viewer-habits"],
    blocks: [
      {
        type: "intro",
        text: "Track patterns across sessions — do not chase one night's vibes as proof.",
      },
      {
        type: "table",
        title: "Session log",
        columns: ["Date", "Named regulars noticed", "Newcomer who stayed", "Return cue delivered?", "Notes"],
        rows: 8,
      },
      {
        type: "notes",
        title: "Habit pattern I'm seeing",
        lines: 3,
      },
    ],
  },
  {
    id: "recognition-phrase-bank",
    title: "Recognition Phrase Bank",
    description: "Specific, reusable recognition lines that reward belonging behaviors without training gift-only status.",
    category: "content",
    kind: "template",
    status: "ready",
    lessonSlugs: ["chat-culture-and-return-viewer-habits"],
    blocks: [
      {
        type: "fill_lines",
        title: "Phrase bank",
        lines: [
          { label: "First-timer welcome (warm, low pressure)", rows: 2 },
          { label: "Return regular recognition (specific, not generic)", rows: 2 },
          { label: "Helpful chat / culture protector thank-you", rows: 2 },
          { label: "Quiet supporter line (no gift required)", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Recognition trains culture. If you only thank gifts, you teach that gifts are the only path to belonging.",
      },
    ],
  },

  // —— CM-03 Moderation Systems That Scale ——
  {
    id: "moderator-handbook",
    title: "Moderator Handbook",
    description: "Scope, tone, escalation, and off-limits — the shared operating doc for host and mods.",
    category: "safety",
    kind: "guide",
    status: "ready",
    lessonSlugs: ["moderation-systems-that-scale"],
    blocks: [
      {
        type: "intro",
        text: "Mods scale your standards only if the standards are written. Fill this with the host, then share it before the first mod shift.",
      },
      {
        type: "fill_lines",
        title: "Scope",
        lines: [
          { label: "What mods are empowered to handle without asking me", rows: 2 },
          { label: "What always comes to the host first", rows: 2 },
          { label: "Tone we use when correcting (calm / firm / brief)", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Handbook must include",
        items: [
          "Welcome / orientation role for newcomers",
          "Clear warning → timeout → remove ladder",
          "When to pause LIVE and get the host",
          "What never gets joked about in enforcement",
          "How mods debrief after a hard night",
        ],
      },
      {
        type: "callout",
        text: "A handbook without escalation is a vibe. A handbook with escalation is a system.",
      },
    ],
  },
  {
    id: "mod-role-ladder-card",
    title: "Mod Role Ladder Card",
    description: "Progression from trusted regular → trial mod → full mod — with responsibilities at each rung.",
    category: "safety",
    kind: "template",
    status: "ready",
    lessonSlugs: ["moderation-systems-that-scale"],
    blocks: [
      {
        type: "table",
        title: "Role ladder",
        columns: ["Rung", "Who qualifies", "Responsibilities", "Still off-limits"],
        rows: 3,
        hint: "Rows: Trusted regular · Trial mod · Full mod.",
      },
      {
        type: "fill_lines",
        title: "Promotion rule",
        lines: [
          { label: "How someone earns a trial (observable behaviors)", rows: 2 },
          { label: "How a trial ends (keep / coach / step back)", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "escalation-path-checklist",
    title: "Escalation Path Checklist",
    description: "Pre-written path from soft redirect to remove — so enforcement stays consistent under heat.",
    category: "safety",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["moderation-systems-that-scale"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Escalation steps (use in order unless safety risk)",
        items: [
          "Soft redirect — name the norm, invite reset",
          "Clear warning — state consequence if it continues",
          "Timeout / mute — cool the room without a speech",
          "Remove — protect the room; do not debate in public",
          "Host debrief — log what happened and adjust handbook if needed",
        ],
      },
      {
        type: "fill_lines",
        title: "Skip-the-ladder triggers",
        lines: [
          { label: "Behaviors that jump straight to remove (no debate)", rows: 3 },
        ],
      },
    ],
  },

  // —— CM-04 Conflict, Trolls, and Boundary Enforcement ——
  {
    id: "conflict-decision-tree-card",
    title: "Conflict Decision Tree Card",
    description: "Quick host-side decision map: ignore, redirect, warn, remove, or end segment.",
    category: "safety",
    kind: "template",
    status: "ready",
    lessonSlugs: ["conflict-trolls-and-boundary-enforcement"],
    blocks: [
      {
        type: "intro",
        text: "Under pressure, decide from a tree — not from whoever is loudest in chat.",
      },
      {
        type: "fill_lines",
        title: "Decision prompts",
        lines: [
          { label: "If it's bait for attention → I will…", rows: 2 },
          { label: "If it's a good-faith disagreement → I will…", rows: 2 },
          { label: "If it's harassment / safety risk → I will…", rows: 2 },
          { label: "If the room is spiraling → I will…", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Not every conflict deserves airtime. Protect the show and the people — not the argument.",
      },
    ],
  },
  {
    id: "enforcement-phrase-bank",
    title: "Enforcement Phrase Bank",
    description: "Calm, firm lines for warning, redirecting, and removing without performing a meltdown.",
    category: "safety",
    kind: "script",
    status: "ready",
    lessonSlugs: ["conflict-trolls-and-boundary-enforcement"],
    blocks: [
      {
        type: "fill_lines",
        title: "Phrases",
        lines: [
          { label: "Soft redirect (keep dignity intact)", rows: 2 },
          { label: "Clear warning with consequence", rows: 2 },
          { label: "Remove / ban line (brief, final)", rows: 2 },
          { label: "Room reset after enforcement", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Write these before you need them. Ad-libbed enforcement often becomes personal and messy.",
      },
    ],
  },
  {
    id: "incident-log-template",
    title: "Incident Log Template",
    description: "After-action log for conflict incidents — facts, action taken, follow-up, handbook change.",
    category: "safety",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["conflict-trolls-and-boundary-enforcement"],
    blocks: [
      {
        type: "table",
        title: "Incidents",
        columns: ["Date", "What happened (facts)", "Action taken", "Follow-up / handbook tweak"],
        rows: 6,
      },
      {
        type: "notes",
        title: "Pattern across incidents (optional)",
        lines: 3,
      },
    ],
  },

  // —— CM-05 Protecting Community Health (and Yourself) ——
  {
    id: "community-health-policy",
    title: "Community Health Policy",
    description: "Written floor for mental load, topic boundaries, and when the host protects themselves first.",
    category: "safety",
    kind: "guide",
    status: "ready",
    lessonSlugs: ["protecting-community-health-and-yourself"],
    blocks: [
      {
        type: "fill_lines",
        title: "Policy floor",
        lines: [
          { label: "Topics / requests I will not host on LIVE", rows: 2 },
          { label: "How I handle crisis disclosures (redirect, not therapy)", rows: 2 },
          { label: "When I end early to protect myself or the room", rows: 2 },
          { label: "How mods support health boundaries without oversharing", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Health non-negotiables",
        items: [
          "I am a host, not a therapist or crisis line",
          "I do not keep toxic regulars for growth optics",
          "I schedule recovery after hard sessions",
          "I can pause LIVE without performing an apology tour",
        ],
      },
      {
        type: "callout",
        text: "A burned-out host cannot protect a community. Your health policy is part of the product.",
      },
    ],
  },
  {
    id: "community-boundary-script-card",
    title: "Community Boundary Script Card",
    description: "Speakable lines when viewers ask for more access, emotional labor, or off-limits topics.",
    category: "safety",
    kind: "script",
    status: "ready",
    lessonSlugs: ["protecting-community-health-and-yourself"],
    blocks: [
      {
        type: "fill_lines",
        title: "Scripts",
        lines: [
          { label: "When someone asks for private emotional support on LIVE", rows: 2 },
          { label: "When someone pushes a topic I won't host", rows: 2 },
          { label: "When I need to end or step back mid-session", rows: 2 },
          { label: "When a regular guilt-trips after a boundary", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "community-health-scorecard",
    title: "Community Health Scorecard",
    description: "Weekly check on room energy, host load, and whether culture is costing more than it gives.",
    category: "safety",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["protecting-community-health-and-yourself"],
    blocks: [
      {
        type: "table",
        title: "Weekly scorecard",
        columns: ["Week", "Room tone (1–5)", "Host load (1–5)", "Enforcement needed?", "One fix next week"],
        rows: 4,
      },
      {
        type: "fill_lines",
        title: "Red-flag review",
        lines: [
          { label: "What drained me most this week?", rows: 2 },
          { label: "What boundary, if kept, would protect next week?", rows: 2 },
        ],
      },
    ],
  },

  // —— CM-06 Accessibility and Inclusion in Community Spaces ——
  {
    id: "inclusion-checklist-for-opens",
    title: "Inclusion Checklist for Opens",
    description: "Pre-LIVE checks so newcomers can orient, participate, and feel invited without insider codes.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["accessibility-and-inclusion-in-community-spaces"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Before / during open",
        items: [
          "Say what the show is in plain language (no insider slang first)",
          "Explain how to participate without gifts",
          "Offer a low-friction first action for newcomers",
          "Avoid jokes that require shared history to feel safe",
          "Caption or speak key info (not only on-screen text)",
          "Invite questions without putting anyone on the spot",
        ],
      },
      {
        type: "fill_lines",
        title: "One inclusion upgrade this week",
        lines: [
          { label: "What I'll change in my open", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "newcomer-welcome-script",
    title: "Newcomer Welcome Script",
    description: "A short, rehearseable welcome that orients strangers without freezing the show.",
    category: "content",
    kind: "script",
    status: "ready",
    lessonSlugs: ["accessibility-and-inclusion-in-community-spaces"],
    blocks: [
      {
        type: "fill_lines",
        title: "Welcome script",
        lines: [
          { label: "Acknowledge the new arrival", rows: 1 },
          { label: "One-sentence orientation to the room", rows: 2 },
          { label: "How to join in right now (optional, low pressure)", rows: 2 },
          { label: "Return to the segment without awkward silence", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "Inclusion is a host skill. A welcome that only exists for gifters is not inclusion.",
      },
    ],
  },
  {
    id: "joke-boundary-card",
    title: "Joke Boundary Card",
    description: "Define humor that builds belonging vs humor that excludes, punches down, or requires insider status.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["accessibility-and-inclusion-in-community-spaces"],
    blocks: [
      {
        type: "fill_lines",
        title: "Humor boundaries",
        lines: [
          { label: "Humor that fits this room (examples)", rows: 2 },
          { label: "Humor that is off-limits here (examples)", rows: 2 },
          { label: "What I say when a joke crosses the line", rows: 2 },
          { label: "How mods redirect without escalating into a debate", rows: 2 },
        ],
      },
    ],
  },

  // —— CM-07 Guest Hosting That Elevates Both Audiences ——
  {
    id: "guest-live-run-of-show",
    title: "Guest LIVE Run of Show",
    description: "Timed host plan for guest sessions — open, mutual value, segments, exit ramp.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["guest-hosting-that-elevates-both-audiences"],
    blocks: [
      {
        type: "timed_segments",
        title: "Guest LIVE map",
        segments: [
          { label: "Open + intro both hosts", minutes: "3–5", prompt: "Orient both rooms; state today's mutual value." },
          { label: "Shared segment 1", minutes: "10–15", prompt: "Format that serves both audiences." },
          { label: "Shared segment 2 / Q&A", minutes: "10–15", prompt: "Keep energy balanced; no one-sided promo dump." },
          { label: "Exit ramp + return cues", minutes: "3–5", prompt: "Clear next steps for each audience." },
        ],
      },
      {
        type: "fill_lines",
        title: "Mutual value",
        lines: [
          { label: "What my audience gains from this guest", rows: 2 },
          { label: "What their audience gains from my room", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "mutual-value-promo-checklist",
    title: "Mutual Value Promo Checklist",
    description: "Pre-LIVE promo and on-LIVE shout structure so both creators look professional.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["guest-hosting-that-elevates-both-audiences"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Before LIVE",
        items: [
          "Agreed topic / format in writing",
          "Agreed start window and backup plan",
          "Each creator has a one-line intro for the other",
          "Promo posts mention mutual value (not just 'come hang')",
          "Exit ramp / next-LIVE cues drafted for both rooms",
        ],
      },
      {
        type: "checkbox_list",
        title: "On LIVE",
        items: [
          "Introduce guest with specific context (not vague hype)",
          "Give guest real airtime — not a cameo for clout optics",
          "Deliver both return cues before the end",
          "Thank specifically after, not only during",
        ],
      },
    ],
  },
  {
    id: "guest-exit-ramp-card",
    title: "Guest Exit Ramp Card",
    description: "Clean close for guest LIVEs so both audiences know what to do next — no awkward fade-out.",
    category: "content",
    kind: "script",
    status: "ready",
    lessonSlugs: ["guest-hosting-that-elevates-both-audiences"],
    blocks: [
      {
        type: "fill_lines",
        title: "Exit ramp",
        lines: [
          { label: "What we're wrapping / why it mattered", rows: 2 },
          { label: "Where my audience can find the guest next", rows: 2 },
          { label: "Where their audience can return to my room next", rows: 2 },
          { label: "Final thank-you line (specific)", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "A guest LIVE without an exit ramp dumps both rooms into confusion. Close like a host, not like a hang that ran out of battery.",
      },
    ],
  },

  // —— CM-08 Interviewing Skills for Creators ——
  {
    id: "interview-question-system",
    title: "Interview Question System",
    description: "Open → deepen → highlight structure so interviews feel hosted, not interrogated.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["interviewing-skills-for-creators"],
    blocks: [
      {
        type: "intro",
        text: "Plan a system, not a laundry list. Three strong lanes beat twenty random questions.",
      },
      {
        type: "table",
        title: "Question lanes",
        columns: ["Lane", "Open question", "Deepening follow-up", "Highlight / payoff question"],
        rows: 3,
      },
      {
        type: "fill_lines",
        title: "Off-limits / sensitivity",
        lines: [
          { label: "Topics I will not ask without explicit guest consent", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "listening-redirect-card",
    title: "Listening Redirect Card",
    description: "Phrases that prove you heard the guest and steer without stealing the spotlight.",
    category: "content",
    kind: "script",
    status: "ready",
    lessonSlugs: ["interviewing-skills-for-creators"],
    blocks: [
      {
        type: "fill_lines",
        title: "Listening moves",
        lines: [
          { label: "Reflect / paraphrase in one sentence", rows: 2 },
          { label: "Deepen: 'Say more about…'", rows: 2 },
          { label: "Redirect when chat derails: bring it back", rows: 2 },
          { label: "Bridge to next lane without cutting them off", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Great interviews are audible listening. If your next question ignores their last answer, you are broadcasting, not hosting.",
      },
    ],
  },
  {
    id: "highlight-moment-log",
    title: "Highlight Moment Log",
    description: "Capture the moments worth clipping or naming in the close — evidence of a hosted conversation.",
    category: "content",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["interviewing-skills-for-creators"],
    blocks: [
      {
        type: "table",
        title: "Highlights",
        columns: ["Timestamp / beat", "What happened", "Why it mattered", "Clip / close mention?"],
        rows: 6,
      },
      {
        type: "notes",
        title: "What I'll reuse in my next interview",
        lines: 3,
      },
    ],
  },

  // —— CM-09 Professional Networking for Creators ——
  {
    id: "thirty-day-networking-plan",
    title: "Thirty-Day Networking Plan",
    description: "A paced plan for professional creator relationships — outreach, follow-through, reputation hygiene.",
    category: "business",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["professional-networking-for-creators"],
    blocks: [
      {
        type: "intro",
        text: "Networking is a cadence, not a panic DM the night you need a favor. Plan thirty days of small, professional moves.",
      },
      {
        type: "table",
        title: "Four-week plan",
        columns: ["Week", "Who I'll notice / support", "One outreach", "Follow-through", "Done?"],
        rows: 4,
      },
      {
        type: "fill_lines",
        title: "Capacity guardrail",
        lines: [
          { label: "Max outreach / week so this stays sustainable", rows: 1 },
          { label: "What I will not do (spam, guilt, fake praise)", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "outreach-notes-template",
    title: "Outreach Notes Template",
    description: "Context, value offered, ask, and follow-up — so outreach stays specific and respectful.",
    category: "business",
    kind: "template",
    status: "ready",
    lessonSlugs: ["professional-networking-for-creators"],
    blocks: [
      {
        type: "fill_lines",
        title: "Outreach draft",
        lines: [
          { label: "Creator + why them (specific, recent context)", rows: 2 },
          { label: "What I'm offering / how I already showed up", rows: 2 },
          { label: "Clear, small ask (easy yes)", rows: 2 },
          { label: "Follow-up plan (one grace follow-up, then release)", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Specific context + clear value + small ask. Long, vague, or needy messages train people to ignore you.",
      },
    ],
  },
  {
    id: "reputation-hygiene-card",
    title: "Reputation Hygiene Card",
    description: "Behaviors that protect long-term creator reputation in rooms, DMs, and collabs.",
    category: "business",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["professional-networking-for-creators"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Hygiene checks",
        items: [
          "I do not badmouth creators in public chat or clips",
          "I honor time commitments or reschedule early",
          "I credit people when I reuse their ideas or formats",
          "I do not recruit or pitch inside someone else's LIVE without consent",
          "I keep private agreements private",
          "I apologize cleanly when I drop a ball — no drama essay",
        ],
      },
      {
        type: "fill_lines",
        title: "Repair line",
        lines: [
          { label: "My short repair message when I mess up professionally", rows: 2 },
        ],
      },
    ],
  },

  // —— CM-10 Community Capstone: Community Appreciation Event ——
  {
    id: "community-appreciation-event-run-of-show",
    title: "Community Appreciation Event Run of Show",
    description: "Full timed plan for the Capstone appreciation event — belonging on purpose, not chaos with a banner.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["community-capstone-community-appreciation-event"],
    blocks: [
      {
        type: "intro",
        text: "This is the Capstone performance artifact. Design for the community you have — hostable, warm, and reviewable.",
      },
      {
        type: "timed_segments",
        title: "Event map",
        segments: [
          { label: "Open + room orientation", minutes: "3–5", prompt: "Who this is for + how to participate." },
          { label: "Appreciation segment 1", minutes: "10–15", prompt: "Recognize behaviors/people without gift hierarchy only." },
          { label: "Interactive / shared beat", minutes: "10–15", prompt: "Hostable participation with a kill-switch." },
          { label: "Close + return ritual", minutes: "5", prompt: "Specific thanks + next belonging cue." },
        ],
      },
      {
        type: "fill_lines",
        title: "Design anchors",
        lines: [
          { label: "Who / what we are appreciating on purpose", rows: 2 },
          { label: "Inclusion move for newcomers tonight", rows: 2 },
          { label: "Mod / escalation plan for the event", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "community-capstone-evidence-checklist",
    title: "Community Capstone Evidence Checklist",
    description: "All required artifacts for a reviewable Community Mastery Capstone packet.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["community-capstone-community-appreciation-event"],
    blocks: [
      {
        type: "checkbox_list",
        title: "Required packet",
        items: [
          "Community Design One-Pager (who belongs + values)",
          "Open/Close Community Script used on the event",
          "Moderation / escalation notes for the event",
          "Appreciation Event Run of Show (timed)",
          "After-Action Review Worksheet (same day)",
          "Optional: Return Viewer Tracker or Health Scorecard notes",
        ],
      },
      {
        type: "callout",
        text: "Optional Community Lab can sharpen this packet after certification — it never gates the Community Mastery Certificate.",
      },
    ],
  },
  {
    id: "after-action-review-worksheet",
    title: "After-Action Review Worksheet",
    description: "Same-day review of what worked, what drifted, and what becomes next month's culture upgrade.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["community-capstone-community-appreciation-event"],
    blocks: [
      {
        type: "fill_lines",
        title: "After-action review",
        lines: [
          { label: "What belonging looked like tonight (observable)", rows: 2 },
          { label: "Where culture drifted or needed enforcement", rows: 2 },
          { label: "What I would keep as a weekly ritual", rows: 2 },
          { label: "What I would change before hosting again", rows: 2 },
          { label: "One principle this Capstone proved for my room", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "An honest 'warm but chaotic — needs a stronger open' is better Capstone evidence than a forced perfect night story.",
      },
    ],
  },
];
