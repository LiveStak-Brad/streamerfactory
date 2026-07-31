import { applyExpandedLessonContent } from "@/content/streameru/apply-expanded";
import { createClient } from "@/lib/supabase/server";
import { CURRICULUM, getCurriculumLesson, getCurriculumNeighbors } from "@/lib/resources/curriculum";
import type { ResourceCategoryRow, ResourcePostRow, ResourcePostWithCategory } from "./types";

function mapPost(row: ResourcePostWithCategory | null): ResourcePostWithCategory | null {
  if (!row) return null;
  return applyExpandedLessonContent(row);
}

export async function getPublishedPosts(): Promise<ResourcePostWithCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resource_posts")
    .select("*, resource_categories (*)")
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => mapPost(r as ResourcePostWithCategory)!);
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<ResourcePostWithCategory | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resource_posts")
    .select("*, resource_categories (*)")
    .eq("slug", slug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return mapPost(data as ResourcePostWithCategory | null);
}

export async function getFeaturedPublishedPost(): Promise<ResourcePostWithCategory | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resource_posts")
    .select("*, resource_categories (*)")
    .eq("status", "published")
    .eq("featured", true)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return mapPost(data as ResourcePostWithCategory | null);
}

export async function getLatestPublishedPosts(limit: number): Promise<ResourcePostWithCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resource_posts")
    .select("*, resource_categories (*)")
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => mapPost(r as ResourcePostWithCategory)!);
}

/** Published posts excluding one slug (e.g. current article). */
export async function getRelatedPublishedPosts(
  excludeSlug: string,
  limit: number,
): Promise<ResourcePostWithCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resource_posts")
    .select("*, resource_categories (*)")
    .eq("status", "published")
    .not("published_at", "is", null)
    .neq("slug", excludeSlug)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => mapPost(r as ResourcePostWithCategory)!);
}

/** All published curriculum lessons in program order (not by date). */
export async function getPublishedPostsInCurriculumOrder(): Promise<ResourcePostWithCategory[]> {
  const all = await getPublishedPosts();
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const ordered: ResourcePostWithCategory[] = [];
  for (const c of CURRICULUM) {
    const p = bySlug.get(c.slug);
    if (p) ordered.push(p);
  }
  return ordered;
}

/**
 * Related lessons: next → previous → same track in curriculum order.
 * Omits lessons not in curriculum for the “same track” fill.
 */
export async function getCurriculumRelatedPosts(
  currentSlug: string,
  trainingTrackFallback: string | null,
): Promise<ResourcePostWithCategory[]> {
  const cur = getCurriculumLesson(currentSlug);
  const track = cur?.trackId ?? trainingTrackFallback ?? "beginner";
  const neighbors = getCurriculumNeighbors(currentSlug);
  const out: ResourcePostWithCategory[] = [];
  const used = new Set<string>([currentSlug]);

  async function pushSlug(slug: string | undefined) {
    if (!slug || used.has(slug)) return;
    const p = await getPublishedPostBySlug(slug);
    if (p) {
      out.push(p);
      used.add(slug);
    }
  }

  await pushSlug(neighbors.next?.slug);
  await pushSlug(neighbors.prev?.slug);

  for (const lesson of CURRICULUM) {
    if (out.length >= 6) break;
    if (lesson.trackId !== track) continue;
    if (used.has(lesson.slug)) continue;
    await pushSlug(lesson.slug);
  }

  return out;
}

/** Admin: all posts, newest first */
export async function getAllResourcePosts(): Promise<ResourcePostWithCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resource_posts")
    .select("*, resource_categories (*)")
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => mapPost(r as ResourcePostWithCategory)!);
}

export async function getResourcePostById(id: string): Promise<ResourcePostWithCategory | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resource_posts")
    .select("*, resource_categories (*)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return mapPost(data as ResourcePostWithCategory | null);
}

export async function getResourceCategories(): Promise<ResourceCategoryRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resource_categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as ResourceCategoryRow[];
}

export type ResourcePostListItem = ResourcePostRow & {
  resource_categories?: { name: string; slug: string } | null;
};
