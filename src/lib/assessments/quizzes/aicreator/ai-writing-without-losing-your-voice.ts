import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "ai-writing-without-losing-your-voice",
  programKey: "aicreator",
  title: "Quiz: AI Writing Without Losing Your Voice",
  questions: [
    question(
      "q1",
      "What makes ‘sound like me’ actually work?",
      [
        ["A voice packet with real samples, traits, and banned phrases.", true, "Correct — concrete voice constraints beat empty adjectives."],
        ["Only the instruction ‘be authentic.’", false, "Wrong — authenticity without samples is vague."],
        ["Copying a rival creator’s catchphrases.", false, "Wrong — impersonation/catchphrase cloning is prohibited."],
        ["Asking for fake personal stories.", false, "Wrong — invented personal stories destroy trust."],
      ],
    ),
    question(
      "q2",
      "AI inserts a touching anecdote you never told. Best action?",
      [
        ["Delete it and use a real, consent-safe example—or remove the anecdote.", true, "Correct — fabricated personal stories are unacceptable."],
        ["Keep it because it increases emotion.", false, "Wrong — emotional lift does not justify falsehood."],
        ["Publish and admit it later if caught.", false, "Wrong — deferred honesty still publishes a lie."],
        ["Ask for three more invented anecdotes.", false, "Wrong — more inventions multiply the problem."],
      ],
    ),
    question(
      "q3",
      "Best editing sequence for assisted writing?",
      [
        ["Notes → assisted draft → human fact pass → clarity edit → authenticity pass.", true, "Correct — sequenced gates protect truth and voice."],
        ["One vague ‘make it perfect’ prompt, then publish.", false, "Wrong — vague perfection prompts create bland risk."],
        ["Publish first, edit if ratio drops.", false, "Wrong — metrics are not a fact-check."],
        ["Generate and post without reading.", false, "Wrong — unread publishing fails the human gate."],
      ],
    ),
    question(
      "q4",
      "Why keep a rewrite comparison card?",
      [
        ["It proves human taste decisions and trains voice recognition.", true, "Correct — comparison cards make authorship decisions visible."],
        ["It increases word count for quizzes.", false, "Wrong — it is not a word-count trick."],
        ["It replaces fact-checking.", false, "Wrong — facts still need separate verification."],
        ["It justifies plagiarism if the AI suggested it.", false, "Wrong — AI suggestion never licenses plagiarism."],
      ],
    ),
    question(
      "q5",
      "Which request is out of bounds?",
      [
        ["Recreate another creator’s unique script to steal their viral beats.", true, "Correct — stealing another creator’s unique script is plagiarism/impersonation territory."],
        ["Tighten my outline while preserving my examples.", false, "Wrong — that is a legitimate assist."],
        ["Offer clearer transitions in my draft.", false, "Wrong — clarity help is legitimate."],
        ["Flag uncertain claims in my draft.", false, "Wrong — uncertainty flags are legitimate."],
      ],
    ),
    question(
      "q6",
      "How should Claude vs ChatGPT be chosen for writing?",
      [
        ["By task—often long-form careful revision vs broader alternatives—then verify current fit in your tools.", true, "Correct — tool-by-task and version-aware verification."],
        ["By declaring one forever winner for all writing.", false, "Wrong — permanent crowns ignore change and fit."],
        ["By pasting confidential contracts into both.", false, "Wrong — confidential contracts must not be pasted in."],
        ["By which logo looks nicer.", false, "Wrong — aesthetics are not selection criteria."],
      ],
    ),
    question(
      "q7",
      "What does the authenticity checklist primarily protect?",
      [
        ["Recognizable voice, truthfulness, privacy, and originality before publish.", true, "Correct — those four are the trust layer."],
        ["Maximum posting frequency.", false, "Wrong — frequency is not authenticity."],
        ["Affiliate density.", false, "Wrong — monetization density is separate."],
        ["Model brand loyalty.", false, "Wrong — brand loyalty is not the standard."],
      ],
    ),
    question(
      "q8",
      "A clarity edit removes your specific example and inserts a generic tip. What do you do?",
      [
        ["Restore a specific true example and keep only the clarity improvements.", true, "Correct — keep clarity, restore specificity and truth."],
        ["Accept the generic tip to sound more universal.", false, "Wrong — generic universality often erases brand."],
        ["Add a fake case study for punch.", false, "Wrong — fake case studies are dishonest."],
        ["Leave both and hope viewers ignore inconsistency.", false, "Wrong — inconsistency harms trust."],
      ],
    ),
  ],
});
