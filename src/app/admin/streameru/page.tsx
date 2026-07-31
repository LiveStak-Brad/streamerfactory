import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminStatusBadge } from "@/components/admin/ui/AdminStatusBadge";
import {
  AdminTable,
  AdminTableHead,
  AdminTd,
  AdminTh,
  AdminTr,
} from "@/components/admin/ui/AdminTable";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCard } from "@/components/ui/StatCard";
import { requireAdmin } from "@/lib/auth/server";
import { getAllResourcePosts } from "@/lib/resources/queries";

export default async function AdminStreamerUPage() {
  await requireAdmin();
  const posts = await getAllResourcePosts();
  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.length - published;

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="StreamerU"
          description="Create, publish, and manage public resource posts for the academy library."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "StreamerU" },
          ]}
          actions={
            <div className="flex flex-wrap gap-2">
              <Button href="/admin/streameru/setup" variant="secondary" className="min-h-[40px] px-4 text-sm">
                Complete StreamerU Setup
              </Button>
              <Button href="/admin/streameru/new" variant="primary" className="min-h-[40px] px-4 text-sm">
                New resource
              </Button>
            </div>
          }
        />

        {posts.length > 0 ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <StatCard label="Total posts" value={posts.length} accent />
            <StatCard label="Published" value={published} />
            <StatCard label="Drafts" value={drafts} />
          </div>
        ) : null}

        <div className="mt-8">
          {posts.length === 0 ? (
            <EmptyState
              title="No lessons yet"
              description="Publish your first StreamerU resource for the public academy."
              illustration="lessons"
              action={
                <Button href="/admin/streameru/new" variant="primary" className="min-h-[40px] px-4 text-sm">
                  Create resource
                </Button>
              }
            />
          ) : (
            <AdminTable caption="StreamerU resources" minWidth="640px">
              <AdminTableHead>
                <AdminTr>
                  <AdminTh>Title</AdminTh>
                  <AdminTh className="hidden md:table-cell">Category</AdminTh>
                  <AdminTh>Status</AdminTh>
                  <AdminTh className="hidden lg:table-cell">Updated</AdminTh>
                  <AdminTh>
                    <span className="sr-only">Actions</span>
                  </AdminTh>
                </AdminTr>
              </AdminTableHead>
              <tbody>
                {posts.map((post) => {
                  const cat = post.resource_categories;
                  return (
                    <AdminTr key={post.id}>
                      <AdminTd>
                        <div className="font-semibold text-foreground">{post.title}</div>
                        <div className="mt-0.5 font-mono text-xs text-muted">{post.slug}</div>
                        {post.featured ? (
                          <span className="mt-1 inline-block text-xs font-semibold text-accent dark:text-accent-muted">
                            Featured
                          </span>
                        ) : null}
                      </AdminTd>
                      <AdminTd className="hidden text-muted md:table-cell">
                        {cat?.name ?? "—"}
                      </AdminTd>
                      <AdminTd>
                        <AdminStatusBadge tone={post.status === "published" ? "success" : "neutral"}>
                          {post.status === "published" ? "Published" : "Draft"}
                        </AdminStatusBadge>
                      </AdminTd>
                      <AdminTd className="hidden text-muted lg:table-cell">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(post.updated_at))}
                      </AdminTd>
                      <AdminTd className="text-right">
                        <Link
                          href={`/admin/streameru/${post.id}/edit`}
                          className="font-semibold text-accent hover:underline dark:text-accent-muted"
                        >
                          Edit
                        </Link>
                      </AdminTd>
                    </AdminTr>
                  );
                })}
              </tbody>
            </AdminTable>
          )}
        </div>

        <p className="mt-8 text-sm text-muted">
          <Link href="/streameru" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            View public StreamerU →
          </Link>
        </p>
      </Container>
    </section>
  );
}
