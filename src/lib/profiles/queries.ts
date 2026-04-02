import { createClient } from "@/lib/supabase/server";

export type ProfileListRow = {
  id: string;
  role: string;
  email: string | null;
  created_at: string;
};

export async function getApplicantProfiles(): Promise<ProfileListRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, email, created_at")
    .eq("role", "applicant")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as ProfileListRow[];
}

export type NetworkMemberListRow = {
  id: string;
  role: string;
  email: string | null;
  tiktok_username: string | null;
  created_at: string;
  updated_at: string;
};

/** Promoted creators and staff-adjacent roles (excludes site owner). */
export async function getNetworkMemberProfiles(): Promise<NetworkMemberListRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, email, tiktok_username, created_at, updated_at")
    .in("role", ["member", "admin", "editor"])
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as NetworkMemberListRow[];
}
