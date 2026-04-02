import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "secondaryOnDark" | "inverse";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-semibold tracking-tight transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-accent text-accent-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset,0_8px_24px_-4px_var(--accent-glow)] hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_1px_0_0_rgba(255,255,255,0.14)_inset,0_12px_32px_-4px_var(--accent-glow)] active:translate-y-0 active:shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset,0_4px_16px_-4px_var(--accent-glow)] dark:text-zinc-950",
  secondary:
    "border border-border/90 bg-surface text-foreground shadow-sm hover:-translate-y-0.5 hover:border-accent/35 hover:bg-muted-bg hover:shadow-md active:translate-y-0 dark:bg-surface-raised dark:hover:bg-zinc-800",
  secondaryOnDark:
    "border border-white/15 bg-white/[0.06] text-white shadow-[0_8px_32px_-8px_rgba(0,0,0,0.55)] backdrop-blur-md hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)] active:translate-y-0",
  inverse:
    "border border-zinc-700/80 bg-white text-zinc-950 shadow-lg shadow-black/25 hover:-translate-y-0.5 hover:bg-zinc-50 active:translate-y-0 dark:border-zinc-300/80 dark:bg-zinc-950 dark:text-zinc-50 dark:shadow-black/40 dark:hover:bg-zinc-900",
};

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
