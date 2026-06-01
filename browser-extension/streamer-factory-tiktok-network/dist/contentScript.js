"use strict";
(() => {
  // src/parser/detectPage.ts
  var BACKSTAGE_HOSTS = ["live-backstage.tiktok.com", "seller-us.tiktok.com", "seller.tiktok.com"];
  function isTikTokCreatorNetworkHost(url) {
    try {
      const u = new URL(url);
      return BACKSTAGE_HOSTS.some((h) => u.hostname === h || u.hostname.endsWith(`.${h}`));
    } catch {
      return false;
    }
  }
  function readActiveRelationshipTab(doc) {
    if (typeof doc.querySelector !== "function") return void 0;
    const tabSelectors = [
      '[role="tab"][aria-selected="true"]',
      ".semi-tabs-tab-active",
      '[class*="tab"][class*="active"]',
      '[class*="Tab"][class*="active"]'
    ];
    for (const sel of tabSelectors) {
      const el = doc.querySelector(sel);
      const text = el?.textContent?.trim();
      if (text && text.length < 40) return text.replace(/\d+/g, "").trim();
    }
    return void 0;
  }
  function readPeriodLabel(doc) {
    if (typeof doc.querySelectorAll !== "function") return void 0;
    const headings = Array.from(doc.querySelectorAll("h1, h2, h3, [class*='title'], [class*='Title']"));
    for (const h of headings) {
      const t = h.textContent?.trim() ?? "";
      if (/contribution|performance|creator|week|month|period/i.test(t) && t.length < 120) {
        return t;
      }
    }
    return void 0;
  }
  function detectTikTokCreatorNetworkPage(url, doc = document) {
    if (!isTikTokCreatorNetworkHost(url)) {
      return { detectedPageType: "unknown" };
    }
    let path = "";
    try {
      path = new URL(url).pathname.toLowerCase();
    } catch {
      path = "";
    }
    const title = doc.title.toLowerCase();
    const bodyText = (doc.body?.innerText ?? "").slice(0, 4e3).toLowerCase();
    if (path.includes("/relation") || path.includes("/relationship") || title.includes("manage relationship") || bodyText.includes("manage relationship")) {
      return {
        detectedPageType: "manage_relationship",
        relationshipTab: readActiveRelationshipTab(doc)
      };
    }
    if (path.includes("/anchor/live") || path.includes("/live-now") || path.includes("livenow") || path.includes("/live") && !path.includes("/relation") || title.includes("live now") || bodyText.includes("creators who are live now")) {
      return { detectedPageType: "live_now" };
    }
    if (path.includes("/performance") || path.includes("/contribution") || path.includes("/data/") || path.includes("/analytics") || path.includes("/creator") || title.includes("performance") || title.includes("contribution") || bodyText.includes("coins earned") || bodyText.includes("diamonds") || bodyText.includes("valid go live") || bodyText.includes("activeness")) {
      return {
        detectedPageType: "creator_stats",
        statPeriodLabel: readPeriodLabel(doc)
      };
    }
    return { detectedPageType: "unknown" };
  }

  // src/parser/numbers.ts
  function parseCompactNumber(raw) {
    if (!raw) return void 0;
    const t = raw.trim().replace(/,/g, "");
    if (!t) return void 0;
    const m = t.match(/^([+-]?\d+(?:\.\d+)?)\s*([kmb])?$/i);
    if (!m) {
      const digits = t.replace(/[^\d.-]/g, "");
      if (!digits) return void 0;
      const n = Number(digits);
      return Number.isFinite(n) ? Math.round(n) : void 0;
    }
    const base = Number(m[1]);
    if (!Number.isFinite(base)) return void 0;
    const suffix = (m[2] ?? "").toLowerCase();
    let mult = 1;
    if (suffix === "k") mult = 1e3;
    if (suffix === "m") mult = 1e6;
    if (suffix === "b") mult = 1e9;
    return Math.round(base * mult);
  }
  function firstCompactNumber(text) {
    const cleaned = text.replace(/,/g, " ");
    const m = cleaned.match(/(\d+(?:\.\d+)?)\s*([kmb])?\b/i);
    if (!m) return void 0;
    return parseCompactNumber(`${m[1]}${m[2] ?? ""}`);
  }

  // src/parser/username.ts
  function normalizeTikTokUsername(raw) {
    if (!raw) return void 0;
    const t = raw.trim().replace(/^@+/, "").replace(/\s+/g, "");
    if (!/^[a-zA-Z0-9._]{2,40}$/.test(t)) return void 0;
    if (!t) return void 0;
    return t;
  }
  var AT_RE = /@([a-zA-Z0-9._]{2,40})/g;
  var HANDLE_RE = /\b([a-zA-Z0-9._]{2,40})\b/g;
  function looksLikeTikTokHandle(line) {
    if (!/^[a-zA-Z0-9._]{2,40}$/.test(line)) return false;
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(line)) return false;
    if (/^(invited|removed|quit|following|creator|member|network|live|viewers?)$/i.test(line)) return false;
    return line === line.toLowerCase() || /[_.\d]/.test(line);
  }
  function preferHandle(a, b) {
    const aScore = Number(/[_.\d]/.test(a)) + Number(a === a.toLowerCase());
    const bScore = Number(/[_.\d]/.test(b)) + Number(b === b.toLowerCase());
    return aScore >= bScore ? a : b;
  }
  function inferUsernameFromDisplayName(displayName) {
    const normalized = normalizeTikTokUsername(displayName ?? void 0);
    if (!normalized) return void 0;
    return normalized;
  }
  function extractUsernameWithConfidence(text, opts) {
    const normalizedLines = text.split(/\n/).map((l) => l.trim()).filter(Boolean);
    let bestAt;
    for (const line of normalizedLines) {
      AT_RE.lastIndex = 0;
      let m;
      while ((m = AT_RE.exec(line)) !== null) {
        const candidate = normalizeTikTokUsername(m[1]);
        if (!candidate) continue;
        bestAt = bestAt ? preferHandle(bestAt, candidate) : candidate;
      }
    }
    if (bestAt) {
      return {
        username: bestAt,
        confidence: opts?.fromUsernameColumn ? "high" : "medium",
        source: opts?.fromUsernameColumn ? "username_column" : "at_handle"
      };
    }
    let bestPattern;
    for (let i = normalizedLines.length - 1; i >= 0; i -= 1) {
      const line = normalizedLines[i];
      if (looksLikeTikTokHandle(line)) {
        const candidate = normalizeTikTokUsername(line);
        if (candidate) {
          bestPattern = bestPattern ? preferHandle(bestPattern, candidate) : candidate;
        }
        continue;
      }
      HANDLE_RE.lastIndex = 0;
      let m;
      while ((m = HANDLE_RE.exec(line)) !== null) {
        const candidate = normalizeTikTokUsername(m[1]);
        if (!candidate || !looksLikeTikTokHandle(candidate)) continue;
        bestPattern = bestPattern ? preferHandle(bestPattern, candidate) : candidate;
      }
    }
    if (bestPattern) {
      return {
        username: bestPattern,
        confidence: opts?.fromUsernameColumn ? "high" : "medium",
        source: opts?.fromUsernameColumn ? "username_column" : "handle_pattern"
      };
    }
    const fallback = inferUsernameFromDisplayName(opts?.displayName);
    if (fallback) {
      return { username: fallback, confidence: "low", source: "display_name_inferred" };
    }
    return { username: void 0, confidence: "low", source: "display_name_inferred" };
  }
  function extractUsernameFromText(text) {
    return extractUsernameWithConfidence(text).username;
  }

  // src/parser/extractLiveNow.ts
  function liveCardElements(doc) {
    const selectors = [
      "table tbody tr",
      '[role="row"]',
      '[class*="live"][class*="card"]',
      '[class*="Live"][class*="Card"]',
      '[class*="live"][class*="item"]',
      '[class*="Live"][class*="Item"]',
      "li"
    ];
    const found = /* @__PURE__ */ new Set();
    for (const sel of selectors) {
      for (const el of Array.from(doc.querySelectorAll(sel))) {
        const text = (el.textContent ?? "").toLowerCase();
        if (text.includes("live") || text.includes("@") || el.querySelector("img[src]") || /\d+\s*viewer/i.test(text)) {
          if ((el.textContent?.length ?? 0) > 8 && (el.textContent?.length ?? 0) < 600) {
            found.add(el);
          }
        }
      }
    }
    return [...found];
  }
  function avatarFrom(el) {
    const img = el.querySelector("img[src]");
    const src = img?.getAttribute("src");
    if (src && !src.startsWith("data:")) return src;
    return void 0;
  }
  function parseLiveCard(el) {
    const text = (el.textContent ?? "").trim();
    if (!text) return null;
    const usernameCandidate = extractUsernameWithConfidence(text, {
      fromUsernameColumn: true,
      displayName: void 0
    });
    const username = usernameCandidate.username;
    if (!username) return null;
    const lines = text.split(/\n/).map((l) => l.trim()).filter(Boolean);
    let streamTitle;
    let viewerCountText;
    let liveStartedText;
    let displayName;
    for (const line of lines) {
      const lower = line.toLowerCase();
      if (!viewerCountText && (lower.includes("viewer") || lower.includes("watching"))) {
        viewerCountText = line;
      } else if (!liveStartedText && (lower.includes("started") || lower.includes("duration") || /^live\s+\d+/i.test(line) || /started\s+\d+\s*h/i.test(line) || /started\s+\d+\s*m/i.test(line) || /\blive\s+\d+\s*h/i.test(line) || /\blive\s+\d+\s*m/i.test(line))) {
        liveStartedText = line;
      } else if (!streamTitle && line !== username && !line.includes("@") && line.length > 3 && line.length < 100 && !/^\d+$/.test(line)) {
        if (!displayName && !lower.includes("live")) displayName = line;
        else if (!streamTitle) streamTitle = line;
      }
    }
    if (!displayName) {
      displayName = lines.find((l) => l !== username && !l.startsWith("@") && l.length < 60);
    }
    const viewerNum = firstCompactNumber(viewerCountText ?? text);
    if (viewerNum !== void 0 && !viewerCountText) {
      viewerCountText = `${viewerNum} viewers`;
    }
    const liveBadgeDetected = /\blive\b/i.test(text) || Boolean(el.querySelector('[class*="live"], [class*="Live"], [aria-label*="live" i]'));
    return {
      tiktokUsername: username,
      usernameConfidence: usernameCandidate.confidence,
      usernameSource: usernameCandidate.source,
      displayName,
      avatarUrl: avatarFrom(el),
      streamTitle,
      viewerCountText,
      liveStartedText,
      liveBadgeDetected,
      rawTextPreview: text.slice(0, 180)
    };
  }
  function dedupeLive(rows) {
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    for (const r of rows) {
      const key = normalizeTikTokUsername(r.tiktokUsername) ?? "";
      if (!key || seen.has(key)) continue;
      seen.add(key);
      out.push(r);
    }
    return out;
  }
  function extractLiveNowRowsFromPage(doc = document) {
    const cards = liveCardElements(doc);
    const rows = [];
    for (const el of cards) {
      const parsed = parseLiveCard(el);
      if (parsed) rows.push(parsed);
    }
    return dedupeLive(rows);
  }

  // src/parser/duration.ts
  function parseDurationToSeconds(raw) {
    if (!raw) return void 0;
    const t = raw.trim().toLowerCase();
    if (!t) return void 0;
    let total = 0;
    let matched = false;
    const dayMatch = t.match(/(\d+(?:\.\d+)?)\s*d(?:ays?)?/);
    if (dayMatch) {
      total += Number(dayMatch[1]) * 86400;
      matched = true;
    }
    const hourMatch = t.match(/(\d+(?:\.\d+)?)\s*h(?:ours?|rs?)?/);
    if (hourMatch) {
      total += Number(hourMatch[1]) * 3600;
      matched = true;
    } else if (/^\d+(?:\.\d+)?\s*h?$/.test(t) && t.includes("h")) {
      const n = Number(t.replace(/h/g, ""));
      if (Number.isFinite(n)) {
        total += n * 3600;
        matched = true;
      }
    }
    const minMatch = t.match(/(\d+(?:\.\d+)?)\s*m(?:in(?:ute)?s?)?/);
    if (minMatch) {
      total += Number(minMatch[1]) * 60;
      matched = true;
    }
    const secMatch = t.match(/(\d+(?:\.\d+)?)\s*s(?:ec(?:ond)?s?)?/);
    if (secMatch) {
      total += Number(secMatch[1]);
      matched = true;
    }
    if (!matched) {
      const plainHours = t.match(/^(\d+(?:\.\d+)?)$/);
      if (plainHours && t.length <= 6) {
        return Math.round(Number(plainHours[1]) * 3600);
      }
      return void 0;
    }
    return Math.round(total);
  }
  function parseDayCount(raw) {
    if (!raw) return void 0;
    const m = raw.trim().match(/(\d+)\s*d(?:ays?)?/i);
    if (m) return Number(m[1]);
    return parseCompactNumber(raw);
  }

  // src/parser/extractRows.ts
  function rowLikeElements(doc) {
    const fromTable = Array.from(doc.querySelectorAll("table tbody tr"));
    if (fromTable.length > 0) return fromTable;
    const gridRows = Array.from(doc.querySelectorAll('[role="row"]')).filter(
      (el) => !el.querySelector('[role="columnheader"]')
    );
    if (gridRows.length > 0) return gridRows;
    const semiRows = Array.from(
      doc.querySelectorAll('[class*="table"] [class*="row"], [class*="Table"] [class*="Row"]')
    );
    if (semiRows.length > 1) return semiRows;
    return Array.from(doc.querySelectorAll("li, [class*='list-item'], [class*='ListItem']")).filter(
      (el) => (el.textContent?.length ?? 0) > 10 && (el.textContent?.length ?? 0) < 500
    );
  }
  function cellTexts(row) {
    const cells = Array.from(row.querySelectorAll("td, [role='cell'], [class*='cell'], [class*='Cell']"));
    if (cells.length > 0) {
      return cells.map((c) => (c.textContent ?? "").trim()).filter(Boolean);
    }
    return (row.textContent ?? "").split(/\n/).map((s) => s.trim()).filter(Boolean);
  }
  function tableCells(row) {
    return Array.from(row.querySelectorAll("td, [role='cell'], [class*='cell'], [class*='Cell']"));
  }
  function headerTextsForTable(row) {
    const table = row.closest("table");
    if (!table) return [];
    const headers = Array.from(table.querySelectorAll("thead th, thead td, [role='columnheader']"));
    return headers.map((h) => (h.textContent ?? "").trim().toLowerCase()).filter(Boolean);
  }
  function avatarFromRow(row) {
    const img = row.querySelector("img[src]");
    const src = img?.getAttribute("src") ?? void 0;
    if (src && !src.startsWith("data:")) return src;
    return void 0;
  }
  function displayNameFromRow(row, username) {
    const imgs = Array.from(row.querySelectorAll("img[alt]"));
    for (const img of imgs) {
      const alt = img.getAttribute("alt")?.trim();
      if (alt && alt.length > 1 && alt.toLowerCase() !== username?.toLowerCase()) return alt;
    }
    const cells = cellTexts(row);
    for (const cell of cells) {
      const u = extractUsernameFromText(cell);
      const withoutUser = u ? cell.replace(`@${u}`, "").replace(u, "").trim() : cell;
      if (withoutUser.length > 1 && withoutUser.length < 80) return withoutUser;
    }
    return void 0;
  }
  function parseActiveness(text) {
    const t = text.toLowerCase();
    if (/\belite\b/.test(t)) return "elite";
    if (/\bhigh\b|\bactive\b/.test(t)) return "high";
    if (/\bmedium\b|\bmed\b/.test(t)) return "medium";
    if (/\blow\b/.test(t)) return "low";
    if (/\bnone\b|\bunknown\b/.test(t)) return "none";
    return void 0;
  }
  function parseRelationshipRow(row, tabStatus) {
    const cells = cellTexts(row);
    const cellEls = tableCells(row);
    if (cells.length === 0) return null;
    const joined = cells.join("\n");
    const creatorColumn = cellEls[0] ? (cellEls[0].textContent ?? "").trim() : cells[0] ?? joined;
    const usernameCandidate = extractUsernameWithConfidence(creatorColumn, {
      fromUsernameColumn: true,
      displayName: displayNameFromRow(row)
    });
    const username = usernameCandidate.username;
    if (!username) return null;
    const dateCell = cells.find((c) => /\d{1,2}\/\d{1,2}\/\d{4}/.test(c));
    const reasonCell = cells.length >= 3 ? cells[cells.length - 1] : void 0;
    return {
      tiktokUsername: username,
      usernameConfidence: usernameCandidate.confidence,
      usernameSource: usernameCandidate.source,
      displayName: displayNameFromRow(row, username),
      avatarUrl: avatarFromRow(row),
      creatorNetworkStatus: tabStatus,
      inviteStatus: tabStatus,
      relationshipRequestDate: dateCell,
      relationshipReason: reasonCell && reasonCell !== dateCell ? reasonCell : void 0,
      rawTextPreview: joined.replace(/\s+/g, " ").slice(0, 180)
    };
  }
  function inferColumnMap(headers) {
    const map = {};
    headers.forEach((h, idx) => {
      if (/(creator|username|handle)/i.test(h)) map.creator = idx;
      if (/(gifts?|diamonds?|coins?)/i.test(h)) map.coins = idx;
      if (/(engagements?|interactions?|activity)/i.test(h)) map.engagements = idx;
      if (/(valid.*live.*days?|days? streamed|live days)/i.test(h)) map.days = idx;
      if (/(stream duration|hours?|live duration)/i.test(h)) map.hours = idx;
      if (/(activeness|activity level|active level)/i.test(h)) map.activeness = idx;
    });
    return map;
  }
  function parseStatsRow(row) {
    const cells = cellTexts(row);
    const cellEls = tableCells(row);
    if (cells.length === 0) return null;
    const headers = headerTextsForTable(row);
    const columnMap = inferColumnMap(headers);
    const creatorText = columnMap.creator !== void 0 ? cellEls[columnMap.creator]?.textContent ?? cells[columnMap.creator] ?? "" : cellEls[0]?.textContent ?? cells[0] ?? "";
    const usernameCandidate = extractUsernameWithConfidence(creatorText, {
      fromUsernameColumn: columnMap.creator !== void 0,
      displayName: displayNameFromRow(row)
    });
    const username = usernameCandidate.username;
    if (!username) return null;
    const joined = cells.join("\n");
    let coins;
    let diamonds;
    let days;
    let hours;
    let engagements;
    let activeness;
    let liveDurationText;
    let liveDurationSeconds;
    let riskFlag;
    if (columnMap.coins !== void 0 && cells[columnMap.coins]) {
      const n = firstCompactNumber(cells[columnMap.coins]);
      if (n !== void 0) {
        coins = n;
        diamonds = n;
      }
    }
    if (columnMap.engagements !== void 0 && cells[columnMap.engagements]) {
      engagements = parseCompactNumber(cells[columnMap.engagements]) ?? firstCompactNumber(cells[columnMap.engagements]);
    }
    if (columnMap.days !== void 0 && cells[columnMap.days]) {
      days = parseDayCount(cells[columnMap.days]) ?? firstCompactNumber(cells[columnMap.days]);
    }
    if (columnMap.hours !== void 0 && cells[columnMap.hours]) {
      const seconds = parseDurationToSeconds(cells[columnMap.hours]);
      if (seconds !== void 0) {
        hours = seconds / 3600;
        liveDurationText = cells[columnMap.hours];
        liveDurationSeconds = seconds;
      } else {
        hours = firstCompactNumber(cells[columnMap.hours]);
      }
    }
    if (columnMap.activeness !== void 0 && cells[columnMap.activeness]) {
      activeness = parseActiveness(cells[columnMap.activeness]);
    }
    for (const cell of cells) {
      const lower = cell.toLowerCase();
      if (!diamonds && (lower.includes("gift") || lower.includes("diamond"))) {
        diamonds = firstCompactNumber(cell);
        coins = diamonds;
      }
      if (!coins && (lower.includes("coin") || /^\d/.test(cell))) {
        const n = firstCompactNumber(cell);
        if (n !== void 0 && n > 0) coins = n;
      }
      if (!days && (lower.includes("live day") || lower.includes("go live") || /\d+\s*d\b/i.test(cell))) {
        days = parseDayCount(cell) ?? firstCompactNumber(cell);
      }
      if (!hours && (lower.includes("hour") || /\d+h\b/i.test(cell) || /\d+\s*h\s*\d*m/i.test(cell))) {
        hours = parseDurationToSeconds(cell);
        if (hours !== void 0) hours = hours / 3600;
        else {
          const h = firstCompactNumber(cell);
          if (h !== void 0) hours = h;
        }
        liveDurationText = cell;
        liveDurationSeconds = parseDurationToSeconds(cell);
      }
      if (engagements === void 0 && (lower.includes("engagement") || lower.includes("interaction") || lower.includes("activity") || lower.includes("comment") || lower.includes("like"))) {
        engagements = firstCompactNumber(cell);
      }
      if (!activeness) activeness = parseActiveness(cell);
      if (!riskFlag && (lower.includes("risk") || lower.includes("violation") || lower.includes("warning"))) {
        riskFlag = cell.slice(0, 120);
      }
    }
    if (coins === void 0) coins = firstCompactNumber(joined);
    if (diamonds === void 0) diamonds = coins;
    return {
      tiktokUsername: username,
      usernameConfidence: usernameCandidate.confidence,
      usernameSource: usernameCandidate.source,
      displayName: displayNameFromRow(row, username),
      avatarUrl: avatarFromRow(row),
      coinsEarned: coins,
      diamondsEarned: diamonds,
      engagements,
      daysStreamed: days,
      hoursStreamed: hours,
      liveDurationText,
      liveDurationSeconds,
      activenessLevel: activeness,
      riskFlag,
      rawTextPreview: joined.replace(/\s+/g, " ").slice(0, 180)
    };
  }
  function dedupeRows(rows) {
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    for (const r of rows) {
      const key = normalizeTikTokUsername(r.tiktokUsername) ?? r.rawTextPreview ?? "";
      if (!key || seen.has(key)) continue;
      seen.add(key);
      out.push(r);
    }
    return out;
  }
  function extractCreatorRowsFromPage(doc, pageType, relationshipTab) {
    const rowEls = rowLikeElements(doc);
    const rows = [];
    for (const el of rowEls) {
      if (pageType === "manage_relationship") {
        const parsed = parseRelationshipRow(el, relationshipTab);
        if (parsed) rows.push(parsed);
      } else if (pageType === "creator_stats" || pageType === "unknown") {
        const parsed = parseStatsRow(el);
        if (parsed) rows.push(parsed);
      }
    }
    return dedupeRows(rows);
  }

  // src/parser/index.ts
  function buildPageSnapshot(url = location.href, doc = document) {
    const detection = detectTikTokCreatorNetworkPage(url, doc);
    if (detection.detectedPageType === "live_now") {
      return {
        sourcePageUrl: url,
        detectedPageType: "live_now",
        relationshipTab: detection.relationshipTab,
        statPeriodLabel: detection.statPeriodLabel,
        rows: [],
        liveRows: extractLiveNowRowsFromPage(doc)
      };
    }
    return {
      sourcePageUrl: url,
      detectedPageType: detection.detectedPageType,
      relationshipTab: detection.relationshipTab,
      statPeriodLabel: detection.statPeriodLabel,
      rows: extractCreatorRowsFromPage(doc, detection.detectedPageType, detection.relationshipTab),
      liveRows: []
    };
  }

  // src/contentScript.ts
  function stripPreview(row) {
    const { rawTextPreview, ...rest } = row;
    return rest;
  }
  function snapshotToPayload(snapshot) {
    return {
      sourcePageUrl: snapshot.sourcePageUrl,
      detectedPageType: snapshot.detectedPageType,
      relationshipTab: snapshot.relationshipTab,
      statPeriodLabel: snapshot.statPeriodLabel,
      rows: snapshot.rows.map(stripPreview),
      liveRows: snapshot.liveRows.length > 0 ? snapshot.liveRows.map(stripPreview) : void 0
    };
  }
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "PING") {
      sendResponse({ ok: true });
      return true;
    }
    if (message?.type === "GET_PAGE_SNAPSHOT") {
      try {
        const snapshot = buildPageSnapshot(location.href, document);
        sendResponse({ ok: true, snapshot });
      } catch (e) {
        sendResponse({
          ok: false,
          error: e instanceof Error ? e.message : "Failed to parse page."
        });
      }
      return true;
    }
    if (message?.type === "BUILD_SYNC_PAYLOAD") {
      try {
        const snapshot = buildPageSnapshot(location.href, document);
        sendResponse({ ok: true, payload: snapshotToPayload(snapshot), snapshot });
      } catch (e) {
        sendResponse({
          ok: false,
          error: e instanceof Error ? e.message : "Failed to build payload."
        });
      }
      return true;
    }
    return false;
  });
})();
