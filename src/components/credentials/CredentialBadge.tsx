"use client";

import { useId } from "react";
import {
  DiplomaArt,
  HallOfFameGraduateArt,
  ManagerCollegeArt,
  ProgramCertificateArt,
} from "@/components/credentials/badge-art";
import {
  CREDENTIAL_LABELS,
  CREDENTIAL_SIZE_PX,
  type CredentialBadgeSize,
  type CredentialType,
} from "@/components/credentials/types";

export type CredentialBadgeProps = {
  type: CredentialType;
  /** Dimmed / grayscale — not yet unlocked */
  locked?: boolean;
  /** Highlighted earned state */
  earned?: boolean;
  size?: CredentialBadgeSize;
  className?: string;
  /** Accessible name override */
  label?: string;
};

function resolveSize(size: CredentialBadgeSize): number {
  if (typeof size === "number") return size;
  return CREDENTIAL_SIZE_PX[size];
}

function BadgeArt({ type, uid }: { type: CredentialType; uid: string }) {
  switch (type) {
    case "program_certificate":
      return <ProgramCertificateArt uid={uid} />;
    case "diploma":
      return <DiplomaArt uid={uid} />;
    case "manager_college":
      return <ManagerCollegeArt uid={uid} />;
    case "hall_of_fame_graduate":
      return <HallOfFameGraduateArt uid={uid} />;
  }
}

/**
 * Premium StreamerU credential badge — collectible achievement artwork.
 * Reuse on dashboard, graduation, lessons, Hall of Fame, and profiles.
 */
export function CredentialBadge({
  type,
  locked = false,
  earned = false,
  size = "md",
  className = "",
  label,
}: CredentialBadgeProps) {
  const uid = useId().replace(/:/g, "");
  const px = resolveSize(size);
  const title = label ?? CREDENTIAL_LABELS[type];
  const stateClass = locked
    ? "credential-badge--locked"
    : earned
      ? "credential-badge--earned"
      : "credential-badge--preview";

  return (
    <span
      className={`credential-badge ${stateClass} inline-flex ${className}`}
      style={{ width: px, height: px }}
      role="img"
      aria-label={`${title}${locked ? " (locked)" : earned ? " (earned)" : ""}`}
    >
      <svg
        viewBox="0 0 128 128"
        width={px}
        height={px}
        className="credential-badge__svg h-full w-full overflow-visible"
        aria-hidden
      >
        <BadgeArt type={type} uid={uid} />
      </svg>
      {locked ? (
        <span className="credential-badge__lock" aria-hidden>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <rect
              x="5"
              y="11"
              width="14"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M8 11V8a4 4 0 0 1 8 0v3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ) : null}
    </span>
  );
}

export { CREDENTIAL_LABELS } from "@/components/credentials/types";
export type { CredentialType, CredentialBadgeSize } from "@/components/credentials/types";
