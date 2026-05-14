import type { Metadata } from "next";
import { MembersDirectory } from "@/components/members/MembersDirectory";
import { Section } from "@/components/ui/Section";
import { NETWORK_MEMBERS } from "@/lib/members/network-members";

export const metadata: Metadata = {
  title: "Network members",
  description:
    "Streamer Factory network creators on TikTok — find handles and open profiles to follow each other.",
  openGraph: {
    title: "Network members | Streamer Factory",
    description:
      "Find TikTok profiles for Streamer Factory network members and follow each other on TikTok.",
  },
};

export default function MembersPage() {
  return (
    <>
      <Section className="!pt-12 sm:!pt-16" variant="default">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent dark:text-accent-muted">
            Creator network
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
            Member directory
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
            Everyone listed here is part of the Streamer Factory network. Tap through to TikTok, then follow
            each other to grow together on LIVE.
          </p>
        </div>
      </Section>

      <Section variant="muted" className="!py-14 sm:!py-16" containerClassName="max-w-6xl">
        <MembersDirectory members={NETWORK_MEMBERS} />
      </Section>
    </>
  );
}
