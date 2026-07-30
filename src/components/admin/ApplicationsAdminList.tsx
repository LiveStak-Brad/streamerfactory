"use client";

import { useMemo, useState } from "react";
import { ApplicationDeleteButton } from "@/components/admin/ApplicationDeleteButton";
import { ApplicationStatusAdminControls } from "@/components/admin/ApplicationStatusAdminControls";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { AdminStatusBadge, type AdminBadgeTone } from "@/components/admin/ui/AdminStatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import type { ApplicationPipelineStatus, ApplicationRow } from "@/lib/applications/types";

const followerLabels: Record<string, string> = {
  "under-1k": "Under 1,000",
  "1k-10k": "1,000 – 10,000",
  "10k-50k": "10,000 – 50,000",
  "50k-100k": "50,000 – 100,000",
  "100k-plus": "100,000+",
};

function tiktokProfileUrl(raw: string): string {
  const h = raw.trim().replace(/^@/, "");
  if (!h) return "https://www.tiktok.com/";
  return `https://www.tiktok.com/@${encodeURIComponent(h)}`;
}

function statusTone(status: ApplicationPipelineStatus): AdminBadgeTone {
  switch (status) {
    case "submitted":
      return "neutral";
    case "in_review":
      return "info";
    case "approved":
      return "success";
    case "rejected":
      return "danger";
    default:
      return "neutral";
  }
}

function statusLabel(status: ApplicationPipelineStatus): string {
  switch (status) {
    case "submitted":
      return "Received";
    case "in_review":
      return "In review";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
}

type Filter = "all" | ApplicationPipelineStatus;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "submitted", label: "Received" },
  { id: "in_review", label: "In review" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

type Props = {
  rows: ApplicationRow[];
};

/** Client list with status filter + search over existing application rows. */
export function ApplicationsAdminList({ rows }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((app) => {
      if (filter !== "all" && app.status !== filter) return false;
      if (!q) return true;
      return (
        app.full_name.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q) ||
        app.tiktok_username.toLowerCase().includes(q) ||
        app.country.toLowerCase().includes(q)
      );
    });
  }, [rows, filter, query]);

  if (rows.length === 0) {
    return (
      <EmptyState
        title="No applications yet"
        description="When creators submit a website access request, they appear here for review."
        illustration="members"
        action={
          <Button href="/apply" variant="secondary" className="min-h-[40px] px-4 text-sm">
            View Join page
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
          {filters.map((f) => {
            const count =
              f.id === "all" ? rows.length : rows.filter((r) => r.status === f.id).length;
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  active
                    ? "bg-foreground text-background"
                    : "bg-muted-bg text-muted hover:text-foreground dark:bg-zinc-900"
                }`}
              >
                {f.label}
                <span className="ml-1.5 tabular-nums opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
        <label className="block min-w-[min(100%,16rem)] sm:ml-auto">
          <span className="sr-only">Search applications</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, TikTok…"
            className="w-full rounded-xl border border-border/90 bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-900/80"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No matches"
          description="Try another status filter or clear the search."
          action={
            <Button
              type="button"
              variant="secondary"
              className="min-h-[40px] px-4 text-sm"
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <ul className="space-y-4">
          {filtered.map((app) => (
            <li key={app.id}>
              <AdminPanel raised>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(app.created_at))}
                    </p>
                    <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground">
                      {app.full_name}
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <AdminStatusBadge tone={statusTone(app.status)}>
                      {statusLabel(app.status)}
                    </AdminStatusBadge>
                    <AdminStatusBadge tone="success">Consent to contact</AdminStatusBadge>
                  </div>
                </div>

                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-medium text-muted">Email</dt>
                    <dd className="mt-0.5">
                      <a
                        href={`mailto:${encodeURIComponent(app.email)}`}
                        className="font-semibold text-accent hover:underline dark:text-accent-muted"
                      >
                        {app.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted">TikTok</dt>
                    <dd className="mt-0.5">
                      <a
                        href={tiktokProfileUrl(app.tiktok_username)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-accent hover:underline dark:text-accent-muted"
                      >
                        {app.tiktok_username.startsWith("@")
                          ? app.tiktok_username
                          : `@${app.tiktok_username}`}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted">Country</dt>
                    <dd className="mt-0.5 text-foreground">{app.country}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted">Followers</dt>
                    <dd className="mt-0.5 text-foreground">
                      {followerLabels[app.follower_range] ?? app.follower_range}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted">Goes live on TikTok?</dt>
                    <dd className="mt-0.5 text-foreground">
                      {app.goes_live === "yes" ? "Yes" : "No"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 border-t border-border/70 pt-5 dark:border-zinc-800">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Why they want to join
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                    {app.why_join}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                  <p className="font-mono text-xs text-muted">ID: {app.id}</p>
                  {app.user_id ? (
                    <p className="text-xs text-muted">
                      Linked account:{" "}
                      <span className="font-mono text-foreground/80">{app.user_id}</span>
                    </p>
                  ) : null}
                </div>
                <ApplicationStatusAdminControls applicationId={app.id} status={app.status} />
                <ApplicationDeleteButton applicationId={app.id} />
              </AdminPanel>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
