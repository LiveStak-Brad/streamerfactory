import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseHTML } from "linkedom";
import { buildPageSnapshot } from "../src/parser/index";
import { detectTikTokCreatorNetworkPage } from "../src/parser/detectPage";
import {
  defaultBoundsForKind,
  inferPeriodKindFromLabel,
  readStatPeriodBounds,
} from "../src/parser/statPeriod";
import {
  parseDayCount,
  parseDurationToSeconds,
  parseLiveDaysFromCell,
  parseStreamHoursFromCell,
} from "../src/parser/duration";
import { firstCompactNumber, isNonDiamondStatCell, parseCompactNumber, parseStatNumber } from "../src/parser/numbers";
import {
  cleanTikTokUsername,
  extractUsernameFromText,
  extractUsernameWithConfidence,
  normalizeTikTokUsername,
  usernameCleanupWasSuspicious,
} from "../src/parser/username";

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}`);
    throw e;
  }
}

test("parseCompactNumber handles commas and suffixes", () => {
  assert.equal(parseCompactNumber("3,665"), 3665);
  assert.equal(parseCompactNumber("14.1M"), 14_100_000);
  assert.equal(parseCompactNumber("109.8K"), 109_800);
});

test("parseDurationToSeconds", () => {
  assert.equal(parseDurationToSeconds("1h 5m 48s"), 3948);
  assert.equal(parseDurationToSeconds("90h"), 324000);
  assert.equal(parseDurationToSeconds("2d 3h"), 183600);
  assert.equal(parseDurationToSeconds("Started 1h 20m ago"), 4800);
  assert.equal(parseDurationToSeconds("Live 25m"), 1500);
});

test("parseDayCount", () => {
  assert.equal(parseDayCount("21d"), 21);
  assert.equal(parseDayCount("17 days"), 17);
});

test("parseLiveDaysFromCell uses actual before slash not target", () => {
  assert.equal(parseLiveDaysFromCell("0d / 30d (Level 1)"), 0);
  assert.equal(parseLiveDaysFromCell("1d / 8d (Level 1)"), 1);
  assert.equal(parseLiveDaysFromCell("0d / 8d"), 0);
  assert.equal(parseLiveDaysFromCell("30 days 0d / 30d"), 0);
});

test("parseStreamHoursFromCell uses actual before slash not 20h target", () => {
  assert.equal(parseStreamHoursFromCell("0h / 20h (Level 1)"), 0);
  assert.equal(parseStreamHoursFromCell("2h 32m / 20h (Level 1)"), 2.5);
  assert.equal(parseStreamHoursFromCell("0h / 20h"), 0);
});

test("normalizeTikTokUsername", () => {
  assert.equal(normalizeTikTokUsername("@robertitjerryjr"), "robertitjerryjr");
  assert.equal(normalizeTikTokUsername("  @handle  "), "handle");
});

test("extractUsernameFromText", () => {
  assert.equal(extractUsernameFromText("Peppatice45\nrobertitjerryjr"), "robertitjerryjr");
  assert.equal(extractUsernameFromText("@kaleidoscope_views"), "kaleidoscope_views");
});

test("extractUsernameWithConfidence prefers username-column style handles", () => {
  const res = extractUsernameWithConfidence("SunShine\nsunshine_live_09", { fromUsernameColumn: true });
  assert.equal(res.username, "sunshine_live_09");
  assert.equal(res.confidence, "high");
  assert.equal(res.source, "username_column");
});

test("detectTikTokCreatorNetworkPage manage relationship URL", () => {
  const d = detectTikTokCreatorNetworkPage(
    "https://live-backstage.tiktok.com/portal/anchor/relation",
    { title: "Manage relationship", body: { innerText: "" } } as unknown as Document,
  );
  assert.equal(d.detectedPageType, "manage_relationship");
});

test("detectTikTokCreatorNetworkPage live now", () => {
  const d = detectTikTokCreatorNetworkPage("https://live-backstage.tiktok.com/portal/anchor/live", {
    title: "LIVE now",
    body: { innerText: "creators streaming live" },
  } as unknown as Document);
  assert.equal(d.detectedPageType, "live_now");
});

test("detectTikTokCreatorNetworkPage creator stats", () => {
  const d = detectTikTokCreatorNetworkPage("https://live-backstage.tiktok.com/portal/data/performance", {
    title: "Creator performance",
    body: { innerText: "Valid go LIVE days diamonds activeness" },
  } as unknown as Document);
  assert.equal(d.detectedPageType, "creator_stats");
});

test("firstCompactNumber in mixed text", () => {
  assert.equal(firstCompactNumber("Gifts 413.2K"), 413_200);
});

test("firstCompactNumber handles thousands commas", () => {
  assert.equal(firstCompactNumber("8,729"), 8729);
  assert.equal(firstCompactNumber("6,768"), 6768);
  assert.equal(parseCompactNumber("2,671"), 2671);
});

test("isNonDiamondStatCell rejects day and level cells", () => {
  assert.equal(isNonDiamondStatCell("1d / 8d (Level 1)"), true);
  assert.equal(isNonDiamondStatCell("Level 1"), true);
  assert.equal(isNonDiamondStatCell("8,729"), false);
});

test("parseStatNumber does not return 1 from live day cells", () => {
  assert.equal(parseStatNumber("1d / 8d (Level 1)"), undefined);
  assert.equal(parseStatNumber("8,729"), 8729);
});

test("creator stats table reads days from correct column when creator cell is multiline", () => {
  const html = readFileSync(join(import.meta.dirname, "../fixtures/creator-stats.html"), "utf8");
  const { document } = parseHTML(html);
  const snap = buildPageSnapshot("https://live-backstage.tiktok.com/portal/revenue/task", document);
  assert.equal(snap.rows.length, 2);
  assert.equal(snap.rows[0]?.daysStreamed, 21);
  assert.equal(snap.rows[0]?.hoursStreamed, 90.2);
  assert.equal(snap.rows[1]?.daysStreamed, 17);
});

test("incentives table with eligible incentive days column reads valid go live days", () => {
  const html = readFileSync(
    join(import.meta.dirname, "../fixtures/incentives-by-creator.html"),
    "utf8",
  );
  const { document } = parseHTML(html);
  const snap = buildPageSnapshot("https://live-backstage.tiktok.com/portal/revenue/task", document);
  assert.equal(snap.rows[0]?.daysStreamed, 1);
  assert.equal(snap.rows[2]?.daysStreamed, 0);
});

test("incentives table reads full diamond counts", () => {
  const html = readFileSync(join(import.meta.dirname, "../fixtures/incentives-by-creator.html"), "utf8");
  const { document } = parseHTML(html);
  const snap = buildPageSnapshot("https://live-backstage.tiktok.com/portal/revenue/task", document);
  assert.equal(snap.detectedPageType, "creator_stats");
  assert.equal(snap.rows.length, 3);
  assert.equal(snap.rows[0]?.tiktokUsername, "jasmine_wren");
  assert.equal(snap.rows[0]?.diamondsEarned, 8729);
  assert.equal(snap.rows[1]?.diamondsEarned, 5457);
  assert.equal(snap.rows[2]?.diamondsEarned, 268);
});

test("incentives role=grid reads diamonds without comma", () => {
  const html = readFileSync(join(import.meta.dirname, "../fixtures/incentives-grid.html"), "utf8");
  const { document } = parseHTML(html);
  const snap = buildPageSnapshot("https://live-backstage.tiktok.com/portal/revenue/task", document);
  assert.equal(snap.rows.length, 2);
  assert.equal(snap.rows[0]?.diamondsEarned, 8729);
  assert.equal(snap.rows[0]?.daysStreamed, 1);
  assert.equal(snap.rows[0]?.hoursStreamed, 2.5);
  assert.equal(snap.rows[1]?.diamondsEarned, 248);
  assert.equal(snap.rows[1]?.daysStreamed, 0);
  assert.equal(snap.rows[1]?.hoursStreamed, 0);
});

test("prefers role=grid over stale table rows", () => {
  const html = readFileSync(
    join(import.meta.dirname, "../fixtures/incentives-table-and-grid.html"),
    "utf8",
  );
  const { document } = parseHTML(html);
  const snap = buildPageSnapshot("https://live-backstage.tiktok.com/portal/revenue/task", document);
  assert.equal(snap.rows.length, 1);
  assert.equal(snap.rows[0]?.tiktokUsername, "jasmine_wren");
  assert.equal(snap.rows[0]?.diamondsEarned, 8729);
});

test("ignores summary grid and reads Diamonds column in creator grid", () => {
  const html = readFileSync(
    join(import.meta.dirname, "../fixtures/incentives-misaligned-columns.html"),
    "utf8",
  );
  const { document } = parseHTML(html);
  const snap = buildPageSnapshot("https://live-backstage.tiktok.com/portal/revenue/task", document);
  assert.equal(snap.rows.length, 2);
  assert.equal(snap.rows[0]?.diamondsEarned, 11729);
  assert.equal(snap.rows[1]?.diamondsEarned, 5457);
});

test("reads diamonds from single mega-cell rows without commas", () => {
  const html = readFileSync(
    join(import.meta.dirname, "../fixtures/incentives-single-cell-row.html"),
    "utf8",
  );
  const { document } = parseHTML(html);
  const snap = buildPageSnapshot("https://live-backstage.tiktok.com/portal/revenue/task", document);
  assert.equal(snap.rows.length, 2);
  assert.equal(snap.rows[0]?.diamondsEarned, 8720);
  assert.equal(snap.rows[1]?.diamondsEarned, 5457);
});

test("cleanTikTokUsername strips No level and badge suffixes", () => {
  assert.equal(cleanTikTokUsername("jasmine_wren\nNo level"), "jasmine_wren");
  assert.equal(cleanTikTokUsername("jasmine_wren No level"), "jasmine_wren");
  assert.equal(cleanTikTokUsername("jasmine_wrenNo"), "jasmine_wren");
  assert.equal(cleanTikTokUsername("jasmine_wrennolevel"), "jasmine_wren");
  assert.equal(cleanTikTokUsername("jasmine_wrenNolevel"), "jasmine_wren");
  assert.equal(cleanTikTokUsername("cj_allyson93\nNo level"), "cj_allyson93");
  assert.equal(cleanTikTokUsername("high.blondie\nNo level"), "high.blondie");
  assert.equal(cleanTikTokUsername("high.blondieEligible"), "high.blondie");
  assert.equal(cleanTikTokUsername("dealindaboxNotable"), "dealindabox");
  assert.equal(cleanTikTokUsername("mayamobley\nEligible"), "mayamobley");
  assert.equal(cleanTikTokUsername("_sahm_251_2nolevel"), "_sahm_251_2");
  assert.equal(cleanTikTokUsername("_sahm_251_2\nNo level"), "_sahm_251_2");
  assert.equal(cleanTikTokUsername("user_with_underscores"), "user_with_underscores");
  assert.equal(cleanTikTokUsername("name.with.periods"), "name.with.periods");
  assert.equal(usernameCleanupWasSuspicious("jasmine_wrenNo", "jasmine_wren"), true);
  assert.equal(usernameCleanupWasSuspicious("jasmine_wrennolevel", "jasmine_wren"), true);
});

test("username badge fixture single-line No level does not append nolevel", () => {
  assert.equal(cleanTikTokUsername("jasmine_wren No level"), "jasmine_wren");
  assert.equal(cleanTikTokUsername("jasmine_wrenNo level"), "jasmine_wren");
});

test("picks creator column avatar not level badge icon", () => {
  const html = readFileSync(join(import.meta.dirname, "../fixtures/incentives-avatar-pick.html"), "utf8");
  const { document } = parseHTML(html);
  const snap = buildPageSnapshot("https://live-backstage.tiktok.com/portal/revenue/task", document);
  assert.equal(snap.rows[0]?.tiktokUsername, "dealindabox");
  assert.equal(snap.rows[0]?.avatarUrl?.includes("avatar-correct"), true);
});

test("username badge fixture captures avatars and clean handles", () => {
  const html = readFileSync(
    join(import.meta.dirname, "../fixtures/incentives-username-badges.html"),
    "utf8",
  );
  const { document } = parseHTML(html);
  const snap = buildPageSnapshot("https://live-backstage.tiktok.com/portal/revenue/task", document);
  assert.equal(snap.rows.length, 3);
  assert.equal(snap.rows[0]?.tiktokUsername, "jasmine_wren");
  assert.equal(snap.rows[1]?.tiktokUsername, "cj_allyson93");
  assert.equal(snap.rows[2]?.tiktokUsername, "high.blondie");
  assert.equal(snap.rows[0]?.avatarUrl?.includes("avatar-jasmine"), true);
  assert.equal(snap.rows[0]?.diamondsEarned, 11729);
});

test("infers weekly vs monthly from Backstage period label", () => {
  assert.equal(inferPeriodKindFromLabel("Contribution details · Weekly"), "weekly");
  assert.equal(inferPeriodKindFromLabel("Contribution details · Monthly"), "monthly");
});

test("parses ISO stat period bounds from page text", () => {
  const { document } = parseHTML(
    "<html><body><div>Stats for 2025-05-25 - 2025-05-31</div></body></html>",
  );
  const bounds = readStatPeriodBounds(document);
  assert.equal(bounds?.start, "2025-05-25");
  assert.equal(bounds?.end, "2025-05-31");
});

test("defaultBoundsForKind uses calendar month", () => {
  const bounds = defaultBoundsForKind("monthly", new Date("2025-06-01T12:00:00Z"));
  assert.equal(bounds.start, "2025-06-01");
  assert.equal(bounds.end, "2025-06-30");
});

test("does not treat Level as username", () => {
  const html = readFileSync(join(import.meta.dirname, "../fixtures/incentives-by-creator.html"), "utf8");
  const { document } = parseHTML(html);
  const snap = buildPageSnapshot("https://live-backstage.tiktok.com/portal/revenue/task", document);
  assert.equal(
    snap.rows.some((r) => r.tiktokUsername === "level"),
    false,
  );
});

console.log("\nAll parser tests passed.");
