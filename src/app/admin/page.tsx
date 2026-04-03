import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getMyApplication } from "@/lib/applications/queries";
import { requireAdmin } from "@/lib/auth/server";

const followerLabels: Record<string, string> = {
  "under-1k": "Under 1,000",
  "1k-10k": "1,000 – 10,000",
  "10k-50k": "10,000 – 50,000",
  "50k-100k": "50,000 – 100,000",
  "100k-plus": "100,000+",
};

const cards = [
  {
    href: "/admin/calendar",
    title: "Network calendar",
    description:
      "Edit, cancel, or delete scheduled battles. Same data as the public Battle Hub calendar.",
    cta: "Manage calendar",
  },
  {
    href: "/admin/members",
    title: "Members",
    description:
      "Review accounts pending approval. Promote applicants to member after TikTok / Apply verification so they can use Battle Hub.",
    cta: "Manage members",
  },
  {
    href: "/admin/applications",
    title: "Applications",
    description: "Public Apply form submissions. Cross-check TikTok and contact details before approving accounts.",
    cta: "Review applications",
  },
  {
    href: "/admin/streameru",
    title: "StreamerU",
    description: "Create and edit resource posts for the public library and homepage.",
    cta: "Manage StreamerU",
  },
  {
    href: "/battle-hub",
    title: "Battle Hub (public)",
    description:
      "As site owner, your Battle Hub home matches visitors. Open it here, or use Scheduler / Calendar from the banner on that page.",
    cta: "Open public Battle Hub",
  },
] as const;

export default async function AdminHomePage() {
  const session = await requireAdmin();

  let myApplication = null as Awaited<ReturnType<typeof getMyApplication>>;
  try {
    myApplication = await getMyApplication(session.user.id);
  } catch {
    myApplication = null;
  }

  const tiktokRaw =
    session.profile?.tiktok_username?.trim() || myApplication?.tiktok_username?.trim() || "";
  const tiktokDisplay = tiktokRaw ? (tiktokRaw.startsWith("@") ? tiktokRaw : `@${tiktokRaw}`) : null;
  const followerDisplay = myApplication?.follower_range
    ? (followerLabels[myApplication.follower_range] ?? myApplication.follower_range)
    : null;

  return (
    <section className="py-12 sm:py-20">
      <Container className="max-w-5xl">
        <p className="text-sm font-medium uppercase tracking-wider text-accent dark:text-accent-muted">Admin</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Owner dashboard</h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Signed in as{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-200">{session?.user.email ?? session?.user.id}</span>
          . Role:{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-200">{session?.profile?.role ?? "—"}</span>.
        </p>

        <dl className="mt-6 grid max-w-lg gap-3 rounded-2xl border border-zinc-200/90 bg-muted-bg/50 px-5 py-4 text-sm dark:border-zinc-800 dark:bg-zinc-950/40 sm:grid-cols-2 sm:gap-4">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              TikTok username
            </dt>
            <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-100">
              {tiktokDisplay ?? <span className="font-normal text-zinc-500 dark:text-zinc-400">Not set</span>}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Follower count
            </dt>
            <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-100">
              {followerDisplay ?? (
                <span className="font-normal text-zinc-500 dark:text-zinc-400">Not on file</span>
              )}
            </dd>
          </div>
        </dl>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {cards.map((card) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className="flex h-full flex-col rounded-2xl border border-zinc-200/90 bg-surface/90 p-6 shadow-sm transition hover:border-accent/30 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:border-accent/25"
              >
                <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">{card.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {card.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-accent dark:text-accent-muted">{card.cta} →</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-zinc-500">
          <Link href="/battle-hub" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            Battle Hub
          </Link>
          <span className="mx-2 text-zinc-400">·</span>
          <Link href="/" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            ← Back to site
          </Link>
        </p>
      </Container>
    </section>
  );
}
