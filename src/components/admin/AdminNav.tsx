"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/calendar", label: "Calendar" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/resources", label: "Resources" },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/90 bg-surface/95 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-3 sm:px-6" aria-label="Admin">
        <span className="mr-4 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Admin
        </span>
        {links.map(({ href, label }) => {
          const active =
            href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                active
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-muted-bg dark:text-zinc-400 dark:hover:bg-zinc-900"
              }`}
            >
              {label}
            </Link>
          );
        })}
        <Link
          href="/"
          className="ml-auto text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
        >
          ← Site
        </Link>
      </nav>
    </header>
  );
}
