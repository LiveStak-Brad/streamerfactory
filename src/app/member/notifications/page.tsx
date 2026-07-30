import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MemberPageHeader } from "@/components/member/MemberPageHeader";
import { getSessionProfile } from "@/lib/auth/server";
import { listNotifications } from "@/lib/growth/notifications/service";
import { MarkNotificationReadButton } from "@/components/member/notifications/MarkNotificationReadButton";

export const metadata = {
  title: "Notifications",
  description: "Your Streamer Factory notifications.",
};

export const dynamic = "force-dynamic";

export default async function MemberNotificationsPage() {
  const session = await getSessionProfile();
  const userId = session?.user?.id;
  if (!userId) return null;

  const notifications = await listNotifications(userId, { limit: 50 });
  const unread = notifications.filter((n) => !n.read_at).length;

  return (
    <div className="border-b border-border/70 bg-muted-bg/40 pb-16 pt-8 dark:border-zinc-800 dark:bg-zinc-950/50 sm:pt-10">
      <Container className="max-w-3xl space-y-6">
        <MemberPageHeader
          eyebrow="Inbox"
          title="Notifications"
          description={
            unread > 0
              ? `You have ${unread} unread update${unread === 1 ? "" : "s"}.`
              : "Mission completions, achievements, and onboarding updates."
          }
        />

        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/80 bg-surface/90 px-5 py-8 dark:border-zinc-800 dark:bg-zinc-950/45">
            <p className="text-base font-semibold text-foreground">You&apos;re caught up</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Nothing new yet. Complete a mission or checklist step and updates will show up here.
            </p>
            <Link
              href="/member/dashboard"
              className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              Today&apos;s missions →
            </Link>
          </div>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`rounded-2xl border px-4 py-3.5 ${
                  n.read_at
                    ? "border-border/60 bg-surface/70 dark:border-zinc-800"
                    : "border-accent/25 bg-accent-soft/40 dark:border-accent/30 dark:bg-accent/10"
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground">{n.title}</p>
                    {n.body ? <p className="mt-1 text-xs leading-relaxed text-muted">{n.body}</p> : null}
                    <p className="mt-2 text-[0.65rem] text-muted">
                      {new Date(n.created_at).toLocaleString()}
                    </p>
                    {n.href ? (
                      <Link
                        href={n.href}
                        className="mt-2 inline-flex min-h-[40px] items-center text-xs font-semibold text-accent hover:underline dark:text-accent-muted"
                      >
                        Open →
                      </Link>
                    ) : null}
                  </div>
                  {!n.read_at ? <MarkNotificationReadButton id={n.id} /> : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
