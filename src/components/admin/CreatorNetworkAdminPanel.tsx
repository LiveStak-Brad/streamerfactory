"use client";

import Link from "next/link";
import { BackstageAvatar } from "@/components/members/BackstageAvatar";
import { AdminSectionTitle } from "@/components/admin/ui/AdminSectionTitle";
import { AdminStatusBadge } from "@/components/admin/ui/AdminStatusBadge";
import {
  AdminTable,
  AdminTableHead,
  AdminTd,
  AdminTh,
  AdminTr,
} from "@/components/admin/ui/AdminTable";
import { StatCard } from "@/components/ui/StatCard";
import { EmptyState } from "@/components/ui/EmptyState";
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
        <StatCard
          label="Matched profiles"
          value={matchReview.matchedProfiles}
          hint="Linked to site accounts"
          accent
        />
        <StatCard
          label="Unmatched profiles"
          value={matchReview.unmatchedProfiles}
          hint="Need manual review"
        />
        <StatCard
          label="Low confidence"
          value={matchReview.lowConfidenceMatches}
          hint="Matched with low username confidence"
        />
      </section>

      <section>
        <AdminSectionTitle
          title="Recent import batches"
          description="Latest syncs from the Chrome extension."
        />
        <div className="mt-4">
          {batches.length === 0 ? (
            <EmptyState
              title="No imports yet"
              description="Sync from the Chrome extension while viewing TikTok Backstage."
            />
          ) : (
            <AdminTable caption="Import batches" minWidth="640px">
              <AdminTableHead>
                <AdminTr>
                  <AdminTh>When</AdminTh>
                  <AdminTh>Page type</AdminTh>
                  <AdminTh>Status</AdminTh>
                  <AdminTh>Accepted</AdminTh>
                  <AdminTh>Rejected</AdminTh>
                  <AdminTh>Batch</AdminTh>
                </AdminTr>
              </AdminTableHead>
              <tbody>
                {batches.map((b) => (
                  <AdminTr key={b.id}>
                    <AdminTd className="whitespace-nowrap text-muted">{formatWhen(b.created_at)}</AdminTd>
                    <AdminTd>
                      {b.detected_page_type ?? "—"}
                      {b.relationship_tab ? ` · ${b.relationship_tab}` : ""}
                    </AdminTd>
                    <AdminTd>
                      <AdminStatusBadge tone="neutral">{b.status}</AdminStatusBadge>
                    </AdminTd>
                    <AdminTd className="tabular-nums">{b.accepted_rows_count}</AdminTd>
                    <AdminTd className="tabular-nums">{b.rejected_rows_count}</AdminTd>
                    <AdminTd>
                      <Link
                        href={`/admin/creator-network?batchId=${b.id}`}
                        className="font-mono text-xs font-semibold text-accent hover:underline dark:text-accent-muted"
                      >
                        {b.id.slice(0, 8)}…
                      </Link>
                    </AdminTd>
                  </AdminTr>
                ))}
              </tbody>
            </AdminTable>
          )}
        </div>
      </section>

      <section>
        <AdminSectionTitle
          title="Imported stats"
          description="Full financial stats are visible here only (admin). Members never see others' coins/diamonds on the site."
          actionHref={initialBatchId ? "/admin/creator-network" : undefined}
          actionLabel={initialBatchId ? "Clear batch filter" : undefined}
        />
        <div className="mt-4">
          {stats.length === 0 ? (
            <EmptyState
              title={initialBatchId ? "No rows for this batch" : "No stat rows"}
              description="Import a Backstage snapshot or pick another batch."
            />
          ) : (
            <AdminTable caption="Imported creator stats" minWidth="960px">
              <AdminTableHead>
                <AdminTr>
                  <AdminTh>Creator</AdminTh>
                  <AdminTh>Matched</AdminTh>
                  <AdminTh>Confidence</AdminTh>
                  <AdminTh className="hidden md:table-cell">Source</AdminTh>
                  <AdminTh>Coins</AdminTh>
                  <AdminTh>Hours</AdminTh>
                  <AdminTh className="hidden sm:table-cell">Days</AdminTh>
                  <AdminTh className="hidden lg:table-cell">Active</AdminTh>
                  <AdminTh className="hidden xl:table-cell">Status</AdminTh>
                  <AdminTh className="hidden lg:table-cell">Imported</AdminTh>
                </AdminTr>
              </AdminTableHead>
              <tbody>
                {stats.map((s) => {
                  const cleaned =
                    cleanCreatorNetworkUsername(s.tiktok_username) ?? s.tiktok_username ?? "unknown";
                  const raw = s.tiktok_username_raw?.trim();
                  const suspicious = usernameCleanupWasSuspicious(raw, cleaned);
                  const handle = cleaned.replace(/^@+/, "");
                  return (
                    <AdminTr key={s.id}>
                      <AdminTd>
                        <div className="flex items-center gap-3">
                          <BackstageAvatar
                            backstageImageUrl={s.avatar_url}
                            fallbackBackdropClass="bg-gradient-to-br from-indigo-500 to-violet-600"
                            fallbackInitial={(handle[0] ?? "?").toUpperCase()}
                            className="h-10 w-10"
                          />
                          <div className="min-w-0">
                            <div className="font-medium text-foreground">
                              {s.tiktok_display_name ?? cleaned}
                            </div>
                            <div className="text-xs text-muted">@{handle}</div>
                            {raw && raw.toLowerCase().replace(/\s+/g, "") !== handle ? (
                              <div
                                className="mt-0.5 font-mono text-[10px] text-muted"
                                title="Raw Backstage text"
                              >
                                raw: {raw.slice(0, 48)}
                                {raw.length > 48 ? "…" : ""}
                              </div>
                            ) : null}
                            {suspicious ? (
                              <AdminStatusBadge tone="warning" className="mt-1">
                                Username cleanup
                              </AdminStatusBadge>
                            ) : null}
                          </div>
                        </div>
                      </AdminTd>
                      <AdminTd>
                        {s.profile_id ? (
                          <span className="text-emerald-700 dark:text-emerald-400">
                            {s.matched_profile_username ?? s.matched_email ?? "Yes"}
                          </span>
                        ) : (
                          <AdminStatusBadge tone="warning">Unmatched</AdminStatusBadge>
                        )}
                      </AdminTd>
                      <AdminTd>
                        <AdminStatusBadge
                          tone={
                            s.username_confidence === "high"
                              ? "success"
                              : s.username_confidence === "medium"
                                ? "warning"
                                : "danger"
                          }
                        >
                          {(s.username_confidence ?? "low").toUpperCase()}
                        </AdminStatusBadge>
                      </AdminTd>
                      <AdminTd className="hidden text-xs text-muted md:table-cell">
                        {s.username_source ?? "—"}
                      </AdminTd>
                      <AdminTd className="tabular-nums">{s.coins_earned.toLocaleString()}</AdminTd>
                      <AdminTd className="tabular-nums">{Number(s.hours_streamed).toFixed(1)}</AdminTd>
                      <AdminTd className="hidden tabular-nums sm:table-cell">{s.days_streamed}</AdminTd>
                      <AdminTd className="hidden lg:table-cell">{s.activeness_level}</AdminTd>
                      <AdminTd className="hidden text-muted xl:table-cell">
                        {s.creator_network_status ?? s.invite_status ?? "—"}
                        {s.risk_flag ? ` · ${s.risk_flag}` : ""}
                      </AdminTd>
                      <AdminTd className="hidden whitespace-nowrap text-xs text-muted lg:table-cell">
                        {formatWhen(s.imported_at)}
                      </AdminTd>
                    </AdminTr>
                  );
                })}
              </tbody>
            </AdminTable>
          )}
        </div>
      </section>
    </div>
  );
}
