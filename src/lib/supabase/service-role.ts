import { createClient } from "@supabase/supabase-js";

import { getSupabasePublicEnv } from "./env";

/**
 * Server-only client with the service role key — bypasses RLS. Only call after verifying the user.
 * Returns null if `SUPABASE_SERVICE_ROLE_KEY` is unset (falls back to cookie session + RLS).
 */
export function createServiceRoleClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key?.trim()) return null;
  const { url } = getSupabasePublicEnv();
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
