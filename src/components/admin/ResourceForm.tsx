"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { ResourceActionState } from "@/lib/resources/actions";
import { createResourcePost, updateResourcePost } from "@/lib/resources/actions";
import { TRAINING_TRACK_SECTIONS } from "@/lib/resources/tracks";
import type { TrainingSectionsJson } from "@/lib/resources/training-sections";
import type { ResourceCategoryRow, ResourcePostWithCategory } from "@/lib/resources/types";
import {
  adminCheckboxClass,
  adminFieldClass,
  adminHintClass,
  adminLabelClass,
  adminTextareaClass,
} from "@/components/admin/ui/admin-field";
import { Button } from "@/components/ui/Button";

function trainingField(initial: ResourcePostWithCategory | null | undefined, key: keyof TrainingSectionsJson): string {
  const s = initial?.training_sections;
  if (!s || typeof s !== "object") return "";
  const v = s[key];
  return typeof v === "string" ? v : "";
}

function SubmitLabel({ create }: { create: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" className="min-h-[40px] px-5 text-sm" disabled={pending}>
      {pending ? "Saving…" : create ? "Create resource" : "Save changes"}
    </Button>
  );
}

function toDatetimeLocal(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

type Props = {
  categories: ResourceCategoryRow[];
  mode: "create" | "edit";
  initial?: ResourcePostWithCategory | null;
};

export function ResourceForm({ categories, mode, initial }: Props) {
  const isCreate = mode === "create";
  const action = isCreate ? createResourcePost : updateResourcePost;
  const [state, formAction] = useActionState(action, {} as ResourceActionState);

  return (
    <form action={formAction} className="space-y-6">
      {!isCreate && initial && <input type="hidden" name="id" value={initial.id} />}

      {state?.error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
          {state.error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className={adminLabelClass}>
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={initial?.title ?? ""}
            className={adminFieldClass}
          />
        </div>

        <div>
          <label htmlFor="slug" className={adminLabelClass}>
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={initial?.slug ?? ""}
            placeholder="auto from title if empty"
            className={`${adminFieldClass} font-mono`}
          />
          <p className={adminHintClass}>Lowercase, hyphens. Leave blank to generate from title on save.</p>
        </div>

        <div>
          <label htmlFor="category_id" className={adminLabelClass}>
            Category
          </label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={initial?.category_id ?? ""}
            className={adminFieldClass}
          >
            <option value="">None</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="training_track" className={adminLabelClass}>
            Training track
          </label>
          <select
            id="training_track"
            name="training_track"
            defaultValue={initial?.training_track ?? "beginner"}
            className={adminFieldClass}
          >
            {TRAINING_TRACK_SECTIONS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="difficulty" className={adminLabelClass}>
            Difficulty (optional)
          </label>
          <select
            id="difficulty"
            name="difficulty"
            defaultValue={initial?.difficulty ?? ""}
            className={adminFieldClass}
          >
            <option value="">Not set</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className={adminLabelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={initial?.status ?? "draft"}
            className={adminFieldClass}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div>
          <label htmlFor="published_at" className={adminLabelClass}>
            Publish date (optional)
          </label>
          <input
            id="published_at"
            name="published_at"
            type="datetime-local"
            defaultValue={toDatetimeLocal(initial?.published_at)}
            className={adminFieldClass}
          />
          <p className={adminHintClass}>
            When status is published, leaving this blank uses the current time (or existing date on edit).
          </p>
        </div>

        <div className="flex items-end pb-2">
          <label className="inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-foreground">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={initial?.featured ?? false}
              className={adminCheckboxClass}
            />
            Featured on StreamerU index
          </label>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="excerpt" className={adminLabelClass}>
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            defaultValue={initial?.excerpt ?? ""}
            className={adminFieldClass}
          />
        </div>

        <div className="sm:col-span-2 rounded-2xl border border-border/80 bg-muted-bg/40 p-5 dark:border-zinc-800 dark:bg-zinc-950/40">
          <p className="text-sm font-semibold text-foreground">Structured lesson (optional)</p>
          <p className="mt-1 text-xs text-muted">
            Plain text; blank paragraphs separate blocks on the public page. Leave empty to show only the main article
            body below.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted">What you&apos;ll learn</label>
              <textarea
                name="training_what_youll_learn"
                rows={3}
                defaultValue={trainingField(initial, "what_youll_learn")}
                className={adminTextareaClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted">Why this matters</label>
              <textarea
                name="training_why_it_matters"
                rows={3}
                defaultValue={trainingField(initial, "why_it_matters")}
                className={adminTextareaClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted">Core strategy</label>
              <textarea
                name="training_core_strategy"
                rows={3}
                defaultValue={trainingField(initial, "core_strategy")}
                className={adminTextareaClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted">Step-by-step breakdown</label>
              <textarea
                name="training_step_by_step"
                rows={4}
                defaultValue={trainingField(initial, "step_by_step")}
                className={adminTextareaClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted">Common mistakes</label>
              <textarea
                name="training_common_mistakes"
                rows={3}
                defaultValue={trainingField(initial, "common_mistakes")}
                className={adminTextareaClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted">Action checklist</label>
              <textarea
                name="training_action_checklist"
                rows={3}
                defaultValue={trainingField(initial, "action_checklist")}
                className={adminTextareaClass}
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cover_image_url" className={adminLabelClass}>
            Cover image URL
          </label>
          <input
            id="cover_image_url"
            name="cover_image_url"
            type="url"
            placeholder="https://…"
            defaultValue={initial?.cover_image_url ?? ""}
            className={adminFieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="content" className={adminLabelClass}>
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={16}
            defaultValue={initial?.content ?? ""}
            className={`${adminTextareaClass} font-mono leading-relaxed`}
            placeholder="Write in plain text. Blank lines become paragraphs on the public page."
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-border/80 pt-6 dark:border-zinc-800">
        <SubmitLabel create={isCreate} />
        <a
          href="/admin/streameru"
          className="text-sm font-semibold text-muted hover:text-foreground"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
