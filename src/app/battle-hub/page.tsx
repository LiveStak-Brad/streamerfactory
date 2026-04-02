import { BattleHubLockedGate } from "@/components/battle-hub/BattleHubLockedGate";
import { BattleHubMemberHome } from "@/components/battle-hub/BattleHubMemberHome";
import { BattleHubOwnerPreviewBanner } from "@/components/battle-hub/BattleHubOwnerPreviewBanner";
import { isOwnerRole } from "@/lib/auth/access";
import { effectiveCanUseBattleHubScheduling, getOwnerNetworkViewMode } from "@/lib/auth/network-view";
import { getSessionProfile } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function BattleHubPage() {
  const session = await getSessionProfile();

  if (!session) {
    return <BattleHubLockedGate variant="guest" />;
  }

  const isOwner = session.profile && isOwnerRole(session.profile.role);
  if (isOwner && (await getOwnerNetworkViewMode()) === "visitor") {
    return (
      <>
        <BattleHubOwnerPreviewBanner />
        <BattleHubLockedGate variant="guest" />
      </>
    );
  }

  if (!(await effectiveCanUseBattleHubScheduling(session))) {
    return (
      <BattleHubLockedGate
        variant="pending"
        sessionEmail={session.user.email ?? undefined}
      />
    );
  }

  return <BattleHubMemberHome />;
}
