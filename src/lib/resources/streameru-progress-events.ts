/**
 * Same-tab progress refresh for StreamerU sidebar (localStorage does not fire `storage` in the same tab).
 */
export const STREAMERU_PROGRESS_EVENT = "sf-streameru-progress";

export function dispatchStreamerUProgressUpdate(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(STREAMERU_PROGRESS_EVENT));
}
