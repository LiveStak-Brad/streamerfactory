"use server";

import { revalidatePath, unstable_noStore } from "next/cache";
import { sendApplicationApprovedEmail } from "@/lib/email/application-lifecycle";
import { isTransactionalEmailReady } from "@/lib/email/config";
import { createClient } from "@/lib/supabase/server";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";

const RESENDABLE_MEMBER_ROLES = new Set(["member", "admin", "editor"]);

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

/**
 * Staff: send the same membership-approved transactional email again (Resend).
 * For members already promoted — e.g. they missed the first message or Resend was misconfigured.
 */
export async function resendApprovalEmailAction(
  userId: string,
): Promise<{ ok: boolean; error?: string; sent?: boolean }> {
  unstable_noStore();
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return { ok: false, error: "Unauthorized" };
  }

  if (!isTransactionalEmailReady()) {
    return {
      ok: false,
      error:
        "Email isn’t configured for this deployment yet. Add your sending API key and “from” address in your host’s environment, redeploy, then try again.",
    };
  }

  const supabase = await createClient();

  const { data: profileRow } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  const role = (profileRow?.role ?? "").trim().toLowerCase();
  if (!RESENDABLE_MEMBER_ROLES.has(role)) {
    return {
      ok: false,
      error: "Resend approval email is only available for member, editor, or admin accounts.",
    };
  }

  const [{ data: application }, { data: profileEmail }] = await Promise.all([
    supabase.from("applications").select("email, full_name").eq("user_id", userId).maybeSingle(),
    supabase.from("profiles").select("email").eq("id", userId).maybeSingle(),
  ]);

  const to =
    application?.email?.trim() ||
    profileEmail?.email?.trim() ||
    "";

  if (!to) {
    return { ok: false, error: "No email on file. Add an email to their profile or application record." };
  }

  const sent = await sendApplicationApprovedEmail({
    to,
    fullName: application?.full_name ?? null,
  });

  if (!sent) {
    return {
      ok: false,
      error: "The message could not be sent. Try again later or check with your developer if this keeps happening.",
      sent: false,
    };
  }

  return { ok: true, sent: true };
}
