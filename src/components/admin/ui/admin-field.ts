/** Shared admin form control styles — keep inputs consistent across console forms. */
export const adminLabelClass =
  "block text-sm font-medium text-foreground";

export const adminHintClass = "mt-1 text-xs leading-relaxed text-muted";

export const adminFieldClass =
  "mt-1.5 w-full rounded-xl border border-border/90 bg-surface px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted/80 focus-visible:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-900/80";

export const adminTextareaClass = `${adminFieldClass} min-h-[120px] resize-y`;

export const adminSelectClass = adminFieldClass;

export const adminCheckboxClass =
  "size-4 rounded border-border text-accent focus-visible:ring-2 focus-visible:ring-accent/30";
