import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/content/streameru/lessons");
const files = (await readdir(dir)).filter((f) => f.endsWith(".ts") && f !== "index.ts");

for (const file of files) {
  const raw = await readFile(path.join(dir, file), "utf8");
  const ticks = (raw.match(/`/g) ?? []).length;
  if (ticks % 2 !== 0) console.log(`ODD BACKTICKS (${ticks}): ${file}`);
  if (!raw.includes("export const lesson")) console.log(`NO EXPORT: ${file}`);
  // Count unescaped ${ inside content template — usually fine if intentional
  const contentStart = raw.indexOf("content:");
  const after = raw.slice(contentStart);
  const firstTick = after.indexOf("`");
  const lastTick = after.lastIndexOf("`");
  if (firstTick < 0 || lastTick <= firstTick) console.log(`BAD CONTENT TICKS: ${file}`);
}
console.log("done");
