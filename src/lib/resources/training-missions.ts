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
      "Your mission is one combined class session: study the concepts, then execute. Complete this session before moving on.",
    mission_steps: steps(
      [
        "Confirm TikTok username, profile photo, and one-sentence niche for this practice.",
        "Write 5 talking-point bullets you can see while live.",
      ],
      25,
      [],
      habitDailyByStage("early"),
    ),
    mission_goal:
      "Finish a real 25+ minute LIVE with a clear topic, visible plan, and no ‘silent staring’ stretches longer than a few seconds.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "your-first-live-structure": {
    id: "mission-02-first-structure",
    mission_title: "Session: Run a timed segment structure",
    mission_description:
      "Do this now: one LIVE that follows a simple structure (intro → segments → close). Your mission is not optional.",
    mission_steps: steps(
      [
        "Outline three segments (each 8–10 minutes) with a hook at the start of each.",
      ],
      30,
      [],
      habitDailyByStage("early"),
    ),
    mission_goal:
      "Prove you can hold a 30+ minute LIVE that feels intentional, not improvised chaos.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
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
      ["Write a run-of-show with 4 blocks + 3 stretch goals if energy stays high."],
      90,
      [],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete a 90+ minute LIVE with visible structure start-to-finish.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "growth-weekly-system": {
    id: "mission-10-repeat-viewers",
    mission_title: "Session: Repeat-viewer invitation LIVE",
    mission_description:
      "Explicitly train repeat attendance: reference last stream, tease next, reward returners.",
    mission_steps: steps([], 60, [], habitDailyByStage("late")),
    mission_goal:
      "Run 60+ minutes designed so a return viewer would recognize continuity from your last session.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  // —— Battles ——
  "understanding-battles": {
    id: "mission-11-understanding-battles",
    mission_title: "Session: Observe + debrief",
    mission_description:
      "Watch a battle (live or replay) and run your own 45-minute LIVE applying one lesson from observation.",
    mission_steps: [
      "Watch at least 20 minutes of a battle or recap (any creator) and note one tactic.",
      ...PRE_LIVE_STANDARD,
      liveSessionStep(45),
      ...BEHAVIOR_STANDARD,
    ],
    mission_goal:
      "Connect theory to practice: 45+ minute LIVE referencing what you saw in battles.",
    links: [
      { label: "Battle Hub", href: "/battle-hub" },
      { label: "StreamerU hub", href: "/streameru" },
    ],
  },

  "preparing-for-your-first-battle": {
    id: "mission-12-prep-battle",
    mission_title: "Session: Promotion dry-run LIVE",
    mission_description:
      "Rehearse promotion discipline: your mission includes a full pre-live funnel before a non-battle practice LIVE.",
    mission_steps: steps([], 45, [], habitDailyByStage("mid")),
    mission_goal:
      "45+ minute LIVE where promotion steps (video, hashtags, story) are executed cleanly.",
    links: [
      { label: "Battle Hub", href: "/battle-hub" },
      { label: "Promotion lesson", href: "/streameru/promote-your-battles-without-spamming" },
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
    mission_steps: steps([], 45, [], habitDailyByStage("mid")),
    mission_goal:
      "45+ minute LIVE you could defend if reviewed — calm, rule-aware, professional.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "what-gets-you-banned": {
    id: "mission-22-bans",
    mission_title: "Session: Risk audit LIVE",
    mission_description:
      "Same pre-live ritual; 45-minute LIVE avoiding every red-line behavior from the lesson.",
    mission_steps: steps(
      ["Verbalize one self-check you run before risky topics (sponsor, incentives, music)."],
      45,
      [],
      habitDailyByStage("mid"),
    ),
    mission_goal:
      "Prove you can entertain and educate without stepping into strike patterns.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "how-to-avoid-violations": {
    id: "mission-23-violations",
    mission_title: "Session: Moderation-forward LIVE",
    mission_description:
      "45–60 minutes with active chat management — timeouts/warnings as needed.",
    mission_steps: steps([], 45, [], habitDailyByStage("mid")),
    mission_goal:
      "45+ minute LIVE with visible moderation habits protecting your account.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },

  "long-term-account-safety": {
    id: "mission-24-safety",
    mission_title: "Session: Long-haul professionalism LIVE",
    mission_description:
      "Capstone rules track: one 60-minute LIVE demonstrating sustainable, policy-safe operation.",
    mission_steps: steps([], 60, [], habitDailyByStage("late")),
    mission_goal:
      "60+ minute LIVE that looks like someone planning to stream for years — not days.",
    links: [{ label: "StreamerU hub", href: "/streameru" }],
  },
};

export function getMissionForLessonSlug(slug: string): TrainingMission | null {
  return TRAINING_MISSIONS_BY_SLUG[slug] ?? null;
}
