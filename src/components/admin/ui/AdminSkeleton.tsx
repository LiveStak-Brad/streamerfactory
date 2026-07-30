type AdminSkeletonProps = {
  className?: string;
};

/** Branded shimmer block — respects prefers-reduced-motion via CSS. */
export function AdminSkeleton({ className = "" }: AdminSkeletonProps) {
  return (
    <div
      className={`admin-skeleton rounded-xl bg-muted-bg dark:bg-zinc-800/80 ${className}`}
      aria-hidden
    />
  );
}

export function AdminPageSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading admin page">
      <div className="space-y-3">
        <AdminSkeleton className="h-3 w-20" />
        <AdminSkeleton className="h-9 w-64 max-w-full" />
        <AdminSkeleton className="h-4 w-full max-w-xl" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <AdminSkeleton key={i} className="h-24 w-full" />
        ))}
      </div>
      <AdminSkeleton className="h-64 w-full" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
