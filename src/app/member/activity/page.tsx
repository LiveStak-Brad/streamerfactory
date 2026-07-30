import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Activity",
  description: "Factory community activity feed.",
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstString(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export default async function MemberActivityPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const filter = firstString(sp.type) ?? "all";
  const supabase = await createClient();

  let q = supabase
    .from("activity_feed")
    .select("id, event_type, summary, created_at, visibility")
    .in("visibility", ["public", "members"])
    .order("created_at", { ascending: false })
    .limit(50);

  if (filter !== "all") {
    q = q.eq("event_type", filter);
  }

  const { data } = await q;
  const rows = data ?? [];

  const filters = [
    { key: "all", label: "All" },
    { key: "achievement_unlocked", label: "Achievements" },
    { key: "onboarding_completed", label: "Onboarding" },
    { key: "mission_completed", label: "Missions" },
    { key: "battle_joined", label: "Battles" },
  ];

  return (
    <div className="border-b border-border/70 bg-muted-bg/40 pb-16 pt-8 dark:border-zinc-800 dark:bg-zinc-950/50 sm:pt-10">
      <Container className="max-w-3xl space-y-6">
        <header className="space-y-2">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
            Community
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Activity</h1>
          <p className="text-sm text-muted">
            Real Factory progress only — never fabricated.{" "}
            <Link href="/member/dashboard" className="font-semibold text-accent hover:underline dark:text-accent-muted">
              Dashboard
            </Link>
          </p>
        </header>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Link
              key={f.key}
              href={f.key === "all" ? "/member/activity" : `/member/activity?type=${f.key}`}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                filter === f.key
                  ? "bg-foreground text-background"
                  : "border border-border/80 text-muted hover:text-foreground dark:border-zinc-700"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>

        {rows.length === 0 ? (
          <p className="rounded-2xl border border-border/80 bg-surface/90 px-4 py-6 text-sm text-muted dark:border-zinc-800">
            No activity yet for this filter.
          </p>
        ) : (
          <ul className="space-y-2">
            {rows.map((row) => (
              <li
                key={row.id}
                className="rounded-2xl border border-border/80 bg-surface/90 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/45"
              >
                <p className="text-sm text-foreground">{row.summary}</p>
                <p className="mt-1 text-[0.65rem] text-muted">
                  {row.event_type} · {new Date(row.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
