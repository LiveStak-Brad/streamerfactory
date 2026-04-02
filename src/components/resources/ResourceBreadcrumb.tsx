import Link from "next/link";

type Crumb = { label: string; href?: string };

export function ResourceBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && (
              <span className="text-zinc-300 dark:text-zinc-600" aria-hidden>
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-accent dark:hover:text-accent-muted"
              >
                {item.label}
              </Link>
            ) : (
              <span className="line-clamp-1 text-zinc-800 dark:text-zinc-200">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
