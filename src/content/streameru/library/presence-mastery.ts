/**
 * Gold-standard printable packs for Presence Mastery (Program 6 / Mastery Path 1).
 */

import type { LibraryResource } from "@/lib/streameru-library/types";

export const PRESENCE_MASTERY_RESOURCES: LibraryResource[] = [
  // —— PR-01 Camera Presence: Owning the Frame ——
  {
    id: "presence-drill-card",
    title: "Presence Drill Card",
    description:
      "Five short camera drills: posture, eye line, chin, energy, and frame reset — with space to log what changed.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["camera-presence-owning-the-frame"],
    blocks: [
      {
        type: "intro",
        text: "Run these drills off-stream or in a private LIVE. Keep each under three minutes. Presence is practiced, not wished into existence.",
      },
      {
        type: "checkbox_list",
        title: "Setup before drills",
        items: [
          "Camera at eye level (or intentional slight above)",
          "Shoulders visible — not cropped at the chin",
          "One clean backdrop; remove visual clutter behind you",
          "Phone/laptop propped so you are not looking down into chat",
        ],
      },
      {
        type: "fill_lines",
        title: "Drill log (60–90 seconds each)",
        lines: [
          { label: "Posture drill — what I fixed (spine / shoulders / lean)", rows: 2 },
          { label: "Eye-line drill — where I looked and what felt natural", rows: 2 },
          { label: "Chin drill — chin dip vs neutral vs slight lift", rows: 2 },
          { label: "Energy drill — same words, two energy levels; which read better?", rows: 2 },
          { label: "Frame reset — what I do when I catch myself shrinking", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Home frame (write once, reuse)",
        lines: [
          { label: "My default framing note (distance, height, crop)", rows: 2 },
          { label: "One tell that means I lost presence", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "Capstone connection: your home frame and one tell become part of the Capstone before/after notes. Optional Honors Lab may review framing later — it never gates Presence certification.",
      },
    ],
  },
  {
    id: "camera-frame-checklist",
    title: "Camera Frame Checklist",
    description:
      "Pre-LIVE frame checklist: eye line, crop, posture, background, and a 10-second ownership check.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["camera-presence-owning-the-frame"],
    blocks: [
      {
        type: "intro",
        text: "Run this in the 60 seconds before Go Live. If something fails the checklist, fix it before you open — do not open and apologize into the frame.",
      },
      {
        type: "checkbox_list",
        title: "Frame ownership checks",
        items: [
          "Eyes meet the lens more than the chat box",
          "Headroom is intentional (not floating or cropped)",
          "Shoulders and upper torso visible — you own the rectangle",
          "Posture: tall without stiffness; no chin-to-chest collapse",
          "Background supports you (not competing with you)",
          "Lighting: face readable; no harsh silhouette",
          "Mic position does not force awkward lean into frame",
          "10-second ownership check: I look like a host, not a hostage",
        ],
      },
      {
        type: "fill_lines",
        title: "If something failed — fix before open",
        lines: [
          { label: "What failed", rows: 1 },
          { label: "What I changed", rows: 1 },
        ],
      },
      {
        type: "notes",
        title: "After LIVE: one frame note for next time",
        lines: 2,
      },
    ],
  },
  {
    id: "presence-self-review-notes",
    title: "Presence Self-Review Notes",
    description:
      "Replay worksheet: three presence wins, one leak, and one concrete frame fix for the next LIVE.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["camera-presence-owning-the-frame"],
    blocks: [
      {
        type: "intro",
        text: "Watch 3–5 minutes of replay with sound off first, then with sound. Judge the rectangle, then the host energy. Keep this under ten minutes.",
      },
      {
        type: "fill_lines",
        title: "Session meta",
        lines: [
          { label: "Date / LIVE title", rows: 1 },
          { label: "Clip times reviewed", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Presence audit",
        lines: [
          { label: "Win 1 — what looked intentional", rows: 2 },
          { label: "Win 2", rows: 2 },
          { label: "Win 3", rows: 2 },
          { label: "One presence leak (chin, eyes, shrink, fidget)", rows: 2 },
          { label: "One concrete fix for next LIVE (behavior, not vibe)", rows: 2 },
        ],
      },
      {
        type: "table",
        title: "Timestamp notes (optional)",
        columns: ["Time", "What I saw", "Keep / Fix"],
        rows: 4,
        hint: "Capture moments you will reuse in Capstone before/after notes.",
      },
      {
        type: "callout",
        text: "File one leak + one fix. That pair is Capstone evidence later. Honors Lab is optional polish after the Presence Certificate — never a gate.",
      },
    ],
  },

  // —— PR-02 Voice That Holds a Room ——
  {
    id: "voice-warmup-routine",
    title: "Voice Warmup Routine",
    description:
      "A 5-minute pre-LIVE vocal warmup: breath, range, articulation, and a room-holding open line.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["voice-that-holds-a-room"],
    blocks: [
      {
        type: "intro",
        text: "Do this before every LIVE you care about. Five minutes. Skip it when you are rushed and you will hear the cost in minute three.",
      },
      {
        type: "checkbox_list",
        title: "5-minute warmup",
        items: [
          "60s — slow nasal inhale, long mouth exhale (relax jaw)",
          "60s — hum on a comfortable pitch; feel vibration in face/chest",
          "60s — lip trills or gentle sirens (no strain)",
          "60s — tongue twister or articulation phrase at conversational volume",
          "60s — deliver your opening line at 'room hold' volume, not whisper-chat volume",
        ],
      },
      {
        type: "fill_lines",
        title: "Today's room-hold open",
        lines: [
          { label: "Exact opening sentence (speak it twice before Go Live)", rows: 2 },
          { label: "Target energy (1–5) for the first 30 seconds", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "Room-hold voice is clear and intentional — not shouting. If you only sound alive when chat spikes, the voice is following the room instead of leading it.",
      },
    ],
  },
  {
    id: "vocal-variety-scorecard",
    title: "Vocal Variety Scorecard",
    description:
      "Score pace, pitch range, pauses, and energy shifts across a LIVE segment — then pick one upgrade.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["voice-that-holds-a-room"],
    blocks: [
      {
        type: "intro",
        text: "Score a 5–10 minute stretch of replay. 1 = flat / monotone risk; 5 = clear variety that still sounds like you. Pick one number to raise next LIVE — not all four.",
      },
      {
        type: "table",
        title: "Variety scores (1–5)",
        columns: ["Dimension", "Score 1–5", "Evidence (what I heard)"],
        rows: 4,
        hint: "Rows: Pace · Pitch range · Pauses · Energy shifts. Write the dimension name in column 1.",
      },
      {
        type: "fill_lines",
        title: "One upgrade",
        lines: [
          { label: "The dimension I will raise next LIVE", rows: 1 },
          { label: "How I will practice it (specific drill or cue)", rows: 2 },
          { label: "Where in the run-of-show I will use the upgrade", rows: 1 },
        ],
      },
      {
        type: "notes",
        title: "Words or phrases I over-flatlined",
        lines: 2,
      },
    ],
  },
  {
    id: "before-after-voice-notes",
    title: "Before / After Voice Notes",
    description:
      "Capture your default voice failure mode and a short after-note once you run the warmup + variety upgrade.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["voice-that-holds-a-room"],
    blocks: [
      {
        type: "intro",
        text: "Write the before note this week. Write the after note after one LIVE where you used the warmup. Capstone will ask for this contrast — start now.",
      },
      {
        type: "fill_lines",
        title: "Before (default failure mode)",
        lines: [
          { label: "What my voice does under low chat / fatigue", rows: 2 },
          { label: "Where volume drops or pace rushes", rows: 2 },
          { label: "One clip timestamp that proves it (if available)", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "After (post-warmup LIVE)",
        lines: [
          { label: "What improved", rows: 2 },
          { label: "What still slips", rows: 2 },
          { label: "Keep / Fix for Capstone voice plan", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Optional Honors Lab can listen for vocal variety after you certify — it does not delay your Presence Capstone or certificate.",
      },
    ],
  },

  // —— PR-03 Confidence When the Chat Is Quiet ——
  {
    id: "quiet-chat-protocol-card",
    title: "Quiet Chat Protocol Card",
    description:
      "A glanceable protocol for empty or quiet chat: narrate, teach, invite, continue — without apologizing.",
    category: "content",
    kind: "template",
    status: "ready",
    lessonSlugs: ["confidence-when-the-chat-is-quiet"],
    blocks: [
      {
        type: "intro",
        text: "Print or pin this beside your camera. Quiet chat is a hosting condition, not a verdict. Follow the protocol instead of spiraling into 'is anyone here?'",
      },
      {
        type: "checkbox_list",
        title: "Quiet-chat protocol (in order)",
        items: [
          "Do not apologize for low viewers or silence",
          "Narrate what you are doing for 30–60 seconds",
          "Teach or share one small useful thing",
          "Invite with one clear, answerable question (then wait)",
          "Continue the segment you planned — do not abandon structure",
          "If still silent after 20 seconds, rotate to next prompt (not panic)",
        ],
      },
      {
        type: "fill_lines",
        title: "My three quiet-chat prompts (write before LIVE)",
        lines: [
          { label: "Narrate prompt", rows: 2 },
          { label: "Teach / share prompt", rows: 2 },
          { label: "Invite question (easy to answer in chat)", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Confidence is the protocol under silence. Capstone quiet stretches still count when you follow this card.",
      },
    ],
  },
  {
    id: "silence-rescue-card",
    title: "Silence Rescue Card",
    description:
      "Short rescue lines and moves for dead air, awkward pauses, and the urge to apologize.",
    category: "content",
    kind: "script",
    status: "ready",
    lessonSlugs: ["confidence-when-the-chat-is-quiet"],
    blocks: [
      {
        type: "intro",
        text: "Fill these before you need them. Under silence, improvising rescue language often becomes apology language.",
      },
      {
        type: "fill_lines",
        title: "Rescue scripts (keep warm, never self-shaming)",
        lines: [
          { label: "Dead-air rescue (under 10 seconds of pause)", rows: 2 },
          { label: "Awkward pause after a question nobody answered", rows: 2 },
          { label: "Reset line that returns to the segment", rows: 2 },
          { label: "Line I will never say (apology / 'anyone here?')", rows: 1 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Physical rescue moves",
        items: [
          "Glance at camera (not chat count)",
          "Change energy one notch up or down on purpose",
          "Pick up a prop / demo / note card to narrate",
          "Name the next beat out loud ('Next up…')",
        ],
      },
    ],
  },
  {
    id: "empty-room-segment-plan",
    title: "Empty Room Segment Plan",
    description:
      "Plan a 10–15 minute empty-or-quiet segment with beats, prompts, and a no-spiral rule.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["confidence-when-the-chat-is-quiet"],
    blocks: [
      {
        type: "intro",
        text: "Design a segment that works with zero chat. If it only works when people type, it is not a presence segment — it is a dependency.",
      },
      {
        type: "fill_lines",
        title: "Segment contract",
        lines: [
          { label: "Segment title / job", rows: 1 },
          { label: "Length (minutes)", rows: 1 },
          { label: "Promise if nobody types", rows: 2 },
        ],
      },
      {
        type: "timed_segments",
        title: "Beat map",
        segments: [
          { label: "Open the beat", minutes: "1–2", prompt: "Hook + what this segment is for" },
          { label: "Value / teach", minutes: "4–6", prompt: "One useful idea without needing replies" },
          { label: "Invite (optional)", minutes: "1", prompt: "One easy question, then continue" },
          { label: "Close / bridge", minutes: "1–2", prompt: "Land the point + tease next beat" },
        ],
      },
      {
        type: "fill_lines",
        title: "No-spiral rule",
        lines: [
          { label: "If I feel the spiral, I will do this instead", rows: 2 },
        ],
      },
      {
        type: "notes",
        title: "After running it once — what held without chat?",
        lines: 3,
      },
    ],
  },

  // —— PR-04 Storytelling on LIVE (Not Scripts) ——
  {
    id: "micro-story-bank",
    title: "Micro Story Bank",
    description:
      "Bank of 6–8 micro-stories with setup, turn, and payoff — short enough to tell live without a script.",
    category: "content",
    kind: "template",
    status: "ready",
    lessonSlugs: ["storytelling-on-live-not-scripts"],
    blocks: [
      {
        type: "intro",
        text: "Write stories as bullets, not scripts. If you cannot tell it in under two minutes, it is not a micro-story yet. Capstone will need at least one payoff story.",
      },
      {
        type: "table",
        title: "Story bank",
        columns: ["Title", "Setup (1 line)", "Turn", "Payoff"],
        rows: 8,
        hint: "Keep payoffs concrete: lesson, laugh, or decision — not 'and then vibes happened.'",
      },
      {
        type: "fill_lines",
        title: "Tonight's pick",
        lines: [
          { label: "Which story I will tell", rows: 1 },
          { label: "Where it sits in the run-of-show", rows: 1 },
          { label: "Payoff sentence (must land)", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Stories serve the LIVE. If chat interrupts, land a mini-payoff and return — see Story Interrupt Recovery.",
      },
    ],
  },
  {
    id: "story-delivery-checklist",
    title: "Story Delivery Checklist",
    description:
      "Pre-tell checklist: stakes, one turn, clear payoff, timebox, and camera energy for the beat.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["storytelling-on-live-not-scripts"],
    blocks: [
      {
        type: "intro",
        text: "Check this before you launch a story beat. Missing payoff is the most common LIVE storytelling failure.",
      },
      {
        type: "checkbox_list",
        title: "Before you tell it",
        items: [
          "Setup names who/where in one breath",
          "There is one clear turn (not five)",
          "Payoff is written or memorized as a sentence",
          "Timebox set (e.g. under 2 minutes)",
          "I know why this story belongs in this LIVE",
          "Camera energy planned for the turn (lean-in / pause / smile)",
        ],
      },
      {
        type: "checkbox_list",
        title: "While telling",
        items: [
          "I am not reading a script word-for-word",
          "I pause once for the turn to land",
          "I land the payoff before drifting",
          "I bridge back to the segment after the story",
        ],
      },
      {
        type: "fill_lines",
        title: "Post-tell note",
        lines: [
          { label: "Did the payoff land? Evidence?", rows: 2 },
          { label: "Trim or expand next time?", rows: 1 },
        ],
      },
    ],
  },
  {
    id: "story-interrupt-recovery",
    title: "Story Interrupt Recovery",
    description:
      "Scripts and moves for when chat, gifts, or tech interrupt a story mid-beat — without losing the payoff.",
    category: "content",
    kind: "script",
    status: "ready",
    lessonSlugs: ["storytelling-on-live-not-scripts"],
    blocks: [
      {
        type: "intro",
        text: "LIVE stories get interrupted. Pros land a mini-payoff or bookmark, handle the moment, then finish. Amateurs abandon the story and never return.",
      },
      {
        type: "fill_lines",
        title: "Recovery lines",
        lines: [
          { label: "Gift / big comment interrupt — acknowledge + bookmark", rows: 2 },
          { label: "Tech blip — hold place line", rows: 2 },
          { label: "Return-to-story line (exact words)", rows: 2 },
          { label: "Mini-payoff if I must cut short", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Recovery order",
        items: [
          "Acknowledge the interrupt briefly (warm, short)",
          "Bookmark: 'Hold that — one line left on the story'",
          "Handle the interrupt",
          "Return and land payoff (or mini-payoff)",
          "Bridge back to the planned segment",
        ],
      },
      {
        type: "callout",
        text: "Capstone reviewers look for payoff discipline. Interrupted stories that still land count as presence skill.",
      },
    ],
  },

  // —— PR-05 Audience Psychology: Why People Stay ——
  {
    id: "viewer-motive-map",
    title: "Viewer Motive Map",
    description:
      "Map why people stay, tip, or leave in your show — then match one segment to a primary motive.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["audience-psychology-why-people-stay"],
    blocks: [
      {
        type: "intro",
        text: "Viewers stay for motives: belonging, learning, entertainment, status, parasocial comfort, or utility. Guess less — map what your show actually offers.",
      },
      {
        type: "table",
        title: "Motive map",
        columns: ["Motive", "Evidence I see in chat/behavior", "How my show feeds it"],
        rows: 6,
        hint: "Common motives: Belonging · Learning · Entertainment · Recognition · Comfort · Utility.",
      },
      {
        type: "fill_lines",
        title: "Primary motive this month",
        lines: [
          { label: "Primary motive I will design for", rows: 1 },
          { label: "Secondary motive (optional)", rows: 1 },
          { label: "What I will stop optimizing for (honest demotion)", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Psychology without ethics becomes manipulation. Use the Ethics Gate Card before you redesign for tips or stay-hooks.",
      },
    ],
  },
  {
    id: "segment-redesign-worksheet",
    title: "Segment Redesign Worksheet",
    description:
      "Rewrite one segment so it clearly serves a viewer motive — promise, beat, proof, and exit.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["audience-psychology-why-people-stay"],
    blocks: [
      {
        type: "intro",
        text: "Pick one existing segment. Redesign it around a motive, not around 'more energy.' If you cannot name the motive, the redesign is still vibes.",
      },
      {
        type: "fill_lines",
        title: "Before",
        lines: [
          { label: "Current segment name", rows: 1 },
          { label: "What it vaguely tries to do", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "After (motive-led)",
        lines: [
          { label: "Motive served", rows: 1 },
          { label: "Promise in one sentence", rows: 2 },
          { label: "Key beat that delivers the promise", rows: 2 },
          { label: "Proof viewers can feel (what changes for them)", rows: 2 },
          { label: "Clean exit / bridge to next beat", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Redesign checks",
        items: [
          "Promise is understandable in under 5 seconds",
          "A silent viewer still gets value",
          "I am not baiting with fake urgency",
          "Ethics Gate passed",
        ],
      },
    ],
  },
  {
    id: "ethics-gate-card",
    title: "Ethics Gate Card",
    description:
      "A hard gate before motive-based redesigns: no fake scarcity, no shame hooks, no covert pressure.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["audience-psychology-why-people-stay"],
    blocks: [
      {
        type: "intro",
        text: "Pass every redesign and tip moment through this gate. Presence Mastery includes trust. Manipulation that 'works' still fails the craft.",
      },
      {
        type: "checkbox_list",
        title: "Ethics gate (all must pass)",
        items: [
          "No fake countdown or false scarcity",
          "No shame / FOMO language aimed at quiet viewers",
          "No pretending a gift is required for basic respect",
          "No bait-and-switch promises",
          "I would be fine if a mentor watched this moment",
          "I can explain the ask in one honest sentence",
        ],
      },
      {
        type: "fill_lines",
        title: "If something failed the gate",
        lines: [
          { label: "What I almost did", rows: 2 },
          { label: "Honest rewrite", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Capstone and optional Honors Lab both assume ethical hosting. Do not file clever pressure as 'psychology skill.'",
      },
    ],
  },

  // —— PR-06 Emotional Pacing Across a LIVE ——
  {
    id: "energy-arc-map",
    title: "Energy Arc Map",
    description:
      "Map open → build → peak → settle → close energy levels across your LIVE so the room does not flatline or burn out.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["emotional-pacing-across-a-live"],
    blocks: [
      {
        type: "intro",
        text: "Assign energy 1–5 across the arc before you go live. Peak without settle feels manic. Settle without peak feels sleepy. Capstone needs a deliberate arc.",
      },
      {
        type: "table",
        title: "Arc plan",
        columns: ["Phase", "Minutes", "Energy 1–5", "What happens"],
        rows: 5,
        hint: "Phases: Open · Build · Peak · Settle · Close. Fill each row.",
      },
      {
        type: "fill_lines",
        title: "Peak placement",
        lines: [
          { label: "Where the peak sits and why", rows: 2 },
          { label: "What would make me peak too early (trap)", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Use Peak / Rest / Recovery Planner if your LIVEs often crash after a high moment.",
      },
    ],
  },
  {
    id: "peak-rest-recovery-planner",
    title: "Peak / Rest / Recovery Planner",
    description:
      "Plan what happens after a high moment: rest beat, recovery line, and how you re-enter without forcing another peak.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["emotional-pacing-across-a-live"],
    blocks: [
      {
        type: "intro",
        text: "Peaks need exits. Fill this so the room can breathe. Creators who only know how to escalate eventually sound desperate.",
      },
      {
        type: "fill_lines",
        title: "Peak definition",
        lines: [
          { label: "What counts as a peak in my show", rows: 2 },
          { label: "Typical peak trigger (story / game / guest / win)", rows: 1 },
        ],
      },
      {
        type: "fill_lines",
        title: "Rest + recovery",
        lines: [
          { label: "Rest beat (30–90 sec) — what I do", rows: 2 },
          { label: "Recovery line (exact words)", rows: 2 },
          { label: "Re-entry to next segment (energy target)", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Anti-patterns to avoid",
        items: [
          "Stacking a second peak immediately",
          "Apologizing for getting excited",
          "Letting the show die into dead air after the peak",
          "Chasing chat to recreate the spike",
        ],
      },
    ],
  },
  {
    id: "pacing-self-scorecard",
    title: "Pacing Self-Scorecard",
    description:
      "Post-LIVE scorecard for open, peak timing, settle quality, and close — plus one pacing fix.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["emotional-pacing-across-a-live"],
    blocks: [
      {
        type: "intro",
        text: "Score after replay. 1 = accidental pacing; 5 = arc felt intentional. One fix only.",
      },
      {
        type: "table",
        title: "Scores (1–5)",
        columns: ["Dimension", "Score", "Note"],
        rows: 4,
        hint: "Dimensions: Open energy · Peak timing · Settle quality · Close settle.",
      },
      {
        type: "fill_lines",
        title: "One pacing fix",
        lines: [
          { label: "What I will change next LIVE", rows: 2 },
          { label: "Where on the arc it lives", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "File this scorecard for Capstone evidence. Optional Honors Lab may review pacing after certification — never as a gate.",
      },
    ],
  },

  // —— PR-07 Humor, Warmth, and Authenticity ——
  {
    id: "personality-lever-card",
    title: "Personality Lever Card",
    description:
      "Name your natural levers — humor, warmth, craft, curiosity — and when to pull each without forcing a persona.",
    category: "content",
    kind: "template",
    status: "ready",
    lessonSlugs: ["humor-warmth-and-authenticity"],
    blocks: [
      {
        type: "intro",
        text: "Authenticity is not 'no craft.' It is choosing levers that sound like you. Pick two primary levers for this month.",
      },
      {
        type: "fill_lines",
        title: "My levers",
        lines: [
          { label: "Primary lever (e.g. dry humor / warmth / teach energy)", rows: 1 },
          { label: "Secondary lever", rows: 1 },
          { label: "Lever I will not force (even if trends reward it)", rows: 2 },
          { label: "Example moment when primary lever sounded like me", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Lever checks before LIVE",
        items: [
          "Opening uses a real lever, not a borrowed persona",
          "I have one warm beat planned (not only jokes or only lectures)",
          "Forced Bit Kill List reviewed — nothing on it sneaks into the plan",
        ],
      },
    ],
  },
  {
    id: "authenticity-practice-sheet",
    title: "Authenticity Practice Sheet",
    description:
      "Practice sheet for saying one true thing, one warm beat, and one humor attempt that still sounds like you.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["humor-warmth-and-authenticity"],
    blocks: [
      {
        type: "intro",
        text: "Write these before LIVE. Deliver them as yourself. If you would be embarrassed to show Brad the bit, it probably belongs on the kill list.",
      },
      {
        type: "fill_lines",
        title: "Three authenticity beats",
        lines: [
          { label: "One true thing I can say without oversharing", rows: 2 },
          { label: "One warm beat (gratitude / recognition / care)", rows: 2 },
          { label: "One humor attempt that fits my lever", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "After LIVE",
        lines: [
          { label: "Which beat felt most like me?", rows: 2 },
          { label: "Which felt forced — and why?", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Capstone personality evidence is consistency of lever — not volume of jokes.",
      },
    ],
  },
  {
    id: "forced-bit-kill-list",
    title: "Forced Bit Kill List",
    description:
      "List bits, catchphrases, and trends you will not force — plus replacements that fit your levers.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["humor-warmth-and-authenticity"],
    blocks: [
      {
        type: "intro",
        text: "Kill lists protect authenticity. Write what you refuse, even if it 'works' for other creators.",
      },
      {
        type: "table",
        title: "Kill list",
        columns: ["Forced bit / trend", "Why it is not me", "Replacement that fits"],
        rows: 6,
      },
      {
        type: "fill_lines",
        title: "Hard rules",
        lines: [
          { label: "I will never do this for gifts or retention", rows: 2 },
          { label: "If chat requests a killed bit, my redirect line is…", rows: 2 },
        ],
      },
    ],
  },

  // —— PR-08 Handling Pressure Moments Live ——
  {
    id: "pressure-recovery-card",
    title: "Pressure Recovery Card",
    description:
      "Glanceable recovery steps for pressure: breathe, name, reset, return — with your composure cues.",
    category: "content",
    kind: "template",
    status: "ready",
    lessonSlugs: ["handling-pressure-moments-live"],
    blocks: [
      {
        type: "intro",
        text: "Pressure is normal. Collapse is optional. Keep this card visible. Capstone recovery plans copy from here.",
      },
      {
        type: "checkbox_list",
        title: "Recovery sequence",
        items: [
          "Breathe once (silent count of four)",
          "Name the moment briefly if needed ('One sec — resetting')",
          "Reset posture / eye line to camera",
          "Deliver one composure line",
          "Return to the planned beat or a clean bridge",
          "Debrief after LIVE — not mid-spiral on stream",
        ],
      },
      {
        type: "fill_lines",
        title: "My composure cues",
        lines: [
          { label: "Physical cue (posture / hands / breath)", rows: 1 },
          { label: "Composure line (exact words)", rows: 2 },
          { label: "Bridge back to show", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "four-scenario-scripts",
    title: "Four Scenario Scripts",
    description:
      "Short scripts for four common pressure moments: tech fail, rude chat, dead room panic, and unexpected spike.",
    category: "content",
    kind: "script",
    status: "ready",
    lessonSlugs: ["handling-pressure-moments-live"],
    blocks: [
      {
        type: "intro",
        text: "Write scripts cold. Deliver them warm. Do not invent ethics under adrenaline.",
      },
      {
        type: "fill_lines",
        title: "Scenario scripts",
        lines: [
          { label: "1) Tech fail / freeze", rows: 2 },
          { label: "2) Rude or hostile chat", rows: 2 },
          { label: "3) Dead room panic urge", rows: 2 },
          { label: "4) Unexpected spike (gift / guest / viral moment)", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Script standards",
        items: [
          "Under two sentences when possible",
          "No self-shaming",
          "No fighting chat on stream",
          "Ends with a return to the show",
        ],
      },
      {
        type: "callout",
        text: "Honors Lab may role-play pressure scenarios after certification. Your Capstone only needs a recovery plan on paper plus evidence you used composure once.",
      },
    ],
  },
  {
    id: "composure-reset-checklist",
    title: "Composure Reset Checklist",
    description:
      "Post-pressure checklist: what happened, what you did, what you will pre-decide next time.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["handling-pressure-moments-live"],
    blocks: [
      {
        type: "intro",
        text: "Fill within 15 minutes of ending if a pressure moment hit. Memory lies; notes do not.",
      },
      {
        type: "checkbox_list",
        title: "Immediate reset (after LIVE)",
        items: [
          "Wrote what happened in one sentence",
          "Noted what I said / did (exact if possible)",
          "Marked whether recovery sequence was used",
          "Chose one pre-decision for next time",
          "Updated Four Scenario Scripts if a line failed",
        ],
      },
      {
        type: "fill_lines",
        title: "Debrief",
        lines: [
          { label: "What happened", rows: 2 },
          { label: "What I did", rows: 2 },
          { label: "Pre-decision for next time", rows: 2 },
        ],
      },
    ],
  },

  // —— PR-09 Interview Energy (Solo and Guests) ——
  {
    id: "interview-segment-plan",
    title: "Interview Segment Plan",
    description:
      "Plan a solo interview-style segment or guest beat: promise, questions, listening cues, and close.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["interview-energy-solo-and-guests"],
    blocks: [
      {
        type: "intro",
        text: "Interview energy is curiosity plus structure. Solo counts — interview yourself or 'interview' a topic. Guests need the same spine.",
      },
      {
        type: "fill_lines",
        title: "Segment setup",
        lines: [
          { label: "Solo topic interview OR guest name + role", rows: 1 },
          { label: "Promise of this interview segment", rows: 2 },
          { label: "Length", rows: 1 },
        ],
      },
      {
        type: "timed_segments",
        title: "Interview spine",
        segments: [
          { label: "Open + frame", minutes: "1", prompt: "Why this conversation matters now" },
          { label: "Q1 deep", minutes: "2–3", prompt: "First strong question + follow-up" },
          { label: "Q2 deep", minutes: "2–3", prompt: "Second question + listen hard" },
          { label: "Close gift", minutes: "1", prompt: "One takeaway + thank / bridge" },
        ],
      },
      {
        type: "fill_lines",
        title: "Listening cues I will use",
        lines: [
          { label: "How I show I heard them (or myself)", rows: 2 },
          { label: "Follow-up stem I will use once", rows: 1 },
        ],
      },
    ],
  },
  {
    id: "question-bank-worksheet",
    title: "Question Bank Worksheet",
    description:
      "Build a bank of open questions and follow-ups that create energy without interrogation vibes.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["interview-energy-solo-and-guests"],
    blocks: [
      {
        type: "intro",
        text: "Closed questions kill energy. Write open questions. Pre-write one follow-up stem so you are not inventing curiosity under pressure.",
      },
      {
        type: "table",
        title: "Question bank",
        columns: ["Open question", "Why it matters", "Follow-up stem"],
        rows: 8,
      },
      {
        type: "fill_lines",
        title: "Tonight's three",
        lines: [
          { label: "Q1", rows: 1 },
          { label: "Q2", rows: 1 },
          { label: "Q3 (backup)", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "For Capstone, one interview-energy beat can be solo. Guests are optional — listening quality is not.",
      },
    ],
  },
  {
    id: "listening-followup-card",
    title: "Listening Follow-Up Card",
    description:
      "Glanceable card for real listening: reflect, dig once, bridge — without hijacking the answer.",
    category: "content",
    kind: "template",
    status: "ready",
    lessonSlugs: ["interview-energy-solo-and-guests"],
    blocks: [
      {
        type: "intro",
        text: "Keep this visible during guest or solo interview beats. The skill is follow-up, not more questions.",
      },
      {
        type: "checkbox_list",
        title: "Listening loop",
        items: [
          "Let them finish (or finish your own answer if solo)",
          "Reflect one phrase you heard",
          "Ask one follow-up — then stop stacking",
          "Bridge to next question or close",
        ],
      },
      {
        type: "fill_lines",
        title: "My stems",
        lines: [
          { label: "Reflect stem ('So you are saying…')", rows: 1 },
          { label: "Dig stem ('What happened right after…')", rows: 1 },
          { label: "Bridge stem ('That connects to…')", rows: 1 },
          { label: "Hijack warning — what I do when I want to monologue", rows: 2 },
        ],
      },
    ],
  },

  // —— PR-10 Presence Capstone: Signature 20-Minute LIVE ——
  {
    id: "signature-live-run-of-show",
    title: "Signature LIVE Run of Show",
    description:
      "Minute-by-minute run of show for the Presence Capstone 20-minute signature LIVE — open, beats, peak, settle, close.",
    category: "content",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["presence-capstone-signature-20-minute-live"],
    blocks: [
      {
        type: "intro",
        text: "This is Capstone page one. Plan twenty intentional minutes. Viewer count is not the grade — behavior and documentation are.",
      },
      {
        type: "fill_lines",
        title: "Signature LIVE contract",
        lines: [
          { label: "Date / time (real OS calendar slot)", rows: 1 },
          { label: "One-sentence show promise", rows: 2 },
          { label: "Primary presence skills on display", rows: 2 },
        ],
      },
      {
        type: "timed_segments",
        title: "20-minute run of show",
        segments: [
          { label: "Open / own the frame", minutes: "0–2", prompt: "Signature open + frame ownership" },
          { label: "Build / value", minutes: "2–7", prompt: "Teach or segment with quiet-chat protocol ready" },
          { label: "Peak story / interview beat", minutes: "7–12", prompt: "Story with payoff OR interview energy" },
          { label: "Settle / integrate chat", minutes: "12–17", prompt: "Energy settle + chat invite without spiral" },
          { label: "Close", minutes: "17–20", prompt: "Settle close + next LIVE cue" },
        ],
      },
      {
        type: "fill_lines",
        title: "Recovery plan (required)",
        lines: [
          { label: "If quiet the whole block, I will…", rows: 2 },
          { label: "If pressure hits, composure line is…", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Honors Lab is optional after the Presence Mastery Certificate. Do not wait for lab approval to run Capstone or file the evidence package.",
      },
    ],
  },
  {
    id: "presence-evidence-package-checklist",
    title: "Presence Evidence Package Checklist",
    description:
      "All required Capstone artifacts: run of show, opening/closing, vocal/pacing, story, chat, recovery, replay, before/after, filed dossier.",
    category: "content",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["presence-capstone-signature-20-minute-live"],
    blocks: [
      {
        type: "intro",
        text: "If it is not in the packet, Capstone is incomplete — even if the LIVE felt great. Check every item before you call Presence Mastery done.",
      },
      {
        type: "checkbox_list",
        title: "Required evidence (10)",
        items: [
          "Run of show for the signature 20",
          "Signature opening (written + delivered)",
          "Vocal / pacing plan",
          "Story or teach beat with payoff",
          "Chat-integration / quiet-chat plan",
          "Recovery / composure plan",
          "Signature closing",
          "Replay self-review completed",
          "Before / after presence comparison",
          "Full dossier filed in one place",
        ],
      },
      {
        type: "fill_lines",
        title: "Filing note",
        lines: [
          { label: "Where the package lives (folder / doc link)", rows: 1 },
          { label: "Date filed", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "Optional Honors Lab review can polish this packet after certification. Labs never gate the Presence Mastery Certificate.",
      },
    ],
  },
  {
    id: "presence-replay-review-rubric",
    title: "Presence Replay Review Rubric",
    description:
      "Capstone replay rubric: frame, voice, quiet-chat confidence, story payoff, pacing, authenticity, recovery, close — scored with evidence.",
    category: "content",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["presence-capstone-signature-20-minute-live"],
    blocks: [
      {
        type: "intro",
        text: "Score your Capstone replay honestly. 1 = accidental; 5 = intentional and reviewable. Attach timestamps. This page is Capstone evidence.",
      },
      {
        type: "table",
        title: "Rubric (1–5 + evidence)",
        columns: ["Skill", "Score", "Timestamp / evidence"],
        rows: 8,
        hint: "Skills: Frame · Voice · Quiet-chat · Story payoff · Pacing · Authenticity · Recovery · Close.",
      },
      {
        type: "fill_lines",
        title: "Before / after",
        lines: [
          { label: "Before (early Presence week note)", rows: 3 },
          { label: "After (Capstone contrast)", rows: 3 },
          { label: "Keep / Fix going into Content Creation Mastery", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Capstone honesty checks",
        items: [
          "I did not grade vibes as a 5",
          "Quiet Capstone still documented protocol use",
          "I am not waiting on Honors Lab to finish",
          "Packet is filed and complete",
        ],
      },
      {
        type: "callout",
        text: "After Capstone + Program Final path requirements, claim Presence Mastery. Recommended next craft path: Content Creation Mastery — keep presence habits alive.",
      },
    ],
  },
];
