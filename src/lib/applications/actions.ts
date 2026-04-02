"use server";

import { revalidatePath } from "next/cache";
import { notifyNewApplication } from "@/lib/applications/notify";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";

export type ApplicationSubmitState = {
  success?: boolean;
  error?: string;
};

const MAX_WHY = 8000;

function trim(s: unknown, max: number): string {
  const t = String(s ?? "").trim();
  return t.length > max ? t.slice(0, max) : t;
}

function isValidEmail(raw: string): boolean {
  const s = raw.trim();
  if (s.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

const FOLLOWER_VALUES = new Set([
  "under-1k",
  "1k-10k",
  "10k-50k",
  "50k-100k",
  "100k-plus",
]);

export async function submitApplication(
  _prev: ApplicationSubmitState,
  formData: FormData,
): Promise<ApplicationSubmitState> {
  const contactConsent = formData.get("contactConsent") === "on";
  if (!contactConsent) {
    return {
      error:
        "Please confirm you agree to be contacted about your application (email or similar).",
    };
  }

  const fullName = trim(formData.get("fullName"), 200);
  const email = trim(formData.get("email"), 254);
  const tiktokUsername = trim(formData.get("tiktokUsername"), 120);
  const country = trim(formData.get("country"), 120);
  const followerRange = trim(formData.get("followerCount"), 40);
  const goesLive = trim(formData.get("goesLive"), 8);
  const whyJoin = trim(formData.get("whyJoin"), MAX_WHY);

  if (!fullName) return { error: "Full name is required." };
  if (!email || !isValidEmail(email)) return { error: "A valid email is required." };
  if (!tiktokUsername) return { error: "TikTok username is required." };
  if (!country) return { error: "Country is required." };
  if (!FOLLOWER_VALUES.has(followerRange)) return { error: "Please select a follower range." };
  if (goesLive !== "yes" && goesLive !== "no") return { error: "Please answer whether you go live on TikTok." };
  if (!whyJoin) return { error: "Please tell us why you want to join." };

  const session = await getSessionProfile();
  if (!session?.user) {
    return { error: "Sign in to submit an application." };
  }

  const accountEmail = session.user.email?.trim().toLowerCase();
  if (accountEmail && email.toLowerCase() !== accountEmail) {
    return { error: "Email must match the address on your Streamer Factory account." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("applications").insert({
    full_name: fullName,
    email,
    tiktok_username: tiktokUsername,
    country,
    follower_range: followerRange,
    goes_live: goesLive,
    why_join: whyJoin,
    contact_consent: true,
    user_id: session.user.id,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        error: "You already submitted an application with this account.",
      };
    }
    return { error: error.message };
  }

  await notifyNewApplication({
    fullName,
    email,
    tiktokUsername,
    country,
    goesLive,
  });

  return { success: true };
}

export async function deleteApplicationAction(
  applicationId: string,
): Promise<{ ok: boolean; error?: string }> {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return { ok: false, error: "Unauthorized" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("applications").delete().eq("id", applicationId);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/admin/applications");
  revalidatePath("/admin");
  return { ok: true };
}
