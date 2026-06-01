/**
 * Analyze saved live Backstage capture JSON files.
 * Usage: node scripts/analyze-live-captures.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const capturesDir = path.join(__dirname, "..", "validation", "live-captures");

function listCaptureFiles() {
  if (!fs.existsSync(capturesDir)) return [];
  return fs
    .readdirSync(capturesDir)
    .filter((f) => f.endsWith(".json") && f !== "package.json")
    .map((f) => path.join(capturesDir, f));
}

function analyzeFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return { file: path.basename(filePath), error: "Invalid JSON" };
  }

  const pageType = data.pageType ?? data.snapshot?.detectedPageType ?? data.payload?.detectedPageType ?? "?";
  const rows = data.snapshot?.rows ?? data.payload?.rows ?? [];
  const liveRows = data.snapshot?.liveRows ?? data.payload?.liveRows ?? [];
  const allRows = pageType === "live_now" ? liveRows : rows;

  const confidenceCounts = { high: 0, medium: 0, low: 0, missing: 0 };
  const usernames = [];

  for (const r of allRows) {
    const c = (r.usernameConfidence ?? "missing").toLowerCase();
    if (c in confidenceCounts) confidenceCounts[c]++;
    else confidenceCounts.missing++;
    if (r.tiktokUsername) {
      usernames.push({
        username: r.tiktokUsername,
        confidence: r.usernameConfidence ?? "—",
        source: r.usernameSource ?? "—",
        displayName: r.displayName ?? "—",
      });
    }
  }

  const withEngagements = rows.filter((r) => (r.engagements ?? 0) > 0).length;
  const withCoins = rows.filter((r) => (r.coinsEarned ?? 0) > 0).length;
  const liveWithDuration = liveRows.filter((r) => r.liveStartedText).length;
  const liveWithViewers = liveRows.filter((r) => r.viewerCountText).length;

  const highMedium =
    allRows.length > 0
      ? Math.round(
          ((confidenceCounts.high + confidenceCounts.medium) / allRows.length) * 100,
        )
      : 0;

  return {
    file: path.basename(filePath),
    pageType,
    relationshipTab: data.snapshot?.relationshipTab ?? data.payload?.relationshipTab,
    rowCount: allRows.length,
    confidenceCounts,
    usernameAccuracyProxy: `${highMedium}% high+medium (target 95%+)`,
    usernames,
    stats: pageType === "creator_stats" ? { withCoins, withEngagements, total: rows.length } : undefined,
    live:
      pageType === "live_now"
        ? {
            withDuration: liveWithDuration,
            withViewers: liveWithViewers,
            withBadge: liveRows.filter((r) => r.liveBadgeDetected).length,
            total: liveRows.length,
          }
        : undefined,
  };
}

const files = listCaptureFiles();
if (files.length === 0) {
  console.log("No capture JSON files in validation/live-captures/");
  console.log("Save captures as removed.json, live-now.json, creator-stats.json, etc.");
  process.exit(0);
}

console.log("=== Live Backstage capture analysis ===\n");
for (const f of files) {
  const report = analyzeFile(f);
  console.log(JSON.stringify(report, null, 2));
  console.log("");
}
