import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { requireAdmin } from "@/lib/auth/server";
import { getApplications } from "@/lib/applications/queries";

const followerLabels: Record<string, string> = {
  "under-1k": "Under 1,000",
  "1k-10k": "1,000 – 10,000",
  "10k-50k": "10,000 – 50,000",
  "50k-100k": "50,000 – 100,000",
  "100k-plus": "100,000+",
};

function tiktokProfileUrl(raw: string): string {
  const h = raw.trim().replace(/^@/, "");
  if (!h) return "https://www.tiktok.com/";
  return `https://www.tiktok.com/@${encodeURIComponent(h)}`;
}

export default async function AdminApplicationsPage() {
  await requireAdmin();
  let rows: Awaited<ReturnType<typeof getApplications>> = [];
  try {
    rows = await getApplications();
  } catch {
    rows = [];
  }

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-accent dark:text-accent-muted">
              Admin
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Applications
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Submissions from the public Apply form. Only applicants who agreed to be contacted are stored.
            </p>
          </div>
          <Link
            href="/apply"
            className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            View public form →
          </Link>
        </div>

        {rows.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-zinc-300/90 bg-muted-bg/40 px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-950/40">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">No applications yet</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              When creators submit the Apply form, they will appear here.
            </p>
          </div>
        ) : (
          <ul className="mt-10 space-y-6">
            {rows.map((app) => (
              <li
                key={app.id}
                className="rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(app.created_at))}
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-zinc-950 dark:text-zinc-50">
                      {app.full_name}
                    </h2>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-200">
                    Consent to contact
                  </span>
                </div>

                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-medium text-zinc-500 dark:text-zinc-400">Email</dt>
                    <dd className="mt-0.5">
                      <a
                        href={`mailto:${encodeURIComponent(app.email)}`}
                        className="font-semibold text-accent hover:underline dark:text-accent-muted"
                      >
                        {app.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-zinc-500 dark:text-zinc-400">TikTok</dt>
                    <dd className="mt-0.5">
                      <a
                        href={tiktokProfileUrl(app.tiktok_username)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-accent hover:underline dark:text-accent-muted"
                      >
                        {app.tiktok_username.startsWith("@")
                          ? app.tiktok_username
                          : `@${app.tiktok_username}`}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-zinc-500 dark:text-zinc-400">Country</dt>
                    <dd className="mt-0.5 text-zinc-900 dark:text-zinc-100">{app.country}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-zinc-500 dark:text-zinc-400">Followers</dt>
                    <dd className="mt-0.5 text-zinc-900 dark:text-zinc-100">
                      {followerLabels[app.follower_range] ?? app.follower_range}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-zinc-500 dark:text-zinc-400">Goes live on TikTok?</dt>
                    <dd className="mt-0.5 text-zinc-900 dark:text-zinc-100">
                      {app.goes_live === "yes" ? "Yes" : "No"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 border-t border-zinc-200/80 pt-5 dark:border-zinc-800/80">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Why they want to join
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {app.why_join}
                  </p>
                </div>

                <p className="mt-4 font-mono text-xs text-zinc-400 dark:text-zinc-500">ID: {app.id}</p>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-sm text-zinc-500">
          <Link href="/admin" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            ← Admin home
          </Link>
        </p>
      </Container>
    </section>
  );
}
