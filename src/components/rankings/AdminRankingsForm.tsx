"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import {
  importBackstageSnapshotAction,
  recalculateRankingsAction,
  savePerformanceStatsAction,
} from "@/lib/rankings/actions";
import { periodBounds, formatPeriodLabel } from "@/lib/rankings/periods";
import { ACTIVENESS_LEVELS, RANKING_PERIODS, type ActivenessLevel, type RankingPeriod } from "@/lib/rankings/types";
import type { PerformanceStatsRow } from "@/lib/rankings/types";
import type { NetworkMemberListRow } from "@/lib/profiles/queries";

type AdminRankingsFormProps = {
  members: NetworkMemberListRow[];
  existingStats: PerformanceStatsRow[];
  periodKind: RankingPeriod;
  periodAnchor: string;
};

export function AdminRankingsForm({
  members,
  existingStats,
  periodKind: initialKind,
  periodAnchor: initialAnchor,
}: AdminRankingsFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [periodKind, setPeriodKind] = useState<RankingPeriod>(initialKind);
  const [periodAnchor, setPeriodAnchor] = useState(initialAnchor);
  const [profileId, setProfileId] = useState(members[0]?.id ?? "");
  const [memberQuery, setMemberQuery] = useState("");

  const bounds = useMemo(
    () => periodBounds(periodKind, new Date(`${periodAnchor}T12:00:00Z`)),
    [periodKind, periodAnchor],
  );

  const statForMember = existingStats.find((s) => s.profile_id === profileId);

  const [coins, setCoins] = useState(String(statForMember?.coins_earned ?? 0));
  const [days, setDays] = useState(String(statForMember?.days_streamed ?? 0));
  const [hours, setHours] = useState(String(statForMember?.hours_streamed ?? 0));
  const [activeness, setActiveness] = useState<ActivenessLevel>(
    (statForMember?.activeness_level as ActivenessLevel) ?? "none",
  );
  const [followers, setFollowers] = useState(String(statForMember?.follower_count ?? 0));
  const [followerGrowth, setFollowerGrowth] = useState(String(statForMember?.follower_growth ?? 0));
  const [battlesPlayed, setBattlesPlayed] = useState(String(statForMember?.battles_played ?? 0));
  const [battlesWon, setBattlesWon] = useState(String(statForMember?.battles_won ?? 0));

  const filteredMembers = useMemo(() => {
    const q = memberQuery.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        (m.email ?? "").toLowerCase().includes(q) ||
        (m.tiktok_username ?? "").toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q),
    );
  }, [members, memberQuery]);

  function loadMemberStats(id: string) {
    setProfileId(id);
    const s = existingStats.find((r) => r.profile_id === id);
    setCoins(String(s?.coins_earned ?? 0));
    setDays(String(s?.days_streamed ?? 0));
    setHours(String(s?.hours_streamed ?? 0));
    setActiveness((s?.activeness_level as ActivenessLevel) ?? "none");
    setFollowers(String(s?.follower_count ?? 0));
    setFollowerGrowth(String(s?.follower_growth ?? 0));
    setBattlesPlayed(String(s?.battles_played ?? 0));
    setBattlesWon(String(s?.battles_won ?? 0));
  }

  function applyPeriodToUrl() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", periodKind);
    params.set("anchor", periodAnchor);
    router.push(`/admin/rankings?${params.toString()}`);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-accent/30 bg-accent/5 p-6 dark:border-accent/25 dark:bg-accent/10">
        <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Import backstage snapshot</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Loads Creator Network stats from the screenshots you provided (coins, live days, hours, TikTok
          levels → activeness). Matches members by <code className="text-xs">profiles.tiktok_username</code>{" "}
          or their application handle, then recalculates the weekly leaderboard.
        </p>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              setError(null);
              setMessage(null);
              const res = await importBackstageSnapshotAction();
              if (!res.ok) {
                setError(res.error);
                return;
              }
              setMessage(
                `Imported ${res.inserted.length} creators for ${res.periodStart} → ${res.periodEnd}. Ranked ${res.rankedCount}.` +
                  (res.missing.length
                    ? ` Missing profile for: ${res.missing.slice(0, 8).join(", ")}${res.missing.length > 8 ? "…" : ""}`
                    : "") +
                  (res.topFive.length
                    ? ` Top: ${res.topFive.map((t) => `#${t.rank_position} @${t.handle}`).join(", ")}`
                    : ""),
              );
              router.refresh();
            })
          }
          className="mt-4 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground disabled:opacity-60 dark:text-zinc-950"
        >
          {pending ? "Importing…" : "Import backstage stats & rank"}
        </button>
      </section>

      <section className="rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50">
        <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Period</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Match TikTok Creator Network backstage dates. Weekly uses Monday–Sunday (UTC).
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Ranking period</span>
            <select
              value={periodKind}
              onChange={(e) => setPeriodKind(e.target.value as RankingPeriod)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            >
              {RANKING_PERIODS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Anchor date</span>
            <input
              type="date"
              value={periodAnchor}
              onChange={(e) => setPeriodAnchor(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <button
            type="button"
            onClick={applyPeriodToUrl}
            className="self-end rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold hover:bg-muted-bg dark:border-zinc-600"
          >
            Load period
          </button>
        </div>
        <p className="mt-3 text-sm text-zinc-500">
          Active range: {formatPeriodLabel(periodKind, bounds.periodStart, bounds.periodEnd)}
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50">
        <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Override one member (optional)</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Only needed to fix a single row. Weekly rankings already use the backstage snapshot you provided.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            <span className="font-medium">Search member</span>
            <input
              type="search"
              value={memberQuery}
              onChange={(e) => setMemberQuery(e.target.value)}
              placeholder="Email or @handle…"
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            <span className="font-medium">Member</span>
            <select
              value={profileId}
              onChange={(e) => loadMemberStats(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            >
              {filteredMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.tiktok_username ? `@${m.tiktok_username.replace(/^@/, "")}` : m.email ?? m.id.slice(0, 8)}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Diamonds earned</span>
            <input
              type="number"
              min={0}
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Days streamed</span>
            <input
              type="number"
              min={0}
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Hours streamed</span>
            <input
              type="number"
              min={0}
              step={0.1}
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Activeness level</span>
            <select
              value={activeness}
              onChange={(e) => setActiveness(e.target.value as ActivenessLevel)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            >
              {ACTIVENESS_LEVELS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Follower count</span>
            <input
              type="number"
              min={0}
              value={followers}
              onChange={(e) => setFollowers(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Follower growth</span>
            <input
              type="number"
              value={followerGrowth}
              onChange={(e) => setFollowerGrowth(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Battles played</span>
            <input
              type="number"
              min={0}
              value={battlesPlayed}
              onChange={(e) => setBattlesPlayed(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Battles won</span>
            <input
              type="number"
              min={0}
              value={battlesWon}
              onChange={(e) => setBattlesWon(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
        </div>

        {error ? (
          <p className="mt-4 text-sm font-medium text-rose-600 dark:text-rose-400" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="mt-4 text-sm font-medium text-emerald-700 dark:text-emerald-300">{message}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={pending || !profileId}
            onClick={() =>
              startTransition(async () => {
                setError(null);
                setMessage(null);
                const res = await savePerformanceStatsAction({
                  profileId,
                  periodKind,
                  periodAnchor,
                  coinsEarned: Number(coins),
                  daysStreamed: Number(days),
                  hoursStreamed: Number(hours),
                  activenessLevel: activeness,
                  followerCount: Number(followers),
                  followerGrowth: Number(followerGrowth),
                  battlesPlayed: Number(battlesPlayed),
                  battlesWon: Number(battlesWon),
                });
                if (!res.ok) setError(res.error ?? "Save failed.");
                else {
                  setMessage("Saved and rankings recalculated.");
                  router.refresh();
                }
              })
            }
            className="rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-zinc-950"
          >
            {pending ? "Saving…" : "Save & recalculate"}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                setError(null);
                setMessage(null);
                const res = await recalculateRankingsAction(periodKind, periodAnchor);
                if (!res.ok) setError(res.error ?? "Recalculate failed.");
                else {
                  setMessage("Rankings recalculated for this period.");
                  router.refresh();
                }
              })
            }
            className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-semibold dark:border-zinc-600"
          >
            Recalculate only
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
          Stats entered this period ({existingStats.length})
        </h2>
        <ul className="mt-4 space-y-2 text-sm">
          {existingStats.length === 0 ? (
            <li className="text-zinc-500">None yet for this period.</li>
          ) : (
            existingStats.map((s) => {
              const m = members.find((x) => x.id === s.profile_id);
              return (
                <li
                  key={s.id}
                  className="flex flex-wrap justify-between gap-2 rounded-lg border border-zinc-200/80 px-3 py-2 dark:border-zinc-800"
                >
                  <span className="font-medium">
                    {m?.tiktok_username ? `@${m.tiktok_username.replace(/^@/, "")}` : m?.email ?? s.profile_id.slice(0, 8)}
                  </span>
                  <span className="text-zinc-500">
                    {s.coins_earned.toLocaleString()} diamonds · {Number(s.hours_streamed).toFixed(1)}h · {s.days_streamed}d · {s.activeness_level}
                  </span>
                </li>
              );
            })
          )}
        </ul>
      </section>
    </div>
  );
}
