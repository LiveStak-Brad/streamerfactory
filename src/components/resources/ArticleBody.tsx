import type { ReactNode } from "react";

/**
 * Line-break friendly body with lightweight markdown:
 * - `##` / `###` headings
 * - `[Screenshot: …]` placeholders
 * - blank lines = new blocks; single newlines kept inside paragraphs
 */
export function ArticleBody({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  const blocks = content.split(/\n{2,}/).filter((p) => p.trim().length > 0);
  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className={`su-prose ${className}`}>
      {blocks.map((block, i) => (
        <Block key={i} text={block.trim()} />
      ))}
    </div>
  );
}

function Block({ text }: { text: string }) {
  const h2 = text.match(/^##\s+([\s\S]+)$/);
  if (h2) {
    return <h2>{h2[1].trim()}</h2>;
  }

  const h3 = text.match(/^###\s+([\s\S]+)$/);
  if (h3) {
    return <h3>{h3[1].trim()}</h3>;
  }

  const screenshot = text.match(/^\[Screenshot:\s*([\s\S]+?)\]$/);
  if (screenshot) {
    return (
      <figure className="overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/60">
        <div className="flex aspect-video items-center justify-center px-6 text-center">
          <figcaption className="text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
            Screenshot placeholder — {screenshot[1].trim()}
          </figcaption>
        </div>
      </figure>
    );
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
