"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";

export async function approveMemberAction(userId: string): Promise<{ ok: boolean; error?: string }> {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return { ok: false, error: "Unauthorized" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ role: "member", updated_at: new Date().toISOString() })
    .eq("id", userId)
    .eq("role", "applicant");

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/admin/members");
  revalidatePath("/admin");
  return { ok: true };
}
