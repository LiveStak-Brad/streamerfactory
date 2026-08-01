import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "privacy-security-and-reputation-as-business-assets",
  programKey: "professional",
  title: "Quiz: Privacy, Security, and Reputation as Business Assets",
  questions: [
    question(
      "q1",
      "A creator notices a login alert from a location they don't recognize. What is the correct first action?",
      [
        ["Change the password immediately from a device known to be clean", true, "Correct — speed and a clean device matter most in the first minutes."],
        ["Wait a day to see if it happens again before doing anything", false, "Wrong — waiting gives an intruder more time with account access."],
        ["Reply to any DM offering to help recover the account", false, "Wrong — recovery-help DMs are a common scam vector, never trust them."],
        ["Post publicly right away asking followers what to do", false, "Wrong — secure the account first through official channels, not public crowdsourcing."],
      ],
    ),
    question(
      "q2",
      "How does this lesson distinguish privacy hygiene from incident response?",
      [
        ["Hygiene is the daily foundation; incident response is the plan for when hygiene wasn't enough", true, "Correct — both matter, but they are different disciplines."],
        ["They are the same thing described with different words", false, "Wrong — confusing them is called out as a specific mistake in the lesson."],
        ["Incident response replaces the need for daily hygiene", false, "Wrong — hygiene reduces how often incident response is needed."],
        ["Hygiene only applies to passwords, incident response only applies to reputation", false, "Wrong — both hygiene and incident response cover account security and reputation."],
      ],
    ),
    question(
      "q3",
      "A message claims to be platform support and asks for your password to 'help recover' your account. What should you do?",
      [
        ["Ignore it and use only official platform support channels", true, "Correct — legitimate support never asks for your password directly via DM."],
        ["Send the password since they claim to be official support", false, "Wrong — this is a classic account-takeover scam pattern."],
        ["Change your username instead of your password", false, "Wrong — this does not address the actual threat."],
        ["Forward the message to followers so they can verify it", false, "Wrong — this risks spreading the scam further, not resolving the threat."],
      ],
    ),
    question(
      "q4",
      "A single hater comment appears with very little reach and no pattern. Where does this sit on the reputation risk ladder?",
      [
        ["Normal noise — most days produce this and it does not need a crisis response", true, "Correct — reacting to normal noise as an incident wastes energy needed for real problems."],
        ["Real incident — any negative comment requires an incident response plan", false, "Wrong — that would mean reacting to nearly everything as a crisis."],
        ["Worth watching — it should be tracked closely for 48 hours", false, "Wrong — worth watching applies to unusual traction or a pattern, not an isolated comment."],
        ["Account compromise — negative comments always indicate a hacked account", false, "Wrong — a hater comment has nothing to do with account security."],
      ],
    ),
    question(
      "q5",
      "A clip starts spreading that shows a creator's words out of context. What does the lesson recommend as the first step?",
      [
        ["Pause before responding publicly and get the facts straight for themselves first", true, "Correct — the first hour is rarely the clearest thinking; pause before reacting."],
        ["Post an immediate, forceful denial to control the narrative", false, "Wrong — rushed responses often extend a story rather than end it."],
        ["Delete all social accounts until it passes", false, "Wrong — this is an overreaction not supported by the lesson's judgment framework."],
        ["Ignore it completely regardless of how far it spreads", false, "Wrong — the lesson says to assess reach and pattern, not ignore automatically."],
      ],
    ),
    question(
      "q6",
      "During the privacy and security hygiene pass, what should a creator check regarding passwords?",
      [
        ["Whether creator account passwords are unique and not reused from other sites", true, "Correct — reused passwords are a specific hygiene risk called out in the lesson."],
        ["Whether the password is memorable enough to say out loud on LIVE", false, "Wrong — memorability is not the security goal here."],
        ["Whether the password matches their creator brand name", false, "Wrong — this would make the password easier to guess, not more secure."],
        ["Whether the password has been the same for as long as possible", false, "Wrong — long-unchanged reused passwords are a hygiene risk, not a strength."],
      ],
    ),
    question(
      "q7",
      "What does this lesson explicitly say it does NOT teach?",
      [
        ["Legal practice, crisis PR for large-scale scandals, or handling genuine safety threats", true, "Correct — those require qualified help; the lesson teaches judgment and preparation only."],
        ["How to write a basic incident response checklist", false, "Wrong — that is the core deliverable of this lesson."],
        ["How to distinguish normal noise from a real incident", false, "Wrong — that ladder is explicitly taught in this lesson."],
        ["How to run a privacy hygiene pass on passwords and recovery options", false, "Wrong — that is part of the required mission."],
      ],
    ),
    question(
      "q8",
      "Why does the lesson recommend writing the Incident Response Checklist now, while calm, rather than during an actual incident?",
      [
        ["Because checklists written during a crisis are rarely as clear as ones written in advance", true, "Correct — preparation removes friction exactly when panic would otherwise slow you down."],
        ["Because the checklist format is required for certification regardless of usefulness", false, "Wrong — the reasoning given is practical, not a certification formality."],
        ["Because incidents never actually happen to creators", false, "Wrong — the lesson explicitly says incidents are real business events."],
        ["Because a checklist written during a crisis would need legal review", false, "Wrong — this is not framed as a legal requirement."],
      ],
    ),
  ],
});
