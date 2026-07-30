"use client";

import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/client";
import { canAccessAdmin, canScheduleBattles } from "@/lib/auth/access";
import type { OwnerNetworkViewMode } from "@/lib/auth/network-view";
import { mainNav, platformNav, site } from "@/lib/site";
import { SfLogoMark } from "@/components/brand/SfLogoMark";
import { NetworkViewToggle } from "@/components/layout/NetworkViewToggle";

type HeaderProps = {
  /** Site owner only: switch between visitor and member experience (Battle Hub, calendar, scheduler). */
  ownerNetworkViewMode?: OwnerNetworkViewMode | null;
};

function linkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ ownerNetworkViewMode = null }: HeaderProps) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profileRole, setProfileRole] = useState<string | null>(null);
  const platformMenuId = useId();
  const accountMenuId = useId();
  const platformRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    void supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error) {
        setUser(null);
        return;
      }
      setUser(user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setProfileRole(null);
      return;
    }
    const supabase = createClient();
    void supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => setProfileRole(data?.role ?? null));
  }, [user]);

  useEffect(() => {
    setOpen(false);
    setPlatformOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (platformRef.current && !platformRef.current.contains(target)) {
        setPlatformOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(target)) {
        setAccountOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPlatformOpen(false);
        setAccountOpen(false);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const platformActive = platformNav.some((item) => linkActive(pathname, item.href));
  const isMember = profileRole !== null && canScheduleBattles(profileRole);
  const isAdmin = profileRole !== null && canAccessAdmin(profileRole);
  const isApplicant = profileRole === "applicant";

  const navLinkClass = (active: boolean, emphasize = false) =>
    `relative rounded-lg px-3 py-2 text-[0.92rem] font-semibold transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-200 dark:after:bg-accent-muted sm:py-1.5 ${
      active ? "text-zinc-950 after:scale-x-100 dark:text-zinc-50" : "after:scale-x-0 hover:after:scale-x-100"
    } ${
      emphasize
        ? "text-accent hover:text-accent dark:text-accent-muted"
        : active
          ? ""
          : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-surface/75 shadow-[0_1px_0_0_rgba(255,255,255,0.55)_inset] backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]">
      <Container className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-3.5">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <span className="transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-0.5">
              <SfLogoMark
                size="lg"
                className="group-hover:shadow-[0_0_0_1px_rgba(0,229,255,0.45),0_12px_36px_-8px_rgba(160,32,240,0.55)]"
              />
            </span>
            <div className="flex min-w-0 flex-col leading-none">
              <span className="truncate text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-xl">
                {site.name}
              </span>
              <span className="mt-1 hidden text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:block">
                TikTok LIVE network
              </span>
            </div>
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-surface px-3.5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600 sm:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        <nav
          id="site-nav"
          className={`flex flex-col gap-1 sm:flex sm:flex-row sm:items-center sm:gap-0.5 lg:gap-1 ${
            open ? "flex" : "hidden sm:flex"
          }`}
        >
          <div className="relative" ref={platformRef}>
            <button
              type="button"
              className={`${navLinkClass(platformActive)} flex w-full items-center justify-between gap-1.5 sm:w-auto`}
              aria-expanded={platformOpen}
              aria-controls={platformMenuId}
              onClick={() => {
                setPlatformOpen((v) => !v);
                setAccountOpen(false);
              }}
            >
              Platform
              <svg
                viewBox="0 0 12 12"
                className={`h-3 w-3 opacity-70 transition-transform ${platformOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path
                  d="M2.5 4.25 6 7.75l3.5-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              id={platformMenuId}
              className={`${
                platformOpen ? "flex" : "hidden"
              } z-50 flex-col gap-1 rounded-2xl border border-zinc-200/90 bg-surface p-2 shadow-[0_24px_48px_-24px_rgba(15,23,42,0.45)] sm:absolute sm:left-0 sm:top-full sm:mt-2 sm:w-72 dark:border-zinc-700 dark:bg-zinc-950 dark:shadow-black/50`}
            >
              {platformNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3 py-2.5 transition-colors ${
                    linkActive(pathname, item.href)
                      ? "bg-accent-soft text-accent dark:text-accent-muted"
                      : "hover:bg-muted-bg"
                  }`}
                  onClick={() => {
                    setOpen(false);
                    setPlatformOpen(false);
                  }}
                >
                  <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted">{item.description}</span>
                </Link>
              ))}
            </div>
          </div>

          {mainNav.map((item) => {
            const isJoin = item.href === "/apply";
            const active = linkActive(pathname, item.href);
            if (isJoin && !user) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mt-1 inline-flex items-center justify-center rounded-xl bg-accent px-3.5 py-2 text-[0.92rem] font-semibold text-accent-foreground shadow-[0_8px_20px_-8px_var(--accent-glow)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-accent-hover sm:mt-0 sm:ml-1 dark:text-zinc-950"
                  onClick={() => setOpen(false)}
                >
                  Join
                </Link>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(active, isJoin)}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="mt-2 flex flex-col gap-2 border-t border-zinc-200/90 pt-3 sm:mt-0 sm:ml-2 sm:flex-row sm:items-center sm:gap-2 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0 dark:border-zinc-800/90">
            {user ? (
              <>
                {isMember ? (
                  <Link
                    href="/member/dashboard"
                    className={`rounded-xl px-3 py-2 text-center text-[0.92rem] font-semibold transition-colors sm:py-1.5 ${
                      linkActive(pathname, "/member/dashboard")
                        ? "bg-accent text-accent-foreground shadow-sm dark:text-zinc-950"
                        : "bg-accent/10 text-accent hover:bg-accent/15 dark:text-accent-muted"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : null}

                <div className="relative" ref={accountRef}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-2 rounded-xl border border-zinc-200/90 bg-muted-bg/70 px-3 py-2 text-[0.92rem] font-semibold text-zinc-800 transition-colors hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:border-zinc-600 sm:w-auto"
                    aria-expanded={accountOpen}
                    aria-controls={accountMenuId}
                    onClick={() => {
                      setAccountOpen((v) => !v);
                      setPlatformOpen(false);
                    }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isAdmin ? "bg-violet-500" : isMember ? "bg-emerald-500" : "bg-amber-400"
                        }`}
                        aria-hidden
                      />
                      {isAdmin ? "Admin" : isMember ? "Member" : isApplicant ? "Applicant" : "Account"}
                    </span>
                    <svg viewBox="0 0 12 12" className="h-3 w-3 opacity-70" aria-hidden>
                      <path
                        d="M2.5 4.25 6 7.75l3.5-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    id={accountMenuId}
                    className={`${
                      accountOpen ? "flex" : "hidden"
                    } z-50 mt-1 flex-col gap-0.5 rounded-2xl border border-zinc-200/90 bg-surface p-2 shadow-[0_24px_48px_-24px_rgba(15,23,42,0.45)] sm:absolute sm:right-0 sm:top-full sm:mt-2 sm:w-56 dark:border-zinc-700 dark:bg-zinc-950`}
                  >
                    {isApplicant ? (
                      <Link
                        href="/application-status"
                        className="rounded-xl px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted-bg"
                        onClick={() => setOpen(false)}
                      >
                        Application status
                      </Link>
                    ) : null}
                    {isMember ? (
                      <>
                        <Link
                          href="/member/dashboard"
                          className="rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted-bg sm:py-2"
                          onClick={() => setOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/member/onboarding"
                          className="rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted-bg sm:py-2"
                          onClick={() => setOpen(false)}
                        >
                          Onboarding
                        </Link>
                        <Link
                          href="/member/leaderboard"
                          className="rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted-bg sm:py-2"
                          onClick={() => setOpen(false)}
                        >
                          My rankings
                        </Link>
                        <Link
                          href="/member/notifications"
                          className="rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted-bg sm:py-2"
                          onClick={() => setOpen(false)}
                        >
                          Notifications
                        </Link>
                        <Link
                          href="/member/activity"
                          className="rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted-bg sm:py-2"
                          onClick={() => setOpen(false)}
                        >
                          Activity
                        </Link>
                      </>
                    ) : null}
                    {isAdmin ? (
                      <Link
                        href="/admin"
                        className="rounded-xl px-3 py-2 text-sm font-semibold text-accent hover:bg-muted-bg dark:text-accent-muted"
                        onClick={() => setOpen(false)}
                      >
                        Admin console
                      </Link>
                    ) : null}
                    {ownerNetworkViewMode != null ? (
                      <div className="rounded-xl border border-dashed border-zinc-300/80 px-2.5 py-2 dark:border-zinc-700">
                        <p className="mb-1.5 px-0.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
                          Owner preview
                        </p>
                        <NetworkViewToggle mode={ownerNetworkViewMode} />
                      </div>
                    ) : null}
                    <Link
                      href="/auth/signout"
                      prefetch={false}
                      className="rounded-xl px-3 py-2 text-sm font-semibold text-zinc-600 hover:bg-muted-bg hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                      onClick={() => setOpen(false)}
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-xl border border-zinc-200/90 bg-surface px-3.5 py-2 text-center text-[0.92rem] font-semibold text-zinc-800 shadow-sm transition-colors hover:border-accent/40 hover:text-accent dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-accent/40 dark:hover:text-accent-muted sm:py-1.5"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}
