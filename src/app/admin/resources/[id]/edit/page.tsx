import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { deleteResourcePost } from "@/lib/resources/actions";
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
    <section className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wider text-accent dark:text-accent-muted">
          Admin · Resources
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Edit resource
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Post ID <span className="font-mono text-xs text-zinc-500">{post.id}</span>
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40 sm:p-8">
          <ResourceForm categories={categories} mode="edit" initial={post} />
        </div>

        <div className="mt-8 rounded-2xl border border-red-200/80 bg-red-50/80 p-6 dark:border-red-900/50 dark:bg-red-950/30">
          <h2 className="text-sm font-semibold text-red-900 dark:text-red-200">Danger zone</h2>
          <p className="mt-1 text-sm text-red-800/90 dark:text-red-200/90">
            Deleting removes this resource permanently (public URLs will 404).
          </p>
          <form action={deleteResourcePost} className="mt-4">
            <input type="hidden" name="id" value={post.id} />
            <button
              type="submit"
              className="rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-800 shadow-sm transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-100 dark:hover:bg-red-900"
            >
              Delete resource
            </button>
          </form>
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          <Link href="/admin/resources" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            ← All resources
          </Link>
        </p>
      </Container>
    </section>
  );
}
