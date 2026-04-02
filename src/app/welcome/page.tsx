import type { Metadata } from "next";
import Link from "next/link";
import { WelcomeContent } from "@/components/welcome/WelcomeContent";
import { Container } from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/server";
import { requireNetworkMember } from "@/lib/auth/server";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Welcome",
  description: `Get started with ${site.name} — confirm your profile, learn the basics, and open Battle Hub.`,
  robots: { index: false, follow: false },
};

export default async function WelcomePage() {
  const session = await requireNetworkMember();
  const supabase = await createClient();

  const { count } = await supabase
    .from("battle_events")
    .select("*", { count: "exact", head: true })
    .eq("created_by", session.user.id);

  const profile = session.profile;
  if (!profile) {
    return null;
  }

  const completed = Boolean(profile.onboarding_completed_at);

  return (
    <div className="relative border-b border-zinc-200/80 bg-muted-bg/30 pb-20 pt-12 dark:border-zinc-800/80 dark:bg-zinc-950/40 sm:pt-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(380px,55vh)] bg-[radial-gradient(ellipse_75%_50%_at_50%_-15%,rgba(99,102,241,0.12),transparent_60%)]"
        aria-hidden
      />
      <Container className="relative max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Member onboarding
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50">
          Welcome to {site.name}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {completed
            ? "You're in the network. Review your progress below, update your profile anytime, or jump into Battle Hub."
            : "You're in the network. This checklist walks you through learn → connect → schedule → grow: confirm your profile, skim Start Here and resources, then open Battle Hub and the calendar so LIVE coordination feels real from day one."}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 rounded-2xl border border-zinc-200/90 bg-surface/80 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950/40">
          <span className="w-full text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Knowledge base
          </span>
          <Link
            href="/resources/start-here"
            className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            Start Here
          </Link>
          <span className="text-zinc-400 dark:text-zinc-600" aria-hidden>
            ·
          </span>
          <Link
            href="/resources#battles"
            className="text-sm font-semibold text-zinc-700 hover:text-accent dark:text-zinc-300 dark:hover:text-accent-muted"
          >
            Battle strategy guides
          </Link>
          <span className="text-zinc-400 dark:text-zinc-600" aria-hidden>
            ·
          </span>
          <Link
            href="/resources"
            className="text-sm font-semibold text-zinc-700 hover:text-accent dark:text-zinc-300 dark:hover:text-accent-muted"
          >
            All resources
          </Link>
        </div>

        <WelcomeContent
          profile={profile}
          battleEventCount={count ?? 0}
          showCompletedBanner={completed}
        />
      </Container>
    </div>
  );
}
