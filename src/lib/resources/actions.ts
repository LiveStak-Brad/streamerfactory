"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";
import { isValidSlug, slugify } from "./slug";
import type { ResourceStatus } from "./types";

export type ResourceActionState = { error?: string };

function parseOptionalUrl(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  try {
    const u = new URL(t);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.toString();
  } catch {
    return null;
  }
}

function parseCategoryId(raw: FormDataEntryValue | null): string | null {
  const s = String(raw ?? "").trim();
  return s.length ? s : null;
}

function parsePublishedAt(raw: FormDataEntryValue | null): string | null {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

export async function createResourcePost(
  _prev: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  await requireAdmin();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in." };

  const title = String(formData.get("title") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "");
  const coverRaw = String(formData.get("cover_image_url") ?? "");
  const status = String(formData.get("status") ?? "draft") as ResourceStatus;
  const featured = formData.get("featured") === "on";
  const categoryId = parseCategoryId(formData.get("category_id"));
  const publishedAtInput = parsePublishedAt(formData.get("published_at"));

  if (!title) return { error: "Title is required." };
  if (!slug) slug = slugify(title);
  if (!isValidSlug(slug)) {
    return {
      error:
        "Slug must be lowercase letters, numbers, and hyphens only (e.g. my-live-tips).",
    };
  }
  if (status !== "draft" && status !== "published") {
    return { error: "Invalid status." };
  }

  const cover = parseOptionalUrl(coverRaw);
  if (coverRaw.trim() && !cover) return { error: "Cover image URL must be a valid http(s) URL." };

  const insertPayload = {
    title,
    slug,
    excerpt,
    content,
    cover_image_url: cover,
    category_id: categoryId,
    author_id: user.id,
    status,
    featured,
    published_at: status === "published" ? publishedAtInput : null,
  };

  const { error } = await supabase.from("resource_posts").insert(insertPayload);
  if (error) return { error: error.message };

  revalidatePath("/resources");
  revalidatePath("/");
  redirect("/admin/resources");
}

export async function updateResourcePost(
  _prev: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  await requireAdmin();
  const supabase = await createClient();

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return { error: "Missing post id." };

  const title = String(formData.get("title") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "");
  const coverRaw = String(formData.get("cover_image_url") ?? "");
  const status = String(formData.get("status") ?? "draft") as ResourceStatus;
  const featured = formData.get("featured") === "on";
  const categoryId = parseCategoryId(formData.get("category_id"));
  const publishedAtInput = parsePublishedAt(formData.get("published_at"));

  if (!title) return { error: "Title is required." };
  if (!slug) slug = slugify(title);
  if (!isValidSlug(slug)) {
    return {
      error:
        "Slug must be lowercase letters, numbers, and hyphens only (e.g. my-live-tips).",
    };
  }
  if (status !== "draft" && status !== "published") {
    return { error: "Invalid status." };
  }

  const cover = parseOptionalUrl(coverRaw);
  if (coverRaw.trim() && !cover) return { error: "Cover image URL must be a valid http(s) URL." };

  const updatePayload: Record<string, unknown> = {
    title,
    slug,
    excerpt,
    content,
    cover_image_url: cover,
    category_id: categoryId,
    status,
    featured,
  };
  if (status === "draft") {
    updatePayload.published_at = null;
  } else if (publishedAtInput) {
    updatePayload.published_at = publishedAtInput;
  }
  // published + no datetime: leave published_at unchanged (DB trigger fills on first publish only)

  const { error } = await supabase.from("resource_posts").update(updatePayload).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/resources");
  revalidatePath(`/resources/${slug}`);
  revalidatePath("/");
  redirect("/admin/resources");
}

export async function deleteResourcePost(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  const { error } = await supabase.from("resource_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/resources");
  revalidatePath("/");
  redirect("/admin/resources");
}
