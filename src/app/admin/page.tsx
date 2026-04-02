import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { requireAdmin } from "@/lib/auth/server";

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
    href: "/admin/resources",
    title: "Resources",
    description: "Create and edit resource posts for the public library and homepage.",
    cta: "Manage resources",
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
