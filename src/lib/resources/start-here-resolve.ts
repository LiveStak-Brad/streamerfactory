import { getPublishedPostBySlug } from "@/lib/resources/queries";
import type { ResourcePostWithCategory } from "@/lib/resources/types";
import { START_HERE_PATH, type StartHereResolvedItem, type StartHereSection } from "@/lib/resources/start-here";

async function loadPost(slug: string): Promise<ResourcePostWithCategory | null> {
  try {
    return await getPublishedPostBySlug(slug);
  } catch {
    return null;
  }
}

type PathStep = (typeof START_HERE_PATH)[number];

function resolveArticleItem(
  step: PathStep,
  slug: string,
  post: ResourcePostWithCategory | null,
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

  if (post) {
    return {
      kind: "article",
      ...base,
      cardTitle: post.title,
      cardDescription: post.excerpt ?? fallbackDescription,
      href: `/resources/${post.slug}`,
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

/**
 * Resolves curated slugs to published posts; fills fallbacks when a post is missing or still a draft.
 */
export async function getStartHereSections(): Promise<StartHereSection[]> {
  const sections: StartHereSection[] = [];

  for (const step of START_HERE_PATH) {
    const items: StartHereResolvedItem[] = [];

    if ("hubHref" in step && step.hubHref) {
      items.push({
        kind: "hub",
        stepLabel: step.stepLabel,
        sectionTitle: step.title,
        sectionIntro: step.intro,
        cardTitle: step.cardTitle,
        cardDescription: step.cardDescription,
        href: step.hubHref,
        hrefLabel: step.hubLabel,
      });
    }

    if ("secondarySlug" in step && step.secondarySlug) {
      const post = await loadPost(step.secondarySlug);
      const fallbackTitle =
        "secondaryFallbackTitle" in step ? step.secondaryFallbackTitle : "Guide";
      const fallbackDescription =
        "secondaryFallbackDescription" in step ? step.secondaryFallbackDescription : "";
      items.push(
        resolveArticleItem(
          step,
          step.secondarySlug,
          post,
          fallbackTitle,
          fallbackDescription,
          "/resources#battles",
        ),
      );
    }

    if ("primarySlug" in step && step.primarySlug) {
      const post = await loadPost(step.primarySlug);
      items.push(
        resolveArticleItem(
          step,
          step.primarySlug,
          post,
          step.fallbackTitle,
          step.fallbackDescription,
          "/resources",
        ),
      );
    }

    if (items.length > 0) {
      sections.push({
        id: step.id,
        stepLabel: step.stepLabel,
        title: step.title,
        intro: step.intro,
        items,
      });
    }
  }

  return sections;
}
