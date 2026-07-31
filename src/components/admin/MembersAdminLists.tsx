"use client";

import { useMemo, useState } from "react";
import { MemberApproveButton } from "@/components/admin/MemberApproveButton";
import { ResendApprovalEmailButton } from "@/components/admin/ResendApprovalEmailButton";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { AdminStatusBadge } from "@/components/admin/ui/AdminStatusBadge";
import { AdminSectionTitle } from "@/components/admin/ui/AdminSectionTitle";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import type { NetworkMemberListRow, ProfileListRow } from "@/lib/profiles/queries";

type Props = {
  applicants: ProfileListRow[];
  members: NetworkMemberListRow[];
};

export function MembersAdminLists({ applicants, members }: Props) {
  const [memberQuery, setMemberQuery] = useState("");

  const filteredMembers = useMemo(() => {
    const q = memberQuery.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => {
      const email = m.email?.toLowerCase() ?? "";
      const tiktok = m.tiktok_username?.toLowerCase() ?? "";
      const role = m.role.toLowerCase();
      return email.includes(q) || tiktok.includes(q) || role.includes(q) || m.id.includes(q);
    });
  }, [members, memberQuery]);

  return (
    <div className="space-y-12">
      <section>
        <AdminSectionTitle
          title="Pending applicants"
          description="Accounts still marked applicant. You can also Approve from Applications when a form is linked."
        />
        {applicants.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="No pending applicants"
              description="When someone signs up, they appear here until you promote them to member."
              illustration="members"
              action={
                <Button href="/admin/applications" variant="secondary" className="min-h-[40px] px-4 text-sm">
                  Review applications
                </Button>
              }
            />
          </div>
        ) : (
          <ul className="mt-4 space-y-4">
            {applicants.map((row) => (
              <li key={row.id}>
                <AdminPanel raised>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <AdminStatusBadge tone="warning">Applicant</AdminStatusBadge>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(row.created_at))}
                      </p>
                      <p className="mt-2 font-mono text-xs text-muted">User ID</p>
                      <p className="mt-0.5 break-all font-mono text-sm font-medium text-foreground">
                        {row.id}
                      </p>
                      {row.email ? (
                        <>
                          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
                            Email
                          </p>
                          <a
                            href={`mailto:${encodeURIComponent(row.email)}`}
                            className="font-semibold text-accent hover:underline dark:text-accent-muted"
                          >
                            {row.email}
                          </a>
                        </>
                      ) : null}
                    </div>
                    <MemberApproveButton userId={row.id} />
                  </div>
                </AdminPanel>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <AdminSectionTitle
          title="Approved network members"
          description="Creators and staff with Battle Hub access. Resend the welcome email if needed."
        />
        {members.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="No promoted members yet"
              description="Approve applicants after verifying TikTok Creator Network membership."
            />
          </div>
        ) : (
          <>
            <label className="mt-4 block max-w-md">
              <span className="sr-only">Search members</span>
              <input
                type="search"
                value={memberQuery}
                onChange={(e) => setMemberQuery(e.target.value)}
                placeholder="Search email, TikTok, role…"
                className="w-full rounded-xl border border-border/90 bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-900/80"
              />
            </label>
            {filteredMembers.length === 0 ? (
              <div className="mt-4">
                <EmptyState
                  title="No matches"
                  description="Try a different search term."
                  action={
                    <Button
                      type="button"
                      variant="secondary"
                      className="min-h-[40px] px-4 text-sm"
                      onClick={() => setMemberQuery("")}
                    >
                      Clear search
                    </Button>
                  }
                />
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {filteredMembers.map((m) => (
                  <li key={m.id}>
                    <AdminPanel className="!p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <AdminStatusBadge tone="accent">{m.role}</AdminStatusBadge>
                            {m.tiktok_username ? (
                              <span className="text-sm text-muted">
                                @{m.tiktok_username.replace(/^@/, "")}
                              </span>
                            ) : null}
                          </div>
                          {m.email ? (
                            <a
                              href={`mailto:${encodeURIComponent(m.email)}`}
                              className="mt-2 block truncate font-semibold text-accent hover:underline dark:text-accent-muted"
                            >
                              {m.email}
                            </a>
                          ) : (
                            <p className="mt-2 text-sm text-muted">No email on profile</p>
                          )}
                          <p className="mt-1 break-all font-mono text-xs text-muted">{m.id}</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                          <p className="text-xs text-muted">
                            Updated{" "}
                            {new Intl.DateTimeFormat("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            }).format(new Date(m.updated_at))}
                          </p>
                          <ResendApprovalEmailButton userId={m.id} />
                        </div>
                      </div>
                    </AdminPanel>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </div>
  );
}
