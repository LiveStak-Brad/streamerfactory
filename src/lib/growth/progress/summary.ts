/**
 * Creator Home summary: snapshot + missions + XP/career + next action + feed.
 */

import { createClient } from "@/lib/supabase/server";
import { getActiveSeason } from "@/lib/growth/seasons/service";
import { getCreatorSnapshot } from "@/lib/growth/progress/snapshot";
import { periodKeyForDate } from "@/lib/growth/progress/events";
import { ensureReferralCode } from "@/lib/growth/referrals/service";
import {
  listTodayMissions,
  listWeekChallenges,
} from "@/lib/growth/missions/engine";
import { getOnboardingChecklist } from "@/lib/growth/onboarding/checklist";
import { unreadCount } from "@/lib/growth/notifications/service";
import {
  listMemberCertificates,
  getGraduationState,
} from "@/lib/growth/certificates/engine";
import {
  buildCareerSummary,
  buildDailyLoginReasons,
  buildSemesterSummary,
  buildXpSummary,
  mergeCompletedSlugs,
} from "@/lib/growth/progress/engagement-summary";
import type {
  CreatorProgressSummary,
  EngagementMissionSummary,
  MissionCategory,
  MissionStatus,
  SeasonRow,
} from "@/lib/growth/types";

const CATEGORY_HREF: Record<string, string> = {
  training: "/streameru",
  community: "/guides",
  battles: "/battle-hub",
  profile: "/member/onboarding",
  creator_growth: "/member/progress",
  platform: "/member/progress",
};

function mapMission(m: {
  id: string;
  key: string;
  title: string;
  description: string | null;
  category: MissionCategory;
  status: MissionStatus;
  href: string | null;
  xpReward?: number;
}): EngagementMissionSummary {
  return {
    id: m.id,
    key: m.key,
    title: m.title,
    description: m.description,
    category: m.category,
    status: m.status,
    href: m.href ?? CATEGORY_HREF[m.category] ?? "/member/dashboard",
    xpReward: m.xpReward,
  };
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
  todayMissions: EngagementMissionSummary[];
  weeklyChallenges: EngagementMissionSummary[];
  loginReasons: CreatorProgressSummary["dailyLoginReasons"];
  graduation: CreatorProgressSummary["graduation"];
}): CreatorProgressSummary["nextAction"] {
  if (input.graduation.status === "eligible") {
    return {
      label: "Celebrate graduation",
      href: "/member/progress#graduation",
      reason: "You finished StreamerU — your ceremony is waiting.",
    };
  }

  const task = input.incompleteOnboarding[0];
  if (task) {
    return {
      label: "Continue onboarding",
      href: "/member/onboarding",
      reason: `Next up: ${task.title}.`,
    };
  }

  const mission = input.todayMissions.find((m) => m.status === "active");
  if (mission) {
    return {
      label: "Claim today's Factory XP",
      href: mission.href || CATEGORY_HREF[mission.category] || "/member/dashboard",
      reason: mission.title,
    };
  }

  const weekly = input.weeklyChallenges.find((m) => m.status === "active");
  if (weekly) {
    return {
      label: "Weekly challenge",
      href: "/member/progress",
      reason: weekly.title,
    };
  }

  const reason = input.loginReasons[0];
  if (reason) {
    return {
      label: reason.label,
      href: reason.href,
      reason: reason.detail,
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

  let todayMissions: EngagementMissionSummary[] = [];
  let weeklyChallenges: EngagementMissionSummary[] = [];
  try {
    const [daily, weekly] = await Promise.all([
      listTodayMissions(memberId, timezone ?? undefined),
      listWeekChallenges(memberId, timezone ?? undefined),
    ]);
    todayMissions = daily.map((m) =>
      mapMission({
        ...m,
        href: m.href ?? CATEGORY_HREF[m.category] ?? null,
      }),
    );
    weeklyChallenges = weekly.map((m) =>
      mapMission({
        ...m,
        href: m.href ?? CATEGORY_HREF[m.category] ?? null,
      }),
    );
  } catch {
    const periodKey = periodKeyForDate(new Date(), timezone);
    const { data } = await supabase
      .from("member_missions")
      .select(
        "id, status, mission_templates!inner(key, title, description, category, reputation_points)",
      )
      .eq("member_id", memberId)
      .eq("period_key", periodKey);
    todayMissions = (data ?? []).map((row) => {
      const t = row.mission_templates as unknown as
        | {
            key: string;
            title: string;
            description: string | null;
            category: MissionCategory;
            reputation_points?: number;
          }
        | Array<{
            key: string;
            title: string;
            description: string | null;
            category: MissionCategory;
            reputation_points?: number;
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
        xpReward: tpl?.reputation_points ?? 0,
      };
    });
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

  const completedLessonSlugs = mergeCompletedSlugs(
    snapshot.lessons_completed,
    // StreamerU dual-write may only land in completions table; snapshot lessons
    // come from lesson_completed events. Prefer union via recent events in snapshot.
    snapshot.recent_events
      .filter((e) => e.type === "streameru_live_mission_completed" && e.subject_key)
      .map((e) => e.subject_key as string),
  );

  // Prefer authoritative streameru completions when available
  const { data: streameruRows } = await supabase
    .from("streameru_mission_completions")
    .select("lesson_slug")
    .eq("member_id", memberId);
  const slugs = mergeCompletedSlugs(
    completedLessonSlugs,
    (streameruRows ?? []).map((r) => r.lesson_slug as string),
  );

  // Certificate / graduation tables may be absent until engagement migration.
  let certificates: CreatorProgressSummary["certificates"] = [];
  let graduation: CreatorProgressSummary["graduation"] = {
    status: "locked",
    eligibleAt: null,
    celebratedAt: null,
  };
  try {
    const [certs, graduationState] = await Promise.all([
      listMemberCertificates(memberId),
      getGraduationState(memberId),
    ]);
    certificates = certs;
    if (graduationState) {
      graduation = {
        status: graduationState.status,
        eligibleAt: graduationState.eligibleAt,
        celebratedAt: graduationState.celebratedAt,
      };
    }
  } catch {
    certificates = [];
    graduation = { status: "locked", eligibleAt: null, celebratedAt: null };
  }

  const xp = buildXpSummary(snapshot);
  let career: CreatorProgressSummary["career"];
  let semesters: CreatorProgressSummary["semesters"];
  let dailyLoginReasons: CreatorProgressSummary["dailyLoginReasons"];
  try {
    career = buildCareerSummary(
      snapshot,
      slugs,
      graduation.status !== "locked",
    );
    semesters = buildSemesterSummary(slugs);
    dailyLoginReasons = buildDailyLoginReasons({
      xp,
      streaks: snapshot.streaks,
      todayMissions,
      weeklyChallenges,
      career,
      semesters,
      graduation,
    });
  } catch {
    career = {
      stageKey: "recruit",
      stageName: "Recruit",
      nextStageName: "Creator",
      percent: 0,
      mentorEligible: false,
      managerEligible: false,
      mentorAppointed: false,
      managerAppointed: false,
      mentorMissing: [],
      managerMissing: [],
    };
    semesters = [];
    dailyLoginReasons = [
      {
        label: "Check in for Factory XP",
        detail: "Daily missions and streaks unlock as Growth finishes loading.",
        href: "/member/dashboard",
      },
    ];
  }

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
    weeklyChallenges,
    newestAchievement,
    nextAction: resolveNextAction({
      incompleteOnboarding,
      todayMissions,
      weeklyChallenges,
      loginReasons: dailyLoginReasons,
      graduation,
    }),
    unreadNotifications,
    recentActivity: (activityRows ?? []).map((r) => ({
      id: String(r.id),
      summary: String(r.summary),
      event_type: String(r.event_type),
      created_at: String(r.created_at),
    })),
    referralCode,
    xp,
    career,
    semesters,
    certificates,
    graduation,
    dailyLoginReasons,
  };
}
