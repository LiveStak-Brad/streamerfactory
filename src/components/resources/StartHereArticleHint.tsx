import Link from "next/link";

/** Subtle promo on resource articles that are part of the Start Here path. */
export function StartHereArticleHint() {
  return (
    <div className="rounded-xl border border-accent/20 bg-accent/[0.06] px-4 py-3 dark:border-accent/30 dark:bg-accent/[0.08]">
      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Part of Start Here</span>
        {" — "}
        Follow the full creator path for new TikTok LIVE members.
      </p>
      <Link
        href="/resources/start-here"
        className="mt-2 inline-flex text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
      >
        View the Start Here path →
      </Link>
    </div>
  );
}
