import { AdminBattleEventEditForm } from "@/components/admin/AdminBattleEventEditForm";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { Container } from "@/components/ui/Container";
import { getBattleEventByIdForAdmin } from "@/lib/battle-hub/queries";
import { requireAdmin } from "@/lib/auth/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditBattleEventPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const event = await getBattleEventByIdForAdmin(id);
  if (!event) notFound();

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-2xl">
        <AdminPageHeader
          title="Edit event"
          description="Update schedule, participants, or status. Saving replaces participant rows for this event."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Calendar", href: "/admin/calendar" },
            { label: "Edit" },
          ]}
        />
        <AdminPanel className="mt-8" raised>
          <AdminBattleEventEditForm event={event} />
        </AdminPanel>
      </Container>
    </section>
  );
}
