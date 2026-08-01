import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "ai-creator-capstone-operating-system",
  programKey: "aicreator",
  title: "Quiz: AI Creator Capstone: Operating System",
  questions: [
    question(
      "q1",
      "What makes capstone evidence objectively reviewable?",
      [
        ["A dossier of process artifacts, a documented gated loop, ethics/privacy drills, and an improvement report.", true, "Correct — reviewable process evidence is the standard."],
        ["A folder of raw AI outputs only.", false, "Wrong — raw outputs without gates are incomplete."],
        ["A viewer-count screenshot.", false, "Wrong — metrics are not the grade."],
        ["A claim that tools are mastered.", false, "Wrong — claims without artifacts fail review."],
      ],
    ),
    question(
      "q2",
      "An automation in the capstone demo publishes without approval. Result?",
      [
        ["It fails the standard until a human gate is added and tested.", true, "Correct — unattended publish violates OS standards."],
        ["It earns bonus points for speed.", false, "Wrong — speed bonuses do not exist here."],
        ["It is fine if engagement rises.", false, "Wrong — engagement does not excuse missing gates."],
        ["It is fine if the model is expensive.", false, "Wrong — model cost is irrelevant to the gate requirement."],
      ],
    ),
    question(
      "q3",
      "What belongs in an improvement report?",
      [
        ["Cause, specific process change, and next test date.", true, "Correct — actionable process improvement."],
        ["A promise to go viral.", false, "Wrong — virality promises are not process changes."],
        ["A gift target.", false, "Wrong — gifts are not the grade."],
        ["Blame without a change.", false, "Wrong — blame without change is not improvement."],
      ],
    ),
    question(
      "q4",
      "Why include artifacts from earlier lessons?",
      [
        ["The OS is integrated; missing layers leave holes in judgment, privacy, or verification.", true, "Correct — integration across layers is the point."],
        ["To increase file size only.", false, "Wrong — volume of files is not the goal."],
        ["Because quizzes require random PDFs.", false, "Wrong — artifacts must be meaningful, not random."],
        ["To avoid running a real loop.", false, "Wrong — the end-to-end loop is still required."],
      ],
    ),
    question(
      "q5",
      "A privacy stress test should show…",
      [
        ["You can refuse unsafe pastes and use redaction or human-only handling.", true, "Correct — refusal and redaction prove the ethics layer works."],
        ["That private data can be pasted if the capstone deadline is near.", false, "Wrong — deadlines do not waive red lines."],
        ["That disclosures are optional jokes.", false, "Wrong — disclosures must be clear when needed."],
        ["That deepfake jokes are allowed.", false, "Wrong — deepfake misuse remains banned."],
      ],
    ),
    question(
      "q6",
      "How should tool version notes appear in the OS?",
      [
        ["Dated reminders that capabilities change and must be verified in your tools.", true, "Correct — version-aware operation is required."],
        ["Permanent claims that menus never change.", false, "Wrong — permanence claims are false."],
        ["No notes, to seem confident.", false, "Wrong — silence is not confidence."],
        ["Only competitor rumors.", false, "Wrong — rumors are not version control."],
      ],
    ),
    question(
      "q7",
      "Can a modest OS pass the capstone?",
      [
        ["Yes, if gates, verification, privacy, voice, and improvement evidence are real and runnable.", true, "Correct — runnable integrity beats vendor maximalism."],
        ["No, it must use every AI vendor.", false, "Wrong — vendor count is not the standard."],
        ["Only with spam volume.", false, "Wrong — spam volume fails ethics."],
        ["Only with nine automated posts per hour.", false, "Wrong — high-frequency auto-posting is not required and often unsafe."],
      ],
    ),
    question(
      "q8",
      "What should open the end-to-end loop proof?",
      [
        ["A planned piece with clear human decisions and listed AI assists.", true, "Correct — planned, attributed assistance is the proof pattern."],
        ["Random generation with no brief.", false, "Wrong — random generation skips the OS."],
        ["Impersonation of another creator for reach.", false, "Wrong — impersonation is prohibited."],
        ["Unredacted analytics pasted into five models.", false, "Wrong — unredacted analytics violate privacy."],
      ],
    ),
  ],
});
