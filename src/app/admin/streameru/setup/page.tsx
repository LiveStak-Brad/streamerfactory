import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { AdminSectionTitle } from "@/components/admin/ui/AdminSectionTitle";
import { SyncBriefsButton } from "@/components/admin/streameru-media/SyncBriefsButton";
import { LessonMediaTaskCard } from "@/components/admin/streameru-media/LessonMediaTaskCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCard } from "@/components/ui/StatCard";
import { requireAdmin } from "@/lib/auth/server";
import { CURRICULUM } from "@/lib/resources/curriculum";
import {
  SETUP_FILTER_LABELS,
  filterSetupAssets,
  type SetupFilterKey,
} from "@/lib/streameru-media/filters";
import { getSetupHubStats, listLessonMediaAssets } from "@/lib/streameru-media/queries";
import { scoreLessonProduction } from "@/lib/streameru-media/scoring";

export const metadata = {
  title: "Complete StreamerU Setup",
  description: "Production briefs, Needs Brad queue, and lesson media publication workflow.",
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function param(sp: Record<string, string | string[] | undefined>, key: string): string | null {
  const v = sp[key];
  return typeof v === "string" && v.length > 0 ? v : null;
}

function hrefWith(
  base: Record<string, string | null>,
  patch: Record<string, string | null>,
): string {
  const merged = { ...base, ...patch };
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(merged)) {
    if (v) qs.set(k, v);
  }
  const s = qs.toString();
  return s ? `/admin/streameru/setup?${s}` : "/admin/streameru/setup";
}

export default async function StreamerUSetupPage({ searchParams }: PageProps) {
  await requireAdmin();
  const sp = await searchParams;
  const filter = (param(sp, "filter") ?? "needs_brad") as SetupFilterKey;
  const lesson = param(sp, "lesson");
  const assetType = param(sp, "type");
  const program = param(sp, "program");
  const priority = param(sp, "priority");

  const [stats, assets] = await Promise.all([
    getSetupHubStats().catch(() => ({
      publishedLessons: CURRICULUM.length,
      lessonsMissingRequired: 0,
      screenshotRequests: 0,
      diagramRequests: 0,
      printableGaps: 0,
      founderRequests: 0,
      readyForReview: 0,
      needsBrad: 0,
      overallPercent: 0,
    })),
    listLessonMediaAssets(lesson ?? undefined).catch(() => []),
  ]);

  const base = {
    filter,
    lesson,
    type: assetType,
    program,
    priority,
  };

  const filtered = filterSetupAssets(assets, {
    filter,
    lesson,
    assetType,
    program,
    priority,
  });

  const programs = [...new Set(CURRICULUM.map((l) => l.programName))];

  const lessonScores = lesson
    ? null
    : CURRICULUM.slice(0, 8).map((l) => {
        const lessonAssets = assets.filter((a) => a.lesson_slug === l.slug);
        return { lesson: l, score: scoreLessonProduction(l.slug, lessonAssets) };
      });

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="Complete StreamerU Setup"
          description="Exactly what StreamerU still needs from you — capture instructions, Cursor-generatable work, and publish workflow. Students never see incomplete media."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "StreamerU", href: "/admin/streameru" },
            { label: "Setup" },
          ]}
          actions={
            <div className="flex flex-wrap gap-2">
              <SyncBriefsButton />
              <Button href="/admin/streameru" variant="secondary" className="min-h-[40px] px-4 text-sm">
                All lessons
              </Button>
            </div>
          }
        />

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Published lessons" value={stats.publishedLessons} accent />
          <StatCard label="Lessons missing required" value={stats.lessonsMissingRequired} />
          <StatCard label="Screenshot / photo requests" value={stats.screenshotRequests} />
          <StatCard label="Diagram requests" value={stats.diagramRequests} />
          <StatCard label="Printables needing completion" value={stats.printableGaps} />
          <StatCard label="Founder story requests" value={stats.founderRequests} />
          <StatCard label="Assets ready for review" value={stats.readyForReview} />
          <StatCard label="Academy setup %" value={`${stats.overallPercent}%`} />
        </div>

        <AdminPanel className="mt-8" raised>
          <AdminSectionTitle
            title="Production plan filters"
            description="Batch related work — TikTok capture session, founder interview, Cursor diagrams, quick wins."
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {(Object.keys(SETUP_FILTER_LABELS) as SetupFilterKey[]).map((key) => {
              const active = filter === key;
              return (
                <Link
                  key={key}
                  href={hrefWith(base, { filter: key })}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-accent text-white"
                      : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {SETUP_FILTER_LABELS[key]}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block text-xs font-medium text-muted">
              Lesson
              <select
                className="mt-1 w-full rounded-lg border border-border bg-background px-2 py-2 text-sm"
                defaultValue={lesson ?? ""}
                // Server-rendered filter via navigation links below; select uses form GET
                name="lesson"
                form="setup-filters"
              >
                <option value="">All lessons</option>
                {CURRICULUM.map((l) => (
                  <option key={l.slug} value={l.slug}>
                    {l.globalOrder}. {l.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium text-muted">
              Program
              <select
                className="mt-1 w-full rounded-lg border border-border bg-background px-2 py-2 text-sm"
                defaultValue={program ?? ""}
                name="program"
                form="setup-filters"
              >
                <option value="">All programs</option>
                {programs.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium text-muted">
              Asset type
              <select
                className="mt-1 w-full rounded-lg border border-border bg-background px-2 py-2 text-sm"
                defaultValue={assetType ?? ""}
                name="type"
                form="setup-filters"
              >
                <option value="">All types</option>
                {[
                  "screenshot",
                  "photo",
                  "diagram",
                  "video",
                  "screen_recording",
                  "worksheet",
                  "checklist",
                  "founder_story",
                ].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium text-muted">
              Priority
              <select
                className="mt-1 w-full rounded-lg border border-border bg-background px-2 py-2 text-sm"
                defaultValue={priority ?? ""}
                name="priority"
                form="setup-filters"
              >
                <option value="">All priorities</option>
                <option value="essential">Essential</option>
                <option value="helpful">Helpful</option>
                <option value="optional">Optional</option>
              </select>
            </label>
          </div>
          <form id="setup-filters" className="mt-3 flex flex-wrap items-center gap-2" method="get">
            <input type="hidden" name="filter" value={filter} />
            <Button type="submit" variant="secondary" className="min-h-[36px] px-3 text-xs">
              Apply dropdown filters
            </Button>
            <Link href="/admin/streameru/setup?filter=needs_brad" className="text-xs font-semibold text-accent hover:underline">
              Reset to Needs Brad
            </Link>
          </form>
        </AdminPanel>

        {filter === "screenshots_session" ? (
          <AdminPanel className="mt-6">
            <h2 className="text-base font-semibold">TikTok capture session</h2>
            <p className="mt-1 text-sm text-muted">
              Capture these in one phone session before editing captions. Do not go LIVE unless a task
              explicitly says a private practice capture is OK.
            </p>
          </AdminPanel>
        ) : null}

        {lessonScores && filter === "all" ? (
          <AdminPanel className="mt-6">
            <AdminSectionTitle
              title="Lesson production scores (sample)"
              description="Publish-ready can be 100% while enhancement tasks remain."
            />
            <ul className="mt-3 space-y-2 text-sm">
              {lessonScores.map(({ lesson: l, score }) => (
                <li key={l.slug} className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 py-2 dark:border-zinc-800">
                  <Link
                    href={hrefWith(base, { lesson: l.slug, filter: "all" })}
                    className="font-medium text-accent hover:underline"
                  >
                    {l.globalOrder}. {l.title}
                  </Link>
                  <span className="text-muted">
                    Publish-ready {score.publishReadyPercent}% · Enhanced {score.enhancementPercent}%
                  </span>
                </li>
              ))}
            </ul>
          </AdminPanel>
        ) : null}

        <div className="mt-8">
          <AdminSectionTitle
            title={SETUP_FILTER_LABELS[filter] ?? "Tasks"}
            description={`${filtered.length} task${filtered.length === 1 ? "" : "s"} · Needs Brad total: ${stats.needsBrad}`}
          />

          {filtered.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                title="No tasks in this view"
                description="Try another filter, sync production briefs, or open a specific lesson."
                illustration="lessons"
              />
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {filtered.map((asset) => (
                <LessonMediaTaskCard key={asset.id} asset={asset} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
