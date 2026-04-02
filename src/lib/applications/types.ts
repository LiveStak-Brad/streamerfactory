/** Stored on `applications.status`; profile.role still gates product access. */
export type ApplicationPipelineStatus = "submitted" | "in_review" | "approved" | "rejected";

export type ApplicationRow = {
  id: string;
  full_name: string;
  email: string;
  tiktok_username: string;
  country: string;
  follower_range: string;
  goes_live: string;
  why_join: string;
  contact_consent: boolean;
  /** Authenticated submitter; null for legacy rows before linkage migration. */
  user_id: string | null;
  created_at: string;
  status: ApplicationPipelineStatus;
};
