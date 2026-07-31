"use server";

import { revalidatePath } from "next/cache";
import { canScheduleBattles } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import {
  submitAssessmentAttempt,
  type SubmitAssessmentResult,
} from "@/lib/assessments/engine";
import type { AssessmentAnswerMap } from "@/lib/assessments/types";

async function requireNetworkMemberSession() {
  const session = await getSessionProfile();
  if (!session?.user || !session.profile || !canScheduleBattles(session.profile.role)) {
    return null;
  }
  return session;
}

export async function submitAssessmentAction(input: {
  assessmentKey: string;
  answers: AssessmentAnswerMap;
}): Promise<SubmitAssessmentResult> {
  const session = await requireNetworkMemberSession();
  if (!session) return { error: "Sign in to save quiz progress and earn StreamerU XP." };

  const assessmentKey = String(input.assessmentKey ?? "").trim();
  if (!assessmentKey) return { error: "assessmentKey required" };
  if (!input.answers || typeof input.answers !== "object") {
    return { error: "answers required" };
  }

  const result = await submitAssessmentAttempt({
    memberId: session.user.id,
    assessmentKey,
    answers: input.answers,
  });

  if ("ok" in result && result.ok) {
    revalidatePath("/streameru");
    revalidatePath("/streameru/graduation");
    revalidatePath("/member/dashboard");
    revalidatePath("/member/progress");
  }

  return result;
}
