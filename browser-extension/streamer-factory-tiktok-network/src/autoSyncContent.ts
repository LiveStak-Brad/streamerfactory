import { buildPageSnapshot } from "./parser/index";
import type { PageSnapshot, SyncPayload } from "./parser/types";

const DEBOUNCE_MS = 5000;
const MAX_WAIT_FOR_ROWS_MS = 45_000;

function stripPreview<T extends { rawTextPreview?: string }>(row: T): Omit<T, "rawTextPreview"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { rawTextPreview, ...rest } = row;
  return rest;
}

export function snapshotToPayload(snapshot: PageSnapshot): SyncPayload {
  return {
    sourcePageUrl: snapshot.sourcePageUrl,
    detectedPageType: snapshot.detectedPageType,
    relationshipTab: snapshot.relationshipTab,
    statPeriodLabel: snapshot.statPeriodLabel,
    rows: snapshot.rows.map(stripPreview),
    liveRows:
      snapshot.liveRows.length > 0 ? snapshot.liveRows.map(stripPreview) : undefined,
  };
}

function rowCount(snapshot: PageSnapshot): number {
  return snapshot.detectedPageType === "live_now" ? snapshot.liveRows.length : snapshot.rows.length;
}

/** Stats pages need at least one diamond so we do not sync before the table finishes loading. */
function statsLookReady(snapshot: PageSnapshot): boolean {
  if (snapshot.detectedPageType === "live_now") return snapshot.liveRows.length > 0;
  if (snapshot.detectedPageType !== "creator_stats" && snapshot.detectedPageType !== "manage_relationship") {
    return rowCount(snapshot) > 0;
  }
  return snapshot.rows.some((r) => (r.diamondsEarned ?? 0) > 0 || (r.coinsEarned ?? 0) > 0);
}

function fingerprint(snapshot: PageSnapshot): string {
  const top = snapshot.rows[0]?.tiktokUsername ?? snapshot.liveRows[0]?.tiktokUsername ?? "";
  return `${snapshot.detectedPageType}|${snapshot.sourcePageUrl}|${rowCount(snapshot)}|${top}`;
}

/**
 * When enabled in Options, asks the background worker to sync after Backstage finishes loading.
 */
export function startBackstageAutoSync(): void {
  let debounce: ReturnType<typeof setTimeout> | undefined;
  let lastSentFingerprint = "";
  let lastUrl = location.href;
  const startedAt = Date.now();

  const queue = (reason: string) => {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(() => void attempt(reason), DEBOUNCE_MS);
  };

  const attempt = async (reason: string) => {
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
        reason,
      });
    } catch {
      /* page not parseable yet */
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
