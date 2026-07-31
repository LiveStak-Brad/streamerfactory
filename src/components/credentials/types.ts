export type CredentialType =
  | "program_certificate"
  | "diploma"
  | "manager_college"
  | "hall_of_fame_graduate";

export type CredentialBadgeSize = "sm" | "md" | "lg" | number;

export const CREDENTIAL_LABELS: Record<CredentialType, string> = {
  program_certificate: "Program Certificate",
  diploma: "StreamerU Diploma",
  manager_college: "Manager College",
  hall_of_fame_graduate: "Hall of Fame Graduate",
};

export const CREDENTIAL_SIZE_PX: Record<"sm" | "md" | "lg", number> = {
  sm: 72,
  md: 96,
  lg: 112,
};
