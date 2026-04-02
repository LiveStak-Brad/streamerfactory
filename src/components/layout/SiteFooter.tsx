import Link from "next/link";
import { SfLogoMark } from "@/components/brand/SfLogoMark";
import { Container } from "@/components/ui/Container";
import { footerNav, site } from "@/lib/site";

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
              TikTok LIVE creator agency — recruitment, onboarding, training, and
              day-to-day management for serious streamers.
            </p>
            <p className="text-sm font-medium text-accent-muted">{site.domain}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {footerNav.map((item) => (
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
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-sm text-zinc-600">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
