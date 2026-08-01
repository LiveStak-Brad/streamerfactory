/**
 * Bootstrap Creator Wellness & Longevity Mastery library plus missing lesson/quiz stubs.
 * Run: node scripts/tmp-cwl-bootstrap.mjs
 * Idempotent: never overwrites an existing lesson or quiz body.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

/** [slug, title, [download ids], lessonFocus, [field labels], [done-when items]] */
const LESSONS = [
  [
    "building-a-career-that-lasts",
    "Building a Career That Lasts",
    ["longevity-career-map", "decade-definition-worksheet", "consistency-over-intensity-card"],
    "a creator career sized for years instead of a single strong season",
    [
      "The work, audience, and life you want to still have in five to ten years",
      "Your weekly floor: the schedule you can hold during a bad week",
      "Career assets to build this quarter (skills, relationships, systems, owned contacts)",
    ],
    [
      "A weekly floor is written and is smaller than your best week",
      "Stop conditions and pause conditions are decided in advance",
      "One dated change is recorded for the Personal Creator Longevity Plan",
    ],
  ],
  [
    "preventing-creator-burnout",
    "Preventing Creator Burnout",
    ["burnout-early-warning-dashboard", "recovery-week-plan", "streaming-fatigue-audit"],
    "early warning signs, load management, and scheduled recovery",
    [
      "This week's early-warning ratings (dread, detachment, prep shrinkage, sleep change)",
      "Which load dial you are reducing first: volume, intensity, or density",
      "Recovery week dates, what you keep, and what you drop",
    ],
    [
      "Warning thresholds are written with the action each one triggers",
      "A sick-day protocol and pre-written announcement exist",
      "One dated change is recorded for the Personal Creator Longevity Plan",
    ],
  ],
  [
    "physical-health-for-long-streaming-sessions",
    "Physical Health for Long Streaming Sessions",
    ["ergonomic-workstation-guide", "voice-care-checklist", "stretch-and-hydration-routine"],
    "neutral posture, movement breaks, voice care, and hydration during long sessions",
    [
      "Monitor, camera, chair, and desk measurements after adjustment",
      "Break cue you will use (segment change, timer, or scene switch)",
      "Voice warm-up, hydration, and vocal rest plan for your heaviest day",
    ],
    [
      "Workstation adjusted toward neutral posture and photographed",
      "Movement and eye breaks are scheduled inside the session, not after it",
      "Persistent pain, hoarseness, or injury is routed to a licensed clinician",
    ],
  ],
  [
    "mental-resilience-and-handling-online-pressure",
    "Mental Resilience & Handling Online Pressure",
    ["aftercare-routine-card", "comparison-rules-worksheet", "criticism-response-framework"],
    "criticism triage, comparison rules, and a post-session come-down routine",
    [
      "Your criticism buckets: actionable, opinion, attack — and the rule for each",
      "Comparison rules (who you study, when, and for how long)",
      "Your first thirty minutes after ending a session",
    ],
    [
      "A written reply/log/mute/report rule exists before the next session",
      "Analytics and comments are delayed until after the come-down routine",
      "Clinical concerns are routed to a licensed mental health professional",
    ],
  ],
  [
    "time-management-and-sustainable-schedules",
    "Time Management & Sustainable Schedules",
    ["weekly-energy-calendar", "recovery-day-planner", "sleep-and-batching-planner"],
    "energy budgeting, batching, protected sleep, and a real recovery day",
    [
      "Your high-energy and low-energy blocks across a normal week",
      "Batched work blocks (editing, thumbnails, admin, community)",
      "Protected sleep window and post-session wind-down",
    ],
    [
      "The week has a floor, a ceiling, and one full recovery day",
      "A capacity check and decline script exist for new requests",
      "One dated schedule change is recorded for the Capstone",
    ],
  ],
  [
    "financial-wellness-for-variable-income",
    "Financial Wellness for Variable Income",
    ["income-variability-buffer-plan", "slow-month-playbook", "personal-tax-savings-checklist"],
    "personal income smoothing, emergency buffers, tax awareness, and slow months",
    [
      "Trailing median monthly income and the personal baseline you will pay yourself",
      "Buffer target in months of essential personal expenses, and funding rule",
      "Tax set-aside percentage, destination account, and professional you will confirm with",
    ],
    [
      "Baseline, buffer, and set-aside percentage are written and dated",
      "A slow-month playbook exists with tiered, pre-decided cuts",
      "Business accounting and contracts are left to Professional Creator Mastery",
    ],
  ],
  [
    "healthy-relationships-and-personal-boundaries",
    "Healthy Relationships & Personal Boundaries",
    ["boundary-worksheet", "partner-family-communication-card", "privacy-expectations-guide"],
    "published boundaries, parasocial limits, household agreements, and privacy",
    [
      "What you share, what stays private, and when you are reachable",
      "Household agreements: quiet hours, shared spaces, on-camera consent",
      "Privacy sweep results for background, audio, and account separation",
    ],
    [
      "Boundaries are written in language you can repeat calmly on air",
      "A household check-in is scheduled, not improvised",
      "One dated change is recorded for the Personal Creator Longevity Plan",
    ],
  ],
  [
    "maintaining-creativity-for-years",
    "Maintaining Creativity for Years",
    ["creative-recovery-menu", "inspiration-input-diet", "creativity-capacity-scorecard"],
    "creative capacity, deliberate inputs, format rotation, and recovery",
    [
      "Capacity ratings: backlog depth, novelty appetite, dread level, time to first idea",
      "Inputs from outside your niche you will schedule this month",
      "Formats to rotate, rest, or retire on purpose",
    ],
    [
      "A recovery menu is written before it is needed",
      "An exploration slot is protected from early metric judgment",
      "One dated change is recorded for the Capstone",
    ],
  ],
  [
    "recovering-from-setbacks-without-quitting",
    "Recovering from Setbacks Without Quitting",
    ["setback-diagnosis-worksheet", "comeback-14-day-plan", "anti-quit-decision-card"],
    "setback diagnosis, stabilization, a staged comeback, and pause-versus-quit clarity",
    [
      "Setback category: platform, personal, performance, social, or technical",
      "Facts you have verified versus fears you have assumed",
      "Fourteen-day return schedule with scope, format, and session length",
    ],
    [
      "No permanent decision was made inside the first seventy-two hours",
      "Pause conditions and genuine stop conditions are written separately",
      "An after-action review separates controllable from uncontrollable",
    ],
  ],
  [
    "creator-wellness-capstone-personal-longevity-plan",
    "Creator Wellness Capstone: Personal Longevity Plan",
    ["personal-creator-longevity-plan", "longevity-evidence-checklist", "ninety-day-wellness-improvement-plan"],
    "assembling every wellness system into one dated, reviewable longevity plan",
    [
      "Which CWL artifact covers each section of your plan, with its date",
      "Your three improvements for the next ninety days and their review dates",
      "Stress-test responses: sick week, slow income month, pile-on, gear failure",
    ],
    [
      "Every section points at a dated artifact, not an intention",
      "Licensed-professional handoffs are named where clinical questions could arise",
      "A quarterly review date and version note are recorded; the Honors Lab never gates this Capstone",
    ],
  ],
];

const title = (id) => id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const ensure = (dir) => fs.mkdirSync(dir, { recursive: true });
const ifMissing = (file, body) => {
  if (fs.existsSync(file)) return false;
  ensure(path.dirname(file));
  fs.writeFileSync(file, body, "utf8");
  return true;
};

function kindFor(id) {
  if (id === "personal-creator-longevity-plan" || id.includes("framework")) return "template";
  if (id.endsWith("-checklist") || id.endsWith("-card")) return "checklist";
  if (id.includes("scorecard") || id.includes("dashboard")) return "tracker";
  if (id.includes("guide") || id.includes("routine") || id.includes("playbook") || id.includes("menu")) return "guide";
  if (id.includes("worksheet") || id.includes("audit")) return "worksheet";
  return "planner";
}

function resource(id, slug, focus, fields, done) {
  return `  {
    id: ${JSON.stringify(id)},
    title: ${JSON.stringify(title(id))},
    description: ${JSON.stringify(
      `${title(id)} for Creator Wellness & Longevity Mastery. Use it to build ${focus} as a habit you can run on an ordinary week, then file the dated result for the Personal Creator Longevity Plan.`,
    )},
    category: "content",
    kind: ${JSON.stringify(kindFor(id))},
    status: "ready",
    lessonSlugs: [${JSON.stringify(slug)}],
    blocks: [
      { type: "intro", text: ${JSON.stringify(
        `Complete this sheet for the week you actually had, not the week you wish you had. Wellness plans only hold when they are sized for an average week.`,
      )} },
      { type: "fill_lines", title: "Your current picture", lines: [
        { label: ${JSON.stringify(fields[0])}, rows: 3 },
        { label: ${JSON.stringify(fields[1])}, rows: 3 },
        { label: ${JSON.stringify(fields[2])}, rows: 3 },
      ] },
      { type: "fill_lines", title: "The one change", lines: [
        { label: "The single habit you are changing first, and why it is the smallest useful change", rows: 3 },
        { label: "What will make this change fail, and the guardrail that prevents it", rows: 2 },
        { label: "Date completed and next review date", rows: 2 },
      ] },
      { type: "checkbox_list", title: "Done when", items: [
        ${JSON.stringify(done[0])},
        ${JSON.stringify(done[1])},
        ${JSON.stringify(done[2])},
        "Evidence is dated and filed for the Personal Creator Longevity Plan",
      ] },
      { type: "notes", title: "Review notes — what resisted the change", lines: 5 },
      { type: "callout", text: "This is general creator education, not medical, mental health, financial, or legal advice. Contact a licensed clinician, therapist, or qualified tax or financial professional for any clinical or personalized question. Never grade this work by hours streamed, gifts, or viewer counts." },
    ],
  }`;
}

const library = `import type { LibraryResource } from "@/lib/streameru-library/types";

/** Creator Wellness & Longevity Mastery — 30 printable resources (3 per lesson, CWL-01 … CWL-10). */
export const CREATOR_WELLNESS_LONGEVITY_MASTERY_RESOURCES: LibraryResource[] = [
${LESSONS.map(([slug, name, ids, focus, fields, done]) =>
  `  // —— ${name} ——\n${ids.map((id) => resource(id, slug, focus, fields, done)).join(",\n")}`,
).join(",\n")}
];
`;

const libraryPath = path.join(ROOT, "src/content/streameru/library/creator-wellness-longevity-mastery.ts");
ensure(path.dirname(libraryPath));
fs.writeFileSync(libraryPath, library, "utf8");
console.log(`Wrote library: ${LESSONS.length * 3} resources -> ${path.relative(ROOT, libraryPath)}`);

for (let i = 0; i < LESSONS.length; i++) {
  const [slug, name, ids] = LESSONS[i];
  const code = `CWL-${String(i + 1).padStart(2, "0")}`;
  const lessonStub = `import type { ExpandedLesson } from "@/content/streameru/types";

export const lesson: ExpandedLesson = {
  slug: "${slug}",
  excerpt: "Temporary Creator Wellness & Longevity Mastery stub.",
  estimatedMinutes: 38,
  content: \`## Introduction

${name} (${code}) is a temporary wellness systems stub. This material was last reviewed July 2026.

## From Brad's Experience

[BradExperience]
Principle for approval (brad_must_approve): founder material requires approval before publication.

## Downloads

${ids.map((id) => `- ${title(id)}`).join("\n")}
\`,
};
`;
  const quizStub = `import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "${slug}",
  programKey: "wellness",
  title: "Quiz: ${name}",
  questions: [
${Array.from(
  { length: 8 },
  (_, q) => `    question("q${q + 1}", "Which choice protects a creator career that lasts?", [
      ["Change one habit, size it for an ordinary week, and record dated evidence.", true, "Correct."],
      ["Push through illness to protect the streak.", false, "Wrong."],
      ["Trade sleep for one more session.", false, "Wrong."],
      ["Grade the habit by hours streamed, gifts, or viewer counts.", false, "Wrong."],
    ]),`,
).join("\n")}
  ],
});
`;
  const lessonCreated = ifMissing(path.join(ROOT, "src/content/streameru/lessons", `${slug}.ts`), lessonStub);
  const quizCreated = ifMissing(path.join(ROOT, "src/lib/assessments/quizzes/wellness", `${slug}.ts`), quizStub);
  console.log(`${code}: lesson ${lessonCreated ? "created" : "kept"}, quiz ${quizCreated ? "created" : "kept"}`);
}

console.log("CWL bootstrap complete");
