"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";

const primaryLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/analytics", label: "Analytics" },
] as const;

const opsLinks = [
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/calendar", label: "Calendar" },
] as const;

const contentLinks = [
  { href: "/admin/rankings", label: "Rankings" },
  { href: "/admin/creator-network", label: "CN imports" },
  { href: "/admin/streameru", label: "StreamerU" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  const active = isActive(pathname, href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-[background-color,color,box-shadow] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        active
          ? "bg-foreground text-background shadow-sm"
          : "text-muted hover:bg-muted-bg hover:text-foreground dark:hover:bg-zinc-900"
      }`}
    >
      {label}
    </Link>
  );
}

export function AdminNav() {
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);

  const allLinks = [...primaryLinks, ...opsLinks, ...contentLinks];

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/90 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/admin"
            className="shrink-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="block text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
              Console
            </span>
            <span className="block text-sm font-bold tracking-tight text-foreground">Streamer Factory</span>
          </Link>
        </div>

        <nav className="hidden min-w-0 flex-1 items-center gap-1 lg:flex" aria-label="Admin">
          <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Overview">
            {primaryLinks.map((l) => (
              <NavLink key={l.href} {...l} pathname={pathname} />
            ))}
          </div>
          <span className="mx-1 h-4 w-px bg-border dark:bg-zinc-700" aria-hidden />
          <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Operations">
            {opsLinks.map((l) => (
              <NavLink key={l.href} {...l} pathname={pathname} />
            ))}
          </div>
          <span className="mx-1 h-4 w-px bg-border dark:bg-zinc-700" aria-hidden />
          <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Content">
            {contentLinks.map((l) => (
              <NavLink key={l.href} {...l} pathname={pathname} />
            ))}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/"
            className="hidden text-sm font-semibold text-accent transition-colors hover:text-accent-hover sm:inline dark:text-accent-muted"
          >
            ← Site
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-border/90 bg-surface px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden dark:border-zinc-700"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id={menuId}
          className="border-t border-border/80 px-4 py-3 lg:hidden dark:border-zinc-800"
          aria-label="Admin mobile"
        >
          <ul className="grid gap-1 sm:grid-cols-2">
            {allLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    isActive(pathname, l.href)
                      ? "bg-foreground text-background"
                      : "text-foreground hover:bg-muted-bg"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-accent dark:text-accent-muted"
              >
                ← Back to site
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
