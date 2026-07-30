"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin]", error);
  }, [error]);

  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-lg">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Something went wrong</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This console page failed to load. Your session may still be valid — try again, or return to the
          dashboard.
        </p>
        {error.digest ? (
          <p className="mt-3 font-mono text-xs text-muted">Ref: {error.digest}</p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button type="button" variant="primary" className="min-h-[44px] px-5" onClick={() => reset()}>
            Try again
          </Button>
          <Button href="/admin" variant="secondary" className="min-h-[44px] px-5">
            Dashboard
          </Button>
        </div>
      </Container>
    </section>
  );
}
