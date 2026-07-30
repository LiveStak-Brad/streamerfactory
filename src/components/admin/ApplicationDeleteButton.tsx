"use client";

import { deleteApplicationAction } from "@/lib/applications/actions";
import { AdminConfirmAction } from "@/components/admin/ui/AdminConfirmAction";

export function ApplicationDeleteButton({ applicationId }: { applicationId: string }) {
  return (
    <AdminConfirmAction
      label="Remove from list"
      pendingLabel="Removing…"
      confirmMessage="Remove this application from the list? This cannot be undone."
      onConfirm={async () => deleteApplicationAction(applicationId)}
    />
  );
}
