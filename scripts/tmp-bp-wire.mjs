/**
 * Wire Brand Partnerships missions and production briefs.
 * Run: node scripts/tmp-bp-wire.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const lessons = [
  ["understanding-brand-partnerships", "Understanding Brand Partnerships", ["brand-readiness-checklist", "partnership-types-map", "brand-safety-values-card"]],
  ["building-your-professional-creator-profile", "Building Your Professional Creator Profile", ["creator-bio-worksheet", "audience-overview-worksheet", "portfolio-selection-guide"]],
  ["creating-an-electronic-press-kit", "Creating an Electronic Press Kit (EPK)", ["epk-field-worksheet", "media-kit-layout-checklist", "epk-assets-inventory"]],
  ["finding-brands-that-fit-your-audience", "Finding Brands That Fit Your Audience", ["brand-fit-scorecard", "sponsorship-tracker", "target-brand-research-sheet"]],
  ["professional-outreach-and-communication", "Professional Outreach & Communication", ["outreach-email-templates", "follow-up-cadence-card", "linkedin-intro-checklist"]],
  ["negotiating-sponsorships-professionally", "Negotiating Sponsorships Professionally", ["negotiation-scope-worksheet", "rate-card-planner", "deal-terms-checklist"]],
  ["delivering-outstanding-campaigns", "Delivering Outstanding Campaigns", ["campaign-planner", "deliverables-checklist", "ftc-disclosure-reminder-card"]],
  ["reporting-results-and-building-repeat-business", "Reporting Results & Building Repeat Business", ["campaign-report-template", "renewal-conversation-checklist", "proof-metrics-worksheet"]],
  ["becoming-a-long-term-brand-partner", "Becoming a Long-Term Brand Partner", ["brand-relationship-planner", "reputation-scorecard", "partnership-renewal-roadmap"]],
  ["brand-partnerships-capstone-professional-portfolio", "Brand Partnerships Capstone: Professional Portfolio", ["professional-brand-partnership-portfolio", "epk-evidence-checklist", "ninety-day-partnership-improvement-plan"]],
];
const title = (id) => id.replace(/-/g, " ").replace(/\b\w/g, (x) => x.toUpperCase());

const missionsPath = path.join(ROOT, "src/lib/resources/training-missions.ts");
let missions = fs.readFileSync(missionsPath, "utf8");
if (!missions.includes('"understanding-brand-partnerships"')) {
  const block = `\n  // —— Brand Partnerships Mastery ——\n${lessons
    .map(
      ([slug, name, ids], i) => `  "${slug}": {
    id: "mission-${175 + i}-bp-${String(i + 1).padStart(2, "0")}",
    mission_title: "Session: ${name}",
    mission_description: "Complete reviewable brand partnership artifacts graded on professional evidence—not deals closed, gifts, viewers, or rank.",
    mission_steps: steps(
      [
        "Complete ${title(ids[0])} and its supporting lesson downloads.",
        "Build or update one professional partnership artifact for the Professional Brand Partnership Portfolio.",
      ],
      ${i === 9 ? 40 : 45},
      [
        "Implement one dated improvement: EPK field, outreach draft, scope note, campaign plan, or report section.",
        "Document one review note for the Professional Brand Partnership Portfolio.",
      ],
      habitDailyByStage("late"),
    ),
    mission_goal: "Build evidence for the Professional Brand Partnership Portfolio and Streamer Factory EPK.",
    links: [
      { label: "StreamerU hub", href: "/streameru" },
${ids.map((id) => `      { label: "${title(id)}", href: "/streameru/library/${id}" },`).join("\n")}
    ],
  },`,
    )
    .join("\n")}\n`;
  const marker = '"creator-wellness-capstone-personal-longevity-plan"';
  const start = missions.indexOf(marker);
  if (start < 0) throw new Error("Creator Wellness capstone mission not found");
  const close = missions.indexOf("\n  },\n", start);
  if (close < 0) throw new Error("Mission insertion point not found");
  const at = close + "\n  },".length;
  missions = missions.slice(0, at) + "\n" + block + missions.slice(at);
  fs.writeFileSync(missionsPath, missions);
  console.log("Inserted BP missions after Creator Wellness capstone");
} else console.log("BP missions already present");

const briefsPath = path.join(ROOT, "src/lib/streameru-media/production-briefs.ts");
let briefs = fs.readFileSync(briefsPath, "utf8");
if (!briefs.includes('"understanding-brand-partnerships"')) {
  const chunk = lessons
    .map(
      ([slug, name, ids]) => `  brief(
    "${slug}",
    assetsFor([
      {
        key: "worksheet-blank", assetType: "screenshot", title: "Blank ${title(ids[0])}",
        description: "Clean Brand Partnerships worksheet", purpose: "Shows the primary reviewable partnership artifact",
        placement: "Screenshots — first screenshot placeholder", captureInstructions: "Use fictional non-sensitive professional notes. No fake metrics or brand logos without permission.",
        caption: "Build partnership evidence before you pitch.", alt: "Blank ${title(ids[0])}", priority: "essential", required: true, ownership: "cursor_can_create", cursorCanGenerate: true, estimatedMinutes: 20,
      },
      {
        key: "partnership-system-diagram", assetType: "diagram", title: "${name} system diagram",
        description: "Brand partnership readiness flow", purpose: "Shows research, EPK, outreach, delivery, reporting, and Capstone filing.",
        placement: "Diagrams — first diagram placeholder", captureInstructions: "Minimal branded diagram. No hype-culture imagery or hidden-ad messaging.",
        caption: "Partnerships are a system of professional artifacts.", alt: "${name} system diagram", priority: "essential", required: true, ownership: "cursor_can_create", cursorCanGenerate: true, estimatedMinutes: 30,
      },
      {
        key: "brad-partnership-principle", assetType: "founder_story", title: "Brad experience — brand partnership principle",
        description: "Approved founder principle; never invent stories", purpose: "Founder framing without invented deal claims or fake brand results.",
        placement: "From Brad's Experience", captureInstructions: "Ask Brad for a verifiable 80–120 word principle relevant to ${name}; approve before publication.",
        founderQuestion: "What brand partnership principle would you want creators to remember from ${name.toLowerCase()} when hype culture pushes fake metrics or hidden ads?",
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
  console.log("Appended BP production briefs");
} else console.log("BP production briefs already present");
console.log("BP wire complete");
