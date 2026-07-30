"use server";

import { revalidatePath } from "next/cache";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { isRequirementType } from "@/lib/growth/types";
import { createClient } from "@/lib/supabase/server";

export type GrowthAdminActionResult = { ok: true } | { error: string };

async function requireGrowthAdmin(): Promise<GrowthAdminActionResult | null> {
  const session = await getSessionProfile();
  if (!session?.profile || !canAccessAdmin(session.profile.role)) {
    return { error: "Unauthorized" };
  }
  return null;
}

function revalidateGrowthAdminPaths(...paths: string[]) {
  for (const path of paths) {
    revalidatePath(path);
  }
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optionalStr(formData: FormData, key: string): string | null {
  const v = str(formData, key);
  return v ? v : null;
}

function bool(formData: FormData, key: string): boolean {
  const v = formData.get(key);
  return v === "on" || v === "true" || v === "1";
}

function intField(formData: FormData, key: string, fallback = 0): number {
  const n = Number(formData.get(key));
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

function toIsoOrNull(raw: string): string | null {
  if (!raw) return null;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function parseRequirementJson(raw: string): { ok: true; value: unknown } | { error: string } {
  const text = raw.trim() || "{}";
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { error: "Requirement must be valid JSON." };
  }
  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    const typeField = (parsed as Record<string, unknown>).type;
    if (typeof typeField === "string" && !isRequirementType(typeField)) {
      return { error: `Unknown requirement type: ${typeField}` };
    }
  }
  return { ok: true, value: parsed };
}

const SEASON_STATUSES = new Set(["draft", "active", "ended", "archived"]);
const MISSION_CATEGORIES = new Set([
  "training",
  "community",
  "battles",
  "profile",
  "creator_growth",
  "platform",
]);
const MISSION_CADENCES = new Set(["daily", "weekly", "once", "seasonal"]);
const ACHIEVEMENT_CATEGORIES = new Set([
  "learning",
  "community",
  "creator",
  "rankings",
  "battles",
  "referrals",
  "recruiting",
  "milestones",
]);
const VISIBILITIES = new Set(["public", "members", "private"]);

export async function upsertSeasonAction(formData: FormData): Promise<GrowthAdminActionResult> {
  const denied = await requireGrowthAdmin();
  if (denied) return denied;

  const id = optionalStr(formData, "id");
  const key = str(formData, "key");
  const name = str(formData, "name");
  const startRaw = str(formData, "start_at");
  const endRaw = str(formData, "end_at");
  const status = str(formData, "status") || "draft";
  const banner_image = optionalStr(formData, "banner_image");
  const sort_order = intField(formData, "sort_order", 0);

  if (!key) return { error: "Key is required." };
  if (!name) return { error: "Name is required." };
  if (!SEASON_STATUSES.has(status)) return { error: "Invalid season status." };

  const start_at = toIsoOrNull(startRaw);
  if (!start_at) return { error: "Valid start_at is required." };
  const end_at = endRaw ? toIsoOrNull(endRaw) : null;
  if (endRaw && !end_at) return { error: "Invalid end_at." };

  const supabase = await createClient();
  const row = {
    key,
    name,
    start_at,
    end_at,
    status,
    banner_image,
    sort_order,
    updated_at: new Date().toISOString(),
  };

  const { error } = id
    ? await supabase.from("seasons").update(row).eq("id", id)
    : await supabase.from("seasons").upsert(row, { onConflict: "key" });

  if (error) return { error: error.message };
  revalidateGrowthAdminPaths("/admin/seasons", "/admin/missions", "/admin/achievements");
  return { ok: true };
}

export async function upsertMissionTemplateAction(
  formData: FormData,
): Promise<GrowthAdminActionResult> {
  const denied = await requireGrowthAdmin();
  if (denied) return denied;

  const key = str(formData, "key");
  const title = str(formData, "title");
  const description = optionalStr(formData, "description");
  const category = str(formData, "category") || "platform";
  const cadence = str(formData, "cadence") || "daily";
  const season_id = optionalStr(formData, "season_id");
  const requirementRaw = str(formData, "requirement");
  const active = bool(formData, "active");
  const sort_order = intField(formData, "sort_order", 0);
  const reputation_points = intField(formData, "reputation_points", 0);

  if (!key) return { error: "Key is required." };
  if (!title) return { error: "Title is required." };
  if (!MISSION_CATEGORIES.has(category)) return { error: "Invalid mission category." };
  if (!MISSION_CADENCES.has(cadence)) return { error: "Invalid mission cadence." };

  const req = parseRequirementJson(requirementRaw);
  if ("error" in req) return req;

  const supabase = await createClient();
  const { error } = await supabase.from("mission_templates").upsert(
    {
      key,
      title,
      description,
      category,
      cadence,
      season_id,
      requirement: req.value,
      active,
      sort_order,
      reputation_points,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );

  if (error) return { error: error.message };
  revalidateGrowthAdminPaths("/admin/missions");
  return { ok: true };
}

export async function upsertAchievementDefinitionAction(
  formData: FormData,
): Promise<GrowthAdminActionResult> {
  const denied = await requireGrowthAdmin();
  if (denied) return denied;

  const key = str(formData, "key");
  const name = str(formData, "name");
  const description = optionalStr(formData, "description");
  const category = str(formData, "category") || "milestones";
  const icon = optionalStr(formData, "icon");
  const season_id = optionalStr(formData, "season_id");
  const requirementRaw = str(formData, "requirement");
  const visibility = str(formData, "visibility") || "members";
  const share_image_path = optionalStr(formData, "share_image_path");
  const active = bool(formData, "active");
  const sort_order = intField(formData, "sort_order", 0);
  const reputation_points = intField(formData, "reputation_points", 0);

  if (!key) return { error: "Key is required." };
  if (!name) return { error: "Name is required." };
  if (!ACHIEVEMENT_CATEGORIES.has(category)) return { error: "Invalid achievement category." };
  if (!VISIBILITIES.has(visibility)) return { error: "Invalid visibility." };

  const req = parseRequirementJson(requirementRaw);
  if ("error" in req) return req;

  const supabase = await createClient();
  const { error } = await supabase.from("achievement_definitions").upsert(
    {
      key,
      name,
      description,
      category,
      icon,
      season_id,
      requirement: req.value,
      visibility,
      share_image_path,
      active,
      sort_order,
      reputation_points,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );

  if (error) return { error: error.message };
  revalidateGrowthAdminPaths("/admin/achievements");
  return { ok: true };
}

export async function upsertOnboardingTaskAction(
  formData: FormData,
): Promise<GrowthAdminActionResult> {
  const denied = await requireGrowthAdmin();
  if (denied) return denied;

  const key = str(formData, "key");
  const title = str(formData, "title");
  const description = optionalStr(formData, "description");
  const href = optionalStr(formData, "href");
  const sort_order = intField(formData, "sort_order", 0);
  const requirementRaw = str(formData, "requirement");
  const required = bool(formData, "required");
  const active = bool(formData, "active");

  if (!key) return { error: "Key is required." };
  if (!title) return { error: "Title is required." };

  const req = parseRequirementJson(requirementRaw);
  if ("error" in req) return req;

  const supabase = await createClient();
  const { error } = await supabase.from("onboarding_tasks").upsert(
    {
      key,
      title,
      description,
      href,
      sort_order,
      requirement: req.value,
      required,
      active,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );

  if (error) return { error: error.message };
  revalidateGrowthAdminPaths("/admin/onboarding-tasks");
  return { ok: true };
}

export async function updateStreakDefinitionAction(
  formData: FormData,
): Promise<GrowthAdminActionResult> {
  const denied = await requireGrowthAdmin();
  if (denied) return denied;

  const key = str(formData, "key");
  const grace_days = intField(formData, "grace_days", 0);
  const freeze_enabled = bool(formData, "freeze_enabled");
  const active = bool(formData, "active");
  const name = optionalStr(formData, "name");
  const description = optionalStr(formData, "description");

  if (!key) return { error: "Key is required." };
  if (grace_days < 0) return { error: "grace_days must be >= 0." };

  const patch: Record<string, unknown> = {
    grace_days,
    freeze_enabled,
    active,
    updated_at: new Date().toISOString(),
  };
  if (name) patch.name = name;
  if (description !== null) patch.description = description;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("streak_definitions")
    .update(patch)
    .eq("key", key)
    .select("id");

  if (error) return { error: error.message };
  if (!data?.length) return { error: "Streak definition not found." };
  revalidateGrowthAdminPaths("/admin/streaks");
  return { ok: true };
}

export async function upsertReputationRuleAction(
  formData: FormData,
): Promise<GrowthAdminActionResult> {
  const denied = await requireGrowthAdmin();
  if (denied) return denied;

  const key = str(formData, "key");
  const name = str(formData, "name");
  const event_type = str(formData, "event_type");
  const points = intField(formData, "points", 0);
  const maxPerDayRaw = str(formData, "max_per_day");
  const max_per_day = maxPerDayRaw === "" ? null : intField(formData, "max_per_day", 0);
  const season_scoped = bool(formData, "season_scoped");
  const active = bool(formData, "active");

  if (!key) return { error: "Key is required." };
  if (!name) return { error: "Name is required." };
  if (!event_type) return { error: "event_type is required." };
  if (points === 0) return { error: "points must be non-zero." };

  const supabase = await createClient();
  const { error } = await supabase.from("reputation_rules").upsert(
    {
      key,
      name,
      event_type,
      points,
      max_per_day,
      season_scoped,
      active,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );

  if (error) return { error: error.message };
  revalidateGrowthAdminPaths("/admin/reputation");
  return { ok: true };
}

export async function upsertReputationTitleAction(
  formData: FormData,
): Promise<GrowthAdminActionResult> {
  const denied = await requireGrowthAdmin();
  if (denied) return denied;

  const key = str(formData, "key");
  const name = str(formData, "name");
  const description = optionalStr(formData, "description");
  const icon = optionalStr(formData, "icon");
  const min_reputation = intField(formData, "min_reputation", 0);
  const requirementRaw = str(formData, "requirement");
  const sort_order = intField(formData, "sort_order", 0);
  const active = bool(formData, "active");

  if (!key) return { error: "Key is required." };
  if (!name) return { error: "Name is required." };

  const req = parseRequirementJson(requirementRaw);
  if ("error" in req) return req;

  const supabase = await createClient();
  const { error } = await supabase.from("reputation_titles").upsert(
    {
      key,
      name,
      description,
      icon,
      min_reputation,
      requirement: req.value,
      sort_order,
      active,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );

  if (error) return { error: error.message };
  revalidateGrowthAdminPaths("/admin/reputation");
  return { ok: true };
}
