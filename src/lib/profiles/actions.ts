"use server";

import { revalidatePath } from "next/cache";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { trackServerEvent } from "@/lib/analytics/server";
import { sendApplicationApprovedEmail } from "@/lib/email/application-lifecycle";
import { createClient } from "@/lib/supabase/server";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";

export async function approveMemberAction(userId: string): Promise<{ ok: boolean; error?: string }> {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return { ok: false, error: "Unauthorized" };
  }

  const supabase = await createClient();

  // Load contact info before RPC so we always have application + profile email even if reads differ post-update.
  const [{ data: application }, { data: profileBefore }] = await Promise.all([
    supabase.from("applications").select("email, full_name").eq("user_id", userId).maybeSingle(),
    supabase.from("profiles").select("email").eq("id", userId).maybeSingle(),
  ]);

  const to =
    application?.email?.trim() ||
    profileBefore?.email?.trim() ||
    "";

  const { error } = await supabase.rpc("approve_applicant_member", { p_user_id: userId });

  if (error) {
    return { ok: false, error: error.message };
  }

  void trackServerEvent({
    event: AnalyticsEvents.APPLICATION_APPROVED,
    subjectUserId: userId,
    route: "/admin/members",
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

  revalidatePath("/admin/members");
  revalidatePath("/admin");
  revalidatePath("/admin/applications");
  revalidatePath("/battle-hub");
  revalidatePath("/welcome");
  revalidatePath("/application-status");
  return { ok: true };
}
