const BACKSTAGE_HOSTS = ["live-backstage.tiktok.com", "seller-us.tiktok.com", "seller.tiktok.com"];
export function isTikTokCreatorNetworkHost(url) {
    try {
        const u = new URL(url);
        return BACKSTAGE_HOSTS.some((h) => u.hostname === h || u.hostname.endsWith(`.${h}`));
    }
    catch {
        return false;
    }
}
function readActiveRelationshipTab(doc) {
    if (typeof doc.querySelector !== "function")
        return undefined;
    const tabSelectors = [
        '[role="tab"][aria-selected="true"]',
        ".semi-tabs-tab-active",
        '[class*="tab"][class*="active"]',
        '[class*="Tab"][class*="active"]',
    ];
    for (const sel of tabSelectors) {
        const el = doc.querySelector(sel);
        const text = el?.textContent?.trim();
        if (text && text.length < 40)
            return text.replace(/\d+/g, "").trim();
    }
    return undefined;
}
function readPeriodLabel(doc) {
    if (typeof doc.querySelectorAll !== "function")
        return undefined;
    const headings = Array.from(doc.querySelectorAll("h1, h2, h3, [class*='title'], [class*='Title']"));
    for (const h of headings) {
        const t = h.textContent?.trim() ?? "";
        if (/contribution|performance|creator|week|month|period/i.test(t) && t.length < 120) {
            return t;
        }
    }
    return undefined;
}
/** Detect TikTok Creator Network backstage page type from URL + visible DOM. */
export function detectTikTokCreatorNetworkPage(url, doc = document) {
    if (!isTikTokCreatorNetworkHost(url)) {
        return { detectedPageType: "unknown" };
    }
    let path = "";
    try {
        path = new URL(url).pathname.toLowerCase();
    }
    catch {
        path = "";
    }
    const title = doc.title.toLowerCase();
    const bodyText = (doc.body?.innerText ?? "").slice(0, 4000).toLowerCase();
    if (path.includes("/relation") ||
        path.includes("/relationship") ||
        title.includes("manage relationship") ||
        bodyText.includes("manage relationship")) {
        return {
            detectedPageType: "manage_relationship",
            relationshipTab: readActiveRelationshipTab(doc),
        };
    }
    if (path.includes("/live") ||
        path.includes("live-now") ||
        path.includes("livenow") ||
        title.includes("live now") ||
        (bodyText.includes("live now") && !path.includes("/relation"))) {
        return { detectedPageType: "live_now" };
    }
    if (path.includes("/performance") ||
        path.includes("/contribution") ||
        path.includes("/data/") ||
        path.includes("/analytics") ||
        path.includes("/creator") ||
        title.includes("performance") ||
        title.includes("contribution") ||
        bodyText.includes("coins earned") ||
        bodyText.includes("diamonds") ||
        bodyText.includes("valid go live") ||
        bodyText.includes("activeness")) {
        return {
            detectedPageType: "creator_stats",
            statPeriodLabel: readPeriodLabel(doc),
        };
    }
    return { detectedPageType: "unknown" };
}
