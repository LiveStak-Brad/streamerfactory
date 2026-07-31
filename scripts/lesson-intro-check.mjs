import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/content/streameru/lessons");
const files = (await readdir(dir)).filter((f) => f.endsWith(".ts") && f !== "index.ts");
const firstSentences = [];
let total = 0;

for (const file of files) {
  const raw = await readFile(path.join(dir, file), "utf8");
  const content = raw.match(/content:\s*`([\s\S]*?)`\s*,?\s*\}/)?.[1] ?? "";
  const words = content.trim().split(/\s+/).length;
  total += words;
  const intro = content.match(/## Introduction\n\n([^\n]+)/)?.[1] ?? "";
  firstSentences.push({ file, words, intro: intro.slice(0, 120) });
}

firstSentences.sort((a, b) => a.file.localeCompare(b.file));
for (const row of firstSentences) {
  console.log(`${String(row.words).padStart(5)}  ${row.file}`);
  console.log(`       ${row.intro}`);
}
console.log(`\nTOTAL words: ${total}  AVG: ${Math.round(total / files.length)}`);
