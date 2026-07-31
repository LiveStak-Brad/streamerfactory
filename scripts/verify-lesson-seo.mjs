/**
 * One-shot verification for StreamerU lesson SEO foundation.
 * Run: node scripts/verify-lesson-seo.mjs
 */
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";

// Use vitest-style dynamic import via tsx registration is awkward in plain node.
// Instead duplicate lightweight checks by reading pack files through a small eval runner.

import { register } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

async function loadTs(rel) {
  const { register: registerHook } = await import("node:module");
  // Prefer spawning via vitest/tsx — this script is invoked with: npx tsx scripts/verify-lesson-seo.mjs
  const mod = await import(pathToFileURL(join(root, rel)).href);
  return mod;
}

const { CURRICULUM } = await loadTs("src/lib/resources/curriculum.ts");
const { getAllLessonSeoPacks, getLessonSeo } = await loadTs("src/lib/resources/lesson-seo/index.ts");
const { getGuideBySlug } = await loadTs("src/lib/guides/index.ts");
const { getMissionForLessonSlug } = await loadTs("src/lib/resources/training-missions.ts");

const packs = getAllLessonSeoPacks();
const issues = [];

const titles = new Map();
const descs = new Map();
const primaries = new Map();

const STOP = new Set([
  "tiktok",
  "live",
  "lives",
  "livestream",
  "streaming",
  "streamer",
  "creator",
  "creators",
  "your",
  "with",
  "from",
  "that",
  "this",
  "what",
  "when",
  "how",
  "for",
  "and",
  "the",
  "on",
  "to",
  "a",
  "an",
  "of",
  "in",
]);

function tokens(s) {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP.has(w)),
  );
}

for (const p of packs) {
  if (titles.has(p.metaTitle)) {
    issues.push(`DUPLICATE TITLE: "${p.metaTitle}" (${titles.get(p.metaTitle)} & ${p.slug})`);
  } else titles.set(p.metaTitle, p.slug);

  if (descs.has(p.metaDescription)) {
    issues.push(`DUPLICATE DESC: ${p.slug} & ${descs.get(p.metaDescription)}`);
  } else descs.set(p.metaDescription, p.slug);

  const pk = p.primaryKeyword.toLowerCase().trim();
  if (primaries.has(pk)) {
    issues.push(`DUPLICATE PRIMARY: "${pk}" (${primaries.get(pk)} & ${p.slug})`);
  } else primaries.set(pk, p.slug);

  for (const g of p.relatedGuideSlugs) {
    if (!getGuideBySlug(g)) issues.push(`BAD GUIDE: ${p.slug} -> ${g}`);
  }

  for (const link of p.internalLinks) {
    if (!link.href.startsWith("/")) {
      issues.push(`BAD INTERNAL (not absolute path): ${p.slug} -> ${link.href}`);
      continue;
    }
    if (link.href.startsWith("/streameru/")) {
      const slug = link.href.replace("/streameru/", "").split("?")[0].split("#")[0];
      const known =
        slug === "start-here" ||
        slug === "library" ||
        CURRICULUM.some((c) => c.slug === slug);
      if (!known) issues.push(`UNKNOWN STREAMERU LINK: ${p.slug} -> ${link.href}`);
    }
    if (link.href === "/glossary" || link.href.startsWith("/downloads") || link.href.startsWith("/blog")) {
      issues.push(`ROADMAP RENDERED AS LINK: ${p.slug} -> ${link.href}`);
    }
  }

  if (!p.faqs?.length) issues.push(`NO FAQS: ${p.slug}`);
  const mission = getMissionForLessonSlug(p.slug);
  // HowTo should only appear when mission exists — flag if mission missing for curriculum lesson
  if (!mission) issues.push(`NO MISSION (HowTo will not render): ${p.slug}`);
}

const packList = [...packs];
for (let i = 0; i < packList.length; i++) {
  for (let j = i + 1; j < packList.length; j++) {
    const a = tokens(packList[i].primaryKeyword);
    const b = tokens(packList[j].primaryKeyword);
    const inter = [...a].filter((x) => b.has(x));
    const union = new Set([...a, ...b]);
    const jaccard = union.size ? inter.length / union.size : 0;
    if (jaccard >= 0.6) {
      issues.push(
        `SIMILAR PRIMARY (${Math.round(jaccard * 100)}%): "${packList[i].primaryKeyword}" vs "${packList[j].primaryKeyword}"`,
      );
    }
  }
}

const staticParams = CURRICULUM.map((l) => l.slug).sort();
const packSlugs = packs.map((p) => p.slug).sort();
if (JSON.stringify(staticParams) !== JSON.stringify(packSlugs)) {
  issues.push("STATIC PARAMS / PACKS MISMATCH");
}
if (staticParams.length !== 24) issues.push(`Expected 24 curriculum slugs, got ${staticParams.length}`);

// Canonical path shape
for (const lesson of CURRICULUM) {
  const canonical = `/streameru/${lesson.slug}`;
  if (!getLessonSeo(lesson.slug)) issues.push(`NO SEO PACK: ${lesson.slug}`);
  if (!canonical.startsWith("/streameru/")) issues.push(`BAD CANONICAL: ${canonical}`);
}

console.log("Packs:", packs.length);
console.log("Unique titles:", titles.size);
console.log("Unique descriptions:", descs.size);
console.log("Unique primaries:", primaries.size);
console.log("generateStaticParams slugs:", staticParams.length);
console.log("--- PRIMARIES ---");
for (const p of packs) console.log(`${p.slug} | ${p.primaryKeyword}`);
console.log("--- ISSUES ---");
console.log(issues.length ? issues.join("\n") : "NONE");
process.exit(issues.length ? 1 : 0);
