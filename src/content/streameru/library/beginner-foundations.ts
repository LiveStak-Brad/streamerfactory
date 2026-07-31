/**
 * Gold-standard printable packs for Beginner Foundations (lessons 1–5).
 * Every future lesson pack should match this depth and return-loop quality.
 */

import type { LibraryResource } from "@/lib/streameru-library/types";

export const BEGINNER_FOUNDATIONS_RESOURCES: LibraryResource[] = [
  // —— Lesson 1: Understanding TikTok LIVE + Setup ——
  {
    id: "first-stream-checklist",
    title: "First Stream Checklist",
    description:
      "Pre-live setup, gear, and go-live steps so your first TikTok LIVE starts clean — not chaotic.",
    category: "beginner",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["start-strong-on-tiktok-live"],
    blocks: [
      {
        type: "intro",
        text: "Use this checklist before every early LIVE. Check each box, then go live with confidence. Bring the filled sheet back when you complete Lesson 1’s mission.",
      },
      {
        type: "checkbox_list",
        title: "Profile & account",
        items: [
          "Profile photo is clear (face visible, good lighting)",
          "Display name is searchable and consistent",
          "Bio has one-sentence niche + what viewers get on LIVE",
          "Username confirmed and written on this sheet",
          "Pinned video or latest post teases today’s LIVE topic",
        ],
      },
      {
        type: "checkbox_list",
        title: "Tech & space",
        items: [
          "Phone charged or plugged in",
          "Stable Wi‑Fi or strong mobile data tested",
          "Camera at eye level (not looking up your nose)",
          "Lighting in front of you (window or lamp — not behind)",
          "Mic / earbuds tested; background noise reduced",
          "Notifications silenced; Do Not Disturb on",
        ],
      },
      {
        type: "checkbox_list",
        title: "Content ready",
        items: [
          "LIVE title written (topic + energy, not “test”)",
          "5 talking-point bullets written where you can see them",
          "Opening line rehearsed (first 15 seconds)",
          "Closing CTA planned (follow, return tomorrow, or next topic)",
        ],
      },
      {
        type: "checkbox_list",
        title: "Pre-live promotion (required)",
        items: [
          "Short video posted announcing LIVE time + topic",
          "Relevant hashtags on the post and LIVE title/description",
          "Announcement shared to your story",
        ],
      },
      {
        type: "fill_lines",
        title: "Today’s plan",
        lines: [
          { label: "TikTok username" },
          { label: "Niche in one sentence" },
          { label: "LIVE title" },
          { label: "Target minutes (min 25 for Lesson 1)" },
        ],
      },
      {
        type: "callout",
        text: "After your LIVE: return to StreamerU → mark Lesson 1’s mission complete → open Lesson 2.",
      },
    ],
  },
  {
    id: "profile-optimization-worksheet",
    title: "Profile Optimization Worksheet",
    description:
      "Turn your TikTok profile into a clear invite for LIVE viewers — photo, bio, niche, and proof.",
    category: "beginner",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["start-strong-on-tiktok-live"],
    blocks: [
      {
        type: "intro",
        text: "Fill this before or after your first setup LIVE. A clear profile makes every stream easier to return to.",
      },
      {
        type: "fill_lines",
        title: "Who you are on LIVE",
        lines: [
          { label: "Niche / topic (be specific)", rows: 2 },
          { label: "Ideal viewer (who should stay?)", rows: 2 },
          { label: "Promise — what they get if they follow", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Bio drafts (pick one)",
        lines: [
          { label: "Draft A (short + punchy)", rows: 2 },
          { label: "Draft B (friendly + clear)", rows: 2 },
          { label: "Final bio you’ll publish", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Visual checklist",
        items: [
          "Photo: face lit, recognizable at small size",
          "No cluttered collage that reads as spam",
          "Name matches how you introduce yourself on LIVE",
          "Link / CTA (if any) matches your current offer",
        ],
      },
      {
        type: "fill_lines",
        title: "Content signals",
        lines: [
          { label: "Pinned video idea (hook + payoff)", rows: 2 },
          { label: "3 hashtags you’ll reuse", rows: 1 },
          { label: "How you’ll say your niche in the first 10 seconds", rows: 2 },
        ],
      },
      {
        type: "notes",
        title: "Notes after you update the profile",
        lines: 5,
      },
    ],
  },

  // —— Lesson 2: Your first live structure ——
  {
    id: "thirty-minute-stream-outline",
    title: "30-Minute Stream Outline",
    description:
      "A timed run-of-show for a focused 30-minute LIVE — intro, segments, and a strong close.",
    category: "beginner",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["your-first-live-structure", "first-10-tiktok-live-sessions"],
    blocks: [
      {
        type: "intro",
        text: "Print this and keep it next to your camera. Hit each segment on time — structure beats winging it.",
      },
      {
        type: "fill_lines",
        title: "Session header",
        lines: [
          { label: "Date" },
          { label: "Topic / title" },
          { label: "Opening hook (first 15 seconds)", rows: 2 },
        ],
      },
      {
        type: "timed_segments",
        title: "Run of show",
        segments: [
          {
            label: "Open + welcome",
            minutes: "0–3",
            prompt: "Who you are, today’s topic, why they should stay",
          },
          {
            label: "Segment 1",
            minutes: "3–12",
            prompt: "Main value block — teach, demo, or story with a clear point",
          },
          {
            label: "Segment 2",
            minutes: "12–21",
            prompt: "Second angle / example / Q&A prompt for chat",
          },
          {
            label: "Segment 3",
            minutes: "21–27",
            prompt: "Payoff — tip, recap, or mini challenge",
          },
          {
            label: "Close",
            minutes: "27–30",
            prompt: "Thank viewers, CTA (follow / return), tease next LIVE",
          },
        ],
      },
      {
        type: "fill_lines",
        title: "Segment notes (fill before you go live)",
        lines: [
          { label: "Segment 1 talking points", rows: 2 },
          { label: "Segment 2 talking points", rows: 2 },
          { label: "Segment 3 talking points", rows: 2 },
          { label: "Closing CTA exact words", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Empty room? Narrate the outline out loud. The sheet is your co-host until chat arrives.",
      },
    ],
  },
  {
    id: "first-live-structure-sheet",
    title: "First Live Structure Sheet",
    description:
      "Design three 8–10 minute segments with hooks so your LIVE feels intentional, not improvised.",
    category: "beginner",
    kind: "worksheet",
    status: "ready",
    lessonSlugs: ["your-first-live-structure"],
    blocks: [
      {
        type: "intro",
        text: "Lesson 2 mission: one LIVE that follows intro → segments → close. Plan it here first.",
      },
      {
        type: "fill_lines",
        title: "Big picture",
        lines: [
          { label: "Session theme (one line)" },
          { label: "Viewer takeaway (what they leave with)", rows: 2 },
        ],
      },
      {
        type: "fill_lines",
        title: "Segment A (8–10 min)",
        lines: [
          { label: "Hook / opener for this segment", rows: 2 },
          { label: "Core content", rows: 3 },
          { label: "Transition line into Segment B" },
        ],
      },
      {
        type: "fill_lines",
        title: "Segment B (8–10 min)",
        lines: [
          { label: "Hook / opener for this segment", rows: 2 },
          { label: "Core content", rows: 3 },
          { label: "Transition line into Segment C" },
        ],
      },
      {
        type: "fill_lines",
        title: "Segment C (8–10 min)",
        lines: [
          { label: "Hook / opener for this segment", rows: 2 },
          { label: "Core content", rows: 3 },
          { label: "Close + CTA", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Structure quality check",
        items: [
          "Each segment has a different purpose (not the same rant three times)",
          "You know what to say if chat is silent",
          "You can name the next segment without looking at the phone for more than a glance",
          "Close has a clear ask (follow, return, or specific next topic)",
        ],
      },
    ],
  },

  // —— Lesson 3: First 30-minute live session ——
  {
    id: "session-run-sheet",
    title: "Session Run Sheet",
    description:
      "Day-of execution sheet for your first full 30-minute LIVE — promotion, timing, and energy checks.",
    category: "beginner",
    kind: "template",
    status: "ready",
    lessonSlugs: ["first-10-tiktok-live-sessions"],
    blocks: [
      {
        type: "intro",
        text: "Block the time. Fill this the morning of your LIVE. Minimum target: 30 continuous minutes.",
      },
      {
        type: "fill_lines",
        title: "Session identity",
        lines: [
          { label: "Date & start time" },
          { label: "Title" },
          { label: "Hashtags" },
          { label: "Announcement video posted? (time)", rows: 1 },
          { label: "Story shared? (yes / time)", rows: 1 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Go-live gate",
        items: [
          "Calendar block protected (no overlapping meetings)",
          "Water / hydration within reach",
          "Outline visible (30-Minute Stream Outline or notes)",
          "Phone orientation locked / stand stable",
          "Ready to talk from second zero — no silent staring",
        ],
      },
      {
        type: "table",
        title: "Energy checkpoints (mark during stream)",
        columns: ["Time", "What I’m doing", "Energy 1–5", "Chat moment?"],
        rows: 6,
        hint: "Check at ~5, 10, 15, 20, 25, and 30 minutes.",
      },
      {
        type: "fill_lines",
        title: "If energy dips",
        lines: [
          { label: "Backup topic / story ready", rows: 2 },
          { label: "Question I’ll ask chat", rows: 1 },
        ],
      },
      {
        type: "callout",
        text: "Mission complete only after 30+ minutes live with continuous talk. Then journal on the Creator Journal sheet.",
      },
    ],
  },
  {
    id: "creator-journal-post-stream",
    title: "Creator Journal (Post-Stream)",
    description:
      "Short reflection after each LIVE so you improve session-to-session — not just “streamed and forgot.”",
    category: "beginner",
    kind: "journal",
    status: "ready",
    lessonSlugs: ["first-10-tiktok-live-sessions", "common-live-mistakes-new-creators"],
    blocks: [
      {
        type: "intro",
        text: "Fill this within 15 minutes of ending your LIVE while memory is fresh. Return to StreamerU with one clear next experiment.",
      },
      {
        type: "fill_lines",
        title: "Session facts",
        lines: [
          { label: "Date" },
          { label: "Duration (minutes)" },
          { label: "Peak / approx viewers (honest guess OK)" },
          { label: "Lesson / mission this supports" },
        ],
      },
      {
        type: "fill_lines",
        title: "Reflection",
        lines: [
          { label: "What felt strong?", rows: 3 },
          { label: "Where did energy or talk stall?", rows: 3 },
          { label: "One viewer interaction worth repeating", rows: 2 },
          { label: "One change for next LIVE (only one)", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Habit check",
        items: [
          "I stayed live for the mission minimum",
          "I avoided ending early because of low viewers",
          "I have tomorrow’s (or next) LIVE time roughly planned",
        ],
      },
      {
        type: "notes",
        title: "Free notes",
        lines: 5,
      },
    ],
  },

  // —— Lesson 4: First week of lives ——
  {
    id: "first-week-planner",
    title: "First Week Planner",
    description:
      "Map seven days of LIVE sessions — topic, time, and promotion — so consistency is on paper before it’s on camera.",
    category: "beginner",
    kind: "planner",
    status: "ready",
    lessonSlugs: ["first-week-of-lives-consistency"],
    blocks: [
      {
        type: "intro",
        text: "Lesson 4 mission: at least one qualifying LIVE per day for 7 days (30+ minutes each). Plan the week once; execute daily.",
      },
      {
        type: "fill_lines",
        title: "Week identity",
        lines: [
          { label: "Week starting (date)" },
          { label: "Default LIVE time (same time daily if possible)" },
          { label: "Backup time if life happens" },
        ],
      },
      {
        type: "table",
        title: "7-day plan",
        columns: ["Day", "Time", "Topic / title", "Promo done?", "Done?"],
        rows: 7,
        hint: "Write Day 1–7 (or Mon–Sun). Check Done? after each LIVE.",
      },
      {
        type: "checkbox_list",
        title: "Consistency rules (agree before Day 1)",
        items: [
          "I will not skip a day because “nobody is watching”",
          "Minimum 30 minutes counts — longer is bonus",
          "If I miss a slot, I reschedule same day before midnight",
          "I will log each session on the Weekly Consistency Calendar",
        ],
      },
      {
        type: "fill_lines",
        title: "Theme ideas bank (optional)",
        lines: [
          { label: "Topic ideas if you blank mid-week", rows: 4 },
        ],
      },
      {
        type: "callout",
        text: "Consistency beats occasional long marathons. Return to StreamerU after Day 7 to mark the mission complete.",
      },
    ],
  },
  {
    id: "weekly-consistency-calendar",
    title: "Weekly Consistency Calendar",
    description:
      "A printable week grid to track LIVE days, minutes, and streaks — proof you’re building the habit.",
    category: "beginner",
    kind: "tracker",
    status: "ready",
    lessonSlugs: ["first-week-of-lives-consistency"],
    blocks: [
      {
        type: "intro",
        text: "Hang this near your desk or keep it in a notebook. One glance should show whether you showed up.",
      },
      {
        type: "fill_lines",
        title: "Week of",
        lines: [{ label: "Dates (e.g. Mar 3–9)" }],
      },
      {
        type: "table",
        title: "Daily log",
        columns: ["Day", "Went live?", "Minutes", "Title (short)", "Mood 1–5"],
        rows: 7,
      },
      {
        type: "fill_lines",
        title: "Week score",
        lines: [
          { label: "Days completed ( /7 )" },
          { label: "Total minutes this week" },
          { label: "Longest continuous LIVE" },
          { label: "What made showing up easier?", rows: 2 },
          { label: "What blocked you — and the fix?", rows: 2 },
        ],
      },
      {
        type: "checkbox_list",
        title: "Streak protection",
        items: [
          "Phone reminder set for default LIVE time",
          "One accountability person told about this week",
          "Next week’s First Week Planner started (even lightly)",
        ],
      },
    ],
  },

  // —— Lesson 5: Avoiding beginner mistakes ——
  {
    id: "mistake-prevention-checklist",
    title: "Mistake Prevention Checklist",
    description:
      "Common beginner traps — silent staring, ending early, weak titles — checked off before you go live.",
    category: "beginner",
    kind: "checklist",
    status: "ready",
    lessonSlugs: ["common-live-mistakes-new-creators"],
    blocks: [
      {
        type: "intro",
        text: "Pick one pitfall to actively avoid today (Lesson 5 mission). Check the rest as a pre-flight so you don’t drift into bad habits.",
      },
      {
        type: "fill_lines",
        title: "Today’s focus mistake",
        lines: [
          {
            label: "The one pitfall I’m avoiding (name it)",
            rows: 2,
          },
          {
            label: "How I’ll avoid it (specific behavior)",
            rows: 2,
          },
        ],
      },
      {
        type: "checkbox_list",
        title: "Don’t do these",
        items: [
          "Going live with title “test” / “bored” / no topic",
          "Staring silently for long stretches when chat is empty",
          "Ending early because CCV is low",
          "Reading chat only — never talking to the room",
          "Apologizing repeatedly for “low viewers”",
          "Skipping promotion because “it’s just practice”",
          "Sitting in dark / bad audio “just this once”",
          "No close — just hanging up mid-thought",
        ],
      },
      {
        type: "checkbox_list",
        title: "Do these instead",
        items: [
          "Clear topic in title + first sentence",
          "Narrate plan, teach, or story when chat is quiet",
          "Honor the minimum minutes even if the room is small",
          "Ask simple questions out loud (viewers can answer later)",
          "Thank anyone who shows up without guilt-tripping others",
          "Run pre-live video + hashtags + story",
          "Close with CTA and tomorrow’s tease",
        ],
      },
      {
        type: "fill_lines",
        title: "After LIVE proof",
        lines: [
          { label: "Evidence I avoided today’s focus mistake", rows: 3 },
          { label: "Moment I almost slipped — and recovered", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "pre-live-reset-card",
    title: "Pre-Live Reset Card",
    description:
      "A 60-second mental and physical reset before you hit Go Live — so nerves don’t run the session.",
    category: "beginner",
    kind: "template",
    status: "ready",
    lessonSlugs: ["common-live-mistakes-new-creators", "start-strong-on-tiktok-live"],
    blocks: [
      {
        type: "intro",
        text: "Keep this card next to your setup. Run it every time — especially when you feel like skipping.",
      },
      {
        type: "checkbox_list",
        title: "60-second reset",
        items: [
          "Stand or sit tall; shoulders down",
          "One slow breath in / out (repeat ×3)",
          "Smile once on purpose (even alone)",
          "Say your opening line out loud once",
          "Glance at Segment 1 only — not the whole day",
          "Remember: low viewers ≠ failed LIVE",
        ],
      },
      {
        type: "fill_lines",
        title: "Intention (one line)",
        lines: [
          { label: "Today I’m practicing…", rows: 2 },
          { label: "I will not quit early because…", rows: 2 },
        ],
      },
      {
        type: "callout",
        text: "Hit Go Live within 30 seconds of finishing this card. Momentum > perfect mood.",
      },
      {
        type: "notes",
        title: "Post-stream: one word for how the reset felt",
        lines: 2,
      },
    ],
  },
];
