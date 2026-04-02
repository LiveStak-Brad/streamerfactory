import { createClient } from "@/lib/supabase/server";

export type EventCountMap = Record<string, number>;

/** PostgREST often returns `count(*)::bigint` as string or bigint — normalize for JS. */
function coerceCount(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

export type AnalyticsCountsResult = {
  counts: EventCountMap;
  /** Set when the RPC is missing, RLS denied, or the query failed. */
  error: string | null;
};

/**
 * Per-event totals since `since` (inclusive), or all time if `since` is null.
 */
export async function getAnalyticsEventCounts(since: Date | null): Promise<AnalyticsCountsResult> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("admin_analytics_event_counts", {
    p_since: since ? since.toISOString() : null,
  });

  if (error) {
    console.warn("[analytics] admin_analytics_event_counts failed:", error.message);
    return { counts: {}, error: error.message };
  }

  const out: EventCountMap = {};
  for (const row of data ?? []) {
    const name = row?.event_name as string | undefined;
    if (!name) continue;
    out[name] = coerceCount(row?.cnt);
  }
  return { counts: out, error: null };
}

export type RecentAnalyticsEventRow = {
  id: string;
  event_name: string;
  created_at: string;
  route: string | null;
  user_id: string | null;
  resource_slug: string | null;
};

/**
 * Latest rows for admin verification (RLS: staff only). Safe columns only.
 */
export async function getRecentAnalyticsEvents(limit: number): Promise<RecentAnalyticsEventRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("analytics_events")
    .select("id, event_name, created_at, route, user_id, resource_slug")
    .order("created_at", { ascending: false })
    .limit(Math.min(Math.max(limit, 1), 50));

  if (error) {
    console.warn("[analytics] getRecentAnalyticsEvents failed:", error.message);
    return [];
  }

  return (data ?? []) as RecentAnalyticsEventRow[];
}

export function ratioPart(numerator: number, denominator: number): number | null {
  if (denominator <= 0 || numerator < 0) return null;
  return Math.round((numerator / denominator) * 1000) / 10;
}
