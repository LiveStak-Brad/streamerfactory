import type { ReactNode } from "react";

type PrincipleIconProps = {
  name: string;
  className?: string;
};

const paths: Record<string, ReactNode> = {
  consistency: (
    <>
      <path d="M12 6v6l4 2" />
      <circle cx="12" cy="12" r="9" />
    </>
  ),
  community: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="3" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a3 3 0 0 1 0 5.74" />
    </>
  ),
  retention: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </>
  ),
  personality: (
    <>
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  network: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8 7.5 10.5 15" />
      <path d="M16 7.5 13.5 15" />
      <path d="M8.5 6h7" />
    </>
  ),
  battles: (
    <>
      <path d="M14.5 4.5 19 9l-7.5 7.5L7 12z" />
      <path d="M5 19 9.5 14.5" />
      <path d="M16 4h4v4" />
    </>
  ),
  you: (
    <>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </>
  ),
};

export function PrincipleIcon({ name, className = "" }: PrincipleIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name] ?? paths.consistency}
    </svg>
  );
}
