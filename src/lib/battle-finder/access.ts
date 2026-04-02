import { hasActiveNonRejectedApplication } from "@/lib/applications/helpers";
import { getMyApplication } from "@/lib/applications/queries";
import { isOwnerRole } from "@/lib/auth/access";
import { effectiveCanUseBattleHubScheduling, getOwnerNetworkViewMode } from "@/lib/auth/network-view";
import { getSessionProfile } from "@/lib/auth/server";

export type BattleFinderAccessDenied = {
  allowed: false;
  variant: "guest" | "pending" | "owner_visitor";
  sessionEmail?: string;
  hasActiveApplication?: boolean;
};

export type BattleFinderAccessOk = {
  allowed: true;
  session: NonNullable<Awaited<ReturnType<typeof getSessionProfile>>>;
};

export type BattleFinderAccess = BattleFinderAccessDenied | BattleFinderAccessOk;

/**
 * Same rules as Battle Hub member tools: members with scheduling access only.
 * Owners in visitor network view see the public-style locked finder.
 */
export async function getBattleFinderAccess(): Promise<BattleFinderAccess> {
  const session = await getSessionProfile();
  if (!session) {
    return { allowed: false, variant: "guest" };
  }

  const isOwner = session.profile && isOwnerRole(session.profile.role);
  if (isOwner && (await getOwnerNetworkViewMode()) === "visitor") {
    return { allowed: false, variant: "owner_visitor" };
  }

  if (!(await effectiveCanUseBattleHubScheduling(session))) {
    let hasActiveApplication = false;
    try {
      const app = await getMyApplication(session.user.id);
      hasActiveApplication = hasActiveNonRejectedApplication(app);
    } catch {
      hasActiveApplication = false;
    }
    return {
      allowed: false,
      variant: "pending",
      sessionEmail: session.user.email ?? undefined,
      hasActiveApplication,
    };
  }

  return { allowed: true, session };
}
