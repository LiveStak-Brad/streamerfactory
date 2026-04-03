import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { requireAdmin } from "@/lib/auth/server";
import { getAllResourcePosts } from "@/lib/resources/queries";

function statusBadge(status: string) {
  const published = status === "published";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        published
          ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200"
          : "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

export default async function AdminStreamerUPage() {
  await requireAdmin();
  const posts = await getAllResourcePosts();

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-accent dark:text-accent-muted">
              Admin
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              StreamerU
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Create, publish, and manage public resource posts.
            </p>
          </div>
          <Link
            href="/admin/streameru/new"
            className="inline-flex items-center justify-center rounded-xl border border-accent/40 bg-accent/15 px-4 py-2.5 text-sm font-semibold text-accent shadow-sm transition-colors hover:border-accent/55 hover:bg-accent/25 dark:text-accent-muted"
          >
            New resource
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200/90 bg-surface shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
          {posts.length === 0 ? (
            <p className="px-6 py-12 text-center text-zinc-600 dark:text-zinc-400">
              No lessons yet.{" "}
              <Link href="/admin/streameru/new" className="font-semibold text-accent hover:underline dark:text-accent-muted">
                Create one
              </Link>
              .
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-muted-bg/50 dark:border-zinc-800 dark:bg-zinc-900/50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">Title</th>
                  <th className="hidden px-4 py-3 font-semibold text-zinc-800 md:table-cell dark:text-zinc-200">
                    Category
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">Status</th>
                  <th className="hidden px-4 py-3 font-semibold text-zinc-800 lg:table-cell dark:text-zinc-200">
                    Updated
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200" />
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {posts.map((post) => {
                  const cat = post.resource_categories;
                  return (
                    <tr key={post.id} className="bg-surface/80 dark:bg-transparent">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-zinc-900 dark:text-zinc-100">{post.title}</div>
                        <div className="mt-0.5 font-mono text-xs text-zinc-500">{post.slug}</div>
                        {post.featured && (
                          <span className="mt-1 inline-block text-xs font-semibold text-accent dark:text-accent-muted">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="hidden px-4 py-3 text-zinc-600 md:table-cell dark:text-zinc-400">
                        {cat?.name ?? "—"}
                      </td>
                      <td className="px-4 py-3">{statusBadge(post.status)}</td>
                      <td className="hidden px-4 py-3 text-zinc-600 lg:table-cell dark:text-zinc-400">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(post.updated_at))}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/streameru/${post.id}/edit`}
                          className="font-semibold text-accent hover:underline dark:text-accent-muted"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          <Link href="/admin" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            ← Admin home
          </Link>
          {" · "}
          <Link href="/streameru" className="font-semibold text-zinc-600 hover:underline dark:text-zinc-400">
            View public StreamerU
          </Link>
        </p>
      </Container>
    </section>
  );
}
