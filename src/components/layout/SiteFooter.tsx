import Link from "next/link";
import { SfLogoMark } from "@/components/brand/SfLogoMark";
import { Container } from "@/components/ui/Container";
import { footerNav, site } from "@/lib/site";

const GUIDE_LINKS = [
  { label: "TikTok LIVE Agency", href: "/guides/tiktok-live-agency" },
  { label: "Creator Network", href: "/guides/tiktok-creator-network" },
  { label: "How to Join", href: "/guides/how-to-join-tiktok-live-agency" },
  { label: "Monetization Guide", href: "/guides/tiktok-monetization-guide" },
  { label: "Creator Academy", href: "/guides/creator-academy" },
  { label: "All guides", href: "/guides" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-5">
            <div className="flex items-center gap-3">
              <SfLogoMark size="md" />
              <p className="text-lg font-bold tracking-tight text-white">{site.name}</p>
            </div>
            <p className="text-base leading-relaxed text-zinc-400">
              TikTok LIVE creator agency — recruitment, onboarding, training, and day-to-day management
              for serious streamers.
            </p>
            <p className="text-sm font-medium text-accent-muted">{site.domain}</p>
            <p className="text-sm">
              <a
                href={`mailto:${encodeURIComponent(site.contactEmail)}`}
                className="font-semibold text-zinc-400 transition-colors hover:text-white"
              >
                {site.contactEmail}
              </a>
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            <nav aria-label="Footer">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Site</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {footerNav
                  .filter((item) => !item.href.startsWith("/guides/"))
                  .map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-[0.95rem] font-semibold text-zinc-500 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
            <nav aria-label="Creator guides">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Guides</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {GUIDE_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.95rem] font-semibold text-zinc-500 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-sm text-zinc-600">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
