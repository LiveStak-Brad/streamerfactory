import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — questions about partnership, applications, or TikTok LIVE creator support.`,
};

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
              Website
            </h2>
            <p className="mt-2 text-xl font-medium text-foreground">{site.domain}</p>
            <p className="mt-2 text-base text-muted">
              Email addresses and phone contact will be added here as operations go
              live.
            </p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-accent dark:text-accent-muted">
              Creators
            </h2>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Ready to apply? The fastest path is our application—so we can review your
              LIVE presence and goals in one place.
            </p>
            <a
              href="/apply"
              className="mt-4 inline-flex text-base font-semibold text-accent hover:text-accent-hover"
            >
              Go to application →
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
