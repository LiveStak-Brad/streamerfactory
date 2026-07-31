import Link from "next/link";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { AdminStatusBadge } from "@/components/admin/ui/AdminStatusBadge";
import { LessonMediaTaskCard } from "@/components/admin/streameru-media/LessonMediaTaskCard";
import { buildLessonChecklist, scoreLessonProduction } from "@/lib/streameru-media/scoring";
import type { LessonMediaAsset } from "@/lib/streameru-media/types";

const CHECKLIST_TONE: Record<
  string,
  "success" | "warning" | "info" | "neutral" | "danger"
> = {
  complete: "success",
  published: "success",
  needs_brad: "warning",
  agent_can_complete: "info",
  optional: "neutral",
  ready_for_review: "info",
  missing: "danger",
};

export function LessonMaterialsPanel({
  lessonSlug,
  assets,
}: {
  lessonSlug: string;
  assets: LessonMediaAsset[];
}) {
  const score = scoreLessonProduction(lessonSlug, assets);
  const checklist = buildLessonChecklist(lessonSlug, assets);
  const published = assets.filter((a) => a.status === "published");
  const requested = assets.filter(
    (a) => a.status === "requested" || a.status === "draft" || a.status === "ready",
  );
  const requiredMissing = assets.filter(
    (a) => a.required && a.status !== "published" && a.status !== "archived",
  );

  return (
    <AdminPanel className="mt-8" raised>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Lesson assets</h2>
          <p className="mt-1 text-sm text-muted">
            Requests stay admin-only until published. Publish-ready {score.publishReadyPercent}% ·
            Enhancement {score.enhancementPercent}%
          </p>
        </div>
        <Link
          href={`/admin/streameru/setup?lesson=${encodeURIComponent(lessonSlug)}`}
          className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
        >
          Open in setup center →
        </Link>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {checklist.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-2 rounded-xl border border-border/70 px-3 py-2 text-sm dark:border-zinc-800"
          >
            <span className="font-medium text-foreground">{item.label}</span>
            <AdminStatusBadge tone={CHECKLIST_TONE[item.status] ?? "neutral"}>
              {item.status.replace(/_/g, " ")}
            </AdminStatusBadge>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900/50">
          <div className="text-xs font-semibold uppercase text-muted">Published</div>
          <div className="mt-1 text-2xl font-semibold">{published.length}</div>
        </div>
        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900/50">
          <div className="text-xs font-semibold uppercase text-muted">Open requests</div>
          <div className="mt-1 text-2xl font-semibold">{requested.length}</div>
        </div>
        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900/50">
          <div className="text-xs font-semibold uppercase text-muted">Required missing</div>
          <div className="mt-1 text-2xl font-semibold">{requiredMissing.length}</div>
        </div>
      </div>

      {assets.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          No media requests for this lesson yet. Sync production briefs from the setup center.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {assets.map((asset) => (
            <LessonMediaTaskCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </AdminPanel>
  );
}
