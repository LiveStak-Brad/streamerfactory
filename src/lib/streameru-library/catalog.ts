/**
 * Single source of truth for StreamerU downloadable / printable resources.
 *
 * When adding a curriculum lesson:
 * 1. Append to CURRICULUM + training-missions.ts
 * 2. Register at least one library resource here (checklist minimum)
 */

import { BEGINNER_FOUNDATIONS_RESOURCES } from "@/content/streameru/library/beginner-foundations";
import { ESSENTIAL_SAFETY_RESOURCES } from "@/content/streameru/library/essential-safety";
import { LIVE_STREAMING_MASTERY_RESOURCES } from "@/content/streameru/library/live-streaming-mastery";
import { BATTLES_RESOURCES } from "@/content/streameru/library/battles";
import { ADVANCED_CREATOR_RESOURCES } from "@/content/streameru/library/advanced-creator";
import { PRESENCE_MASTERY_RESOURCES } from "@/content/streameru/library/presence-mastery";
import { CONTENT_CREATION_RESOURCES } from "@/content/streameru/library/content-creation";
import { GROWTH_MASTERY_RESOURCES } from "@/content/streameru/library/growth-mastery";
import { COMMUNITY_MASTERY_RESOURCES } from "@/content/streameru/library/community-mastery";
import { PROFESSIONAL_CREATOR_MASTERY_RESOURCES } from "@/content/streameru/library/professional-creator-mastery";
import { PRODUCTION_MASTERY_RESOURCES } from "@/content/streameru/library/production-mastery";
import { BATTLE_MASTERY_RESOURCES } from "@/content/streameru/library/battle-mastery";
import {
  buildStubLessonResources,
  CATEGORY_SEED_PLACEHOLDERS,
} from "@/lib/streameru-library/stubs";
import type { LibraryResource } from "@/lib/streameru-library/types";

function assertUniqueIds(resources: LibraryResource[]): void {
  const seen = new Set<string>();
  for (const r of resources) {
    if (seen.has(r.id)) {
      throw new Error(`Duplicate StreamerU library resource id: ${r.id}`);
    }
    seen.add(r.id);
    if (r.status === "ready" && (!r.blocks || r.blocks.length === 0)) {
      throw new Error(`Ready library resource missing blocks: ${r.id}`);
    }
  }
}

const MERGED: LibraryResource[] = [
  ...BEGINNER_FOUNDATIONS_RESOURCES,
  ...ESSENTIAL_SAFETY_RESOURCES,
  ...LIVE_STREAMING_MASTERY_RESOURCES,
  ...BATTLES_RESOURCES,
  ...ADVANCED_CREATOR_RESOURCES,
  ...PRESENCE_MASTERY_RESOURCES,
  ...CONTENT_CREATION_RESOURCES,
  ...GROWTH_MASTERY_RESOURCES,
  ...COMMUNITY_MASTERY_RESOURCES,
  ...PROFESSIONAL_CREATOR_MASTERY_RESOURCES,
  ...PRODUCTION_MASTERY_RESOURCES,
  ...BATTLE_MASTERY_RESOURCES,
  ...buildStubLessonResources(),
  ...CATEGORY_SEED_PLACEHOLDERS,
];

assertUniqueIds(MERGED);

/** Full library catalog (ready + placeholder). */
export const LIBRARY_CATALOG: LibraryResource[] = MERGED;

const BY_ID = new Map(LIBRARY_CATALOG.map((r) => [r.id, r]));

/** Legacy ids kept so old lesson links still resolve after renames. */
const ID_ALIASES: Record<string, string> = {
  "boundary-script-card": "privacy-boundary-script-card",
};

export function getLibraryResource(id: string): LibraryResource | null {
  return BY_ID.get(id) ?? BY_ID.get(ID_ALIASES[id] ?? "") ?? null;
}

export function getAllLibraryResources(): LibraryResource[] {
  return LIBRARY_CATALOG;
}
