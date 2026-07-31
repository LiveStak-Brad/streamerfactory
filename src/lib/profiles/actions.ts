"use server";

import { revalidatePath } from "next/cache";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { trackServerEvent } from "@/lib/analytics/server";
import { sendApplicationApprovedEmail } from "@/lib/email/application-lifecycle";
import { createClient } from "@/lib/supabase/server";
import { canAccessAdmin, canScheduleBattles } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";

function revalidateAfterApproval() {
  revalidatePath("/admin/members");
  revalidatePath("/admin");
  revalidatePath("/admin/applications");
  revalidatePath("/battle-hub");
  revalidatePath("/streameru");
  revalidatePath("/application-status");
}

/**
 * Promote applicant → member (RPC) and mark application approved.
 * If the account is already a network member but the application row is still
 * open, sync pipeline status so Applications and Members stay aligned.
 */
export async function approveMemberAction(userId: string): Promise<{ ok: boolean; error?: string }> {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return { ok: false, error: "Unauthorized" };
  }

  const supabase = await createClient();

  // Load contact info before RPC so we always have application + profile email even if reads differ post-update.
  const [{ data: application }, { data: profileBefore }] = await Promise.all([
    supabase
      .from("applications")
      .select("email, full_name, status")
      .eq("user_id", userId)
      .maybeSingle(),
    supabase.from("profiles").select("email, role").eq("id", userId).maybeSingle(),
  ]);

  if (!profileBefore) {
    return { ok: false, error: "No linked account found for this application." };
  }

  const to =
    application?.email?.trim() ||
    profileBefore.email?.trim() ||
    "";

  const alreadyMember = canScheduleBattles(profileBefore.role);

  if (alreadyMember) {
    if (application && application.status !== "approved") {
      const { error: syncErr } = await supabase
        .from("applications")
        .update({ status: "approved" })
        .eq("user_id", userId);
      if (syncErr) {
        return { ok: false, error: syncErr.message };
      }
    }
    revalidateAfterApproval();
    return { ok: true };
  }

  const { error } = await supabase.rpc("approve_applicant_member", { p_user_id: userId });

  if (error) {
    return { ok: false, error: error.message };
  }

  void trackServerEvent({
    event: AnalyticsEvents.APPLICATION_APPROVED,
    subjectUserId: userId,
    route: "/admin/applications",
  });

  if (to) {
    const sent = await sendApplicationApprovedEmail({
      to,
      fullName: application?.full_name ?? null,
    });
    if (!sent) {
      console.error(
        "[approveMemberAction] Membership approved but approval email was not sent (check RESEND_* env). userId=",
        userId,
      );
    }
  } else {
    console.warn(
      "[approveMemberAction] Approved member but no email on application or profile; user must rely on in-app status. userId=",
      userId,
    );
  }

  revalidateAfterApproval();
  return { ok: true };
}
