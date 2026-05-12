import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center py-24 sm:py-32">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent dark:text-accent-muted">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
          That page doesn&apos;t exist or has moved. Head back to the homepage or open the Join page.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary" className="min-h-[48px] px-8">
            Back to home
          </Button>
          <Button href="/apply" variant="secondary" className="min-h-[48px] px-8">
            Join
          </Button>
        </div>
      </Container>
    </div>
  );
}
