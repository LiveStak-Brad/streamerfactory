/** Off by default — rankings update only when staff click Sync in the popup. */
export const AUTO_SYNC_STORAGE_KEY = "autoSyncOnBackstage";

export const AUTO_SYNC_MIN_INTERVAL_MS = 5 * 60 * 1000;

export async function isAutoSyncEnabled(): Promise<boolean> {
  const stored = await chrome.storage.sync.get([AUTO_SYNC_STORAGE_KEY]);
  return stored[AUTO_SYNC_STORAGE_KEY] === true;
}

export async function setAutoSyncEnabled(enabled: boolean): Promise<void> {
  await chrome.storage.sync.set({ [AUTO_SYNC_STORAGE_KEY]: enabled });
}
