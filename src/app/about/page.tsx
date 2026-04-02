import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Streamer Factory helps TikTok LIVE creators grow with professional onboarding, training, and management.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="!pt-12 sm:!pt-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
            About Streamer Factory
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            Streamer Factory is a TikTok LIVE creator agency built for operators—creators
            who want to grow an audience, build trust, and earn sustainably. We combine
            recruitment, structured onboarding, hands-on training, and ongoing management
            so you can focus on your craft while we help you professionalize the business
            around it.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            This isn’t a gaming brand and it isn’t a viewer product. It’s a company
            website for a real partner network: clear expectations, real coaching, and
            a conversion-focused approach to helping creators win on LIVE.
          </p>
        </div>
      </Section>
      <Section variant="muted" className="!py-14 sm:!py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            What “agency” means here
          </h2>
          <ul className="mt-6 space-y-4 text-muted">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                We recruit selectively—fit matters as much as follower count.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                We onboard with documentation and clarity—so creators know how we work.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                We train for retention and monetization—practical, repeatable habits.
              </span>
            </li>
          </ul>
          <div className="mt-10">
            <Button href="/apply" variant="primary" className="min-h-[48px] px-8">
              Apply Now
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
