import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "professional-outreach-and-communication",
  programKey: "partnerships",
  title: "Quiz: Professional Outreach & Communication",
  questions: [
    question("q1", "Professional outreach should avoid?", [
      ["Desperate language and vague 'collab?' messages with no proof.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Specific audience data.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["One clear ask.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Proofread drafts.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q2", "Follow-up cadence should include?", [
      ["Planned touches and a polite final close-out.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Daily messages until blocked.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Threats about competitors.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Never stopping.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q3", "Brand-specific observation means?", [
      ["Reference a real campaign or product fit—not generic flattery.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Copy their mission statement only.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Pretend you already work together.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Offer hidden ads.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q4", "LinkedIn intro checklist ensures?", [
      ["Professional profile and concise context before asking.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Immediate voice note spam.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Fake mutual connections.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Sharing private rates publicly.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q5", "After three follow-ups with no reply?", [
      ["Close the loop politely and move on—reputation matters.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Create drama publicly.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Send fifty more emails.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Buy followers then retry.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q6", "Outreach mission success?", [
      ["Completed templates, cadence, checklist, and dated draft.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Guaranteed brand contract.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Higher gifts.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Rank increase.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q7", "EPK link in outreach should?", [
      ["Go to a complete or honestly in-progress public kit.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Hide all stats.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Use broken links.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Replace disclosure.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q8", "This lesson is NOT?", [
      ["Selling & Influence ask craft for viewers—that is a different path.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Business email structure.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Follow-up planning.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Professional tone.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
  ],
});
