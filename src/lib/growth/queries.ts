import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";
import type { SeasonRow } from "@/lib/growth/types";

async function assertStaff() {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    throw new Error("Unauthorized");
  }
  return session;
}

export type MissionTemplateAdminRow = {
  id: string;
  key: string;
  title: string;
  description: string | null;
  category: string;
  cadence: string;
  season_id: string | null;
  requirement: unknown;
  active: boolean;
  sort_order: number;
  reputation_points: number;
};

export type AchievementDefinitionAdminRow = {
  id: string;
  key: string;
  name: string;
  description: string | null;
  category: string;
  icon: string | null;
  season_id: string | null;
  requirement: unknown;
  visibility: string;
  share_image_path: string | null;
  active: boolean;
  sort_order: number;
  reputation_points: number;
};

export type OnboardingTaskAdminRow = {
  id: string;
  key: string;
  title: string;
  description: string | null;
  href: string | null;
  sort_order: number;
  requirement: unknown;
  required: boolean;
  active: boolean;
};

export type StreakDefinitionAdminRow = {
  id: string;
  key: string;
  name: string;
  description: string | null;
  grace_days: number;
  freeze_enabled: boolean;
  active: boolean;
};

export type ReputationRuleAdminRow = {
  id: string;
  key: string;
  name: string;
  event_type: string;
  points: number;
  max_per_day: number | null;
  season_scoped: boolean;
  active: boolean;
};

export type ReputationTitleAdminRow = {
  id: string;
  key: string;
  name: string;
  description: string | null;
  icon: string | null;
  min_reputation: number;
  requirement: unknown;
  sort_order: number;
  active: boolean;
};

/** Staff list — includes inactive seasons. */
export async function listSeasonsAdmin(): Promise<SeasonRow[]> {
  await assertStaff();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("seasons")
    .select("id, key, name, start_at, end_at, status, theme, banner_image, sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as SeasonRow[];
}

/** Staff list — includes inactive templates. */
export async function listMissionTemplatesAdmin(): Promise<MissionTemplateAdminRow[]> {
  await assertStaff();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mission_templates")
    .select(
      "id, key, title, description, category, cadence, season_id, requirement, active, sort_order, reputation_points",
    )
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as MissionTemplateAdminRow[];
}

/** Staff list — includes inactive achievements. */
export async function listAchievementsAdmin(): Promise<AchievementDefinitionAdminRow[]> {
  await assertStaff();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("achievement_definitions")
    .select(
      "id, key, name, description, category, icon, season_id, requirement, visibility, share_image_path, active, sort_order, reputation_points",
    )
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as AchievementDefinitionAdminRow[];
}

/** Staff list — includes inactive onboarding tasks. */
export async function listOnboardingTasksAdmin(): Promise<OnboardingTaskAdminRow[]> {
  await assertStaff();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("onboarding_tasks")
    .select("id, key, title, description, href, sort_order, requirement, required, active")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as OnboardingTaskAdminRow[];
}

/** Staff list — includes inactive streak definitions. */
export async function listStreakDefinitionsAdmin(): Promise<StreakDefinitionAdminRow[]> {
  await assertStaff();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("streak_definitions")
    .select("id, key, name, description, grace_days, freeze_enabled, active")
    .order("key", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as StreakDefinitionAdminRow[];
}

/** Staff list — includes inactive reputation rules. */
export async function listReputationRulesAdmin(): Promise<ReputationRuleAdminRow[]> {
  await assertStaff();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reputation_rules")
    .select("id, key, name, event_type, points, max_per_day, season_scoped, active")
    .order("key", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as ReputationRuleAdminRow[];
}

/** Staff list — includes inactive reputation titles. */
export async function listReputationTitlesAdmin(): Promise<ReputationTitleAdminRow[]> {
  await assertStaff();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reputation_titles")
    .select("id, key, name, description, icon, min_reputation, requirement, sort_order, active")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as ReputationTitleAdminRow[];
}
