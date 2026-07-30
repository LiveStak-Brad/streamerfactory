import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MemberPageHeader } from "@/components/member/MemberPageHeader";
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

const EVENT_LABELS: Record<string, string> = {
  achievement_unlocked: "Achievement",
  onboarding_completed: "Onboarding",
  onboarding_task_completed: "Onboarding",
  mission_completed: "Mission",
  battle_joined: "Battle",
  battle_completed: "Battle",
  streameru_live_mission_completed: "Training",
  lesson_completed: "Training",
  title_unlocked: "Reputation",
  referral_accepted: "Referral",
  creator_joined: "Community",
};

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
        <MemberPageHeader
          eyebrow="Community"
          title="Activity"
          description="Real Factory progress only — never fabricated."
        />

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Link
              key={f.key}
              href={f.key === "all" ? "/member/activity" : `/member/activity?type=${f.key}`}
              className={`inline-flex min-h-[40px] items-center rounded-xl px-3.5 text-sm font-semibold ${
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
          <div className="rounded-2xl border border-dashed border-border/80 bg-surface/90 px-5 py-8 dark:border-zinc-800">
            <p className="text-base font-semibold text-foreground">No activity here yet</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Complete a mission or unlock an achievement and it will show up in the Factory feed.
            </p>
            <Link
              href="/member/dashboard"
              className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              Go to today&apos;s missions →
            </Link>
          </div>
        ) : (
          <ul className="space-y-2">
            {rows.map((row) => (
              <li
                key={row.id}
                className="rounded-2xl border border-border/80 bg-surface/90 px-4 py-3.5 dark:border-zinc-800 dark:bg-zinc-950/45"
              >
                <p className="text-sm text-foreground">{row.summary}</p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted">
                  {EVENT_LABELS[row.event_type] ?? "Update"} ·{" "}
                  {new Date(row.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
