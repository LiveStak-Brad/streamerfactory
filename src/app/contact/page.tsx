import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { site, tiktokCreatorNetworkApplyUrl } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: `Contact ${site.name} — questions about partnership, website access, or TikTok LIVE creator support.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section className="!pt-12 sm:!pt-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
          Contact
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
          For partnership questions, application status, or general inquiries, use the
          details below. We’ll route your message to the right team member.
        </p>
        <div className="mt-12 space-y-10 rounded-2xl border border-zinc-200/90 bg-surface p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.65)_inset,0_8px_32px_-28px_rgba(15,23,42,0.1)] sm:p-10 dark:border-zinc-800 dark:bg-zinc-950/40 dark:shadow-none">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-accent dark:text-accent-muted">
              Email
            </h2>
            <a
              href={`mailto:${encodeURIComponent(site.contactEmail)}`}
              className="mt-2 block text-xl font-medium text-accent hover:underline dark:text-accent-muted"
            >
              {site.contactEmail}
            </a>
            <p className="mt-2 text-base text-muted">
              For partnership questions, application follow-ups, and general inquiries—we route messages to the
              right person on the team.
            </p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-accent dark:text-accent-muted">
              Website
            </h2>
            <p className="mt-2 text-xl font-medium text-foreground">{site.domain}</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-accent dark:text-accent-muted">
              Creators
            </h2>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Start with the official{" "}
              <a
                href={tiktokCreatorNetworkApplyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-muted"
              >
                TikTok Creator Network application
              </a>
              . After you&apos;re in, use our Join page to send contact details so we can enable scheduling and
              StreamerU on this site.
            </p>
            <a
              href="/apply"
              className="mt-4 inline-flex text-base font-semibold text-accent hover:text-accent-hover"
            >
              Join &amp; request website access →
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
