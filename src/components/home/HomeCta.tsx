import { TrackedCta } from "@/components/analytics/TrackedCta";
import { Section } from "@/components/ui/Section";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

export function HomeCta() {
  return (
    <Section variant="inverse" className="!py-16 sm:!py-20 lg:!py-24">
      <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-muted dark:text-accent">
            Join Streamer Factory
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-white dark:text-zinc-950 sm:text-3xl lg:text-4xl">
            Ready to grow your LIVE business with a real partner?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400 dark:text-zinc-600">
            Step 1: join the Creator Network on TikTok. Step 2: request website access for StreamerU and
            Battle Hub after verification.
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:items-end">
          <TrackedCta
            href={tiktokCreatorNetworkApplyUrl}
            external
            variant="inverse"
            className="min-h-[52px] px-8"
            eventMetadata={{ location: "home_cta", cta: "join_tiktok_cn" }}
          >
            1. Join on TikTok
          </TrackedCta>
          <TrackedCta
            href="/apply"
            variant="secondaryOnDark"
            className="min-h-[52px] px-8"
            eventMetadata={{ location: "home_cta", cta: "request_access" }}
          >
            2. Request website access
          </TrackedCta>
        </div>
      </div>
    </Section>
  );
}
