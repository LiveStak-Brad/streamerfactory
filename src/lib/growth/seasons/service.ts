import { createClient } from "@/lib/supabase/server";
import type { SeasonRow } from "@/lib/growth/types";

export async function getActiveSeason(): Promise<SeasonRow | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("seasons")
    .select("id, key, name, start_at, end_at, status, theme, banner_image, sort_order")
    .eq("status", "active")
    .lte("start_at", new Date().toISOString())
    .order("sort_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!data) return null;
  // Filter end_at in JS when present (Supabase or-filter is awkward for nulls)
  if (data.end_at && new Date(data.end_at) < new Date()) return null;
  return data as SeasonRow;
}

export async function listSeasons(): Promise<SeasonRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("seasons")
    .select("id, key, name, start_at, end_at, status, theme, banner_image, sort_order")
    .order("sort_order", { ascending: true });
  return (data ?? []) as SeasonRow[];
}

export async function getSeasonById(id: string): Promise<SeasonRow | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("seasons")
    .select("id, key, name, start_at, end_at, status, theme, banner_image, sort_order")
    .eq("id", id)
    .maybeSingle();
  return (data as SeasonRow | null) ?? null;
}
