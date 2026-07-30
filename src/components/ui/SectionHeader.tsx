import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "default",
  action,
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const inverse = tone === "inverse";

  return (
    <div
      className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"} ${
        action ? (isCenter ? "" : "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:max-w-none") : ""
      } ${className}`}
    >
      <div className={action && !isCenter ? "min-w-0 flex-1" : undefined}>
        {eyebrow ? (
          <p
            className={`text-xs font-bold uppercase tracking-[0.28em] ${
              inverse ? "text-accent-muted" : "text-accent dark:text-accent-muted"
            }`}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={`mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl ${
            inverse ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-5 text-lg leading-relaxed sm:text-xl ${
              inverse ? "text-zinc-400" : "text-muted"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className={isCenter ? "mt-8" : "shrink-0"}>{action}</div> : null}
    </div>
  );
}
