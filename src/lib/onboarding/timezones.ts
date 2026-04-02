/** Common IANA timezones for onboarding (US-heavy + UTC; expandable later). */
export const ONBOARDING_TIMEZONES: { value: string; label: string }[] = [
  { value: "", label: "Select timezone" },
  { value: "America/New_York", label: "Eastern (US)" },
  { value: "America/Chicago", label: "Central (US)" },
  { value: "America/Denver", label: "Mountain (US)" },
  { value: "America/Los_Angeles", label: "Pacific (US)" },
  { value: "America/Anchorage", label: "Alaska" },
  { value: "Pacific/Honolulu", label: "Hawaii" },
  { value: "America/Phoenix", label: "Arizona" },
  { value: "America/Toronto", label: "Eastern (Canada)" },
  { value: "America/Vancouver", label: "Pacific (Canada)" },
  { value: "Europe/London", label: "London" },
  { value: "Europe/Paris", label: "Central Europe" },
  { value: "Australia/Sydney", label: "Sydney" },
  { value: "UTC", label: "UTC" },
];
