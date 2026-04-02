export type BattleParticipantRow = {
  id: string;
  battle_event_id: string;
  profile_id: string | null;
  tiktok_username: string;
  team_label: string | null;
  slot_order: number;
  created_at: string;
  /** Public URL (e.g. Supabase Storage) for flyer when TikTok avatar is missing. */
  flyer_avatar_url?: string | null;
};

export type BattleEventRow = {
  id: string;
  created_by: string;
  title: string;
  event_type: string;
  participant_count: number;
  format_label: string;
  scheduled_at: string;
  timezone: string;
  notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  /** Set when "battle promoted to calendar" email was sent */
  promoted_email_sent_at?: string | null;
  /** Set when upcoming-battle reminder email was sent */
  reminder_sent_at?: string | null;
};

export type BattleEventWithParticipants = BattleEventRow & {
  battle_event_participants?: BattleParticipantRow[] | null;
};
