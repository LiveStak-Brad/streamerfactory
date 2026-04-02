"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

  revalidatePath("/welcome");
  revalidatePath("/battle-hub");
  redirect("/battle-hub");
}
