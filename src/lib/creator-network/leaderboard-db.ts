import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Prefer service role; fall back to anon/authenticated client + public leaderboard RLS. */
export async function getLeaderboardSupabase(): Promise<SupabaseClient> {
  const service = createServiceRoleClient();
  if (service) return service;
  return createClient();
}

export function isServiceRoleConfigured(): boolean {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}
