import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "community-design-belonging-on-purpose",
  programKey: "community",
  title: "Quiz: Community Design — Belonging on Purpose",
  questions: [
    question("q1", "In this lesson, real community is best described as…", [
      ["Designed belonging through thesis, rituals, roles, and language", true, "Correct — belonging on purpose, not accidental niceness."],
      ["Being nice and hoping people feel like family", false, "Wrong — niceness alone is not design."],
      ["Guilt language that makes people afraid to leave", false, "Wrong — guilt is banned ethics territory."],
      ["Ranking members only by gifts", false, "Wrong — loyal participation beats wallet ranking."],
    ]),
    question("q2", "A strong community thesis should…", [
      ["Name who it's for, what you do together, and one clear standard", true, "Correct — invitation with a spine."],
      ["Promise fake scarcity so people never miss a LIVE", false, "Wrong — fake scarcity is unethical."],
      ["Require emotional dependence on the host", false, "Wrong — parasocial exploitation is banned."],
      ["Replace your Creator Brand entirely", false, "Wrong — brief callback to AC-02; do not rebuild brand here."],
    ]),
    question("q3", "How many weekly rituals should you design in this lesson?", [
      ["Three recognizable, repeatable, ethical rituals", true, "Correct — three is the cap until they run clean."],
      ["As many as possible so the week feels special", false, "Wrong — over-design kills consistency."],
      ["Zero — rituals are only for Capstone night", false, "Wrong — Capstone celebrates rituals you already run."],
      ["Only gift-goal rituals", false, "Wrong — rituals must not require buying belonging."],
    ]),
    question("q4", "Ritual success in the LIVE Mission is graded on…", [
      ["Execution of the design and observed participation behavior", true, "Correct — behavior and execution, not vanity."],
      ["Peak viewers during the ritual", false, "Wrong — viewers are not the grade."],
      ["Gift totals during the cue", false, "Wrong — gifts are not the mission metric."],
      ["How emotional chat becomes", false, "Wrong — do not manufacture emotional dependence."],
    ]),
    question("q5", "Light community roles should…", [
      ["Stay optional, public, and free of unpaid emotional labor demands", true, "Correct — recognition without exploitation."],
      ["Require DMs and private loyalty tests", false, "Wrong — intimacy is not a prize you sell."],
      ["Replace professional moderation systems entirely", false, "Wrong — full mod systems come later in the path."],
      ["Only go to top gifters", false, "Wrong — that trains the wrong culture."],
    ]),
    question("q6", "Which approach is explicitly out of bounds?", [
      ["Guilt gifting, fake friendships, or manufactured intimacy", true, "Correct — ethics never teach these."],
      ["Naming a weekly open question ritual", false, "Wrong — that is healthy design."],
      ["Writing 'we never do' values on a worksheet", false, "Wrong — values floors are required."],
      ["Thanking a regular publicly for welcoming new chat", false, "Wrong — proportionate public thanks is fine."],
    ]),
    question("q7", "How does this lesson connect to Capstone?", [
      ["The Community Design One-Pager feeds the Community Appreciation Event", true, "Correct — design now, appreciate earned belonging later."],
      ["Capstone replaces the need for any weekly rituals", false, "Wrong — Capstone celebrates what you already designed."],
      ["Only Honors Lab needs a one-pager", false, "Wrong — the one-pager is core; labs never gate cert."],
      ["Capstone is about buying a shout-out package", false, "Wrong — out of scope and unethical framing."],
    ]),
    question("q8", "Insider language should…", [
      ["Invite newcomers with a clear one-sentence teach-in", true, "Correct — belonging without exclusion walls."],
      ["Shame people who do not know the jokes yet", false, "Wrong — exclusion kills healthy community."],
      ["Imply private romantic closeness with regulars", false, "Wrong — manufactured intimacy is banned."],
      ["Be hidden so only paying members understand", false, "Wrong — do not sell basic belonging."],
    ]),
  ],
});
