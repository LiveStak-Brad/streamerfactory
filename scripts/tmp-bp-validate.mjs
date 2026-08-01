/**
 * Validate Brand Partnerships Mastery production gates.
 * Run: node scripts/tmp-bp-validate.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const lessons = [
  "understanding-brand-partnerships",
  "building-your-professional-creator-profile",
  "creating-an-electronic-press-kit",
  "finding-brands-that-fit-your-audience",
  "professional-outreach-and-communication",
  "negotiating-sponsorships-professionally",
  "delivering-outstanding-campaigns",
  "reporting-results-and-building-repeat-business",
  "becoming-a-long-term-brand-partner",
  "brand-partnerships-capstone-professional-portfolio",
];

const REQUIRED_HEADINGS = [
  "## Introduction",
  "## What You Will Learn",
  "## Prerequisites",
  "## Why This Matters",
  "## Learning Objectives",
  "## Main Lesson",
  "## Examples",
  "## Real Creator Scenarios",
  "## Screenshots",
  "## Diagrams",
  "## From Brad's Experience",
  "## Pro Tips",
  "## Common Beginner Mistakes",
  "## Reality Check",
  "## Summary",
  "## LIVE Mission",
  "## Downloads",
  "## Quiz",
  "## Key Takeaways",
  "## Before You Move On",
  "## Next Lesson Preview",
];

const errors = [];
const wordCounts = [];

for (const slug of lessons) {
  const file = path.join(ROOT, "src/content/streameru/lessons", `${slug}.ts`);
  const text = fs.readFileSync(file, "utf8");
  const contentMatch = text.match(/content:\s*`([\s\S]*)`\s*,?\s*};?\s*$/m) || text.match(/content:\s*`([\s\S]*)`/);
  if (!contentMatch) {
    errors.push(`${slug}: could not extract content`);
    continue;
  }
  const body = contentMatch[1];
  const words = body.trim().split(/\s+/).length;
  wordCounts.push([slug, words]);
  const brad = (body.match(/\[BradExperience\]/g) || []).length;
  if (words < 1800 || words > 2600) errors.push(`${slug}: words ${words} (need 1800–2600)`);
  if (brad !== 1) errors.push(`${slug}: [BradExperience] count ${brad} (need 1)`);
  if (/brad_must_approve|Principle for approval/i.test(body)) {
    errors.push(`${slug}: student-facing body must not include brad_must_approve / Principle for approval meta`);
  }
  if (!/last reviewed July 2026/i.test(body)) errors.push(`${slug}: missing last reviewed July 2026`);
  if (!/not legal|general creator education/i.test(body)) errors.push(`${slug}: missing legal-boundary language`);
  if (/buy(ing)? followers|fake metrics|hidden advertising|fake testimonial/i.test(body)) {
    if (!/never teach|must never|Never teach/i.test(body)) {
      errors.push(`${slug}: mentions unethical tactics without boundary framing`);
    }
  }
  for (const h of REQUIRED_HEADINGS) {
    if (!body.includes(h)) errors.push(`${slug}: missing heading ${h}`);
  }
  if (slug === "creating-an-electronic-press-kit" || slug === "brand-partnerships-capstone-professional-portfolio") {
    if (!body.includes("Public EPK page URL")) errors.push(`${slug}: missing EPK field definitions`);
    if (!body.includes("Creator biography")) errors.push(`${slug}: missing EPK biography field`);
  }

  const quiz = fs.readFileSync(path.join(ROOT, "src/lib/assessments/quizzes/partnerships", `${slug}.ts`), "utf8");
  const qCount = (quiz.match(/question\(/g) || []).length;
  if (qCount !== 8) errors.push(`${slug}: quiz questions ${qCount} (need 8)`);
  if (!quiz.includes('programKey: "partnerships"')) errors.push(`${slug}: quiz programKey not partnerships`);
}

const library = fs.readFileSync(path.join(ROOT, "src/content/streameru/library/brand-partnerships-mastery.ts"), "utf8");
const resourceCount = (library.match(/^\s+id:\s+"/gm) || []).length;
if (resourceCount !== 30) errors.push(`library resources ${resourceCount} (need 30)`);
if (!library.includes('category: "monetization"')) errors.push("library category should be monetization");

const seo = fs.readFileSync(path.join(ROOT, "src/lib/resources/lesson-seo/packs/brand-partnerships-mastery.ts"), "utf8");
const seoCount = (seo.match(/slug:\s+"/g) || []).length;
if (seoCount !== 10) errors.push(`SEO packs ${seoCount} (need 10)`);

const exam = fs.readFileSync(path.join(ROOT, "src/lib/assessments/exams/program-partnerships.ts"), "utf8");
const examQs = (exam.match(/question\(/g) || []).length;
if (examQs < 12) errors.push(`Program Final questions ${examQs} (need ≥12)`);

const missions = fs.readFileSync(path.join(ROOT, "src/lib/resources/training-missions.ts"), "utf8");
const missionIds = lessons.filter((slug) => missions.includes(`"${slug}"`));
if (missionIds.length !== 10) errors.push(`missions present ${missionIds.length} (need 10)`);
for (let i = 0; i < 10; i++) {
  const expected = `mission-${175 + i}-bp-${String(i + 1).padStart(2, "0")}`;
  if (!missions.includes(expected)) errors.push(`missing mission id ${expected}`);
}

console.log("Word counts:");
for (const [slug, words] of wordCounts) console.log(`  ${slug}: ${words}`);
if (errors.length) {
  console.error("\nBP validation FAILED:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("\nBP validation PASSED");
