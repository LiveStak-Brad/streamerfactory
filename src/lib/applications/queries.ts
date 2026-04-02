import { createClient } from "@/lib/supabase/server";
import type { ApplicationPipelineStatus, ApplicationRow } from "./types";

function mapApplicationRow(row: unknown): ApplicationRow {
  const r = row as ApplicationRow;
  return {
    ...r,
    status: (r.status ?? "submitted") as ApplicationPipelineStatus,
  };
}

export async function getApplications(): Promise<ApplicationRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapApplicationRow);
}

/** Current user's application row (RLS: own row only). */
export async function getMyApplication(userId: string): Promise<ApplicationRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return mapApplicationRow(data);
}
