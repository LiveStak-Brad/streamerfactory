import Link from "next/link";
import type { TikTokConnectionPublic } from "@/lib/tiktok/types";
import { TikTokRefreshForm } from "@/components/member/TikTokRefreshForm";

function formatSynced(iso: string | null) {
  if (!iso) return "Not synced yet";
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function TikTokMemberCard({ connection }: { connection: TikTokConnectionPublic | null }) {
  if (!connection) {
    return (
      <section className="rounded-2xl border border-zinc-200/90 bg-surface p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">TikTok</h2>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Connect your TikTok account with TikTok Login Kit. After you authorize, we store tokens securely on the
          server (never in the browser) and sync your public stats to this dashboard.
        </p>
        <a
          href="/api/tiktok/oauth/start"
          className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-md transition-[transform,box-shadow] hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950"
        >
          Connect your TikTok account
        </a>
        <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
          Requires TikTok app configuration and HTTPS redirect URI in production. See project env docs.
        </p>
      </section>
    );
  }

  const handle = connection.tiktok_username?.replace(/^@/, "") ?? "creator";
  const profileUrl = handle ? `https://www.tiktok.com/@${encodeURIComponent(handle)}` : "https://www.tiktok.com/";

  return (
    <section className="rounded-2xl border border-zinc-200/90 bg-surface p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="shrink-0">
          {connection.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element -- TikTok CDN URLs vary; avoid remotePatterns churn.
            <img
              src={connection.avatar_url}
              alt=""
              width={96}
              height={96}
              className="h-24 w-24 rounded-full border border-zinc-200 object-cover dark:border-zinc-700"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-zinc-300 bg-zinc-100 text-xs font-medium text-zinc-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
              No avatar
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            Connected
          </p>
          <h2 className="mt-2 text-xl font-bold text-zinc-950 dark:text-zinc-50">
            {connection.display_name?.trim() || `@${handle}`}
          </h2>
          <p className="mt-1 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            <Link href={profileUrl} className="text-accent hover:underline dark:text-accent-muted" target="_blank" rel="noopener noreferrer">
              @{handle}
            </Link>
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Followers</dt>
              <dd className="mt-1 text-lg font-bold text-zinc-950 dark:text-zinc-50">
                {connection.follower_count.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Following</dt>
              <dd className="mt-1 text-lg font-bold text-zinc-950 dark:text-zinc-50">
                {connection.following_count.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Likes</dt>
              <dd className="mt-1 text-lg font-bold text-zinc-950 dark:text-zinc-50">
                {connection.likes_count.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Videos</dt>
              <dd className="mt-1 text-lg font-bold text-zinc-950 dark:text-zinc-50">
                {connection.video_count.toLocaleString()}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">Last synced: {formatSynced(connection.last_synced_at)}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <TikTokRefreshForm />
            <a
              href="/api/tiktok/oauth/start"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200/90 bg-surface px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:border-accent/40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              Reconnect TikTok
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
