import { socialLinks } from "@/lib/site";

type SocialFollowLinksProps = {
  /** Visual density */
  variant?: "banner" | "footer" | "compact" | "icons";
  className?: string;
  /** Override default heading copy */
  heading?: string;
};

function TikTokGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15Z" />
    </svg>
  );
}

function InstagramGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z" />
    </svg>
  );
}

const links = [
  { ...socialLinks.tiktok, Icon: TikTokGlyph },
  { ...socialLinks.instagram, Icon: InstagramGlyph },
] as const;

/**
 * Prominent TikTok + Instagram follow CTAs for @streamerfactoryllc.
 * Use `banner` on homepage bands, `footer` on the site footer, `compact` in tight chrome.
 */
export function SocialFollowLinks({
  variant = "banner",
  className = "",
  heading,
}: SocialFollowLinksProps) {
  if (variant === "icons") {
    return (
      <div className={`flex items-center gap-1.5 ${className}`} aria-label="Follow Streamer Factory">
        {links.map(({ label, handle, href, Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Follow ${handle} on ${label}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/90 bg-surface text-foreground transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-zinc-700 dark:bg-zinc-900/80 dark:hover:text-accent-muted"
          >
            <Icon className="h-5 w-5" />
            <span className="sr-only">
              Follow {handle} on {label}
            </span>
          </a>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Follow Streamer Factory">
        {links.map(({ label, handle, href, Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border/90 bg-surface px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-zinc-700 dark:bg-zinc-900/80"
          >
            <Icon className="h-4 w-4 shrink-0 text-accent dark:text-accent-muted" />
            <span className="sr-only sm:not-sr-only">{label}</span>
            <span className="font-mono text-xs text-muted sm:text-sm">{handle}</span>
          </a>
        ))}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={className}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Follow</p>
        <p className="mt-2 text-sm text-zinc-400">
          {heading ?? "Catch network updates, battles, and creator drops."}
        </p>
        <ul className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          {links.map(({ label, handle, href, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Icon className="h-5 w-5 shrink-0 text-accent-muted" />
                <span>
                  {label}{" "}
                  <span className="font-mono font-medium text-zinc-400">{handle}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // banner — homepage / mid-page emphasis
  return (
    <div
      className={`flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div className="min-w-0">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Follow the network
        </p>
        <p className="mt-2 text-lg font-bold tracking-tight text-foreground sm:text-xl">
          {heading ?? "TikTok & Instagram · @streamerfactoryllc"}
        </p>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
          Follow both for LIVE updates, creator highlights, and Battle Hub energy.
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        {links.map(({ label, handle, href, Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-xl border border-border/90 bg-surface px-5 text-sm font-semibold text-foreground shadow-sm transition-[transform,border-color,background-color] hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transform-none dark:border-zinc-700 dark:bg-zinc-950/60"
          >
            <Icon className="h-5 w-5 shrink-0 text-accent dark:text-accent-muted" />
            <span>
              Follow on {label}
              <span className="mt-0.5 block font-mono text-xs font-medium text-muted">{handle}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
