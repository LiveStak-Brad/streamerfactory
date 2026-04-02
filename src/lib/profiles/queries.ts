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
