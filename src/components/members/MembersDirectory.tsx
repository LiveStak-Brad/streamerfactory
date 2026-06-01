"use client";

import { useMemo, useState } from "react";
import { BackstageAvatar } from "@/components/members/BackstageAvatar";
import type { NetworkMember } from "@/lib/members/network-members";
import { memberProfileUrl } from "@/lib/members/network-members";

const AVATAR_BACKDROPS = [
  "bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500",
  "bg-gradient-to-br from-sky-500 to-blue-600",
  "bg-gradient-to-br from-emerald-500 to-teal-600",
  "bg-gradient-to-br from-amber-500 to-orange-600",
  "bg-gradient-to-br from-rose-500 to-pink-600",
  "bg-gradient-to-br from-cyan-500 to-indigo-600",
  "bg-gradient-to-br from-violet-500 to-indigo-600",
  "bg-gradient-to-br from-fuchsia-500 to-rose-500",
] as const;

function avatarInitial(username: string): string {
  const raw = username.replace(/^@+/, "").trim();
  if (!raw) return "?";
  const ch = raw[0];
  return /[a-z]/i.test(ch) ? ch.toUpperCase() : ch;
}

type MembersDirectoryProps = {
  members: readonly NetworkMember[];
  importedAt?: string | null;
  fromImport?: boolean;
};

export function MembersDirectory({ members, importedAt, fromImport }: MembersDirectoryProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...members];
    return members.filter(
      (m) =>
        m.username.toLowerCase().includes(q) || m.displayName.toLowerCase().includes(q),
    );
  }, [members, query]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="relative">
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
          className="w-full rounded-2xl border border-zinc-200/90 bg-surface/90 px-5 py-4 pl-12 text-base font-medium text-zinc-950 shadow-sm outline-none ring-accent/0 transition-[border-color,box-shadow,ring] placeholder:text-zinc-400 focus:border-accent/40 focus:ring-4 focus:ring-accent/15 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-50 dark:placeholder:text-zinc-500"
        />
        <span
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
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

      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
        Showing{" "}
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{filtered.length}</span>{" "}
        of {members.length} — open a profile in TikTok and tap <span className="font-medium">Follow</span>{" "}
        to connect.
        {fromImport && importedAt ? (
          <>
            {" "}
            Photos synced from Creator Network Backstage (
            {new Date(importedAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
            ).
          </>
        ) : null}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-300/90 bg-muted-bg/50 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-950/40">
          <p className="font-semibold text-zinc-800 dark:text-zinc-200">No matches</p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Try a different search term.</p>
        </div>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => {
            const url = memberProfileUrl(m.username);
            const stable = members.findIndex((x) => x.username === m.username);
            const backdrop =
              AVATAR_BACKDROPS[(stable >= 0 ? stable : 0) % AVATAR_BACKDROPS.length];
            return (
              <li key={m.username}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-zinc-200/90 bg-surface/90 p-5 shadow-sm outline-none ring-accent/0 transition-[border-color,box-shadow,transform,ring] hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_12px_40px_-12px_var(--accent-glow)] focus-visible:ring-4 focus-visible:ring-accent/20 dark:border-zinc-800 dark:bg-zinc-950/65 dark:hover:border-accent/30"
                >
                  <div className="flex gap-4">
                    <BackstageAvatar
                      backstageImageUrl={m.avatarUrl}
                      fallbackBackdropClass={backdrop}
                      fallbackInitial={avatarInitial(m.username)}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                        {m.displayName}
                      </p>
                      <p className="mt-0.5 truncate text-sm text-zinc-500 dark:text-zinc-400">
                        @{m.username}
                      </p>
                    </div>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent dark:text-accent-muted">
                    <span>Open in TikTok</span>
                    <span
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
