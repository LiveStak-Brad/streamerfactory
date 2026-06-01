"use client";

import Link from "next/link";
import { BackstageAvatar } from "@/components/members/BackstageAvatar";
import {
  cleanCreatorNetworkUsername,
  usernameCleanupWasSuspicious,
} from "@/lib/creator-network/clean-username";
import type { AdminMemberStatView, ImportBatchRow, MatchReviewSummary } from "@/lib/creator-network/types";

type Props = {
  batches: ImportBatchRow[];
  stats: AdminMemberStatView[];
  matchReview: MatchReviewSummary;
  initialBatchId?: string;
};

function formatWhen(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function CreatorNetworkAdminPanel({ batches, stats, matchReview, initialBatchId }: Props) {
  return (
    <div className="space-y-10">
      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 px-4 py-3 text-sm dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Matched Profiles</p>
          <p className="mt-1 text-2xl font-bold text-emerald-900 dark:text-emerald-100">
            {matchReview.matchedProfiles}
          </p>
        </div>
        <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 px-4 py-3 text-sm dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-xs uppercase tracking-wide text-amber-700 dark:text-amber-300">Unmatched Profiles</p>
          <p className="mt-1 text-2xl font-bold text-amber-900 dark:text-amber-100">
            {matchReview.unmatchedProfiles}
          </p>
        </div>
        <div className="rounded-xl border border-rose-200/80 bg-rose-50/60 px-4 py-3 text-sm dark:border-rose-900/50 dark:bg-rose-950/30">
          <p className="text-xs uppercase tracking-wide text-rose-700 dark:text-rose-300">Low Confidence Matches</p>
          <p className="mt-1 text-2xl font-bold text-rose-900 dark:text-rose-100">
            {matchReview.lowConfidenceMatches}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Recent import batches</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-3 py-2">When</th>
                <th className="px-3 py-2">Page type</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Accepted</th>
                <th className="px-3 py-2">Rejected</th>
                <th className="px-3 py-2">Batch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {batches.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-zinc-500">
                    No imports yet. Sync from the Chrome extension while viewing TikTok Backstage.
                  </td>
                </tr>
              ) : (
                batches.map((b) => (
                  <tr key={b.id} className="text-zinc-700 dark:text-zinc-300">
                    <td className="px-3 py-2 whitespace-nowrap">{formatWhen(b.created_at)}</td>
                    <td className="px-3 py-2">
                      {b.detected_page_type ?? "—"}
                      {b.relationship_tab ? ` · ${b.relationship_tab}` : ""}
                    </td>
                    <td className="px-3 py-2">{b.status}</td>
                    <td className="px-3 py-2">{b.accepted_rows_count}</td>
                    <td className="px-3 py-2">{b.rejected_rows_count}</td>
                    <td className="px-3 py-2">
                      <Link
                        href={`/admin/creator-network?batchId=${b.id}`}
                        className="font-mono text-xs text-accent hover:underline dark:text-accent-muted"
                      >
                        {b.id.slice(0, 8)}…
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Imported stats</h2>
          {initialBatchId ? (
            <Link href="/admin/creator-network" className="text-sm font-semibold text-accent hover:underline">
              Clear batch filter
            </Link>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Full financial stats visible here only (admin). Members never see others&apos; coins/diamonds on the site.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-3 py-2">Creator</th>
                <th className="px-3 py-2">Matched</th>
                <th className="px-3 py-2">Confidence</th>
                <th className="px-3 py-2">Source</th>
                <th className="px-3 py-2">Coins</th>
                <th className="px-3 py-2">Hours</th>
                <th className="px-3 py-2">Days</th>
                <th className="px-3 py-2">Active</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Imported</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {stats.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-3 py-6 text-zinc-500">
                    No stat rows{initialBatchId ? " for this batch" : ""}.
                  </td>
                </tr>
              ) : (
                stats.map((s) => {
                  const cleaned =
                    cleanCreatorNetworkUsername(s.tiktok_username) ?? s.tiktok_username ?? "unknown";
                  const raw = s.tiktok_username_raw?.trim();
                  const suspicious = usernameCleanupWasSuspicious(raw, cleaned);
                  const handle = cleaned.replace(/^@+/, "");
                  return (
                  <tr key={s.id} className="text-zinc-700 dark:text-zinc-300">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        <BackstageAvatar
                          backstageImageUrl={s.avatar_url}
                          fallbackBackdropClass="bg-gradient-to-br from-indigo-500 to-violet-600"
                          fallbackInitial={(handle[0] ?? "?").toUpperCase()}
                          className="h-10 w-10"
                        />
                        <div className="min-w-0">
                          <div className="font-medium">{s.tiktok_display_name ?? cleaned}</div>
                          <div className="text-xs text-zinc-500">@{handle}</div>
                          {raw && raw.toLowerCase().replace(/\s+/g, "") !== handle ? (
                            <div className="mt-0.5 font-mono text-[10px] text-zinc-400" title="Raw Backstage text">
                              raw: {raw.slice(0, 48)}
                              {raw.length > 48 ? "…" : ""}
                            </div>
                          ) : null}
                          {suspicious ? (
                            <span className="mt-1 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                              Username cleanup
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      {s.profile_id ? (
                        <span className="text-emerald-700 dark:text-emerald-400">
                          {s.matched_profile_username ?? s.matched_email ?? "Yes"}
                        </span>
                      ) : (
                        <span className="text-amber-700 dark:text-amber-400">Unmatched</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={
                          s.username_confidence === "high"
                            ? "text-emerald-700 dark:text-emerald-400"
                            : s.username_confidence === "medium"
                              ? "text-amber-700 dark:text-amber-400"
                              : "text-rose-700 dark:text-rose-400"
                        }
                      >
                        {(s.username_confidence ?? "low").toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-zinc-500">{s.username_source ?? "—"}</td>
                    <td className="px-3 py-2">{s.coins_earned.toLocaleString()}</td>
                    <td className="px-3 py-2">{Number(s.hours_streamed).toFixed(1)}</td>
                    <td className="px-3 py-2">{s.days_streamed}</td>
                    <td className="px-3 py-2">{s.activeness_level}</td>
                    <td className="px-3 py-2">
                      {s.creator_network_status ?? s.invite_status ?? "—"}
                      {s.risk_flag ? ` · ${s.risk_flag}` : ""}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs">{formatWhen(s.imported_at)}</td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
