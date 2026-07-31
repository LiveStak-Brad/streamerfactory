import type { LessonMediaAsset } from "@/lib/streameru-media/types";
import { isPublicRenderableStatus } from "@/lib/streameru-media/types";

const MEDIA_SECTION_HEADINGS = new Set(["Screenshots", "Diagrams"]);

/**
 * Public lesson content: strip unpublished placeholders and empty media headings.
 * Replace published matches with `[PublishedImage: …]` blocks for ArticleBody.
 */
export function resolvePublicLessonContent(
  content: string,
  assets: LessonMediaAsset[],
): string {
  const published = assets.filter(
    (a) => isPublicRenderableStatus(a.status) && a.public_url && a.alt_text,
  );

  const byPlaceholder = new Map<string, LessonMediaAsset>();
  for (const a of published) {
    if (a.placeholder_key) {
      byPlaceholder.set(normalizeKey(a.placeholder_key), a);
    }
    byPlaceholder.set(normalizeKey(a.title), a);
    byPlaceholder.set(normalizeKey(a.requested_description), a);
  }

  const blocks = content.split(/\n{2,}/);
  const out: string[] = [];

  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;

    const shot = block.match(/^\[Screenshot:\s*([\s\S]+?)\]$/i);
    const diagram = block.match(/^\[Diagram:\s*([\s\S]+?)\]$/i);
    const mediaMatch = shot ?? diagram;
    if (mediaMatch) {
      const key = normalizeKey(mediaMatch[1]);
      const asset = byPlaceholder.get(key);
      if (!asset?.public_url || !asset.alt_text) {
        continue; // hide incomplete
      }
      const caption = asset.caption?.trim() || asset.suggested_caption?.trim() || "";
      out.push(
        `[PublishedImage: ${asset.public_url} | ${escapePipe(asset.alt_text)} | ${escapePipe(caption)}]`,
      );
      continue;
    }

    out.push(block);
  }

  return stripEmptyMediaSections(out.join("\n\n"));
}

function stripEmptyMediaSections(content: string): string {
  const blocks = content.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const result: string[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const h2 = block.match(/^##\s+(.+)$/);
    if (h2 && MEDIA_SECTION_HEADINGS.has(h2[1].trim())) {
      const next = blocks[i + 1];
      const nextIsH2 = next ? /^##\s+/.test(next) : true;
      const nextIsPublished =
        next && /^\[PublishedImage:/i.test(next);
      if (!next || nextIsH2 || !nextIsPublished) {
        // Skip empty media heading (and keep scanning)
        continue;
      }
    }
    result.push(block);
  }

  return result.join("\n\n");
}

function normalizeKey(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function escapePipe(s: string): string {
  return s.replace(/\|/g, "¦");
}

export function parsePublishedImageBlock(text: string): {
  url: string;
  alt: string;
  caption: string;
} | null {
  const m = text.match(/^\[PublishedImage:\s*(.+?)\s*\|\s*(.+?)\s*\|\s*([\s\S]*)\]$/i);
  if (!m) return null;
  return {
    url: m[1].trim(),
    alt: m[2].trim().replace(/¦/g, "|"),
    caption: (m[3] ?? "").trim().replace(/¦/g, "|"),
  };
}
