import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "ethics-privacy-and-responsible-ai",
  programKey: "aicreator",
  title: "Quiz: Ethics, Privacy, and Responsible AI",
  questions: [
    question(
      "q1",
      "A teammate starts pasting private Discord complaints into a chatbot. Best response?",
      [
        ["Stop the paste, apply red lines, and use a redacted or human-only process.", true, "Correct — privacy red lines override convenience."],
        ["Let it finish for better insights.", false, "Wrong — completing the paste worsens exposure."],
        ["Publish the chat log with AI commentary.", false, "Wrong — publishing private complaints compounds harm."],
        ["Reward the teammate for speed.", false, "Wrong — speed is not a virtue here."],
      ],
    ),
    question(
      "q2",
      "What belongs in a responsible AI policy card?",
      [
        ["Human ownership, verification, privacy, disclosure guidance, and bans on deceptive tactics.", true, "Correct — those elements make ethics operable."],
        ["Only affiliate rules.", false, "Wrong — affiliates alone are insufficient."],
        ["A promise AI will replace hosts.", false, "Wrong — replacement thinking rejects human-first craft."],
        ["Instructions for fake engagement.", false, "Wrong — fake engagement is banned."],
      ],
    ),
    question(
      "q3",
      "When should you lean toward disclosure?",
      [
        ["When AI materially shaped content in ways audience trust or platform rules make relevant.", true, "Correct — material use and trust drive disclosure."],
        ["Never, because disclosure reduces reach.", false, "Wrong — hiding for reach fails responsibility."],
        ["Only as a meme.", false, "Wrong — disclosure should be clear, not theatrical."],
        ["Only if legally forced after harm.", false, "Wrong — waiting for harm is too late."],
      ],
    ),
    question(
      "q4",
      "Which tactic is explicitly out of bounds?",
      [
        ["Non-consensual deepfakes, spam, fake engagement, plagiarism, and impersonation.", true, "Correct — those deceptive harms are banned."],
        ["Human-edited AI drafts with verification.", false, "Wrong — that is allowed responsible practice."],
        ["Redacted analytics summaries.", false, "Wrong — that is allowed responsible practice."],
        ["Caption QA.", false, "Wrong — that is allowed responsible practice."],
      ],
    ),
    question(
      "q5",
      "A published AI-assisted claim was wrong. Best response?",
      [
        ["Correct clearly, note the process gap, and update the checklist.", true, "Correct — transparent correction plus system fix."],
        ["Delete silently and pretend nothing happened.", false, "Wrong — silent deletion fails audience reliance."],
        ["Blame the model and move on with no change.", false, "Wrong — blame without process change repeats failure."],
        ["Double down to avoid embarrassment.", false, "Wrong — doubling down deepens harm."],
      ],
    ),
    question(
      "q6",
      "Why review vendor/data settings?",
      [
        ["Prompts and uploads may be stored or used for training depending on tools and modes.", true, "Correct — procurement and settings are part of privacy."],
        ["Because all tools are identical.", false, "Wrong — tools differ."],
        ["Because privacy never applies to free tools.", false, "Wrong — free tools still process data."],
        ["Because settings replace red lines.", false, "Wrong — settings complement red lines, not replace them."],
      ],
    ),
    question(
      "q7",
      "Disclosure scripts should be…",
      [
        ["Plain, accurate, and matched to context.", true, "Correct — clarity builds trust."],
        ["Fearmongering about all AI.", false, "Wrong — fearmongering misinforms."],
        ["Jokes that conceal deception.", false, "Wrong — jokes that hide deception fail ethics."],
        ["Copied fake legal threats.", false, "Wrong — fake legal theater is dishonest."],
      ],
    ),
    question(
      "q8",
      "Capstone-ready ethics evidence includes…",
      [
        ["Policy card, red-line checklist drill, disclosure scripts, and a refusal practice note.", true, "Correct — operable artifacts prove the ethics layer."],
        ["A vibe statement with no artifacts.", false, "Wrong — vibes are not evidence."],
        ["A spam experiment log.", false, "Wrong — spam experiments are out of bounds."],
        ["Unredacted private data samples.", false, "Wrong — private data samples must not be filed carelessly."],
      ],
    ),
  ],
});
