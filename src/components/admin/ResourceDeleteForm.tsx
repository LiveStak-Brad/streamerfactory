"use client";

import { deleteResourcePost } from "@/lib/resources/actions";

/** Danger-zone delete with confirm for StreamerU resources. */
export function ResourceDeleteForm({ resourceId }: { resourceId: string }) {
  return (
    <form
      action={deleteResourcePost}
      onSubmit={(e) => {
        if (!confirm("Delete this resource permanently? Public URLs will 404.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={resourceId} />
      <button
        type="submit"
        className="rounded-xl border border-rose-300 bg-surface px-4 py-2 text-sm font-semibold text-rose-800 shadow-sm transition-colors hover:bg-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-100 dark:hover:bg-rose-900"
      >
        Delete resource
      </button>
    </form>
  );
}
