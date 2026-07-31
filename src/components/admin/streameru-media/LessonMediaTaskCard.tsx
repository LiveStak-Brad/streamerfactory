"use client";

import { useId, useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ensureBriefAssetRowAction,
  updateLessonMediaStatusAction,
} from "@/lib/streameru-media/actions";
import type { LessonMediaAsset } from "@/lib/streameru-media/types";
import { CURRICULUM } from "@/lib/resources/curriculum";

const OWNERSHIP_LABEL: Record<string, string> = {
  needs_brad: "Brad must capture",
  cursor_can_create: "Cursor can create",
  brad_must_approve: "Brad must approve",
  optional_enhancement: "Optional enhancement",
};

export function LessonMediaTaskCard({ asset }: { asset: LessonMediaAsset }) {
  const formId = useId();
  const [pending, startTransition] = useTransition();
  const [expanded, setExpanded] = useState(false);
  const [altText, setAltText] = useState(asset.alt_text ?? asset.suggested_alt ?? "");
  const [caption, setCaption] = useState(asset.caption ?? asset.suggested_caption ?? "");
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState(asset.public_url);
  const [status, setStatus] = useState(asset.status);
  const [assetId, setAssetId] = useState(asset.id);

  const lesson = CURRICULUM.find((l) => l.slug === asset.lesson_slug);
  const isBrief = assetId.startsWith("brief:");

  async function ensureDbId(): Promise<string | null> {
    if (!isBrief) return assetId;
    const key = assetId.split(":").slice(2).join(":");
    const result = await ensureBriefAssetRowAction(asset.lesson_slug, key);
    if (!result.ok || !result.id) {
      setError(result.error ?? "Could not sync brief row");
      return null;
    }
    setAssetId(result.id);
    return result.id;
  }

  function runStatus(next: "draft" | "ready" | "published" | "archived", markUnnecessary = false) {
    setError(null);
    startTransition(async () => {
      const id = await ensureDbId();
      if (!id) return;
      const needsImage =
        asset.asset_type === "screenshot" ||
        asset.asset_type === "photo" ||
        asset.asset_type === "diagram";
      if (needsImage && next === "published" && !altText.trim()) {
        setError("Alt text is required before publishing.");
        return;
      }
      if (needsImage && (next === "published" || next === "ready") && !previewUrl) {
        setError("Upload an asset before marking ready or publishing.");
        return;
      }
      const result = await updateLessonMediaStatusAction({
        id,
        status: next,
        alt_text: altText,
        caption,
        public_url: previewUrl,
        markUnnecessary,
      });
      if (!result.ok) {
        setError(result.error ?? "Update failed");
        return;
      }
      setStatus(markUnnecessary ? "archived" : next);
    });
  }

  function onUpload(file: File | null) {
    if (!file) return;
    setError(null);
    startTransition(async () => {
      const id = await ensureDbId();
      if (!id) return;
      const body = new FormData();
      body.set("assetId", id);
      body.set("file", file);
      body.set("altText", altText);
      body.set("caption", caption);
      const res = await fetch("/api/admin/streameru-media/upload", {
        method: "POST",
        body,
      });
      const data = (await res.json()) as { error?: string; publicUrl?: string; status?: string };
      if (!res.ok) {
        setError(data.error ?? "Upload failed");
        return;
      }
      if (data.publicUrl) setPreviewUrl(data.publicUrl);
      if (data.status) setStatus(data.status as typeof status);
    });
  }

  return (
    <article className="rounded-2xl border border-border/80 bg-surface/95 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Lesson {lesson?.globalOrder ?? "—"} · {lesson?.title ?? asset.lesson_slug}
          </p>
          <h3 className="mt-1 text-base font-semibold text-foreground">{asset.title}</h3>
          <p className="mt-1 text-sm text-muted">{asset.instructional_purpose}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium dark:bg-zinc-900">
              {asset.asset_type}
            </span>
            <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium dark:bg-zinc-900">
              {asset.priority}
            </span>
            <span className="rounded-md bg-amber-100 px-2 py-0.5 font-medium text-amber-950 dark:bg-amber-950/40 dark:text-amber-100">
              {OWNERSHIP_LABEL[asset.ownership] ?? asset.ownership}
            </span>
            <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium capitalize dark:bg-zinc-900">
              {status}
            </span>
            {asset.required ? (
              <span className="rounded-md bg-rose-100 px-2 py-0.5 font-medium text-rose-900 dark:bg-rose-950/40 dark:text-rose-100">
                Required
              </span>
            ) : (
              <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium dark:bg-zinc-900">
                Optional
              </span>
            )}
          </div>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="min-h-[36px] px-3 text-xs"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Hide details" : "Open task"}
        </Button>
      </div>

      {expanded ? (
        <div className="mt-4 space-y-4 border-t border-border/60 pt-4 dark:border-zinc-800">
          <section>
            <h4 className="text-sm font-semibold text-foreground">What is needed</h4>
            <p className="mt-1 text-sm leading-relaxed text-muted">{asset.requested_description}</p>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-foreground">Why it improves the lesson</h4>
            <p className="mt-1 text-sm leading-relaxed text-muted">{asset.instructional_purpose}</p>
            {asset.section_key ? (
              <p className="mt-1 text-xs text-muted">Placement section: {asset.section_key}</p>
            ) : null}
          </section>

          <section>
            <h4 className="text-sm font-semibold text-foreground">Exact capture instructions</h4>
            <pre className="mt-1 whitespace-pre-wrap rounded-xl bg-zinc-50 p-3 text-sm leading-relaxed text-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
              {asset.capture_instructions || "No instructions provided."}
            </pre>
            {asset.dimensions_hint ? (
              <p className="mt-2 text-xs text-muted">Dimensions / orientation: {asset.dimensions_hint}</p>
            ) : null}
          </section>

          {asset.privacy_warning ? (
            <section className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
              <strong className="font-semibold">Privacy:</strong> {asset.privacy_warning}
            </section>
          ) : null}

          {asset.admin_notes ? (
            <section>
              <h4 className="text-sm font-semibold text-foreground">Admin notes</h4>
              <p className="mt-1 text-sm text-muted">{asset.admin_notes}</p>
            </section>
          ) : null}

          {asset.reusable_key ? (
            <p className="text-xs text-muted">
              Reusable key: <code className="font-mono">{asset.reusable_key}</code> — check other lessons
              before capturing a duplicate.
            </p>
          ) : null}

          <details className="rounded-xl border border-border/70 p-3 dark:border-zinc-800">
            <summary className="cursor-pointer text-sm font-semibold">Example / mockup guidance</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Suggested caption: {asset.suggested_caption || "—"}</li>
              <li>Suggested alt: {asset.suggested_alt || "—"}</li>
              <li>
                Ownership: {OWNERSHIP_LABEL[asset.ownership] ?? asset.ownership}
                {asset.ownership === "cursor_can_create"
                  ? " — generate branded SVG/diagram, then Brad approves."
                  : ""}
              </li>
            </ul>
          </details>

          {(asset.asset_type === "screenshot" ||
            asset.asset_type === "photo" ||
            asset.asset_type === "diagram") && (
            <section className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Upload</h4>
              <label className="block text-xs font-medium text-muted" htmlFor={`${formId}-file`}>
                Image file (jpg, png, webp, gif, svg · max 8MB)
              </label>
              <input
                id={`${formId}-file`}
                type="file"
                accept="image/*,.svg"
                disabled={pending}
                className="block w-full text-sm"
                onChange={(e) => onUpload(e.target.files?.[0] ?? null)}
              />
              <label className="block text-xs font-medium text-muted" htmlFor={`${formId}-alt`}>
                Alt text (required to publish)
              </label>
              <input
                id={`${formId}-alt`}
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
              <label className="block text-xs font-medium text-muted" htmlFor={`${formId}-cap`}>
                Caption
              </label>
              <textarea
                id={`${formId}-cap`}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
              {previewUrl ? (
                <figure className="overflow-hidden rounded-xl border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt={altText || "Draft preview"} className="max-h-72 w-full object-contain" />
                  <figcaption className="px-3 py-2 text-xs text-muted">Admin preview (not public until published)</figcaption>
                </figure>
              ) : null}
            </section>
          )}

          {asset.asset_type === "founder_story" ? (
            <section className="rounded-xl bg-zinc-50 p-3 text-sm dark:bg-zinc-900/50">
              <p className="font-medium">Answer in admin notes / lesson BradExperience after approval.</p>
              <p className="mt-1 text-muted">
                Upload is not required — mark Ready when drafted, Publish when the lesson text is updated
                and approved.
              </p>
            </section>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="secondary"
              className="min-h-[36px] px-3 text-xs"
              disabled={pending}
              onClick={() => runStatus("draft")}
            >
              Save as draft
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="min-h-[36px] px-3 text-xs"
              disabled={pending}
              onClick={() => runStatus("ready")}
            >
              Mark ready for review
            </Button>
            <Button
              type="button"
              variant="primary"
              className="min-h-[36px] px-3 text-xs"
              disabled={pending}
              onClick={() => runStatus("published")}
            >
              Publish
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="min-h-[36px] px-3 text-xs"
              disabled={pending}
              onClick={() => runStatus("archived", true)}
            >
              Skip / mark unnecessary
            </Button>
            <Link
              href={`/streameru/${asset.lesson_slug}`}
              className="inline-flex min-h-[36px] items-center rounded-lg px-3 text-xs font-semibold text-accent hover:underline"
              target="_blank"
            >
              Public lesson preview
            </Link>
          </div>

          {error ? <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p> : null}
        </div>
      ) : null}
    </article>
  );
}
