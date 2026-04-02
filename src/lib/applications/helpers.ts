import type { ApplicationRow } from "./types";

/** True when the user has an application row that is still part of the pipeline (not rejected). */
export function hasActiveNonRejectedApplication(app: ApplicationRow | null): boolean {
  return app != null && app.status !== "rejected";
}
