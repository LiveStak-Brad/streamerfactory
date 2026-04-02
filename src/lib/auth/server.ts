import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canAccessAdmin, canScheduleBattles } from "./access";
import { effectiveCanUseBattleHubScheduling } from "./network-view";

export type Profile = {
  id: string;
  role: string;
  email: string | null;
  tiktok_username: string | null;
  timezone: string | null;
  onboarding_resources_ack_at: string | null;
  onboarding_calendar_ack_at: string | null;
  onboarding_completed_at: string | null;
};

/**
 * Current session user + profile row, or null if signed out / missing profile.
 */
export async function getSessionProfile(): Promise<{
  user: { id: string; email?: string | null };
  profile: Profile | null;
} | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "id, role, email, tiktok_username, timezone, onboarding_resources_ack_at, onboarding_calendar_ack_at, onboarding_completed_at",
    )
    .eq("id", user.id)
    .maybeSingle();

  return {
    user: { id: user.id, email: user.email },
    profile: profile ?? null,
  };
}

/**
 * Use in Server Components / layouts under `/admin`. Redirects if not allowed.
 * Wrapped in `cache` so layout + page share one read per request.
 */
export const requireAdmin = cache(async () => {
  const session = await getSessionProfile();
  if (!session) {
    redirect("/login?next=/admin");
  }
  if (!session.profile || !canAccessAdmin(session.profile.role)) {
    redirect("/");
  }
  return session;
});

/**
 * Logged-in users with a member/editor/owner profile can use Battle Hub scheduler.
 * Others are redirected (e.g. to login or hub).
 */
/**
 * Network members (owner, editor, member, admin) only. Applicants and guests redirected.
 */
export const requireNetworkMember = cache(async () => {
  const session = await getSessionProfile();
  if (!session) {
    redirect("/login?next=/welcome");
  }
  if (!session.profile) {
    redirect("/apply");
  }
  if (!canScheduleBattles(session.profile.role)) {
    redirect("/application-status");
  }
  return session;
});

export const requireBattleScheduler = cache(async (nextPath = "/battle-hub/scheduler") => {
  const session = await getSessionProfile();
  if (!session) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  if (!session.profile) {
    redirect("/apply");
  }
  if (!(await effectiveCanUseBattleHubScheduling(session))) {
    if (session.profile.role === "applicant") {
      redirect("/application-status");
    }
    redirect("/battle-hub");
  }
  return session;
});
