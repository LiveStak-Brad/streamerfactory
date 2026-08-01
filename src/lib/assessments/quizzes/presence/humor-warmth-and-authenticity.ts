import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "humor-warmth-and-authenticity",
  programKey: "presence",
  title: "Quiz: Humor, Warmth, and Authenticity",
  questions: [
    question("q1", "Authenticity on LIVE is best practiced as…", [
      ["Three personality levers that fit you — observational humor, warmth, and edge you can sustain", true, "Correct — selection, not costumes."],
      ["Copying viral bits that do not fit your brand", false, "Wrong — forced comedy reads desperate."],
      ["Oversharing private details to prove you are real", false, "Wrong — authenticity ≠ unsafe disclosure."],
      ["Never planning anything so every moment is spontaneous", false, "Wrong — panic is not authenticity."],
    ]),
    question("q2", "Chat goes quiet and you want to spray jokes. Best first move?", [
      ["Run quiet-chat protocol first, then place one observational lever after you are grounded", true, "Correct — no panic comedy."],
      ["Force six punchlines until someone laughs", false, "Wrong — fear wearing a costume."],
      ["Roast quiet viewers for not typing", false, "Wrong — punches down."],
      ["Abandon warmth forever", false, "Wrong — extremes."],
    ]),
    question("q3", "A complete lever on the card needs…", [
      ["Name, when, example line/move, brand fit, and off-limits", true, "Correct — vague levers become forced bits."],
      ["Only a vibe word like 'funny'", false, "Wrong — not executable."],
      ["Nine different personas", false, "Wrong — three levers max for practice."],
      ["Someone else's roast template with no edits", false, "Wrong — borrowed persona."],
    ]),
    question("q4", "Warmth done wrong looks like…", [
      ["Only thanking gifters while ignoring chatters and returns", true, "Correct — paywalled belonging is a leave-trigger."],
      ["Naming people and thanking specifically across chat and gifts", false, "Wrong — that is warmth done right."],
      ["Slowing down for a returning regular", false, "Wrong — that feeds belonging."],
      ["Acknowledging effort, not only coins", false, "Wrong — that is healthy warmth."],
    ]),
    question("q5", "Mission success is…", [
      ["Personality Lever Card complete + three deliberate lever uses on a 40+ minute LIVE", true, "Correct — practice all three."],
      ["A full stand-up set", false, "Wrong — not a comedy show."],
      ["Skipping edge because you want to stay 'nice'", false, "Wrong — forgettable without spine."],
      ["Inventing a new persona for Capstone week only", false, "Wrong — practice the real one now."],
    ]),
    question("q6", "How should levers sit on emotional pacing?", [
      ["Humor as release after tension, warmth after payoff, edge as signature stance — levers serve the arc", true, "Correct — placement beats volume."],
      ["Humor every fifteen seconds regardless of arc", false, "Wrong — noise."],
      ["Levers replace the energy map", false, "Wrong — they decorate it."],
      ["Never place edge near open or close", false, "Wrong — edge often works as signature stance there."],
    ]),
    question("q7", "You are nice but forgettable. Best fix?", [
      ["Add one brand-true edge lever while keeping warmth", true, "Correct — spine + care."],
      ["Copy a louder creator's roast style", false, "Wrong — costume."],
      ["Stop using warmth", false, "Wrong — keep belonging."],
      ["Overshare trauma for shock value", false, "Wrong — unsafe and not required."],
    ]),
    question("q8", "Capstone connection?", [
      ["Lever card becomes Capstone identity fuel for open, beats, and close", true, "Correct — recognizable you."],
      ["Personality is banned from Capstone", false, "Wrong — Capstone needs identity."],
      ["Honors Lab invents your levers for you", false, "Wrong — you build them; labs optional."],
      ["Forced bits are required for certificate", false, "Wrong — opposite of the lesson."],
    ]),
  ],
});
