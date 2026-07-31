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
      "Coordinate a real battle using Battle Hub, host it with real structure, and debrief it the same night — this is game day, not another rehearsal.",
    mission_steps: [
      "Schedule the battle in Battle Hub with a real date, time, and format visible to both sides.",
      "Invite at least one partner and get an explicit confirmation — not a soft maybe.",
      "Run your full promotion sequence for real: announcement video, hashtags, story reminder.",
      ...PRE_LIVE_STANDARD,
      liveSessionStep(60),
      "Host with open → play → recover → close, call scoreboard swings with steady energy, and close with genuine sportsmanship regardless of the result — no ghosting mid-match.",
      "Within an hour of ending, write your three-question debrief: what worked, one specific fix, what you'll test next time.",
      ...BEHAVIOR_STANDARD,
    ],
    mission_goal:
      "Ship one full battle cycle: schedule → confirmed partner → promoted LIVE → completed battle with sportsmanship → same-night written debrief.",
    links: [
      { label: "Open Battle Hub", href: "/battle-hub" },
      { label: "Battle promotion tips", href: "/streameru/promote-your-battles-without-spamming" },
    ],
  },

  "improving-battle-performance": {
    id: "mission-14-battle-performance",
    mission_title: "Session: Battle debrief LIVE",
    mission_description:
      "After a battle, run a 60-minute LIVE that opens with a real debrief and puts one specific fix into practice — not another rehearsal, a deliberate loop.",
    mission_steps: steps(
      [
        "Write your three-question debrief of your last battle if you haven't already: what worked, one specific fix, what you're testing tonight.",
      ],
      60,
      [
        "Apply that one fix deliberately throughout the session, practicing anticipatory energy calls and momentum language — never guilt or pressure.",
        "Log this session in your battle iteration tracker immediately afterward.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "60+ minute LIVE with a genuine on-camera debrief, one concrete fix applied live, and a logged entry — proving you iterate instead of repeating the same mistakes.",
    links: [{ label: "Battle Hub", href: "/battle-hub" }],
  },

  "building-battle-partners": {
    id: "mission-15-partners",
    mission_title: "Session: Collab-forward LIVE",
    mission_description:
      "Your mission includes two genuine shout-outs, matched promotional effort, and a direct on-camera ask for the next collab — still a full LIVE.",
    mission_steps: steps(
      ["Identify or confirm a real (or planned) partner through Battle Finder or your existing network."],
      60,
      [
        "Give at least one specific, genuine shout-out early in the session and another near the close.",
        "Before you end, ask directly, on camera, for a next collab — name something specific you enjoyed and propose a next step.",
        "Log this collaboration in your partner tracker immediately afterward.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "60+ minute collab-forward LIVE with two genuine shout-outs, a direct next-collab ask, and a logged entry — building a pipeline, not a one-off match.",
    links: [{ label: "Battle Hub", href: "/battle-hub" }, { label: "Battle Finder", href: "/battle-hub/finder" }],
  },

  // —— Monetization ——
  "gifts-goals-momentum": {
    id: "mission-16-gifting",
    mission_title: "Session: Gift literacy LIVE",
    mission_description:
      "Run a normal, well-hosted LIVE that happens to include gifting — not a fundraiser. State one honest goal, practice varied gratitude, and hold the line against begging.",
    mission_steps: steps(
      ["Write one transparent goal in advance: what you're working toward and why it matters to you."],
      60,
      [
        "State the goal once near the start in a single honest sentence, then let it sit in the background.",
        "Practice your gratitude rotation on every gift that comes in, regardless of size, and self-check your language against the momentum test throughout.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "60+ minute LIVE with a transparent goal stated once, prompt varied gratitude for every gift, and zero begging or guilt language.",
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

  // —— Advanced Creator ——
  "your-creator-operating-system": {
    id: "mission-25-creator-os",
    mission_title: "Session: OS Proof LIVE",
    mission_description:
      "Prove your Creator Operating System is real: run a 45+ minute LIVE from a written weekly OS, then log Plan / Actual / One change.",
    mission_steps: steps(
      [
        "Complete the Creator Weekly Operating System worksheet (aim, calendar, one metric, capacity rules) before you go live.",
        "Write today's one-sentence session aim under the weekly aim and circle today's calendar block.",
      ],
      45,
      [
        "Open with what today is for, protect at least one planned segment, and close naming your next planned LIVE day.",
        "Within 15 minutes of ending, fill Plan / Actual / One change and put this week's review block on the calendar.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a written one-page OS plus a 45+ minute LIVE that followed it — behavior proof, not viewer count.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Creator Weekly Operating System",
        href: "/streameru/library/creator-weekly-operating-system",
      },
      {
        label: "Weekly Review Ritual Checklist",
        href: "/streameru/library/weekly-review-ritual-checklist",
      },
      {
        label: "One Metric This Month Scorecard",
        href: "/streameru/library/one-metric-this-month-scorecard",
      },
    ],
  },

  "creator-brand-that-survives-the-feed": {
    id: "mission-26-creator-brand",
    mission_title: "Session: Brand Proof LIVE",
    mission_description:
      "Prove your brand is real: run a 45+ minute LIVE from a Brand One-Pager — promise in the open, all three proof behaviors on camera, close with who it's for + next LIVE time.",
    mission_steps: steps(
      [
        "Complete the Brand One-Pager and Profile / LIVE Alignment Checklist before you go live.",
        "Update or confirm your bio so it matches the promise and a realistic OS calendar.",
      ],
      45,
      [
        "Open with the promise in one sentence, demonstrate all three proof behaviors at least once, and close with who it's for + next LIVE time.",
        "After the LIVE, note which proof behavior felt natural and which felt forced.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a Brand One-Pager plus a 45+ minute LIVE that proves the promise — clarity and follow-through, not follower count.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Brand One-Pager", href: "/streameru/library/brand-one-pager" },
      {
        label: "Profile / LIVE Alignment Checklist",
        href: "/streameru/library/profile-live-alignment-checklist",
      },
      { label: "Brand Leak Repair Sheet", href: "/streameru/library/brand-leak-repair-sheet" },
    ],
  },

  "reading-your-live-numbers": {
    id: "mission-27-live-numbers",
    mission_title: "Session: Scorecard Decision LIVE",
    mission_description:
      "Complete a weekly LIVE analytics scorecard, choose one change, and run a 45+ minute LIVE that names and protects that focus.",
    mission_steps: steps(
      [
        "Complete the Weekly LIVE Analytics Scorecard for your last week (or last 3–7 sessions).",
        "Write exactly one change for this week's Creator OS.",
      ],
      45,
      [
        "Near the open, name that focus in plain language (not a stats lecture) and protect the behavior it requires.",
        "After the LIVE, add one line: did today's session support the decision?",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship an honest three-metric scorecard with one decision, proven on a 45+ minute LIVE — not a bigger peak.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Weekly LIVE Analytics Scorecard",
        href: "/streameru/library/weekly-live-analytics-scorecard",
      },
      {
        label: "Vanity Metrics Parking Lot",
        href: "/streameru/library/vanity-metrics-parking-lot",
      },
      { label: "One-Decision Log", href: "/streameru/library/one-decision-log" },
    ],
  },

  "creative-planning-for-real-weeks": {
    id: "mission-28-creative-planning",
    mission_title: "Session: Planned Show LIVE",
    mission_description:
      "Run a 45+ minute LIVE from a two-week creative plan — written hook plus at least two banked segments.",
    mission_steps: steps(
      [
        "Complete the Two-Week Creative Plan and a Segment Bank of at least ten items before you go live.",
        "Choose today's open hook and primary + backup segments from the bank.",
      ],
      45,
      [
        "Deliver the written open hook and run at least two banked segments.",
        "After the LIVE, star one segment to reuse and note one to rewrite.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Prove prep on camera: planned hook + two banked segments on a 45+ minute LIVE.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Two-Week Creative Plan", href: "/streameru/library/two-week-creative-plan" },
      { label: "Segment Bank (10+)", href: "/streameru/library/segment-bank-10" },
      { label: "Hooks Library Card", href: "/streameru/library/hooks-library-card" },
    ],
  },

  "growth-experiments-that-dont-wreck-your-show": {
    id: "mission-29-growth-experiments",
    mission_title: "Session: Experiment Day-One LIVE",
    mission_description:
      "Execute day one of a two-week growth experiment from a written brief with success criteria and a kill rule.",
    mission_steps: steps(
      [
        "Complete the Experiment Brief (one variable, success criteria, kill rule, window dates).",
        "Confirm today's creative plan includes the experiment variable.",
      ],
      45,
      [
        "Run the variable on purpose while keeping brand and capacity rules intact.",
        "Fill the first Results Log row immediately after the LIVE.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a clean experiment brief plus honest day-one execution on a 45+ minute LIVE.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Experiment Brief", href: "/streameru/library/experiment-brief" },
      { label: "Experiment Results Log", href: "/streameru/library/experiment-results-log" },
      {
        label: "Keep / Adapt / Kill Decision Card",
        href: "/streameru/library/keep-adapt-kill-decision-card",
      },
    ],
  },

  "professional-standards-on-live": {
    id: "mission-30-professional-standards",
    mission_title: "Session: Standards on Camera LIVE",
    mission_description:
      "Demonstrate three written professional standards on a 45+ minute LIVE — time, chat/recovery, reputation habits.",
    mission_steps: steps(
      [
        "Complete the Personal Professional Standards Sheet before you go live.",
        "Pick three standards you will deliberately demonstrate today.",
      ],
      45,
      [
        "Show those three standards on camera without turning the LIVE into a lecture.",
        "After the LIVE, note one standard that felt easy and one to tighten.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Make reliability visible: three written standards proven on a 45+ minute LIVE.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Personal Professional Standards Sheet",
        href: "/streameru/library/personal-professional-standards-sheet",
      },
      { label: "Recovery Script Card", href: "/streameru/library/recovery-script-card" },
      {
        label: "Delay & Cancel Communication Checklist",
        href: "/streameru/library/delay-cancel-communication-checklist",
      },
    ],
  },

  "privacy-security-and-personal-boundaries": {
    id: "mission-31-privacy-security",
    mission_title: "Session: Boundary-Safe LIVE",
    mission_description:
      "Apply the privacy & security checklist, scan your environment, and run a 45+ minute boundary-safe LIVE.",
    mission_steps: steps(
      [
        "Complete the Privacy & Security Checklist on your real accounts and write three boundary scripts.",
        "Do a 60-second environment scan before going live (windows, mail, badges, people who might enter).",
      ],
      45,
      [
        "Stay inside your boundaries; if chat pushes, use a script once and continue.",
        "Mark at least one real security/privacy fix completed today.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship an applied privacy checklist plus a clean 45+ minute boundary-safe LIVE.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Privacy & Security Checklist",
        href: "/streameru/library/privacy-security-checklist",
      },
      {
        label: "On-Camera Boundaries List",
        href: "/streameru/library/on-camera-boundaries-list",
      },
      { label: "Boundary Script Card", href: "/streameru/library/boundary-script-card" },
    ],
  },

  "advanced-creator-capstone-30-day-pro-sprint": {
    id: "mission-32-ac-capstone",
    mission_title: "Session: Capstone Kickoff LIVE",
    mission_description:
      "Assemble the Capstone dossier/sprint plan and kick off your 30-day professional sprint on a 45+ minute LIVE.",
    mission_steps: steps(
      [
        "Assemble the Capstone Dossier Checklist and 30-Day Sprint Planner (goal, capacity, experiment window, review date, before snapshot).",
        "Confirm standards sheet and privacy checklist are filed in the dossier.",
      ],
      45,
      [
        "State your sprint goal in plain language, run at least one banked segment, and close with next LIVE day.",
        "Start the thirty-day clock and file kickoff notes in the dossier the same day.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Kick off a reviewable 30-day Pro Sprint with a complete plan packet and a real LIVE start.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Capstone Dossier Checklist",
        href: "/streameru/library/capstone-dossier-checklist",
      },
      {
        label: "30-Day Pro Sprint Planner",
        href: "/streameru/library/thirty-day-pro-sprint-planner",
      },
      {
        label: "Before/After Retrospective Worksheet",
        href: "/streameru/library/before-after-retrospective-worksheet",
      },
    ],
  },
};

export function getMissionForLessonSlug(slug: string): TrainingMission | null {
  return TRAINING_MISSIONS_BY_SLUG[slug] ?? null;
}
