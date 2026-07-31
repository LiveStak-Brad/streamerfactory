import Link from "next/link";
import type { LessonInternalLink } from "@/lib/resources/lesson-seo";

type Props = {
  links: LessonInternalLink[];
};

/**
 * Trust + learning-path internal links for E-E-A-T on lesson pages.
 */
export function LessonAuthorityLinks({ links }: Props) {
  if (links.length === 0) return null;

  return (
    <aside className="rounded-2xl border border-zinc-200/90 bg-muted-bg/40 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950/40">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
        Keep learning
      </p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        StreamerU lessons are taught from real TikTok LIVE experience. Explore the path, the people behind
        the training, and how we publish.
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="text-zinc-700 underline-offset-2 hover:text-accent hover:underline dark:text-zinc-300 dark:hover:text-accent-muted"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
