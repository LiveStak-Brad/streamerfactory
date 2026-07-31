import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "preparing-for-your-first-battle",
  programKey: "battles",
  title: "Quiz: Preparing for your first battle",
  questions: [
    question(
      "q1",
      "This lesson's LIVE Mission asks you to run a full promotion dry run tonight. What is it explicitly NOT asking you to do?",
      [
        ["Book or execute a real battle with a partner", true, "Correct — this lesson is preparation only; scheduling and running a real battle happens in the next lesson."],
        ["Post an announcement video before going live", false, "Wrong — posting the announcement video is part of tonight's required promotion sequence."],
        ["Use three to five relevant hashtags", false, "Wrong — that's part of the funnel this mission asks you to rehearse."],
        ["Go live for at least 45 minutes", false, "Wrong — the 45+ minute session is the required mission length."],
      ],
    ),
    question(
      "q2",
      "Why does this lesson recommend rehearsing your promotion funnel on a normal LIVE instead of waiting for a real battle?",
      [
        ["Mistakes are cheap on a normal LIVE, but the same mistakes on real battle day cost you and your partner", true, "Correct — the dry run builds muscle memory when the stakes are low."],
        ["Because promotion isn't allowed during real battles", false, "Wrong — promotion is required for real battles too; this is about when you practice it."],
        ["Because TikTok limits how many times you can promote a battle", false, "Wrong — no such platform limit is described in this lesson."],
        ["Because normal LIVEs get more views than battles", false, "Wrong — this isn't a viewership comparison; it's about rehearsal safety."],
      ],
    ),
    question(
      "q3",
      "Which promotion sequence matches this lesson's recommended funnel?",
      [
        ["One announcement video, 3–5 relevant hashtags, a same-day story reminder, and an optional cross-post closer to start time", true, "Correct — four distinct touchpoints spread across the day, not repeated in one burst."],
        ["Posting the identical message every 15 minutes for the full day", false, "Wrong — this lesson explicitly warns against repeating the same message within a short window."],
        ["Fifteen or more hashtags to maximize discoverability", false, "Wrong — the lesson recommends three to five relevant tags, not a wall of generic ones."],
        ["DMing individual followers to make sure they see the announcement", false, "Wrong — this is called out as crossing from promotion into pressure."],
      ],
    ),
    question(
      "q4",
      "What does this lesson say a lightweight partner agreement should cover?",
      [
        ["Date and time, format and rounds, a reschedule plan, tone/content boundaries, and a single point of contact", true, "Correct — these five elements prevent the most common battle-day miscommunications."],
        ["A formal legal contract reviewed by a lawyer", false, "Wrong — the lesson explicitly says you don't need a contract, just a shared written understanding."],
        ["Nothing written — a verbal 'sounds good' is enough", false, "Wrong — an unwritten verbal agreement is named as a common mistake to avoid."],
        ["Only the date, with all other details worked out live on camera", false, "Wrong — format and tone details should be confirmed in advance, not discovered live."],
      ],
    ),
    question(
      "q5",
      "When choosing a first battle partner, what does this lesson say matters most?",
      [
        ["Communication and fairness, even over a bigger partner's follower count", true, "Correct — a smaller, reliable, communicative partner is a better first-battle fit than a bigger name who might ignore you."],
        ["Only battling the single most famous creator you can reach", false, "Wrong — the lesson favors fit and reliability over follower count for a first match."],
        ["Choosing someone who has never battled before either", false, "Wrong — prior battle experience on either side isn't the deciding factor described here."],
        ["Picking a partner at random to keep things spontaneous", false, "Wrong — this lesson emphasizes deliberate partner fit, not randomness."],
      ],
    ),
    question(
      "q6",
      "Your promotion starts to feel spammy — you notice you're posting the same message four times in an hour. What should you do?",
      [
        ["Dial back to the four-touchpoint funnel spread across the full day", true, "Correct — repetition across a day works better than repetition within a single hour."],
        ["Keep posting since more repetition always means more reach", false, "Wrong — this lesson explicitly identifies this pattern as crossing into spam."],
        ["Switch to DMing every follower individually instead", false, "Wrong — that's an even more aggressive form of the same mistake."],
        ["Stop promoting entirely for the rest of the week", false, "Wrong — the fix is pacing the funnel correctly, not abandoning promotion."],
      ],
    ),
    question(
      "q7",
      "What belongs on the pre-battle prep checklist described in this lesson?",
      [
        ["Account standing, time zone confirmation, format details, and a backup connection plan", true, "Correct — these are the boring logistics that prevent live, on-camera chaos."],
        ["A guaranteed win strategy against your opponent", false, "Wrong — the checklist covers logistics, not competitive strategy."],
        ["A list of insults prepared in advance for trash talk", false, "Wrong — this isn't part of prep and contradicts the sportsmanship standard from the prior lesson."],
        ["Buying followers before the battle to look more credible", false, "Wrong — this isn't part of any checklist in this lesson and risks account safety."],
      ],
    ),
    question(
      "q8",
      "What does this lesson say happens if you assume a partner's verbal 'sounds good' is a confirmed booking?",
      [
        ["It risks becoming a booking that's easy for either side to quietly abandon", true, "Correct — the lesson calls for an explicit yes and a written record, not just enthusiasm."],
        ["Nothing — verbal agreement is treated the same as a written one in this lesson", false, "Wrong — the lesson explicitly distinguishes a soft verbal agreement from an explicit, written confirmation."],
        ["TikTok automatically locks the battle into Battle Hub", false, "Wrong — a battle must be manually scheduled; nothing happens automatically from a verbal exchange."],
        ["The battle becomes binding and cannot be rescheduled", false, "Wrong — the opposite is true; a soft agreement without confirmation is the least reliable, not binding."],
      ],
    ),
  ],
});
