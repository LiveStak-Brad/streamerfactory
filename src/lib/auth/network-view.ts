import { cookies } from "next/headers";
import { canScheduleBattles, isOwnerRole, type SessionLike } from "./access";

const COOKIE_NAME = "sf_network_view";

export type OwnerNetworkViewMode = "member" | "visitor";

/** Persisted choice for site owners: preview the app as a network member or as a visitor (default visitor). */
export async function getOwnerNetworkViewMode(): Promise<OwnerNetworkViewMode> {
  const store = await cookies();
  const v = store.get(COOKIE_NAME)?.value;
  if (v === "member") return "member";
  return "visitor";
}

/**
 * Whether the session can use live Battle Hub tools (scheduler, calendar data, new battle wizard).
 * Site owners respect the network view cookie: visitor = previews only, member = full tools.
 */
export async function effectiveCanUseBattleHubScheduling(session: SessionLike): Promise<boolean> {
  if (!session?.profile) return false;
  const role = session.profile.role;
  if (!canScheduleBattles(role)) return false;
  if (isOwnerRole(role)) {
    return (await getOwnerNetworkViewMode()) === "member";
  }
  return true;
}
