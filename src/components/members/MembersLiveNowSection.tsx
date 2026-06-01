import { BackstageAvatar } from "@/components/members/BackstageAvatar";
import { memberLiveStreamUrl } from "@/lib/members/network-members";
import type { LiveSnapshotRow } from "@/lib/creator-network/types";

const AVATAR_BACKDROPS = [
  "bg-gradient-to-br from-rose-500 to-pink-600",
  "bg-gradient-to-br from-violet-500 to-indigo-600",
  "bg-gradient-to-br from-sky-500 to-blue-600",
] as const;

type MembersLiveNowSectionProps = {
  importedAt: string | null;
  entries: LiveSnapshotRow[];
};

function formatWhen(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function avatarInitial(username: string): string {
  const raw = username.replace(/^@+/, "").trim();
  if (!raw) return "?";
  const ch = raw[0];
  return /[a-z]/i.test(ch) ? ch.toUpperCase() : ch;
}

export function MembersLiveNowSection({ importedAt, entries }: MembersLiveNowSectionProps) {
  const hasLive = entries.length > 0;

  return (
    <section className="mb-12 rounded-2xl border border-rose-200/80 bg-gradient-to-br from-rose-50/90 via-surface to-surface p-6 shadow-sm dark:border-rose-900/40 dark:from-rose-950/25 dark:via-zinc-950/40 dark:to-zinc-950/40">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-700 dark:text-rose-300">
            Live now
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {hasLive
              ? `${entries.length} creator${entries.length === 1 ? "" : "s"} on LIVE`
              : "Nobody live right now"}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {hasLive
              ? "Tap a card to open their stream on TikTok."
              : "When someone goes LIVE, staff sync from TikTok Backstage “LIVE now” with the Chrome extension."}
          </p>
          {importedAt ? (
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
              Last synced {formatWhen(importedAt)}
            </p>
          ) : null}
        </div>
        {hasLive ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Live
          </span>
        ) : null}
      </div>

      {hasLive ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((e, index) => {
            const handle = e.tiktok_username?.trim();
            if (!handle) return null;
            const href = memberLiveStreamUrl(handle);
            const backdrop = AVATAR_BACKDROPS[index % AVATAR_BACKDROPS.length];
            return (
              <li key={e.id}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-center gap-3 rounded-xl border border-rose-200/70 bg-surface/90 p-4 shadow-sm outline-none ring-rose-500/0 transition hover:-translate-y-0.5 hover:border-rose-400/60 hover:shadow-md focus-visible:ring-4 focus-visible:ring-rose-500/25 dark:border-rose-900/50 dark:bg-zinc-950/60 dark:hover:border-rose-700/60"
                >
                  <BackstageAvatar
                    backstageImageUrl={e.avatar_url}
                    fallbackBackdropClass={backdrop}
                    fallbackInitial={avatarInitial(handle)}
                    className="h-14 w-14 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-zinc-900 dark:text-zinc-100">
                      {e.tiktok_display_name ?? handle}
                    </p>
                    <p className="truncate text-xs text-zinc-500">@{handle}</p>
                    {e.stream_title ? (
                      <p className="mt-1 line-clamp-2 text-xs leading-snug text-zinc-600 dark:text-zinc-400">
                        {e.stream_title}
                      </p>
                    ) : null}
                    <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-rose-700 dark:text-rose-300">
                      Watch LIVE
                      <span
                        className="transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      >
                        →
                      </span>
                    </p>
                    {e.viewer_count_text ? (
                      <p className="text-xs text-zinc-500">{e.viewer_count_text} watching</p>
                    ) : null}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
