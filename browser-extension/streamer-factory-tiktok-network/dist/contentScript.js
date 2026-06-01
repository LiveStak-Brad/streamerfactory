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
    if (path.includes("/revenue") || path.includes("/incentive") || path.includes("/performance") || path.includes("/contribution") || path.includes("/data/") || path.includes("/analytics") || title.includes("incentive") || title.includes("performance") || title.includes("contribution") || bodyText.includes("contribution details") || bodyText.includes("estimated bonus") || bodyText.includes("valid go live") || bodyText.includes("activeness incentive")) {
      return {
        detectedPageType: "creator_stats",
        statPeriodLabel: readPeriodLabel(doc),
        relationshipTab: readActiveRelationshipTab(doc)
      };
    }
    if (path.includes("/relation") || path.includes("/relationship") || title.includes("manage relationship")) {
      return {
        detectedPageType: "manage_relationship",
        relationshipTab: readActiveRelationshipTab(doc)
      };
    }
    if (path.includes("/anchor/live") || path.includes("/live-now") || path.includes("livenow") || path.includes("/live") && !path.includes("/relation") || title.includes("live now") || bodyText.includes("creators who are live now")) {
      return { detectedPageType: "live_now" };
    }
    if (path.includes("/creator") || bodyText.includes("coins earned") || bodyText.includes("diamonds")) {
      return {
        detectedPageType: "creator_stats",
        statPeriodLabel: readPeriodLabel(doc),
        relationshipTab: readActiveRelationshipTab(doc)
      };
    }
    return { detectedPageType: "unknown" };
  }

  // src/parser/numbers.ts
  function normalizeNumericText(raw) {
    return raw.trim().replace(/[\u00a0\u202f]/g, " ").replace(/,/g, "").replace(/(\d)\s+(?=\d)/g, "$1");
  }
  function parseCompactNumber(raw) {
    if (!raw) return void 0;
    const t = normalizeNumericText(raw);
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
  function isPlainFormattedNumber(text) {
    return /^[\s$€£+-]*[\d,.\s]+[kmb]?$/i.test(text.trim());
  }
  function firstCompactNumber(text) {
    const trimmed = text.trim();
    if (!trimmed) return void 0;
    if (isPlainFormattedNumber(trimmed)) {
      const direct = parseCompactNumber(trimmed);
      if (direct !== void 0) return direct;
    }
    const noCommas = trimmed.replace(/,/g, "");
    const m = noCommas.match(/(\d+(?:\.\d+)?)\s*([kmb])?\b/i);
    if (!m) return void 0;
    return parseCompactNumber(`${m[1]}${m[2] ?? ""}`);
  }
  function isNonDiamondStatCell(cell) {
    const t = cell.trim();
    if (!t) return true;
    if (/^\d+\s*%$/.test(t) || /^\$?0\.00$/.test(t)) return true;
    if (/^\$[\d,.]+$/.test(t)) return true;
    if (/^\blevel\s*\d/i.test(t)) return true;
    if (/^\d+\s*h(?:\s*\d*m)?/i.test(t) || /^\d+h\s*\/\s*\d+h/i.test(t)) return true;
    if (/^\d+\s*d(?:ays?)?/i.test(t) && !/\d,\d{3}/.test(t)) return true;
    return false;
  }
  function isNumericStatCell(cell) {
    const t = cell.trim();
    if (!t || isNonDiamondStatCell(t)) return false;
    return /^[\d,.\s]+[kmb]?$/i.test(t) && /\d/.test(t);
  }
  function parseStatNumber(cell) {
    if (isNonDiamondStatCell(cell)) return void 0;
    return parseCompactNumber(cell) ?? firstCompactNumber(cell);
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
  var RESERVED_HANDLE_WORDS = /^(level|elite|high|medium|low|none|view|live|creator|member|network|invited|removed|quit|following|ratio|diamonds?|bonus|gifts?|coins?|day|days|hour|hours)$/i;
  function looksLikeTikTokHandle(line) {
    if (!/^[a-zA-Z0-9._]{2,40}$/.test(line)) return false;
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(line)) return false;
    if (RESERVED_HANDLE_WORDS.test(line)) return false;
    if (/^\d+$/.test(line)) return false;
    if (!/[_.]/.test(line) && !/\d/.test(line) && line.length < 6) return false;
    return true;
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
    const gridRows = Array.from(doc.querySelectorAll('[role="row"]')).filter(
      (el) => !el.querySelector('[role="columnheader"]') && (el.querySelector('[role="cell"]') || el.querySelector("td")) && (el.textContent?.length ?? 0) > 15
    );
    const fromTable = Array.from(doc.querySelectorAll("table tbody tr")).filter(
      (tr) => (tr.textContent?.length ?? 0) > 15
    );
    if (gridRows.length >= Math.max(fromTable.length, 1)) return gridRows;
    if (fromTable.length > 0) return fromTable;
    const semiRows = Array.from(
      doc.querySelectorAll('[class*="table"] [class*="row"], [class*="Table"] [class*="Row"]')
    );
    if (semiRows.length > 1) return semiRows;
    return Array.from(doc.querySelectorAll("li, [class*='list-item'], [class*='ListItem']")).filter(
      (el) => (el.textContent?.length ?? 0) > 10 && (el.textContent?.length ?? 0) < 500
    );
  }
  function readCellText(cell) {
    const bits = [];
    const aria = cell.getAttribute("aria-label")?.trim();
    const text = (cell.textContent ?? "").trim();
    if (text) bits.push(text);
    if (aria && aria !== text) bits.push(aria);
    return bits.join(" ").trim();
  }
  function splitCellLines(text) {
    return text.split(/\n/).map((s) => s.trim()).filter(Boolean);
  }
  function cellTexts(row) {
    const cells = Array.from(row.querySelectorAll("td, [role='cell'], [class*='cell'], [class*='Cell']"));
    if (cells.length > 0) {
      const lines = [];
      for (const cell of cells) {
        lines.push(...splitCellLines(readCellText(cell)));
      }
      return lines;
    }
    return splitCellLines((row.textContent ?? "").trim());
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
  function headerTextsForRow(row, doc) {
    const fromTable = headerTextsForTable(row);
    if (fromTable.length >= 3) return fromTable;
    const containers = [
      row.closest('[role="grid"]'),
      row.closest('[role="table"]'),
      row.closest("table")
    ].filter(Boolean);
    for (const container of containers) {
      const headerCells = Array.from(container.querySelectorAll('[role="columnheader"]'));
      if (headerCells.length >= 3) {
        return headerCells.map((h) => (h.textContent ?? "").trim().toLowerCase()).filter(Boolean);
      }
    }
    const docHeaders = Array.from(doc.querySelectorAll('[role="columnheader"], thead th'));
    const texts = docHeaders.map((h) => (h.textContent ?? "").trim().toLowerCase()).filter(Boolean);
    if (texts.some((h) => /\bdiamonds?\b|\bgifts?\b/i.test(h))) return texts;
    return fromTable;
  }
  function diamondsColIndexFromAria(doc) {
    for (const h of doc.querySelectorAll('[role="columnheader"]')) {
      if (!/\bdiamonds?\b|\bgifts?\b/i.test(h.textContent ?? "")) continue;
      const idx = parseInt(h.getAttribute("aria-colindex") ?? "", 10);
      if (!Number.isNaN(idx)) return idx;
    }
    return void 0;
  }
  function cellTextAtColIndex(row, colIndex) {
    const direct = row.querySelector(`[role="cell"][aria-colindex="${colIndex}"]`);
    if (direct) return readCellText(direct);
    for (const cell of row.querySelectorAll('[role="cell"], td')) {
      const idx = parseInt(cell.getAttribute("aria-colindex") ?? "", 10);
      if (idx === colIndex) return readCellText(cell);
    }
    return void 0;
  }
  function extractDiamondsFromRowText(rowText, username) {
    let text = rowText;
    if (username) {
      text = text.replace(
        new RegExp(username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
        " "
      );
    }
    const commaMatches = [...text.matchAll(/\b(\d{1,3}(?:,\d{3})+)\b/g)].map((m) => parseCompactNumber(m[1])).filter((n) => n !== void 0 && n >= 10);
    if (commaMatches.length > 0) return Math.max(...commaMatches);
    const plain = [];
    for (const line of splitCellLines(text)) {
      if (isNumericStatCell(line)) {
        const n = parseStatNumber(line);
        if (n !== void 0 && n >= 10) plain.push(n);
      }
    }
    for (const m of text.matchAll(/\b(\d{3,7})\b/g)) {
      const n = Number(m[1]);
      if (n >= 100 && n <= 5e7) plain.push(n);
    }
    if (plain.length === 0) return void 0;
    return Math.max(...plain);
  }
  function resolveDiamondsColumnIndex(row, doc, headers, columnMap) {
    if (columnMap.coins !== void 0) return columnMap.coins;
    const headerIdx = headers.findIndex((h) => /\bdiamonds?\b|\bgifts?\b/i.test(h));
    if (headerIdx >= 0) return headerIdx;
    const scopes = [row.closest('[role="grid"]'), row.closest('[role="table"]'), doc.body].filter(
      Boolean
    );
    for (const scope of scopes) {
      const headerCells = Array.from(scope.querySelectorAll('[role="columnheader"], thead th'));
      const idx = headerCells.findIndex((h) => /\bdiamonds?\b|\bgifts?\b/i.test(h.textContent ?? ""));
      if (idx >= 0) return idx;
    }
    if (headers.some((h) => /bonus|contribution/i.test(h)) && (headers.some((h) => /\bratio\b/i.test(h)) || headers.some((h) => /live.*day/i.test(h)))) {
      const explicit = headers.findIndex((h) => /\bdiamonds?\b/i.test(h));
      return explicit >= 0 ? explicit : 3;
    }
    return void 0;
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
      if (isNonDiamondStatCell(cell) || /%|bonus/i.test(cell) && /^\$?\d/.test(cell)) continue;
      if (/^\d[\d,.]*$/.test(cell.replace(/\s/g, ""))) continue;
      const u = extractUsernameFromText(cell);
      const withoutUser = u ? cell.replace(`@${u}`, "").replace(u, "").trim() : cell;
      if (withoutUser.length > 1 && withoutUser.length < 80 && !/\blevel\s*\d/i.test(withoutUser)) {
        return withoutUser;
      }
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
  function pickDiamondsFromCells(cells, coinsColumnIndex) {
    if (coinsColumnIndex !== void 0 && cells[coinsColumnIndex]) {
      const mapped = parseStatNumber(cells[coinsColumnIndex]);
      if (mapped !== void 0) return mapped;
    }
    let best;
    for (const cell of cells) {
      const parts = splitCellLines(cell);
      for (const part of parts.length > 0 ? parts : [cell]) {
        if (isNonDiamondStatCell(part)) continue;
        if (extractUsernameFromText(part)) continue;
        if (isNumericStatCell(part)) {
          const n2 = parseStatNumber(part);
          if (n2 !== void 0 && n2 >= 10) {
            if (best === void 0 || n2 > best) best = n2;
          }
          continue;
        }
        const n = parseStatNumber(part);
        if (n === void 0 || n < 10) continue;
        if (n <= 100 && /%/.test(part)) continue;
        if (best === void 0 || n > best) best = n;
      }
    }
    return best;
  }
  function inferColumnMap(headers) {
    const map = {};
    headers.forEach((h, idx) => {
      if (/(creator|username|handle)/i.test(h)) map.creator = idx;
      if (/\bdiamonds?\b|\bgifts?\b/i.test(h)) map.coins = idx;
      else if (/\bcoins?\b/i.test(h) && !/incentive|contribution|bonus/i.test(h)) map.coins = idx;
      if (/(engagements?|interactions?)/i.test(h) && !/incentive/i.test(h)) map.engagements = idx;
      if (/(valid.*live.*days?|days? streamed|live days)/i.test(h)) map.days = idx;
      if (/(stream duration|live duration)/i.test(h) || /\bhours?\b/.test(h)) map.hours = idx;
      if (/(activeness|activity level|active level)/i.test(h)) map.activeness = idx;
    });
    return map;
  }
  function parseStatsRow(row, doc = document) {
    const cells = cellTexts(row);
    const cellEls = tableCells(row);
    if (cells.length === 0) return null;
    const headers = headerTextsForRow(row, doc);
    const columnMap = inferColumnMap(headers);
    const diamondsCol = resolveDiamondsColumnIndex(row, doc, headers, columnMap);
    if (diamondsCol !== void 0) columnMap.coins = diamondsCol;
    const ariaDiamondsCol = diamondsColIndexFromAria(doc);
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
    if (ariaDiamondsCol !== void 0) {
      const ariaCell = cellTextAtColIndex(row, ariaDiamondsCol);
      if (ariaCell) {
        const n = parseStatNumber(ariaCell);
        if (n !== void 0) {
          coins = n;
          diamonds = n;
        }
      }
    }
    if (diamonds === void 0 && columnMap.coins !== void 0 && cells[columnMap.coins]) {
      const n = parseStatNumber(cells[columnMap.coins]);
      if (n !== void 0) {
        coins = n;
        diamonds = n;
      }
    }
    if (columnMap.engagements !== void 0 && cells[columnMap.engagements]) {
      engagements = parseStatNumber(cells[columnMap.engagements]);
    }
    if (columnMap.days !== void 0 && cells[columnMap.days]) {
      days = parseDayCount(cells[columnMap.days]);
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
      if (!diamonds && /\bdiamonds?\b/i.test(cell)) {
        const n = parseStatNumber(cell);
        if (n !== void 0) {
          diamonds = n;
          coins = n;
        }
      }
      if (!days && (lower.includes("live day") || lower.includes("go live") || /\d+\s*d\b/i.test(cell))) {
        days = parseDayCount(cell);
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
    if (diamonds === void 0) {
      diamonds = pickDiamondsFromCells(cells, diamondsCol ?? columnMap.coins);
      if (diamonds !== void 0) coins = diamonds;
    }
    if (diamonds === void 0) {
      diamonds = extractDiamondsFromRowText(joined, username);
      if (diamonds !== void 0) coins = diamonds;
    }
    if (coins === void 0 && diamonds !== void 0) coins = diamonds;
    if (!username || username.length < 2) return null;
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
        const parsed = parseStatsRow(el, doc);
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
