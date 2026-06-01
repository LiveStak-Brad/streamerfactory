import { fetchMe, postImport } from "./api";
import { AUTO_SYNC_MIN_INTERVAL_MS, isAutoSyncEnabled } from "./autoSyncSettings";
import type { SyncPayload } from "./parser/types";

type AutoSyncPayload = SyncPayload & { sourcePageUrl?: string };

function syncFingerprint(payload: AutoSyncPayload): string {
  const rows = payload.rows?.length ?? 0;
  const live = payload.liveRows?.length ?? 0;
  const first = payload.rows?.[0]?.tiktokUsername ?? payload.liveRows?.[0]?.tiktokUsername ?? "";
  return `${payload.detectedPageType}|${payload.sourcePageUrl ?? ""}|${rows}|${live}|${first}`;
}

export async function handleAutoSyncRequest(
  payload: AutoSyncPayload,
  reason: string,
): Promise<{ ok: boolean; skipped?: string; result?: unknown }> {
  if (!(await isAutoSyncEnabled())) {
    return { ok: true, skipped: "disabled" };
  }

  const me = await fetchMe();
  if (!me.authenticated || !me.canImportTikTokNetworkStats) {
    return { ok: true, skipped: "not_staff" };
  }

  const fp = syncFingerprint(payload);
  const stored = await chrome.storage.local.get(["lastAutoSyncAt", "lastAutoSyncFingerprint"]);
  const lastAt = typeof stored.lastAutoSyncAt === "number" ? stored.lastAutoSyncAt : 0;
  const lastFp = typeof stored.lastAutoSyncFingerprint === "string" ? stored.lastAutoSyncFingerprint : "";

  if (lastFp === fp && Date.now() - lastAt < AUTO_SYNC_MIN_INTERVAL_MS) {
    return { ok: true, skipped: "throttled" };
  }

  const result = await postImport(payload);
  await chrome.storage.local.set({
    lastAutoSyncAt: Date.now(),
    lastAutoSyncFingerprint: fp,
    lastAutoSyncResult: {
      at: new Date().toISOString(),
      reason,
      acceptedRows: result.acceptedRows ?? result.liveRowsAccepted ?? 0,
      siteUpdated: result.siteUpdated === true,
    },
  });

  try {
    await chrome.action.setBadgeBackgroundColor({ color: "#059669" });
    await chrome.action.setBadgeText({ text: "✓" });
    setTimeout(() => {
      void chrome.action.setBadgeText({ text: "" });
    }, 8000);
  } catch {
    /* ignore */
  }

  return { ok: true, result };
}
