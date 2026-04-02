import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminBattleEventEditForm } from "@/components/admin/AdminBattleEventEditForm";
import { Container } from "@/components/ui/Container";
import { getBattleEventByIdForAdmin } from "@/lib/battle-hub/queries";
import { requireAdmin } from "@/lib/auth/server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditBattleEventPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const event = await getBattleEventByIdForAdmin(id);
  if (!event) notFound();

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-2xl">
        <Link
          href="/admin/calendar"
          className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
        >
          ← Network calendar
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Edit event</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Update schedule, participants, or status. Saving replaces participant rows for this event.
        </p>
        <div className="mt-10 rounded-2xl border border-zinc-200/90 bg-surface/90 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-8">
          <AdminBattleEventEditForm event={event} />
        </div>
      </Container>
    </section>
  );
}
