import Link from "next/link";
import { ApplicationsAdminList } from "@/components/admin/ApplicationsAdminList";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";
import { requireAdmin } from "@/lib/auth/server";
import { getApplications } from "@/lib/applications/queries";

export default async function AdminApplicationsPage() {
  await requireAdmin();
  let rows: Awaited<ReturnType<typeof getApplications>> = [];
  try {
    rows = await getApplications();
  } catch {
    rows = [];
  }

  const open = rows.filter((r) => r.status === "submitted" || r.status === "in_review").length;
  const approved = rows.filter((r) => r.status === "approved").length;
  const rejected = rows.filter((r) => r.status === "rejected").length;

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-4xl">
        <AdminPageHeader
          title="Applications"
          description="TikTok Creator Network applications from the public Join page. Confirm Creator Network membership on TikTok before promoting accounts to member."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Applications" },
          ]}
          actions={
            <Link
              href="/apply"
              className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              View Join page →
            </Link>
          }
        />

        {rows.length > 0 ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <StatCard label="Open pipeline" value={open} hint="Received + in review" accent />
            <StatCard label="Approved" value={approved} />
            <StatCard label="Rejected" value={rejected} />
          </div>
        ) : null}

        <div className="mt-8">
          <ApplicationsAdminList rows={rows} />
        </div>
      </Container>
    </section>
  );
}
