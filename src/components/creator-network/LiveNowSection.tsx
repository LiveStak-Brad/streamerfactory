import type { LiveSnapshotRow } from "@/lib/creator-network/types";

type Props = {
  importedAt: string | null;
  entries: LiveSnapshotRow[];
  showAdminMeta?: boolean;
  batchId?: string | null;
};

function formatWhen(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function LiveNowSection({ importedAt, entries, showAdminMeta, batchId }: Props) {
  const hasLive = entries.length > 0;

  return (
    <section className="rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent dark:text-accent-muted">
            Live now
          </p>
          <h2 className="mt-1 text-xl font-bold text-zinc-950 dark:text-zinc-50">
            {hasLive ? `${entries.length} creator${entries.length === 1 ? "" : "s"} live` : "No live creators synced"}
          </h2>
          {importedAt ? (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Last synced {formatWhen(importedAt)}
              {showAdminMeta && batchId ? (
                <span className="ml-2 font-mono text-xs">batch {batchId.slice(0, 8)}…</span>
              ) : null}
            </p>
          ) : (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Keep TikTok Backstage &quot;LIVE now&quot; open and sync from the Chrome extension.
            </p>
          )}
        </div>
        {hasLive ? (
          <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-rose-800 dark:bg-rose-950/50 dark:text-rose-200">
            Live
          </span>
        ) : null}
      </div>

      {hasLive ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((e) => (
            <li
              key={e.id}
              className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-muted-bg/40 p-3 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              {e.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={e.avatar_url}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-sm font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {(e.tiktok_display_name ?? e.tiktok_username ?? "?").slice(0, 1).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate font-semibold text-zinc-900 dark:text-zinc-100">
                  {e.tiktok_display_name ?? e.tiktok_username ?? "Creator"}
                </p>
                {e.tiktok_username ? (
                  <p className="truncate text-xs text-zinc-500">@{e.tiktok_username}</p>
                ) : null}
                {e.stream_title ? (
                  <p className="mt-1 truncate text-xs text-zinc-600 dark:text-zinc-400">{e.stream_title}</p>
                ) : null}
                {e.viewer_count_text ? (
                  <p className="text-xs text-zinc-500">{e.viewer_count_text} viewers</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
