/**
 * Word-count + section check for StreamerU expanded lessons.
 * Run: node scripts/lesson-wordcount.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "../src/content/streameru/lessons");
const REQUIRED = [
  "Introduction",
  "Objectives",
  "Estimated time",
  "Prerequisites",
  "Lesson",
  "Examples",
  "Real-world scenarios",
  "Screenshots",
  "Pro Tips",
  "Common Mistakes",
  "Summary",
  "Mission",
  "Downloads",
  "Related Lessons",
  "Next Lesson",
];

const files = (await readdir(dir)).filter((f) => f.endsWith(".ts") && f !== "index.ts");
const rows = [];

for (const file of files) {
  const raw = await readFile(path.join(dir, file), "utf8");
  const contentMatch = raw.match(/content:\s*`([\s\S]*?)`\s*,?\s*\}/);
  const content = contentMatch?.[1] ?? "";
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const missing = REQUIRED.filter((h) => !content.includes(`## ${h}`));
  const screenshots = (content.match(/\[Screenshot:/g) ?? []).length;
  rows.push({ file, words, missing, screenshots });
}

rows.sort((a, b) => a.file.localeCompare(b.file));
let ok = 0;
for (const r of rows) {
  const status =
    r.words >= 1500 && r.words <= 3000 && r.missing.length === 0 ? "OK" : "FIX";
  if (status === "OK") ok++;
  console.log(
    `${status.padEnd(3)} ${String(r.words).padStart(5)}w  shots=${r.screenshots}  ${r.file}` +
      (r.missing.length ? `  missing: ${r.missing.join(", ")}` : ""),
  );
}
console.log(`\n${ok}/${rows.length} lessons in range with all sections.`);
