import Link from "next/link";

const LINKS = [
  { href: "/founder", label: "Meet the Founder" },
  { href: "/streameru/library", label: "Resource Library" },
  { href: "/rankings", label: "Creator Rankings" },
  { href: "/hall-of-fame", label: "Hall of Fame" },
  { href: "/about", label: "How the Network Works" },
  { href: "/streameru/graduation", label: "Graduation Exam" },
  { href: "/member/progress", label: "Career Path" },
  { href: "/apply", label: "Join Streamer Factory FREE" },
] as const;

/**
 * Natural internal linking cluster for SEO + navigation.
 */
export function AcademyExploreLinks() {
  return (
    <nav
      className="rounded-2xl border border-dashed border-border/80 px-5 py-4 dark:border-zinc-700"
      aria-label="Explore Streamer Factory"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted">
        Explore more
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-accent underline-offset-2 hover:underline dark:text-accent-muted"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">
        Manager College is the post-diploma pathway listed on the academy path — coming as StreamerU
        expands.
      </p>
    </nav>
  );
}
