import type { ReactNode, ThHTMLAttributes, TdHTMLAttributes } from "react";

type AdminTableProps = {
  children: ReactNode;
  /** Min width before horizontal scroll kicks in on small screens. */
  minWidth?: string;
  caption?: string;
  className?: string;
};

/**
 * Responsive table shell: sticky header, horizontal scroll without page overflow,
 * consistent cell rhythm for admin lists.
 */
export function AdminTable({
  children,
  minWidth = "640px",
  caption,
  className = "",
}: AdminTableProps) {
  return (
    <div className={`overflow-x-auto rounded-2xl border border-border/80 dark:border-zinc-800 ${className}`}>
      <table className="w-full border-collapse text-left text-sm" style={{ minWidth }}>
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        {children}
      </table>
    </div>
  );
}

export function AdminTableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="sticky top-0 z-10 border-b border-border/80 bg-muted-bg/95 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95">
      {children}
    </thead>
  );
}

export function AdminTh({
  children,
  className = "",
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

export function AdminTd({
  children,
  className = "",
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={`px-4 py-3 align-middle text-foreground/90 ${className}`} {...props}>
      {children}
    </td>
  );
}

export function AdminTr({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr
      className={`border-b border-border/60 last:border-0 dark:border-zinc-800/80 ${className}`}
    >
      {children}
    </tr>
  );
}
