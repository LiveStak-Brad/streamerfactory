import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import {
  LESSON_PRODUCTION_BRIEFS,
  getBriefForLesson,
  type BriefAsset,
} from "@/lib/streameru-media/production-briefs";
import type { AssetStatus, LessonMediaAsset, OwnershipKind } from "@/lib/streameru-media/types";
import { CURRICULUM } from "@/lib/resources/curriculum";

type DbRow = {
  id: string;
  lesson_slug: string;
  asset_type: string;
  title: string;
  placeholder_key: string | null;
  requested_description: string;
  section_key: string | null;
  instructional_purpose: string;
  required: boolean;
  priority: string;
  ownership: string;
  capture_instructions: string;
  dimensions_hint: string | null;
  privacy_warning: string | null;
  admin_notes: string | null;
  suggested_caption: string | null;
  suggested_alt: string | null;
  storage_path: string | null;
  public_url: string | null;
  alt_text: string | null;
  caption: string | null;
  status: string;
  display_order: number;
  reusable_key: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

function mapRow(row: DbRow): LessonMediaAsset {
  return {
    id: row.id,
    lesson_slug: row.lesson_slug,
    asset_type: row.asset_type as LessonMediaAsset["asset_type"],
    title: row.title,
    placeholder_key: row.placeholder_key,
    requested_description: row.requested_description,
    section_key: row.section_key,
    instructional_purpose: row.instructional_purpose,
    required: row.required,
    priority: row.priority as LessonMediaAsset["priority"],
    ownership: row.ownership as OwnershipKind,
    capture_instructions: row.capture_instructions,
    dimensions_hint: row.dimensions_hint,
    privacy_warning: row.privacy_warning,
    admin_notes: row.admin_notes,
    suggested_caption: row.suggested_caption,
    suggested_alt: row.suggested_alt,
    storage_path: row.storage_path,
    public_url: row.public_url,
    alt_text: row.alt_text,
    caption: row.caption,
    status: row.status as AssetStatus,
    display_order: row.display_order,
    reusable_key: row.reusable_key,
    created_at: row.created_at,
    updated_at: row.updated_at,
    published_at: row.published_at,
  };
}

/** Virtual id for brief-only rows not yet in DB */
export function briefAssetId(lessonSlug: string, key: string): string {
  return `brief:${lessonSlug}:${key}`;
}

function briefToVirtual(lessonSlug: string, a: BriefAsset, order: number): LessonMediaAsset {
  const now = new Date(0).toISOString();
  return {
    id: briefAssetId(lessonSlug, a.key),
    lesson_slug: lessonSlug,
    asset_type: a.assetType,
    title: a.title,
    placeholder_key: a.description,
    requested_description: a.description,
    section_key: a.sectionKey,
    instructional_purpose: a.purpose,
    required: a.required,
    priority: a.priority,
    ownership: a.ownership,
    capture_instructions: a.captureInstructions,
    dimensions_hint: a.dimensionsHint ?? a.orientation ?? null,
    privacy_warning: a.privacyWarning ?? null,
    admin_notes: a.founderQuestion
      ? `Founder question: ${a.founderQuestion}`
      : a.highlight
        ? `Highlight: ${a.highlight}`
        : null,
    suggested_caption: a.caption,
    suggested_alt: a.alt || null,
    storage_path: null,
    public_url: null,
    alt_text: null,
    caption: null,
    status: "requested",
    display_order: order,
    reusable_key: a.reusableKey ?? null,
    created_at: now,
    updated_at: now,
    published_at: null,
  };
}

async function fetchDbAssets(lessonSlug?: string): Promise<LessonMediaAsset[]> {
  const supabase = await createClient();
  let q = supabase.from("streameru_lesson_assets").select("*").order("display_order", { ascending: true });
  if (lessonSlug) q = q.eq("lesson_slug", lessonSlug);
  const { data, error } = await q;
  if (error || !data) {
    // Table may not exist yet in local envs — fail soft to brief catalog
    return [];
  }
  return (data as DbRow[]).map(mapRow);
}

/**
 * Merge DB rows with production briefs. DB wins on status/urls; briefs fill gaps.
 */
export async function listLessonMediaAssets(lessonSlug?: string): Promise<LessonMediaAsset[]> {
  const db = await fetchDbAssets(lessonSlug);
  const dbKeys = new Set(db.map((a) => `${a.lesson_slug}::${a.placeholder_key ?? a.title}`));
  const dbReusable = new Set(db.map((a) => a.reusable_key).filter(Boolean) as string[]);

  const briefs = lessonSlug
    ? [getBriefForLesson(lessonSlug)].filter(Boolean)
    : LESSON_PRODUCTION_BRIEFS;

  const virtual: LessonMediaAsset[] = [];
  for (const b of briefs) {
    if (!b) continue;
    b.assets.forEach((a, i) => {
      const k = `${b.lessonSlug}::${a.description}`;
      if (dbKeys.has(k)) return;
      if (a.reusableKey && dbReusable.has(a.reusableKey)) return;
      // Also skip if DB has same brief key via title match
      if (db.some((d) => d.lesson_slug === b.lessonSlug && d.title === a.title)) return;
      virtual.push(briefToVirtual(b.lessonSlug, a, i + 1));
    });
  }

  return [...db, ...virtual].sort((a, b) => {
    const oa = CURRICULUM.find((l) => l.slug === a.lesson_slug)?.globalOrder ?? 99;
    const ob = CURRICULUM.find((l) => l.slug === b.lesson_slug)?.globalOrder ?? 99;
    if (oa !== ob) return oa - ob;
    return a.display_order - b.display_order;
  });
}

/**
 * Public academy: read published rows via service role (table RLS is staff-only).
 * Falls back to session client when service role is unavailable (local/dev).
 */
export async function listPublishedLessonMedia(lessonSlug: string): Promise<LessonMediaAsset[]> {
  const admin = createServiceRoleClient();
  const supabase = admin ?? (await createClient());
  const { data, error } = await supabase
    .from("streameru_lesson_assets")
    .select("*")
    .eq("lesson_slug", lessonSlug)
    .eq("status", "published")
    .order("display_order", { ascending: true });

  if (error || !data) return [];
  return (data as DbRow[])
    .map(mapRow)
    .filter((a) => Boolean(a.public_url && a.alt_text));
}

export async function getLessonMediaAsset(id: string): Promise<LessonMediaAsset | null> {
  if (id.startsWith("brief:")) {
    const [, slug, key] = id.split(":");
    const brief = getBriefForLesson(slug);
    const asset = brief?.assets.find((a) => a.key === key);
    if (!brief || !asset) return null;
    return briefToVirtual(slug, asset, 0);
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("streameru_lesson_assets")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return mapRow(data as DbRow);
}

export type SetupHubStats = {
  publishedLessons: number;
  lessonsMissingRequired: number;
  screenshotRequests: number;
  diagramRequests: number;
  printableGaps: number;
  founderRequests: number;
  readyForReview: number;
  needsBrad: number;
  overallPercent: number;
};

export async function getSetupHubStats(): Promise<SetupHubStats> {
  const assets = await listLessonMediaAssets();
  const publishedLessons = CURRICULUM.length;
  const open = assets.filter((a) => a.status === "requested" || a.status === "draft");
  const screenshotRequests = open.filter(
    (a) => a.asset_type === "screenshot" || a.asset_type === "photo",
  ).length;
  const diagramRequests = open.filter((a) => a.asset_type === "diagram").length;
  const founderRequests = open.filter((a) => a.asset_type === "founder_story").length;
  const readyForReview = assets.filter((a) => a.status === "ready").length;
  const needsBrad = open.filter(
    (a) => a.ownership === "needs_brad" || a.ownership === "brad_must_approve",
  ).length;
  const requiredOpen = open.filter((a) => a.required).length;
  const lessonsMissingRequired = new Set(open.filter((a) => a.required).map((a) => a.lesson_slug))
    .size;

  // Printable gaps: briefs that list worksheet/checklist without ready library — approximate via open worksheet types
  const printableGaps = open.filter(
    (a) => a.asset_type === "worksheet" || a.asset_type === "checklist",
  ).length;

  const totalPlanned = Math.max(assets.length, 1);
  const done = assets.filter((a) => a.status === "published" || a.status === "archived").length;
  const overallPercent = Math.round((done / totalPlanned) * 100);

  return {
    publishedLessons,
    lessonsMissingRequired: lessonsMissingRequired + (requiredOpen > 0 ? 0 : 0),
    screenshotRequests,
    diagramRequests,
    printableGaps,
    founderRequests,
    readyForReview,
    needsBrad,
    overallPercent,
  };
}

/** Ensure brief assets exist as DB rows (admin action / setup sync). */
export async function syncBriefsToDatabase(): Promise<{ inserted: number; error?: string }> {
  const admin = createServiceRoleClient();
  const supabase = admin ?? (await createClient());
  let inserted = 0;

  for (const brief of LESSON_PRODUCTION_BRIEFS) {
    for (let i = 0; i < brief.assets.length; i++) {
      const a = brief.assets[i];
      const row = {
        lesson_slug: brief.lessonSlug,
        asset_type: a.assetType,
        title: a.title,
        placeholder_key: a.description,
        requested_description: a.description,
        section_key: a.sectionKey,
        instructional_purpose: a.purpose,
        required: a.required,
        priority: a.priority,
        ownership: a.ownership,
        capture_instructions: [
          a.captureInstructions,
          a.highlight ? `Highlight: ${a.highlight}` : "",
          a.cropBlur ? `Crop/blur: ${a.cropBlur}` : "",
          a.placement ? `Placement: ${a.placement}` : "",
          a.founderQuestion ? `Ask Brad: ${a.founderQuestion}` : "",
        ]
          .filter(Boolean)
          .join("\n\n"),
        dimensions_hint: a.dimensionsHint ?? a.orientation ?? null,
        privacy_warning: a.privacyWarning ?? null,
        suggested_caption: a.caption,
        suggested_alt: a.alt || null,
        status: "requested",
        display_order: i + 1,
        reusable_key: a.reusableKey ?? null,
      };

      const { error } = await supabase.from("streameru_lesson_assets").upsert(row, {
        onConflict: "lesson_slug,title",
        ignoreDuplicates: true,
      });
      if (!error) inserted += 1;
      else if (!error.message.includes("duplicate")) {
        return { inserted, error: error.message };
      }
    }
  }
  return { inserted };
}
