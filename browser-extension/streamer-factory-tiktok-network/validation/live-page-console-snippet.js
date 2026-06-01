/**
 * Paste into DevTools console on a logged-in TikTok Backstage page.
 * Copies parser output JSON to clipboard (when permitted).
 * Does NOT sync — preview only.
 */
(function () {
  const normalize = (raw) => (raw || "").trim().replace(/^@+/, "").toLowerCase();

  function parseCompactNumber(raw) {
    if (!raw) return undefined;
    const t = String(raw).trim().replace(/,/g, "");
    const m = t.match(/^([+-]?\d+(?:\.\d+)?)\s*([kmb])?$/i);
    if (!m) {
      const digits = t.replace(/[^\d.-]/g, "");
      if (!digits) return undefined;
      const n = Number(digits);
      return Number.isFinite(n) ? Math.round(n) : undefined;
    }
    const base = Number(m[1]);
    let mult = 1;
    const s = (m[2] || "").toLowerCase();
    if (s === "k") mult = 1e3;
    if (s === "m") mult = 1e6;
    if (s === "b") mult = 1e9;
    return Math.round(base * mult);
  }

  function firstCompactNumber(text) {
    const m = String(text).replace(/,/g, " ").match(/(\d+(?:\.\d+)?)\s*([kmb])?\b/i);
    return m ? parseCompactNumber(`${m[1]}${m[2] || ""}`) : undefined;
  }

  function extractUsername(text) {
    const at = String(text).match(/@([a-zA-Z0-9._]{2,24})/);
    if (at) return normalize(at[1]);
    const lines = String(text).split(/\n/).map((l) => l.trim()).filter(Boolean);
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];
      if (/^[a-z0-9._]{2,24}$/.test(line)) return normalize(line);
    }
    return undefined;
  }

  function detectPage() {
    const path = location.pathname.toLowerCase();
    const title = document.title.toLowerCase();
    const body = (document.body?.innerText || "").slice(0, 4000).toLowerCase();
    if (path.includes("/relation") || title.includes("manage relationship")) {
      const tab = document.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.trim();
      return { detectedPageType: "manage_relationship", relationshipTab: tab?.replace(/\d+/g, "").trim() };
    }
    if (path.includes("/live") || title.includes("live now")) {
      return { detectedPageType: "live_now" };
    }
    if (path.includes("/performance") || path.includes("/contribution") || body.includes("activeness")) {
      return { detectedPageType: "creator_stats" };
    }
    return { detectedPageType: "unknown" };
  }

  function rowsFromTable() {
    const trs = [...document.querySelectorAll("table tbody tr")];
    return trs.map((tr) => {
      const text = tr.innerText || "";
      const cells = [...tr.querySelectorAll("td")].map((td) => td.innerText.trim());
      const img = tr.querySelector("img[src]");
      return {
        tiktokUsername: extractUsername(text),
        displayName: img?.alt || cells[0]?.split("\n")[0],
        avatarUrl: img?.src,
        relationshipRequestDate: cells.find((c) => /\d{1,2}\/\d{1,2}\/\d{4}/.test(c)),
        relationshipReason: cells.length >= 3 ? cells[cells.length - 1] : undefined,
        coinsEarned: firstCompactNumber(cells.join(" ")),
        daysStreamed: firstCompactNumber(cells.find((c) => /\d+d/i.test(c)) || ""),
        hoursStreamed: undefined,
        activenessLevel: cells.find((c) => /high|medium|low|elite/i.test(c)),
        engagements: firstCompactNumber(cells.find((c) => /engagement/i.test(c)) || ""),
        rawTextPreview: text.slice(0, 180),
      };
    }).filter((r) => r.tiktokUsername);
  }

  const detection = detectPage();
  const payload = {
    sourcePageUrl: location.href,
    ...detection,
    rows: detection.detectedPageType === "live_now" ? [] : rowsFromTable(),
    liveRows: detection.detectedPageType === "live_now" ? rowsFromTable() : undefined,
    capturedAt: new Date().toISOString(),
  };

  console.log("=== Streamer Factory parser capture ===");
  console.log(JSON.stringify(payload, null, 2));
  try {
    copy(JSON.stringify(payload, null, 2));
    console.log("(Copied to clipboard)");
  } catch {
    console.log("(Copy manually from output above)");
  }
  return payload;
})();
