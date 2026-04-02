import { createClient } from "@/lib/supabase/server";
import type { ApplicationRow } from "./types";

export async function getApplications(): Promise<ApplicationRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as ApplicationRow[];
}
