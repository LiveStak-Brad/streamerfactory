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
import {
  upsertReputationRuleAction,
  upsertReputationTitleAction,
} from "@/lib/growth/admin-actions";
import { listReputationRulesAdmin, listReputationTitlesAdmin } from "@/lib/growth/queries";

function reqJson(value: unknown): string {
  try {
    return JSON.stringify(value ?? {}, null, 2);
  } catch {
    return "{}";
  }
}

export default async function AdminReputationPage() {
  await requireAdmin();
  let rules: Awaited<ReturnType<typeof listReputationRulesAdmin>> = [];
  let titles: Awaited<ReturnType<typeof listReputationTitlesAdmin>> = [];
  try {
    [rules, titles] = await Promise.all([listReputationRulesAdmin(), listReputationTitlesAdmin()]);
  } catch {
    rules = [];
    titles = [];
  }

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="Reputation"
          description="Factory Reputation rules and title thresholds (not ranking XP)."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Reputation" },
          ]}
        />

        <div className="mt-8">
          <AdminSectionTitle title="Rules" className="mb-4" />
          {rules.length === 0 ? (
            <EmptyState
              title="No reputation rules"
              description="Add rules that award points from progress events."
              illustration="lessons"
            />
          ) : (
            <AdminTable caption="Reputation rules" minWidth="640px">
              <AdminTableHead>
                <AdminTr>
                  <AdminTh>Rule</AdminTh>
                  <AdminTh>Event</AdminTh>
                  <AdminTh>Points</AdminTh>
                  <AdminTh>Active</AdminTh>
                </AdminTr>
              </AdminTableHead>
              <tbody>
                {rules.map((r) => (
                  <AdminTr key={r.id}>
                    <AdminTd>
                      <div className="font-semibold text-foreground">{r.name}</div>
                      <div className="mt-0.5 font-mono text-xs text-muted">{r.key}</div>
                    </AdminTd>
                    <AdminTd className="font-mono text-xs text-muted">{r.event_type}</AdminTd>
                    <AdminTd className="text-muted">{r.points}</AdminTd>
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

        <div className="mt-10">
          <AdminPanel>
            <AdminSectionTitle title="Upsert reputation rule" />
            <div className="mt-6">
              <GrowthAdminForm action={upsertReputationRuleAction} submitLabel="Save rule">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rule_key" className={adminLabelClass}>
                      Key
                    </label>
                    <input id="rule_key" name="key" required className={`${adminFieldClass} font-mono`} />
                  </div>
                  <div>
                    <label htmlFor="rule_name" className={adminLabelClass}>
                      Name
                    </label>
                    <input id="rule_name" name="name" required className={adminFieldClass} />
                  </div>
                  <div>
                    <label htmlFor="event_type" className={adminLabelClass}>
                      Event type
                    </label>
                    <input
                      id="event_type"
                      name="event_type"
                      required
                      className={`${adminFieldClass} font-mono`}
                      placeholder="mission_completed"
                    />
                  </div>
                  <div>
                    <label htmlFor="points" className={adminLabelClass}>
                      Points
                    </label>
                    <input id="points" name="points" type="number" required defaultValue={1} className={adminFieldClass} />
                  </div>
                  <div>
                    <label htmlFor="max_per_day" className={adminLabelClass}>
                      Max per day
                    </label>
                    <input id="max_per_day" name="max_per_day" type="number" className={adminFieldClass} placeholder="blank = unlimited" />
                    <p className={adminHintClass}>Leave blank for no daily cap.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 pt-6">
                    <label className="inline-flex items-center gap-2 text-sm font-medium">
                      <input name="season_scoped" type="checkbox" value="true" className={adminCheckboxClass} />
                      Season scoped
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm font-medium">
                      <input name="active" type="checkbox" defaultChecked value="true" className={adminCheckboxClass} />
                      Active
                    </label>
                  </div>
                </div>
              </GrowthAdminForm>
            </div>
          </AdminPanel>
        </div>

        {rules.length > 0 ? (
          <div className="mt-8 space-y-6">
            {rules.map((r) => (
              <AdminPanel key={r.id}>
                <h3 className="text-sm font-bold text-foreground">Edit rule: {r.name}</h3>
                <div className="mt-4">
                  <GrowthAdminForm action={upsertReputationRuleAction} submitLabel="Update rule">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={adminLabelClass}>Key</label>
                        <input name="key" required defaultValue={r.key} className={`${adminFieldClass} font-mono`} />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Name</label>
                        <input name="name" required defaultValue={r.name} className={adminFieldClass} />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Event type</label>
                        <input name="event_type" required defaultValue={r.event_type} className={`${adminFieldClass} font-mono`} />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Points</label>
                        <input name="points" type="number" required defaultValue={r.points} className={adminFieldClass} />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Max per day</label>
                        <input
                          name="max_per_day"
                          type="number"
                          defaultValue={r.max_per_day ?? ""}
                          className={adminFieldClass}
                        />
                      </div>
                      <div className="flex flex-wrap items-center gap-4 pt-6">
                        <label className="inline-flex items-center gap-2 text-sm font-medium">
                          <input
                            name="season_scoped"
                            type="checkbox"
                            defaultChecked={r.season_scoped}
                            value="true"
                            className={adminCheckboxClass}
                          />
                          Season scoped
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
          </div>
        ) : null}

        <div className="mt-12">
          <AdminSectionTitle title="Titles" className="mb-4" />
          {titles.length === 0 ? (
            <EmptyState
              title="No reputation titles"
              description="Add titles unlocked by reputation thresholds or requirements."
              illustration="lessons"
            />
          ) : (
            <AdminTable caption="Reputation titles" minWidth="640px">
              <AdminTableHead>
                <AdminTr>
                  <AdminTh>Title</AdminTh>
                  <AdminTh>Min rep</AdminTh>
                  <AdminTh>Order</AdminTh>
                  <AdminTh>Active</AdminTh>
                </AdminTr>
              </AdminTableHead>
              <tbody>
                {titles.map((t) => (
                  <AdminTr key={t.id}>
                    <AdminTd>
                      <div className="font-semibold text-foreground">{t.name}</div>
                      <div className="mt-0.5 font-mono text-xs text-muted">{t.key}</div>
                    </AdminTd>
                    <AdminTd className="text-muted">{t.min_reputation}</AdminTd>
                    <AdminTd className="text-muted">{t.sort_order}</AdminTd>
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
            <AdminSectionTitle title="Upsert reputation title" />
            <div className="mt-6">
              <GrowthAdminForm action={upsertReputationTitleAction} submitLabel="Save title">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="title_key" className={adminLabelClass}>
                      Key
                    </label>
                    <input id="title_key" name="key" required className={`${adminFieldClass} font-mono`} />
                  </div>
                  <div>
                    <label htmlFor="title_name" className={adminLabelClass}>
                      Name
                    </label>
                    <input id="title_name" name="name" required className={adminFieldClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="title_description" className={adminLabelClass}>
                      Description
                    </label>
                    <textarea id="title_description" name="description" className={adminTextareaClass} />
                  </div>
                  <div>
                    <label htmlFor="icon" className={adminLabelClass}>
                      Icon
                    </label>
                    <input id="icon" name="icon" className={adminFieldClass} />
                  </div>
                  <div>
                    <label htmlFor="min_reputation" className={adminLabelClass}>
                      Min reputation
                    </label>
                    <input id="min_reputation" name="min_reputation" type="number" defaultValue={0} className={adminFieldClass} />
                  </div>
                  <div>
                    <label htmlFor="title_sort" className={adminLabelClass}>
                      Sort order
                    </label>
                    <input id="title_sort" name="sort_order" type="number" defaultValue={0} className={adminFieldClass} />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input id="title_active" name="active" type="checkbox" defaultChecked value="true" className={adminCheckboxClass} />
                    <label htmlFor="title_active" className="text-sm font-medium">
                      Active
                    </label>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="title_requirement" className={adminLabelClass}>
                      Requirement (JSON)
                    </label>
                    <textarea
                      id="title_requirement"
                      name="requirement"
                      defaultValue="{}"
                      className={`${adminTextareaClass} font-mono text-xs`}
                    />
                    <p className={adminHintClass}>Optional. If type is present, it must be a known RequirementType.</p>
                  </div>
                </div>
              </GrowthAdminForm>
            </div>
          </AdminPanel>
        </div>

        {titles.length > 0 ? (
          <div className="mt-8 space-y-6">
            {titles.map((t) => (
              <AdminPanel key={t.id}>
                <h3 className="text-sm font-bold text-foreground">Edit title: {t.name}</h3>
                <div className="mt-4">
                  <GrowthAdminForm action={upsertReputationTitleAction} submitLabel="Update title">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={adminLabelClass}>Key</label>
                        <input name="key" required defaultValue={t.key} className={`${adminFieldClass} font-mono`} />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Name</label>
                        <input name="name" required defaultValue={t.name} className={adminFieldClass} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={adminLabelClass}>Description</label>
                        <textarea name="description" defaultValue={t.description ?? ""} className={adminTextareaClass} />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Icon</label>
                        <input name="icon" defaultValue={t.icon ?? ""} className={adminFieldClass} />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Min reputation</label>
                        <input
                          name="min_reputation"
                          type="number"
                          defaultValue={t.min_reputation}
                          className={adminFieldClass}
                        />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Sort order</label>
                        <input name="sort_order" type="number" defaultValue={t.sort_order} className={adminFieldClass} />
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <input
                          name="active"
                          type="checkbox"
                          defaultChecked={t.active}
                          value="true"
                          className={adminCheckboxClass}
                        />
                        <span className="text-sm font-medium">Active</span>
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
