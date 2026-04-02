/**
 * Plain-text / line-break friendly body. Swap for rich text later without changing routes.
 */
export function ArticleBody({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  const paragraphs = content.split(/\n{2,}/).filter((p) => p.trim().length > 0);
  if (paragraphs.length === 0) {
    return null;
  }
  return (
    <div
      className={`space-y-7 text-[1.0625rem] leading-[1.75] text-zinc-700 dark:text-zinc-300 ${className}`}
    >
      {paragraphs.map((block, i) => (
        <p key={i} className="whitespace-pre-wrap">
          {block.trim()}
        </p>
      ))}
    </div>
  );
}
