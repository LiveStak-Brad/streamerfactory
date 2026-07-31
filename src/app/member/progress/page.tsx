import { MemberGrowthBootstrap } from "@/components/member/dashboard/MemberGrowthBootstrap";
import { MemberPageHeader } from "@/components/member/MemberPageHeader";
import { MemberProgressView } from "@/components/member/progress/MemberProgressView";
import { Container } from "@/components/ui/Container";
import { getSessionProfile } from "@/lib/auth/server";
import { getCreatorProgressSummary } from "@/lib/growth/progress/summary";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Progress",
  description:
    "Factory XP, Creator Rank, streaks, weekly challenges, certificates, and career path.",
};

export const dynamic = "force-dynamic";

export default async function MemberProgressPage() {
  const session = await getSessionProfile();
  if (!session?.user) {
    redirect("/login?next=/member/progress");
  }

  const growth = await getCreatorProgressSummary(session.user.id, {
    email: session.user.email,
  });

  return (
    <div className="border-b border-border/70 bg-muted-bg/40 pb-16 pt-8 dark:border-zinc-800 dark:bg-zinc-950/50 sm:pt-10">
      <MemberGrowthBootstrap />
      <Container className="max-w-6xl space-y-6 sm:space-y-8">
        <MemberPageHeader
          eyebrow="Engagement"
          title="Your progress"
          description="XP, streaks, semesters, certificates, and the career path — reasons to come back every day."
        />
        <MemberProgressView growth={growth} />
      </Container>
    </div>
  );
}
