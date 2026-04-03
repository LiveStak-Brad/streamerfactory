import { redirect } from "next/navigation";

/**
 * Legacy route — member onboarding previously lived here. StreamerU lives at `/streameru`.
 */
export default function WelcomePage() {
  redirect("/streameru");
}
