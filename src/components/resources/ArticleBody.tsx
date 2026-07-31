import type { ReactNode } from "react";
import { BradTip } from "@/components/streameru/founder/FounderInsight";
import { parsePublishedImageBlock } from "@/lib/streameru-media/resolve-public-content";

/**
 * Line-break friendly body with lightweight markdown:
 * - `##` / `###` headings
 * - `[PublishedImage: url | alt | caption]` — completed public media only
 * - `[Screenshot: …]` / `[Diagram: …]` — admin/preview only (hidden when hideIncompleteMedia)
 * - `[Callout: Title]` … body (same block)
 * - `[BradExperience]` … body (same block) → founder component
 * - blank lines = new blocks; single newlines kept inside paragraphs
 * - `**bold**` inline
 */
export function ArticleBody({
  content,
  className = "",
  /** Public academy: never render incomplete screenshot/diagram placeholders */
  hideIncompleteMedia = false,
}: {
  content: string;
  className?: string;
  hideIncompleteMedia?: boolean;
}) {
  const blocks = content.split(/\n{2,}/).filter((p) => p.trim().length > 0);
  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className={`su-prose ${className}`}>
      {blocks.map((block, i) => (
        <Block key={i} text={block.trim()} hideIncompleteMedia={hideIncompleteMedia} />
      ))}
    </div>
  );
}

function Block({
  text,
  hideIncompleteMedia,
}: {
  text: string;
  hideIncompleteMedia: boolean;
}) {
  const h2 = text.match(/^##\s+([\s\S]+)$/);
  if (h2) {
    return <h2>{h2[1].trim()}</h2>;
  }

  const h3 = text.match(/^###\s+([\s\S]+)$/);
  if (h3) {
    return <h3>{h3[1].trim()}</h3>;
  }

  const published = parsePublishedImageBlock(text);
  if (published) {
    return (
      <figure className="overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        {/* eslint-disable-next-line @next/next/no-img-element -- lesson media from Storage / CMS URLs */}
        <img
          src={published.url}
          alt={published.alt}
          className="h-auto w-full object-contain"
        />
        {published.caption ? (
          <figcaption className="border-t border-zinc-200/80 px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            {published.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  const screenshot = text.match(/^\[Screenshot:\s*([\s\S]+?)\]$/);
  if (screenshot) {
    if (hideIncompleteMedia) return null;
    return (
      <figure className="overflow-hidden rounded-xl border border-dashed border-amber-300/80 bg-amber-50/50 dark:border-amber-800/50 dark:bg-amber-950/20">
        <div className="flex aspect-video items-center justify-center px-6 text-center">
          <figcaption className="text-sm font-medium leading-relaxed text-amber-900/80 dark:text-amber-100/80">
            Admin only — screenshot requested: {screenshot[1].trim()}
          </figcaption>
        </div>
      </figure>
    );
  }

  const diagram = text.match(/^\[Diagram:\s*([\s\S]+?)\]$/);
  if (diagram) {
    if (hideIncompleteMedia) return null;
    return (
      <figure className="overflow-hidden rounded-xl border border-dashed border-amber-300/80 bg-amber-50/50 dark:border-amber-800/50 dark:bg-amber-950/20">
        <div className="flex min-h-[140px] items-center justify-center px-6 py-8 text-center">
          <figcaption className="text-sm font-medium leading-relaxed text-amber-900/80 dark:text-amber-100/80">
            Admin only — diagram requested: {diagram[1].trim()}
          </figcaption>
        </div>
      </figure>
    );
  }

  const callout = text.match(/^\[Callout:\s*([^\]]+)\]\s*\n([\s\S]+)$/);
  if (callout) {
    return (
      <aside
        className="rounded-xl border border-accent/25 bg-accent/[0.06] px-4 py-3 dark:border-accent/20 dark:bg-accent/[0.08]"
        role="note"
      >
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent dark:text-accent-muted">
          {callout[1].trim()}
        </p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {formatInline(callout[2].trim())}
        </p>
      </aside>
    );
  }

  const brad = text.match(/^\[BradExperience\]\s*\n([\s\S]+)$/);
  if (brad) {
    return (
      <BradTip showFounderLink showPhoto>
        <p className="whitespace-pre-wrap">{formatInline(brad[1].trim())}</p>
      </BradTip>
    );
  }

  // Bulleted list block (lines starting with - )
  if (/^[-*]\s+/m.test(text) && text.split("\n").every((l) => !l.trim() || /^[-*]\s+/.test(l.trim()) || /^\s+/.test(l))) {
    const items = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => /^[-*]\s+/.test(l))
      .map((l) => l.replace(/^[-*]\s+/, ""));
    if (items.length > 0) {
      return (
        <ul className="list-disc space-y-2 pl-5">
          {items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {formatInline(item)}
            </li>
          ))}
        </ul>
      );
    }
  }

  return <p className="whitespace-pre-wrap">{formatInline(text)}</p>;
}

function formatInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    if (m) {
      return <strong key={i}>{m[1]}</strong>;
    }
    return part;
  });
}
