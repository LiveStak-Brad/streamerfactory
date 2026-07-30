import { HallOfFameArchivePanel } from "@/components/admin/HallOfFameArchivePanel";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { AdminSectionTitle } from "@/components/admin/ui/AdminSectionTitle";
import { Container } from "@/components/ui/Container";
import { yearMonthFromDate } from "@/lib/hall-of-fame/months";
import { getHallOfFamePageData, getLiveHallOfFameMonth } from "@/lib/hall-of-fame/queries";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Hall of Fame",
  description: "Archive monthly standings into the Factory Hall of Fame.",
};

export const dynamic = "force-dynamic";

export default async function AdminHallOfFamePage() {
  const yearMonth = yearMonthFromDate();
  const data = await getHallOfFamePageData();
  const live = await getLiveHallOfFameMonth(yearMonth);
  const alreadyArchived = data.archivedMonths.some((m) => m.yearMonth === yearMonth);

  let tablesMissing = false;
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("hall_of_fame_months").select("year_month").limit(1);
    if (error?.code === "42P01" || error?.message?.includes("does not exist")) {
      tablesMissing = true;
    }
  } catch {
    tablesMissing = true;
  }

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-3xl">
        <AdminPageHeader
          title="Factory Hall of Fame"
          description="Lock each completed month once. History grows automatically — no page redesigns."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Hall of Fame" },
          ]}
        />

        <div className="mt-8">
          <HallOfFameArchivePanel
            yearMonth={yearMonth}
            alreadyArchived={alreadyArchived}
            preview={live?.placements ?? []}
            tablesMissing={tablesMissing}
          />
        </div>

        <div className="mt-8">
          <AdminSectionTitle title="Locked months" description="Permanent Hall of Fame history." />
          <AdminPanel className="mt-4">
            {data.archivedMonths.length === 0 ? (
              <p className="text-sm text-muted">No archived months yet.</p>
            ) : (
              <ul className="divide-y divide-border/70 dark:divide-zinc-800">
                {data.archivedMonths.map((m) => {
                  const champ = m.placements.find((p) => p.place === 1);
                  return (
                    <li
                      key={m.yearMonth}
                      className="flex items-center justify-between gap-3 py-3 text-sm"
                    >
                      <span className="font-semibold text-foreground">{m.yearMonth}</span>
                      <span className="truncate text-muted">
                        {champ ? `#1 ${champ.displayName} (@${champ.tiktokUsername})` : "—"}
                        {m.placements.length > 1 ? ` · +${m.placements.length - 1} more` : ""}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </AdminPanel>
        </div>
      </Container>
    </section>
  );
}
