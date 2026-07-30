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
  adminFieldClass,
  adminHintClass,
  adminLabelClass,
} from "@/components/admin/growth/GrowthAdminForm";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireAdmin } from "@/lib/auth/server";
import { upsertSeasonAction } from "@/lib/growth/admin-actions";
import { listSeasonsAdmin } from "@/lib/growth/queries";

function toDatetimeLocal(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function statusTone(status: string): "success" | "neutral" | "info" {
  if (status === "active") return "success";
  if (status === "draft") return "info";
  return "neutral";
}

export default async function AdminSeasonsPage() {
  await requireAdmin();
  let seasons: Awaited<ReturnType<typeof listSeasonsAdmin>> = [];
  try {
    seasons = await listSeasonsAdmin();
  } catch {
    seasons = [];
  }

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="Seasons"
          description="Create and manage Factory Seasons that timebox missions, achievements, and reputation."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Seasons" },
          ]}
        />

        <div className="mt-8">
          {seasons.length === 0 ? (
            <EmptyState
              title="No seasons yet"
              description="Add a season to start seasonal growth campaigns."
              illustration="lessons"
            />
          ) : (
            <AdminTable caption="Seasons" minWidth="640px">
              <AdminTableHead>
                <AdminTr>
                  <AdminTh>Name</AdminTh>
                  <AdminTh className="hidden md:table-cell">Window</AdminTh>
                  <AdminTh>Status</AdminTh>
                  <AdminTh className="hidden lg:table-cell">Order</AdminTh>
                </AdminTr>
              </AdminTableHead>
              <tbody>
                {seasons.map((s) => (
                  <AdminTr key={s.id}>
                    <AdminTd>
                      <div className="font-semibold text-foreground">{s.name}</div>
                      <div className="mt-0.5 font-mono text-xs text-muted">{s.key}</div>
                    </AdminTd>
                    <AdminTd className="hidden text-muted md:table-cell">
                      {new Date(s.start_at).toLocaleDateString()}
                      {s.end_at ? ` → ${new Date(s.end_at).toLocaleDateString()}` : " → open"}
                    </AdminTd>
                    <AdminTd>
                      <AdminStatusBadge tone={statusTone(s.status)}>{s.status}</AdminStatusBadge>
                    </AdminTd>
                    <AdminTd className="hidden text-muted lg:table-cell">{s.sort_order}</AdminTd>
                  </AdminTr>
                ))}
              </tbody>
            </AdminTable>
          )}
        </div>

        <div className="mt-10 space-y-8">
          <AdminPanel>
            <AdminSectionTitle title="Create or update season" description="Upsert by key, or set id to update a specific row." />
            <div className="mt-6">
              <GrowthAdminForm action={upsertSeasonAction} submitLabel="Save season">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="id" className={adminLabelClass}>
                      Id (optional)
                    </label>
                    <input id="id" name="id" className={`${adminFieldClass} font-mono`} placeholder="uuid to update" />
                    <p className={adminHintClass}>Leave blank to upsert by key.</p>
                  </div>
                  <div>
                    <label htmlFor="key" className={adminLabelClass}>
                      Key
                    </label>
                    <input id="key" name="key" required className={`${adminFieldClass} font-mono`} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className={adminLabelClass}>
                      Name
                    </label>
                    <input id="name" name="name" required className={adminFieldClass} />
                  </div>
                  <div>
                    <label htmlFor="start_at" className={adminLabelClass}>
                      Start
                    </label>
                    <input id="start_at" name="start_at" type="datetime-local" required className={adminFieldClass} />
                  </div>
                  <div>
                    <label htmlFor="end_at" className={adminLabelClass}>
                      End (optional)
                    </label>
                    <input id="end_at" name="end_at" type="datetime-local" className={adminFieldClass} />
                  </div>
                  <div>
                    <label htmlFor="status" className={adminLabelClass}>
                      Status
                    </label>
                    <select id="status" name="status" defaultValue="draft" className={adminFieldClass}>
                      <option value="draft">draft</option>
                      <option value="active">active</option>
                      <option value="ended">ended</option>
                      <option value="archived">archived</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sort_order" className={adminLabelClass}>
                      Sort order
                    </label>
                    <input id="sort_order" name="sort_order" type="number" defaultValue={0} className={adminFieldClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="banner_image" className={adminLabelClass}>
                      Banner image URL
                    </label>
                    <input id="banner_image" name="banner_image" className={adminFieldClass} />
                  </div>
                </div>
              </GrowthAdminForm>
            </div>
          </AdminPanel>

          {seasons.map((s) => (
            <AdminPanel key={`edit-${s.id}`}>
              <AdminSectionTitle title={`Edit: ${s.name}`} description={s.key} />
              <div className="mt-6">
                <GrowthAdminForm action={upsertSeasonAction} submitLabel="Update season">
                  <input type="hidden" name="id" value={s.id} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={adminLabelClass}>Key</label>
                      <input name="key" required defaultValue={s.key} className={`${adminFieldClass} font-mono`} />
                    </div>
                    <div>
                      <label className={adminLabelClass}>Name</label>
                      <input name="name" required defaultValue={s.name} className={adminFieldClass} />
                    </div>
                    <div>
                      <label className={adminLabelClass}>Start</label>
                      <input
                        name="start_at"
                        type="datetime-local"
                        required
                        defaultValue={toDatetimeLocal(s.start_at)}
                        className={adminFieldClass}
                      />
                    </div>
                    <div>
                      <label className={adminLabelClass}>End</label>
                      <input
                        name="end_at"
                        type="datetime-local"
                        defaultValue={toDatetimeLocal(s.end_at)}
                        className={adminFieldClass}
                      />
                    </div>
                    <div>
                      <label className={adminLabelClass}>Status</label>
                      <select name="status" defaultValue={s.status} className={adminFieldClass}>
                        <option value="draft">draft</option>
                        <option value="active">active</option>
                        <option value="ended">ended</option>
                        <option value="archived">archived</option>
                      </select>
                    </div>
                    <div>
                      <label className={adminLabelClass}>Sort order</label>
                      <input name="sort_order" type="number" defaultValue={s.sort_order} className={adminFieldClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={adminLabelClass}>Banner image</label>
                      <input name="banner_image" defaultValue={s.banner_image ?? ""} className={adminFieldClass} />
                    </div>
                  </div>
                </GrowthAdminForm>
              </div>
            </AdminPanel>
          ))}
        </div>
      </Container>
    </section>
  );
}
