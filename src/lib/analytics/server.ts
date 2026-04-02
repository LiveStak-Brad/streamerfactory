import { createClient } from "@/lib/supabase/server";

import type { AnalyticsEventName } from "./events";

export type TrackServerEventParams = {
  event: AnalyticsEventName;
  /** Route or path for context (e.g. /apply). */
  route?: string;
  resourceSlug?: string;
  battleRequestId?: string;
  battleEventId?: string;
  /**
   * When staff acts on another user, set this to the subject (e.g. approved applicant).
   * Otherwise `user_id` defaults to the current session user.
   */
  subjectUserId?: string | null;
  metadata?: Record<string, unknown>;
};

/**
 * Inserts an analytics row using the server Supabase client. Never throws to callers.
 */
export async function trackServerEvent(params: TrackServerEventParams): Promise<void> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userIdForRow = params.subjectUserId ?? user?.id ?? null;

    let profileRole: string | null = null;
    if (userIdForRow) {
      const { data: pr } = await supabase.from("profiles").select("role").eq("id", userIdForRow).maybeSingle();
      profileRole = pr?.role ?? null;
    }

    const { error } = await supabase.from("analytics_events").insert({
      event_name: params.event,
      user_id: userIdForRow,
      profile_role: profileRole,
      route: params.route ?? null,
      resource_slug: params.resourceSlug ?? null,
      battle_request_id: params.battleRequestId ?? null,
      battle_event_id: params.battleEventId ?? null,
      metadata: params.metadata ?? null,
    });

    if (error) {
      console.warn("[analytics] insert failed:", params.event, error.message);
    }
  } catch (e) {
    console.warn("[analytics] trackServerEvent:", e);
  }
}
