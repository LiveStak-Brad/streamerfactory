import Link from "next/link";

/** Shown when site owner is in visitor network view (same Battle Hub as logged-out users). */
export function BattleHubOwnerPreviewBanner() {
  return (
    <div className="border-b border-amber-200/90 bg-amber-50 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/40">
      <p className="text-center text-sm font-medium text-amber-950 dark:text-amber-100">
        <span className="font-bold">Visitor view</span> — you are browsing as a non-member. Use the{" "}
        <span className="font-semibold">Visitor / Member</span> switch in the header to compare, or open{" "}
        <Link
          href="/battle-hub/scheduler"
          className="font-semibold underline underline-offset-2 hover:text-amber-900 dark:hover:text-amber-50"
        >
          Scheduler
        </Link>
        ,{" "}
        <Link
          href="/battle-hub/calendar"
          className="font-semibold underline underline-offset-2 hover:text-amber-900 dark:hover:text-amber-50"
        >
          Calendar
        </Link>
        , or{" "}
        <Link
          href="/admin"
          className="font-semibold underline underline-offset-2 hover:text-amber-900 dark:hover:text-amber-50"
        >
          Admin
        </Link>{" "}
        while in member view.
      </p>
    </div>
  );
}
