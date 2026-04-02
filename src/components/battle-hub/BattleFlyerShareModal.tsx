"use client";

import { useEffect } from "react";

import { BattleFlyerPreview } from "@/components/battle-hub/BattleFlyerPreview";
import type { BattleEventWithParticipants } from "@/lib/battle-hub/types";

type Props = {
  event: BattleEventWithParticipants | null;
  onClose: () => void;
};

export function BattleFlyerShareModal({ event, onClose }: Props) {
  useEffect(() => {
    if (!event) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [event, onClose]);

  if (!event) return null;

  const parts = [...(event.battle_event_participants ?? [])].sort((a, b) => a.slot_order - b.slot_order);
  const flyerParticipants = parts.map((p) => ({
    username: p.tiktok_username,
    team: p.team_label,
  }));
  const remoteAvatarUrls: Record<number, string> = {};
  parts.forEach((p, i) => {
    if (p.flyer_avatar_url) remoteAvatarUrls[i] = p.flyer_avatar_url;
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 pb-8 backdrop-blur-sm sm:items-center sm:pb-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="flyer-share-title"
      onClick={onClose}
    >
      <div
        className="max-h-[min(92vh,900px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200/90 bg-surface p-4 shadow-2xl dark:border-zinc-700 dark:bg-zinc-950"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200/80 pb-3 dark:border-zinc-800">
          <div>
            <h2 id="flyer-share-title" className="text-base font-bold text-zinc-950 dark:text-zinc-50">
              Share this battle
            </h2>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Tap the poster to save the image, then post it to help spread the word.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-zinc-200/90 px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:bg-muted-bg/50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Close
          </button>
        </div>

        <div className="mt-4">
          <BattleFlyerPreview
            title={event.title}
            eventType={event.event_type}
            formatLabel={event.format_label}
            hideLayoutSwitcher
            layoutFormat={event.format_label}
            notes={event.notes}
            participantCount={event.participant_count}
            scheduledAt={event.scheduled_at}
            timezone={event.timezone}
            participants={flyerParticipants}
            displayAvatarUrls={remoteAvatarUrls}
            variant="story"
            downloadable
          />
        </div>
      </div>
    </div>
  );
}
