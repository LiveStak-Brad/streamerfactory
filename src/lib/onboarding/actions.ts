"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { trackServerEvent } from "@/lib/analytics/server";
import { createClient } from "@/lib/supabase/server";
import { canScheduleBattles } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";

export type OnboardingSaveState = { ok?: boolean; error?: string };

export async function saveOnboardingProfileAction(
  _prev: OnboardingSaveState,
  formData: FormData,
): Promise<OnboardingSaveState> {
  const session = await getSessionProfile();
  if (!session?.profile || !canScheduleBattles(session.profile.role)) {
    return { error: "Unauthorized" };
  }

  const tiktok = String(formData.get("tiktok_username") ?? "").trim().replace(/^@+/, "");
  const timezone = String(formData.get("timezone") ?? "").trim();

  const supabase = await createClient();
  const { data: before } = await supabase
    .from("profiles")
    .select("tiktok_username, timezone")
    .eq("id", session.user.id)
    .maybeSingle();

  const { error } = await supabase.rpc("update_my_onboarding", {
    p_tiktok_username: tiktok,
    p_timezone: timezone,
    p_ack_resources: false,
    p_ack_calendar: false,
    p_mark_complete: false,
  });

  if (error) {
    return { error: error.message };
  }

  const normHandle = (s: string | null | undefined) => String(s ?? "").trim().replace(/^@+/, "");
  if (tiktok && normHandle(before?.tiktok_username) !== tiktok) {
    void trackServerEvent({ event: AnalyticsEvents.TIKTOK_USERNAME_SET, route: "/welcome" });
  }
  if (timezone && (before?.timezone?.trim() ?? "") !== timezone) {
    void trackServerEvent({ event: AnalyticsEvents.TIMEZONE_SET, route: "/welcome" });
  }

  revalidatePath("/welcome");
  revalidatePath("/battle-hub");
  return { ok: true };
}

export async function acknowledgeResourcesStepAction(): Promise<OnboardingSaveState> {
  const session = await getSessionProfile();
  if (!session?.profile || !canScheduleBattles(session.profile.role)) {
    return { error: "Unauthorized" };
  }

  const supabase = await createClient();
  const { data: before } = await supabase
    .from("profiles")
    .select("onboarding_resources_ack_at")
    .eq("id", session.user.id)
    .maybeSingle();

  const { error } = await supabase.rpc("update_my_onboarding", {
    p_tiktok_username: null,
    p_timezone: null,
    p_ack_resources: true,
    p_ack_calendar: false,
    p_mark_complete: false,
  });

  if (error) {
    return { error: error.message };
  }

  if (!before?.onboarding_resources_ack_at) {
    void trackServerEvent({ event: AnalyticsEvents.START_HERE_OPENED, route: "/welcome" });
  }

  revalidatePath("/welcome");
  return { ok: true };
}

export async function acknowledgeCalendarStepAction(): Promise<OnboardingSaveState> {
  const session = await getSessionProfile();
  if (!session?.profile || !canScheduleBattles(session.profile.role)) {
    return { error: "Unauthorized" };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("update_my_onboarding", {
    p_tiktok_username: null,
    p_timezone: null,
    p_ack_resources: false,
    p_ack_calendar: true,
    p_mark_complete: false,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/welcome");
  return { ok: true };
}

export async function completeOnboardingAction(): Promise<OnboardingSaveState> {
  const session = await getSessionProfile();
  if (!session?.profile || !canScheduleBattles(session.profile.role)) {
    return { error: "Unauthorized" };
  }

  const supabase = await createClient();
  const { data: before } = await supabase
    .from("profiles")
    .select("onboarding_completed_at")
    .eq("id", session.user.id)
    .maybeSingle();

  if (before?.onboarding_completed_at) {
    revalidatePath("/welcome");
    revalidatePath("/battle-hub");
    redirect("/battle-hub");
  }

  const { error } = await supabase.rpc("update_my_onboarding", {
    p_tiktok_username: null,
    p_timezone: null,
    p_ack_resources: false,
    p_ack_calendar: false,
    p_mark_complete: true,
  });

  if (error) {
    return { error: error.message };
  }

  void trackServerEvent({ event: AnalyticsEvents.ONBOARDING_COMPLETED, route: "/welcome" });

  revalidatePath("/welcome");
  revalidatePath("/battle-hub");
  redirect("/battle-hub");
}
