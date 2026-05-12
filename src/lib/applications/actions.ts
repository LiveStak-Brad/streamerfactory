"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  sendApplicationAdminNotificationEmail,
  sendApplicationRejectedEmail,
  sendApplicationSubmittedEmail,
} from "@/lib/email/application-lifecycle";
import { notifyNewApplication } from "@/lib/applications/notify";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { trackServerEvent } from "@/lib/analytics/server";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";
import type { ApplicationPipelineStatus } from "@/lib/applications/types";

export type ApplicationSubmitState = {
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
        "Please confirm you agree to be contacted about this website access request (email or similar).",
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
  if (!whyJoin) return { error: "Please describe what you need on the site and how we can verify you." };

  const session = await getSessionProfile();
  if (!session?.user) {
    return { error: "Sign in to submit a website access request." };
  }

  const accountEmail = session.user.email?.trim().toLowerCase();
  if (accountEmail && email.toLowerCase() !== accountEmail) {
    return { error: "Email must match the address on your Streamer Factory account." };
  }

  const supabase = await createClient();
  const userId = session.user.id;

  const { data: existing, error: existingErr } = await supabase
    .from("applications")
    .select("id, status")
    .eq("user_id", userId)
    .maybeSingle();

  if (existingErr) {
    return { error: existingErr.message };
  }

  const row = {
    full_name: fullName,
    email,
    tiktok_username: tiktokUsername,
    country,
    follower_range: followerRange,
    goes_live: goesLive,
    why_join: whyJoin,
    contact_consent: true as const,
    user_id: userId,
    status: "submitted" as const,
  };

  if (existing) {
    if (existing.status !== "rejected") {
      return {
        error: "You already submitted a website access request with this account.",
      };
    }
    const { error } = await supabase.from("applications").update(row).eq("id", existing.id);
    if (error) {
      return { error: error.message };
    }
  } else {
    const { error } = await supabase.from("applications").insert(row);
    if (error) {
      if (error.code === "23505") {
        return {
          error: "You already submitted a website access request with this account.",
        };
      }
      return { error: error.message };
    }
  }

  const isResubmit = Boolean(existing && existing.status === "rejected");

  const { data: profileRow } = await supabase.from("profiles").select("timezone").eq("id", userId).maybeSingle();
  const applicantTimezone = profileRow?.timezone?.trim() || null;

  await Promise.allSettled([
    notifyNewApplication({
      fullName,
      email,
      tiktokUsername,
      country,
      goesLive,
    }),
    sendApplicationSubmittedEmail({
      to: email,
      fullName,
      isResubmit,
    }),
    sendApplicationAdminNotificationEmail({
      fullName,
      email,
      tiktokUsername,
      timezone: applicantTimezone,
      isResubmit,
    }),
  ]);

  void trackServerEvent({
    event: isResubmit ? AnalyticsEvents.APPLICATION_RESUBMITTED : AnalyticsEvents.APPLICATION_SUBMITTED,
    route: "/apply",
  });

  revalidatePath("/application-status");
  revalidatePath("/apply");
  revalidatePath("/battle-hub");
  redirect("/application-status");
}

/** Staff can move pipeline for review / rejection; approval is `approve_applicant_member` only. */
const ADMIN_SETTABLE: ApplicationPipelineStatus[] = ["in_review", "rejected"];

export async function setApplicationStatusAction(
  applicationId: string,
  nextStatus: ApplicationPipelineStatus,
): Promise<{ ok: boolean; error?: string }> {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return { ok: false, error: "Unauthorized" };
  }

  if (!ADMIN_SETTABLE.includes(nextStatus)) {
    return { ok: false, error: "Invalid status" };
  }

  const supabase = await createClient();
  const { data: row, error: fetchErr } = await supabase
    .from("applications")
    .select("status, email, full_name, user_id")
    .eq("id", applicationId)
    .maybeSingle();

  if (fetchErr) {
    return { ok: false, error: fetchErr.message };
  }
  if (!row) {
    return { ok: false, error: "Application not found." };
  }

  if (row.status === nextStatus) {
    revalidatePath("/admin/applications");
    revalidatePath("/application-status");
    return { ok: true };
  }

  const { error } = await supabase.from("applications").update({ status: nextStatus }).eq("id", applicationId);

  if (error) {
    return { ok: false, error: error.message };
  }

  if (nextStatus === "rejected" && row.status !== "rejected") {
    const to = row.email?.trim();
    if (to) {
      void sendApplicationRejectedEmail({ to, fullName: row.full_name }).catch(() => {});
    }
    if (row.user_id) {
      void trackServerEvent({
        event: AnalyticsEvents.APPLICATION_REJECTED,
        subjectUserId: row.user_id,
        route: "/admin/applications",
      });
    }
  }

  revalidatePath("/admin/applications");
  revalidatePath("/application-status");
  return { ok: true };
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
  revalidatePath("/application-status");
  revalidatePath("/apply");
  return { ok: true };
}
