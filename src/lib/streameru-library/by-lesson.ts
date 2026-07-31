import {
  getAllLibraryResources,
  getLibraryResource,
} from "@/lib/streameru-library/catalog";
import {
  LIBRARY_CATEGORIES,
  type LibraryCategoryId,
  type LibraryResource,
} from "@/lib/streameru-library/types";

const KIND_ORDER: Record<LibraryResource["kind"], number> = {
  checklist: 0,
  template: 1,
  planner: 2,
  worksheet: 3,
  journal: 4,
  script: 5,
  tracker: 6,
  guide: 7,
};

function sortResources(a: LibraryResource, b: LibraryResource): number {
  if (a.status !== b.status) return a.status === "ready" ? -1 : 1;
  const k = KIND_ORDER[a.kind] - KIND_ORDER[b.kind];
  if (k !== 0) return k;
  return a.title.localeCompare(b.title);
}

export function getResourcesForLesson(slug: string): LibraryResource[] {
  return getAllLibraryResources()
    .filter((r) => r.lessonSlugs.includes(slug))
    .sort(sortResources);
}

export function getLibraryByCategory(
  category?: LibraryCategoryId | "all",
): LibraryResource[] {
  const all = getAllLibraryResources();
  const filtered =
    !category || category === "all" ? all : all.filter((r) => r.category === category);
  return [...filtered].sort(sortResources);
}

export function getLibraryCategoryCounts(): Record<LibraryCategoryId, number> {
  const counts = Object.fromEntries(
    LIBRARY_CATEGORIES.map((c) => [c.id, 0]),
  ) as Record<LibraryCategoryId, number>;
  for (const r of getAllLibraryResources()) {
    counts[r.category] += 1;
  }
  return counts;
}

export function getReadyResourceCount(): number {
  return getAllLibraryResources().filter((r) => r.status === "ready").length;
}

export { getLibraryResource, LIBRARY_CATEGORIES };
