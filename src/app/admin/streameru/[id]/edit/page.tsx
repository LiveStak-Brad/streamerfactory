import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { ResourceDeleteForm } from "@/components/admin/ResourceDeleteForm";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { Container } from "@/components/ui/Container";
import { requireAdmin } from "@/lib/auth/server";
import { getResourceCategories, getResourcePostById } from "@/lib/resources/queries";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditResourcePage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();

  const [post, categories] = await Promise.all([
    getResourcePostById(id),
    getResourceCategories(),
  ]);
  if (!post) notFound();

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-3xl">
        <AdminPageHeader
          title="Edit resource"
          description={
            <>
              Post ID <span className="font-mono text-xs text-muted">{post.id}</span>
            </>
          }
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "StreamerU", href: "/admin/streameru" },
            { label: "Edit" },
          ]}
        />

        <AdminPanel className="mt-8" raised>
          <ResourceForm categories={categories} mode="edit" initial={post} />
        </AdminPanel>

        <div className="mt-8 rounded-2xl border border-rose-200/80 bg-rose-50/80 p-6 dark:border-rose-900/50 dark:bg-rose-950/30">
          <h2 className="text-sm font-semibold text-rose-900 dark:text-rose-200">Danger zone</h2>
          <p className="mt-1 text-sm text-rose-800/90 dark:text-rose-200/90">
            Deleting removes this resource permanently (public URLs will 404).
          </p>
          <div className="mt-4">
            <ResourceDeleteForm resourceId={post.id} />
          </div>
        </div>

        <p className="mt-8 text-sm text-muted">
          <Link
            href="/admin/streameru"
            className="font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            ← All lessons
          </Link>
        </p>
      </Container>
    </section>
  );
}
