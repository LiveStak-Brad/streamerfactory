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
import { upsertMissionTemplateAction } from "@/lib/growth/admin-actions";
import { listMissionTemplatesAdmin, listSeasonsAdmin } from "@/lib/growth/queries";

function reqJson(value: unknown): string {
  try {
    return JSON.stringify(value ?? {}, null, 2);
  } catch {
    return "{}";
  }
}

export default async function AdminMissionsPage() {
  await requireAdmin();
  let templates: Awaited<ReturnType<typeof listMissionTemplatesAdmin>> = [];
  let seasons: Awaited<ReturnType<typeof listSeasonsAdmin>> = [];
  try {
    [templates, seasons] = await Promise.all([listMissionTemplatesAdmin(), listSeasonsAdmin()]);
  } catch {
    templates = [];
    seasons = [];
  }

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="Missions"
          description="Mission templates assigned to members by cadence and season."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Missions" },
          ]}
        />

        <div className="mt-8">
          {templates.length === 0 ? (
            <EmptyState
              title="No mission templates"
              description="Create a template to start assigning daily or seasonal missions."
              illustration="lessons"
            />
          ) : (
            <AdminTable caption="Mission templates" minWidth="720px">
              <AdminTableHead>
                <AdminTr>
                  <AdminTh>Title</AdminTh>
                  <AdminTh className="hidden md:table-cell">Category</AdminTh>
                  <AdminTh>Cadence</AdminTh>
                  <AdminTh>Active</AdminTh>
                  <AdminTh className="hidden lg:table-cell">Rep</AdminTh>
                </AdminTr>
              </AdminTableHead>
              <tbody>
                {templates.map((t) => (
                  <AdminTr key={t.id}>
                    <AdminTd>
                      <div className="font-semibold text-foreground">{t.title}</div>
                      <div className="mt-0.5 font-mono text-xs text-muted">{t.key}</div>
                    </AdminTd>
                    <AdminTd className="hidden text-muted md:table-cell">{t.category}</AdminTd>
                    <AdminTd className="text-muted">{t.cadence}</AdminTd>
                    <AdminTd>
                      <AdminStatusBadge tone={t.active ? "success" : "neutral"}>
                        {t.active ? "Active" : "Inactive"}
                      </AdminStatusBadge>
                    </AdminTd>
                    <AdminTd className="hidden text-muted lg:table-cell">{t.reputation_points}</AdminTd>
                  </AdminTr>
                ))}
              </tbody>
            </AdminTable>
          )}
        </div>

        <div className="mt-10">
          <AdminPanel>
            <AdminSectionTitle
              title="Upsert mission template"
              description="Saved by unique key. Requirement is JSON; if type is set it must be a known RequirementType."
            />
            <div className="mt-6">
              <GrowthAdminForm action={upsertMissionTemplateAction} submitLabel="Save mission">
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
                    <label htmlFor="category" className={adminLabelClass}>
                      Category
                    </label>
                    <select id="category" name="category" defaultValue="platform" className={adminFieldClass}>
                      <option value="training">training</option>
                      <option value="community">community</option>
                      <option value="battles">battles</option>
                      <option value="profile">profile</option>
                      <option value="creator_growth">creator_growth</option>
                      <option value="platform">platform</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cadence" className={adminLabelClass}>
                      Cadence
                    </label>
                    <select id="cadence" name="cadence" defaultValue="daily" className={adminFieldClass}>
                      <option value="daily">daily</option>
                      <option value="weekly">weekly</option>
                      <option value="once">once</option>
                      <option value="seasonal">seasonal</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="season_id" className={adminLabelClass}>
                      Season
                    </label>
                    <select id="season_id" name="season_id" defaultValue="" className={adminFieldClass}>
                      <option value="">None (lifetime)</option>
                      {seasons.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.key})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sort_order" className={adminLabelClass}>
                      Sort order
                    </label>
                    <input id="sort_order" name="sort_order" type="number" defaultValue={0} className={adminFieldClass} />
                  </div>
                  <div>
                    <label htmlFor="reputation_points" className={adminLabelClass}>
                      Reputation points
                    </label>
                    <input
                      id="reputation_points"
                      name="reputation_points"
                      type="number"
                      defaultValue={0}
                      className={adminFieldClass}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input id="active" name="active" type="checkbox" defaultChecked value="true" className={adminCheckboxClass} />
                    <label htmlFor="active" className="text-sm font-medium text-foreground">
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
                      defaultValue={'{\n  "type": "daily_login"\n}'}
                      className={`${adminTextareaClass} font-mono text-xs`}
                    />
                    <p className={adminHintClass}>Must parse as JSON. If type is present, it must be a known RequirementType.</p>
                  </div>
                </div>
              </GrowthAdminForm>
            </div>
          </AdminPanel>
        </div>

        {templates.length > 0 ? (
          <div className="mt-8 space-y-6">
            <AdminSectionTitle title="Edit existing" description="Prefills upsert forms by key." />
            {templates.map((t) => (
              <AdminPanel key={t.id}>
                <h3 className="text-sm font-bold text-foreground">{t.title}</h3>
                <div className="mt-4">
                  <GrowthAdminForm action={upsertMissionTemplateAction} submitLabel="Update">
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
                        <label className={adminLabelClass}>Category</label>
                        <select name="category" defaultValue={t.category} className={adminFieldClass}>
                          <option value="training">training</option>
                          <option value="community">community</option>
                          <option value="battles">battles</option>
                          <option value="profile">profile</option>
                          <option value="creator_growth">creator_growth</option>
                          <option value="platform">platform</option>
                        </select>
                      </div>
                      <div>
                        <label className={adminLabelClass}>Cadence</label>
                        <select name="cadence" defaultValue={t.cadence} className={adminFieldClass}>
                          <option value="daily">daily</option>
                          <option value="weekly">weekly</option>
                          <option value="once">once</option>
                          <option value="seasonal">seasonal</option>
                        </select>
                      </div>
                      <div>
                        <label className={adminLabelClass}>Season</label>
                        <select name="season_id" defaultValue={t.season_id ?? ""} className={adminFieldClass}>
                          <option value="">None</option>
                          {seasons.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={adminLabelClass}>Sort / Rep</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input name="sort_order" type="number" defaultValue={t.sort_order} className={adminFieldClass} />
                          <input
                            name="reputation_points"
                            type="number"
                            defaultValue={t.reputation_points}
                            className={adminFieldClass}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
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
