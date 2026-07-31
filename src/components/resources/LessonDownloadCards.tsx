"use client";

import { useCallback, useState } from "react";
import type { LessonDownloadItem } from "@/lib/resources/lesson-downloads";

type Props = {
  items: LessonDownloadItem[];
};

export function LessonDownloadCards({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="scroll-mt-24" aria-labelledby="lesson-downloads-heading">
      <div className="border-b border-zinc-200/80 pb-4 dark:border-zinc-800/80">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
          Resources
        </p>
        <h2
          id="lesson-downloads-heading"
          className="mt-1 text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          Downloads & worksheets
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Copy to your notes or print a clean worksheet before your Live Exam.
        </p>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.id}>
            <DownloadCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function DownloadCard({ item }: { item: LessonDownloadItem }) {
  const [copied, setCopied] = useState(false);
  const printId = `su-print-${item.id}`;

  const onCopy = useCallback(async () => {
    const text = [`${item.title}`, "", ...item.lines.map((l, i) => `${i + 1}. ${l}`)].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [item]);

  const onPrint = useCallback(() => {
    const node = document.getElementById(printId);
    if (!node) return;
    const win = window.open("", "_blank", "noopener,noreferrer,width=720,height=900");
    if (!win) return;
    win.document.write(`<!DOCTYPE html><html><head><title>${item.title}</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 2rem; color: #111; line-height: 1.55; }
        h1 { font-size: 1.35rem; margin: 0 0 0.5rem; }
        p { color: #555; font-size: 0.9rem; margin: 0 0 1.25rem; }
        ol { padding-left: 1.25rem; }
        li { margin: 0.4rem 0; }
      </style></head><body>
      <h1>${escapeHtml(item.title)}</h1>
      <p>${escapeHtml(item.description)}</p>
      <ol>${item.lines.map((l) => `<li>${escapeHtml(l)}</li>`).join("")}</ol>
      </body></html>`);
    win.document.close();
    win.focus();
    win.print();
  }, [item, printId]);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-zinc-200/90 bg-gradient-to-br from-surface via-surface to-muted-bg/40 p-5 shadow-sm dark:border-zinc-800 dark:from-zinc-950/80 dark:via-zinc-950/60 dark:to-zinc-900/40 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent dark:bg-accent/15 dark:text-accent-muted"
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M8 13h8M8 17h5" />
          </svg>
        </div>
        <span className="rounded-lg border border-zinc-200/90 bg-muted-bg/70 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          {item.typeLabel}
        </span>
      </div>
      <h3 className="mt-4 text-base font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.description}</p>

      <div id={printId} className="su-print-block mt-4 flex-1 rounded-xl border border-zinc-200/70 bg-muted-bg/40 px-3 py-3 dark:border-zinc-800 dark:bg-zinc-950/50">
        <ol className="list-decimal space-y-1.5 pl-4 text-sm leading-snug text-zinc-700 dark:text-zinc-300">
          {item.lines.slice(0, 6).map((line, i) => (
            <li key={i} className="pl-0.5">
              {line}
            </li>
          ))}
        </ol>
        {item.lines.length > 6 ? (
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
            +{item.lines.length - 6} more when copied or printed
          </p>
        ) : null}
      </div>

      <div className="su-no-print mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void onCopy()}
          className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-xl border border-zinc-200/90 bg-surface px-3 py-2 text-sm font-semibold text-zinc-800 transition-colors hover:border-accent/40 hover:text-accent dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-accent/35 dark:hover:text-accent-muted"
        >
          {copied ? "Copied" : "Copy"}
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-xl bg-zinc-950 px-3 py-2 text-sm font-semibold text-white transition-[transform,box-shadow] hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950"
        >
          Print
        </button>
      </div>
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
