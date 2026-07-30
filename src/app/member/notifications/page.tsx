import Link from "next/link";
import { Container } from "@/components/ui/Container";
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

  return (
    <div className="border-b border-border/70 bg-muted-bg/40 pb-16 pt-8 dark:border-zinc-800 dark:bg-zinc-950/50 sm:pt-10">
      <Container className="max-w-3xl space-y-6">
        <header className="space-y-2">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
            Inbox
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Notifications</h1>
          <p className="text-sm text-muted">
            Mission completions, achievements, and onboarding updates.{" "}
            <Link href="/member/dashboard" className="font-semibold text-accent hover:underline dark:text-accent-muted">
              Back to dashboard
            </Link>
          </p>
        </header>

        {notifications.length === 0 ? (
          <p className="rounded-2xl border border-border/80 bg-surface/90 px-4 py-6 text-sm text-muted dark:border-zinc-800 dark:bg-zinc-950/45">
            No notifications yet. Complete a mission or unlock an achievement to get started.
          </p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`rounded-2xl border px-4 py-3 ${
                  n.read_at
                    ? "border-border/60 bg-surface/70 dark:border-zinc-800"
                    : "border-accent/25 bg-accent-soft/40 dark:border-accent/30 dark:bg-accent/10"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground">{n.title}</p>
                    {n.body ? <p className="mt-1 text-xs text-muted">{n.body}</p> : null}
                    <p className="mt-2 text-[0.65rem] text-muted">
                      {new Date(n.created_at).toLocaleString()}
                    </p>
                    {n.href ? (
                      <Link
                        href={n.href}
                        className="mt-2 inline-block text-xs font-semibold text-accent hover:underline dark:text-accent-muted"
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
