import type { Metadata } from "next";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to join Streamer Factory — TikTok LIVE creator agency for recruitment, training, and growth.",
};

export default function ApplyPage() {
  return (
    <Section className="!pt-12 sm:!pt-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
          Apply to Streamer Factory
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
          Tell us about your TikTok LIVE presence. We review every application and
          respond when there’s a potential fit.
        </p>
        <div className="mt-12 rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.65)_inset,0_8px_32px_-28px_rgba(15,23,42,0.12)] sm:p-10 dark:border-zinc-800 dark:bg-zinc-950/40 dark:shadow-none">
          <ApplyForm />
        </div>
      </div>
    </Section>
  );
}
