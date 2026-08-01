/**
 * Bootstrap Brand Partnerships Mastery library plus missing lesson/quiz stubs.
 * Run: node scripts/tmp-bp-bootstrap.mjs
 * Idempotent: never overwrites an existing lesson or quiz body.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

/** [slug, title, [download ids], lessonFocus, [field labels], [done-when items]] */
const LESSONS = [
  [
    "understanding-brand-partnerships",
    "Understanding Brand Partnerships",
    ["brand-readiness-checklist", "partnership-types-map", "brand-safety-values-card"],
    "how brand partnerships work, what brands evaluate, and how to stay aligned with your values",
    [
      "Your current brand-readiness score across audience clarity, consistency, and professionalism",
      "Partnership types you will pursue first: integrated, dedicated, affiliate, gifting, ambassador",
      "Brand safety and values lines you will not cross for any fee",
    ],
    [
      "You can name three partnership types and when each fits your channel",
      "Brand safety and disclosure values are written before outreach begins",
      "One dated note is filed for the Professional Brand Partnership Portfolio",
    ],
  ],
  [
    "building-your-professional-creator-profile",
    "Building Your Professional Creator Profile",
    ["creator-bio-worksheet", "audience-overview-worksheet", "portfolio-selection-guide"],
    "a professional creator identity brands can evaluate without guessing",
    [
      "Your one-paragraph professional bio written for brand readers, not fan hype",
      "Audience overview with platform, timeframe, and honest reach context",
      "Three portfolio samples that prove fit for the categories you want",
    ],
    [
      "Bio is written in third-person or professional first-person without slang overload",
      "Audience overview includes timeframe and platform context for every stat",
      "Portfolio selections match the brand categories you will target",
    ],
  ],
  [
    "creating-an-electronic-press-kit",
    "Creating an Electronic Press Kit (EPK)",
    ["epk-field-worksheet", "media-kit-layout-checklist", "epk-assets-inventory"],
    "a complete EPK with every field a brand team expects to find",
    [
      "EPK field checklist: bio, headshot, stats, demographics, categories, collabs, samples, contact",
      "Media kit layout order and which assets are public versus private",
      "Inventory of press photos, gallery items, and downloadable PDF status",
    ],
    [
      "Every required EPK field is defined with owner and completion date",
      "Rate card is marked optional/private with a clear access rule",
      "Public EPK page URL or share link is recorded for the Capstone",
    ],
  ],
  [
    "finding-brands-that-fit-your-audience",
    "Finding Brands That Fit Your Audience",
    ["brand-fit-scorecard", "sponsorship-tracker", "target-brand-research-sheet"],
    "researching brands that genuinely match your audience and content",
    [
      "Top five target brands with fit scores across audience, values, and category",
      "Research notes: recent campaigns, creator partners, and contact paths",
      "Sponsorship tracker columns for status, next action, and follow-up date",
    ],
    [
      "At least five brands scored with written fit rationale—not follower fantasies",
      "No brand on the list conflicts with your safety and values card",
      "Tracker is dated and filed for the Professional Brand Partnership Portfolio",
    ],
  ],
  [
    "professional-outreach-and-communication",
    "Professional Outreach & Communication",
    ["outreach-email-templates", "follow-up-cadence-card", "linkedin-intro-checklist"],
    "clear, respectful outreach and follow-up that brands actually answer",
    [
      "Outreach template customized with your niche, audience proof, and one specific ask",
      "Follow-up cadence: day three, day ten, day twenty-one—with stop rules",
      "LinkedIn or professional intro checklist for agency and brand contacts",
    ],
    [
      "First outreach draft is proofread and free of desperate or vague language",
      "Follow-up cadence includes a polite close-out after the final touch",
      "One dated outreach log entry is filed for portfolio evidence",
    ],
  ],
  [
    "negotiating-sponsorships-professionally",
    "Negotiating Sponsorships Professionally",
    ["negotiation-scope-worksheet", "rate-card-planner", "deal-terms-checklist"],
    "scope, rates, deliverables, and high-level contract awareness without legal advice",
    [
      "Deliverable scope written in plain language: what, when, where, and revisions",
      "Rate card draft with package tiers—even if numbers stay private initially",
      "Deal terms checklist: exclusivity, usage rights, payment timing, FTC disclosure duty",
    ],
    [
      "Scope worksheet separates must-haves from nice-to-haves before any call",
      "You know when to escalate contract questions to a qualified professional",
      "Negotiation notes are dated; no handshake deals without written confirmation",
    ],
  ],
  [
    "delivering-outstanding-campaigns",
    "Delivering Outstanding Campaigns",
    ["campaign-planner", "deliverables-checklist", "ftc-disclosure-reminder-card"],
    "campaign planning, on-time delivery, disclosure, and brand-safe execution",
    [
      "Campaign timeline from brief acceptance through post-live reporting",
      "Deliverables checklist with draft, approval, publish, and proof capture steps",
      "FTC disclosure placement plan for each platform format you will use",
    ],
    [
      "Every deliverable has a due date and approval owner before you go LIVE",
      "Disclosure language is planned—not improvised under chat pressure",
      "Campaign planner is filed with evidence screenshots or mockups",
    ],
  ],
  [
    "reporting-results-and-building-repeat-business",
    "Reporting Results & Building Repeat Business",
    ["campaign-report-template", "renewal-conversation-checklist", "proof-metrics-worksheet"],
    "honest reporting, renewal conversations, and proof metrics brands trust",
    [
      "Campaign report sections: objectives, execution summary, metrics, learnings, next steps",
      "Renewal conversation prompts and timing after a successful delivery",
      "Proof metrics worksheet with platform-native stats and timeframe labels",
    ],
    [
      "Report uses honest metrics—never inflated or purchased engagement",
      "Renewal checklist includes gratitude, results recap, and a specific future idea",
      "One sample or mock report is filed for the Capstone",
    ],
  ],
  [
    "becoming-a-long-term-brand-partner",
    "Becoming a Long-Term Brand Partner",
    ["brand-relationship-planner", "reputation-scorecard", "partnership-renewal-roadmap"],
    "relationship maintenance, reputation, and multi-campaign partnership planning",
    [
      "Relationship touchpoints between campaigns: check-ins, shares, and value-add ideas",
      "Reputation scorecard across reliability, communication, disclosure, and fit",
      "Renewal roadmap for the next twelve months with two anchor brand relationships",
    ],
    [
      "You can describe what makes you easy to rebook without bragging about fake wins",
      "Reputation risks (late delivery, vague reporting) have prevention rules",
      "Roadmap is dated and linked to prior lesson artifacts",
    ],
  ],
  [
    "brand-partnerships-capstone-professional-portfolio",
    "Brand Partnerships Capstone: Professional Portfolio",
    ["professional-brand-partnership-portfolio", "epk-evidence-checklist", "ninety-day-partnership-improvement-plan"],
    "assembling every partnership artifact into one reviewable professional portfolio and EPK",
    [
      "Portfolio sections mapped to BP-01 through BP-09 artifacts with dates",
      "EPK evidence checklist: every field complete or marked in progress with owner",
      "Ninety-day improvement plan with three partnership skills and review dates",
    ],
    [
      "Every section points at a dated artifact, not an intention",
      "EPK fields match the Streamer Factory EPK Builder definitions",
      "Optional Brand Partnerships Lab / Honors never gates this Capstone certificate",
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
  if (id.includes("portfolio") || id.includes("template")) return "template";
  if (id.endsWith("-checklist") || id.endsWith("-card")) return "checklist";
  if (id.includes("scorecard") || id.includes("tracker")) return "tracker";
  if (id.includes("guide") || id.includes("planner") || id.includes("roadmap")) return "guide";
  if (id.includes("worksheet") || id.includes("sheet")) return "worksheet";
  return "planner";
}

function resource(id, slug, focus, fields, done) {
  return `  {
    id: ${JSON.stringify(id)},
    title: ${JSON.stringify(title(id))},
    description: ${JSON.stringify(
      `${title(id)} for Brand Partnerships Mastery. Use it to build ${focus}, then file the dated result for the Professional Brand Partnership Portfolio.`,
    )},
    category: "monetization",
    kind: ${JSON.stringify(kindFor(id))},
    status: "ready",
    lessonSlugs: [${JSON.stringify(slug)}],
    blocks: [
      { type: "intro", text: ${JSON.stringify(
        `Complete this sheet with honest, reviewable professional details—not inflated metrics or borrowed testimonials. Brand partnerships start with trust you can prove.`,
      )} },
      { type: "fill_lines", title: "Your current picture", lines: [
        { label: ${JSON.stringify(fields[0])}, rows: 3 },
        { label: ${JSON.stringify(fields[1])}, rows: 3 },
        { label: ${JSON.stringify(fields[2])}, rows: 3 },
      ] },
      { type: "fill_lines", title: "The one change", lines: [
        { label: "The single partnership habit you are improving first, and why it is the smallest useful change", rows: 3 },
        { label: "What will make this change fail, and the guardrail that prevents it", rows: 2 },
        { label: "Date completed and next review date", rows: 2 },
      ] },
      { type: "checkbox_list", title: "Done when", items: [
        ${JSON.stringify(done[0])},
        ${JSON.stringify(done[1])},
        ${JSON.stringify(done[2])},
        "Evidence is dated and filed for the Professional Brand Partnership Portfolio",
      ] },
      { type: "notes", title: "Review notes — what resisted the change", lines: 5 },
      { type: "callout", text: "This is general creator education about brand partnerships, not legal, tax, or contract advice. Consult a qualified attorney or accountant for binding agreements, exclusivity, usage rights, or tax questions. Never grade this work by securing a real deal, gifts, viewer counts, or purchased followers." },
    ],
  }`;
}

const library = `import type { LibraryResource } from "@/lib/streameru-library/types";

/** Brand Partnerships Mastery — 30 printable resources (3 per lesson, BP-01 … BP-10). */
export const BRAND_PARTNERSHIPS_MASTERY_RESOURCES: LibraryResource[] = [
${LESSONS.map(([slug, name, ids, focus, fields, done]) =>
  `  // —— ${name} ——\n${ids.map((id) => resource(id, slug, focus, fields, done)).join(",\n")}`,
).join(",\n")}
];
`;

const libraryPath = path.join(ROOT, "src/content/streameru/library/brand-partnerships-mastery.ts");
ensure(path.dirname(libraryPath));
fs.writeFileSync(libraryPath, library, "utf8");
console.log(`Wrote library: ${LESSONS.length * 3} resources -> ${path.relative(ROOT, libraryPath)}`);

for (let i = 0; i < LESSONS.length; i++) {
  const [slug, name, ids] = LESSONS[i];
  const code = `BP-${String(i + 1).padStart(2, "0")}`;
  const minutes = i === 9 ? 45 : 38;
  const lessonStub = `import type { ExpandedLesson } from "@/content/streameru/types";

export const lesson: ExpandedLesson = {
  slug: "${slug}",
  excerpt: "Temporary Brand Partnerships Mastery stub.",
  estimatedMinutes: ${minutes},
  content: \`## Introduction

${name} (${code}) is a temporary brand partnerships stub. This material was last reviewed July 2026.

## From Brad's Experience

[BradExperience]
Founder principle pending Brad approval — do not invent a Brad story, result, or anecdote.

## Downloads

${ids.map((id) => `- ${title(id)}`).join("\n")}
\`,
};
`;
  const quizStub = `import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "${slug}",
  programKey: "partnerships",
  title: "Quiz: ${name}",
  questions: [
${Array.from(
  { length: 8 },
  (_, q) => `    question("q${q + 1}", "Which choice protects professional brand partnership readiness?", [
      ["Build reviewable artifacts with honest metrics and clear communication.", true, "Correct."],
      ["Buy followers to look bigger before outreach.", false, "Wrong."],
      ["Hide sponsored content to keep chat authentic.", false, "Wrong."],
      ["Grade success only by landing a real deal this week.", false, "Wrong."],
    ]),`,
).join("\n")}
  ],
});
`;
  const lessonCreated = ifMissing(path.join(ROOT, "src/content/streameru/lessons", `${slug}.ts`), lessonStub);
  const quizCreated = ifMissing(path.join(ROOT, "src/lib/assessments/quizzes/partnerships", `${slug}.ts`), quizStub);
  console.log(`${code}: lesson ${lessonCreated ? "created" : "kept"}, quiz ${quizCreated ? "created" : "kept"}`);
}

console.log("BP bootstrap complete");
