import { STREAMERU_BASE } from "@/lib/streameru-url";

export function streamerULibraryHref(): string {
  return `${STREAMERU_BASE}/library`;
}

export function streamerULibraryResourceHref(resourceId: string): string {
  return `${STREAMERU_BASE}/library/${resourceId}`;
}
