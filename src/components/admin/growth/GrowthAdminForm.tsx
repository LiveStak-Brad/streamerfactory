"use client";

import type { ReactNode } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  adminCheckboxClass,
  adminFieldClass,
  adminHintClass,
  adminLabelClass,
  adminTextareaClass,
} from "@/components/admin/ui/admin-field";
import { Button } from "@/components/ui/Button";
import type { GrowthAdminActionResult } from "@/lib/growth/admin-actions";

type State = GrowthAdminActionResult | Record<string, never>;

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" className="min-h-[40px] px-5 text-sm" disabled={pending}>
      {pending ? "Saving…" : label}
    </Button>
  );
}

export function GrowthAdminForm({
  action,
  submitLabel,
  children,
}: {
  action: (formData: FormData) => Promise<GrowthAdminActionResult>;
  submitLabel: string;
  children: ReactNode;
}) {
  async function bound(_prev: State, formData: FormData): Promise<State> {
    return action(formData);
  }
  const [state, formAction] = useActionState(bound, {});

  return (
    <form action={formAction} className="space-y-4">
      {"error" in state && state.error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
          {state.error}
        </div>
      ) : null}
      {"ok" in state && state.ok ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
          Saved.
        </div>
      ) : null}
      {children}
      <SubmitButton label={submitLabel} />
    </form>
  );
}

export {
  adminCheckboxClass,
  adminFieldClass,
  adminHintClass,
  adminLabelClass,
  adminTextareaClass,
};
