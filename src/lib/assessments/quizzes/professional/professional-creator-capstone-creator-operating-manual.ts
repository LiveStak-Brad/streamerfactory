import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "professional-creator-capstone-creator-operating-manual",
  programKey: "professional",
  title: "Quiz: Professional Creator Capstone — Creator Operating Manual",
  questions: [
    question(
      "q1",
      "What is the primary nature of this Capstone, compared to PC-01 through PC-09?",
      [
        ["Evidence assembly — integrating existing artifacts, not new content", true, "Correct — the Capstone does not re-teach earlier material, it integrates it."],
        ["An entirely new set of lessons unrelated to PC-01–PC-09", false, "Wrong — it explicitly builds on and assembles those artifacts."],
        ["A replacement for completing PC-01 through PC-09", false, "Wrong — those lessons are required prerequisites, not optional."],
        ["A test of memorized definitions from every prior lesson", false, "Wrong — it's about assembling real artifacts, not memorization."],
      ],
    ),
    question(
      "q2",
      "A creator's 30-day business health snapshot reveals a real concentration-risk problem. What should they do in the manual?",
      [
        ["Include it honestly — the Capstone values reviewability over flattering numbers", true, "Correct — honest weak points are more valuable than a manual with none."],
        ["Omit that section since it makes them look unprofessional", false, "Wrong — omitting sections is an explicit common mistake called out in the lesson."],
        ["Adjust the numbers until the risk looks smaller", false, "Wrong — the manual must reflect real numbers, not adjusted ones."],
        ["Replace the snapshot with a projection of future improvement instead", false, "Wrong — the snapshot must reflect the actual 30-day period, not a projection."],
      ],
    ),
    question(
      "q3",
      "A creator has no real inbound brand inquiry to use for the PC-06 scorecard evidence. What is the correct approach?",
      [
        ["Use a realistic sample inquiry, clearly labeled as a sample", true, "Correct — this satisfies the evidence requirement without inventing a fake real relationship."],
        ["Invent a fake real brand relationship and present it as genuine", false, "Wrong — this is explicitly listed as a mistake to avoid."],
        ["Skip that section of the manual entirely", false, "Wrong — a clearly labeled sample is the correct alternative, not omission."],
        ["Wait indefinitely until a real inquiry arrives before finishing the Capstone", false, "Wrong — a sample lets the Capstone proceed without a real inquiry."],
      ],
    ),
    question(
      "q4",
      "What distinguishes a strong 90-day operating plan from a weak one, per this lesson?",
      [
        ["It is forward-looking with specific, checkable actions tied to real numbers", true, "Correct — 'grow my income' is too vague; specific checkable actions are required."],
        ["It only summarizes what already happened in the past 90 days", false, "Wrong — the lesson explicitly calls this out as a common mistake."],
        ["It contains no numbers at all, only general intentions", false, "Wrong — the plan should be tied to real, specific numbers."],
        ["It is written entirely by projecting income growth percentages", false, "Wrong — the examples given are about behavior and process, not growth projections."],
      ],
    ),
    question(
      "q5",
      "What review rhythm does the lesson recommend for keeping the manual alive after the Capstone is filed?",
      [
        ["A sustainable weekly, monthly, and quarterly rhythm written down as part of the manual", true, "Correct — an unwritten review process isn't reviewable by anyone, including future you."],
        ["No review is necessary once the manual is filed", false, "Wrong — the lesson states a manual never reviewed again is a snapshot, not a system."],
        ["A daily review of every section in full detail", false, "Wrong — the lesson recommends a lighter, more sustainable weekly/monthly/quarterly rhythm."],
        ["Reviewing only if Professional Creator Lab requests it", false, "Wrong — the review process is the creator's own ongoing practice, not lab-dependent."],
      ],
    ),
    question(
      "q6",
      "What is the correct relationship between this Capstone and optional Professional Creator Lab / Honors?",
      [
        ["Lab/Honors is optional polish available after the certificate and never gates it", true, "Correct — explicitly stated as never blocking certification already earned."],
        ["Lab review must be completed before the certificate can be awarded", false, "Wrong — the lesson explicitly says Lab never gates the certificate."],
        ["Lab/Honors replaces the need to assemble the manual at all", false, "Wrong — the manual assembly is required; Lab is optional afterward."],
        ["Lab/Honors is only available to creators pursuing Hall of Fame", false, "Wrong — Lab/Honors and Hall of Fame are described as separate optional paths."],
      ],
    ),
    question(
      "q7",
      "How does Hall of Fame consideration relate to this Capstone, according to the lesson?",
      [
        ["It's an optional honors path available only after a review pass — never a requirement", true, "Correct — explicitly never a certification requirement or something to chase to complete the Capstone."],
        ["It is required to complete the Professional Creator Mastery Certificate", false, "Wrong — the lesson explicitly says it is never a requirement."],
        ["It replaces the need for a 90-day operating plan", false, "Wrong — Hall of Fame is unrelated to the 90-day plan requirement."],
        ["It is awarded automatically to anyone who files a manual", false, "Wrong — it requires a review pass and is optional, not automatic."],
      ],
    ),
    question(
      "q8",
      "Which of the following is explicitly listed as something this Capstone is NOT?",
      [
        ["A legal document, tax filing, investment plan, or a recruiting tool for other creators", true, "Correct — the lesson lists these explicitly as out of scope."],
        ["A document assembled from PC-01–PC-09 artifacts", false, "Wrong — that is exactly what the Capstone is."],
        ["A packet that should include a 90-day operating plan", false, "Wrong — the 90-day plan is a required section."],
        ["Something evaluated on completeness and reviewability", false, "Wrong — that is explicitly the stated success standard."],
      ],
    ),
  ],
});
