/**
 * Creator Home summary: snapshot + today missions + next action + feed signals.
 */

import { createClient } from "@/lib/supabase/server";
import { getActiveSeason } from "@/lib/growth/seasons/service";
import { getCreatorSnapshot } from "@/lib/growth/progress/snapshot";
import { periodKeyForDate } from "@/lib/growth/progress/events";
import { ensureReferralCode } from "@/lib/growth/referrals/service";
import { listTodayMissions } from "@/lib/growth/missions/engine";
import { getOnboardingChecklist } from "@/lib/growth/onboarding/checklist";
import { unreadCount } from "@/lib/growth/notifications/service";
import type {
  CreatorProgressSummary,
  MissionCategory,
  MissionStatus,
  SeasonRow,
} from "@/lib/growth/types";

const CATEGORY_HREF: Record<string, string> = {
  training: "/streameru",
  community: "/guides",
  battles: "/battle-hub",
  profile: "/member/onboarding",
  creator_growth: "/member/dashboard",
  platform: "/member/dashboard",
};

type TodayMissionRow = CreatorProgressSummary["todayMissions"][number];

async function queryTodayMissions(
  memberId: string,
  timezone?: string | null,
): Promise<TodayMissionRow[]> {
  const supabase = await createClient();
  const periodKey = periodKeyForDate(new Date(), timezone);
  const { data } = await supabase
    .from("member_missions")
    .select(
      "id, status, mission_templates!inner(key, title, description, category)",
    )
    .eq("member_id", memberId)
    .eq("period_key", periodKey)
    .order("created_at", { ascending: true });

  return (data ?? []).map((row) => {
    const t = row.mission_templates as unknown as
      | {
          key: string;
          title: string;
          description: string | null;
          category: MissionCategory;
        }
      | Array<{
          key: string;
          title: string;
          description: string | null;
          category: MissionCategory;
        }>;
    const tpl = Array.isArray(t) ? t[0] : t;
    const category = (tpl?.category ?? "platform") as MissionCategory;
    return {
      id: String(row.id),
      key: tpl?.key ?? "",
      title: tpl?.title ?? "Mission",
      description: tpl?.description ?? null,
      category,
      status: row.status as MissionStatus,
      href: CATEGORY_HREF[category] ?? "/member/dashboard",
    };
  });
}

function greetingFromOpts(opts?: {
  displayName?: string;
  email?: string | null;
}): string {
  const name = opts?.displayName?.trim();
  if (name) return name;
  const email = opts?.email?.trim();
  if (email) {
    const local = email.split("@")[0]?.trim();
    if (local) return local;
  }
  return "Creator";
}

function resolveNextAction(input: {
  incompleteOnboarding: Array<{ key: string; title: string; href: string | null }>;
  todayMissions: TodayMissionRow[];
}): CreatorProgressSummary["nextAction"] {
  const task = input.incompleteOnboarding[0];
  if (task) {
    return {
      label: "Continue onboarding",
      href: "/member/onboarding",
      reason: `Next up: ${task.title}.`,
    };
  }

  const mission = input.todayMissions.find(
    (m) => m.status === "active" || m.status === "failed",
  );
  if (mission && mission.status === "active") {
    return {
      label: "Today's mission",
      href: mission.href || CATEGORY_HREF[mission.category] || "/member/dashboard",
      reason: mission.title,
    };
  }

  return {
    label: "Continue training",
    href: "/streameru",
    reason: "Keep building consistency in StreamerU between lives and battles.",
  };
}

export async function getCreatorProgressSummary(
  memberId: string,
  opts?: { displayName?: string; email?: string | null },
): Promise<CreatorProgressSummary> {
  const supabase = await createClient();

  const [{ data: profile }, season, snapshot] = await Promise.all([
    supabase
      .from("profiles")
      .select("timezone, tiktok_username")
      .eq("id", memberId)
      .maybeSingle(),
    getActiveSeason(),
    getCreatorSnapshot(memberId),
  ]);

  const timezone = profile?.timezone ?? null;

  let todayMissions: TodayMissionRow[] = [];
  try {
    const listed = await listTodayMissions(memberId, timezone ?? undefined);
    todayMissions = listed.map((m) => ({
      id: m.id,
      key: m.key,
      title: m.title,
      description: m.description,
      category: m.category,
      status: m.status,
      href: m.href ?? CATEGORY_HREF[m.category] ?? null,
    }));
  } catch {
    todayMissions = await queryTodayMissions(memberId, timezone);
  }

  let incompleteOnboarding: Array<{
    key: string;
    title: string;
    href: string | null;
  }> = [];
  try {
    const checklist = await getOnboardingChecklist(memberId);
    incompleteOnboarding = checklist
      .filter((t) => !t.completed_at)
      .map((t) => ({
        key: t.key,
        title: t.title || "Onboarding task",
        href: t.href ?? "/member/onboarding",
      }));
  } catch {
    incompleteOnboarding = snapshot.onboarding.incomplete_task_keys.map((key) => ({
      key,
      title: "Continue onboarding",
      href: "/member/onboarding",
    }));
  }

  let unreadNotifications = 0;
  try {
    unreadNotifications = await unreadCount(memberId);
  } catch {
    const { count } = await supabase
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("member_id", memberId)
      .is("read_at", null);
    unreadNotifications = count ?? 0;
  }

  const { data: achievementRow } = await supabase
    .from("member_achievements")
    .select(
      "achievement_key, unlocked_at, achievement_definitions!inner(name, description, icon)",
    )
    .eq("member_id", memberId)
    .not("unlocked_at", "is", null)
    .order("unlocked_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let newestAchievement: CreatorProgressSummary["newestAchievement"] = null;
  if (achievementRow?.unlocked_at) {
    const def = achievementRow.achievement_definitions as unknown as
      | { name: string; description: string | null; icon: string | null }
      | Array<{ name: string; description: string | null; icon: string | null }>;
    const d = Array.isArray(def) ? def[0] : def;
    newestAchievement = {
      key: achievementRow.achievement_key,
      name: d?.name ?? achievementRow.achievement_key,
      description: d?.description ?? null,
      icon: d?.icon ?? null,
      unlocked_at: achievementRow.unlocked_at,
    };
  }

  const { data: activityRows } = await supabase
    .from("activity_feed")
    .select("id, summary, event_type, created_at")
    .eq("actor_id", memberId)
    .order("created_at", { ascending: false })
    .limit(12);

  const referralCode =
    snapshot.referrals.code ??
    (await ensureReferralCode(memberId).catch(() => null));

  const displayName =
    opts?.displayName?.trim() ||
    profile?.tiktok_username?.trim() ||
    undefined;

  return {
    greetingName: greetingFromOpts({
      displayName,
      email: opts?.email,
    }),
    season: season as SeasonRow | null,
    snapshot,
    todayMissions,
    newestAchievement,
    nextAction: resolveNextAction({ incompleteOnboarding, todayMissions }),
    unreadNotifications,
    recentActivity: (activityRows ?? []).map((r) => ({
      id: String(r.id),
      summary: String(r.summary),
      event_type: String(r.event_type),
      created_at: String(r.created_at),
    })),
    referralCode,
  };
}
