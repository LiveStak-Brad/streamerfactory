import { NextResponse } from "next/server";

import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import {
  STREAMERU_LESSON_MEDIA_BUCKET,
  STREAMERU_MEDIA_ALLOWED_EXT,
  STREAMERU_MEDIA_MAX_BYTES,
} from "@/lib/streameru-media/bucket";

export const runtime = "nodejs";

/**
 * Admin upload for StreamerU lesson media.
 * Saves to Storage and updates the asset row to `draft` (does not publish).
 */
export async function POST(request: Request) {
  const session = await getSessionProfile();
  if (!session?.user || !session.profile || !canAccessAdmin(session.profile.role)) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const ct = request.headers.get("content-type") ?? "";
  if (!ct.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Expected multipart form data." }, { status: 400 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Could not read upload." }, { status: 400 });
  }

  const assetId = String(formData.get("assetId") ?? "").trim();
  if (!assetId || assetId.startsWith("brief:")) {
    return NextResponse.json(
      { error: "Sync this request to the database before uploading." },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }
  if (file.size > STREAMERU_MEDIA_MAX_BYTES) {
    return NextResponse.json({ error: "File must be 8MB or smaller." }, { status: 400 });
  }

  const ext =
    (file.name.includes(".") ? file.name.split(".").pop() : null)?.toLowerCase() || "jpg";
  if (!(STREAMERU_MEDIA_ALLOWED_EXT as readonly string[]).includes(ext)) {
    return NextResponse.json(
      { error: `Allowed types: ${STREAMERU_MEDIA_ALLOWED_EXT.join(", ")}` },
      { status: 400 },
    );
  }

  const isImage = file.type.startsWith("image/") || ext === "svg";
  if (!isImage) {
    return NextResponse.json({ error: "Expected an image file for this upload path." }, { status: 400 });
  }

  const supabase = await createClient();
  const admin = createServiceRoleClient();
  const db = admin ?? supabase;

  const { data: asset, error: fetchErr } = await db
    .from("streameru_lesson_assets")
    .select("id, lesson_slug, suggested_alt, suggested_caption")
    .eq("id", assetId)
    .maybeSingle();

  if (fetchErr || !asset) {
    return NextResponse.json({ error: "Asset not found." }, { status: 404 });
  }

  const path = `${asset.lesson_slug}/${assetId}/${crypto.randomUUID()}.${ext}`;
  const contentType = file.type || (ext === "svg" ? "image/svg+xml" : `image/${ext === "jpg" ? "jpeg" : ext}`);
  const buffer = Buffer.from(await file.arrayBuffer());

  const storageClient = admin ?? supabase;
  const { error: upErr } = await storageClient.storage
    .from(STREAMERU_LESSON_MEDIA_BUCKET)
    .upload(path, buffer, {
      cacheControl: "3600",
      upsert: false,
      contentType,
    });

  if (upErr) {
    return NextResponse.json({ error: upErr.message }, { status: 400 });
  }

  const { data: urlData } = supabase.storage
    .from(STREAMERU_LESSON_MEDIA_BUCKET)
    .getPublicUrl(path);

  const publicUrl = urlData.publicUrl;
  const altFromForm = String(formData.get("altText") ?? "").trim();
  const captionFromForm = String(formData.get("caption") ?? "").trim();

  const { error: updateErr } = await db
    .from("streameru_lesson_assets")
    .update({
      storage_path: path,
      public_url: publicUrl,
      alt_text: altFromForm || asset.suggested_alt || null,
      caption: captionFromForm || asset.suggested_caption || null,
      status: "draft",
      updated_at: new Date().toISOString(),
    })
    .eq("id", assetId);

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 400 });
  }

  return NextResponse.json({
    publicUrl,
    storagePath: path,
    status: "draft",
  });
}
