import { BackstageAvatar } from "@/components/members/BackstageAvatar";
import type { MemberSafeStatView } from "@/lib/creator-network/types";

type Props = {
  stats: MemberSafeStatView | null;
};

function formatWhen(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

/** Member dashboard card — own stats only; includes coins for self per privacy rules. */
export function CreatorNetworkStatsCard({ stats }: Props) {
  if (!stats) {
    return (
      <section className="rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent dark:text-accent-muted">
          Creator Network stats
        </p>
        <h2 className="mt-1 text-xl font-bold text-zinc-950 dark:text-zinc-50">Not synced yet</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Staff sync visible TikTok Backstage stats with the Chrome extension. Your numbers will appear here after
          the next import matches your TikTok handle.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent dark:text-accent-muted">
        Creator Network stats
      </p>
      <div className="mt-4 flex items-center gap-4">
        {stats.tiktok_username ? (
          <BackstageAvatar
            backstageImageUrl={stats.avatar_url}
            fallbackBackdropClass="bg-gradient-to-br from-indigo-500 to-violet-600"
            fallbackInitial={(stats.tiktok_username.replace(/^@+/, "")[0] ?? "?").toUpperCase()}
            className="h-16 w-16"
          />
        ) : null}
        <div>
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            {stats.tiktok_display_name ?? stats.tiktok_username ?? "Your stats"}
          </h2>
          {stats.tiktok_username ? (
            <p className="text-sm text-zinc-500">@{stats.tiktok_username.replace(/^@+/, "")}</p>
          ) : null}
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Last updated {formatWhen(stats.imported_at)}
          </p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-xs uppercase tracking-wide text-zinc-500">Diamonds earned</dt>
          <dd className="mt-1 text-lg font-bold text-zinc-950 dark:text-zinc-50">
            {stats.diamonds_earned != null || stats.coins_earned != null
              ? (stats.diamonds_earned ?? stats.coins_earned)!.toLocaleString()
              : "Not available in today’s sync"}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-zinc-500">Hours streamed</dt>
          <dd className="mt-1 text-lg font-bold text-zinc-950 dark:text-zinc-50">
            {stats.hours_streamed == null
              ? "Waiting for Activeness data"
              : Number(stats.hours_streamed).toFixed(1)}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-zinc-500">Days streamed</dt>
          <dd className="mt-1 text-lg font-bold text-zinc-950 dark:text-zinc-50">
            {stats.days_streamed == null ? "Not available" : stats.days_streamed}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-zinc-500">Activeness</dt>
          <dd className="mt-1 text-lg font-bold capitalize text-zinc-950 dark:text-zinc-50">
            {stats.activeness_level}
          </dd>
        </div>
        {stats.creator_network_status ? (
          <div>
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Network status</dt>
            <dd className="mt-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {stats.creator_network_status}
            </dd>
          </div>
        ) : null}
      </dl>
    </section>
  );
}
