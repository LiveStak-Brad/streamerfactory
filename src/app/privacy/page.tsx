import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";
import { TIKTOK_PRIVACY_SITE_VERIFICATION_LINE } from "@/lib/tiktok/site-verification";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} handles information for creators and applicants.`,
};

export default function PrivacyPage() {
  return (
    <Section className="!pt-12 sm:!pt-16">
      <p className="sr-only" aria-hidden="true">
        {TIKTOK_PRIVACY_SITE_VERIFICATION_LINE}
      </p>
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Legal
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Privacy</h1>
        <p className="mt-4 text-sm text-muted">Last updated April 1, 2026</p>

        <div className="mt-10 space-y-10 text-muted">
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Overview</h2>
            <p className="mt-3 leading-relaxed">
              {site.name} ({site.domain}) collects only what we need to run the platform, review applications,
              and support approved members. This page summarizes our practices in plain language. It is not a
              substitute for legal advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">What we collect</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed">
              <li>
                <span className="font-semibold text-foreground">Account data</span> — email and authentication
                details from our sign-in provider when you create an account.
              </li>
              <li>
                <span className="font-semibold text-foreground">Application data</span> — information you
                submit on the Apply form (for example name, TikTok handle, and answers you provide).
              </li>
              <li>
                <span className="font-semibold text-foreground">Profile &amp; usage</span> — profile fields you
                save in the app (such as timezone or TikTok username) and data you create as a member (e.g.
                scheduled battles), stored in our database.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">How we use data</h2>
            <p className="mt-3 leading-relaxed">
              We use this information to operate the site, evaluate applications, communicate about your
              account, and provide member features. We do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Contact &amp; questions</h2>
            <p className="mt-3 leading-relaxed">
              For privacy-related requests or questions, reach us through{" "}
              <Link href="/contact" className="font-semibold text-accent hover:underline dark:text-accent-muted">
                Contact
              </Link>
              . We may update this page as the product evolves; the &quot;Last updated&quot; date will change
              when we do.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
