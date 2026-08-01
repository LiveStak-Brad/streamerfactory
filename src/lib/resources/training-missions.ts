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
      {
        label: "Boundary Script Card",
        href: "/streameru/library/privacy-boundary-script-card",
      },
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

  // —— Presence Mastery ——
  "camera-presence-owning-the-frame": {
    id: "mission-33-camera-presence",
    mission_title: "Session: 10-Minute Presence Drill LIVE",
    mission_description:
      "Run a presence drill on TikTok LIVE focused on framing, eye line, posture, and grounded stillness — then file self-review notes.",
    mission_steps: steps(
      [
        "Set framing using the Camera Frame Checklist (headroom, eye line, background clutter).",
        "Write three self-review questions you will answer after the drill.",
      ],
      35,
      [
        "Complete one continuous 10-minute presence drill block with intentional eye line and stillness.",
        "File Presence Self-Review Notes the same day (what looked grounded vs restless).",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Finish a real LIVE with a 10-minute presence drill and written self-review — graded by craft behaviors, not viewer count.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Presence Drill Card", href: "/streameru/library/presence-drill-card" },
      { label: "Camera Frame Checklist", href: "/streameru/library/camera-frame-checklist" },
    ],
  },

  "voice-that-holds-a-room": {
    id: "mission-34-voice-holds-room",
    mission_title: "Session: Vocal Variety Segment LIVE",
    mission_description:
      "Complete the five-tool vocal warm-up, then run a 15-minute LIVE segment with intentional pace and energy variety.",
    mission_steps: steps(
      [
        "Run the Voice Warm-Up Routine (all five tools) before Go Live.",
        "Mark three moments in your plan where pace or emphasis will change on purpose.",
      ],
      40,
      [
        "Deliver one continuous 15-minute segment with audible variety (not max volume the whole time).",
        "Write before/after voice notes: one improvement and one habit to keep.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Prove vocal variety across a real 15-minute LIVE segment after a completed warm-up.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Voice Warm-Up Routine", href: "/streameru/library/voice-warmup-routine" },
      { label: "Vocal Variety Scorecard", href: "/streameru/library/vocal-variety-scorecard" },
    ],
  },

  "confidence-when-the-chat-is-quiet": {
    id: "mission-35-quiet-chat-confidence",
    mission_title: "Session: Quiet-Chat Protocol LIVE",
    mission_description:
      "Complete a full planned segment using your quiet-chat protocol even if chat is empty — no apology spirals.",
    mission_steps: steps(
      [
        "Fill your Quiet-Chat Protocol Card and Silence Rescue Card before Go Live.",
        "Choose one self-contained segment that does not require chat to function.",
      ],
      40,
      [
        "Run the full segment without begging for comments; use rescue moves if silence hits.",
        "Log which protocol step you used and whether the spiral started (and how you stopped it).",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete a full LIVE segment under quiet-chat conditions using a written protocol — not viewer validation.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Quiet-Chat Protocol Card", href: "/streameru/library/quiet-chat-protocol-card" },
      { label: "Silence Rescue Card", href: "/streameru/library/silence-rescue-card" },
    ],
  },

  "storytelling-on-live-not-scripts": {
    id: "mission-36-live-storytelling",
    mission_title: "Session: Three Micro-Stories LIVE",
    mission_description:
      "Deliver three 60–90 second LIVE stories from your bank with clear setup, turn, and payoff.",
    mission_steps: steps(
      [
        "Complete a Micro-Story Bank of at least 10 stories; star three for today's LIVE.",
        "For each starred story, write setup / turn / payoff in one line each (not a script essay).",
      ],
      40,
      [
        "Deliver all three stories on LIVE with clear payoffs; recover if chat interrupts.",
        "Note which story landed hardest and one delivery tweak.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Land three banked micro-stories on a real LIVE with clear payoffs — memory over scripts.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Micro-Story Bank", href: "/streameru/library/micro-story-bank" },
      { label: "Story Delivery Checklist", href: "/streameru/library/story-delivery-checklist" },
    ],
  },

  "audience-psychology-why-people-stay": {
    id: "mission-37-motive-redesign",
    mission_title: "Session: Motive Redesign LIVE",
    mission_description:
      "Map your show to four viewer motives and run one redesigned segment that serves two motives ethically.",
    mission_steps: steps(
      [
        "Complete the Viewer Motive Map for your usual LIVE.",
        "Redesign one segment with entry, moves, exit, and an ethics gate (no manipulation).",
      ],
      45,
      [
        "Run the redesigned segment as planned on LIVE.",
        "Log motives landed, leave-risk moments, and one tweak for next time.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Demonstrate motive-aware segment design on LIVE without manipulative tactics.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Viewer Motive Map", href: "/streameru/library/viewer-motive-map" },
      { label: "Segment Redesign Worksheet", href: "/streameru/library/segment-redesign-worksheet" },
    ],
  },

  "emotional-pacing-across-a-live": {
    id: "mission-38-energy-arc",
    mission_title: "Session: Energy Arc LIVE",
    mission_description:
      "Run a LIVE from an annotated energy map with planned peaks, rests, and recovery beats.",
    mission_steps: steps(
      [
        "Draw an Energy Arc Map for today's session (peaks, rests, recovery).",
        "Mark one rest beat you will protect even if chat gets busy.",
      ],
      45,
      [
        "Execute the map on LIVE — hit at least one planned peak and one planned rest.",
        "Score the session on the Pacing Self-Scorecard (plan vs actual).",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Prove intentional emotional pacing across a real LIVE — not flat or maxed the whole time.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Energy Arc Map", href: "/streameru/library/energy-arc-map" },
      { label: "Pacing Self-Scorecard", href: "/streameru/library/pacing-self-scorecard" },
    ],
  },

  "humor-warmth-and-authenticity": {
    id: "mission-39-personality-levers",
    mission_title: "Session: Personality Levers LIVE",
    mission_description:
      "Practice three authentic personality levers on LIVE without forced bits.",
    mission_steps: steps(
      [
        "Fill the Personality Lever Card with three levers that fit you.",
        "Write a Forced-Bit Kill List of jokes/bits you will not fake today.",
      ],
      40,
      [
        "Use all three levers naturally during the LIVE (not as a comedy special).",
        "Note which lever felt true and which felt forced — retire forced moves.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Demonstrate three authentic personality levers on LIVE without desperate forced bits.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Personality Lever Card", href: "/streameru/library/personality-lever-card" },
      { label: "Forced-Bit Kill List", href: "/streameru/library/forced-bit-kill-list" },
    ],
  },

  "handling-pressure-moments-live": {
    id: "mission-40-pressure-recovery",
    mission_title: "Session: Pressure Recovery LIVE",
    mission_description:
      "Keep recovery scripts ready and execute composure resets for pressure events during a real LIVE.",
    mission_steps: steps(
      [
        "Complete the Pressure Recovery Card for four scenarios (troll, tech fail, gift interrupt, sudden crowd).",
        "Place the Composure Reset Checklist where you can glance mid-LIVE.",
      ],
      40,
      [
        "If a real pressure event hits, use a scripted recovery; if not, practice one reset after a planned mild interruption you create (e.g. water break announce).",
        "Log which recovery you used and how fast you returned to the planned beat.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Execute a composure recovery pattern on LIVE and return to the show without spiral or rage-quit.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Pressure Recovery Card", href: "/streameru/library/pressure-recovery-card" },
      { label: "Composure Reset Checklist", href: "/streameru/library/composure-reset-checklist" },
    ],
  },

  "interview-energy-solo-and-guests": {
    id: "mission-41-interview-energy",
    mission_title: "Session: Interview Segment LIVE",
    mission_description:
      "Host a continuous 10-minute interview-style segment with question craft, listening, and follow-ups.",
    mission_steps: steps(
      [
        "Complete Interview Segment Plan + Question Bank (8–12 questions).",
        "Star five always-ready questions for cold starts.",
      ],
      40,
      [
        "Run one continuous 10-minute interview-style block (chat as guest is enough).",
        "Log one strong follow-up you used and one moment you talked over instead of listening.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Host a 10-minute interview-energy segment with visible listening and follow-ups.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Interview Segment Plan", href: "/streameru/library/interview-segment-plan" },
      { label: "Question Bank Worksheet", href: "/streameru/library/question-bank-worksheet" },
    ],
  },

  // —— Growth Mastery ——
  "growth-diagnosis-framework": {
    id: "mission-53-growth-diagnosis",
    mission_title: "Session: Diagnosis Observation LIVE",
    mission_description:
      "Complete a written growth diagnosis, then run a LIVE that tests one diagnostic observation — not a full rebuild.",
    mission_steps: steps(
      [
        "Complete the Growth Diagnosis Worksheet (primary bottleneck + evidence + one observation to test).",
        "Fill the One-Leak Decision Card so you are not fixing four lanes at once.",
      ],
      45,
      [
        "On LIVE, test only the single diagnostic observation written on the card.",
        "Within 15 minutes of ending, log what you observed on the Bottleneck Evidence Log.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a written diagnosis plus a 45+ minute LIVE that tests one observation — behavior proof, not viewer count.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Growth Diagnosis Worksheet", href: "/streameru/library/growth-diagnosis-worksheet" },
      { label: "Bottleneck Evidence Log", href: "/streameru/library/bottleneck-evidence-log" },
      { label: "One-Leak Decision Card", href: "/streameru/library/one-leak-decision-card" },
    ],
  },

  "retention-science-beyond-the-basics": {
    id: "mission-54-retention-science",
    mission_title: "Session: Retention Redesign LIVE",
    mission_description:
      "Apply one mid-LIVE retention structural change and file comparison notes against a prior session.",
    mission_steps: steps(
      [
        "Complete the Mid-LIVE Drop-Off Map and Retention Redesign Sheet (one structural change only).",
        "Note the baseline session you will compare against.",
      ],
      45,
      [
        "Execute the single retention change on purpose through the mid-LIVE window.",
        "Fill the Two-Session Comparison Log within 15 minutes of ending.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship one retention redesign on a 45+ minute LIVE with honest comparison notes — not a viral spike.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Mid-LIVE Drop-Off Map", href: "/streameru/library/mid-live-drop-off-map" },
      { label: "Retention Redesign Sheet", href: "/streameru/library/retention-redesign-sheet" },
      { label: "Two-Session Comparison Log", href: "/streameru/library/two-session-comparison-log" },
    ],
  },

  "analytics-deep-dive-for-live-creators": {
    id: "mission-55-analytics-deep-dive",
    mission_title: "Session: Analytics Decision LIVE",
    mission_description:
      "Complete a monthly analytics review (three decisions max), then run a LIVE that executes one decision.",
    mission_steps: steps(
      [
        "Complete the Monthly Analytics Review Template from the last 2–4 weeks of LIVE data.",
        "Cut priorities to three decisions max on the Three-Decisions Max Worksheet.",
      ],
      45,
      [
        "Execute exactly one of those decisions on LIVE.",
        "Note leading vs lagging signals you will watch next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a completed monthly review (≤3 decisions) plus a LIVE that executes one decision.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Monthly Analytics Review Template",
        href: "/streameru/library/monthly-analytics-review-template",
      },
      {
        label: "Leading vs Lagging Indicators Card",
        href: "/streameru/library/leading-vs-lagging-indicators-card",
      },
      {
        label: "Three-Decisions Max Worksheet",
        href: "/streameru/library/three-decisions-max-worksheet",
      },
    ],
  },

  "experiment-design-for-creators": {
    id: "mission-56-experiment-design",
    mission_title: "Session: Clean Experiment LIVE",
    mission_description:
      "Run one clean A/B-style LIVE experiment from a design sheet with kill criteria and sample-size humility.",
    mission_steps: steps(
      [
        "Complete the Clean Experiment Design Sheet (one variable, success criteria, kill rule, window).",
        "Read the Sample-Size Humility Card so you do not overclaim from one session.",
      ],
      45,
      [
        "Execute the single variable on purpose while keeping brand and capacity stable.",
        "Log the session on the Experiment Conclusion Log (variable present? notes? early keep/adapt/kill lean).",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a clean experiment design plus honest day execution on a 45+ minute LIVE.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Clean Experiment Design Sheet", href: "/streameru/library/clean-experiment-design-sheet" },
      { label: "Sample-Size Humility Card", href: "/streameru/library/sample-size-humility-card" },
      { label: "Experiment Conclusion Log", href: "/streameru/library/experiment-conclusion-log" },
    ],
  },

  "scheduling-as-strategy": {
    id: "mission-57-scheduling-strategy",
    mission_title: "Session: Schedule Test LIVE",
    mission_description:
      "Choose a schedule strategy, go LIVE in the tested slot, and log attendance/retention notes.",
    mission_steps: steps(
      [
        "Complete the Schedule Strategy Sheet and mark the two-week test window.",
        "Confirm the slot is sustainable on the Sustainable Cadence Planner.",
      ],
      45,
      [
        "Run the LIVE in the chosen test slot.",
        "Fill the Two-Week Schedule Test Log row for today's session.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a written schedule strategy plus a LIVE in the tested slot with notes filed.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Schedule Strategy Sheet", href: "/streameru/library/schedule-strategy-sheet" },
      { label: "Two-Week Schedule Test Log", href: "/streameru/library/two-week-schedule-test-log" },
      { label: "Sustainable Cadence Planner", href: "/streameru/library/sustainable-cadence-planner" },
    ],
  },

  "discovery-inventory-never-miss-a-publish-window": {
    id: "mission-58-discovery-inventory",
    mission_title: "Session: Discovery Inventory Capture LIVE",
    mission_description:
      "Install a four-week discovery inventory board and capture 2–3 clippable moments with LIVE CTAs planned.",
    mission_steps: steps(
      [
        "Build the Four-Week Discovery Inventory Board (clip moments, promos, experiment slots).",
        "Open the Publish Window Checklist for this week.",
      ],
      45,
      [
        "During LIVE, capture or clearly mark 2–3 clippable moments.",
        "Log them on the Clip Moment Capture Log with intended LIVE CTAs.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a four-week inventory board plus a LIVE that stocks the discovery pipeline — not show redesign.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Four-Week Discovery Inventory Board",
        href: "/streameru/library/four-week-discovery-inventory-board",
      },
      { label: "Clip Moment Capture Log", href: "/streameru/library/clip-moment-capture-log" },
      { label: "Publish Window Checklist", href: "/streameru/library/publish-window-checklist" },
    ],
  },

  "algorithm-durable-growth": {
    id: "mission-59-algorithm-durable",
    mission_title: "Session: Durable Tactics LIVE",
    mission_description:
      "Complete a myth audit, replace fragile tactics with durable principles, and run a LIVE using only durable tactics.",
    mission_steps: steps(
      [
        "Complete the Growth Myth Audit Worksheet and Durable Tactics List.",
        "Confirm Algorithm-Proof Principles Card off-limits (no bait, spam, fake engagement).",
      ],
      45,
      [
        "Run LIVE using only durable tactics from your list.",
        "Note any myth urge you refused mid-stream.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a myth audit + durable tactics list plus a LIVE that refuses hack culture.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Growth Myth Audit Worksheet", href: "/streameru/library/growth-myth-audit-worksheet" },
      { label: "Durable Tactics List", href: "/streameru/library/durable-tactics-list" },
      {
        label: "Algorithm-Proof Principles Card",
        href: "/streameru/library/algorithm-proof-principles-card",
      },
    ],
  },

  "clips-discovery-and-live": {
    id: "mission-60-clips-discovery",
    mission_title: "Session: Clip-to-LIVE Loop LIVE",
    mission_description:
      "Install a weekly clip workflow with focus guardrails, capture during/after LIVE, and prepare three clips with LIVE CTAs.",
    mission_steps: steps(
      [
        "Complete the Weekly Clip Workflow Checklist and Focus Guardrails Card.",
        "Prepare Clip-to-LIVE CTA Templates for this week's posts.",
      ],
      45,
      [
        "Capture clip moments during or immediately after LIVE without stealing recovery time past your guardrail.",
        "Queue or post three clips with LIVE CTAs (execution graded, not views).",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a clip workflow plus three CTA'd clips that serve LIVE — without destroying focus.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Weekly Clip Workflow Checklist",
        href: "/streameru/library/weekly-clip-workflow-checklist",
      },
      { label: "Clip-to-LIVE CTA Templates", href: "/streameru/library/clip-to-live-cta-templates" },
      { label: "Focus Guardrails Card", href: "/streameru/library/focus-guardrails-card" },
    ],
  },

  "ai-for-live-creators": {
    id: "mission-61-ai-for-live",
    mission_title: "Session: AI-Assisted Prep LIVE",
    mission_description:
      "Use an AI-assisted prep workflow with authenticity rules, then deliver a LIVE that still sounds like you.",
    mission_steps: steps(
      [
        "Run the AI-Assisted Prep Workflow and Authenticity Rules Card before Go Live.",
        "Complete the AI Use Decision Checklist (what AI may draft vs what you must rewrite).",
      ],
      45,
      [
        "Host LIVE in your voice — no robotic verbatim AI scripts.",
        "Log what AI helped vs what you rewrote within 15 minutes of ending.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship AI-assisted prep plus an authentic 45+ minute LIVE with a help/rewrite log.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "AI-Assisted Prep Workflow", href: "/streameru/library/ai-assisted-prep-workflow" },
      { label: "Authenticity Rules Card", href: "/streameru/library/authenticity-rules-card" },
      { label: "AI Use Decision Checklist", href: "/streameru/library/ai-use-decision-checklist" },
    ],
  },

  "collaboration-growth-without-begging": {
    id: "mission-62-collab-growth",
    mission_title: "Session: Collab Growth LIVE",
    mission_description:
      "Complete professional collab outreach materials and either send one outreach or run a retention-prep LIVE.",
    mission_steps: steps(
      [
        "Complete the Collab Outreach Template and Value Exchange Planner.",
        "Draft the Post-Collab Retention Plan for new arrivals.",
      ],
      45,
      [
        "Send one professional outreach OR rehearse welcome/return retention language on LIVE.",
        "File the outreach/retention artifacts for Capstone evidence.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship professional collab artifacts plus outreach or retention-prep LIVE — no begging, no recruiting.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Collab Outreach Template", href: "/streameru/library/collab-outreach-template" },
      { label: "Value Exchange Planner", href: "/streameru/library/value-exchange-planner" },
      { label: "Post-Collab Retention Plan", href: "/streameru/library/post-collab-retention-plan" },
    ],
  },

  "from-spike-to-stable-growth": {
    id: "mission-63-spike-stable",
    mission_title: "Session: Spike Capture Rehearsal LIVE",
    mission_description:
      "Install a spike-capture playbook and rehearse welcome/return offer behaviors on a normal LIVE.",
    mission_steps: steps(
      [
        "Complete the Spike Capture Playbook and Post-Spike Pacing Planner.",
        "Write the Welcome Ritual Script Card you will rehearse today.",
      ],
      45,
      [
        "Rehearse welcome + return offer on LIVE even without a spike.",
        "Note one pacing rule you will protect if a spike arrives.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a spike playbook plus a LIVE that rehearses capture systems before you need them.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Spike Capture Playbook", href: "/streameru/library/spike-capture-playbook" },
      { label: "Welcome Ritual Script Card", href: "/streameru/library/welcome-ritual-script-card" },
      { label: "Post-Spike Pacing Planner", href: "/streameru/library/post-spike-pacing-planner" },
    ],
  },

  "growth-capstone-30-day-growth-experiment": {
    id: "mission-64-growth-capstone",
    mission_title: "Session: Growth Capstone Kickoff LIVE",
    mission_description:
      "Assemble the 30-day growth experiment dossier/planner and kick off the experiment on a real LIVE.",
    mission_steps: steps(
      [
        "Assemble the 30-Day Growth Experiment Dossier Checklist and Growth Capstone 30-Day Planner (diagnosis, one test, schedule/discovery notes, review date).",
        "Confirm results narrative worksheet is ready for end-of-window filing.",
      ],
      45,
      [
        "State your experiment goal in plain language, run at least one planned segment, and close with next LIVE day.",
        "Start the thirty-day clock and file kickoff notes in the dossier the same day.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Kick off a reviewable 30-day growth experiment with a complete plan packet and a real LIVE start.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "30-Day Growth Experiment Dossier Checklist",
        href: "/streameru/library/thirty-day-growth-experiment-dossier-checklist",
      },
      {
        label: "Growth Capstone 30-Day Planner",
        href: "/streameru/library/growth-capstone-30-day-planner",
      },
      {
        label: "Growth Results Narrative Worksheet",
        href: "/streameru/library/growth-results-narrative-worksheet",
      },
    ],
  },

  // —— Community Mastery ——
  "community-design-belonging-on-purpose": {
    id: "mission-65-community-design",
    mission_title: "Session: Belonging Design LIVE",
    mission_description:
      "Complete a community design one-pager and values sheet, then run a LIVE that installs one weekly ritual on purpose.",
    mission_steps: steps(
      [
        "Complete the Community Design One-Pager and Community Values Worksheet.",
        "Mark one ritual on the Weekly Rituals Planner you will host today.",
      ],
      45,
      [
        "Deliver the chosen ritual on LIVE (open welcome, mid recognition, or close return cue).",
        "Note one design sentence you spoke that protected the room's identity.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a written community design plus a 45+ minute LIVE that installs one belonging ritual — not vibes alone.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Community Design One-Pager", href: "/streameru/library/community-design-one-pager" },
      { label: "Weekly Rituals Planner", href: "/streameru/library/weekly-rituals-planner" },
      { label: "Community Values Worksheet", href: "/streameru/library/community-values-worksheet" },
    ],
  },

  "chat-culture-and-return-viewer-habits": {
    id: "mission-66-chat-culture",
    mission_title: "Session: Return Culture LIVE",
    mission_description:
      "Install open/close community scripts and recognition phrases, then run a LIVE that delivers a clear return cue.",
    mission_steps: steps(
      [
        "Complete the Open/Close Community Script and Recognition Phrase Bank.",
        "Open the Return Viewer Tracker for today's session row.",
      ],
      45,
      [
        "Deliver open orientation + close return cue on purpose; use at least two recognition phrases.",
        "Fill today's Return Viewer Tracker row within 15 minutes of ending.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship open/close + recognition artifacts plus a LIVE that trains return habits — not gift-only status.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Open/Close Community Script",
        href: "/streameru/library/open-close-community-script",
      },
      { label: "Return Viewer Tracker", href: "/streameru/library/return-viewer-tracker" },
      { label: "Recognition Phrase Bank", href: "/streameru/library/recognition-phrase-bank" },
    ],
  },

  "moderation-systems-that-scale": {
    id: "mission-67-moderation-systems",
    mission_title: "Session: Moderation Systems LIVE",
    mission_description:
      "Write a moderator handbook and escalation path, then host a LIVE that practices calm norm enforcement language.",
    mission_steps: steps(
      [
        "Complete the Moderator Handbook and Escalation Path Checklist.",
        "Fill the Mod Role Ladder Card (even if you are solo for now).",
      ],
      45,
      [
        "On LIVE, state one clear chat norm and deliver one calm redirect or recognition of culture-protecting chat.",
        "Note any handbook tweak after the session.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship written moderation systems plus a LIVE that practices calm standards — not chaos management theater.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Moderator Handbook", href: "/streameru/library/moderator-handbook" },
      { label: "Mod Role Ladder Card", href: "/streameru/library/mod-role-ladder-card" },
      {
        label: "Escalation Path Checklist",
        href: "/streameru/library/escalation-path-checklist",
      },
    ],
  },

  "conflict-trolls-and-boundary-enforcement": {
    id: "mission-68-conflict-boundaries",
    mission_title: "Session: Boundary Enforcement Rehearsal LIVE",
    mission_description:
      "Complete a conflict decision tree and enforcement phrase bank, then rehearse calm boundary language on a real LIVE.",
    mission_steps: steps(
      [
        "Complete the Conflict Decision Tree Card and Enforcement Phrase Bank.",
        "Open the Incident Log Template for any real incident (or note 'no incident — rehearsed').",
      ],
      45,
      [
        "Rehearse at least one redirect/warning phrase on LIVE (even without a troll present).",
        "File incident log notes or rehearsal notes within 15 minutes of ending.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship decision-tree + phrase-bank artifacts plus a LIVE that rehearses calm enforcement before heat arrives.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Conflict Decision Tree Card",
        href: "/streameru/library/conflict-decision-tree-card",
      },
      { label: "Enforcement Phrase Bank", href: "/streameru/library/enforcement-phrase-bank" },
      { label: "Incident Log Template", href: "/streameru/library/incident-log-template" },
    ],
  },

  "protecting-community-health-and-yourself": {
    id: "mission-69-community-health",
    mission_title: "Session: Health Boundary LIVE",
    mission_description:
      "Write a community health policy and boundary scripts, then host a LIVE that protects host capacity on purpose.",
    mission_steps: steps(
      [
        "Complete the Community Health Policy and Community Boundary Script Card.",
        "Open the Community Health Scorecard for this week's row.",
      ],
      45,
      [
        "On LIVE, hold at least one health boundary if tested — or state a pre-planned topic/off-limits line.",
        "Fill this week's Community Health Scorecard row after ending.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a health policy + boundary scripts plus a LIVE that protects host and room — not endless emotional labor.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Community Health Policy", href: "/streameru/library/community-health-policy" },
      {
        label: "Community Boundary Script Card",
        href: "/streameru/library/community-boundary-script-card",
      },
      {
        label: "Community Health Scorecard",
        href: "/streameru/library/community-health-scorecard",
      },
    ],
  },

  "accessibility-and-inclusion-in-community-spaces": {
    id: "mission-70-inclusion",
    mission_title: "Session: Inclusion Open LIVE",
    mission_description:
      "Complete inclusion open checks and a newcomer welcome script, then run a LIVE that orients strangers on purpose.",
    mission_steps: steps(
      [
        "Complete the Inclusion Checklist for Opens and Newcomer Welcome Script.",
        "Fill the Joke Boundary Card (what fits / what is off-limits).",
      ],
      45,
      [
        "Deliver a plain-language open + newcomer welcome path on LIVE.",
        "Note one inclusion upgrade you kept even if the room was mostly regulars.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship inclusion artifacts plus a LIVE that orients newcomers — not an insider-only hang.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Inclusion Checklist for Opens",
        href: "/streameru/library/inclusion-checklist-for-opens",
      },
      { label: "Newcomer Welcome Script", href: "/streameru/library/newcomer-welcome-script" },
      { label: "Joke Boundary Card", href: "/streameru/library/joke-boundary-card" },
    ],
  },

  "guest-hosting-that-elevates-both-audiences": {
    id: "mission-71-guest-hosting",
    mission_title: "Session: Guest Hosting Prep LIVE",
    mission_description:
      "Complete guest run-of-show and mutual-value promo materials, then run a LIVE that rehearses guest hosting behaviors (with or without a live guest).",
    mission_steps: steps(
      [
        "Complete the Guest LIVE Run of Show and Mutual Value Promo Checklist.",
        "Draft the Guest Exit Ramp Card for a real or planned guest.",
      ],
      45,
      [
        "Either host with a guest OR rehearse intro + exit-ramp language solo for a planned guest.",
        "File promo/exit-ramp artifacts for Capstone evidence.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship mutual-value guest artifacts plus a LIVE that elevates both rooms — not one-sided promo optics.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Guest LIVE Run of Show", href: "/streameru/library/guest-live-run-of-show" },
      {
        label: "Mutual Value Promo Checklist",
        href: "/streameru/library/mutual-value-promo-checklist",
      },
      { label: "Guest Exit Ramp Card", href: "/streameru/library/guest-exit-ramp-card" },
    ],
  },

  "interviewing-skills-for-creators": {
    id: "mission-72-interviewing",
    mission_title: "Session: Hosted Interview LIVE",
    mission_description:
      "Build an interview question system and listening redirects, then run a LIVE interview segment (guest or interview-energy solo).",
    mission_steps: steps(
      [
        "Complete the Interview Question System and Listening Redirect Card.",
        "Open the Highlight Moment Log for today's session.",
      ],
      45,
      [
        "Host a clear interview lane on LIVE with audible listening / follow-ups.",
        "Log at least two highlight moments within 15 minutes of ending.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship interview system artifacts plus a LIVE that proves listening — not a laundry-list interrogation.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Interview Question System", href: "/streameru/library/interview-question-system" },
      { label: "Listening Redirect Card", href: "/streameru/library/listening-redirect-card" },
      { label: "Highlight Moment Log", href: "/streameru/library/highlight-moment-log" },
    ],
  },

  "professional-networking-for-creators": {
    id: "mission-73-networking",
    mission_title: "Session: Professional Networking LIVE",
    mission_description:
      "Install a thirty-day networking plan and reputation hygiene card, then run a LIVE while completing one professional outreach artifact.",
    mission_steps: steps(
      [
        "Complete the Thirty-Day Networking Plan and Reputation Hygiene Card.",
        "Draft one Outreach Notes Template message (specific context + value + small ask).",
      ],
      45,
      [
        "Send the outreach OR rehearse professional shout/credit habits on LIVE without ambush pitching.",
        "File the outreach notes for Capstone evidence.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a networking plan + one professional outreach artifact plus a LIVE that protects reputation hygiene.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Thirty-Day Networking Plan",
        href: "/streameru/library/thirty-day-networking-plan",
      },
      { label: "Outreach Notes Template", href: "/streameru/library/outreach-notes-template" },
      { label: "Reputation Hygiene Card", href: "/streameru/library/reputation-hygiene-card" },
    ],
  },

  "community-capstone-community-appreciation-event": {
    id: "mission-74-community-capstone",
    mission_title: "Session: Community Appreciation Capstone LIVE",
    mission_description:
      "Assemble the Capstone evidence packet and host a Community Appreciation Event with a timed run-of-show and same-day after-action review.",
    mission_steps: steps(
      [
        "Assemble the Community Capstone Evidence Checklist and Community Appreciation Event Run of Show.",
        "Confirm After-Action Review Worksheet is ready for same-day filing.",
      ],
      45,
      [
        "Host the appreciation event matching the run-of-show (open, appreciation beat, inclusion move, close return ritual).",
        "Complete the After-Action Review Worksheet the same day and file the evidence packet.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a reviewable Community Appreciation Event with complete Capstone packet — belonging proof, not banner vibes.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Community Appreciation Event Run of Show",
        href: "/streameru/library/community-appreciation-event-run-of-show",
      },
      {
        label: "Community Capstone Evidence Checklist",
        href: "/streameru/library/community-capstone-evidence-checklist",
      },
      {
        label: "After-Action Review Worksheet",
        href: "/streameru/library/after-action-review-worksheet",
      },
    ],
  },

  // —— Professional Creator Mastery ——

  "positioning-for-money-without-selling-your-soul": {
    id: "mission-75-positioning",
    mission_title: "Session: Positioning LIVE",
    mission_description:
      "Ship positioning + won't-do; say positioning once on LIVE without hard-selling.",
    mission_steps: steps(
      [
        "Complete the Positioning Statement Worksheet and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not earnings).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship positioning + won't-do; say positioning once on LIVE without hard-selling.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Positioning Statement Worksheet", href: "/streameru/library/positioning-statement-worksheet" },
      { label: "Won't-Do List Card", href: "/streameru/library/wont-do-list-card" },
      { label: "Income-Safe Offer Fit Checker", href: "/streameru/library/income-safe-offer-fit-checker" },
    ],
  },

  "offer-design-for-live-creators": {
    id: "mission-76-offer-design",
    mission_title: "Session: Offer Design LIVE",
    mission_description:
      "Complete offer sheet; run primary offer cue once without pressure tactics.",
    mission_steps: steps(
      [
        "Complete the LIVE Offer Sheet and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not earnings).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete offer sheet; run primary offer cue once without pressure tactics.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "LIVE Offer Sheet", href: "/streameru/library/live-offer-sheet" },
      { label: "Primary/Secondary Offer Planner", href: "/streameru/library/primary-secondary-offer-planner" },
      { label: "Offer Ethics Checklist", href: "/streameru/library/offer-ethics-checklist" },
    ],
  },

  "income-systems-and-money-operations": {
    id: "mission-77-income-ops",
    mission_title: "Session: Income Ops Setup",
    mission_description:
      "Install 90-day tracker, buffer rules, and a simple receipt folder from recent activity.",
    mission_steps: steps(
      [
        "Complete the 90-Day Income Tracker and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not earnings).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Install 90-day tracker, buffer rules, and a simple receipt folder from recent activity.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "90-Day Income Tracker", href: "/streameru/library/ninety-day-income-tracker" },
      { label: "Buffer Rules Card", href: "/streameru/library/buffer-rules-card" },
      { label: "Expense Categories Checklist", href: "/streameru/library/expense-categories-checklist" },
    ],
  },

  "reading-business-health-beyond-gift-totals": {
    id: "mission-78-business-health",
    mission_title: "Session: Business Health Snapshot",
    mission_description:
      "Complete 30-day health snapshot; name one concentration risk and one sustainability action.",
    mission_steps: steps(
      [
        "Complete the Business Health Snapshot and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not earnings).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete 30-day health snapshot; name one concentration risk and one sustainability action.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Business Health Snapshot", href: "/streameru/library/business-health-snapshot" },
      { label: "Concentration Risk Scorecard", href: "/streameru/library/concentration-risk-scorecard" },
      { label: "Sustainable Rate Worksheet", href: "/streameru/library/sustainable-rate-worksheet" },
    ],
  },

  "copyright-and-ip-awareness-for-creators": {
    id: "mission-79-ip-audit",
    mission_title: "Session: IP Safer Defaults",
    mission_description:
      "Complete IP risk audit; change one safer default before next LIVE.",
    mission_steps: steps(
      [
        "Complete the IP Risk Audit Checklist and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not earnings).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete IP risk audit; change one safer default before next LIVE.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "IP Risk Audit Checklist", href: "/streameru/library/ip-risk-audit-checklist" },
      { label: "Safer Defaults Card", href: "/streameru/library/safer-defaults-card" },
      { label: "Clip/Music Decision Tree", href: "/streameru/library/clip-music-decision-tree" },
    ],
  },

  "brand-deals-and-partner-communication": {
    id: "mission-80-brand-comms",
    mission_title: "Session: Brand Response Framework",
    mission_description:
      "Score a sample/real inquiry; draft a professional response protecting audience trust.",
    mission_steps: steps(
      [
        "Complete the Brand Inquiry Scorecard and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not earnings).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Score a sample/real inquiry; draft a professional response protecting audience trust.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Brand Inquiry Scorecard", href: "/streameru/library/brand-inquiry-scorecard" },
      { label: "Professional Response Templates", href: "/streameru/library/professional-response-templates" },
      { label: "Audience Trust Protection Checklist", href: "/streameru/library/audience-trust-protection-checklist" },
    ],
  },

  "privacy-security-and-reputation-as-business-assets": {
    id: "mission-81-incident-ready",
    mission_title: "Session: Incident Response Ready",
    mission_description:
      "Write incident checklist; complete a privacy/security hygiene pass.",
    mission_steps: steps(
      [
        "Complete the Incident Response Checklist and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not earnings).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Write incident checklist; complete a privacy/security hygiene pass.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Incident Response Checklist", href: "/streameru/library/incident-response-checklist" },
      { label: "Reputation Risk Audit", href: "/streameru/library/reputation-risk-audit" },
      { label: "Privacy Hygiene Scorecard", href: "/streameru/library/privacy-hygiene-scorecard" },
    ],
  },

  "contracts-literacy-for-creators": {
    id: "mission-82-contracts-literacy",
    mission_title: "Session: Contract Red Flags",
    mission_description:
      "Run red-flag checklist on a sample/past agreement; list five flags or green checks.",
    mission_steps: steps(
      [
        "Complete the Contract Red-Flag Checklist and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not earnings).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Run red-flag checklist on a sample/past agreement; list five flags or green checks.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Contract Red-Flag Checklist", href: "/streameru/library/contract-red-flag-checklist" },
      { label: "Key Terms Decoder Card", href: "/streameru/library/key-terms-decoder-card" },
      { label: "Pause-and-Ask Decision Tree", href: "/streameru/library/pause-and-ask-decision-tree" },
    ],
  },

  "time-capacity-and-saying-no": {
    id: "mission-83-capacity-policy",
    mission_title: "Session: Capacity Policy Week",
    mission_description:
      "Write capacity policy; protect one recovery block; prepare a professional no.",
    mission_steps: steps(
      [
        "Complete the Capacity Policy One-Pager and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not earnings).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Write capacity policy; protect one recovery block; prepare a professional no.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Capacity Policy One-Pager", href: "/streameru/library/capacity-policy-one-pager" },
      { label: "Professional No Scripts", href: "/streameru/library/professional-no-scripts" },
      { label: "Weekly Capacity Planner", href: "/streameru/library/weekly-capacity-planner" },
    ],
  },

  "professional-creator-capstone-creator-operating-manual": {
    id: "mission-84-operating-manual",
    mission_title: "Session: Creator Operating Manual Capstone",
    mission_description:
      "Assemble complete Creator Operating Manual evidence packet for review.",
    mission_steps: steps(
      [
        "Complete the Creator Operating Manual Template and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      40,
      [
        "Assemble the full Creator Operating Manual evidence packet and complete the Capstone Evidence Checklist.",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Assemble complete Creator Operating Manual evidence packet for review.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Creator Operating Manual Template", href: "/streameru/library/creator-operating-manual-template" },
      { label: "Capstone Evidence Checklist", href: "/streameru/library/professional-capstone-evidence-checklist" },
      { label: "90-Day Operating Plan + Review Worksheet", href: "/streameru/library/ninety-day-operating-plan-review" },
    ],
  },

  // —— Production Mastery ——

  "production-decisions-before-gear-purchases": {
    id: "mission-85-setup-audit",
    mission_title: "Session: Setup Audit Before Gear",
    mission_description:
      "Complete setup audit + decision memo; apply one free/low-cost fix before buying.",
    mission_steps: steps(
      [
        "Complete the Setup Audit Worksheet and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (implementation graded — not viewer count).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete setup audit + decision memo; apply one free/low-cost fix before buying.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Setup Audit Worksheet", href: "/streameru/library/setup-audit-worksheet" },
      { label: "Upgrade Decision Memo", href: "/streameru/library/upgrade-decision-memo" },
      { label: "Gear ROI Scorecard", href: "/streameru/library/gear-roi-scorecard" },
    ],
  },

  "lighting-systems-that-make-you-look-intentional": {
    id: "mission-86-lighting-system",
    mission_title: "Session: Intentional Lighting Setup",
    mission_description:
      "Build repeatable lighting for primary LIVE location; photo + diagram evidence.",
    mission_steps: steps(
      [
        "Complete the Lighting Diagram Worksheet and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (implementation graded — not viewer count).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Build repeatable lighting for primary LIVE location; photo + diagram evidence.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Lighting Diagram Worksheet", href: "/streameru/library/lighting-diagram-worksheet" },
      { label: "Lighting Setup Checklist", href: "/streameru/library/lighting-setup-checklist" },
      { label: "Soft-Light Placement Card", href: "/streameru/library/soft-light-placement-card" },
    ],
  },

  "camera-framing-and-visual-hierarchy": {
    id: "mission-87-framing-lock",
    mission_title: "Session: Framing Consistency",
    mission_description:
      "Lock a professional frame across three sessions with reference screenshots.",
    mission_steps: steps(
      [
        "Complete the Framing Checklist and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (implementation graded — not viewer count).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Lock a professional frame across three sessions with reference screenshots.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Framing Checklist", href: "/streameru/library/framing-checklist" },
      { label: "Visual Hierarchy Scorecard", href: "/streameru/library/visual-hierarchy-scorecard" },
      { label: "Reference Frame Card", href: "/streameru/library/reference-frame-card" },
    ],
  },

  "audio-first-clean-sound-wins-trust": {
    id: "mission-88-audio-pass",
    mission_title: "Session: Clean Audio Pass/Fail",
    mission_description:
      "Reach clean-audio standard with test recording pass/fail before LIVE.",
    mission_steps: steps(
      [
        "Complete the Audio Checklist and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (implementation graded — not viewer count).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Reach clean-audio standard with test recording pass/fail before LIVE.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Audio Checklist", href: "/streameru/library/audio-checklist" },
      { label: "Mic Placement Guide", href: "/streameru/library/mic-placement-guide" },
      { label: "Pre-LIVE Audio Pass/Fail Card", href: "/streameru/library/pre-live-audio-pass-fail-card" },
    ],
  },

  "room-design-and-background-as-brand": {
    id: "mission-89-background-brand",
    mission_title: "Session: Background Redesign",
    mission_description:
      "Redesign background for brand clarity; document before/after + rationale.",
    mission_steps: steps(
      [
        "Complete the Background Evaluation Checklist and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (implementation graded — not viewer count).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Redesign background for brand clarity; document before/after + rationale.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Background Evaluation Checklist", href: "/streameru/library/background-evaluation-checklist" },
      { label: "Room Redesign Planner", href: "/streameru/library/room-redesign-planner" },
      { label: "Before/After Rationale Card", href: "/streameru/library/before-after-rationale-card" },
    ],
  },

  "obs-and-scene-discipline-without-overbuilding": {
    id: "mission-90-obs-scenes",
    mission_title: "Session: Three-Scene OBS Discipline",
    mission_description:
      "Build three-scene system + backup plan; rehearse under stress once.",
    mission_steps: steps(
      [
        "Complete the OBS Scene Map Worksheet and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (implementation graded — not viewer count).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Build three-scene system + backup plan; rehearse under stress once.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "OBS Scene Map Worksheet", href: "/streameru/library/obs-scene-map-worksheet" },
      { label: "Scene Startup Checklist", href: "/streameru/library/scene-startup-checklist" },
      { label: "Tech Fail Backup Plan Card", href: "/streameru/library/tech-fail-backup-plan-card" },
    ],
  },

  "mobile-first-production-excellence": {
    id: "mission-91-mobile-kit",
    mission_title: "Session: Mobile Production Endurance",
    mission_description:
      "Complete mobile kit + session log for a 90-minute failure-resistant plan.",
    mission_steps: steps(
      [
        "Complete the Mobile Production Kit List and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (implementation graded — not viewer count).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete mobile kit + session log for a 90-minute failure-resistant plan.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Mobile Production Kit List", href: "/streameru/library/mobile-production-kit-list" },
      { label: "Mobile Session Log", href: "/streameru/library/mobile-session-log" },
      { label: "Power & Heat Checklist", href: "/streameru/library/power-and-heat-checklist" },
    ],
  },

  "accessibility-basics-for-live-viewers": {
    id: "mission-92-accessibility",
    mission_title: "Session: Five Accessibility Upgrades",
    mission_description:
      "Apply five accessibility upgrades to setup/hosting; checklist evidence.",
    mission_steps: steps(
      [
        "Complete the LIVE Accessibility Checklist and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (implementation graded — not viewer count).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Apply five accessibility upgrades to setup/hosting; checklist evidence.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "LIVE Accessibility Checklist", href: "/streameru/library/live-accessibility-checklist" },
      { label: "Overlay Contrast Card", href: "/streameru/library/overlay-contrast-card" },
      { label: "Inclusive Hosting Habits Card", href: "/streameru/library/inclusive-hosting-habits-card" },
    ],
  },

  "troubleshooting-under-pressure": {
    id: "mission-93-triage-drill",
    mission_title: "Session: Tech Triage Drill",
    mission_description:
      "Recover a simulated failure with triage tree in under two minutes; document.",
    mission_steps: steps(
      [
        "Complete the Tech Triage Card and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (implementation graded — not viewer count).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Recover a simulated failure with triage tree in under two minutes; document.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Tech Triage Card", href: "/streameru/library/tech-triage-card" },
      { label: "Failure Recovery Runbook", href: "/streameru/library/failure-recovery-runbook" },
      { label: "Post-Incident Production Review", href: "/streameru/library/post-incident-production-review" },
    ],
  },

  "production-capstone-your-signature-look": {
    id: "mission-94-signature-look",
    mission_title: "Session: Signature Look Capstone",
    mission_description:
      "Assemble production bible + demo evidence packet for signature look review.",
    mission_steps: steps(
      [
        "Complete the Production Bible One-Pager and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      40,
      [
        "Assemble the full Production Bible + Signature Look demo evidence packet and complete the Capstone Evidence Portfolio Checklist.",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Assemble production bible + demo evidence packet for signature look review.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Production Bible One-Pager", href: "/streameru/library/production-bible-one-pager" },
      { label: "Signature Look Demo Checklist", href: "/streameru/library/signature-look-demo-checklist" },
      { label: "Capstone Evidence Portfolio Checklist", href: "/streameru/library/production-capstone-evidence-checklist" },
    ],
  },

  // —— Battle Mastery ——

  "battle-strategy-beyond-basics": {
    id: "mission-95-matchup",
    mission_title: "Session: Matchup Strategy",
    mission_description:
      "Score next 3 invites; accept or refuse with written rationale.",
    mission_steps: steps(
      [
        "Complete the Matchup Scorecard and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not gift totals).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Score next 3 invites; accept or refuse with written rationale.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Matchup Scorecard", href: "/streameru/library/matchup-scorecard" },
      { label: "Battle Refusal Decision Tree", href: "/streameru/library/battle-refusal-decision-tree" },
      { label: "Invite Evaluation Checklist", href: "/streameru/library/invite-evaluation-checklist" },
    ],
  },

  "energy-architecture-for-timed-battles": {
    id: "mission-96-energy-map",
    mission_title: "Session: Battle Energy Architecture",
    mission_description:
      "Run one battle/rehearsal from a written energy map without desperate finals.",
    mission_steps: steps(
      [
        "Complete the Battle Energy Map and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not gift totals).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Run one battle/rehearsal from a written energy map without desperate finals.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Battle Energy Map", href: "/streameru/library/battle-energy-map" },
      { label: "Round Pacing Card", href: "/streameru/library/round-pacing-card" },
      { label: "Mid-Battle Reset Scripts", href: "/streameru/library/mid-battle-reset-scripts" },
    ],
  },

  "partner-ecosystems-and-reputation": {
    id: "mission-97-partner-roster",
    mission_title: "Session: Partner Ecosystem Plan",
    mission_description:
      "Build 8–12 name partner pipeline with fairness norms.",
    mission_steps: steps(
      [
        "Complete the Partner Roster Planner and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not gift totals).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Build 8–12 name partner pipeline with fairness norms.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Partner Roster Planner", href: "/streameru/library/partner-roster-planner" },
      { label: "Fairness Norms Card", href: "/streameru/library/fairness-norms-card" },
      { label: "Partner Outreach Script", href: "/streameru/library/partner-outreach-script" },
    ],
  },

  "clutch-hosting-and-crowd-turning": {
    id: "mission-98-ethical-clutch",
    mission_title: "Session: Ethical Clutch Practice",
    mission_description:
      "Practice clutch phrase bank with ethics rules — no guilt lines.",
    mission_steps: steps(
      [
        "Complete the Clutch Phrase Bank and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not gift totals).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Practice clutch phrase bank with ethics rules — no guilt lines.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Clutch Phrase Bank", href: "/streameru/library/clutch-phrase-bank" },
      { label: "Clutch Ethics Rules Card", href: "/streameru/library/clutch-ethics-rules-card" },
      { label: "Crowd Turning Checklist", href: "/streameru/library/crowd-turning-checklist" },
    ],
  },

  "battle-production-and-on-screen-clarity": {
    id: "mission-99-battle-clarity",
    mission_title: "Session: Battle Production Clarity",
    mission_description:
      "Hit 100% on battle production clarity checklist in battle or rehearsal.",
    mission_steps: steps(
      [
        "Complete the Battle Production Checklist and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not gift totals).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Hit 100% on battle production clarity checklist in battle or rehearsal.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Battle Production Checklist", href: "/streameru/library/battle-production-checklist" },
      { label: "Overlay Clarity Card", href: "/streameru/library/overlay-clarity-card" },
      { label: "Battle Audio/Video Check", href: "/streameru/library/battle-audio-video-check" },
    ],
  },

  "battle-analytics-and-debrief-mastery": {
    id: "mission-100-debrief",
    mission_title: "Session: Athlete Debrief",
    mission_description:
      "Complete debrief that names one behavior change for next battle.",
    mission_steps: steps(
      [
        "Complete the Battle Debrief Template and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not gift totals).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete debrief that names one behavior change for next battle.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Battle Debrief Template", href: "/streameru/library/battle-debrief-template" },
      { label: "Battle Performance Scorecard", href: "/streameru/library/battle-performance-scorecard" },
      { label: "Battle Improvement Experiment Log", href: "/streameru/library/battle-improvement-experiment-log" },
    ],
  },

  "multi-battle-nights-and-event-pacing": {
    id: "mission-101-event-pace",
    mission_title: "Session: Multi-Battle Night Plan",
    mission_description:
      "Plan multi-battle night with recovery blocks and narrative continuity.",
    mission_steps: steps(
      [
        "Complete the Multi-Battle Night Planner and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not gift totals).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Plan multi-battle night with recovery blocks and narrative continuity.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Multi-Battle Night Planner", href: "/streameru/library/multi-battle-night-planner" },
      { label: "Recovery Block Card", href: "/streameru/library/recovery-block-card" },
      { label: "Event Narrative Continuity Sheet", href: "/streameru/library/event-narrative-continuity-sheet" },
    ],
  },

  "battle-capstone-signature-battle-system": {
    id: "mission-102-signature-week",
    mission_title: "Session: Signature Battle System Capstone",
    mission_description:
      "Assemble playbook + week evidence packet for signature battle system.",
    mission_steps: steps(
      [
        "Complete the Signature Battle System Playbook and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      40,
      [
        "Assemble the Signature Battle System Playbook + week evidence packet and complete the Battle Week Evidence Checklist.",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Assemble playbook + week evidence packet for signature battle system.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Signature Battle System Playbook", href: "/streameru/library/signature-battle-system-playbook" },
      { label: "Battle Week Evidence Checklist", href: "/streameru/library/battle-week-evidence-checklist" },
      { label: "Capstone Week Results Review", href: "/streameru/library/capstone-week-results-review" },
    ],
  },

  // —— Music LIVE Mastery ——

  "music-live-formats-that-work": {
    id: "mission-103-music-format",
    mission_title: "Session: Music Format Choice",
    mission_description:
      "Choose primary + secondary Music LIVE formats and write a sample run-of-show.",
    mission_steps: steps(
      [
        "Complete the Format Choice Worksheet and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers or gifts).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Choose primary + secondary Music LIVE formats and write a sample run-of-show.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Format Choice Worksheet", href: "/streameru/library/format-choice-worksheet" },
      { label: "Sample Run-of-Show Template", href: "/streameru/library/sample-run-of-show-template" },
      { label: "Format Fit Scorecard", href: "/streameru/library/format-fit-scorecard" },
    ],
  },

  "performance-audio-for-musicians-on-live": {
    id: "mission-104-music-audio",
    mission_title: "Session: Music Sound Check",
    mission_description:
      "Complete signal-flow map, sound check, and short test clip (OBS or TikTok LIVE Studio path documented).",
    mission_steps: steps(
      [
        "Complete the Music Audio Checklist and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers or gifts).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete signal-flow map, sound check, and short test clip (OBS or TikTok LIVE Studio path documented).",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Music Audio Checklist", href: "/streameru/library/music-audio-checklist" },
      { label: "Signal-Flow Map Worksheet", href: "/streameru/library/signal-flow-map-worksheet" },
      { label: "Sound-Check Sheet", href: "/streameru/library/sound-check-sheet" },
    ],
  },

  "vocal-stamina-and-performance-presence": {
    id: "mission-105-music-stamina",
    mission_title: "Session: Music Stamina Plan",
    mission_description:
      "Build stamina plan + warm-up and run or rehearse a timed music session.",
    mission_steps: steps(
      [
        "Complete the Performance Stamina Plan and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers or gifts).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Build stamina plan + warm-up and run or rehearse a timed music session.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Performance Stamina Plan", href: "/streameru/library/performance-stamina-plan" },
      { label: "Warm-Up Routine Card", href: "/streameru/library/warm-up-routine-card" },
      { label: "Mistake Recovery Scripts", href: "/streameru/library/mistake-recovery-scripts" },
    ],
  },

  "setlists-segments-and-audience-energy": {
    id: "mission-106-music-setlist",
    mission_title: "Session: Setlist Energy Design",
    mission_description:
      "Build two annotated setlists with intentional energy arcs.",
    mission_steps: steps(
      [
        "Complete the Setlist Energy Planner and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers or gifts).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Build two annotated setlists with intentional energy arcs.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Setlist Energy Planner", href: "/streameru/library/setlist-energy-planner" },
      { label: "Two-Setlist Annotation Sheet", href: "/streameru/library/two-setlist-annotation-sheet" },
      { label: "Talk-Break Script Bank", href: "/streameru/library/talk-break-script-bank" },
    ],
  },

  "requests-tips-and-fan-interaction-systems": {
    id: "mission-107-music-requests",
    mission_title: "Session: Request System Install",
    mission_description:
      "Write request policy + explanation script and test in practice or LIVE.",
    mission_steps: steps(
      [
        "Complete the Request Policy Template and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers or gifts).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Write request policy + explanation script and test in practice or LIVE.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Request Policy Template", href: "/streameru/library/request-policy-template" },
      { label: "On-Stream Request Explanation Script", href: "/streameru/library/on-stream-request-explanation-script" },
      { label: "Gift/Shoutout Fairness Card", href: "/streameru/library/gift-shoutout-fairness-card" },
    ],
  },

  "growing-a-music-audience-on-live": {
    id: "mission-108-music-growth",
    mission_title: "Session: Music Growth Plan",
    mission_description:
      "Design and start documenting a four-week music growth plan.",
    mission_steps: steps(
      [
        "Complete the Four-Week Music Growth Plan and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers or gifts).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Design and start documenting a four-week music growth plan.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Four-Week Music Growth Plan", href: "/streameru/library/four-week-music-growth-plan" },
      { label: "Clip Moment Planner", href: "/streameru/library/clip-moment-planner" },
      { label: "Return-Fan Conversion Checklist", href: "/streameru/library/return-fan-conversion-checklist" },
    ],
  },

  "music-rights-and-safer-live-choices": {
    id: "mission-109-music-rights",
    mission_title: "Session: Rights-Safe Repertoire",
    mission_description:
      "Create repertoire risk tiers for your actual song list with safer defaults.",
    mission_steps: steps(
      [
        "Complete the Rights-Safe Repertoire Checklist and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers or gifts).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Create repertoire risk tiers for your actual song list with safer defaults.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Rights-Safe Repertoire Checklist", href: "/streameru/library/rights-safe-repertoire-checklist" },
      { label: "Risk Tiers Worksheet", href: "/streameru/library/risk-tiers-worksheet" },
      { label: "Safer Defaults Decision Card", href: "/streameru/library/safer-defaults-decision-card" },
    ],
  },

  "collab-performances-and-guest-musicians": {
    id: "mission-110-music-collab",
    mission_title: "Session: Music Collab Ops",
    mission_description:
      "Complete collab run-of-show + guest audio plan (rehearsal or documented simulation).",
    mission_steps: steps(
      [
        "Complete the Collab Run-of-Show Template and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers or gifts).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete collab run-of-show + guest audio plan (rehearsal or documented simulation).",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Collab Run-of-Show Template", href: "/streameru/library/collab-run-of-show-template" },
      { label: "Guest Audio Plan Worksheet", href: "/streameru/library/guest-audio-plan-worksheet" },
      { label: "Collab Promo Checklist", href: "/streameru/library/collab-promo-checklist" },
    ],
  },

  "monetizing-music-live-ethically": {
    id: "mission-111-music-monetize",
    mission_title: "Session: Ethical Music Monetization",
    mission_description:
      "Design an ethical monetization layer for your primary format.",
    mission_steps: steps(
      [
        "Complete the Monetization Layer Plan and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers or gifts).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Design an ethical monetization layer for your primary format.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Monetization Layer Plan", href: "/streameru/library/monetization-layer-plan" },
      { label: "Soft CTA Script Bank", href: "/streameru/library/soft-cta-script-bank" },
      { label: "Ethical Offer Boundaries Card", href: "/streameru/library/ethical-offer-boundaries-card" },
    ],
  },

  "music-live-capstone-signature-show": {
    id: "mission-112-music-capstone",
    mission_title: "Session: Signature Music LIVE Capstone",
    mission_description:
      "Deliver and review signature Music LIVE show with full dossier evidence.",
    mission_steps: steps(
      [
        "Complete the Signature Show Dossier Template and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      40,
      [
        "Assemble the Signature Show Dossier + evidence checklist and complete replay review.",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Deliver and review signature Music LIVE show with full dossier evidence.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Signature Show Dossier Template", href: "/streameru/library/signature-show-dossier-template" },
      { label: "Capstone Evidence Checklist", href: "/streameru/library/capstone-evidence-checklist-music" },
      { label: "Replay Review Scorecard", href: "/streameru/library/replay-review-scorecard-music" },
    ],
  },

  // —— Gaming LIVE Mastery ——

  "choosing-your-gaming-live-setup": {
    id: "mission-113-gaming-setup",
    mission_title: "Session: Gaming Setup Decision",
    mission_description:
      "Choose a primary gaming LIVE setup path with source-flow map and beginner fallback.",
    mission_steps: steps(
      [
        "Complete the Gaming Setup Decision Matrix and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers, gifts, wins, or rank).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Choose a primary gaming LIVE setup path with source-flow map and beginner fallback.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Gaming Setup Decision Matrix", href: "/streameru/library/gaming-setup-decision-matrix" },
      { label: "Source-Flow Diagram Worksheet", href: "/streameru/library/source-flow-diagram-worksheet-gaming" },
      { label: "Beginner Setup Checklist", href: "/streameru/library/beginner-gaming-setup-checklist" },
    ],
  },

  "gaming-commentary-systems-that-survive-high-focus": {
    id: "mission-114-gaming-commentary",
    mission_title: "Session: Commentary Loop",
    mission_description:
      "Build a commentary loop card for your primary game type and practice dead-air recovery.",
    mission_steps: steps(
      [
        "Complete the Commentary Loop Card and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers, gifts, wins, or rank).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Build a commentary loop card for your primary game type and practice dead-air recovery.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Commentary Loop Card", href: "/streameru/library/commentary-loop-card" },
      { label: "Game-Type Commentary Map", href: "/streameru/library/game-type-commentary-map" },
      { label: "Dead-Air Recovery Scripts", href: "/streameru/library/dead-air-recovery-scripts-gaming" },
    ],
  },

  "reading-chat-without-losing-the-game": {
    id: "mission-115-gaming-chat",
    mission_title: "Session: Chat-Reading Plan",
    mission_description:
      "Install a chat-reading plan with safe-moment timing and new-viewer context scripts.",
    mission_steps: steps(
      [
        "Complete the Chat-Reading Plan and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers, gifts, wins, or rank).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Install a chat-reading plan with safe-moment timing and new-viewer context scripts.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Chat-Reading Plan", href: "/streameru/library/chat-reading-plan-gaming" },
      { label: "Safe-Moment Timing Card", href: "/streameru/library/safe-moment-timing-card" },
      { label: "New-Viewer Context Scripts", href: "/streameru/library/new-viewer-context-scripts" },
    ],
  },

  "game-audio-mic-balance-and-discord-routing": {
    id: "mission-116-gaming-audio",
    mission_title: "Session: Gaming Audio Balance",
    mission_description:
      "Complete audio-routing map and mic-vs-game balance pass (Discord/party included where used).",
    mission_steps: steps(
      [
        "Complete the Audio-Routing Map and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers, gifts, wins, or rank).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete audio-routing map and mic-vs-game balance pass (Discord/party included where used).",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Audio-Routing Map", href: "/streameru/library/audio-routing-map-gaming" },
      { label: "Mic-vs-Game Balance Checklist", href: "/streameru/library/mic-vs-game-balance-checklist" },
      { label: "Discord Routing Worksheet", href: "/streameru/library/discord-routing-worksheet" },
    ],
  },

  "tiktok-live-studio-for-gaming": {
    id: "mission-117-gaming-live-studio",
    mission_title: "Session: LIVE Studio Gaming Setup",
    mission_description:
      "Complete TikTok LIVE Studio gaming checklist and scene plan on a no-stream-key path.",
    mission_steps: steps(
      [
        "Complete the TikTok LIVE Studio Gaming Checklist and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers, gifts, wins, or rank).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete TikTok LIVE Studio gaming checklist and scene plan on a no-stream-key path.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "TikTok LIVE Studio Gaming Checklist", href: "/streameru/library/tiktok-live-studio-gaming-checklist" },
      { label: "LIVE Studio Scene Plan", href: "/streameru/library/live-studio-scene-plan-gaming" },
      { label: "LIVE Studio Audio Device Card", href: "/streameru/library/live-studio-audio-device-card" },
    ],
  },

  "obs-for-gaming-and-stream-key-reality": {
    id: "mission-118-gaming-obs",
    mission_title: "Session: OBS Gaming + Key Reality",
    mission_description:
      "Build OBS gaming scene plan, stream-key safety card, and single-PC performance checklist.",
    mission_steps: steps(
      [
        "Complete the OBS Gaming Scene Plan and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers, gifts, wins, or rank).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Build OBS gaming scene plan, stream-key safety card, and single-PC performance checklist.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "OBS Gaming Scene Plan", href: "/streameru/library/obs-gaming-scene-plan" },
      { label: "Stream-Key Safety Card", href: "/streameru/library/stream-key-safety-card" },
      { label: "Single-PC Performance Checklist", href: "/streameru/library/single-pc-performance-checklist" },
    ],
  },

  "obs-virtual-camera-into-tiktok-live-studio": {
    id: "mission-119-gaming-virtual-cam",
    mission_title: "Session: Virtual Camera Proof",
    mission_description:
      "Prove OBS Virtual Camera into LIVE Studio with separate audio routing and recovery card.",
    mission_steps: steps(
      [
        "Complete the OBS Virtual Camera Checklist and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers, gifts, wins, or rank).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Prove OBS Virtual Camera into LIVE Studio with separate audio routing and recovery card.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "OBS Virtual Camera Checklist", href: "/streameru/library/obs-virtual-camera-checklist" },
      { label: "Dual-App Audio Routing Map", href: "/streameru/library/dual-app-audio-routing-map" },
      { label: "Virtual Camera Recovery Card", href: "/streameru/library/virtual-camera-recovery-card" },
    ],
  },

  "console-capture-and-party-chat-routing": {
    id: "mission-120-gaming-console",
    mission_title: "Session: Console Capture Map",
    mission_description:
      "Map console → capture card → OBS or LIVE Studio with party-chat audio plan.",
    mission_steps: steps(
      [
        "Complete the Console Routing Map and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers, gifts, wins, or rank).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Map console → capture card → OBS or LIVE Studio with party-chat audio plan.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Console Routing Map", href: "/streameru/library/console-routing-map" },
      { label: "Capture-Card Connection Checklist", href: "/streameru/library/capture-card-connection-checklist" },
      { label: "Party-Chat Audio Plan", href: "/streameru/library/party-chat-audio-plan" },
    ],
  },

  "mobile-gaming-live-workflows": {
    id: "mission-121-gaming-mobile",
    mission_title: "Session: Mobile Gaming Safety",
    mission_description:
      "Complete mobile gaming checklist, notification safety pass, and mirror test sheet.",
    mission_steps: steps(
      [
        "Complete the Mobile Gaming Checklist and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers, gifts, wins, or rank).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Complete mobile gaming checklist, notification safety pass, and mirror test sheet.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Mobile Gaming Checklist", href: "/streameru/library/mobile-gaming-checklist" },
      { label: "Notification Safety Card", href: "/streameru/library/notification-safety-card" },
      { label: "Mobile Mirror Test Sheet", href: "/streameru/library/mobile-mirror-test-sheet" },
    ],
  },

  "vertical-layouts-alerts-soundboards-and-tikfinity": {
    id: "mission-122-gaming-tikfinity",
    mission_title: "Session: Alerts & TikFinity Discipline",
    mission_description:
      "Build soundboard plan, TikFinity trigger map with cooldowns, and alert-volume checklist.",
    mission_steps: steps(
      [
        "Complete the Soundboard Planning Worksheet and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers, gifts, wins, or rank).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Build soundboard plan, TikFinity trigger map with cooldowns, and alert-volume checklist.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Soundboard Planning Worksheet", href: "/streameru/library/soundboard-planning-worksheet" },
      { label: "TikFinity Trigger Map", href: "/streameru/library/tikfinity-trigger-map" },
      { label: "Alert-Volume Checklist", href: "/streameru/library/alert-volume-checklist" },
    ],
  },

  "gaming-community-moderation-troubleshooting-and-growth": {
    id: "mission-123-gaming-community",
    mission_title: "Session: Community + Troubleshooting",
    mission_description:
      "Install community rules, troubleshooting decision tree, and tournament run-of-show.",
    mission_steps: steps(
      [
        "Complete the Gaming Community Rules Template and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      45,
      [
        "Run the LIVE / execution step from the lesson mission (execution graded — not viewers, gifts, wins, or rank).",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Install community rules, troubleshooting decision tree, and tournament run-of-show.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Gaming Community Rules Template", href: "/streameru/library/gaming-community-rules-template" },
      { label: "Troubleshooting Decision Tree", href: "/streameru/library/troubleshooting-decision-tree-gaming" },
      { label: "Tournament Run-of-Show", href: "/streameru/library/tournament-run-of-show" },
    ],
  },

  "gaming-live-capstone-signature-show": {
    id: "mission-124-gaming-capstone",
    mission_title: "Session: Signature Gaming LIVE Capstone",
    mission_description:
      "Deliver and review signature Gaming LIVE show with full dossier evidence.",
    mission_steps: steps(
      [
        "Complete the Signature Gaming Show Dossier Template and supporting downloads for this lesson.",
        "File pages where Capstone evidence will be assembled later.",
      ],
      40,
      [
        "Assemble the Signature Gaming Show Dossier + evidence checklist and complete replay review.",
        "Write a two-line note: what you shipped and what you will keep next week.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Deliver and review signature Gaming LIVE show with full dossier evidence.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Signature Gaming Show Dossier Template", href: "/streameru/library/signature-gaming-show-dossier-template" },
      { label: "Capstone Evidence Checklist", href: "/streameru/library/capstone-evidence-checklist-gaming" },
      { label: "Replay Review Scorecard", href: "/streameru/library/replay-review-scorecard-gaming" },
    ],
  },






  "presence-capstone-signature-20-minute-live": {
    id: "mission-42-presence-capstone",
    mission_title: "Session: Signature 20-Minute LIVE Capstone",
    mission_description:
      "Deliver your signature 20-minute LIVE with full evidence package — run of show, opening, pacing, story, chat plan, recovery, close, and replay review.",
    mission_steps: steps(
      [
        "Assemble the Signature LIVE Run of Show and Presence Evidence Package Checklist (all required pages).",
        "Record a short before snapshot of your presence goals vs Advanced Creator baseline notes.",
      ],
      45,
      [
        "Deliver a continuous signature block of at least 20 minutes matching the run of show.",
        "Complete replay self-review rubric and before/after comparison the same day; file the evidence package.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Produce a reviewable signature 20-minute LIVE portfolio artifact with scored self-review — not virality metrics.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Signature LIVE Run of Show",
        href: "/streameru/library/signature-live-run-of-show",
      },
      {
        label: "Presence Evidence Package Checklist",
        href: "/streameru/library/presence-evidence-package-checklist",
      },
      {
        label: "Presence Replay Review Rubric",
        href: "/streameru/library/presence-replay-review-rubric",
      },
    ],
  },

  // —— Content Creation Mastery ——
  "finding-your-niche-without-boxing-yourself-in": {
    id: "mission-43-niche-proof",
    mission_title: "Session: Niche Proof LIVE",
    mission_description:
      "Write your niche statement and in/out boundaries, then run a LIVE that stays inside those boundaries.",
    mission_steps: steps(
      [
        "Complete the Niche Statement Worksheet and In/Out Boundary Card before you go live.",
        "Circle three topics that are IN for today and one topic you will refuse if chat pulls you OUT.",
      ],
      45,
      [
        "Open by stating what this show is for in one clear sentence.",
        "Stay inside your IN list for the full session; if you drift, name the reset and return.",
        "Within 15 minutes of ending, fill the Niche Proof LIVE Log (kept / drifted / one sharpen).",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a written niche statement + boundary card plus a 45+ minute LIVE that stayed inside those boundaries — behavior proof, not viewer count.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Niche Statement Worksheet", href: "/streameru/library/niche-statement-worksheet" },
      { label: "In/Out Boundary Card", href: "/streameru/library/in-out-boundary-card" },
      { label: "Niche Proof LIVE Log", href: "/streameru/library/niche-proof-live-log" },
    ],
  },

  "becoming-memorable-on-live": {
    id: "mission-44-memorability",
    mission_title: "Session: Memorability Kit LIVE",
    mission_description:
      "Design three signature elements and use all three in one LIVE so a friend could describe your show.",
    mission_steps: steps(
      [
        "Complete the Memorability Kit (three signatures) and Signature Moment Planner before you go live.",
        "Write the exact open phrase / visual cue / emotional texture you will run today.",
      ],
      45,
      [
        "Use all three signature elements at least once in a planned way (not only if mood hits).",
        "After ending, fill the Friend-Describe Test Card as if a stranger watched for five minutes.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Run a 45+ minute LIVE that delivers three planned signature elements with a completed Friend-Describe Test — memorability by design.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Memorability Kit", href: "/streameru/library/memorability-kit" },
      { label: "Signature Moment Planner", href: "/streameru/library/signature-moment-planner" },
      { label: "Friend-Describe Test Card", href: "/streameru/library/friend-describe-test-card" },
    ],
  },

  "creating-recurring-segments-viewers-expect": {
    id: "mission-45-segment-bible",
    mission_title: "Session: Two Segments Launch LIVE",
    mission_description:
      "Launch two named recurring segments with clear rules, length, and payoff — beyond unnamed retention loops.",
    mission_steps: steps(
      [
        "Complete Segment Bible entries for two named segments (rules, length, payoff, viewer promise).",
        "Fill the Two-Segment Launch Plan with when each segment runs today.",
      ],
      45,
      [
        "Run both named segments on LIVE with spoken names and clear starts/ends.",
        "Score both with the Segment Replay Rubric the same day.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship two named segment bible entries and execute both on a 45+ minute LIVE with replay scores.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Segment Bible Template", href: "/streameru/library/segment-bible-template" },
      { label: "Two-Segment Launch Plan", href: "/streameru/library/two-segment-launch-plan" },
      { label: "Segment Replay Rubric", href: "/streameru/library/segment-replay-rubric" },
    ],
  },

  "running-themed-weeks": {
    id: "mission-46-themed-week",
    mission_title: "Session: Themed Week Kickoff LIVE",
    mission_description:
      "Plan a real themed week with daily angles and a finale, then kick it off on LIVE.",
    mission_steps: steps(
      [
        "Complete the Themed Week Planner (theme, daily angles Mon–Sun or your real cadence, finale).",
        "Fill today's Daily Angle Card and the Week Finale Checklist draft.",
      ],
      45,
      [
        "Open naming the week theme and today's angle; protect the angle for the session.",
        "Close with tomorrow's angle tease (a promise you will keep).",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Kick off a written themed week with a 45+ minute LIVE that delivers today's angle and teases tomorrow honestly.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Themed Week Planner", href: "/streameru/library/themed-week-planner" },
      { label: "Daily Angle Card", href: "/streameru/library/daily-angle-card" },
      { label: "Week Finale Checklist", href: "/streameru/library/week-finale-checklist" },
    ],
  },

  "story-arcs-across-multiple-lives": {
    id: "mission-47-arc-map",
    mission_title: "Session: Arc Checkpoint LIVE",
    mission_description:
      "Design a 3–7 session story arc and run one checkpoint LIVE with a clear unfinished loop.",
    mission_steps: steps(
      [
        "Complete the Multi-LIVE Arc Map (sessions, checkpoints, finale) and Checkpoint Checklist for today.",
        "Write the unfinished loop you will leave open and the payoff session it points to.",
      ],
      45,
      [
        "Deliver today's checkpoint beat and leave one honest unfinished loop (no fake cliffhangers).",
        "Fill the Arc Debrief Sheet: what advanced, what stalled, next checkpoint.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship an arc map and run a 45+ minute checkpoint LIVE that advances the arc without scripted drama.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Multi-LIVE Arc Map", href: "/streameru/library/multi-live-arc-map" },
      { label: "Checkpoint Checklist", href: "/streameru/library/checkpoint-checklist" },
      { label: "Arc Debrief Sheet", href: "/streameru/library/arc-debrief-sheet" },
    ],
  },

  "community-events-on-live": {
    id: "mission-48-community-event",
    mission_title: "Session: Community Event LIVE",
    mission_description:
      "Produce and host one community event with a run-of-show and a five-day promo checklist.",
    mission_steps: steps(
      [
        "Complete the Event Run-of-Show and Five-Day Promo Checklist (even if promo window is shortened, mark what you actually did).",
        "Define roles, start/end, and one invite-a-friend reason.",
      ],
      45,
      [
        "Host the event LIVE following the run-of-show; use kill-switches if chaos spikes.",
        "Complete the Event After-Action Review the same day.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Host a planned community event LIVE with run-of-show proof and after-action notes — execution over crowd size.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Event Run-of-Show", href: "/streameru/library/event-run-of-show" },
      { label: "Five-Day Promo Checklist", href: "/streameru/library/five-day-promo-checklist" },
      { label: "Event After-Action Review", href: "/streameru/library/event-after-action-review" },
    ],
  },

  "interactive-shows-that-arent-chaos": {
    id: "mission-49-interactive-format",
    mission_title: "Session: Interactive Format LIVE",
    mission_description:
      "Build one interactive show format with rules, roles, and kill-switches — then run it without losing the host seat.",
    mission_steps: steps(
      [
        "Complete the Interactive Format Card and Roles & Kill-Switch Sheet before you go live.",
        "Rehearse the kill-switch line out loud once.",
      ],
      45,
      [
        "Run the interactive format for a planned block; use a kill-switch if chat spikes into chaos.",
        "Score the block with the Interactive Replay Rubric.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Run a hostable interactive format on a 45+ minute LIVE with rules, roles, and a used-or-ready kill-switch.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Interactive Format Card", href: "/streameru/library/interactive-format-card" },
      { label: "Roles & Kill-Switch Sheet", href: "/streameru/library/roles-kill-switch-sheet" },
      { label: "Interactive Replay Rubric", href: "/streameru/library/interactive-replay-rubric" },
    ],
  },

  "seasonal-content-without-gimmicks": {
    id: "mission-50-seasonal-calendar",
    mission_title: "Session: Season Peak LIVE",
    mission_description:
      "Build a 90-day seasonal calendar with three peaks, then run one LIVE aligned to a real season peak — not forced trend bait.",
    mission_steps: steps(
      [
        "Complete the 90-Day Seasonal Calendar and Season Peak Planner (three peaks).",
        "Fill the Season Keep/Cut List for today's peak (what fits your niche vs gimmick).",
      ],
      45,
      [
        "Run a LIVE that serves one calendar peak honestly inside your niche boundaries.",
        "Log keep/cut decisions after the session.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Ship a 90-day seasonal calendar and execute one peak-aligned 45+ minute LIVE without gimmick chasing.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "90-Day Seasonal Calendar",
        href: "/streameru/library/ninety-day-seasonal-calendar",
      },
      { label: "Season Peak Planner", href: "/streameru/library/season-peak-planner" },
      { label: "Season Keep/Cut List", href: "/streameru/library/season-keep-cut-list" },
    ],
  },

  "building-anticipation-before-and-during-live": {
    id: "mission-51-anticipation",
    mission_title: "Session: Anticipation System LIVE",
    mission_description:
      "Install anticipation across pre-LIVE, mid-LIVE, and end-LIVE — and keep at least one promise you make.",
    mission_steps: steps(
      [
        "Complete the Anticipation Playbook (pre / mid / end) and Tease-to-Payoff Card for today.",
        "Write one promise you will keep before the next LIVE.",
      ],
      45,
      [
        "Deliver pre-tease (bio/title/open), one mid-LIVE unfinished loop, and an end-LIVE next-time promise.",
        "Add the kept (or broken) promise to the Kept Promise Log the same day — honesty required.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Run anticipation pre/mid/end on a 45+ minute LIVE and log one kept promise — trust over hype.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Anticipation Playbook", href: "/streameru/library/anticipation-playbook" },
      { label: "Kept Promise Log", href: "/streameru/library/kept-promise-log" },
      { label: "Tease-to-Payoff Card", href: "/streameru/library/tease-to-payoff-card" },
    ],
  },

  "content-creation-capstone-7-day-themed-live-series": {
    id: "mission-52-cc-capstone",
    mission_title: "Session: 7-Day Series Kickoff LIVE",
    mission_description:
      "Assemble the Capstone evidence package and kick off your 7-day themed LIVE series on a real LIVE.",
    mission_steps: steps(
      [
        "Complete the Capstone Evidence Checklist and 7-Day Series Planner (theme, daily angles, segments, anticipation, reinvention keep/change/test).",
        "File niche statement, segment bibles, and anticipation playbook into the Capstone folder.",
      ],
      45,
      [
        "Kick off Day 1 of the series on LIVE: name the theme, deliver today's angle, tease Day 2.",
        "Start the seven-day clock and begin Series Review Scorecard notes the same day.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal:
      "Kick off a reviewable 7-day themed LIVE series with a complete plan packet and a real Day-1 LIVE — portfolio evidence, not virality.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
      {
        label: "Capstone Evidence Checklist",
        href: "/streameru/library/cc-capstone-evidence-checklist",
      },
      { label: "7-Day Series Planner", href: "/streameru/library/seven-day-series-planner" },
      { label: "Series Review Scorecard", href: "/streameru/library/series-review-scorecard" },
    ],
  },
};

export function getMissionForLessonSlug(slug: string): TrainingMission | null {
  return TRAINING_MISSIONS_BY_SLUG[slug] ?? null;
}
