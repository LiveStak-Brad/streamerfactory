/**
 * In-app notification projection + inbox helpers.
 */

import { createClient } from "@/lib/supabase/server";
import type { ProgressEventRow } from "@/lib/growth/types";

export type NotificationRow = {
  id: string;
  member_id: string;
  type: string;
  title: string;
  body: string | null;
  href: string | null;
  metadata: Record<string, unknown>;
  read_at: string | null;
  progress_event_id: string | null;
  created_at: string;
};

const NOTIFY_TYPES = new Set([
  "mission_completed",
  "achievement_unlocked",
  "onboarding_completed",
  "title_unlocked",
  "certificate_issued",
  "graduated",
  "creator_rank_up",
  "mentor_eligible",
  "manager_eligible",
]);

function notificationContent(event: ProgressEventRow): {
  title: string;
  body: string | null;
  href: string | null;
} | null {
  const meta = event.metadata ?? {};
  switch (event.event_type) {
    case "mission_completed": {
      const name =
        (typeof meta.title === "string" && meta.title) ||
        event.subject_key ||
        "Daily mission";
      const xp = typeof meta.xp === "number" && meta.xp > 0 ? ` (+${meta.xp} XP)` : "";
      return {
        title: "Mission complete",
        body: `You completed: ${name}${xp}`,
        href: "/member/progress",
      };
    }
    case "achievement_unlocked": {
      const name =
        (typeof meta.name === "string" && meta.name) ||
        event.subject_key ||
        "Achievement";
      return {
        title: "Achievement unlocked",
        body: name,
        href: "/member/progress",
      };
    }
    case "onboarding_completed":
      return {
        title: "Onboarding complete",
        body: "Welcome to the Factory — you're ready to grow.",
        href: "/member/dashboard",
      };
    case "title_unlocked": {
      const name =
        (typeof meta.name === "string" && meta.name) ||
        event.subject_key ||
        "Title";
      return {
        title: "Title unlocked",
        body: `You earned: ${name}`,
        href: "/member/progress",
      };
    }
    case "certificate_issued": {
      const name =
        (typeof meta.name === "string" && meta.name) ||
        event.subject_key ||
        "Certificate";
      return {
        title: "Certificate earned",
        body: name,
        href: "/member/progress#certificates",
      };
    }
    case "graduated":
      return {
        title: "Graduation unlocked",
        body: "You finished StreamerU — your ceremony is ready.",
        href: "/member/progress#graduation",
      };
    case "creator_rank_up": {
      const name =
        (typeof meta.tier_name === "string" && meta.tier_name) ||
        event.subject_key ||
        "new rank";
      return {
        title: "Creator Rank up",
        body: `You reached ${name}`,
        href: "/member/progress",
      };
    }
    case "mentor_eligible":
      return {
        title: "Mentor eligibility unlocked",
        body: "You meet the bar — staff approval is still required before you mentor.",
        href: "/member/progress#career",
      };
    case "manager_eligible":
      return {
        title: "Manager eligibility unlocked",
        body: "You meet the bar for consideration — manager is a staff appointment.",
        href: "/member/progress#career",
      };
    default:
      return null;
  }
}

export async function projectNotificationFromEvent(
  event: ProgressEventRow,
): Promise<void> {
  if (!NOTIFY_TYPES.has(event.event_type)) return;

  const content = notificationContent(event);
  if (!content) return;

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("notifications")
    .select("id")
    .eq("progress_event_id", event.id)
    .eq("type", event.event_type)
    .maybeSingle();
  if (existing) return;

  await supabase.from("notifications").insert({
    member_id: event.member_id,
    type: event.event_type,
    title: content.title,
    body: content.body,
    href: content.href,
    metadata: event.metadata ?? {},
    progress_event_id: event.id,
    created_at: event.created_at,
  });
}

export async function listNotifications(
  memberId: string,
  opts?: { limit?: number },
): Promise<NotificationRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("notifications")
    .select(
      "id, member_id, type, title, body, href, metadata, read_at, progress_event_id, created_at",
    )
    .eq("member_id", memberId)
    .order("created_at", { ascending: false })
    .limit(opts?.limit ?? 50);

  return (data ?? []).map((r) => ({
    id: r.id,
    member_id: r.member_id,
    type: r.type,
    title: r.title,
    body: r.body ?? null,
    href: r.href ?? null,
    metadata: (r.metadata as Record<string, unknown>) ?? {},
    read_at: r.read_at ?? null,
    progress_event_id: r.progress_event_id ?? null,
    created_at: r.created_at,
  }));
}

export async function markNotificationRead(
  memberId: string,
  id: string,
): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("member_id", memberId)
    .eq("id", id)
    .is("read_at", null)
    .select("id")
    .maybeSingle();
  return Boolean(data);
}

export async function unreadCount(memberId: string): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("member_id", memberId)
    .is("read_at", null);
  return count ?? 0;
}
