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
import { upsertAchievementDefinitionAction } from "@/lib/growth/admin-actions";
import { listAchievementsAdmin, listSeasonsAdmin } from "@/lib/growth/queries";

function reqJson(value: unknown): string {
  try {
    return JSON.stringify(value ?? {}, null, 2);
  } catch {
    return "{}";
  }
}

export default async function AdminAchievementsPage() {
  await requireAdmin();
  let rows: Awaited<ReturnType<typeof listAchievementsAdmin>> = [];
  let seasons: Awaited<ReturnType<typeof listSeasonsAdmin>> = [];
  try {
    [rows, seasons] = await Promise.all([listAchievementsAdmin(), listSeasonsAdmin()]);
  } catch {
    rows = [];
    seasons = [];
  }

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="Achievements"
          description="Achievement definitions unlocked from progress events and requirements."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Achievements" },
          ]}
        />

        <div className="mt-8">
          {rows.length === 0 ? (
            <EmptyState
              title="No achievements"
              description="Define achievements members can unlock."
              illustration="lessons"
            />
          ) : (
            <AdminTable caption="Achievement definitions" minWidth="720px">
              <AdminTableHead>
                <AdminTr>
                  <AdminTh>Name</AdminTh>
                  <AdminTh className="hidden md:table-cell">Category</AdminTh>
                  <AdminTh>Active</AdminTh>
                  <AdminTh className="hidden lg:table-cell">Rep</AdminTh>
                </AdminTr>
              </AdminTableHead>
              <tbody>
                {rows.map((r) => (
                  <AdminTr key={r.id}>
                    <AdminTd>
                      <div className="font-semibold text-foreground">{r.name}</div>
                      <div className="mt-0.5 font-mono text-xs text-muted">{r.key}</div>
                    </AdminTd>
                    <AdminTd className="hidden text-muted md:table-cell">{r.category}</AdminTd>
                    <AdminTd>
                      <AdminStatusBadge tone={r.active ? "success" : "neutral"}>
                        {r.active ? "Active" : "Inactive"}
                      </AdminStatusBadge>
                    </AdminTd>
                    <AdminTd className="hidden text-muted lg:table-cell">{r.reputation_points}</AdminTd>
                  </AdminTr>
                ))}
              </tbody>
            </AdminTable>
          )}
        </div>

        <div className="mt-10">
          <AdminPanel>
            <AdminSectionTitle title="Upsert achievement" description="Saved by unique key." />
            <div className="mt-6">
              <GrowthAdminForm action={upsertAchievementDefinitionAction} submitLabel="Save achievement">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="key" className={adminLabelClass}>
                      Key
                    </label>
                    <input id="key" name="key" required className={`${adminFieldClass} font-mono`} />
                  </div>
                  <div>
                    <label htmlFor="name" className={adminLabelClass}>
                      Name
                    </label>
                    <input id="name" name="name" required className={adminFieldClass} />
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
                    <select id="category" name="category" defaultValue="milestones" className={adminFieldClass}>
                      <option value="learning">learning</option>
                      <option value="community">community</option>
                      <option value="creator">creator</option>
                      <option value="rankings">rankings</option>
                      <option value="battles">battles</option>
                      <option value="referrals">referrals</option>
                      <option value="recruiting">recruiting</option>
                      <option value="milestones">milestones</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="visibility" className={adminLabelClass}>
                      Visibility
                    </label>
                    <select id="visibility" name="visibility" defaultValue="members" className={adminFieldClass}>
                      <option value="public">public</option>
                      <option value="members">members</option>
                      <option value="private">private</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="icon" className={adminLabelClass}>
                      Icon
                    </label>
                    <input id="icon" name="icon" className={adminFieldClass} />
                  </div>
                  <div>
                    <label htmlFor="season_id" className={adminLabelClass}>
                      Season
                    </label>
                    <select id="season_id" name="season_id" defaultValue="" className={adminFieldClass}>
                      <option value="">None</option>
                      {seasons.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
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
                  <div>
                    <label htmlFor="share_image_path" className={adminLabelClass}>
                      Share image path
                    </label>
                    <input id="share_image_path" name="share_image_path" className={adminFieldClass} />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input id="active" name="active" type="checkbox" defaultChecked value="true" className={adminCheckboxClass} />
                    <label htmlFor="active" className="text-sm font-medium">
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
                      defaultValue={'{\n  "type": "complete_onboarding"\n}'}
                      className={`${adminTextareaClass} font-mono text-xs`}
                    />
                    <p className={adminHintClass}>If type is present, it must be a known RequirementType.</p>
                  </div>
                </div>
              </GrowthAdminForm>
            </div>
          </AdminPanel>
        </div>

        {rows.length > 0 ? (
          <div className="mt-8 space-y-6">
            {rows.map((r) => (
              <AdminPanel key={r.id}>
                <h3 className="text-sm font-bold text-foreground">Edit: {r.name}</h3>
                <div className="mt-4">
                  <GrowthAdminForm action={upsertAchievementDefinitionAction} submitLabel="Update">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={adminLabelClass}>Key</label>
                        <input name="key" required defaultValue={r.key} className={`${adminFieldClass} font-mono`} />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Name</label>
                        <input name="name" required defaultValue={r.name} className={adminFieldClass} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={adminLabelClass}>Description</label>
                        <textarea name="description" defaultValue={r.description ?? ""} className={adminTextareaClass} />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Category</label>
                        <select name="category" defaultValue={r.category} className={adminFieldClass}>
                          <option value="learning">learning</option>
                          <option value="community">community</option>
                          <option value="creator">creator</option>
                          <option value="rankings">rankings</option>
                          <option value="battles">battles</option>
                          <option value="referrals">referrals</option>
                          <option value="recruiting">recruiting</option>
                          <option value="milestones">milestones</option>
                        </select>
                      </div>
                      <div>
                        <label className={adminLabelClass}>Visibility</label>
                        <select name="visibility" defaultValue={r.visibility} className={adminFieldClass}>
                          <option value="public">public</option>
                          <option value="members">members</option>
                          <option value="private">private</option>
                        </select>
                      </div>
                      <div>
                        <label className={adminLabelClass}>Icon</label>
                        <input name="icon" defaultValue={r.icon ?? ""} className={adminFieldClass} />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Season</label>
                        <select name="season_id" defaultValue={r.season_id ?? ""} className={adminFieldClass}>
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
                          <input name="sort_order" type="number" defaultValue={r.sort_order} className={adminFieldClass} />
                          <input
                            name="reputation_points"
                            type="number"
                            defaultValue={r.reputation_points}
                            className={adminFieldClass}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={adminLabelClass}>Share image</label>
                        <input name="share_image_path" defaultValue={r.share_image_path ?? ""} className={adminFieldClass} />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          name="active"
                          type="checkbox"
                          defaultChecked={r.active}
                          value="true"
                          className={adminCheckboxClass}
                        />
                        <span className="text-sm font-medium">Active</span>
                      </div>
                      <div className="sm:col-span-2">
                        <label className={adminLabelClass}>Requirement JSON</label>
                        <textarea
                          name="requirement"
                          defaultValue={reqJson(r.requirement)}
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
