import { buildPageSnapshot, snapshotToPayload } from "./parser/index";
import type { PageSnapshot } from "./parser/types";

export { snapshotToPayload };

const DEBOUNCE_MS = 5000;
const MAX_WAIT_FOR_ROWS_MS = 45_000;

function rowCount(snapshot: PageSnapshot): number {
  return snapshot.datasetType === "live_now" ? snapshot.liveRows.length : snapshot.rows.length;
}

/** Stats pages need at least one diamond so we do not sync before the table finishes loading. */
function statsLookReady(snapshot: PageSnapshot): boolean {
  if (snapshot.datasetType === "live_now") return snapshot.liveRows.length > 0;
  if (snapshot.datasetType !== "activity_incentive") {
    return rowCount(snapshot) > 0;
  }
  return snapshot.rows.some((r) => r.diamondsEarned !== undefined);
}

function fingerprint(snapshot: PageSnapshot): string {
  const top = snapshot.rows[0]?.tiktokUsername ?? snapshot.liveRows[0]?.tiktokUsername ?? "";
  return `${snapshot.datasetType}|${snapshot.sourcePageUrl}|${rowCount(snapshot)}|${top}`;
}

/**
 * When enabled in Options, asks the background worker to sync after Backstage finishes loading.
 * Phase 1A: still activity_incentive only; validation must pass; not recommended.
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
      if (snapshot.datasetType !== "activity_incentive") return;
      if (!snapshot.validation?.syncSafe) return;
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
      /* ignore */
    }
  };

  const observer = new MutationObserver(() => queue("dom"));
  if (document.documentElement) {
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      queue("url");
    }
  }, 2000);

  queue("init");
}
