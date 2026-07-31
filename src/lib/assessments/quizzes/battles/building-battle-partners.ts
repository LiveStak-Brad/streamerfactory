import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "building-battle-partners",
  programKey: "battles",
  title: "Quiz: Building battle partners",
  questions: [
    question("q1", "You're browsing Battle Finder and see two prospects: one with a similar audience size and overlapping availability, another with 20x your follower count and a schedule that never matches yours. Who should you prioritize?", [
      ["The similar-audience, overlapping-schedule prospect", true, "Correct — a battle between wildly mismatched follower counts often feels lopsided, and a partner who's never free when you can stream isn't a realistic long-term fit."],
      ["The bigger account regardless of fit, since a bigger audience always helps", false, "Wrong — this lesson explicitly says to judge fit on audience size, schedule overlap, and complementary style, not just size."],
      ["Whichever one responds first, regardless of fit", false, "Wrong — speed of response doesn't override the actual compatibility factors this lesson names."],
      ["Neither — only battle with people you already know", false, "Wrong — Battle Finder exists specifically to solve the cold-start problem of finding a first partner."],
    ]),
    question("q2", "What makes a first outreach message through Battle Finder effective, according to this lesson?", [
      ["Short, specific, and low-pressure — proposing one concrete day range or format", true, "Correct — a specific first message gets a faster, clearer answer and signals you're someone who plans rather than someone just browsing."],
      ["A long message detailing your entire content history and follower growth", false, "Wrong — this lesson favors short and specific over long and exhaustive."],
      ["A vague \"want to battle sometime?\" with no details", false, "Wrong — this is the exact kind of low-effort outreach this lesson says to avoid."],
      ["Messaging the same prospect multiple times per day until they respond", false, "Wrong — this reads as pressure, not the low-pressure approach this lesson recommends."],
    ]),
    question("q3", "You ghost a scheduled battle without explanation. According to this lesson, what happens to that trace?", [
      ["It travels faster than positive reputation, because a bad experience is more memorable and worth mentioning to other creators", true, "Correct — negative reputation in a small collaborative space like Battle Hub compounds quickly, often without you ever being told why you stopped getting invited."],
      ["Nothing — one missed battle doesn't affect anything since nobody's watching that closely", false, "Wrong — this lesson says reputation compounds with every battle whether or not you're paying attention to it."],
      ["It only matters if you ghost the same person twice", false, "Wrong — a single instance of ghosting can already damage trust in a small network."],
      ["It resolves itself automatically over time with no action needed", false, "Wrong — reputation repair takes deliberate reliability, not just waiting."],
    ]),
    question("q4", "Your partner promoted your last battle with a dedicated post to their audience, but you only gave it a single low-effort mention. What principle does this violate?", [
      ["Reciprocity — both sides should be getting something real and roughly proportional out of the collaboration", true, "Correct — matching effort where it's reasonable to match it is what keeps a partnership balanced instead of one-sided."],
      ["Nothing — promotion effort doesn't need to match as long as the battle itself goes well", false, "Wrong — a partnership that only benefits one side rarely lasts more than a battle or two."],
      ["The no-ghosting rule from Lesson 17", false, "Wrong — ghosting is about disappearing during commitments, not about promotional balance."],
      ["The momentum principle from a later lesson", false, "Wrong — momentum vs. begging applies to gifting language, not partner promotion."],
    ]),
    question("q5", "During a collab session, which shout-out does this lesson say lands as a real recommendation rather than an obligation?", [
      ["\"Go check out [partner], they do a great job with [specific thing you've noticed about their content]\"", true, "Correct — specific shout-outs do far more work than generic ones, and audiences can tell the difference."],
      ["\"Go follow my friend, they're cool too\"", false, "Wrong — this lesson specifically calls this out as reading like an obligation you're fulfilling, not a genuine recommendation."],
      ["Saying nothing and letting your partner introduce themselves", false, "Wrong — a collab-forward session dedicates real time to genuinely representing your partner."],
      ["One rushed mention at the very end of the stream", false, "Wrong — this lesson recommends giving shout-outs at natural points, early and again near the close."],
    ]),
    question("q6", "A collab session went really well and the energy was great. What's the single most common reason this never turns into a repeat partnership, according to this lesson?", [
      ["Neither side explicitly asks to do it again — warm feelings alone don't turn into a second booking", true, "Correct — someone has to say the words; build the habit of asking directly, on camera, near the close."],
      ["The audiences of the two creators are too different", false, "Wrong — this lesson doesn't name audience overlap as the main blocker to a second booking."],
      ["Battle Finder doesn't allow repeat bookings", false, "Wrong — there's no such platform restriction mentioned in this lesson."],
      ["The scoreboard result determines whether there's a next collab", false, "Wrong — this lesson explicitly separates the pipeline habit from the scoreboard result."],
    ]),
    question("q7", "You notice one partner's energy or content style just doesn't match yours once you're both live together, even though everything looked fine on paper. What should you do?", [
      ["Finish the session professionally, give an honest shout-out, and simply don't prioritize a second booking with that person", true, "Correct — not every reasonable-looking match becomes a repeat partnership, and that's a normal, fine outcome."],
      ["End the session early since the chemistry clearly isn't there", false, "Wrong — ending early over a style mismatch still counts as an unprofessional exit that damages reputation."],
      ["Publicly explain to your audience why the match didn't work", false, "Wrong — this isn't necessary and risks damaging both reputations unnecessarily."],
      ["Force a second booking anyway since you already invested time in the first one", false, "Wrong — your partner tracker exists precisely so you can make this decision on evidence, not sunk cost."],
    ]),
    question("q8", "What is a partner tracker used for in this lesson?", [
      ["Recording name, date, effort match, and follow-through so you decide who's reliable based on a real record, not one impression", true, "Correct — after a handful of collaborations, patterns emerge that a single strong or weak impression can't reliably show."],
      ["Ranking partners publicly so your audience can see who's 'best'", false, "Wrong — this isn't a public tool, and ranking partners publicly would damage relationships."],
      ["Replacing the need for a first agreement or outreach message", false, "Wrong — the tracker is for reviewing after the fact, not for initial outreach."],
      ["Something only necessary once you have dozens of partners", false, "Wrong — this lesson recommends starting the tracker from your very first collaboration."],
    ]),
  ],
});
