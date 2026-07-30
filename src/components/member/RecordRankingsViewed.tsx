"use client";

import { useEffect } from "react";
import { recordRankingsViewedAction } from "@/lib/growth/actions";

/** Emits rankings_viewed once when the member leaderboard mounts. */
export function RecordRankingsViewed() {
  useEffect(() => {
    void recordRankingsViewedAction();
  }, []);
  return null;
}
