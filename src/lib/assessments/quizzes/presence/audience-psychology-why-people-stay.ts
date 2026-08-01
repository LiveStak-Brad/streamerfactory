import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "audience-psychology-why-people-stay",
  programKey: "presence",
  title: "Quiz: Audience Psychology — Why People Stay",
  questions: [
    question("q1", "Presence audience psychology designs moments for…", [
      ["Belonging, status, entertainment, and identity — without manipulation", true, "Correct — four motives, ethical filter."],
      ["Guilt and FOMO as the only tools", false, "Wrong — manipulation is out."],
      ["Ignoring motives and hoping charisma covers it", false, "Wrong — motives are design inputs."],
      ["Only gifting mechanics from monetization lessons", false, "Wrong — motives are broader than tips."],
    ]),
    question("q2", "Belonging is starved when…", [
      ["People speak up and get ignored, or only whales are celebrated", true, "Correct — leave-trigger."],
      ["You name newcomers and regulars with dignity", false, "Wrong — that feeds belonging."],
      ["You run a warm recognition ritual", false, "Wrong — feeds belonging."],
      ["You thank specifically", false, "Wrong — feeds belonging."],
    ]),
    question("q3", "A redesigned segment should usually…", [
      ["Serve at least two motives on purpose and pass an ethics gate", true, "Correct — strong beats stack motives."],
      ["Maximize shame for non-gifters", false, "Wrong — manipulation."],
      ["Hide the ask and invent false scarcity", false, "Wrong — slimy."],
      ["Abandon your brand identity for a trend", false, "Wrong — identity leave-trigger."],
    ]),
    question("q4", "Status done right looks like…", [
      ["Recognizing contribution with dignity — never ranking people into shame", true, "Correct — healthy status."],
      ["Public pressure contests that humiliate small gifters", false, "Wrong — leave-trigger."],
      ["Ignoring everyone who cannot tip", false, "Wrong — paywalls belonging."],
      ["Fake exclusivity promises you will not keep", false, "Wrong — trust damage."],
    ]),
    question("q5", "Mission success is…", [
      ["Motive map + redesigned segment run on a 45+ minute LIVE + short motive note", true, "Correct — design then proof."],
      ["A guilt script that raised gifts once", false, "Wrong — ethics fail."],
      ["Skipping the map and improvising motives", false, "Wrong — map first."],
      ["Viewer count as the only score", false, "Wrong — motives landed / leave-risk notes."],
    ]),
    question("q6", "Influence vs manipulation?", [
      ["Influence feeds real motives honestly; manipulation hides asks, shames, or fakes intimacy", true, "Correct — respect filter."],
      ["Any tip ask is manipulation", false, "Wrong — honest asks can be fine."],
      ["Manipulation is required for retention", false, "Wrong — out of scope."],
      ["Ethics only matter after Capstone", false, "Wrong — now."],
    ]),
    question("q7", "Why this lesson sits before emotional pacing?", [
      ["Motives answer what to serve; pacing answers when the room can handle heat and rest", true, "Correct — sequence."],
      ["Pacing makes motives irrelevant", false, "Wrong — both needed."],
      ["Psychology replaces stories", false, "Wrong — stories get motive tags."],
      ["You skip pacing if motives are mapped", false, "Wrong — flat energy still loses people."],
    ]),
    question("q8", "Identity leave-trigger example?", [
      ["Bait-and-switch topics or values whiplash that contradict your promise", true, "Correct — identity break."],
      ["Consistent niche language that matches your brand", false, "Wrong — feeds identity."],
      ["A clear brand promise kept on camera", false, "Wrong — feeds identity."],
      ["Recognizable aesthetic over time", false, "Wrong — feeds identity."],
    ]),
  ],
});
