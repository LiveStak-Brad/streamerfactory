import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  /** Dark glass for void/hero surfaces */
  tone?: "light" | "dark";
  hover?: boolean;
  as?: "div" | "article" | "li";
};

const toneClass = {
  light:
    "border-zinc-200/80 bg-surface/80 shadow-[0_1px_0_0_rgba(255,255,255,0.7)_inset,0_12px_40px_-28px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/55 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_20px_48px_-28px_rgba(0,0,0,0.65)]",
  dark: "border-white/10 bg-white/[0.06] shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_20px_50px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl",
} as const;

export function GlassCard({
  children,
  className = "",
  tone = "light",
  hover = false,
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={`relative overflow-hidden rounded-2xl border ${toneClass[tone]} ${
        hover
          ? "transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_28px_56px_-28px_rgba(91, 59, 255,0.35)] motion-reduce:transform-none motion-reduce:transition-none"
          : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
