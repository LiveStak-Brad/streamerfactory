import Link from "next/link";
import { MemberApproveButton } from "@/components/admin/MemberApproveButton";
import { Container } from "@/components/ui/Container";
import { requireAdmin } from "@/lib/auth/server";
import { getApplicantProfiles } from "@/lib/profiles/queries";

export default async function AdminMembersPage() {
  const session = await requireAdmin();
  let rows: Awaited<ReturnType<typeof getApplicantProfiles>> = [];
  try {
    rows = await getApplicantProfiles();
  } catch {
    rows = [];
  }

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-accent dark:text-accent-muted">
              Admin
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Network members
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              New accounts start as <span className="font-semibold text-zinc-800 dark:text-zinc-200">applicant</span>.
              After you verify TikTok and review their Apply form, approve them here to grant Battle Hub and
              scheduler access.
            </p>
          </div>
          <Link
            href="/admin/applications"
            className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            Open applications →
          </Link>
        </div>

        {rows.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-zinc-300/90 bg-muted-bg/40 px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-950/40">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">No pending applicants</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              When someone signs up, they appear here until you promote them to member.
            </p>
          </div>
        ) : (
          <ul className="mt-10 space-y-6">
            {rows.map((row) => (
              <li
                key={row.id}
                className="rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(row.created_at))}
                    </p>
                    <p className="mt-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">User ID</p>
                    <p className="mt-0.5 break-all font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {row.id}
                    </p>
                    {row.email && (
                      <>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          Email
                        </p>
                        <a
                          href={`mailto:${encodeURIComponent(row.email)}`}
                          className="font-semibold text-accent hover:underline dark:text-accent-muted"
                        >
                          {row.email}
                        </a>
                      </>
                    )}
                  </div>
                  <MemberApproveButton userId={row.id} />
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-sm text-zinc-500">
          Signed in as {session.user.email ?? session.user.id} (owner). The{" "}
          <Link href="/battle-hub" className="font-semibold text-accent hover:underline dark:text-accent-muted">
            Battle Hub
          </Link>{" "}
          home is the public view by default—same as non-members.
        </p>
      </Container>
    </section>
  );
}
