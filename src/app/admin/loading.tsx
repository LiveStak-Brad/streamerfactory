import { AdminPageSkeleton } from "@/components/admin/ui/AdminSkeleton";
import { Container } from "@/components/ui/Container";

export default function AdminLoading() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <AdminPageSkeleton />
      </Container>
    </section>
  );
}
