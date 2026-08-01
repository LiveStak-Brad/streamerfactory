import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "thinking-like-an-ai-powered-creator",
  programKey: "aicreator",
  title: "Quiz: Thinking Like an AI-Powered Creator",
  questions: [
    question(
      "q1",
      "A creator wants AI to ‘just write the whole week’s content.’ Best first response?",
      [
        ["Score each task for risk, voice, and privacy; assign AI only as assistant with human verification.", true, "Correct — task scoring keeps AI in an assistant role with human ownership of publishable work."],
        ["Paste last week’s private analytics and auto-generate everything.", false, "Wrong — private analytics and unreviewed mass generation violate privacy and verification standards."],
        ["Publish the first fluent draft without checking facts.", false, "Wrong — fluency is not accuracy; publishing unchecked drafts trains bad habits."],
        ["Switch tools until one model sounds more confident.", false, "Wrong — confidence is not a verification method, and brand-hopping skips judgment."],
      ],
    ),
    question(
      "q2",
      "Which decision should stay human even when AI drafts well?",
      [
        ["Final voice, defendable facts, brand relationships, and privacy boundaries.", true, "Correct — those are accountability and trust decisions a model cannot own for you."],
        ["Only the thumbnail color.", false, "Wrong — aesthetics matter, but they are not the core human ownership line."],
        ["Nothing—AI should own the channel.", false, "Wrong — outsourcing the channel abandons creator responsibility."],
        ["Only the posting time.", false, "Wrong — scheduling is optional optimization, not the core trust layer."],
      ],
    ),
    question(
      "q3",
      "How should a beginner choose between ChatGPT, Claude, Gemini, Perplexity, and Copilot?",
      [
        ["By task fit—breadth, long-form writing, Workspace/multimodal, citations, or Microsoft stack—then verify current capabilities.", true, "Correct — tool-by-task choice plus version-aware verification is the curriculum standard."],
        ["By whichever brand is trending on social media today.", false, "Wrong — hype is not a workflow criterion."],
        ["By promising one tool is always best forever.", false, "Wrong — capabilities change; permanent crowns are false."],
        ["By pasting confidential emails into all five to compare.", false, "Wrong — confidential emails must not be pasted into tools for bake-offs."],
      ],
    ),
    question(
      "q4",
      "An AI draft invents a feature the creator has not verified. What should they do?",
      [
        ["Cut or rewrite after verifying in the real product; do not publish the claim as fact.", true, "Correct — hallucinations require verification or removal before publishing."],
        ["Keep it because it sounds authoritative.", false, "Wrong — authoritative tone does not create truth."],
        ["Ask the model to make it sound even more certain.", false, "Wrong — increasing certainty without evidence worsens the risk."],
        ["Post it and correct only if someone complains.", false, "Wrong — audience correction is not a responsible QA process."],
      ],
    ),
    question(
      "q5",
      "What belongs on an AI Stack Starter Card?",
      [
        ["Primary tool by task, backup option, and a never-paste privacy rule.", true, "Correct — task mapping plus privacy rules make the stack operable and safe."],
        ["Only affiliate links.", false, "Wrong — monetization links are not the operating standard."],
        ["A promise that AI will replace the creator.", false, "Wrong — replacement thinking violates human-first creativity."],
        ["A plan to auto-spam comments.", false, "Wrong — spam and fake engagement are never taught here."],
      ],
    ),
    question(
      "q6",
      "When is brainstorming with AI most useful?",
      [
        ["When you want option volume, then you converge with human selection and verification before publishing.", true, "Correct — diverge for options, converge with human judgment and checks."],
        ["When you need unreviewed factual claims for authority.", false, "Wrong — facts require verification, not brainstorm mode."],
        ["When you want to impersonate another creator’s voice.", false, "Wrong — impersonation is prohibited."],
        ["When you need to deepfake a guest without consent.", false, "Wrong — non-consensual deepfake misuse is prohibited."],
      ],
    ),
    question(
      "q7",
      "A collaborator pastes unredacted subscriber emails into a chatbot. Best response?",
      [
        ["Stop the paste, remove the data if possible, and switch to redacted or human-only handling.", true, "Correct — privacy and confidentiality come first; redact or keep it human-only."],
        ["Ask the model to rewrite the emails for a public roast.", false, "Wrong — public roasting of private emails is harmful and unethical."],
        ["Celebrate the productivity gain.", false, "Wrong — privacy violations are not productivity wins."],
        ["Export the chat to train a public prompt pack.", false, "Wrong — exporting private data into public materials compounds harm."],
      ],
    ),
    question(
      "q8",
      "What is the strongest Capstone evidence from this lesson?",
      [
        ["Completed scorecard, decision matrix, stack card, and a note showing verification after an assisted draft.", true, "Correct — reviewable judgment artifacts beat volume or vanity metrics."],
        ["A screenshot of how many words AI generated.", false, "Wrong — word count is not craft evidence."],
        ["A claim that viewers increased.", false, "Wrong — metrics do not prove responsible AI practice."],
        ["A folder of unedited AI posts.", false, "Wrong — unedited AI posts show missing human ownership."],
      ],
    ),
  ],
});
