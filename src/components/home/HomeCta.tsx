import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function HomeCta() {
  return (
    <Section variant="inverse" className="!py-16 sm:!py-20 lg:!py-24">
      <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-muted dark:text-accent">
            Apply
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-white dark:text-zinc-950 sm:text-3xl lg:text-4xl">
            Ready to grow your LIVE business with a real partner?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400 dark:text-zinc-600">
            Apply once — we review every submission. If it&apos;s a fit, you&apos;ll onboard into the same tools
            we use to run battles and support creators: scheduling, calendar, and StreamerU training built for LIVE.
          </p>
        </div>
        <Button href="/apply" variant="inverse" className="min-h-[52px] shrink-0 px-8">
          Apply Now
        </Button>
      </div>
    </Section>
  );
}
