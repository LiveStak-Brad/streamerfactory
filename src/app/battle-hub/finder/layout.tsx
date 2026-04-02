import { BattleHubOwnerPreviewBanner } from "@/components/battle-hub/BattleHubOwnerPreviewBanner";
import { BattleFinderLockedGate } from "@/components/battle-finder/BattleFinderLockedGate";
import { getBattleFinderAccess } from "@/lib/battle-finder/access";

export const dynamic = "force-dynamic";

export default async function BattleFinderLayout({ children }: { children: React.ReactNode }) {
  const access = await getBattleFinderAccess();

  if (!access.allowed) {
    const v = access.variant;
    return (
      <>
        {v === "owner_visitor" ? <BattleHubOwnerPreviewBanner /> : null}
        <BattleFinderLockedGate
          variant={v === "pending" ? "pending" : "guest"}
          sessionEmail={v === "pending" ? access.sessionEmail : undefined}
          hasActiveApplication={v === "pending" ? access.hasActiveApplication : false}
        />
      </>
    );
  }

  return <>{children}</>;
}
