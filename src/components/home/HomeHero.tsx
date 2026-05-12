import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { tiktokCreatorNetworkApplyUrl } from "@/lib/site";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-zinc-950 pb-24 pt-16 text-zinc-50 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24">
      {/* Layered depth: glow + grid + vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-25%,rgba(99,102,241,0.45),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_100%_0%,rgba(255,255,255,0.07),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_20%,black,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/90"
        aria-hidden
      />

      <Container className="relative">
        <div className="max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-muted shadow-[0_0_32px_-8px_rgba(99,102,241,0.55)] backdrop-blur-md sm:text-sm">
            TikTok LIVE creator agency
          </p>
          <h1 className="mt-8 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl xl:text-[3.55rem] xl:leading-[1.05]">
            Turn live streaming into a{" "}
            <span className="inline-block bg-gradient-to-br from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              real business
            </span>
            .
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl sm:leading-relaxed">
            Learn the playbook, connect with the network, schedule battles on a shared calendar, and grow
            with coaching — one agency layer for TikTok LIVE creators who treat streaming like a business, not
            a hobby.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={tiktokCreatorNetworkApplyUrl}
              external
              variant="primary"
              className="min-h-[52px] px-8 sm:min-w-[200px]"
            >
              Join Creator Network on TikTok
            </Button>
            <Button href="/apply" variant="secondaryOnDark" className="min-h-[52px] px-8 sm:min-w-[200px]">
              Request website access
            </Button>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500">
            TikTok handles Creator Network membership — then we enable scheduling and training on this site.{" "}
            <Link
              href="/about"
              className="font-semibold text-zinc-300 underline-offset-2 hover:text-white hover:underline"
            >
              How it works →
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
