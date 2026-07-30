import {
  HISTORICAL_MONTHS_SEED,
  LEGEND_CATEGORIES_SEED,
  LEGEND_HOLDERS_SEED,
  NETWORK_MANAGERS_SEED,
  RUNNER_UP_START_MONTH,
} from "@/lib/hall-of-fame/seed";
import {
  archivePlaceCount,
  compareYearMonthDesc,
  yearMonthFromDate,
} from "@/lib/hall-of-fame/months";
import type {
  FactoryLegend,
  HallOfFameMonth,
  HallOfFamePageData,
  HallOfFamePlacement,
  NetworkManager,
  YearMonth,
} from "@/lib/hall-of-fame/types";
import { displayLabelForHandle } from "@/lib/rankings/leaderboard-from-seed";
import { getLeaderboardWithMeta } from "@/lib/rankings/queries";
import { rankingBadge } from "@/lib/rankings/scoring";
import { toDateString } from "@/lib/rankings/periods";
import { createClient } from "@/lib/supabase/server";

function isMissingRelation(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return error.code === "42P01" || (error.message?.includes("does not exist") ?? false);
}

function normalizeHandle(raw: string): string {
  return raw.replace(/^@+/, "").trim().toLowerCase();
}

type MonthRow = {
  year_month: string;
  status: string;
  locked_at: string | null;
  source: string | null;
};

type PlacementRow = {
  year_month: string;
  place: number;
  display_name: string;
  tiktok_username: string;
  avatar_url: string | null;
  badge: string;
  network_level: number | null;
  profile_id: string | null;
};

function mapPlacement(row: PlacementRow): HallOfFamePlacement | null {
  const place = row.place;
  if (place < 1 || place > 5) return null;
  return {
    place: place as 1 | 2 | 3 | 4 | 5,
    displayName: row.display_name,
    tiktokUsername: normalizeHandle(row.tiktok_username),
    avatarUrl: row.avatar_url,
    badge: row.badge,
    networkLevel: row.network_level,
    profileId: row.profile_id,
  };
}

async function loadArchivedMonthsFromDb(): Promise<HallOfFameMonth[] | null> {
  try {
    const supabase = await createClient();
    const { data: months, error } = await supabase
      .from("hall_of_fame_months")
      .select("year_month, status, locked_at, source")
      .eq("status", "locked")
      .order("year_month", { ascending: false });

    if (error) {
      if (isMissingRelation(error)) return null;
      return null;
    }
    if (!months?.length) return [];

    const keys = (months as MonthRow[]).map((m) => m.year_month);
    const { data: placements, error: pErr } = await supabase
      .from("hall_of_fame_placements")
      .select(
        "year_month, place, display_name, tiktok_username, avatar_url, badge, network_level, profile_id",
      )
      .in("year_month", keys)
      .order("place", { ascending: true });

    if (pErr) {
      if (isMissingRelation(pErr)) return null;
      return null;
    }

    const byMonth = new Map<string, HallOfFamePlacement[]>();
    for (const row of (placements ?? []) as PlacementRow[]) {
      const mapped = mapPlacement(row);
      if (!mapped) continue;
      const list = byMonth.get(row.year_month) ?? [];
      list.push(mapped);
      byMonth.set(row.year_month, list);
    }

    return (months as MonthRow[]).map((m) => ({
      yearMonth: m.year_month,
      status: "locked" as const,
      lockedAt: m.locked_at,
      source: m.source === "seed" ? "seed" : "archive",
      placements: byMonth.get(m.year_month) ?? [],
    }));
  } catch {
    return null;
  }
}

async function loadManagersFromDb(): Promise<NetworkManager[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("hall_of_fame_managers")
      .select("id, display_name, title, contact_handle, avatar_url, sort_order, is_primary")
      .order("sort_order", { ascending: true });

    if (error) {
      if (isMissingRelation(error)) return null;
      return null;
    }
    if (!data?.length) return [];

    return data.map((row) => ({
      id: row.id as string,
      displayName: row.display_name as string,
      title: row.title as string,
      contactHandle: normalizeHandle(row.contact_handle as string),
      avatarUrl: (row.avatar_url as string | null) ?? null,
      sortOrder: (row.sort_order as number) ?? 0,
      isPrimary: Boolean(row.is_primary),
    }));
  } catch {
    return null;
  }
}

async function loadLegendsFromDb(): Promise<FactoryLegend[] | null> {
  try {
    const supabase = await createClient();
    const { data: categories, error } = await supabase
      .from("hall_of_fame_legend_categories")
      .select("key, title, description, sort_order")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      if (isMissingRelation(error)) return null;
      return null;
    }
    if (!categories?.length) return [];

    const { data: holders, error: hErr } = await supabase
      .from("hall_of_fame_legend_holders")
      .select("category_key, display_name, tiktok_username, avatar_url, value_label, achieved_at");

    if (hErr) {
      if (isMissingRelation(hErr)) return null;
      return null;
    }

    const holderByKey = new Map(
      (holders ?? []).map((h) => [
        h.category_key as string,
        {
          categoryKey: h.category_key as string,
          displayName: h.display_name as string,
          tiktokUsername: normalizeHandle(h.tiktok_username as string),
          avatarUrl: (h.avatar_url as string | null) ?? null,
          valueLabel: (h.value_label as string | null) ?? null,
          achievedAt: (h.achieved_at as string | null) ?? null,
        },
      ]),
    );

    return categories.map((c) => ({
      key: c.key as string,
      title: c.title as string,
      description: c.description as string,
      sortOrder: (c.sort_order as number) ?? 0,
      holder: holderByKey.get(c.key as string) ?? null,
    }));
  } catch {
    return null;
  }
}

function mergeArchivedMonths(dbMonths: HallOfFameMonth[] | null): HallOfFameMonth[] {
  const byKey = new Map<YearMonth, HallOfFameMonth>();

  for (const m of HISTORICAL_MONTHS_SEED) {
    byKey.set(m.yearMonth, m);
  }
  if (dbMonths) {
    for (const m of dbMonths) {
      byKey.set(m.yearMonth, m);
    }
  }

  return [...byKey.values()]
    .filter((m) => m.placements.length > 0)
    .sort((a, b) => compareYearMonthDesc(a.yearMonth, b.yearMonth));
}

function seedLegends(): FactoryLegend[] {
  const holders = new Map(LEGEND_HOLDERS_SEED.map((h) => [h.categoryKey, h]));
  return LEGEND_CATEGORIES_SEED.map((c) => ({
    ...c,
    holder: holders.get(c.key) ?? null,
  }));
}

/** Build a provisional live month from the current leaderboard (not locked). */
export async function getLiveHallOfFameMonth(
  yearMonth: YearMonth = yearMonthFromDate(),
): Promise<HallOfFameMonth | null> {
  const placeCount = archivePlaceCount(yearMonth);
  const anchor = toDateString(new Date(Date.UTC(
    Number(yearMonth.slice(0, 4)),
    Number(yearMonth.slice(5, 7)) - 1,
    15,
  )));

  try {
    const { entries } = await getLeaderboardWithMeta("monthly", anchor);
    if (!entries.length) return null;

    const placements: HallOfFamePlacement[] = entries.slice(0, placeCount).map((entry, i) => {
      const place = (i + 1) as 1 | 2 | 3 | 4 | 5;
      const handle = normalizeHandle(entry.tiktok_username ?? entry.profile_id);
      return {
        place,
        displayName: handle ? displayLabelForHandle(handle) : entry.email ?? "Creator",
        tiktokUsername: handle,
        avatarUrl: entry.avatar_url ?? null,
        badge: rankingBadge(entry.rank_position, true),
        networkLevel: null,
        profileId: /^[0-9a-f-]{36}$/i.test(entry.profile_id) ? entry.profile_id : null,
      };
    });

    if (!placements.length) return null;

    return {
      yearMonth,
      status: "live",
      source: "live",
      placements,
    };
  } catch {
    return null;
  }
}

export async function getHallOfFamePageData(): Promise<HallOfFamePageData> {
  const [dbMonths, dbManagers, dbLegends] = await Promise.all([
    loadArchivedMonthsFromDb(),
    loadManagersFromDb(),
    loadLegendsFromDb(),
  ]);

  const archivedMonths = mergeArchivedMonths(dbMonths);
  const archivedKeys = new Set(archivedMonths.map((m) => m.yearMonth));
  const currentYm = yearMonthFromDate();

  let liveMonth: HallOfFameMonth | null = null;
  if (!archivedKeys.has(currentYm)) {
    liveMonth = await getLiveHallOfFameMonth(currentYm);
  }

  const managers =
    dbManagers && dbManagers.length > 0
      ? dbManagers
      : [...NETWORK_MANAGERS_SEED];

  const legends = dbLegends && dbLegends.length > 0 ? dbLegends : seedLegends();

  return {
    managers,
    archivedMonths,
    liveMonth,
    legends,
    runnerUpStartMonth: RUNNER_UP_START_MONTH,
  };
}

export async function isMonthArchived(yearMonth: YearMonth): Promise<boolean> {
  const archived = mergeArchivedMonths(await loadArchivedMonthsFromDb());
  return archived.some((m) => m.yearMonth === yearMonth);
}
