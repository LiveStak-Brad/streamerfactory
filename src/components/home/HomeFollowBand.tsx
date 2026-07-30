import { SocialFollowLinks } from "@/components/layout/SocialFollowLinks";
import { Container } from "@/components/ui/Container";

/** Mid-page follow band — TikTok + Instagram @streamerfactoryllc. */
export function HomeFollowBand() {
  return (
    <section className="border-b border-border/70 bg-muted-bg/50 py-8 dark:bg-zinc-950/40 sm:py-10">
      <Container>
        <SocialFollowLinks variant="banner" />
      </Container>
    </section>
  );
}
