/**
 * Execution (missions) keyed by lesson `slug` — must match `CURRICULUM` in `curriculum.ts`.
 * Every mission requires a real TikTok LIVE with minimum duration + pre-live ritual + behavior.
 */

import {
  BEHAVIOR_STANDARD,
  PRE_LIVE_STANDARD,
  habitDailyByStage,
  liveSessionStep,
} from "@/lib/resources/mission-shared";

export type TrainingMissionLink = {
  label: string;
  href: string;
};

export type TrainingMission = {
  id: string;
  mission_title: string;
  mission_description: string;
  mission_steps: string[];
  mission_goal: string;
  links?: TrainingMissionLink[];
};

function steps(
  introLines: string[],
  minMinutes: number,
  extraAfterLive: string[] = [],
  habitLine?: string,
): string[] {
  const habit = habitLine ? [habitLine] : [];
  return [
    ...introLines,
    ...PRE_LIVE_STANDARD,
    liveSessionStep(minMinutes),
    ...BEHAVIOR_STANDARD,
    ...extraAfterLive,
    ...habit,
  ];
}

export const TRAINING_MISSIONS_BY_SLUG: Record<string, TrainingMission> = {
  // —— Beginner Foundations ——
  "start-strong-on-tiktok-live": {
    id: "mission-01-understanding-live",
    mission_title: "Session: Setup + first structured LIVE",
    mission_description:
      "Study first, pass the quiz, then execute. This mission proves you can start prepared — success is behavior (plan, promise, duration), not viewer count.",
    mission_steps: steps(
      [
        "Confirm TikTok username, profile photo, and one-sentence niche (“I go LIVE to ___”).",
        "Write your first-minute promise and 5 talking-point bullets you can see while live.",
        "Complete the First Stream Checklist before you press Go LIVE.",
      ],
      25,
      [
        "End intentionally (locate the end control before you start) and write one debrief line: hardest moment + what you will reuse.",
      ],
      habitDailyByStage("early"),
    ),
    mission_goal:
      "Finish a real 25+ minute LIVE with a clear topic, spoken first-minute promise, visible plan, and no silent-staring stretches longer than a few seconds — regardless of viewer count.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "First Stream Checklist", href: "/streameru/library/first-stream-checklist" },
    ],
  },

  "your-first-live-structure": {
    id: "mission-02-first-structure",
    mission_title: "Session: Run your LIVE framework",
    mission_description:
      "Do this now: fill a LIVE Run Sheet, prepare transitions and emergency prompts, then host one real LIVE that follows open → three segments → close. Views do not matter.",
    mission_steps: steps(
      [
        "Fill your LIVE Run Sheet: open promise, three distinct middle segments with hooks, transition bridges, and a close (recap + thanks + next tease).",
        "Write 5–10 emergency conversation prompts for dead chat or finishing a segment early.",
        "Place the run sheet where you can glance without hiding from the camera.",
      ],
      25,
      [
        "After the LIVE: write one reflection line — what broke, what you will reuse next time.",
      ],
      habitDailyByStage("early"),
    ),
    mission_goal:
      "Finish a real 25+ minute LIVE that follows your written framework — open, three segments with transitions, and a deliberate close — regardless of viewer count.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "First Live Structure Sheet", href: "/streameru/library/first-live-structure-sheet" },
      { label: "30-Minute Stream Outline", href: "/streameru/library/thirty-minute-stream-outline" },
      { label: "Transition Cheat Sheet", href: "/streameru/library/transition-cheat-sheet" },
      { label: "Emergency Conversation List", href: "/streameru/library/emergency-conversation-list" },
      { label: "Closing Checklist", href: "/streameru/library/closing-checklist" },
    ],
  },

  "first-10-tiktok-live-sessions": {
    id: "mission-03-first-30",
    mission_title: "Session: First 30-minute minimum LIVE",
    mission_description:
      "This lesson’s execution block is a full 30-minute session with pre-live promotion. Block the time first.",
    mission_steps: steps([], 30, [], habitDailyByStage("early")),
    mission_goal:
      "Complete your first structured 30+ minute LIVE with announcement, hashtags, story, and continuous talk.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "first-week-of-lives-consistency": {
    id: "mission-04-week-consistency",
    mission_title: "Session: Seven-day consistency sample",
    mission_description:
      "Execute a one-week mini commitment: at least one qualifying LIVE per day for 7 days (minimum 30 minutes each).",
    mission_steps: [
      ...PRE_LIVE_STANDARD,
      liveSessionStep(30),
      ...BEHAVIOR_STANDARD,
      "Repeat on separate days until you have 7 sessions logged (calendar yourself — honor system).",
      habitDailyByStage("mid"),
    ],
    mission_goal:
      "Build proof you can stream on a schedule — consistency beats occasional long marathons.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "common-live-mistakes-new-creators": {
    id: "mission-05-avoid-mistakes",
    mission_title: "Session: Mistake-proofing LIVE",
    mission_description:
      "Go live with one mistake from this lesson actively avoided (state which one before you start).",
    mission_steps: steps(
      ["Pick one pitfall from the lesson and name how you’ll avoid it on stream."],
      30,
      [],
      habitDailyByStage("mid"),
    ),
    mission_goal:
      "Run a 30+ minute LIVE demonstrating deliberate recovery from quiet chat or low energy without ending early.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  // —— Live Streaming Mastery (content track) ——
  "talking-with-empty-room": {
    id: "mission-06-empty-room",
    mission_title: "Session: Narrate through silence",
    mission_description:
      "Your mission is a retention-focused LIVE: keep talking even when viewership is low.",
    mission_steps: steps([], 45, [], habitDailyByStage("mid")),
    mission_goal:
      "Hold 45+ minutes with fewer than 30 cumulative dead-air seconds — narrate, plan aloud, teach.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "hooks-and-first-impressions": {
    id: "mission-07-hooks",
    mission_title: "Session: Hook rotation LIVE",
    mission_description:
      "Test three different openers / hooks across one session; reset the room’s attention on purpose.",
    mission_steps: steps(
      ["List three hooks you will use at 0:00, ~15:00, and ~30:00."],
      45,
      [],
      habitDailyByStage("mid"),
    ),
    mission_goal:
      "Complete a 45+ minute LIVE where first impressions and mid-stream hooks are clearly different.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "content-loops-repeatable-segments": {
    id: "mission-08-retention",
    mission_title: "Session: Retention practice LIVE",
    mission_description:
      "Run one longer session focused on holding attention — peak CCV is not the scoreboard.",
    mission_steps: steps([], 60, [], habitDailyByStage("mid")),
    mission_goal:
      "Deliver 60+ minutes with segment transitions every few minutes so viewers always know what’s next.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "structuring-longer-lives": {
    id: "mission-09-longer-lives",
    mission_title: "Session: 90-minute endurance block",
    mission_description:
      "Progression step: one extended LIVE block. Hydrate and plan breaks as talking breaks, not dead air.",
    mission_steps: steps(
      [
        "Write a four-block run-of-show (opener, deep, recovery, closer) with rough time ranges.",
        "Prepare three stretch goals for the whole session, ready if your energy holds up.",
      ],
      90,
      [
        "Place any hydration or physical break inside the recovery block, narrated out loud the entire time.",
        "If a block ends early, deploy a prepared stretch goal instead of improvised filler.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete a 90+ minute LIVE with visible four-block structure and an honest energy arc from start to finish.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Four-Block Run-of-Show", href: "/streameru/library/ninety-minute-run-of-show" },
      { label: "Stretch Goal & Energy Arc Tracker", href: "/streameru/library/stretch-goal-energy-arc-tracker" },
    ],
  },

  "growth-weekly-system": {
    id: "mission-10-repeat-viewers",
    mission_title: "Session: Repeat-viewer invitation LIVE",
    mission_description:
      "Explicitly train repeat attendance: reference last stream, tease next, reward returners.",
    mission_steps: steps(
      [
        "Write your specific opening callback to your last session before you go live.",
        "Write your specific closing tease for next session, including a rough day/time.",
      ],
      60,
      [
        "During the session, actively recognize any returning viewer with direct, warm acknowledgment.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Run 60+ minutes designed so a return viewer would recognize continuity from your last session.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Repeat Viewer System Sheet", href: "/streameru/library/repeat-viewer-system-sheet" },
      { label: "Returning Viewer Recognition Log", href: "/streameru/library/returning-viewer-recognition-log" },
    ],
  },

  // —— Battles ——
  "understanding-battles": {
    id: "mission-11-understanding-battles",
    mission_title: "Session: Observe + debrief",
    mission_description:
      "Watch a battle (live or replay) and run your own 45-minute LIVE applying one lesson from observation. This is a study mission — you are not booking or running a real battle yet.",
    mission_steps: [
      "Watch at least 20 minutes of a battle or recap (any creator) and note one specific tactic.",
      ...PRE_LIVE_STANDARD,
      liveSessionStep(45),
      "Apply the tactic you observed out loud during the session, referencing what you saw.",
      ...BEHAVIOR_STANDARD,
    ],
    mission_goal:
      "Connect theory to practice: 45+ minute LIVE referencing what you saw in a real battle or recap.",
    links: [
      { label: "Battle Hub", href: "/battle-hub" },
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Battle Observation Debrief", href: "/streameru/library/battle-observation-debrief" },
      { label: "Battle Vocabulary & Sportsmanship Guide", href: "/streameru/library/battle-vocabulary-sportsmanship-guide" },
    ],
  },

  "preparing-for-your-first-battle": {
    id: "mission-12-prep-battle",
    mission_title: "Session: Promotion dry-run LIVE",
    mission_description:
      "Rehearse promotion discipline: your mission includes a full pre-live funnel before a non-battle practice LIVE. No partner or real battle is booked yet — that's next lesson.",
    mission_steps: steps(
      ["Complete your Battle Day Prep Checklist (account, tech, format, backup connection) as if tonight were a real battle."],
      45,
      [],
      habitDailyByStage("mid"),
    ),
    mission_goal:
      "45+ minute LIVE where promotion steps (video, hashtags, story) are executed cleanly, without repeating the same message within an hour.",
    links: [
      { label: "Battle Hub", href: "/battle-hub" },
      { label: "Promotion lesson", href: "/streameru/promote-your-battles-without-spamming" },
      { label: "Battle Day Prep Checklist", href: "/streameru/library/battle-day-checklist" },
      { label: "Partner Agreement & Promotion Funnel Template", href: "/streameru/library/partner-agreement-promotion-funnel" },
    ],
  },

  "structure-your-first-battle-week": {
    id: "mission-13-first-battle",
    mission_title: "Session: Run your first network battle",
    mission_description:
      "Coordinate a real battle using Battle Hub — then complete the LIVE battle block.",
    mission_steps: [
      "Schedule the battle in Battle Hub with time + format visible to partners.",
      "Invite at least one partner and confirm.",
      ...PRE_LIVE_STANDARD,
      liveSessionStep(60),
      "During battle: engage viewers, call energy, and finish the session — no ghosting mid-match.",
      ...BEHAVIOR_STANDARD,
    ],
    mission_goal:
      "Ship one full battle cycle: schedule → partners → promoted LIVE → completed battle.",
    links: [
      { label: "Open Battle Hub", href: "/battle-hub" },
      { label: "Battle promotion tips", href: "/streameru/promote-your-battles-without-spamming" },
    ],
  },

  "improving-battle-performance": {
    id: "mission-14-battle-performance",
    mission_title: "Session: Battle debrief LIVE",
    mission_description:
      "After a battle, run a 60-minute LIVE that includes structured debrief + one improvement for next time.",
    mission_steps: steps(
      ["Open with a 5-minute debrief of your last battle (what worked / one fix)."],
      60,
      [],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "60+ minute LIVE proving you iterate on battle performance, not repeat the same mistakes.",
    links: [{ label: "Battle Hub", href: "/battle-hub" }],
  },

  "building-battle-partners": {
    id: "mission-15-partners",
    mission_title: "Session: Collab-forward LIVE",
    mission_description:
      "Your mission includes shout-outs, partner promo, and a clear ask for next collab — still a full LIVE.",
    mission_steps: steps([], 60, [], habitDailyByStage("late")),
    mission_goal:
      "60+ minute LIVE that explicitly builds a pipeline for future battles or duets.",
    links: [{ label: "Battle Hub", href: "/battle-hub" }, { label: "Battle Finder", href: "/battle-hub/finder" }],
  },

  // —— Monetization ——
  "gifts-goals-momentum": {
    id: "mission-16-gifting",
    mission_title: "Session: Gift literacy LIVE",
    mission_description:
      "Run a monetization-focused session: explain gifts clearly without begging; stay live 60+ minutes.",
    mission_steps: steps([], 60, [], habitDailyByStage("late")),
    mission_goal:
      "60+ minute LIVE with transparent goals and gratitude — no guilt-tripping viewers.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "creating-reasons-to-gift": {
    id: "mission-17-reasons-to-gift",
    mission_title: "Session: Value-stacked LIVE",
    mission_description:
      "Design moments worth supporting — teach, entertain, or milestone — minimum 60 minutes.",
    mission_steps: steps([], 60, [], habitDailyByStage("late")),
    mission_goal:
      "60+ minute LIVE where at least three distinct ‘reasons to stay’ segments appear.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "setting-goals-during-lives": {
    id: "mission-18-goals",
    mission_title: "Session: Goal-forward LIVE",
    mission_description:
      "State goals at start, mid, and end — minimum 60 minutes continuous.",
    mission_steps: steps(
      ["Write three goal checkpoints (start / 30m / before close)."],
      60,
      [],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete 60+ minutes with visible goal tracking without abandoning the plan.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "scaling-consistency": {
    id: "mission-19-scaling",
    mission_title: "Session: Volume week starter",
    mission_description:
      "Aim for 60–120 minutes total LIVE time today across one or two sessions — log your blocks.",
    mission_steps: [
      ...PRE_LIVE_STANDARD,
      liveSessionStep(60),
      ...BEHAVIOR_STANDARD,
      "Optional second same-day session: at least 30 more minutes if you have capacity.",
      habitDailyByStage("late"),
    ],
    mission_goal:
      "Hit your daily volume target without sacrificing basic audio/lighting quality.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "building-income-habits": {
    id: "mission-20-income-habits",
    mission_title: "Session: Income habit LIVE",
    mission_description:
      "Run one 90+ minute block focused on sustainable pacing + income behaviors (not burnout).",
    mission_steps: steps([], 90, [], habitDailyByStage("late")),
    mission_goal:
      "90+ minute LIVE that feels repeatable tomorrow — not a one-off crash session.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  // —— Rules ——
  "platform-rules-new-live-creators": {
    id: "mission-21-rules",
    mission_title: "Session: Compliant practice LIVE",
    mission_description:
      "Run a 45-minute LIVE that explicitly follows house rules: moderation, music, minors policy, clarity.",
    mission_steps: steps(
      [
        "Confirm your sound source is a platform library or a licensed track before you start.",
        "Decide in advance how you will handle an unfamiliar or ambiguous account in your room.",
      ],
      45,
      [
        "Apply at least one risk-category principle out loud during the session (name it plainly if a moment calls for it).",
      ],
      habitDailyByStage("mid"),
    ),
    mission_goal:
      "45+ minute LIVE you could defend if reviewed — calm, rule-aware, professional.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Risk Category Field Guide", href: "/streameru/library/risk-category-field-guide" },
      { label: "Professional Baseline Card", href: "/streameru/library/professional-baseline-card" },
    ],
  },

  "what-gets-you-banned": {
    id: "mission-22-bans",
    mission_title: "Session: Risk audit LIVE",
    mission_description:
      "Same pre-live ritual; 45-minute LIVE avoiding every red-line behavior from the lesson.",
    mission_steps: steps(
      [
        "Name one topic, dare, or request you will decline on sight if it comes up.",
        "Verbalize one self-check you run before risky topics (dares, sponsor claims, music requests).",
      ],
      45,
      [],
      habitDailyByStage("mid"),
    ),
    mission_goal:
      "Prove you can entertain and educate without stepping into red-line patterns.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Red-Line Reference Card", href: "/streameru/library/red-line-reference-card" },
      { label: "Self-Check Habit Tracker", href: "/streameru/library/self-check-habit-tracker" },
    ],
  },

  "how-to-avoid-violations": {
    id: "mission-23-violations",
    mission_title: "Session: Moderation-forward LIVE",
    mission_description:
      "45–60 minutes with active chat management — timeouts/warnings as needed.",
    mission_steps: steps(
      [
        "Confirm your moderator plan (real moderator or solo-watch pattern).",
        "Write down at least three topic fences before you go live.",
      ],
      45,
      [
        "Apply at least one chat norm reminder out loud and hold your topic fences the entire session.",
      ],
      habitDailyByStage("mid"),
    ),
    mission_goal:
      "45+ minute LIVE with visible moderation habits protecting your account.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Moderator Brief Builder", href: "/streameru/library/moderator-brief-builder" },
      { label: "Topic Fence Planner", href: "/streameru/library/topic-fence-planner" },
    ],
  },

  "long-term-account-safety": {
    id: "mission-24-safety",
    mission_title: "Session: Long-haul professionalism LIVE",
    mission_description:
      "Capstone rules track: one 60-minute LIVE demonstrating sustainable, policy-safe operation.",
    mission_steps: steps(
      [
        "Confirm your recovery phone number, email, and two-factor authentication are current.",
      ],
      60,
      [
        "Pick a date this month for your first recurring self-audit and write it down.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "60+ minute LIVE that looks like someone planning to stream for years — not days.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Account Stewardship Audit", href: "/streameru/library/account-stewardship-audit" },
      { label: "Monthly Safety Self-Audit", href: "/streameru/library/monthly-safety-self-audit" },
    ],
  },
};

export function getMissionForLessonSlug(slug: string): TrainingMission | null {
  return TRAINING_MISSIONS_BY_SLUG[slug] ?? null;
}
