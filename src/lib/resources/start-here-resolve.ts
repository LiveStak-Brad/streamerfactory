import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { ResourcePostRow } from "@/lib/resources/types";
import {
  START_HERE_PATH,
  type StartHereResolvedItem,
  type StartHereSection,
  type StartHerePathStep,
} from "@/lib/resources/start-here";

const RESOURCES_BASE = "/streameru";

async function loadPost(slug: string): Promise<ResourcePostRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resource_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[start-here] loadPost", slug, error.message);
    return null;
  }

  return data as ResourcePostRow | null;
}

function resolveArticleItem(
  step: StartHerePathStep,
  slug: string,
  post: ResourcePostRow | null,
  fallbackTitle: string,
  fallbackDescription: string,
  browseHref: string,
): StartHereResolvedItem {
  const base = {
    slug,
    stepLabel: step.stepLabel,
    sectionTitle: step.title,
    sectionIntro: step.intro,
  };

  if (post && post.status === "published") {
    return {
      kind: "article",
      ...base,
      cardTitle: post.title,
      cardDescription: post.excerpt ?? post.title,
      href: `${RESOURCES_BASE}/${post.slug}`,
      exists: true,
    };
  }

  return {
    kind: "article",
    ...base,
    cardTitle: fallbackTitle,
    cardDescription: fallbackDescription,
    exists: false,
    browseHref,
  };
}

export async function getStartHereSections(): Promise<StartHereSection[]> {
  const sections: StartHereSection[] = [];

  for (const step of START_HERE_PATH) {
    const post = await loadPost(step.primarySlug);
    const item = resolveArticleItem(
      step,
      step.primarySlug,
      post,
      step.fallbackTitle,
      step.fallbackDescription,
      RESOURCES_BASE,
    );

    sections.push({
      id: step.id,
      stepLabel: step.stepLabel,
      title: step.title,
      intro: step.intro,
      items: [item],
    });
  }

  return sections;
}
