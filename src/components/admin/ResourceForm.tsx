"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { ResourceActionState } from "@/lib/resources/actions";
import { createResourcePost, updateResourcePost } from "@/lib/resources/actions";
import type { ResourceCategoryRow, ResourcePostWithCategory } from "@/lib/resources/types";

function SubmitLabel({ create }: { create: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-xl border border-accent/40 bg-accent/15 px-5 py-2.5 text-sm font-semibold text-accent shadow-sm transition-colors hover:border-accent/55 hover:bg-accent/25 disabled:opacity-60 dark:text-accent-muted"
    >
      {pending ? "Saving…" : create ? "Create resource" : "Save changes"}
    </button>
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
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
          {state.error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={initial?.title ?? ""}
            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-zinc-950 shadow-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={initial?.slug ?? ""}
            placeholder="auto from title if empty"
            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 font-mono text-sm text-zinc-950 shadow-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
          <p className="mt-1 text-xs text-zinc-500">Lowercase, hyphens. Leave blank to generate from title on save.</p>
        </div>

        <div>
          <label htmlFor="category_id" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Category
          </label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={initial?.category_id ?? ""}
            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-zinc-950 shadow-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
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
          <label htmlFor="status" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={initial?.status ?? "draft"}
            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-zinc-950 shadow-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div>
          <label htmlFor="published_at" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Publish date (optional)
          </label>
          <input
            id="published_at"
            name="published_at"
            type="datetime-local"
            defaultValue={toDatetimeLocal(initial?.published_at)}
            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-zinc-950 shadow-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
          <p className="mt-1 text-xs text-zinc-500">
            When status is published, leaving this blank uses the current time (or existing date on edit).
          </p>
        </div>

        <div className="flex items-end pb-2">
          <label className="inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={initial?.featured ?? false}
              className="h-4 w-4 rounded border-zinc-300 text-accent focus:ring-accent/30 dark:border-zinc-600"
            />
            Featured on Resources index
          </label>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="excerpt" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            defaultValue={initial?.excerpt ?? ""}
            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-zinc-950 shadow-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cover_image_url" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Cover image URL
          </label>
          <input
            id="cover_image_url"
            name="cover_image_url"
            type="url"
            placeholder="https://…"
            defaultValue={initial?.cover_image_url ?? ""}
            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-zinc-950 shadow-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="content" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={16}
            defaultValue={initial?.content ?? ""}
            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 font-mono text-sm leading-relaxed text-zinc-950 shadow-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            placeholder="Write in plain text. Blank lines become paragraphs on the public page."
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <SubmitLabel create={isCreate} />
        <a
          href="/admin/resources"
          className="text-sm font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
