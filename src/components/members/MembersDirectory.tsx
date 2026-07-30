"use client";

import { useMemo, useState } from "react";
import { CreatorCard } from "@/components/ui/CreatorCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { NetworkMember } from "@/lib/members/network-members";
import { rankingBadge } from "@/lib/rankings/scoring";
import type { LeaderboardEntry } from "@/lib/rankings/types";

type SortMode = "alpha" | "rank";

type MembersDirectoryProps = {
  members: readonly NetworkMember[];
  importedAt?: string | null;
  fromImport?: boolean;
  /** Optional monthly board for rank badges + highest-ranked sort */
  rankings?: readonly LeaderboardEntry[];
};

function normalizeHandle(raw: string): string {
  return raw.replace(/^@+/, "").trim().toLowerCase();
}

export function MembersDirectory({
  members,
  importedAt,
  fromImport,
  rankings = [],
}: MembersDirectoryProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("rank");

  const rankByHandle = useMemo(() => {
    const map = new Map<string, LeaderboardEntry>();
    for (const e of rankings) {
      const h = normalizeHandle(e.tiktok_username ?? "");
      if (h) map.set(h, e);
    }
    return map;
  }, [rankings]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? members.filter(
          (m) =>
            m.username.toLowerCase().includes(q) || m.displayName.toLowerCase().includes(q),
        )
      : [...members];

    if (sort === "alpha") {
      list.sort((a, b) => a.displayName.localeCompare(b.displayName, undefined, { sensitivity: "base" }));
    } else {
      list.sort((a, b) => {
        const ra = rankByHandle.get(normalizeHandle(a.username))?.rank_position ?? 9999;
        const rb = rankByHandle.get(normalizeHandle(b.username))?.rank_position ?? 9999;
        if (ra !== rb) return ra - rb;
        return a.displayName.localeCompare(b.displayName, undefined, { sensitivity: "base" });
      });
    }
    return list;
  }, [members, query, sort, rankByHandle]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <label htmlFor="members-search" className="sr-only">
            Search members by TikTok handle or display name
          </label>
          <input
            id="members-search"
            type="search"
            inputMode="search"
            autoComplete="off"
            placeholder="Search by @handle or name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl border border-border/80 bg-surface/90 px-5 py-3.5 pl-12 text-base font-medium text-foreground shadow-sm outline-none transition focus:border-accent/40 focus:ring-4 focus:ring-accent/15 dark:border-zinc-700 dark:bg-zinc-950/70"
          />
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path
                d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M16 16 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        <div
          className="inline-flex rounded-xl border border-border/80 bg-muted-bg/60 p-0.5 dark:border-zinc-700"
          role="group"
          aria-label="Sort members"
        >
          <button
            type="button"
            onClick={() => setSort("rank")}
            className={`rounded-lg px-3.5 py-2.5 text-sm font-semibold transition ${
              sort === "rank"
                ? "bg-surface text-foreground shadow-sm dark:bg-zinc-900"
                : "text-muted hover:text-foreground"
            }`}
          >
            Highest ranked
          </button>
          <button
            type="button"
            onClick={() => setSort("alpha")}
            className={`rounded-lg px-3.5 py-2.5 text-sm font-semibold transition ${
              sort === "alpha"
                ? "bg-surface text-foreground shadow-sm dark:bg-zinc-900"
                : "text-muted hover:text-foreground"
            }`}
          >
            A–Z
          </button>
        </div>
      </div>

      <p className="mt-3 text-sm text-muted">
        Showing{" "}
        <span className="font-semibold text-foreground/80">{filtered.length}</span> of {members.length}{" "}
        — open a profile in TikTok and follow to connect.
        {fromImport && importedAt ? (
          <>
            {" "}
            Photos synced from Creator Network (
            {new Date(importedAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
            ).
          </>
        ) : null}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-10 items-center text-center"
          title="No matches"
          description="Try a different search term or clear the filter."
          illustration="members"
          action={
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              Clear search
            </button>
          }
        />
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m, index) => {
            const entry = rankByHandle.get(normalizeHandle(m.username));
            const stable = members.findIndex((x) => x.username === m.username);
            return (
              <li key={m.username}>
                <CreatorCard
                  username={m.username}
                  displayName={m.displayName}
                  avatarUrl={m.avatarUrl ?? entry?.avatar_url}
                  rankPosition={entry?.rank_position ?? null}
                  badge={entry ? rankingBadge(entry.rank_position, true) : null}
                  toneIndex={stable >= 0 ? stable : index}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
