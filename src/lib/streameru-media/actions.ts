"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { getBriefForLesson } from "@/lib/streameru-media/production-briefs";
import { syncBriefsToDatabase } from "@/lib/streameru-media/queries";
import type { AssetStatus } from "@/lib/streameru-media/types";

async function db() {
  return createServiceRoleClient() ?? (await createClient());
}

export async function syncStreamerUMediaBriefsAction(): Promise<{
  ok: boolean;
  inserted?: number;
  error?: string;
}> {
  await requireAdmin();
  const result = await syncBriefsToDatabase();
  revalidatePath("/admin/streameru/setup");
  revalidatePath("/admin");
  if (result.error) return { ok: false, error: result.error, inserted: result.inserted };
  return { ok: true, inserted: result.inserted };
}

export async function ensureBriefAssetRowAction(
  lessonSlug: string,
  briefKey: string,
): Promise<{ ok: boolean; id?: string; error?: string }> {
  await requireAdmin();
  const brief = getBriefForLesson(lessonSlug);
  const asset = brief?.assets.find((a) => a.key === briefKey);
  if (!brief || !asset) return { ok: false, error: "Brief asset not found." };

  const supabase = await db();
  const row = {
    lesson_slug: lessonSlug,
    asset_type: asset.assetType,
    title: asset.title,
    placeholder_key: asset.description,
    requested_description: asset.description,
    section_key: asset.sectionKey,
    instructional_purpose: asset.purpose,
    required: asset.required,
    priority: asset.priority,
    ownership: asset.ownership,
    capture_instructions: asset.captureInstructions,
    dimensions_hint: asset.dimensionsHint ?? null,
    privacy_warning: asset.privacyWarning ?? null,
    suggested_caption: asset.caption,
    suggested_alt: asset.alt || null,
    status: "requested" as const,
    display_order: brief.assets.findIndex((a) => a.key === briefKey) + 1,
    reusable_key: asset.reusableKey ?? null,
  };

  const { data, error } = await supabase
    .from("streameru_lesson_assets")
    .upsert(row, { onConflict: "lesson_slug,title" })
    .select("id")
    .maybeSingle();

  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/streameru/setup");
  return { ok: true, id: data?.id as string | undefined };
}

export async function updateLessonMediaStatusAction(input: {
  id: string;
  status: AssetStatus;
  alt_text?: string | null;
  caption?: string | null;
  public_url?: string | null;
  storage_path?: string | null;
  markUnnecessary?: boolean;
}): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();
  if (input.id.startsWith("brief:")) {
    return { ok: false, error: "Sync this brief to the database first, then update status." };
  }

  if (input.status === "published") {
    const alt = input.alt_text?.trim();
    if (!alt) {
      return { ok: false, error: "Alt text is required before publishing an image asset." };
    }
  }

  const supabase = await db();
  const patch: Record<string, unknown> = {
    status: input.markUnnecessary ? "archived" : input.status,
    updated_at: new Date().toISOString(),
  };
  if (input.alt_text !== undefined) patch.alt_text = input.alt_text;
  if (input.caption !== undefined) patch.caption = input.caption;
  if (input.public_url !== undefined) patch.public_url = input.public_url;
  if (input.storage_path !== undefined) patch.storage_path = input.storage_path;
  if (input.status === "published" && !input.markUnnecessary) {
    patch.published_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("streameru_lesson_assets")
    .update(patch)
    .eq("id", input.id);

  if (error) return { ok: false, error: error.message };

  const { data } = await supabase
    .from("streameru_lesson_assets")
    .select("lesson_slug")
    .eq("id", input.id)
    .maybeSingle();

  revalidatePath("/admin/streameru/setup");
  revalidatePath("/admin");
  if (data?.lesson_slug) {
    revalidatePath(`/streameru/${data.lesson_slug}`);
  }
  return { ok: true };
}
