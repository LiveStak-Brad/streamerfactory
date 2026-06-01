import assert from "node:assert/strict";
import { detectTikTokCreatorNetworkPage } from "../src/parser/detectPage";
import { parseDurationToSeconds, parseDayCount } from "../src/parser/duration";
import { parseCompactNumber, firstCompactNumber } from "../src/parser/numbers";
import {
  extractUsernameFromText,
  extractUsernameWithConfidence,
  normalizeTikTokUsername,
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

console.log("\nAll parser tests passed.");
