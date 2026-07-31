import type { LessonMediaAsset } from "@/lib/streameru-media/types";
import { CURRICULUM } from "@/lib/resources/curriculum";

export type SetupFilterKey =
  | "all"
  | "needs_brad"
  | "cursor_can_create"
  | "requires_tiktok"
  | "requires_photo"
  | "founder"
  | "ready_upload"
  | "ready_publish"
  | "essential"
  | "quick_wins"
  | "screenshots_session"
  | "videos_batch"
  | "founder_interview";

export function filterSetupAssets(
  assets: LessonMediaAsset[],
  opts: {
    filter?: string | null;
    lesson?: string | null;
    assetType?: string | null;
    program?: string | null;
    priority?: string | null;
  },
): LessonMediaAsset[] {
  let list = [...assets];

  if (opts.lesson) {
    list = list.filter((a) => a.lesson_slug === opts.lesson);
  }
  if (opts.assetType) {
    list = list.filter((a) => a.asset_type === opts.assetType);
  }
  if (opts.priority) {
    list = list.filter((a) => a.priority === opts.priority);
  }
  if (opts.program) {
    const slugs = new Set(
      CURRICULUM.filter((l) => l.programName === opts.program).map((l) => l.slug),
    );
    list = list.filter((a) => slugs.has(a.lesson_slug));
  }

  const filter = (opts.filter ?? "all") as SetupFilterKey;
  switch (filter) {
    case "needs_brad":
      return list.filter(
        (a) =>
          (a.status === "requested" || a.status === "draft") &&
          (a.ownership === "needs_brad" || a.ownership === "brad_must_approve"),
      );
    case "cursor_can_create":
      return list.filter(
        (a) =>
          a.ownership === "cursor_can_create" &&
          (a.status === "requested" || a.status === "draft"),
      );
    case "requires_tiktok":
      return list.filter(
        (a) =>
          (a.asset_type === "screenshot" || a.asset_type === "screen_recording") &&
          (a.status === "requested" || a.status === "draft") &&
          /tiktok/i.test(a.capture_instructions + a.title),
      );
    case "requires_photo":
      return list.filter(
        (a) => a.asset_type === "photo" && (a.status === "requested" || a.status === "draft"),
      );
    case "founder":
      return list.filter(
        (a) =>
          a.asset_type === "founder_story" &&
          (a.status === "requested" || a.status === "draft" || a.status === "ready"),
      );
    case "ready_upload":
      return list.filter((a) => a.status === "requested" && a.ownership !== "optional_enhancement");
    case "ready_publish":
      return list.filter((a) => a.status === "ready" || (a.status === "draft" && a.public_url));
    case "essential":
      return list.filter(
        (a) => a.priority === "essential" && a.status !== "published" && a.status !== "archived",
      );
    case "quick_wins":
      return list.filter((a) => {
        if (a.status === "published" || a.status === "archived") return false;
        const mins = estimateMinutes(a);
        return mins > 0 && mins <= 10;
      });
    case "screenshots_session":
      return list.filter(
        (a) =>
          (a.asset_type === "screenshot" || a.asset_type === "screen_recording") &&
          (a.status === "requested" || a.status === "draft") &&
          a.ownership === "needs_brad",
      );
    case "videos_batch":
      return list.filter(
        (a) =>
          (a.asset_type === "video" || a.asset_type === "screen_recording") &&
          a.status !== "published" &&
          a.status !== "archived",
      );
    case "founder_interview":
      return list.filter(
        (a) =>
          a.asset_type === "founder_story" &&
          (a.status === "requested" || a.status === "draft"),
      );
    default:
      return list.filter((a) => a.status !== "archived");
  }
}

function estimateMinutes(a: LessonMediaAsset): number {
  // Heuristic from instructions length / type when DB has no minutes field
  if (a.asset_type === "screenshot") return 5;
  if (a.asset_type === "photo") return 10;
  if (a.asset_type === "diagram") return 20;
  if (a.asset_type === "founder_story") return 8;
  if (a.asset_type === "video") return 45;
  if (a.asset_type === "screen_recording") return 15;
  return 12;
}

export function groupTikTokCaptureSession(assets: LessonMediaAsset[]): LessonMediaAsset[] {
  return filterSetupAssets(assets, { filter: "screenshots_session" });
}

export const SETUP_FILTER_LABELS: Record<SetupFilterKey, string> = {
  all: "All open tasks",
  needs_brad: "Needs Brad",
  cursor_can_create: "Cursor can create",
  requires_tiktok: "Requires TikTok capture",
  requires_photo: "Requires real-world photo",
  founder: "Founder approval / stories",
  ready_upload: "Ready to upload",
  ready_publish: "Ready to publish",
  essential: "All essential assets",
  quick_wins: "Quick wins (≤10 min)",
  screenshots_session: "TikTok capture session",
  videos_batch: "Videos to batch-record",
  founder_interview: "Founder interview questions",
};
