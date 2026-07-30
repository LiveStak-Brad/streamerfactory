import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { AdminSectionTitle } from "@/components/admin/ui/AdminSectionTitle";
import { AdminStatusBadge } from "@/components/admin/ui/AdminStatusBadge";
import {
  AdminTable,
  AdminTableHead,
  AdminTd,
  AdminTh,
  AdminTr,
} from "@/components/admin/ui/AdminTable";
import {
  GrowthAdminForm,
  adminCheckboxClass,
  adminFieldClass,
  adminLabelClass,
  adminTextareaClass,
} from "@/components/admin/growth/GrowthAdminForm";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireAdmin } from "@/lib/auth/server";
import { updateStreakDefinitionAction } from "@/lib/growth/admin-actions";
import { listStreakDefinitionsAdmin } from "@/lib/growth/queries";

export default async function AdminStreaksPage() {
  await requireAdmin();
  let rows: Awaited<ReturnType<typeof listStreakDefinitionsAdmin>> = [];
  try {
    rows = await listStreakDefinitionsAdmin();
  } catch {
    rows = [];
  }

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="Streaks"
          description="Update grace days, freezes, and active flags on streak definitions."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Streaks" },
          ]}
        />

        <div className="mt-8">
          {rows.length === 0 ? (
            <EmptyState
              title="No streak definitions"
              description="Seed streak definitions via migration, then tune them here."
              illustration="lessons"
            />
          ) : (
            <AdminTable caption="Streak definitions" minWidth="640px">
              <AdminTableHead>
                <AdminTr>
                  <AdminTh>Name</AdminTh>
                  <AdminTh>Grace</AdminTh>
                  <AdminTh>Freeze</AdminTh>
                  <AdminTh>Active</AdminTh>
                </AdminTr>
              </AdminTableHead>
              <tbody>
                {rows.map((r) => (
                  <AdminTr key={r.id}>
                    <AdminTd>
                      <div className="font-semibold text-foreground">{r.name}</div>
                      <div className="mt-0.5 font-mono text-xs text-muted">{r.key}</div>
                    </AdminTd>
                    <AdminTd className="text-muted">{r.grace_days}d</AdminTd>
                    <AdminTd className="text-muted">{r.freeze_enabled ? "On" : "Off"}</AdminTd>
                    <AdminTd>
                      <AdminStatusBadge tone={r.active ? "success" : "neutral"}>
                        {r.active ? "Active" : "Inactive"}
                      </AdminStatusBadge>
                    </AdminTd>
                  </AdminTr>
                ))}
              </tbody>
            </AdminTable>
          )}
        </div>

        <div className="mt-10 space-y-6">
          <AdminSectionTitle
            title="Update streak definition"
            description="Updates an existing row by key (does not create new definitions)."
          />
          {rows.map((r) => (
            <AdminPanel key={r.id}>
              <h3 className="text-sm font-bold text-foreground">{r.name}</h3>
              <div className="mt-4">
                <GrowthAdminForm action={updateStreakDefinitionAction} submitLabel="Update streak">
                  <input type="hidden" name="key" value={r.key} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={adminLabelClass}>Key</label>
                      <input disabled value={r.key} className={`${adminFieldClass} font-mono opacity-70`} />
                    </div>
                    <div>
                      <label className={adminLabelClass}>Name</label>
                      <input name="name" defaultValue={r.name} className={adminFieldClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={adminLabelClass}>Description</label>
                      <textarea name="description" defaultValue={r.description ?? ""} className={adminTextareaClass} />
                    </div>
                    <div>
                      <label className={adminLabelClass}>Grace days</label>
                      <input name="grace_days" type="number" min={0} defaultValue={r.grace_days} className={adminFieldClass} />
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pt-6">
                      <label className="inline-flex items-center gap-2 text-sm font-medium">
                        <input
                          name="freeze_enabled"
                          type="checkbox"
                          defaultChecked={r.freeze_enabled}
                          value="true"
                          className={adminCheckboxClass}
                        />
                        Freeze enabled
                      </label>
                      <label className="inline-flex items-center gap-2 text-sm font-medium">
                        <input
                          name="active"
                          type="checkbox"
                          defaultChecked={r.active}
                          value="true"
                          className={adminCheckboxClass}
                        />
                        Active
                      </label>
                    </div>
                  </div>
                </GrowthAdminForm>
              </div>
            </AdminPanel>
          ))}

          {rows.length === 0 ? (
            <AdminPanel>
              <p className="text-sm text-muted">
                No definitions to edit. After seeding <code className="font-mono text-xs">streak_definitions</code>,
                reload this page.
              </p>
            </AdminPanel>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
