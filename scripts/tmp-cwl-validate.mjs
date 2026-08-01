/**
 * Validate Creator Wellness & Longevity Mastery production gates.
 * Run: node scripts/tmp-cwl-validate.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const lessons = [
  "building-a-career-that-lasts",
  "preventing-creator-burnout",
  "physical-health-for-long-streaming-sessions",
  "mental-resilience-and-handling-online-pressure",
  "time-management-and-sustainable-schedules",
  "financial-wellness-for-variable-income",
  "healthy-relationships-and-personal-boundaries",
  "maintaining-creativity-for-years",
  "recovering-from-setbacks-without-quitting",
  "creator-wellness-capstone-personal-longevity-plan",
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
  const brad = (body.match(/brad_must_approve/g) || []).length;
  if (words < 1800 || words > 2600) errors.push(`${slug}: words ${words} (need 1800–2600)`);
  if (brad !== 1) errors.push(`${slug}: brad_must_approve count ${brad} (need 1)`);
  if (!/last reviewed July 2026/i.test(body)) errors.push(`${slug}: missing last reviewed July 2026`);
  if (!/not medical|general creator education/i.test(body)) errors.push(`${slug}: missing medical-boundary language`);
  if (/diagnose yourself|prescrib(e|ing) medication|cure depression/i.test(body)) {
    errors.push(`${slug}: unsafe clinical language`);
  }

  const quiz = fs.readFileSync(path.join(ROOT, "src/lib/assessments/quizzes/wellness", `${slug}.ts`), "utf8");
  const qCount = (quiz.match(/question\(/g) || []).length;
  if (qCount !== 8) errors.push(`${slug}: quiz questions ${qCount} (need 8)`);
  if (!quiz.includes('programKey: "wellness"')) errors.push(`${slug}: quiz programKey not wellness`);
}

const library = fs.readFileSync(path.join(ROOT, "src/content/streameru/library/creator-wellness-longevity-mastery.ts"), "utf8");
const resourceCount = (library.match(/^\s+id:\s+"/gm) || []).length;
if (resourceCount !== 30) errors.push(`library resources ${resourceCount} (need 30)`);

const seo = fs.readFileSync(path.join(ROOT, "src/lib/resources/lesson-seo/packs/creator-wellness-longevity-mastery.ts"), "utf8");
const seoCount = (seo.match(/slug:\s+"/g) || []).length;
if (seoCount !== 10) errors.push(`SEO packs ${seoCount} (need 10)`);

const exam = fs.readFileSync(path.join(ROOT, "src/lib/assessments/exams/program-wellness.ts"), "utf8");
const examQs = (exam.match(/question\(/g) || []).length;
if (examQs < 12) errors.push(`Program Final questions ${examQs} (need ≥12)`);

const missions = fs.readFileSync(path.join(ROOT, "src/lib/resources/training-missions.ts"), "utf8");
const missionIds = lessons.filter((slug) => missions.includes(`"${slug}"`));
if (missionIds.length !== 10) errors.push(`missions present ${missionIds.length} (need 10)`);

console.log("Word counts:");
for (const [slug, words] of wordCounts) console.log(`  ${slug}: ${words}`);
if (errors.length) {
  console.error("\nCWL validation FAILED:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("\nCWL validation PASSED");
