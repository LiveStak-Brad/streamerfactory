import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionVariant = "default" | "muted" | "elevated" | "inverse";

const variantClasses: Record<SectionVariant, string> = {
  default: "relative bg-transparent text-foreground",
  muted:
    "relative border-y border-border/80 bg-muted-bg/95 text-foreground backdrop-blur-[2px] dark:bg-muted-bg/80",
  elevated:
    "relative border-y border-border/70 bg-surface/85 text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)] backdrop-blur-md dark:bg-surface/50 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
  inverse:
    "relative overflow-hidden bg-zinc-950 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950",
};

const variantDecor: Record<SectionVariant, string> = {
  default: "",
  muted:
    "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-300/60 before:to-transparent dark:before:via-zinc-600/50",
  elevated:
    "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent/25 before:to-transparent",
  inverse:
    "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_90%_60%_at_50%_-30%,rgba(91, 59, 255,0.22),transparent_55%)] dark:before:bg-[radial-gradient(ellipse_90%_60%_at_50%_-30%,rgba(91, 59, 255,0.12),transparent_55%)] after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent dark:after:via-zinc-900/25",
};

type SectionProps = {
  children: ReactNode;
  id?: string;
  variant?: SectionVariant;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div";
};

export function Section({
  children,
  id,
  variant = "default",
  className = "",
  containerClassName = "",
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={`py-16 sm:py-20 lg:py-24 ${variantClasses[variant]} ${variantDecor[variant]} ${className}`}
    >
      <Container className={`relative z-10 ${containerClassName}`}>{children}</Container>
    </Tag>
  );
}
