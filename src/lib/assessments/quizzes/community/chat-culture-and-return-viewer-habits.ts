import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "chat-culture-and-return-viewer-habits",
  programKey: "community",
  title: "Quiz: Chat Culture and Return Viewer Habits",
  questions: [
    question("q1", "Chat culture is taught most effectively by…", [
      ["What you warmly reward in the moment", true, "Correct — reward patterns beat long rules speeches."],
      ["A single mid-stream lecture once a month", false, "Wrong — short repeated open/close cues train faster."],
      ["Only celebrating the biggest gifts", false, "Wrong — that teaches money is the only path to matter."],
      ["Ignoring first-timers so regulars feel elite", false, "Wrong — exclusion is not belonging."],
    ]),
    question("q2", "The three return-viewer habits in this lesson are…", [
      ["Greeting, callback, and member moment", true, "Correct — install all three in open/close."],
      ["Raid spam, follow-for-follow, and guilt closes", false, "Wrong — unethical and out of scope."],
      ["Brand redesign, clip CTA, and battle booking", false, "Wrong — Growth/Content territory; brief callbacks only."],
      ["Private DMs, loyalty tests, and scarcity countdowns", false, "Wrong — banned parasocial / pressure tactics."],
    ]),
    question("q3", "Recognition of returning viewers should feel like…", [
      ["Public, proportionate respect for showing up", true, "Correct — recognition without manufactured intimacy."],
      ["Proof you are their private best friend", false, "Wrong — fake friendship / parasocial exploitation."],
      ["A demand that they gift to keep the welcome", false, "Wrong — guilt gifting is banned."],
      ["Optional only when the room is huge", false, "Wrong — run habits on quiet nights too."],
    ]),
    question("q4", "On a quiet night with no obvious returners, you should…", [
      ["Still run the full open/close habits and log them", true, "Correct — habits train you; quiet nights still count."],
      ["Skip culture work until the room is full", false, "Wrong — skipping teaches culture is optional."],
      ["Invent intimate stories about absent viewers", false, "Wrong — do not manufacture intimacy."],
      ["Grade success by forcing a gift goal", false, "Wrong — gifts are not the mission metric."],
    ]),
    question("q5", "LIVE Mission success is graded on…", [
      ["Running open and close with all three habits on a 45+ LIVE", true, "Correct — execution graded, not gifts/viewers."],
      ["Hitting a new peak viewer count", false, "Wrong — peaks are not the grade."],
      ["Receiving a large gift during member moment", false, "Wrong — gifts are not the mission metric."],
      ["Skipping LIVE if the script looks complete on paper", false, "Wrong — LIVE execution is required."],
    ]),
    question("q6", "When you are unsure someone is a returning viewer…", [
      ["Use warm group welcome-back language instead of a wrong name", true, "Correct — trust beats fake personal certainty."],
      ["Guess a name confidently to look close", false, "Wrong — wrong names damage trust."],
      ["Ignore them until they gift", false, "Wrong — never rank belonging by money."],
      ["Demand they remind you publicly of every past session", false, "Wrong — awkward pressure, not culture."],
    ]),
    question("q7", "How does this lesson relate to Core L14 and GR-11?", [
      ["It deepens continuity and welcome habits into a community open/close system", true, "Correct — brief callbacks; do not rebuild those lessons."],
      ["It replaces Core L14 so callbacks are optional", false, "Wrong — keep continuity; deepen it."],
      ["It is only about spike capture playbooks", false, "Wrong — GR-11 is the spike lesson; this is daily culture."],
      ["It replaces Growth Mastery entirely", false, "Wrong — different discipline; boundary respected."],
    ]),
    question("q8", "Member moments should primarily celebrate…", [
      ["Return behavior and useful contribution — not wallet size", true, "Correct — belonging is not for sale."],
      ["Only the top gifter every night", false, "Wrong — that teaches the wrong culture."],
      ["Viewers who agree to exclusive private access", false, "Wrong — intimacy is not a prize."],
      ["People who guilt others into staying", false, "Wrong — pressure tactics are banned."],
    ]),
  ],
});
