import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "storytelling-on-live-not-scripts",
  programKey: "presence",
  title: "Quiz: Storytelling on LIVE (Not Scripts)",
  questions: [
    question("q1", "A strong LIVE micro-story usually has…", [
      ["Setup, turn, and payoff in roughly 60–90 seconds without reading an essay", true, "Correct — short-form LIVE storytelling."],
      ["A 12-minute monologue with no clear turn", false, "Wrong — ramble is not story."],
      ["A teleprompter script read line-for-line", false, "Wrong — not scripts."],
      ["No payoff so viewers invent the ending", false, "Wrong — payoff creates memory."],
    ]),
    question("q2", "Chat interrupts mid-story. Best recovery?", [
      ["Acknowledge briefly, bridge back, land the payoff", true, "Correct — stay flexible without abandoning the turn."],
      ["Abandon the story and never return", false, "Wrong — no memory formed."],
      ["Ignore the comment forever while reading your phone notes", false, "Wrong — loses both chat and presence."],
      ["Restart the story from childhood every time", false, "Wrong — essay mode."],
    ]),
    question("q3", "The story bank exists to…", [
      ["Give you ten tagged micro-stories you can pull without inventing under panic", true, "Correct — bank is the asset."],
      ["Replace talking to chat entirely", false, "Wrong — stories sit inside a LIVE."],
      ["Prove you can write novels", false, "Wrong — micro-stories."],
      ["Only prepare Capstone week and never practice earlier", false, "Wrong — practice now."],
    ]),
    question("q4", "Mission success is…", [
      ["Bank of ten + three on-camera stories with clear payoffs on a 45+ minute LIVE", true, "Correct — proof on camera."],
      ["One viral clip regardless of payoff", false, "Wrong — payoff is the craft."],
      ["Reading three essays from Notes", false, "Wrong — not scripts."],
      ["Skipping stories if chat is quiet", false, "Wrong — quiet rooms still need memory."],
    ]),
    question("q5", "Privacy boundary for stories?", [
      ["Do not invent trauma, overshare addresses/work, or expose other people’s secrets", true, "Correct — intimacy with boundaries."],
      ["Share everything private to prove authenticity", false, "Wrong — unsafe."],
      ["Only tell stories about viewers without consent", false, "Wrong — harmful."],
      ["Privacy rules ended after Advanced Creator", false, "Wrong — still apply."],
    ]),
    question("q6", "Why stories matter after camera and voice?", [
      ["Polished delivery of nothing sticky is forgettable — stories create memory", true, "Correct — memorable vs watchable."],
      ["Stories replace framing and vocal variety", false, "Wrong — they stack."],
      ["Stories are only for podcast guests", false, "Wrong — LIVE skill."],
      ["Hooks and loops make stories unnecessary", false, "Wrong — stories drop inside loops."],
    ]),
    question("q7", "Next lesson connection?", [
      ["Psychology maps motives; stories become tagged for why people stay", true, "Correct — bank feeds motive work."],
      ["Stories end Presence Mastery", false, "Wrong — pacing and more remain."],
      ["You stop using stories after this quiz", false, "Wrong — Capstone needs a story/teach beat."],
      ["Only gift goals matter next", false, "Wrong — motives are broader."],
    ]),
    question("q8", "A weak story on replay usually fails because…", [
      ["No turn or no payoff — it was a fragment or a rant", true, "Correct — diagnose structure."],
      ["Not enough filters on the camera", false, "Wrong — structure issue."],
      ["Viewer count was under one hundred", false, "Wrong — not the craft grade."],
      ["You smiled once", false, "Wrong — irrelevant."],
    ]),
  ],
});
