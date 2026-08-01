/**
 * Wire Creator Wellness missions and production briefs.
 * Run: node scripts/tmp-cwl-wire.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const lessons = [
  ["building-a-career-that-lasts", "Building a Career That Lasts", ["longevity-career-map", "decade-definition-worksheet", "consistency-over-intensity-card"]],
  ["preventing-creator-burnout", "Preventing Creator Burnout", ["burnout-early-warning-dashboard", "recovery-week-plan", "streaming-fatigue-audit"]],
  ["physical-health-for-long-streaming-sessions", "Physical Health for Long Streaming Sessions", ["ergonomic-workstation-guide", "voice-care-checklist", "stretch-and-hydration-routine"]],
  ["mental-resilience-and-handling-online-pressure", "Mental Resilience & Handling Online Pressure", ["aftercare-routine-card", "comparison-rules-worksheet", "criticism-response-framework"]],
  ["time-management-and-sustainable-schedules", "Time Management & Sustainable Schedules", ["weekly-energy-calendar", "recovery-day-planner", "sleep-and-batching-planner"]],
  ["financial-wellness-for-variable-income", "Financial Wellness for Variable Income", ["income-variability-buffer-plan", "slow-month-playbook", "personal-tax-savings-checklist"]],
  ["healthy-relationships-and-personal-boundaries", "Healthy Relationships & Personal Boundaries", ["boundary-worksheet", "partner-family-communication-card", "privacy-expectations-guide"]],
  ["maintaining-creativity-for-years", "Maintaining Creativity for Years", ["creative-recovery-menu", "inspiration-input-diet", "creativity-capacity-scorecard"]],
  ["recovering-from-setbacks-without-quitting", "Recovering from Setbacks Without Quitting", ["setback-diagnosis-worksheet", "comeback-14-day-plan", "anti-quit-decision-card"]],
  ["creator-wellness-capstone-personal-longevity-plan", "Creator Wellness Capstone: Personal Longevity Plan", ["personal-creator-longevity-plan", "longevity-evidence-checklist", "ninety-day-wellness-improvement-plan"]],
];
const title = (id) => id.replace(/-/g, " ").replace(/\b\w/g, (x) => x.toUpperCase());

const missionsPath = path.join(ROOT, "src/lib/resources/training-missions.ts");
let missions = fs.readFileSync(missionsPath, "utf8");
if (!missions.includes('"building-a-career-that-lasts"')) {
  const block = `\n  // —— Creator Wellness & Longevity Mastery ——\n${lessons
    .map(
      ([slug, name, ids], i) => `  "${slug}": {
    id: "mission-${165 + i}-cwl-${String(i + 1).padStart(2, "0")}",
    mission_title: "Session: ${name}",
    mission_description: "Complete a reviewable Creator Wellness practice graded on implementation evidence—not hours streamed, gifts, viewers, or rank.",
    mission_steps: steps(
      [
        "Complete ${title(ids[0])} and its supporting lesson downloads.",
        "Size the habit for an ordinary week and write the floor, ceiling, and stop condition.",
      ],
      ${i === 9 ? 40 : 45},
      [
        "Implement one real change in a session, recovery day, household agreement, or personal finance workflow.",
        "Document one dated improvement for the Personal Creator Longevity Plan.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal: "Build longevity evidence for the Personal Creator Longevity Plan.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
${ids.map((id) => `      { label: "${title(id)}", href: "/streameru/library/${id}" },`).join("\n")}
    ],
  },`,
    )
    .join("\n")}\n`;
  const marker = '"tiktok-shop-capstone-signature-shop-campaign"';
  const start = missions.indexOf(marker);
  if (start < 0) throw new Error("TikTok Shop capstone mission not found");
  const close = missions.indexOf("\n  },\n", start);
  if (close < 0) throw new Error("Mission insertion point not found");
  const at = close + "\n  },".length;
  missions = missions.slice(0, at) + "\n" + block + missions.slice(at);
  fs.writeFileSync(missionsPath, missions);
  console.log("Inserted CWL missions after TikTok Shop capstone");
} else console.log("CWL missions already present");

const briefsPath = path.join(ROOT, "src/lib/streameru-media/production-briefs.ts");
let briefs = fs.readFileSync(briefsPath, "utf8");
if (!briefs.includes('"building-a-career-that-lasts"')) {
  const chunk = lessons
    .map(
      ([slug, name, ids]) => `  brief(
    "${slug}",
    assetsFor([
      {
        key: "worksheet-blank", assetType: "screenshot", title: "Blank ${title(ids[0])}",
        description: "Clean Creator Wellness worksheet", purpose: "Shows the primary reviewable wellness artifact",
        placement: "Screenshots — first screenshot placeholder", captureInstructions: "Use fictional non-sensitive personal notes. No medical diagnoses.",
        caption: "Size habits for an ordinary week.", alt: "Blank ${title(ids[0])}", priority: "essential", required: true, ownership: "cursor_can_create", cursorCanGenerate: true, estimatedMinutes: 20,
      },
      {
        key: "wellness-system-diagram", assetType: "diagram", title: "${name} system diagram",
        description: "Longevity habit flow", purpose: "Shows warning signals, protective habits, recovery, and Capstone filing.",
        placement: "Diagrams — first diagram placeholder", captureInstructions: "Minimal branded diagram. No hustle-culture imagery or medical claims.",
        caption: "Longevity is a system of ordinary-week habits.", alt: "${name} system diagram", priority: "essential", required: true, ownership: "cursor_can_create", cursorCanGenerate: true, estimatedMinutes: 30,
      },
      {
        key: "brad-wellness-principle", assetType: "founder_story", title: "Brad experience — wellness longevity principle",
        description: "Approved founder principle; never invent stories", purpose: "Founder framing without invented personal medical or income claims.",
        placement: "From Brad's Experience", captureInstructions: "Ask Brad for a verifiable 80–120 word principle relevant to ${name}; approve before publication.",
        founderQuestion: "What longevity principle would you want creators to remember from ${name.toLowerCase()} when grind culture tells them to ignore recovery?",
        caption: "From Brad's experience", alt: "", priority: "helpful", required: false, ownership: "brad_must_approve", estimatedMinutes: 10,
      },
    ]),
  ),`,
    )
    .join("\n");
  const marker = "\n];\n\nexport const LESSON_PRODUCTION_BRIEFS";
  if (!briefs.includes(marker)) throw new Error("Could not find briefs array end");
  briefs = briefs.replace(marker, `,\n${chunk}\n];\n\nexport const LESSON_PRODUCTION_BRIEFS`).replace(/\),\s*,\n\s*brief\(/g, "),\n  brief(");
  fs.writeFileSync(briefsPath, briefs);
  console.log("Appended CWL production briefs");
} else console.log("CWL production briefs already present");
console.log("CWL wire complete");
