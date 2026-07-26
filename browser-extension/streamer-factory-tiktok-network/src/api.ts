import type { SyncPayload } from "./parser/types";
import { requestStreamerFactoryApi } from "./sfFetch";

export type MeResponse = {
  authenticated: boolean;
  profileId?: string;
  role?: string;
  canImportTikTokNetworkStats?: boolean;
};

export type ImportResponse = {
  batchId?: string;
  acceptedRows?: number;
  rejectedRows?: number;
  matchedProfiles?: number;
  lowConfidenceMatches?: number;
  unmatchedUsernames?: string[];
  liveRowsAccepted?: number;
  performanceStatsWarning?: string;
  siteUpdated?: boolean;
  rankingsPath?: string;
  error?: string;
};

export async function fetchMe(): Promise<MeResponse> {
  return requestStreamerFactoryApi<MeResponse>("/api/extension/me");
}

export async function postImport(payload: SyncPayload): Promise<ImportResponse> {
  return requestStreamerFactoryApi<ImportResponse>("/api/extension/tiktok-network/import", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function postClearLiveSnapshots(): Promise<{ deleted: number; membersPath?: string }> {
  return requestStreamerFactoryApi<{ deleted: number; membersPath?: string }>(
    "/api/extension/tiktok-network/clear-live",
    { method: "POST", body: "{}" },
  );
}
