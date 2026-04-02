"use client";

import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/client";
import { canAccessAdmin } from "@/lib/auth/access";
import type { OwnerNetworkViewMode } from "@/lib/auth/network-view";
import { mainNav, site } from "@/lib/site";
import { NetworkViewToggle } from "@/components/layout/NetworkViewToggle";

type HeaderProps = {
  /** Site owner only: switch between visitor and member experience (Battle Hub, calendar, scheduler). */
  ownerNetworkViewMode?: OwnerNetworkViewMode | null;
};

export function SiteHeader({ ownerNetworkViewMode = null }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profileRole, setProfileRole] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    // Subscribe first so SIGNED_OUT / INITIAL_SESSION stay in sync with cookies.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    // getSession() can return a stale tab-local session after server sign-out; getUser() validates JWT/cookies.
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

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-surface/80 shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset] backdrop-blur-xl dark:border-zinc-800/90 dark:bg-zinc-950/75 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]">
      <Container className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3.5">
            <span
              className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-accent/35 bg-zinc-950 text-sm font-bold tracking-tight text-white shadow-[0_0_0_1px_rgba(99,102,241,0.25),0_8px_28px_-6px_rgba(99,102,241,0.45)] transition-[box-shadow,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:shadow-[0_0_0_1px_rgba(129,140,248,0.45),0_12px_36px_-8px_rgba(99,102,241,0.55)] dark:border-accent/50 dark:bg-zinc-900 dark:text-accent-muted"
              aria-hidden
            >
              <span className="absolute inset-0 bg-gradient-to-br from-accent/25 via-transparent to-transparent opacity-80" />
              <span className="relative">SF</span>
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-xl">
                {site.name}
              </span>
              <span className="mt-1 hidden text-[0.65rem] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:block">
                Creator network
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
          className={`flex flex-col gap-1 sm:flex sm:flex-row sm:items-center sm:gap-2 ${open ? "flex" : "hidden sm:flex"}`}
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative rounded-lg px-3 py-2.5 text-[0.95rem] font-semibold text-zinc-600 transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:text-zinc-950 hover:after:scale-x-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:after:bg-accent-muted sm:py-2"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-zinc-200/90 pt-3 sm:mt-0 sm:ml-2 sm:flex-row sm:items-center sm:gap-2 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0 dark:border-zinc-800/90">
            {user ? (
              <>
                {profileRole !== null && canAccessAdmin(profileRole) && (
                  <Link
                    href="/admin"
                    className="rounded-lg px-3 py-2.5 text-center text-[0.95rem] font-semibold text-accent transition-colors hover:text-zinc-950 dark:text-accent-muted dark:hover:text-zinc-50 sm:py-2"
                    onClick={() => setOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                {ownerNetworkViewMode != null && (
                  <div className="flex justify-center sm:justify-start" onClick={() => setOpen(false)}>
                    <NetworkViewToggle mode={ownerNetworkViewMode} />
                  </div>
                )}
                <Link
                  href="/auth/signout"
                  prefetch={false}
                  className="rounded-lg px-3 py-2.5 text-center text-[0.95rem] font-semibold text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 sm:py-2"
                  onClick={() => setOpen(false)}
                >
                  Sign out
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-2.5 text-center text-[0.95rem] font-semibold text-accent shadow-sm transition-colors hover:border-accent/60 hover:bg-accent/15 dark:text-accent-muted sm:py-2"
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
