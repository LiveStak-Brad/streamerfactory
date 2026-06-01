"use strict";
(() => {
  // src/parser/dom.ts
  function elementClassText(el) {
    const raw = el.className;
    if (typeof raw === "string") return raw;
    if (raw && typeof raw.baseVal === "string") {
      return raw.baseVal;
    }
    return el.getAttribute("class") ?? "";
  }

  // src/parser/statPeriod.ts
  function toDateString(d) {
    return d.toISOString().slice(0, 10);
  }
  function readStatPeriodBounds(doc) {
    const text = (doc.body?.innerText ?? doc.body?.textContent ?? "").slice(0, 12e3);
    const iso = text.match(/(\d{4}-\d{2}-\d{2})\s*[–—\-]\s*(\d{4}-\d{2}-\d{2})/);
    if (iso) return { start: iso[1], end: iso[2] };
    const us = text.match(
      /(\d{1,2})\/(\d{1,2})\/(\d{4})\s*[–—\-]\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/
    );
    if (us) {
      const start = `${us[3]}-${us[1].padStart(2, "0")}-${us[2].padStart(2, "0")}`;
      const end = `${us[6]}-${us[4].padStart(2, "0")}-${us[5].padStart(2, "0")}`;
      return { start, end };
    }
    return void 0;
  }
  function defaultBoundsForKind(kind = "monthly", anchor = /* @__PURE__ */ new Date()) {
    const start = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth(), 1));
    const end = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() + 1, 0));
    return { start: toDateString(start), end: toDateString(end) };
  }
  function resolveStatPeriodForSync(doc, label) {
    const parsed = readStatPeriodBounds(doc);
    const monthBounds = defaultBoundsForKind("monthly");
    const bounds = parsed && parsed.start.slice(0, 7) === monthBounds.start.slice(0, 7) && parsed.end.slice(0, 7) === monthBounds.end.slice(0, 7) ? parsed : monthBounds;
    const statPeriodLabel = label && /\bmonth/i.test(label) ? label : "Contribution details \xB7 Monthly";
    return {
      statPeriodLabel,
      statPeriodKind: "monthly",
      statPeriodStart: bounds.start,
      statPeriodEnd: bounds.end
    };
  }

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
  function withStatPeriod(doc, base) {
    if (base.detectedPageType !== "creator_stats" && base.detectedPageType !== "manage_relationship") {
      return base;
    }
    const period = resolveStatPeriodForSync(doc, base.statPeriodLabel);
    return {
      ...base,
      statPeriodLabel: period.statPeriodLabel ?? base.statPeriodLabel,
      statPeriodKind: period.statPeriodKind,
      statPeriodStart: period.statPeriodStart,
      statPeriodEnd: period.statPeriodEnd
    };
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
      return withStatPeriod(doc, {
        detectedPageType: "creator_stats",
        statPeriodLabel: readPeriodLabel(doc),
        relationshipTab: readActiveRelationshipTab(doc)
      });
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
      return withStatPeriod(doc, {
        detectedPageType: "creator_stats",
        statPeriodLabel: readPeriodLabel(doc),
        relationshipTab: readActiveRelationshipTab(doc)
      });
    }
    return { detectedPageType: "unknown" };
  }

  // src/parser/avatar.ts
  function avatarFromRow(row) {
    const cells = row.querySelectorAll('[role="cell"], td');
    const creatorCell = cells[0] ?? row;
    return pickBestAvatarUrl(creatorCell) ?? pickBestAvatarUrl(row);
  }
  function pickBestAvatarUrl(root) {
    const candidates = [];
    for (const img of root.querySelectorAll("img")) {
      const url = bestImgSrc(img);
      if (!url) continue;
      candidates.push({ url, score: scoreAvatarImg(img, url, root) });
    }
    for (const source of root.querySelectorAll("picture source[srcset], picture source[src]")) {
      const url = bestImgSrc(source);
      if (url) candidates.push({ url, score: scoreAvatarImg(source, url, root) + 1 });
    }
    const lazyHost = root.querySelector("[data-src], [data-lazy-src], [data-original]");
    if (lazyHost) {
      const url = bestImgSrc(lazyHost);
      if (url) candidates.push({ url, score: scoreAvatarImg(lazyHost, url, root) });
    }
    const withBg = root.querySelector("[style*='background-image']");
    const bg = withBg?.style?.backgroundImage;
    if (bg) {
      const m = bg.match(/url\(["']?([^"')]+)["']?\)/i);
      if (m?.[1] && isUsableAvatarUrl(m[1])) {
        candidates.push({ url: m[1], score: scoreAvatarImg(withBg, m[1], root) + 2 });
      }
    }
    candidates.sort((a, b) => b.score - a.score);
    return candidates[0]?.url;
  }
  function scoreAvatarImg(el, url, root) {
    let score = 0;
    const lowerUrl = url.toLowerCase();
    const cls = `${elementClassText(el)} ${el.parentElement ? elementClassText(el.parentElement) : ""}`.toLowerCase();
    if (/avatar|portrait|profile|creator|thumb|head/i.test(cls)) score += 8;
    if (/story|badge|icon|logo|level|rank|medal|frame/i.test(cls)) score -= 12;
    if (/story|badge|icon-logo|default_avatar/i.test(lowerUrl)) score -= 12;
    const w = parseInt(el.getAttribute("width") ?? "", 10);
    const h = parseInt(el.getAttribute("height") ?? "", 10);
    if (!Number.isNaN(w) && w >= 28 && w <= 96) score += 4;
    if (!Number.isNaN(h) && h >= 28 && h <= 96) score += 4;
    if (!Number.isNaN(w) && w > 120 || !Number.isNaN(h) && h > 120) score -= 4;
    if (root.matches('[role="cell"], td') || root.querySelector('[role="cell"]')?.contains(el)) {
      score += 3;
    }
    if (/tiktokcdn|ibytedapm|byteimg/i.test(lowerUrl)) score += 2;
    return score;
  }
  function bestImgSrc(el) {
    const attrs = ["src", "data-src", "data-lazy-src", "data-original", "data-url"];
    for (const attr of attrs) {
      const v = el.getAttribute(attr)?.trim();
      if (v && isUsableAvatarUrl(v)) return v;
    }
    const srcset = el.getAttribute("srcset");
    if (srcset) {
      const first = srcset.split(",")[0]?.trim().split(/\s+/)[0]?.trim();
      if (first && isUsableAvatarUrl(first)) return first;
    }
    return void 0;
  }
  function isUsableAvatarUrl(url) {
    if (!url || url.startsWith("data:") || url.startsWith("blob:") || url.length < 12) return false;
    if (/placeholder|blank|1x1|sprite|favicon/i.test(url)) return false;
    return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
  }

  // src/parser/username.ts
  var RESERVED_HANDLE_WORDS = /^(level|elite|high|medium|low|none|no|nolevel|view|live|creator|member|network|invited|removed|quit|following|ratio|diamonds?|bonus|gifts?|coins?|day|days|hour|hours|eligible|notable|inactive)$/i;
  function stripBadgeText(text) {
    return text.replace(/\bno\s*level\b/gi, "\n").replace(/\blevel\s*\d+\b/gi, "\n").replace(/\bnotable\b/gi, "\n").replace(/\beligible\b/gi, "\n").replace(/\b(eligible|notable|inactive|invited|removed|following|quit|new|view\s*details?)\b/gi, "\n").replace(/\b(activeness|activity)\s*(incentive|level)?\b/gi, "\n");
  }
  var GLUED_SUFFIX_RES = [
    /^([a-z0-9._]{2,38})nolevel$/i,
    /^([a-z0-9._]{2,38})no$/i,
    /^([a-z0-9._]{2,38})level\d*$/i,
    /^([a-z0-9._]{2,38})(eligible|notable|inactive|invited|removed|following|new|quit)$/i
  ];
  function stripGluedBadgeSuffix(compact) {
    let t = compact;
    for (const re of GLUED_SUFFIX_RES) {
      const m = t.match(re);
      if (m) {
        t = m[1];
        break;
      }
    }
    return t;
  }
  function finalizeHandle(compact) {
    let t = stripGluedBadgeSuffix(compact.toLowerCase());
    if (!/^[a-z0-9._]{2,40}$/.test(t)) return void 0;
    if (RESERVED_HANDLE_WORDS.test(t)) return void 0;
    if (/^\d+$/.test(t)) return void 0;
    if (!/[a-z]/.test(t)) return void 0;
    if (!/[_.]/.test(t) && !/\d/.test(t) && t.length < 6) return void 0;
    return t;
  }
  function cleanTikTokUsername(raw) {
    if (!raw) return void 0;
    let t = raw.trim().replace(/^@+/, "");
    if (!t) return void 0;
    t = stripBadgeText(t);
    const lines = t.split(/\n/).map((l) => l.trim()).filter(Boolean);
    for (let i = lines.length - 1; i >= 0; i -= 1) {
      const compact = lines[i].replace(/\s+/g, "");
      const fromCompact = finalizeHandle(compact);
      if (fromCompact) return fromCompact;
      const leading = lines[i].match(/(@?[_]?[a-z0-9][a-z0-9._]{0,37})/i);
      if (leading) {
        const fromLeading = finalizeHandle(leading[1].replace(/\s+/g, ""));
        if (fromLeading) return fromLeading;
      }
    }
    const wholeLeading = t.match(/(@?[_]?[a-z0-9][a-z0-9._]{0,37})/i);
    if (wholeLeading) {
      const fromLeading = finalizeHandle(wholeLeading[1].replace(/\s+/g, ""));
      if (fromLeading) return fromLeading;
    }
    return finalizeHandle(t.replace(/\s+/g, ""));
  }
  function normalizeTikTokUsername(raw) {
    return cleanTikTokUsername(raw);
  }
  var AT_RE = /@([a-z0-9._]{2,40})/gi;
  var HANDLE_RE = /(?:^|[^a-z0-9._])(@?[_]?[a-z0-9][a-z0-9._]{0,37})(?=$|[^a-z0-9._])/gi;
  function looksLikeTikTokHandle(line) {
    const candidate = cleanTikTokUsername(line);
    return Boolean(candidate);
  }
  function preferHandle(a, b) {
    const aScore = Number(/[_.\d]/.test(a)) + Number(a === a.toLowerCase());
    const bScore = Number(/[_.\d]/.test(b)) + Number(b === b.toLowerCase());
    return aScore >= bScore ? a : b;
  }
  function inferUsernameFromDisplayName(displayName) {
    return cleanTikTokUsername(displayName ?? void 0);
  }
  function extractUsernameWithConfidence(text, opts) {
    const stripped = stripBadgeText(text.trim().replace(/^@+/, ""));
    const normalizedLines = stripped.split(/\n/).map((l) => l.trim()).filter(Boolean);
    let bestAt;
    for (const line of normalizedLines) {
      AT_RE.lastIndex = 0;
      let m;
      while ((m = AT_RE.exec(line)) !== null) {
        const candidate = cleanTikTokUsername(m[1]);
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
    for (let i = normalizedLines.length - 1; i >= 0; i -= 1) {
      const line = normalizedLines[i];
      const direct = cleanTikTokUsername(line);
      if (direct && looksLikeTikTokHandle(line)) {
        return {
          username: direct,
          confidence: opts?.fromUsernameColumn ? "high" : "medium",
          source: opts?.fromUsernameColumn ? "username_column" : "handle_pattern"
        };
      }
      HANDLE_RE.lastIndex = 0;
      let m;
      while ((m = HANDLE_RE.exec(line)) !== null) {
        const candidate = cleanTikTokUsername(m[1]);
        if (!candidate || !looksLikeTikTokHandle(m[1])) continue;
        return {
          username: candidate,
          confidence: opts?.fromUsernameColumn ? "high" : "medium",
          source: opts?.fromUsernameColumn ? "username_column" : "handle_pattern"
        };
      }
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

  // src/parser/gridTable.ts
  function readCellText(cell) {
    const bits = [];
    for (const attr of ["aria-label", "title"]) {
      const v = cell.getAttribute(attr)?.trim();
      if (v) bits.push(v);
    }
    const text = (cell.textContent ?? "").trim();
    if (text) bits.push(text);
    return [...new Set(bits)].join(" ").trim();
  }
  function readStatCellText(cell) {
    const visible = (cell.textContent ?? "").trim();
    if (visible) return visible;
    return cell.getAttribute("aria-label")?.trim() ?? cell.getAttribute("title")?.trim() ?? "";
  }
  function splitCellLines(text) {
    return text.split(/\n/).map((s) => s.trim()).filter(Boolean);
  }
  function findCreatorContributionGrid(doc) {
    const candidates = [...doc.querySelectorAll('[role="grid"], table')];
    let best = null;
    let bestRows = 0;
    for (const container of candidates) {
      const headerEls = [...container.querySelectorAll('[role="columnheader"], thead th')];
      const headerTexts = headerEls.map((h) => (h.textContent ?? "").trim().toLowerCase());
      const hasDiamonds = headerTexts.some((h) => /\bdiamonds?\b|\bgifts?\b/i.test(h));
      const hasCreator = headerTexts.some((h) => /creator|username/i.test(h));
      if (!hasDiamonds || !hasCreator) continue;
      const dataRows = [...container.querySelectorAll('[role="row"], tbody tr')].filter(
        (r) => !r.querySelector('[role="columnheader"]') && (r.textContent?.length ?? 0) > 20 && /\d/.test(r.textContent ?? "")
      );
      if (dataRows.length > bestRows) {
        bestRows = dataRows.length;
        best = container;
      }
    }
    return best;
  }
  function dataRowsInContainer(container) {
    return [...container.querySelectorAll('[role="row"], tbody tr')].filter(
      (r) => !r.querySelector('[role="columnheader"]') && (r.textContent?.length ?? 0) > 15
    );
  }
  function headerElementsForContainer(container) {
    return [...container.querySelectorAll('[role="columnheader"], thead th')];
  }
  function statTextFromRowColumn(row, headerIndex, cellEls) {
    const grid = row.closest('[role="grid"], table');
    if (grid) {
      const headerEls = headerElementsForContainer(grid);
      const headerEl = headerEls[headerIndex];
      const ariaRaw = parseInt(headerEl?.getAttribute("aria-colindex") ?? "", 10);
      const tryIndexes = /* @__PURE__ */ new Set();
      if (!Number.isNaN(ariaRaw)) {
        tryIndexes.add(ariaRaw);
        tryIndexes.add(ariaRaw + 1);
      }
      tryIndexes.add(headerIndex + 1);
      tryIndexes.add(headerIndex);
      for (const idx of tryIndexes) {
        const text = statCellTextAtColIndex(row, idx);
        if (text?.trim()) return text;
      }
    }
    const el = cellEls[headerIndex];
    return el ? readStatCellText(el) : void 0;
  }
  function statCellTextAtColIndex(row, colIndex) {
    for (const sel of [
      `[role="cell"][aria-colindex="${colIndex}"]`,
      `[aria-colindex="${colIndex}"]`
    ]) {
      const direct = row.querySelector(sel);
      if (direct) return readStatCellText(direct);
    }
    for (const cell of row.querySelectorAll('[role="cell"], td')) {
      const idx = parseInt(cell.getAttribute("aria-colindex") ?? "", 10);
      if (idx === colIndex) return readStatCellText(cell);
    }
    return void 0;
  }
  function cellTextAtColIndex(row, colIndex) {
    for (const sel of [
      `[role="cell"][aria-colindex="${colIndex}"]`,
      `[aria-colindex="${colIndex}"]`
    ]) {
      const direct = row.querySelector(sel);
      if (direct) return readCellText(direct);
    }
    for (const cell of row.querySelectorAll('[role="cell"], td')) {
      const idx = parseInt(cell.getAttribute("aria-colindex") ?? "", 10);
      if (idx === colIndex) return readCellText(cell);
    }
    return void 0;
  }
  function parseDiamondValue(text) {
    if (!text) return void 0;
    const n = parseStatNumber(text);
    if (n === void 0 || n < 50) return void 0;
    if (/^\$/.test(text.trim()) || /%$/.test(text.trim())) return void 0;
    return n;
  }
  function diamondsFromRowGrid(row) {
    const grid = row.closest('[role="grid"], table');
    if (!grid) return void 0;
    const headerEls = headerElementsForContainer(grid);
    let diamondsHeaderEl;
    let diamondsHeaderPos = -1;
    headerEls.forEach((h, i) => {
      if (/\bdiamonds?\b|\bgifts?\b/i.test(h.textContent ?? "")) {
        diamondsHeaderEl = h;
        diamondsHeaderPos = i;
      }
    });
    if (!diamondsHeaderEl && diamondsHeaderPos < 0) return void 0;
    const ariaRaw = parseInt(diamondsHeaderEl?.getAttribute("aria-colindex") ?? "", 10);
    const tryColIndexes = /* @__PURE__ */ new Set();
    if (!Number.isNaN(ariaRaw)) {
      tryColIndexes.add(ariaRaw);
      tryColIndexes.add(ariaRaw + 1);
      tryColIndexes.add(ariaRaw - 1);
    }
    if (diamondsHeaderPos >= 0) tryColIndexes.add(diamondsHeaderPos);
    for (const idx of tryColIndexes) {
      const n = parseDiamondValue(cellTextAtColIndex(row, idx));
      if (n !== void 0) return n;
    }
    const rowCells = [...row.querySelectorAll('[role="cell"], td')];
    if (diamondsHeaderPos >= 0 && diamondsHeaderPos < rowCells.length) {
      const n = parseDiamondValue(readCellText(rowCells[diamondsHeaderPos]));
      if (n !== void 0) return n;
    }
    return void 0;
  }
  function pickLargestDiamondLikeValue(cellLines, username) {
    let best;
    for (const part of cellLines) {
      if (username && part.toLowerCase().includes(username.toLowerCase())) continue;
      if (isNonDiamondStatCell(part)) continue;
      if (/^\$/.test(part) || /%$/.test(part)) continue;
      if (extractUsernameFromText(part)) continue;
      let n;
      if (isNumericStatCell(part)) {
        n = parseStatNumber(part);
      } else {
        n = parseStatNumber(part);
      }
      if (n === void 0 || n < 100) continue;
      if (best === void 0 || n > best) best = n;
    }
    return best;
  }

  // src/parser/live-badge.ts
  function isStandaloneLiveBadgeText(text) {
    const t = text.trim();
    if (!/^live$/i.test(t)) return false;
    return t.length <= 6;
  }
  var LIVE_ACCENT_RGB = [
    [254, 44, 85],
    [255, 23, 68],
    [255, 0, 80],
    [238, 29, 82],
    [255, 59, 92]
  ];
  function parseCssColorChannels(css) {
    const t = css.trim().toLowerCase();
    if (!t || t === "transparent" || t === "none") return null;
    const hex = t.match(/#([0-9a-f]{3,8})\b/i)?.[1];
    if (hex) {
      if (hex.length === 3) {
        return [
          parseInt(hex[0] + hex[0], 16),
          parseInt(hex[1] + hex[1], 16),
          parseInt(hex[2] + hex[2], 16)
        ];
      }
      if (hex.length >= 6) {
        return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
      }
    }
    const rgb = t.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
    return null;
  }
  function cssColorLooksLikeLiveRing(css) {
    const rgb = parseCssColorChannels(css ?? "");
    if (!rgb) return false;
    const [r, g, b] = rgb;
    if (r < 200 || g > 120 || b > 140) return false;
    for (const accent of LIVE_ACCENT_RGB) {
      const dist = Math.abs(r - accent[0]) + Math.abs(g - accent[1]) + Math.abs(b - accent[2]);
      if (dist < 80) return true;
    }
    if (r > 220 && g < 90 && b < 120) return true;
    return false;
  }
  function classHintsLiveRing(cls) {
    const c = cls.toLowerCase();
    if (/\blive-ring\b|\blive-badge\b|\bgoing-live\b|\bis-live\b|\bon-live\b|\blive-avatar\b/.test(c)) {
      return true;
    }
    if (/\blive\b/.test(c) && /ring|badge|avatar|status|dot|indicator|border|living|streaming/.test(c)) {
      return true;
    }
    if (/border.*red|red.*ring|live.*border|living/i.test(c)) return true;
    return false;
  }
  function elementHasLiveAccentStyle(el) {
    const inline = el.getAttribute("style") ?? "";
    if (/#fe2c55|#ff2c55|rgb\(\s*25[0-4]\s*,\s*[0-5]?\d\s*,\s*[0-9]{1,2}\s*\)/i.test(inline) || cssColorLooksLikeLiveRing(inline)) {
      return true;
    }
    if (typeof getComputedStyle === "function" && el instanceof HTMLElement) {
      try {
        const style = getComputedStyle(el);
        const borderW = parseFloat(style.borderTopWidth || "0");
        const outlineW = parseFloat(style.outlineWidth || "0");
        if (borderW >= 1 && cssColorLooksLikeLiveRing(style.borderTopColor)) return true;
        if (outlineW >= 1 && cssColorLooksLikeLiveRing(style.outlineColor)) return true;
        if (cssColorLooksLikeLiveRing(style.boxShadow)) return true;
      } catch {
      }
    }
    return false;
  }
  function wrapperHasLiveColoredRing(img) {
    if (elementHasLiveAccentStyle(img)) return true;
    let el = img.parentElement;
    for (let depth = 0; depth < 7 && el; depth++) {
      const cls = elementClassText(el);
      if (classHintsLiveRing(cls)) return true;
      const inline = el.getAttribute("style") ?? "";
      if (/border[^;]*(?:#fe2c55|#ff[0-9a-f]{3,4}|rgb\(\s*2[0-9]{2})/i.test(inline) || cssColorLooksLikeLiveRing(inline)) {
        return true;
      }
      if (elementHasLiveAccentStyle(el)) return true;
      for (const sib of el.children) {
        if (sib.tagName === "IMG") continue;
        if (elementHasLiveAccentStyle(sib) || classHintsLiveRing(elementClassText(sib))) {
          return true;
        }
      }
      for (const svg of el.querySelectorAll("svg circle, svg path, svg rect")) {
        const stroke = svg.getAttribute("stroke") ?? svg.getAttribute("fill") ?? svg.style?.stroke ?? "";
        if (cssColorLooksLikeLiveRing(stroke)) return true;
      }
      if (el.matches("tr, [role='row'], .live-card, [data-live-card]")) break;
      el = el.parentElement;
    }
    return false;
  }
  function imgHasLiveIndicator(img) {
    if (wrapperHasLiveColoredRing(img)) return true;
    let el = img;
    for (let depth = 0; depth < 8 && el; depth++) {
      const cls = elementClassText(el);
      if (classHintsLiveRing(cls)) return true;
      const label = el.getAttribute("aria-label") ?? "";
      if (/\b(is\s+)?live(?!.*\bdur)/i.test(label) && !/go\s*live|duration/i.test(label)) {
        return true;
      }
      for (const node of el.querySelectorAll("span, div, label, p, strong")) {
        if ((node.textContent ?? "").length > 12) continue;
        const direct = Array.from(node.childNodes).filter((n) => n.nodeType === 3).map((n) => (n.textContent ?? "").trim()).join("");
        const own = direct || (node.childNodes.length <= 2 ? (node.textContent ?? "").trim() : "");
        if (isStandaloneLiveBadgeText(own)) return true;
      }
      if (el.matches("tr, [role='row'], .live-card, [data-live-card]")) break;
      el = el.parentElement;
    }
    return false;
  }
  function isChatCommentLine(line) {
    const t = line.trim();
    if (t.length < 4 || t.length > 200) return false;
    return /^[a-z0-9._]{2,40}:\s+\S/i.test(t);
  }
  function creatorCellShowsLive(cell) {
    for (const img of cell.querySelectorAll("img[src]")) {
      const src = img.getAttribute("src") ?? "";
      if (!src || src.startsWith("data:")) continue;
      if (imgHasLiveIndicator(img)) return true;
    }
    const cls = elementClassText(cell).toLowerCase();
    if (/living|on-?live|live-?status|avatar.*live/i.test(cls)) return true;
    for (const el of cell.querySelectorAll("[class], [style]")) {
      const c = elementClassText(el);
      if (classHintsLiveRing(c)) return true;
      if (elementHasLiveAccentStyle(el)) return true;
    }
    return false;
  }
  function isLikelyChatOverlay(el) {
    const cls = elementClassText(el).toLowerCase();
    if (/chat|comment|message|danmaku|bullet|im-message/i.test(cls)) return true;
    const text = el.textContent ?? "";
    const lines = text.split(/\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length < 2) return false;
    const chatLines = lines.filter(isChatCommentLine);
    return chatLines.length >= 2 && chatLines.length / lines.length >= 0.25;
  }

  // src/parser/live-username.ts
  var LIVE_HANDLE_BLOCKLIST = /* @__PURE__ */ new Set([
    "creators",
    "creatorsmanage",
    "creatorsmanagement",
    "creator",
    "manage",
    "management",
    "live",
    "liveduration",
    "livedur",
    "duration",
    "diamonds",
    "diamond",
    "gifters",
    "gifter",
    "viewers",
    "viewer",
    "follower",
    "followers",
    "current",
    "promote",
    "showing",
    "estimated",
    "bonus",
    "ratio",
    "streaming",
    "stream",
    "inactive",
    "notable",
    "eligible",
    "assking",
    "king_reaper5150",
    "king_reaper"
  ]);
  function isSuspiciousLiveHandle(handle) {
    if (handle.length > 24) return true;
    if (/assking|king_reaper/i.test(handle)) return true;
    if (/\d{5,}/.test(handle) && handle.length > 18) return true;
    const chunks = handle.match(/[a-z][a-z0-9_]{4,}/gi) ?? [];
    const unique = new Set(chunks.map((c) => c.toLowerCase()));
    if (unique.size >= 2 && handle.length >= 16) return true;
    for (const chunk of unique) {
      if (handle.split(chunk).length > 2) return true;
    }
    return false;
  }
  function isInvalidLiveStreamHandle(raw) {
    const handle = cleanTikTokUsername(raw);
    if (!handle) return true;
    if (LIVE_HANDLE_BLOCKLIST.has(handle)) return true;
    if (/manage|duration|viewers?|gifters?|diamonds?|follower|promote|showing|estimated|bonus|ratio/i.test(handle)) {
      return true;
    }
    if (handle.startsWith("live") && handle.length <= 14) return true;
    if (handle.startsWith("creator") && handle.length <= 16) return true;
    if (isSuspiciousLiveHandle(handle)) return true;
    return false;
  }

  // src/parser/live-header-hints.ts
  var HANDLE_IN_TEXT = /@?([a-z0-9._]{2,24})/i;
  var TRUNCATED_HANDLE = /^([a-z0-9._]{4,28})\.{2,3}$/i;
  var PLAIN_HANDLE = /^@?([a-z0-9._]{2,24})$/i;
  function handleFromRawText(raw) {
    if (!raw) return void 0;
    const trimmed = raw.trim();
    if (!trimmed || trimmed.length > 80) return void 0;
    const plain = trimmed.match(PLAIN_HANDLE);
    if (plain) {
      const u = cleanTikTokUsername(plain[1]);
      if (u && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) return u;
    }
    const embedded = trimmed.match(HANDLE_IN_TEXT);
    if (embedded && trimmed.length <= 40) {
      const u = cleanTikTokUsername(embedded[1]);
      if (u && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) return u;
    }
    return void 0;
  }
  function expandTruncatedPrefix(scope, prefix) {
    const key = prefix.toLowerCase().replace(/\.$/, "");
    if (key.length < 4) return void 0;
    const candidates = [];
    const push = (raw) => {
      const u = handleFromRawText(raw);
      if (u && u.startsWith(key) && u.length > key.length) candidates.push(u);
    };
    for (const el of scope.querySelectorAll("[title], [aria-label], [data-username], [data-user-name]")) {
      push(el.getAttribute("title"));
      push(el.getAttribute("aria-label"));
      push(el.getAttribute("data-username"));
      push(el.getAttribute("data-user-name"));
    }
    for (const el of scope.querySelectorAll(
      "[role='tooltip'], [class*='tooltip'], [class*='Tooltip'], [class*='popover'], [class*='Popover']"
    )) {
      push(el.textContent);
    }
    if (candidates.length === 0) return void 0;
    candidates.sort((a, b) => b.length - a.length);
    return candidates[0];
  }
  function usernameFromLiveHeaderHints(scope) {
    const attrEls = scope.querySelectorAll(
      "[title], [aria-label], [data-username], [data-user-name], [data-nickname]"
    );
    for (const el of attrEls) {
      for (const attr of ["title", "aria-label", "data-username", "data-user-name", "data-nickname"]) {
        const u = handleFromRawText(el.getAttribute(attr));
        if (u) return u;
      }
    }
    for (const el of scope.querySelectorAll(
      "[role='tooltip'], [class*='tooltip'], [class*='Tooltip'], [class*='popover'], [class*='Popover']"
    )) {
      const u = handleFromRawText(el.textContent);
      if (u) return u;
    }
    for (const el of scope.querySelectorAll("[aria-describedby]")) {
      const id = el.getAttribute("aria-describedby");
      if (!id) continue;
      const doc = el.ownerDocument;
      const safeId = id.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, "\\$1");
      const tip = doc?.getElementById(id) ?? scope.querySelector(`#${safeId}`);
      const u = handleFromRawText(tip?.textContent ?? tip?.getAttribute("title"));
      if (u) return u;
    }
    for (const line of (scope.textContent ?? "").split(/\n/).map((l) => l.trim())) {
      const trunc = line.match(TRUNCATED_HANDLE);
      if (!trunc) continue;
      const expanded = expandTruncatedPrefix(scope, trunc[1]);
      if (expanded) return expanded;
      const fromTitle = scope.querySelector(`[title="${trunc[1]}"], [title^="${trunc[1]}"]`);
      if (fromTitle) {
        const u = handleFromRawText(fromTitle.getAttribute("title"));
        if (u) return u;
      }
    }
    return void 0;
  }

  // src/parser/extractLiveNow.ts
  var DOC_POS_FOLLOWING = 4;
  var DOC_POS_PRECEDING = 2;
  function isPageChromeText(text) {
    const t = text.trim().toLowerCase();
    if (t.length < 8) return true;
    if (/^promote their live/i.test(t)) return true;
    if (/^showing\s+\d+-\d+\s+of\s+\d+/i.test(t)) return true;
    if (t === "live now" || t === "live") return true;
    return false;
  }
  var LIVE_STAT_LINE = /live\s*(?:time|dur(?:ation)?)|diamonds?|gifts?|gifters?|new\s*viewers?|viewers?/i;
  function cardHasLiveStats(text) {
    const hasDuration = /live\s*(?:time|dur(?:ation)?)/i.test(text);
    const hasEarnings = /diamonds?|gifts?/i.test(text);
    const hasAudience = /(?:new\s*)?viewers?|watching|current/i.test(text);
    return hasDuration && hasEarnings && hasAudience;
  }
  function isLiveStreamScope(text) {
    const t = text.trim();
    if (t.length < 20 || t.length > 5e3) return false;
    return /live\s*(?:time|dur(?:ation)?)/i.test(t) && /diamonds?|gifts?/i.test(t);
  }
  function dedupeToSmallestLiveCards(elements) {
    const sorted = [...elements].sort(
      (a, b) => (a.textContent?.length ?? 0) - (b.textContent?.length ?? 0)
    );
    const kept = [];
    for (const el of sorted) {
      const contained = kept.findIndex((k) => el.contains(k) && k !== el);
      if (contained >= 0) {
        kept[contained] = el;
        continue;
      }
      if (kept.some((k) => k.contains(el) && k !== el)) continue;
      kept.push(el);
    }
    return kept.sort(compareDocumentOrder);
  }
  function liveCardRoot(el) {
    const text = (el.textContent ?? "").trim();
    const headerText = cardHeaderText(text);
    if (cardHasCreatorHeader(el, headerText)) return el;
    const parent = el.parentElement;
    if (parent) {
      const pt = (parent.textContent ?? "").trim();
      if (cardHasLiveStats(pt) && cardHasCreatorHeader(parent, cardHeaderText(pt))) {
        return parent;
      }
    }
    return el;
  }
  function cardHasCreatorHeader(el, headerText) {
    if (/id\s*\d{4,}/i.test(headerText)) return true;
    if (usernameFromLinks(el)) return true;
    for (const img of el.querySelectorAll("img[src]")) {
      if (!isStreamPreviewImage(img, el)) return true;
    }
    return /^@?[a-z0-9._]{2,}/i.test(headerText.split(/\n/)[0] ?? "");
  }
  function compareDocumentOrder(a, b) {
    const pos = a.compareDocumentPosition(b);
    if (pos & DOC_POS_FOLLOWING) return -1;
    if (pos & DOC_POS_PRECEDING) return 1;
    return 0;
  }
  function imagePixelArea(img) {
    const w = parseInt(img.getAttribute("width") ?? "", 10);
    const h = parseInt(img.getAttribute("height") ?? "", 10);
    if (!Number.isNaN(w) && !Number.isNaN(h) && w > 0 && h > 0) return w * h;
    return 0;
  }
  function isStreamPreviewImage(img, cardRoot) {
    const cls = `${elementClassText(img)} ${elementClassText(img.parentElement ?? img)}`.toLowerCase();
    if (/preview|cover|video|player|stream|thumb|room/i.test(cls)) return true;
    const w = parseInt(img.getAttribute("width") ?? "", 10);
    const h = parseInt(img.getAttribute("height") ?? "", 10);
    if (!Number.isNaN(w) && w > 100) return true;
    if (!Number.isNaN(h) && h > 100) return true;
    const root = cardRoot ?? img.closest("li, article, section, div");
    if (root) {
      const imgs = [...root.querySelectorAll("img[src]")].filter((i) => {
        const src = i.getAttribute("src") ?? "";
        return src && !src.startsWith("data:");
      });
      if (imgs.length >= 2) {
        const areas = imgs.map(imagePixelArea);
        const max = Math.max(...areas);
        const mine = imagePixelArea(img);
        if (max > 0 && mine === max && max >= 12e3) return true;
      }
    }
    return false;
  }
  function liveBadgeImagesIn(root) {
    const imgs = [];
    for (const img of root.querySelectorAll("img[src]")) {
      const src = img.getAttribute("src") ?? "";
      if (!src || src.startsWith("data:") || src.includes("emoji")) continue;
      if (isStreamPreviewImage(img)) continue;
      if (imgHasLiveIndicator(img)) imgs.push(img);
    }
    return imgs;
  }
  function climbToLiveCard(img) {
    let el = img.parentElement;
    for (let depth = 0; depth < 12 && el; depth += 1) {
      if (isLikelyChatOverlay(el)) {
        el = el.parentElement;
        continue;
      }
      const text = (el.textContent ?? "").trim();
      if (text.length >= 30 && text.length <= 2800 && cardHasLiveStats(text) && !isPageChromeText(text)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }
  function findLiveCardsByStatsPanel(doc) {
    const roots = [];
    for (const el of doc.querySelectorAll("div, section, article, li, span")) {
      const text = (el.textContent ?? "").trim();
      if (text.length < 15 || text.length > 900) continue;
      if (!/live\s*(?:time|dur(?:ation)?)/i.test(text)) continue;
      if (!/diamonds?|gifts?/i.test(text)) continue;
      let scope = el;
      for (let depth = 0; depth < 12 && scope; depth += 1) {
        const block = (scope.textContent ?? "").trim();
        if (isLiveStreamScope(block) && scope.querySelector("img[src]")) {
          roots.push(scope);
          break;
        }
        scope = scope.parentElement;
      }
    }
    return roots;
  }
  function extractLiveNowFromTitleAnchors(doc) {
    const rows = [];
    for (const el of doc.querySelectorAll("[title], [aria-label]")) {
      const username = handleFromRawText(el.getAttribute("title")) ?? handleFromRawText(el.getAttribute("aria-label"));
      if (!username) continue;
      let scope = el;
      let card = null;
      for (let depth = 0; depth < 18 && scope; depth += 1) {
        const block = (scope.textContent ?? "").trim();
        if (isLiveStreamScope(block)) {
          card = scope;
          break;
        }
        scope = scope.parentElement;
      }
      if (!card) continue;
      const parsed = buildLiveRowFromScope(card, username);
      if (parsed) rows.push(parsed);
    }
    return rows;
  }
  function findLiveCreatorCards(doc) {
    const roots = [];
    for (const img of liveBadgeImagesIn(doc)) {
      const card = climbToLiveCard(img);
      if (card) roots.push(card);
    }
    roots.push(...findLiveCardsByStatsPanel(doc));
    for (const a of doc.querySelectorAll('a[href*="/live"], a[href*="LiveRoom"], a[href*="live_room"]')) {
      const href = a.getAttribute("href") ?? "";
      if (!/@[a-z0-9._]+/i.test(href) && !/live/i.test(href)) continue;
      let el = a;
      for (let depth = 0; depth < 12 && el; depth += 1) {
        const text = (el.textContent ?? "").trim();
        if (text.length >= 30 && cardHasLiveStats(text) && !isPageChromeText(text) && !isLikelyChatOverlay(el)) {
          roots.push(el);
          break;
        }
        el = el.parentElement;
      }
    }
    return dedupeToSmallestLiveCards(roots);
  }
  function cardHeaderText(fullText) {
    const idx = fullText.search(/live\s*(?:time|dur(?:ation)?)/i);
    if (idx > 20) return fullText.slice(0, idx).trim();
    const idx2 = fullText.search(/\b(?:diamonds?|gifts?)\b/i);
    if (idx2 > 20) return fullText.slice(0, idx2).trim();
    const lines = fullText.split(/\n/).map((l) => l.trim()).filter(Boolean);
    const headerLines = [];
    for (const line of lines) {
      if (isChatCommentLine(line)) break;
      if (LIVE_STAT_LINE.test(line) && /live\s*(?:time|dur)/i.test(line)) break;
      if (LIVE_STAT_LINE.test(line) && headerLines.length > 2) break;
      headerLines.push(line);
      if (headerLines.length >= 8) break;
    }
    if (headerLines.length) return headerLines.join("\n");
    return fullText.slice(0, Math.min(fullText.length, 400)).trim();
  }
  function streamCardHeaderElement(card) {
    for (const img of card.querySelectorAll("img[src]")) {
      if (isStreamPreviewImage(img, card)) continue;
      const header = img.closest(
        '[class*="header"], [class*="Header"], [class*="info"], [class*="creator"], [class*="anchor"]'
      ) ?? img.parentElement?.parentElement;
      if (header && !isLikelyChatOverlay(header)) return header;
    }
    return null;
  }
  function usernameFromStreamCard(card, headerText) {
    const headerEl = streamCardHeaderElement(card);
    const scope = headerEl ?? card;
    const scopeText = (headerEl?.textContent ?? headerText).slice(0, 350);
    const fromHints = usernameFromLiveHeaderHints(scope);
    if (fromHints && !isSuspiciousLiveHandle(fromHints)) return fromHints;
    const fromLink = usernameFromLinks(scope);
    if (fromLink && !isSuspiciousLiveHandle(fromLink)) return fromLink;
    for (const img of scope.querySelectorAll("img[alt]")) {
      if (isStreamPreviewImage(img, card)) continue;
      const alt = cleanTikTokUsername(img.getAttribute("alt"));
      if (alt && !isInvalidLiveStreamHandle(alt) && !isSuspiciousLiveHandle(alt)) return alt;
    }
    for (const line of scopeText.split(/\n/).map((l) => l.trim()).filter(Boolean)) {
      if (isChatCommentLine(line)) continue;
      if (/^id\s*\d/i.test(line)) continue;
      if (LIVE_STAT_LINE.test(line)) continue;
      const truncated = line.match(/^([a-z0-9._]{2,28})\.{2,3}$/i);
      if (truncated) {
        const expanded = usernameFromLiveHeaderHints(scope);
        if (expanded && expanded.startsWith(truncated[1].toLowerCase().replace(/\.$/, ""))) {
          return expanded;
        }
        const u = cleanTikTokUsername(truncated[1]);
        if (u && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) return u;
      }
      const at = line.match(/^@([a-z0-9._]{2,28})/i);
      if (at) {
        const u = cleanTikTokUsername(at[1]);
        if (u && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) return u;
      }
      if (/^[a-z0-9._]{2,28}$/i.test(line)) {
        const u = cleanTikTokUsername(line);
        if (u && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) return u;
      }
    }
    return void 0;
  }
  function avatarFrom(el) {
    for (const img of el.querySelectorAll("img[src]")) {
      if (isStreamPreviewImage(img, el)) continue;
      if (imgHasLiveIndicator(img)) {
        const src = img.getAttribute("src");
        if (src && !src.startsWith("data:")) return src;
      }
    }
    return avatarFromRow(el);
  }
  function displayNameFrom(el, headerText) {
    for (const img of el.querySelectorAll("img[alt]")) {
      if (isStreamPreviewImage(img, el)) continue;
      const alt = img.getAttribute("alt")?.trim();
      if (alt && alt.length > 1 && alt.length < 80 && !/^level\s*\d/i.test(alt)) {
        const asHandle = cleanTikTokUsername(alt);
        if (!asHandle || asHandle !== alt.replace(/\s+/g, "").toLowerCase()) return alt;
      }
    }
    for (const line of headerText.split(/\n/).map((l) => l.trim()).filter(Boolean)) {
      if (isChatCommentLine(line)) continue;
      if (/^id\s*\d/i.test(line)) continue;
      if (line.startsWith("@")) continue;
      if (line.length > 3 && line.length < 64 && !/live|diamond|viewer|gifter/i.test(line)) {
        return line;
      }
    }
    return void 0;
  }
  function usernameFromLinks(el, scope) {
    const root = scope ?? el;
    for (const a of root.querySelectorAll("a[href]")) {
      const href = a.getAttribute("href") ?? "";
      const m = href.match(/tiktok\.com\/@([a-z0-9._]+)/i);
      if (m) {
        const u = cleanTikTokUsername(m[1]);
        if (u && !isInvalidLiveStreamHandle(u)) return u;
      }
    }
    return void 0;
  }
  function usernameFromHeader(el, headerText, displayName) {
    const fromCard = usernameFromStreamCard(el, headerText);
    if (fromCard) return fromCard;
    const inferred = cleanTikTokUsername(displayName);
    if (inferred && !isInvalidLiveStreamHandle(inferred) && !isSuspiciousLiveHandle(inferred)) {
      return inferred;
    }
    return void 0;
  }
  function parseStatValue(text, label) {
    const m = text.match(
      new RegExp(
        `${label.source}\\s*[:.\\s]*([\\d,.]+\\s*[kmb]?|\\d+\\s*[hm](?:\\s*\\d+\\s*m)?)`,
        "i"
      )
    );
    if (m?.[1]) return m[1].trim();
    return void 0;
  }
  function buildLiveRowFromScope(card, username) {
    if (!username || isSuspiciousLiveHandle(username)) return null;
    const text = (card.textContent ?? "").trim();
    if (!text || !isLiveStreamScope(text)) return null;
    const headerText = cardHeaderText(text);
    const displayName = displayNameFrom(card, headerText);
    const liveDuration = parseStatValue(text, /live\s*(?:time|dur(?:ation)?)\.?\.?/) ?? text.match(/live\s*(?:time|dur(?:ation)?)\.?\s*(\d+\s*[hm](?:\s*\d+\s*m)?)/i)?.[1]?.trim();
    const diamonds = parseStatValue(text, /diamonds?/) ?? parseStatValue(text, /gifts?/);
    const viewers = parseStatValue(text, /viewers?(?!\s*count)/);
    const watching = parseStatValue(text, /current\.?\.?/) ?? text.match(/(\d+)\s*(?:watching|viewers?\s*now)/i)?.[1];
    let viewerCountText;
    const parts = [];
    if (watching) parts.push(`${watching} watching now`);
    if (viewers) parts.push(`${viewers} viewers`);
    if (diamonds) parts.push(`${diamonds} diamonds`);
    if (parts.length) viewerCountText = parts.join(" \xB7 ");
    const badgeSeen = liveBadgeImagesIn(card).length > 0 || !!usernameFromLinks(card);
    return {
      tiktokUsername: username,
      usernameConfidence: "high",
      usernameSource: "username_column",
      displayName: displayName ?? void 0,
      avatarUrl: avatarFrom(card),
      viewerCountText,
      liveStartedText: liveDuration ?? void 0,
      liveBadgeDetected: badgeSeen,
      rawTextPreview: headerText.slice(0, 200)
    };
  }
  function parseLiveCard(el) {
    if (isLikelyChatOverlay(el)) return null;
    const text = (el.textContent ?? "").trim();
    if (!text || isPageChromeText(text) || !cardHasLiveStats(text)) return null;
    if (!el.querySelector("img[src]")) return null;
    const headerText = cardHeaderText(text);
    const displayName = displayNameFrom(el, headerText);
    const username = usernameFromStreamCard(el, headerText) ?? usernameFromHeader(el, headerText, displayName);
    if (!username) return null;
    return buildLiveRowFromScope(el, username);
  }
  function dedupeLive(rows) {
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    for (const r of rows) {
      const key = normalizeTikTokUsername(r.tiktokUsername) ?? "";
      if (!key || seen.has(key) || isInvalidLiveStreamHandle(key) || isSuspiciousLiveHandle(key)) {
        continue;
      }
      seen.add(key);
      out.push(r);
    }
    return out;
  }
  function extractLiveNowRowsFromPage(doc = document) {
    const rows = [];
    rows.push(...extractLiveNowFromTitleAnchors(doc));
    const cards = findLiveCreatorCards(doc);
    for (const el of cards) {
      const parsed = parseLiveCard(liveCardRoot(el));
      if (parsed) rows.push(parsed);
    }
    if (rows.length === 0) {
      rows.push(...extractLiveNowFromInnerText(doc));
    }
    return dedupeLive(rows);
  }
  function extractLiveNowFromInnerText(doc) {
    const text = doc.body?.innerText ?? "";
    if (!/live\s*dur/i.test(text) && !/live\s*time/i.test(text)) return [];
    const rows = [];
    const chunks = text.split(/(?=\n\s*LIVE\s*(?:time|dur))/i);
    for (const chunk of chunks) {
      if (!/live\s*(?:time|dur)/i.test(chunk)) continue;
      const headerPart = chunk.split(/LIVE\s*(?:time|dur)/i)[0] ?? "";
      let username;
      for (const line of headerPart.split(/\n/).map((l) => l.trim()).filter(Boolean)) {
        if (isChatCommentLine(line) || /^id\s*\d/i.test(line)) continue;
        const fromDom = doc.querySelector(`[title="${line}"], [title^="${line.replace(/\.\.\.$/, "")}"]`);
        if (fromDom) {
          username = handleFromRawText(fromDom.getAttribute("title"));
          if (username) break;
        }
        const trunc = line.match(/^([a-z0-9._]{2,28})\.{2,3}$/i);
        if (trunc) {
          username = handleFromRawText(
            doc.querySelector(`[title^="${trunc[1]}"]`)?.getAttribute("title")
          );
          if (username) break;
        }
      }
      if (!username) {
        const at = headerPart.match(/@([a-z0-9._]{2,24})/i);
        if (at) username = cleanTikTokUsername(at[1]);
      }
      if (!username || isSuspiciousLiveHandle(username)) continue;
      const liveDuration = chunk.match(/live\s*(?:time|dur)\.?\s*(\d+\s*[hm])/i)?.[1]?.trim();
      const diamonds = chunk.match(/diamonds?\s*(\d+)/i)?.[1];
      const viewers = chunk.match(/viewers?\s*(\d+)/i)?.[1];
      const parts = [];
      if (viewers) parts.push(`${viewers} viewers`);
      if (diamonds) parts.push(`${diamonds} diamonds`);
      rows.push({
        tiktokUsername: username,
        usernameConfidence: "high",
        usernameSource: "username_column",
        viewerCountText: parts.length ? parts.join(" \xB7 ") : void 0,
        liveStartedText: liveDuration,
        liveBadgeDetected: false,
        rawTextPreview: headerPart.slice(0, 120)
      });
    }
    return rows;
  }
  function creatorTableRows(doc) {
    const grid = findCreatorContributionGrid(doc);
    if (grid) {
      const rows = dataRowsInContainer(grid);
      if (rows.length > 0) return rows;
    }
    const gridRows = Array.from(doc.querySelectorAll('[role="row"]')).filter(
      (el) => !el.querySelector('[role="columnheader"]') && (el.querySelector('[role="cell"]') || el.querySelector("td")) && (el.textContent?.length ?? 0) > 15
    );
    const fromTable = Array.from(doc.querySelectorAll("table tbody tr")).filter(
      (tr) => (tr.textContent?.length ?? 0) > 15
    );
    if (gridRows.length >= Math.max(fromTable.length, 1)) return gridRows;
    return fromTable;
  }
  function extractLiveRowsFromCreatorTable(doc = document) {
    const rows = [];
    for (const row of creatorTableRows(doc)) {
      const creatorCell = row.querySelector('[role="cell"], td') ?? row;
      const avatarImg = Array.from(creatorCell.querySelectorAll("img[src]")).find(
        (img) => !isStreamPreviewImage(img)
      );
      if (!avatarImg || !creatorCellShowsLive(creatorCell)) continue;
      const cellText = (creatorCell.textContent ?? "").trim();
      const displayName = displayNameFrom(creatorCell, cellText);
      const username = usernameFromHeader(creatorCell, cellText, displayName);
      if (!username) continue;
      rows.push({
        tiktokUsername: username,
        usernameConfidence: "high",
        usernameSource: "username_column",
        displayName: displayName ?? void 0,
        avatarUrl: avatarFromRow(creatorCell) ?? avatarFrom(creatorCell),
        liveBadgeDetected: true,
        rawTextPreview: cellText.slice(0, 200)
      });
    }
    return dedupeLive(rows);
  }

  // src/parser/duration.ts
  function progressActualSegment(raw) {
    const t = raw.trim();
    const slash = t.search(/\s*[\/／]\s*/);
    if (slash === -1) return t.replace(/\(level\s*\d+\)/gi, "").trim();
    return t.slice(0, slash).replace(/\(level\s*\d+\)/gi, "").trim();
  }
  function parseLiveDaysFromCell(raw) {
    if (!raw) return void 0;
    const progress = raw.match(/(\d+)\s*d(?:ays?)?\s*[\/／]\s*(\d+)\s*d(?:ays?)?/i);
    if (progress) return Number(progress[1]);
    const segment = progressActualSegment(raw);
    const dayMatch = segment.match(/(\d+)\s*d(?:ays?)?/i);
    if (dayMatch) {
      const n = Number(dayMatch[1]);
      if (n >= 30) return 0;
      return n;
    }
    if (/^\d+$/.test(segment)) {
      const n = Number(segment);
      return n >= 30 ? 0 : n;
    }
    if (!raw.includes("/") && !raw.includes("\uFF0F")) {
      const m = raw.trim().match(/(\d+)\s*d(?:ays?)?/i);
      if (m) {
        const n = Number(m[1]);
        return n >= 30 ? 0 : n;
      }
      const compact = parseCompactNumber(raw);
      if (compact !== void 0 && compact <= 7) return compact;
      if (compact !== void 0 && compact > 7) return 0;
      return void 0;
    }
    return void 0;
  }
  function parseStreamHoursFromCell(raw) {
    if (!raw) return void 0;
    const segment = progressActualSegment(raw);
    if (!segment) {
      if (/^0\s*h/i.test(raw.trim())) return 0;
      return void 0;
    }
    const seconds = parseDurationToSeconds(segment);
    if (seconds !== void 0) return Math.round(seconds / 3600 * 10) / 10;
    if (/^0\s*h/i.test(segment)) return 0;
    if (/^\d+(?:\.\d+)?\s*h/i.test(segment)) {
      const h = Number(segment.match(/^(\d+(?:\.\d+)?)/)?.[1]);
      if (Number.isFinite(h)) return h;
    }
    return void 0;
  }
  function parseDurationToSeconds(raw) {
    if (!raw) return void 0;
    const t = progressActualSegment(raw).toLowerCase();
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

  // src/parser/extractRows.ts
  function rowLikeElements(doc) {
    const contributionGrid = findCreatorContributionGrid(doc);
    if (contributionGrid) {
      const rows = dataRowsInContainer(contributionGrid);
      if (rows.length > 0) return rows;
    }
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
  function headerTextsForRow(row) {
    const fromTable = headerTextsForTable(row);
    if (fromTable.length >= 3) return fromTable;
    const grid = row.closest('[role="grid"], table');
    if (grid) {
      const headers = [...grid.querySelectorAll('[role="columnheader"], thead th')].map((h) => (h.textContent ?? "").trim().toLowerCase()).filter(Boolean);
      if (headers.length >= 3) return headers;
    }
    return fromTable;
  }
  function extractDiamondsFromRowText(rowText, username) {
    let text = rowText;
    if (username) {
      text = text.replace(
        new RegExp(username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
        " "
      );
    }
    const fromLines = pickLargestDiamondLikeValue(splitCellLines(text), username);
    if (fromLines !== void 0) return fromLines;
    const commaMatches = [...text.matchAll(/\b(\d{1,3}(?:,\d{3})+)\b/g)].map((m) => parseCompactNumber(m[1])).filter((n) => n !== void 0 && n >= 100);
    if (commaMatches.length > 0) return Math.max(...commaMatches);
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
    const usernameRaw = creatorColumn.trim().slice(0, 200) || void 0;
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
      tiktokUsernameRaw: usernameRaw,
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
      if (/\bdiamonds?\b|\bgifts?\b/i.test(h)) map.coins = idx;
      else if (/\bcoins?\b/i.test(h) && !/incentive|contribution|bonus/i.test(h)) map.coins = idx;
      if (/(engagements?|interactions?)/i.test(h) && !/incentive/i.test(h)) map.engagements = idx;
      if (!/eligible\s*incentive/i.test(h) && /(valid\s*go\s*live|valid.*live.*days?|days?\s*streamed|live\s*days?)/i.test(h)) {
        map.days = idx;
      }
      if (/(stream duration|live duration)/i.test(h) || /\bhours?\b/.test(h)) map.hours = idx;
      if (/(activeness|activity level|active level)/i.test(h)) map.activeness = idx;
    });
    return map;
  }
  function parseStatsRow(row, _doc = document) {
    const cells = cellTexts(row);
    const cellEls = tableCells(row);
    if (cells.length === 0) return null;
    const headers = headerTextsForRow(row);
    const columnMap = inferColumnMap(headers);
    const creatorText = columnMap.creator !== void 0 ? cellEls[columnMap.creator]?.textContent ?? cells[columnMap.creator] ?? "" : cellEls[0]?.textContent ?? cells[0] ?? "";
    const usernameRaw = creatorText.trim().slice(0, 200) || void 0;
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
    diamonds = diamondsFromRowGrid(row);
    if (diamonds !== void 0) coins = diamonds;
    if (columnMap.engagements !== void 0) {
      const text = statTextFromRowColumn(row, columnMap.engagements, cellEls);
      if (text) engagements = parseStatNumber(text);
    }
    if (columnMap.days !== void 0) {
      const text = statTextFromRowColumn(row, columnMap.days, cellEls);
      if (text) {
        days = parseLiveDaysFromCell(text);
      }
    }
    if (columnMap.hours !== void 0) {
      const text = statTextFromRowColumn(row, columnMap.hours, cellEls);
      if (text) {
        hours = parseStreamHoursFromCell(text);
        if (hours !== void 0) {
          liveDurationText = text;
          liveDurationSeconds = Math.round(hours * 3600);
        }
      }
    }
    if (columnMap.activeness !== void 0) {
      const text = statTextFromRowColumn(row, columnMap.activeness, cellEls);
      if (text) activeness = parseActiveness(text);
    }
    for (const cellEl of cellEls) {
      const cell = readStatCellText(cellEl);
      const lower = cell.toLowerCase();
      if (!diamonds && /\bdiamonds?\b/i.test(cell)) {
        const n = parseStatNumber(cell);
        if (n !== void 0) {
          diamonds = n;
          coins = n;
        }
      }
      if (!days && (lower.includes("live day") || lower.includes("go live") || /\d+\s*d\s*[\/／]/.test(cell) || /^\d+\s*d(?:ays?)?\b/i.test(cell.trim()))) {
        const parsed = parseLiveDaysFromCell(cell);
        if (parsed !== void 0) days = parsed;
      }
      if (!hours && (/\d+\s*h\s*[\/／]/.test(cell) || /\d+\s*h(?:\s*\d+\s*m)?\b/i.test(cell) || lower.includes("duration") && /\d/.test(cell))) {
        const parsed = parseStreamHoursFromCell(cell);
        if (parsed !== void 0) {
          hours = parsed;
          liveDurationText = cell;
          liveDurationSeconds = Math.round(parsed * 3600);
        }
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
      diamonds = pickLargestDiamondLikeValue(cells, username);
      if (diamonds !== void 0) coins = diamonds;
    }
    if (diamonds === void 0) {
      const inner = row.innerText?.trim() ?? joined;
      diamonds = extractDiamondsFromRowText(inner, username);
      if (diamonds !== void 0) coins = diamonds;
    }
    if (coins === void 0 && diamonds !== void 0) coins = diamonds;
    if (!username || username.length < 2) return null;
    return {
      tiktokUsername: username,
      tiktokUsernameRaw: usernameRaw,
      usernameConfidence: usernameCandidate.confidence,
      usernameSource: usernameCandidate.source,
      displayName: displayNameFromRow(row, username),
      avatarUrl: avatarFromRow(row),
      coinsEarned: coins,
      diamondsEarned: diamonds,
      engagements,
      daysStreamed: days ?? 0,
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
        statPeriodStart: detection.statPeriodStart,
        statPeriodEnd: detection.statPeriodEnd,
        rows: [],
        liveRows: extractLiveNowRowsFromPage(doc)
      };
    }
    const liveFromTable = detection.detectedPageType === "creator_stats" || detection.detectedPageType === "manage_relationship" ? extractLiveRowsFromCreatorTable(doc) : [];
    return {
      sourcePageUrl: url,
      detectedPageType: detection.detectedPageType,
      relationshipTab: detection.relationshipTab,
      statPeriodLabel: detection.statPeriodLabel,
      statPeriodStart: detection.statPeriodStart,
      statPeriodEnd: detection.statPeriodEnd,
      rows: extractCreatorRowsFromPage(doc, detection.detectedPageType, detection.relationshipTab),
      liveRows: liveFromTable
    };
  }

  // src/autoSyncContent.ts
  var DEBOUNCE_MS = 5e3;
  var MAX_WAIT_FOR_ROWS_MS = 45e3;
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
      statPeriodStart: snapshot.statPeriodStart,
      statPeriodEnd: snapshot.statPeriodEnd,
      rows: snapshot.rows.map(stripPreview),
      liveRows: snapshot.liveRows.length > 0 ? snapshot.liveRows.map(stripPreview) : void 0
    };
  }
  function rowCount(snapshot) {
    return snapshot.detectedPageType === "live_now" ? snapshot.liveRows.length : snapshot.rows.length;
  }
  function statsLookReady(snapshot) {
    if (snapshot.detectedPageType === "live_now") return snapshot.liveRows.length > 0;
    if (snapshot.detectedPageType !== "creator_stats" && snapshot.detectedPageType !== "manage_relationship") {
      return rowCount(snapshot) > 0;
    }
    return snapshot.rows.some((r) => (r.diamondsEarned ?? 0) > 0 || (r.coinsEarned ?? 0) > 0);
  }
  function fingerprint(snapshot) {
    const top = snapshot.rows[0]?.tiktokUsername ?? snapshot.liveRows[0]?.tiktokUsername ?? "";
    return `${snapshot.detectedPageType}|${snapshot.sourcePageUrl}|${rowCount(snapshot)}|${top}`;
  }
  function startBackstageAutoSync() {
    let debounce;
    let lastSentFingerprint = "";
    let lastUrl = location.href;
    const startedAt = Date.now();
    const queue = (reason) => {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(() => void attempt(reason), DEBOUNCE_MS);
    };
    const attempt = async (reason) => {
      try {
        const snapshot = buildPageSnapshot(location.href, document);
        if (!statsLookReady(snapshot)) {
          if (Date.now() - startedAt < MAX_WAIT_FOR_ROWS_MS) {
            queue("wait-rows");
          }
          return;
        }
        const fp = fingerprint(snapshot);
        if (fp === lastSentFingerprint && reason !== "force") return;
        lastSentFingerprint = fp;
        const payload = snapshotToPayload(snapshot);
        chrome.runtime.sendMessage({
          type: "AUTO_SYNC_REQUEST",
          payload,
          reason
        });
      } catch {
      }
    };
    queue("load");
    setInterval(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        lastSentFingerprint = "";
        queue("navigation");
      }
    }, 1500);
    const observer = new MutationObserver(() => queue("dom"));
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        observer.observe(document.body, { childList: true, subtree: true });
      });
    }
  }

  // src/contentScript.ts
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
  startBackstageAutoSync();
})();
