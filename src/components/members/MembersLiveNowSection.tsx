import { BackstageAvatar } from "@/components/members/BackstageAvatar";
import type { LiveNowDisplayEntry } from "@/lib/creator-network/live-now-display";

type MembersLiveNowSectionProps = {
  importedAt: string | null;
  entries: LiveNowDisplayEntry[];
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

function avatarInitial(name: string): string {
  const ch = name.trim()[0];
  return ch && /[a-z]/i.test(ch) ? ch.toUpperCase() : "?";
}

export function MembersLiveNowSection({ importedAt, entries }: MembersLiveNowSectionProps) {
  const hasLive = entries.length > 0;

  return (
    <section className="mb-12 overflow-hidden rounded-3xl border border-zinc-800/10 bg-zinc-950 text-zinc-50 shadow-xl dark:border-zinc-700">
      <div className="border-b border-zinc-800/80 bg-gradient-to-r from-rose-600/20 via-zinc-950 to-zinc-950 px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-300">
              Live now
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              {hasLive
                ? `${entries.length} on LIVE right now`
                : "Nobody live right now"}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
              {hasLive
                ? "Tap a creator to open their TikTok stream."
                : "When creators go LIVE, sync TikTok Backstage “LIVE now” with the Chrome extension."}
            </p>
            {importedAt ? (
              <p className="mt-2 text-xs text-zinc-500">Updated {formatWhen(importedAt)}</p>
            ) : null}
          </div>
          {hasLive ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Live
            </span>
          ) : null}
        </div>
      </div>

      {hasLive ? (
        <ul className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
          {entries.map((e, index) => (
            <li key={e.id}>
              <a
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 transition hover:border-rose-500/50 hover:bg-zinc-900 hover:shadow-lg hover:shadow-rose-950/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
              >
                <div className="flex items-center gap-3 border-b border-zinc-800/80 px-4 py-3">
                  <BackstageAvatar
                    backstageImageUrl={e.avatarUrl}
                    fallbackBackdropClass={
                      index % 2 === 0
                        ? "bg-gradient-to-br from-rose-500 to-orange-500"
                        : "bg-gradient-to-br from-violet-500 to-indigo-600"
                    }
                    fallbackInitial={avatarInitial(e.displayName)}
                    className="h-12 w-12 shrink-0 ring-2 ring-zinc-800"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-semibold text-white">{e.displayName}</p>
                    <p className="truncate text-sm text-zinc-400">@{e.username}</p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-rose-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    LIVE
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 px-4 py-3 text-xs sm:grid-cols-3">
                  {e.liveDuration ? (
                    <div className="rounded-lg bg-zinc-950/60 px-2.5 py-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                        Duration
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-zinc-100">{e.liveDuration}</p>
                    </div>
                  ) : null}
                  {e.statLine ? (
                    <div
                      className={`rounded-lg bg-zinc-950/60 px-2.5 py-2 ${e.liveDuration ? "col-span-1 sm:col-span-2" : "col-span-2 sm:col-span-3"}`}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                        Stream stats
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug text-zinc-200">
                        {e.statLine}
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="mt-auto border-t border-zinc-800/80 px-4 py-3">
                  <p className="text-center text-sm font-semibold text-rose-300 transition group-hover:text-rose-200">
                    Watch on TikTok →
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
