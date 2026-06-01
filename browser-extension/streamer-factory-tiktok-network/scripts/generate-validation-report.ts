/**
 * Runs parser against HTML fixtures and writes validation/PARSER_DETECTION_REPORT.md
 * Run: npm run validate:parser
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseHTML } from "linkedom";
import { buildPageSnapshot } from "../src/parser/index.js";
import type { PageSnapshot, ParsedCreatorRow, ParsedLiveRow } from "../src/parser/types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const fixturesDir = path.join(root, "fixtures");
const validationDir = path.join(root, "validation");
const previewsDir = path.join(validationDir, "popup-previews");

type Confidence = "High" | "Medium" | "Low";

type FieldResult = {
  field: string;
  detected: boolean;
  value?: string | number;
  confidence: Confidence;
  note?: string;
};

type ScenarioResult = {
  name: string;
  fixture: string;
  url: string;
  snapshot: PageSnapshot;
  payload: unknown;
  popupPreviewLines: string[];
  fieldResults: FieldResult[];
  fieldsMissed: string[];
};

const SCENARIOS: Array<{ name: string; fixture: string; url: string }> = [
  {
    name: "Manage Relationship — Removed",
    fixture: "manage-relationship.html",
    url: "https://live-backstage.tiktok.com/portal/anchor/relation?tab=removed",
  },
  {
    name: "Manage Relationship — Invited",
    fixture: "manage-relationship-invited.html",
    url: "https://live-backstage.tiktok.com/portal/anchor/relation?tab=invited",
  },
  {
    name: "Manage Relationship — Quit",
    fixture: "manage-relationship-quit.html",
    url: "https://live-backstage.tiktok.com/portal/anchor/relation?tab=quit",
  },
  {
    name: "LIVE Now",
    fixture: "live-now.html",
    url: "https://live-backstage.tiktok.com/portal/anchor/live",
  },
  {
    name: "Creator Stats / Performance",
    fixture: "creator-stats.html",
    url: "https://live-backstage.tiktok.com/portal/data/performance",
  },
];

function stripPreview<T extends { rawTextPreview?: string }>(row: T) {
  const { rawTextPreview: _r, ...rest } = row;
  return rest;
}

function snapshotToPayload(snapshot: PageSnapshot) {
  return {
    sourcePageUrl: snapshot.sourcePageUrl,
    detectedPageType: snapshot.detectedPageType,
    relationshipTab: snapshot.relationshipTab,
    statPeriodLabel: snapshot.statPeriodLabel,
    rows: snapshot.rows.map(stripPreview),
    liveRows: snapshot.liveRows.length ? snapshot.liveRows.map(stripPreview) : undefined,
  };
}

function conf(detected: boolean, fixtureBacked: boolean): Confidence {
  if (!detected) return "Low";
  return fixtureBacked ? "High" : "Medium";
}

function evaluateRelationship(row: ParsedCreatorRow, tab?: string): FieldResult[] {
  return [
    {
      field: "username",
      detected: Boolean(row.tiktokUsername),
      value: row.tiktokUsername,
      confidence: conf(Boolean(row.tiktokUsername), true),
    },
    {
      field: "display name",
      detected: Boolean(row.displayName),
      value: row.displayName,
      confidence: conf(Boolean(row.displayName), true),
    },
    {
      field: "avatar",
      detected: Boolean(row.avatarUrl),
      value: row.avatarUrl,
      confidence: conf(Boolean(row.avatarUrl), true),
    },
    {
      field: "request date",
      detected: Boolean(row.relationshipRequestDate),
      value: row.relationshipRequestDate,
      confidence: conf(Boolean(row.relationshipRequestDate), true),
    },
    {
      field: "reason",
      detected: Boolean(row.relationshipReason),
      value: row.relationshipReason,
      confidence: conf(Boolean(row.relationshipReason), true),
    },
    {
      field: "relationship status",
      detected: Boolean(row.creatorNetworkStatus ?? row.inviteStatus ?? tab),
      value: row.creatorNetworkStatus ?? row.inviteStatus ?? tab,
      confidence: conf(Boolean(row.creatorNetworkStatus ?? tab), Boolean(tab)),
      note: tab ? "From active tab label in fixture" : undefined,
    },
  ];
}

function evaluateLive(row: ParsedLiveRow): FieldResult[] {
  return [
    {
      field: "username",
      detected: Boolean(row.tiktokUsername),
      value: row.tiktokUsername,
      confidence: conf(Boolean(row.tiktokUsername), true),
    },
    {
      field: "display name",
      detected: Boolean(row.displayName),
      value: row.displayName,
      confidence: conf(Boolean(row.displayName), true),
    },
    {
      field: "avatar",
      detected: Boolean(row.avatarUrl),
      value: row.avatarUrl,
      confidence: conf(Boolean(row.avatarUrl), true),
    },
    {
      field: "stream title",
      detected: Boolean(row.streamTitle),
      value: row.streamTitle,
      confidence: conf(Boolean(row.streamTitle), true),
      note: "Heuristic — may pick display line on real DOM",
    },
    {
      field: "live duration",
      detected: Boolean(row.liveStartedText),
      value: row.liveStartedText,
      confidence: conf(Boolean(row.liveStartedText), true),
      note: "Parsed from started/duration text, not seconds on live rows",
    },
    {
      field: "viewer count",
      detected: Boolean(row.viewerCountText),
      value: row.viewerCountText,
      confidence: conf(Boolean(row.viewerCountText), true),
    },
  ];
}

function evaluateStats(row: ParsedCreatorRow): FieldResult[] {
  return [
    {
      field: "coins",
      detected: row.coinsEarned !== undefined && row.coinsEarned > 0,
      value: row.coinsEarned,
      confidence: conf(row.coinsEarned !== undefined && row.coinsEarned > 0, true),
      note: "Mapped from Gifts/diamonds column",
    },
    {
      field: "hours",
      detected: row.hoursStreamed !== undefined && row.hoursStreamed > 0,
      value: row.hoursStreamed,
      confidence: conf(row.hoursStreamed !== undefined && row.hoursStreamed > 0, true),
    },
    {
      field: "days",
      detected: row.daysStreamed !== undefined && row.daysStreamed > 0,
      value: row.daysStreamed,
      confidence: conf(row.daysStreamed !== undefined && row.daysStreamed > 0, true),
    },
    {
      field: "activeness",
      detected: Boolean(row.activenessLevel && row.activenessLevel !== "none"),
      value: row.activenessLevel,
      confidence: conf(Boolean(row.activenessLevel && row.activenessLevel !== "none"), true),
    },
    {
      field: "engagements",
      detected: row.engagements !== undefined && row.engagements > 0,
      value: row.engagements,
      confidence: conf(row.engagements !== undefined && row.engagements > 0, true),
    },
  ];
}

function popupPreviewLines(snapshot: PageSnapshot): string[] {
  if (snapshot.detectedPageType === "live_now") {
    return snapshot.liveRows.slice(0, 5).map(
      (r) => `@${r.tiktokUsername ?? "?"} · ${r.displayName ?? ""} · ${r.viewerCountText ?? ""}`,
    );
  }
  return snapshot.rows.slice(0, 5).map((r) => `@${r.tiktokUsername ?? "?"} · ${r.displayName ?? ""}`);
}

function runScenario(scenario: (typeof SCENARIOS)[0]): ScenarioResult {
  const html = fs.readFileSync(path.join(fixturesDir, scenario.fixture), "utf8");
  const { document } = parseHTML(html);
  const snapshot = buildPageSnapshot(scenario.url, document as unknown as Document);
  const payload = snapshotToPayload(snapshot);

  let fieldResults: FieldResult[] = [];
  const firstRow = snapshot.rows[0];
  const firstLive = snapshot.liveRows[0];

  if (snapshot.detectedPageType === "manage_relationship" && firstRow) {
    fieldResults = evaluateRelationship(firstRow, snapshot.relationshipTab);
  } else if (snapshot.detectedPageType === "live_now" && firstLive) {
    fieldResults = evaluateLive(firstLive);
  } else if (snapshot.detectedPageType === "creator_stats" && firstRow) {
    fieldResults = evaluateStats(firstRow);
  }

  const fieldsMissed = fieldResults.filter((f) => !f.detected).map((f) => f.field);

  return {
    name: scenario.name,
    fixture: scenario.fixture,
    url: scenario.url,
    snapshot,
    payload,
    popupPreviewLines: popupPreviewLines(snapshot),
    fieldResults,
    fieldsMissed,
  };
}

function writePopupPreviewHtml(result: ScenarioResult) {
  const slug = result.fixture.replace(".html", "");
  const previewText =
    result.popupPreviewLines.length > 0
      ? result.popupPreviewLines.join("\n")
      : "No rows detected on this page yet.";

  const html = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /><title>Popup preview — ${result.name}</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 0; padding: 14px; width: 360px; background: #fafafa; color: #111; }
  h1 { font-size: 15px; margin: 0 0 4px; }
  .muted { color: #666; font-size: 12px; }
  .status.ok { margin: 10px 0; padding: 8px 10px; border-radius: 8px; font-size: 12px; background: #ecfdf5; color: #065f46; }
  .row-meta { display: flex; justify-content: space-between; font-size: 12px; margin: 8px 0; }
  pre { font-size: 10px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 8px; max-height: 160px; overflow: auto; white-space: pre-wrap; }
  .tag { display: inline-block; background: #eef2ff; padding: 2px 8px; border-radius: 999px; font-size: 11px; margin-top: 8px; }
</style></head><body>
  <h1>Streamer Factory · TikTok Network</h1>
  <p class="muted">Simulated popup preview (fixture validation)</p>
  <div class="status ok">Fixture test · not live TikTok DOM</div>
  <div class="row-meta">
    <span>Page: ${result.snapshot.detectedPageType}${result.snapshot.relationshipTab ? ` · ${result.snapshot.relationshipTab}` : ""}</span>
    <span>Rows: ${result.snapshot.detectedPageType === "live_now" ? result.snapshot.liveRows.length : result.snapshot.rows.length}</span>
  </div>
  <pre>${previewText.replace(/</g, "&lt;")}</pre>
  <span class="tag">${result.name}</span>
</body></html>`;

  fs.writeFileSync(path.join(previewsDir, `${slug}-popup-preview.html`), html, "utf8");
}

function writeMarkdownReport(results: ScenarioResult[]) {
  const lines: string[] = [
    "# Parser Detection Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "> **Scope:** Automated validation against HTML fixtures that mirror known Backstage layouts.",
    "> Live TikTok Backstage DOM was **not** accessed in this run (requires your logged-in browser).",
    "> Use `validation/live-page-console-snippet.js` on real pages for live validation.",
    "",
    "## Extension load status",
    "",
    "- Built: `npm run build` in `browser-extension/streamer-factory-tiktok-network`",
    "- Load unpacked in Chrome → select extension folder",
    "- Popup previews saved under `validation/popup-previews/`",
    "",
    "---",
    "",
  ];

  for (const r of results) {
    lines.push(`## ${r.name}`);
    lines.push("");
    lines.push(`- **Fixture:** \`${r.fixture}\``);
    lines.push(`- **Simulated URL:** \`${r.url}\``);
    lines.push(`- **Detected page type:** \`${r.snapshot.detectedPageType}\``);
    if (r.snapshot.relationshipTab) {
      lines.push(`- **Relationship tab:** \`${r.snapshot.relationshipTab}\``);
    }
    if (r.snapshot.statPeriodLabel) {
      lines.push(`- **Stat period label:** \`${r.snapshot.statPeriodLabel}\``);
    }
    lines.push(
      `- **Row count:** ${r.snapshot.detectedPageType === "live_now" ? r.snapshot.liveRows.length : r.snapshot.rows.length}`,
    );
    lines.push(`- **Popup preview file:** \`validation/popup-previews/${r.fixture.replace(".html", "")}-popup-preview.html\``);
    lines.push("");
    lines.push("### Popup preview (text)");
    lines.push("```");
    lines.push(r.popupPreviewLines.length ? r.popupPreviewLines.join("\n") : "(no rows)");
    lines.push("```");
    lines.push("");
    lines.push("### Field detection (first row)");
    lines.push("");
    lines.push("| Field | Detected | Value | Confidence | Notes |");
    lines.push("|-------|----------|-------|------------|-------|");
    for (const f of r.fieldResults) {
      lines.push(
        `| ${f.field} | ${f.detected ? "Yes" : "**No**"} | ${f.value ?? "—"} | ${f.confidence} | ${f.note ?? ""} |`,
      );
    }
    lines.push("");
    lines.push(
      `**Fields missed (first row):** ${r.fieldsMissed.length ? r.fieldsMissed.join(", ") : "none"}`,
    );
    lines.push("");
    lines.push("### Raw JSON payload");
    lines.push("```json");
    lines.push(JSON.stringify(r.payload, null, 2));
    lines.push("```");
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  lines.push("## Summary confidence matrix");
  lines.push("");
  lines.push("| Page type | Field | Fixture confidence | Live TikTok confidence (estimated) |");
  lines.push("|-----------|-------|-------------------|----------------------------------|");

  const liveEstimates: Record<string, Record<string, Confidence>> = {
    "manage_relationship": {
      username: "Medium",
      "display name": "Medium",
      avatar: "High",
      "request date": "High",
      reason: "High",
      "relationship status": "Medium",
    },
    live_now: {
      username: "Medium",
      "display name": "Medium",
      avatar: "High",
      "stream title": "Low",
      "live duration": "Low",
      "viewer count": "Medium",
    },
    creator_stats: {
      coins: "Medium",
      hours: "Medium",
      days: "Medium",
      activeness: "Medium",
      engagements: "Low",
    },
  };

  for (const r of results) {
    const type = r.snapshot.detectedPageType;
    for (const f of r.fieldResults) {
      lines.push(
        `| ${type} | ${f.field} | ${f.confidence} | ${liveEstimates[type]?.[f.field] ?? "Low"} |`,
      );
    }
  }

  lines.push("");
  lines.push("## Next step: validate on live Backstage");
  lines.push("");
  lines.push("1. Load extension unpacked in Chrome");
  lines.push("2. Log into TikTok Backstage");
  lines.push("3. Open DevTools console on each page");
  lines.push("4. Paste contents of `validation/live-page-console-snippet.js`");
  lines.push("5. Copy JSON output into `validation/live-captures/` for comparison");

  fs.writeFileSync(path.join(validationDir, "PARSER_DETECTION_REPORT.md"), lines.join("\n"), "utf8");
}

function writePayloadJson(results: ScenarioResult[]) {
  const outDir = path.join(validationDir, "payloads");
  fs.mkdirSync(outDir, { recursive: true });
  for (const r of results) {
    fs.writeFileSync(
      path.join(outDir, `${r.fixture.replace(".html", "")}.json`),
      JSON.stringify(r.payload, null, 2),
      "utf8",
    );
  }
}

fs.mkdirSync(previewsDir, { recursive: true });
fs.mkdirSync(validationDir, { recursive: true });

const results = SCENARIOS.map(runScenario);
for (const r of results) writePopupPreviewHtml(r);
writeMarkdownReport(results);
writePayloadJson(results);

console.log(`Validation complete. Report: validation/PARSER_DETECTION_REPORT.md`);
for (const r of results) {
  const count = r.snapshot.detectedPageType === "live_now" ? r.snapshot.liveRows.length : r.snapshot.rows.length;
  console.log(`  ${r.name}: ${r.snapshot.detectedPageType} · ${count} rows · missed: ${r.fieldsMissed.join(", ") || "none"}`);
}
