import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for ${site.name} creators and visitors.`,
};

export default function TermsPage() {
  return (
    <Section className="!pt-12 sm:!pt-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Legal
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Terms of use</h1>
        <p className="mt-4 text-sm text-muted">Last updated April 1, 2026</p>

        <div className="mt-10 space-y-10 text-muted">
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Agreement</h2>
            <p className="mt-3 leading-relaxed">
              By accessing {site.name} at {site.domain}, you agree to these terms. If you do not agree, do not
              use the site. We may update these terms; continued use after changes means you accept the
              revised version.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">The service</h2>
            <p className="mt-3 leading-relaxed">
              {site.name} provides a creator network platform including application workflows, member tools
              (such as scheduling and calendars), and related content. Features may change as we improve the
              product.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Accounts &amp; eligibility</h2>
            <p className="mt-3 leading-relaxed">
              You are responsible for your account credentials and for activity under your account. Membership
              and certain features require approval by our team. We may suspend or remove access for abuse,
              fraud, or violations of platform rules.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Disclaimer</h2>
            <p className="mt-3 leading-relaxed">
              The service is provided &quot;as is.&quot; We do not guarantee specific results, growth, or
              income. Creator success depends on many factors outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Contact</h2>
            <p className="mt-3 leading-relaxed">
              Questions about these terms? Use our{" "}
              <Link href="/contact" className="font-semibold text-accent hover:underline dark:text-accent-muted">
                Contact
              </Link>{" "}
              page.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
