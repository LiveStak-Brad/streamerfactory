import Link from "next/link";
import { MembersAdminLists } from "@/components/admin/MembersAdminLists";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";
import { requireAdmin } from "@/lib/auth/server";
import { getApplicantProfiles, getNetworkMemberProfiles } from "@/lib/profiles/queries";

export default async function AdminMembersPage() {
  const session = await requireAdmin();
  let rows: Awaited<ReturnType<typeof getApplicantProfiles>> = [];
  let members: Awaited<ReturnType<typeof getNetworkMemberProfiles>> = [];
  try {
    rows = await getApplicantProfiles();
  } catch {
    rows = [];
  }
  try {
    members = await getNetworkMemberProfiles();
  } catch {
    members = [];
  }

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-4xl">
        <AdminPageHeader
          title="Network members"
          description={
            <>
              New accounts start as <span className="font-semibold text-foreground">applicant</span>.
              After you verify TikTok and review their Apply form, approve them as network members —
              they move to the approved list and receive a confirmation email.
            </>
          }
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Members" },
          ]}
          actions={
            <Link
              href="/admin/applications"
              className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
            >
              Open applications →
            </Link>
          }
        />

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <StatCard label="Pending applicants" value={rows.length} hint="Awaiting approval" accent />
          <StatCard label="Approved members" value={members.length} hint="Battle Hub access" />
        </div>

        <div className="mt-10">
          <MembersAdminLists applicants={rows} members={members} />
        </div>

        <p className="mt-10 text-sm text-muted">
          Signed in as {session.user.email ?? session.user.id}.{" "}
          <Link href="/battle-hub" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            Battle Hub
          </Link>{" "}
          home matches the public view by default.
        </p>
      </Container>
    </section>
  );
}
