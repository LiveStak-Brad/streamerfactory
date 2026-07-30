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
  adminHintClass,
  adminLabelClass,
  adminTextareaClass,
} from "@/components/admin/growth/GrowthAdminForm";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireAdmin } from "@/lib/auth/server";
import { upsertOnboardingTaskAction } from "@/lib/growth/admin-actions";
import { listOnboardingTasksAdmin } from "@/lib/growth/queries";

function reqJson(value: unknown): string {
  try {
    return JSON.stringify(value ?? {}, null, 2);
  } catch {
    return "{}";
  }
}

export default async function AdminOnboardingTasksPage() {
  await requireAdmin();
  let tasks: Awaited<ReturnType<typeof listOnboardingTasksAdmin>> = [];
  try {
    tasks = await listOnboardingTasksAdmin();
  } catch {
    tasks = [];
  }

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="Onboarding tasks"
          description="Checklist tasks shown during member onboarding."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Onboarding" },
          ]}
        />

        <div className="mt-8">
          {tasks.length === 0 ? (
            <EmptyState
              title="No onboarding tasks"
              description="Add tasks that new members complete during onboarding."
              illustration="lessons"
            />
          ) : (
            <AdminTable caption="Onboarding tasks" minWidth="640px">
              <AdminTableHead>
                <AdminTr>
                  <AdminTh>Title</AdminTh>
                  <AdminTh className="hidden md:table-cell">Order</AdminTh>
                  <AdminTh>Required</AdminTh>
                  <AdminTh>Active</AdminTh>
                </AdminTr>
              </AdminTableHead>
              <tbody>
                {tasks.map((t) => (
                  <AdminTr key={t.id}>
                    <AdminTd>
                      <div className="font-semibold text-foreground">{t.title}</div>
                      <div className="mt-0.5 font-mono text-xs text-muted">{t.key}</div>
                    </AdminTd>
                    <AdminTd className="hidden text-muted md:table-cell">{t.sort_order}</AdminTd>
                    <AdminTd className="text-muted">{t.required ? "Yes" : "No"}</AdminTd>
                    <AdminTd>
                      <AdminStatusBadge tone={t.active ? "success" : "neutral"}>
                        {t.active ? "Active" : "Inactive"}
                      </AdminStatusBadge>
                    </AdminTd>
                  </AdminTr>
                ))}
              </tbody>
            </AdminTable>
          )}
        </div>

        <div className="mt-10">
          <AdminPanel>
            <AdminSectionTitle title="Upsert onboarding task" description="Saved by unique key." />
            <div className="mt-6">
              <GrowthAdminForm action={upsertOnboardingTaskAction} submitLabel="Save task">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="key" className={adminLabelClass}>
                      Key
                    </label>
                    <input id="key" name="key" required className={`${adminFieldClass} font-mono`} />
                  </div>
                  <div>
                    <label htmlFor="title" className={adminLabelClass}>
                      Title
                    </label>
                    <input id="title" name="title" required className={adminFieldClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="description" className={adminLabelClass}>
                      Description
                    </label>
                    <textarea id="description" name="description" className={adminTextareaClass} />
                  </div>
                  <div>
                    <label htmlFor="href" className={adminLabelClass}>
                      Href
                    </label>
                    <input id="href" name="href" className={adminFieldClass} placeholder="/member/..." />
                  </div>
                  <div>
                    <label htmlFor="sort_order" className={adminLabelClass}>
                      Sort order
                    </label>
                    <input id="sort_order" name="sort_order" type="number" defaultValue={0} className={adminFieldClass} />
                  </div>
                  <div className="flex items-center gap-4 sm:col-span-2">
                    <label className="inline-flex items-center gap-2 text-sm font-medium">
                      <input name="required" type="checkbox" defaultChecked value="true" className={adminCheckboxClass} />
                      Required
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm font-medium">
                      <input name="active" type="checkbox" defaultChecked value="true" className={adminCheckboxClass} />
                      Active
                    </label>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="requirement" className={adminLabelClass}>
                      Requirement (JSON)
                    </label>
                    <textarea
                      id="requirement"
                      name="requirement"
                      defaultValue={'{\n  "type": "connect_tiktok"\n}'}
                      className={`${adminTextareaClass} font-mono text-xs`}
                    />
                    <p className={adminHintClass}>If type is present, it must be a known RequirementType.</p>
                  </div>
                </div>
              </GrowthAdminForm>
            </div>
          </AdminPanel>
        </div>

        {tasks.length > 0 ? (
          <div className="mt-8 space-y-6">
            {tasks.map((t) => (
              <AdminPanel key={t.id}>
                <h3 className="text-sm font-bold text-foreground">Edit: {t.title}</h3>
                <div className="mt-4">
                  <GrowthAdminForm action={upsertOnboardingTaskAction} submitLabel="Update">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={adminLabelClass}>Key</label>
                        <input name="key" required defaultValue={t.key} className={`${adminFieldClass} font-mono`} />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Title</label>
                        <input name="title" required defaultValue={t.title} className={adminFieldClass} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={adminLabelClass}>Description</label>
                        <textarea name="description" defaultValue={t.description ?? ""} className={adminTextareaClass} />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Href</label>
                        <input name="href" defaultValue={t.href ?? ""} className={adminFieldClass} />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Sort order</label>
                        <input name="sort_order" type="number" defaultValue={t.sort_order} className={adminFieldClass} />
                      </div>
                      <div className="flex items-center gap-4 sm:col-span-2">
                        <label className="inline-flex items-center gap-2 text-sm font-medium">
                          <input
                            name="required"
                            type="checkbox"
                            defaultChecked={t.required}
                            value="true"
                            className={adminCheckboxClass}
                          />
                          Required
                        </label>
                        <label className="inline-flex items-center gap-2 text-sm font-medium">
                          <input
                            name="active"
                            type="checkbox"
                            defaultChecked={t.active}
                            value="true"
                            className={adminCheckboxClass}
                          />
                          Active
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <label className={adminLabelClass}>Requirement JSON</label>
                        <textarea
                          name="requirement"
                          defaultValue={reqJson(t.requirement)}
                          className={`${adminTextareaClass} font-mono text-xs`}
                        />
                      </div>
                    </div>
                  </GrowthAdminForm>
                </div>
              </AdminPanel>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
