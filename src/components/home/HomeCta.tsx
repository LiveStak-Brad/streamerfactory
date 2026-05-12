import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

export function HomeCta() {
  return (
    <Section variant="inverse" className="!py-16 sm:!py-20 lg:!py-24">
      <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-muted dark:text-accent">
            Join
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-white dark:text-zinc-950 sm:text-3xl lg:text-4xl">
            Ready to grow your LIVE business with a real partner?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400 dark:text-zinc-600">
            Start on TikTok&apos;s Creator Network flow, then request access here so we can turn on Battle Hub,
            the calendar, and StreamerU for your account after verification.
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:items-end">
          <Button href={tiktokCreatorNetworkApplyUrl} external variant="inverse" className="min-h-[52px] px-8">
            Join on TikTok
          </Button>
          <Button href="/apply" variant="secondaryOnDark" className="min-h-[52px] px-8">
            Website access
          </Button>
        </div>
      </div>
    </Section>
  );
}
