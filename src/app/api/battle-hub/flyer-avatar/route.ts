import { NextResponse } from "next/server";

import { effectiveCanUseBattleHubScheduling } from "@/lib/auth/network-view";
import { getSessionProfile } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

import { BATTLE_AVATARS_BUCKET } from "@/lib/battle-hub/battle-avatars-bucket";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Upload a flyer avatar to Storage after verifying the session.
 * Prefer `SUPABASE_SERVICE_ROLE_KEY` on the server so uploads succeed even when Storage RLS is misconfigured.
 */
export async function POST(request: Request) {
  const session = await getSessionProfile();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in to upload a photo." }, { status: 401 });
  }
  if (!(await effectiveCanUseBattleHubScheduling(session))) {
    return NextResponse.json(
      { error: "Member access is required to upload flyer photos." },
      { status: 403 },
    );
  }

  const user = session.user;
  const supabase = await createClient();

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

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be 5MB or smaller." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Expected an image file." }, { status: 400 });
  }

  const ext =
    (file.name.includes(".") ? file.name.split(".").pop() : null)?.toLowerCase() || "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const path = `${user.id}/${crypto.randomUUID()}.${safeExt}`;
  const contentType = file.type || `image/${safeExt === "jpg" ? "jpeg" : safeExt}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const admin = createServiceRoleClient();
  const storageClient = admin ?? supabase;

  const { error: upErr } = await storageClient.storage.from(BATTLE_AVATARS_BUCKET).upload(path, buffer, {
    cacheControl: "3600",
    upsert: false,
    contentType,
  });

  if (upErr) {
    return NextResponse.json(
      { error: upErr.message },
      { status: 400 },
    );
  }

  const { data } = supabase.storage.from(BATTLE_AVATARS_BUCKET).getPublicUrl(path);
  return NextResponse.json({ publicUrl: data.publicUrl });
}
