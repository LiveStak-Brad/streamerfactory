import type { ResourceCategoryRow } from "@/lib/resources/types";

function formatDate(iso: string | null) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export function ResourceMeta({
  publishedAt,
  category,
}: {
  publishedAt: string | null;
  category: Pick<ResourceCategoryRow, "name"> | null | undefined;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
      {category?.name && (
        <span className="inline-flex items-center rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent dark:text-accent-muted">
          {category.name}
        </span>
      )}
      {publishedAt && (
        <time dateTime={publishedAt} className="font-medium text-zinc-600 dark:text-zinc-400">
          {formatDate(publishedAt)}
        </time>
      )}
    </div>
  );
}
