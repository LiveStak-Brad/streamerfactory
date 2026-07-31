import Image from "next/image";
import { TrackedCta } from "@/components/analytics/TrackedCta";
import { FounderParticles } from "@/components/founder/FounderParticles";
import { Container } from "@/components/ui/Container";
import { FOUNDER } from "@/lib/founder/content";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

export function FounderHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#07060c] text-zinc-50">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_-10%,rgba(91,59,255,0.45),transparent_55%),radial-gradient(ellipse_55%_50%_at_90%_5%,rgba(0,229,255,0.18),transparent_50%),radial-gradient(ellipse_50%_40%_at_60%_100%,rgba(160,32,240,0.22),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,black,transparent)]"
        aria-hidden
      />
      <FounderParticles density="hero" />

      <Container className="relative py-14 sm:py-16 lg:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="relative mb-8">
            <div
              className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-br from-indigo-500/35 via-fuchsia-500/20 to-cyan-400/25 blur-2xl"
              aria-hidden
            />
            <div className="founder-glass relative h-36 w-36 overflow-hidden rounded-full border border-white/20 p-1 shadow-[0_0_40px_-8px_rgba(160,32,240,0.55)] sm:h-44 sm:w-44">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src={FOUNDER.photo}
                  alt={`${FOUNDER.name}, founder of Streamer Factory`}
                  fill
                  priority
                  sizes="176px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
            <span className="block text-lg font-bold uppercase tracking-[0.28em] text-accent-muted sm:text-xl">
              Meet the Founder
            </span>
            <span className="mt-4 block">{FOUNDER.name}</span>
          </h1>
          <p className="mt-4 text-lg font-medium text-zinc-300 sm:text-xl">
            Better known online as{" "}
            <span className="text-gradient-brand font-bold">{FOUNDER.alias}</span>
          </p>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
            &ldquo;I&apos;ve spent years proving that live streaming success isn&apos;t luck. It&apos;s a
            system.&rdquo;
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedCta
              href="#why-i-built"
              variant="primary"
              className="min-h-[52px] px-8 sm:min-w-[200px]"
              eventMetadata={{ location: "founder_hero", cta: "view_journey" }}
            >
              View My Journey
            </TrackedCta>
            <TrackedCta
              href={tiktokCreatorNetworkApplyUrl}
              external
              variant="secondaryOnDark"
              className="min-h-[52px] px-8 sm:min-w-[200px]"
              eventMetadata={{ location: "founder_hero", cta: "join_network" }}
            >
              Join Streamer Factory
            </TrackedCta>
          </div>
        </div>
      </Container>
    </section>
  );
}
