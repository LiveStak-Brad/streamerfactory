import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "ai-content-planning-and-brainstorming",
  programKey: "aicreator",
  title: "Quiz: AI Content Planning and Brainstorming",
  questions: [
    question(
      "q1",
      "What should exist before an AI brainstorm?",
      [
        ["A human strategy spine with promise, themes, capacity, and constraints.", true, "Correct — the spine keeps divergence useful and honest."],
        ["Only a demand for thirty viral ideas.", false, "Wrong — volume without strategy creates abandonware calendars."],
        ["A paste of private subscriber emails.", false, "Wrong — private emails must not be pasted into tools."],
        ["A plan to impersonate a rival’s calendar.", false, "Wrong — impersonation is prohibited."],
      ],
    ),
    question(
      "q2",
      "How should audience insights enter a prompt?",
      [
        ["As redacted theme summaries without private identifiers or unredacted exports.", true, "Correct — pattern summaries protect privacy while informing plans."],
        ["As full Discord/email dumps for accuracy.", false, "Wrong — unredacted dumps violate privacy standards."],
        ["As invented hate comments for drama hooks.", false, "Wrong — manufacturing hate for hooks is unethical."],
        ["As scraped DMs from competitors.", false, "Wrong — scraping private competitor DMs is not allowed."],
      ],
    ),
    question(
      "q3",
      "A hook promises ‘guaranteed follower growth.’ Best action?",
      [
        ["Kill or rewrite it; do not schedule misleading guarantees.", true, "Correct — misleading guarantees fail ethics and trust."],
        ["Pin it because AI wrote it confidently.", false, "Wrong — model confidence is not evidence."],
        ["Auto-post it hourly.", false, "Wrong — auto-spam is prohibited."],
        ["Pair it with fake testimonials.", false, "Wrong — fake testimonials are dishonest."],
      ],
    ),
    question(
      "q4",
      "Why score ideas by effort?",
      [
        ["So the calendar matches what you can actually produce this week.", true, "Correct — capacity-aware planning is professional."],
        ["So you can hide low-effort spam.", false, "Wrong — spam is never the goal."],
        ["So AI can replace your taste.", false, "Wrong — scoring supports human selection, not replacement."],
        ["So you avoid verification.", false, "Wrong — verification remains required."],
      ],
    ),
    question(
      "q5",
      "What belongs in a LIVE plan prompt pack request?",
      [
        ["Opening promise, segment options, clarity risks, and reminders that safety stays human-owned.", true, "Correct — production clarity with human safety ownership."],
        ["A request for unverified platform features.", false, "Wrong — do not invent features."],
        ["Instructions to farm conflict.", false, "Wrong — conflict farming is prohibited."],
        ["A gift or rank target as success.", false, "Wrong — metrics are not the grade."],
      ],
    ),
    question(
      "q6",
      "What is a parking lot for?",
      [
        ["Strong ideas that do not fit this week’s capacity or sequence.", true, "Correct — park timing without losing the idea."],
        ["Ideas you will never review.", false, "Wrong — parking still implies later review."],
        ["Private data storage.", false, "Wrong — do not store private data in prompt packs."],
        ["Unverified medical claims awaiting publish.", false, "Wrong — unverified medical claims should be killed, not parked for publish."],
      ],
    ),
    question(
      "q7",
      "Best signal that planning used AI well?",
      [
        ["Option batches plus a human-selected calendar and shipped pieces with feedback notes.", true, "Correct — selection and shipping evidence beat generation volume."],
        ["Hundreds of unused generations.", false, "Wrong — unused volume is not mastery."],
        ["A claim that AI picked everything.", false, "Wrong — humans must own strategy selection."],
        ["A public post of private analytics.", false, "Wrong — private analytics must not be published into tools or posts carelessly."],
      ],
    ),
    question(
      "q8",
      "Which idea belongs on the kill list?",
      [
        ["A concept that requires plagiarism, impersonation, or fake engagement.", true, "Correct — unethical tactics are killed, not optimized."],
        ["A difficult educational series you can prepare for.", false, "Wrong — difficulty alone is not a kill reason."],
        ["A hook that needs one research check.", false, "Wrong — research load can be scored, not automatically killed."],
        ["A LIVE with a clear promise.", false, "Wrong — clear promises are desirable."],
      ],
    ),
  ],
});
