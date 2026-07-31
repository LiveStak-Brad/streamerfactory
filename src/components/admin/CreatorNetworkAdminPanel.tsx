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
            <AdminTable caption="Import batches" minWidth="960px">
              <AdminTableHead>
                <AdminTr>
                  <AdminTh>When</AdminTh>
                  <AdminTh>Dataset</AdminTh>
                  <AdminTh>Parser</AdminTh>
                  <AdminTh>Conf</AdminTh>
                  <AdminTh>Status</AdminTh>
                  <AdminTh>Rows</AdminTh>
                  <AdminTh>Diagnostics</AdminTh>
                  <AdminTh>Batch</AdminTh>
                </AdminTr>
              </AdminTableHead>
              <tbody>
                {batches.map((b) => {
                  const failures = Array.isArray(b.validation_failures)
                    ? b.validation_failures
                    : [];
                  const warnings = Array.isArray(b.validation_warnings)
                    ? b.validation_warnings
                    : [];
                  const fieldsUpdated = Array.isArray(b.fields_updated) ? b.fields_updated : [];
                  const fieldsPreserved = Array.isArray(b.fields_preserved)
                    ? b.fields_preserved
                    : [];
                  const roster = b.roster_diff_preview;
                  return (
                    <AdminTr key={b.id}>
                      <AdminTd className="whitespace-nowrap text-muted">
                        {formatWhen(b.created_at)}
                      </AdminTd>
                      <AdminTd>
                        <div>{b.dataset_type ?? b.detected_page_type ?? "—"}</div>
                        {b.relationship_tab ? (
                          <div className="text-xs text-muted">{b.relationship_tab}</div>
                        ) : null}
                      </AdminTd>
                      <AdminTd className="font-mono text-xs">
                        {b.parser_version ?? "—"}
                        {b.extension_version ? (
                          <div className="text-muted">ext {b.extension_version}</div>
                        ) : null}
                      </AdminTd>
                      <AdminTd className="tabular-nums">
                        {b.confidence != null ? `${Math.round(Number(b.confidence) * 100)}%` : "—"}
                      </AdminTd>
                      <AdminTd>
                        <AdminStatusBadge
                          tone={
                            b.status === "failed"
                              ? "danger"
                              : b.status === "completed"
                                ? "success"
                                : "neutral"
                          }
                        >
                          {b.status}
                        </AdminStatusBadge>
                        {b.error_message ? (
                          <div className="mt-1 max-w-[220px] text-xs text-danger">
                            {b.error_message}
                          </div>
                        ) : null}
                      </AdminTd>
                      <AdminTd className="tabular-nums text-xs">
                        <div>raw {b.raw_rows_count}</div>
                        <div>ok {b.accepted_rows_count}</div>
                        <div>rej {b.rejected_rows_count}</div>
                      </AdminTd>
                      <AdminTd className="max-w-[280px] text-xs text-muted">
                        {failures.length > 0 ? (
                          <div className="text-danger">Blocked: {failures.slice(0, 2).join("; ")}</div>
                        ) : null}
                        {warnings.length > 0 ? (
                          <div>Warn: {warnings.slice(0, 2).join("; ")}</div>
                        ) : null}
                        {fieldsUpdated.length > 0 ? (
                          <div>Updated: {fieldsUpdated.join(", ")}</div>
                        ) : null}
                        {fieldsPreserved.length > 0 ? (
                          <div>Preserved: {fieldsPreserved.slice(0, 3).join(", ")}</div>
                        ) : null}
                        {roster ? (
                          <div>
                            Roster preview: {(roster.missingFromBackstage ?? []).length} missing ·{" "}
                            {(roster.newCreatorCandidates ?? []).length} new ·{" "}
                            {(roster.websiteOnlyStaticEntries ?? []).length} static-only
                          </div>
                        ) : null}
                        {b.captured_at ? <div>Captured {formatWhen(b.captured_at)}</div> : null}
                      </AdminTd>
                      <AdminTd>
                        <Link
                          href={`/admin/creator-network?batchId=${b.id}`}
                          className="font-mono text-xs font-semibold text-accent hover:underline dark:text-accent-muted"
                        >
                          {b.id.slice(0, 8)}…
                        </Link>
                      </AdminTd>
                    </AdminTr>
                  );
                })}
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
                      <AdminTd className="tabular-nums">
                        {s.coins_earned == null && s.diamonds_earned == null
                          ? "—"
                          : (s.diamonds_earned ?? s.coins_earned)!.toLocaleString()}
                      </AdminTd>
                      <AdminTd className="tabular-nums">
                        {s.hours_streamed == null
                          ? "—"
                          : Number(s.hours_streamed).toFixed(1)}
                      </AdminTd>
                      <AdminTd className="hidden tabular-nums sm:table-cell">
                        {s.days_streamed == null ? "—" : s.days_streamed}
                      </AdminTd>
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
