import type { SupabaseClient } from "@supabase/supabase-js";
import { normalizeHandle, resolveCanonicalHandle } from "@/lib/rankings/backstage-seed-data";

const NETWORK_ROLES = ["member", "editor", "admin", "owner"] as const;

export type ProfileMatchMaps = {
  handleToProfileId: Map<string, string>;
  profileIdToEmail: Map<string, string | null>;
  profileIdToUsername: Map<string, string | null>;
};

export async function buildProfileMatchMaps(
  supabase: SupabaseClient,
): Promise<{ maps: ProfileMatchMaps; error?: string }> {
  const { data: profiles, error: profErr } = await supabase
    .from("profiles")
    .select("id, role, tiktok_username, email")
    .in("role", [...NETWORK_ROLES]);

  if (profErr) return { maps: emptyMaps(), error: profErr.message };

  const { data: apps } = await supabase
    .from("applications")
    .select("user_id, tiktok_username");

  const handleToProfileId = new Map<string, string>();
  const profileIdToEmail = new Map<string, string | null>();
  const profileIdToUsername = new Map<string, string | null>();

  for (const p of profiles ?? []) {
    const row = p as { id: string; tiktok_username: string | null; email: string | null };
    profileIdToEmail.set(row.id, row.email);
    profileIdToUsername.set(row.id, row.tiktok_username);
    const raw = row.tiktok_username?.trim();
    if (raw) {
      handleToProfileId.set(normalizeHandle(raw), row.id);
      handleToProfileId.set(normalizeHandle(resolveCanonicalHandle(raw)), row.id);
    }
  }

  for (const a of apps ?? []) {
    const row = a as { user_id: string | null; tiktok_username: string | null };
    if (!row.user_id || !row.tiktok_username) continue;
    const n = normalizeHandle(row.tiktok_username);
    if (!handleToProfileId.has(n)) {
      handleToProfileId.set(n, row.user_id);
      handleToProfileId.set(normalizeHandle(resolveCanonicalHandle(row.tiktok_username)), row.user_id);
    }
  }

  return {
    maps: { handleToProfileId, profileIdToEmail, profileIdToUsername },
  };
}

export function matchProfileId(
  maps: ProfileMatchMaps,
  rawUsername: string | undefined,
): string | null {
  if (!rawUsername?.trim()) return null;
  const canonical = resolveCanonicalHandle(rawUsername);
  const direct =
    maps.handleToProfileId.get(normalizeHandle(canonical)) ??
    maps.handleToProfileId.get(normalizeHandle(rawUsername));
  if (direct) return direct;

  const key = normalizeHandle(canonical);
  if (key.length < 6) return null;

  const prefixMatches: Array<[string, string]> = [];
  for (const [handle, profileId] of maps.handleToProfileId.entries()) {
    if (handle.startsWith(key) || key.startsWith(handle)) {
      prefixMatches.push([handle, profileId]);
    }
  }

  if (prefixMatches.length === 1) return prefixMatches[0][1];
  return null;
}

function emptyMaps(): ProfileMatchMaps {
  return {
    handleToProfileId: new Map(),
    profileIdToEmail: new Map(),
    profileIdToUsername: new Map(),
  };
}

export function normalizeActiveness(raw: string | undefined): "none" | "low" | "medium" | "high" | "elite" {
  const v = (raw ?? "").trim().toLowerCase();
  if (v === "low") return "low";
  if (v === "medium" || v === "med") return "medium";
  if (v === "high" || v === "active") return "high";
  if (v === "elite") return "elite";
  return "none";
}
