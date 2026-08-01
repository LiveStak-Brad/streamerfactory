import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "discovery-inventory-never-miss-a-publish-window",
  programKey: "growth",
  title: "Quiz: Discovery Inventory — Never Miss a Publish Window",
  questions: [
    question("q1", "A discovery inventory is…", [
      ["A stocked pipeline of clip moments, promos, and CTAs ready to publish", true, "Correct — never miss a window because the shelf is empty."],
      ["A rewrite of your entire show craft", false, "Wrong — show craft is Content Creation."],
      ["A list of engagement bait phrases", false, "Wrong — banned."],
      ["An agency content calendar for other creators", false, "Wrong — out of scope."],
    ]),
    question("q2", "This lesson's hard boundary is…", [
      ["Stock the discovery pipeline — do not rebuild niche, segments, and arcs here", true, "Correct — Growth vs Content Creation boundary."],
      ["Ignore clips forever", false, "Wrong — clips are part of inventory."],
      ["Teach agency recruiting", false, "Wrong — never."],
      ["Replace LIVE with posting only", false, "Wrong — inventory feeds LIVE."],
    ]),
    question("q3", "Growth dies when…", [
      ["You have nothing ready when a publish window opens", true, "Correct — empty shelves kill discovery."],
      ["You refuse to buy followers", false, "Wrong — buying is never required."],
      ["You keep a sustainable schedule", false, "Wrong — that helps."],
      ["You log experiments", false, "Wrong — that helps."],
    ]),
    question("q4", "A four-week discovery inventory board should include…", [
      ["Planned clip moments, session promos, and experiment slots without rewriting the show", true, "Correct — pipeline stock."],
      ["Forty niche pivots", false, "Wrong — thrash."],
      ["Only gift goals", false, "Wrong — not discovery inventory."],
      ["Spam targets", false, "Wrong — banned."],
    ]),
    question("q5", "Clip moments in inventory should…", [
      ["Be captured moments that can point people back to LIVE", true, "Correct — discovery that serves the show."],
      ["Replace going LIVE entirely", false, "Wrong — loop, don't abandon."],
      ["Use deceptive AI faces", false, "Wrong — authenticity/ethics."],
      ["Beg for follows in every frame", false, "Wrong — needy bait."],
    ]),
    question("q6", "Capstone connection?", [
      ["Inventory boards prove you had a discovery system during the 30-day experiment", true, "Correct — dossier evidence."],
      ["Inventory replaces the experiment", false, "Wrong — supports it."],
      ["Only Honors Lab needs inventory", false, "Wrong — Capstone benefits."],
      ["Inventory is optional vibes", false, "Wrong — build the board."],
    ]),
    question("q7", "If Content Creation Mastery is incomplete, you should…", [
      ["Still stock a simple discovery pipeline from the show you already run", true, "Correct — recommended CC helps, but inventory can start now."],
      ["Refuse to grow until every Mastery Path is done", false, "Wrong — unnecessary freeze."],
      ["Steal another creator's segments wholesale", false, "Wrong — not the lesson."],
      ["Buy a viral pack", false, "Wrong — banned thinking."],
    ]),
    question("q8", "Discovery Inventory LIVE Mission success is…", [
      ["A four-week board plus a LIVE that captures 2–3 clippable moments with CTA plans", true, "Correct — stock + capture."],
      ["A viral clip", false, "Wrong — not the grade."],
      ["Board only with no LIVE", false, "Wrong — LIVE required."],
      ["Spamming links in unrelated LIVEs", false, "Wrong — not durable."],
    ]),
  ],
});
