import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "understanding-battles",
  programKey: "battles",
  title: "Quiz: Understanding battles",
  questions: [
    question(
      "q1",
      "A friend tells you battles are decided by who has the better content, like a talent judge. Based on this lesson, is that accurate?",
      [
        ["No — a battle is a timed, gift-driven scoreboard race, not a talent contest", true, "Correct — points come from gifts converting to score, not from any judged quality check."],
        ["Yes — TikTok has judges who score each round for quality", false, "Wrong — there's no judge or quality scoring mechanic in a battle."],
        ["Yes — the algorithm automatically ranks the better creator as the winner", false, "Wrong — the winner is whoever has more gift-based points when the timer ends, nothing else."],
        ["No — battles are decided purely by which creator has more total followers", false, "Wrong — follower count doesn't determine the round outcome; gifts sent during the round do."],
      ],
    ),
    question(
      "q2",
      "You're down badly in the first thirty seconds of a battle. What does this lesson say to do?",
      [
        ["Keep your energy identical to if you were ahead and highlight anything positive in your own chat", true, "Correct — comebacks happen because the losing host stayed engaging, not because viewers felt sorry for them."],
        ["Visibly show disappointment so viewers know you're taking it seriously", false, "Wrong — chat mirrors your face; visible deflation reads as giving up."],
        ["End the battle early since the outcome looks decided", false, "Wrong — ending early damages your reputation and abandons a round that could still swing."],
        ["Stop talking and wait for gifts to arrive on their own", false, "Wrong — silence doesn't create the engagement that produces gifts or comebacks."],
      ],
    ),
    question(
      "q3",
      "Why do viewers gift more urgently during a battle than during a normal solo LIVE, according to this lesson?",
      [
        ["A visible countdown timer creates a decision deadline that a normal LIVE doesn't have", true, "Correct — urgency from the timer, not necessarily better content, drives faster action."],
        ["Because battles are the only format where gifts are allowed", false, "Wrong — gifts work in both formats; battles simply add time pressure."],
        ["Because TikTok doubles gift value during battles", false, "Wrong — no such doubling mechanic is described in this lesson."],
        ["Because viewers are required to gift once a battle starts", false, "Wrong — gifting is voluntary in both formats."],
      ],
    ),
    question(
      "q4",
      "What does this lesson say makes a scoreboard 'a story, not a verdict'?",
      [
        ["Comebacks and momentum swings drive retention more than the final number does", true, "Correct — a round that swings late outperforms one decided early, even with similar final scores."],
        ["The final score always determines who gets more new followers", false, "Wrong — this lesson doesn't make that follower claim."],
        ["Scoreboards are hidden from viewers so the number never matters", false, "Wrong — the scoreboard is visible; the lesson teaches how to read it, not hide it."],
        ["A blowout round is always more entertaining than a close one", false, "Wrong — the lesson says a lopsided round can still work if the losing host keeps energy up, not that blowouts are inherently more entertaining."],
      ],
    ),
    question(
      "q5",
      "Your opponent starts trash-talking during a round. What's the recommended response?",
      [
        ["Match their energy with light humor, not real hostility", true, "Correct — a light 'oh, it's like that now?' keeps things fun without damaging the relationship."],
        ["Escalate with genuine insults to defend your side", false, "Wrong — real hostility damages both rooms and your reputation with future partners."],
        ["Immediately end the stream to avoid any conflict", false, "Wrong — ending abruptly over banter is an overreaction that hurts your reputation more than a light response would."],
        ["Report your opponent to TikTok mid-battle", false, "Wrong — light trash-talk within the format isn't a violation requiring escalation."],
      ],
    ),
    question(
      "q6",
      "What is this lesson's mission asking you to do — and what is it NOT asking you to do?",
      [
        ["Watch a real battle or recap and apply one observed tactic in your own solo LIVE — not book or run a real battle yet", true, "Correct — this lesson is theory and observation only; booking comes in the next lesson."],
        ["Schedule and run your first real battle tonight", false, "Wrong — this lesson explicitly says you will not book a battle today."],
        ["Skip watching any battles and go straight to hosting one", false, "Wrong — observation is a required part of this mission."],
        ["Recruit a battle partner and confirm a date before going live", false, "Wrong — partner agreements are covered in the next lesson, not this one."],
      ],
    ),
    question(
      "q7",
      "Why does this lesson say beginners should be cautious about jumping into battles before solidifying solo hosting skills?",
      [
        ["Battles amplify whatever hosting habits you already have, good or shaky, in front of twice the audience", true, "Correct — a battle exposes a shaky baseline to two audiences instead of hiding it."],
        ["Because TikTok restricts battles to creators with a minimum follower count", false, "Wrong — this lesson doesn't make that eligibility claim."],
        ["Because battles are only available after finishing the entire StreamerU curriculum", false, "Wrong — Battles & Collaboration is a specific program you're currently in, not something gated behind the whole curriculum."],
        ["Because solo LIVE skills don't transfer to battles at all", false, "Wrong — the lesson explicitly says your existing hosting habits carry directly into a battle."],
      ],
    ),
    question(
      "q8",
      "What does 'borrowed trust' mean in the context of a battle, according to this lesson?",
      [
        ["Your opponent's viewers are watching you for the first time, filtered through trust they already have in someone they like", true, "Correct — being gracious and enjoyable can convert some of that borrowed trust into new followers for you."],
        ["Your opponent lends you their account access during the match", false, "Wrong — this isn't about account access at all."],
        ["TikTok temporarily boosts your account's trust score during a battle", false, "Wrong — no such platform trust-score mechanic is described."],
        ["You're required to trust your opponent's judgment on round outcomes", false, "Wrong — outcomes are determined by the gift-based scoreboard, not by trust between hosts."],
      ],
    ),
  ],
});
