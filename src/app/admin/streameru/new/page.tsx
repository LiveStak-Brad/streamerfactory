import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { Container } from "@/components/ui/Container";
import { requireAdmin } from "@/lib/auth/server";
import { getResourceCategories } from "@/lib/resources/queries";

export default async function NewResourcePage() {
  await requireAdmin();
  const categories = await getResourceCategories();

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-3xl">
        <AdminPageHeader
          title="New resource"
          description="Drafts stay private until you publish. Slugs must stay URL-safe."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "StreamerU", href: "/admin/streameru" },
            { label: "New" },
          ]}
        />
        <AdminPanel className="mt-8" raised>
          <ResourceForm categories={categories} mode="create" />
        </AdminPanel>
      </Container>
    </section>
  );
}
