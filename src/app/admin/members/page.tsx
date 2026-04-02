import Link from "next/link";
import { MemberApproveButton } from "@/components/admin/MemberApproveButton";
import { Container } from "@/components/ui/Container";
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
              After you verify TikTok and review their Apply form, use{" "}
              <strong className="font-semibold text-zinc-800 dark:text-zinc-200">Approve as network member</strong>{" "}
              to promote them — they move to the approved list below, and we send them a confirmation email when
              Resend is configured.
            </p>
          </div>
          <Link
            href="/admin/applications"
            className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            Open applications →
          </Link>
        </div>

        <h2 className="mt-10 text-lg font-bold text-zinc-950 dark:text-zinc-50">Pending applicants</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Only users with role <span className="font-medium">applicant</span> appear here.
        </p>

        {rows.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-zinc-300/90 bg-muted-bg/40 px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-950/40">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">No pending applicants</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              When someone signs up, they appear here until you promote them to member.
            </p>
          </div>
        ) : (
          <ul className="mt-6 space-y-6">
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

        <h2 className="mt-14 text-lg font-bold text-zinc-950 dark:text-zinc-50">Approved network members</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Creators and staff roles with Battle Hub access (member, editor, admin). Approving someone from the list
          above moves them here.
        </p>

        {members.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-zinc-300/90 bg-muted-bg/40 px-6 py-10 text-center dark:border-zinc-700 dark:bg-zinc-950/40">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">No promoted members yet.</p>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {members.map((m) => (
              <li
                key={m.id}
                className="rounded-2xl border border-zinc-200/90 bg-surface/80 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950/40"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {m.role}
                      {m.tiktok_username ? (
                        <span className="ml-2 font-normal text-zinc-600 dark:text-zinc-400">
                          · @{m.tiktok_username.replace(/^@/, "")}
                        </span>
                      ) : null}
                    </p>
                    {m.email ? (
                      <a
                        href={`mailto:${encodeURIComponent(m.email)}`}
                        className="mt-1 block font-semibold text-accent hover:underline dark:text-accent-muted"
                      >
                        {m.email}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-zinc-500">No email on profile</p>
                    )}
                    <p className="mt-1 break-all font-mono text-xs text-zinc-500 dark:text-zinc-400">{m.id}</p>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Updated{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(m.updated_at))}
                  </p>
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
