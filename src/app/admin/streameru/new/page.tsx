import { Container } from "@/components/ui/Container";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { requireAdmin } from "@/lib/auth/server";
import { getResourceCategories } from "@/lib/resources/queries";

export default async function NewResourcePage() {
  await requireAdmin();
  const categories = await getResourceCategories();

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wider text-accent dark:text-accent-muted">
          Admin · StreamerU
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          New resource
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Drafts stay private until you publish. Slugs must stay URL-safe.
        </p>
        <div className="mt-10 rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40 sm:p-8">
          <ResourceForm categories={categories} mode="create" />
        </div>
      </Container>
    </section>
  );
}
