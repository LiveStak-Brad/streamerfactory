import { BattleHubLockedGate } from "@/components/battle-hub/BattleHubLockedGate";
import { BattleHubMemberHome } from "@/components/battle-hub/BattleHubMemberHome";
import { BattleHubOwnerPreviewBanner } from "@/components/battle-hub/BattleHubOwnerPreviewBanner";
import { hasActiveNonRejectedApplication } from "@/lib/applications/helpers";
import { getMyApplication } from "@/lib/applications/queries";
import { canScheduleBattles, isOwnerRole } from "@/lib/auth/access";
import { effectiveCanUseBattleHubScheduling, getOwnerNetworkViewMode } from "@/lib/auth/network-view";
import { getSessionProfile } from "@/lib/auth/server";
import type { BattleEventWithParticipants } from "@/lib/battle-hub/types";
import {
  countBattlesCreatedBy,
  getMyUpcomingBattleEvents,
  getUpcomingBattleEvents,
} from "@/lib/battle-hub/queries";

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
    let hasActiveApplication = false;
    try {
      const app = await getMyApplication(session.user.id);
      hasActiveApplication = hasActiveNonRejectedApplication(app);
    } catch {
      hasActiveApplication = false;
    }
    return (
      <BattleHubLockedGate
        variant="pending"
        sessionEmail={session.user.email ?? undefined}
        hasActiveApplication={hasActiveApplication}
      />
    );
  }

  const showOnboardingNudge =
    Boolean(session.profile) &&
    canScheduleBattles(session.profile!.role) &&
    !session.profile!.onboarding_completed_at;

  const userId = session.user.id;
  let upcoming: BattleEventWithParticipants[] = [];
  let myUpcoming: BattleEventWithParticipants[] = [];
  let createdBattleCount = 0;
  try {
    [upcoming, myUpcoming, createdBattleCount] = await Promise.all([
      getUpcomingBattleEvents(6),
      getMyUpcomingBattleEvents(userId, 1),
      countBattlesCreatedBy(userId),
    ]);
  } catch (err) {
    console.error("battle-hub home activity fetch", err);
  }

  const nextNetworkEvent = upcoming[0] ?? null;
  const upcomingNetwork = upcoming.slice(1);
  const myNextBattle = myUpcoming[0] ?? null;

  return (
    <BattleHubMemberHome
      showOnboardingNudge={showOnboardingNudge}
      activity={{
        userId,
        nextNetworkEvent,
        upcomingNetwork,
        myNextBattle,
        createdBattleCount,
      }}
    />
  );
}
