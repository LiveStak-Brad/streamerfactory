"use client";

/**
 * Uploads via the server route so Storage can use the service role (bypasses flaky client RLS).
 * Requires `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` for reliable uploads.
 */
export async function uploadBattleFlyerAvatar(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/battle-hub/flyer-avatar", {
    method: "POST",
    body: fd,
    credentials: "same-origin",
  });

  const data = (await res.json().catch(() => ({}))) as { error?: string; publicUrl?: string };
  if (!res.ok) {
    throw new Error(data.error ?? "Upload failed.");
  }
  if (!data.publicUrl) {
    throw new Error("Upload failed.");
  }
  return data.publicUrl;
}
