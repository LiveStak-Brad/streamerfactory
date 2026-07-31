import { graduationExam, question } from "@/lib/assessments/build";

export const exam = graduationExam({
  title: "StreamerU Graduation Exam",
  questions: [
  question("g1", "StreamerU progression order is...", [
    ["Lesson, Quiz, Mission, Program Final, Certificate, then Graduation", true, "Correct - that is the academy path."],
    ["Graduation first, then lessons", false, "Wrong - reverse order."],
    ["Missions only, never quizzes", false, "Wrong - quizzes certify understanding."],
    ["Manager College before Beginner Foundations", false, "Wrong - foundations come first."],
  ]),
  question("g2", "StreamerU XP measures...", [
    ["Educational mastery inside the academy", true, "Correct - separate from Factory Reputation."],
    ["Community contribution reputation", false, "Wrong - that is Factory Reputation."],
    ["TikTok diamond balance", false, "Wrong - platform currency is separate."],
    ["Password strength", false, "Wrong - unrelated."],
  ]),
  question("g3", "Factory Reputation should increase from...", [
    ["LIVE participation, helping creators, community missions", true, "Correct - contribution system."],
    ["Only quiz scores", false, "Wrong - quizzes award StreamerU XP."],
    ["Buying followers", false, "Wrong - hollow/risky."],
    ["Sharing account passwords", false, "Wrong - unsafe."],
  ]),
  question("g4", "A beginner LIVE structure includes...", [
    ["Open, middle segments, and a close", true, "Correct - intentional run-of-show."],
    ["AFK until gifts appear", false, "Wrong - fails presence."],
    ["No topic on purpose", false, "Wrong - clarity matters."],
    ["Ending at the first quiet minute", false, "Wrong - trains quitting."],
  ]),
  question("g5", "Empty-room skill means...", [
    ["Keep narrating with value when few people watch", true, "Correct - retention under low CCV."],
    ["Leave until famous", false, "Wrong - delays skill."],
    ["Sit silent", false, "Wrong - dead air."],
    ["Only talk after gifts", false, "Wrong - conditional energy is fragile."],
  ]),
  question("g6", "Hooks are for...", [
    ["Resetting attention and clarifying why to stay", true, "Correct - first impressions and mid-stream joins."],
    ["Apologizing for low viewers as the open", false, "Wrong - weak."],
    ["Replacing all content forever", false, "Wrong - hooks open content."],
    ["Bypassing rules", false, "Wrong - false."],
  ]),
  question("g7", "Repeat viewers grow from...", [
    ["Reliable schedule and recognizable loops", true, "Correct - habit formation."],
    ["Random disappearances", false, "Wrong - breaks trust."],
    ["Buying comments", false, "Wrong - hollow/risky."],
    ["Hiding when you will return", false, "Wrong - opacity hurts."],
  ]),
  question("g8", "Healthy battle culture is...", [
    ["Compete hard and protect relationships", true, "Correct - networks outlast one scoreboard."],
    ["Harass opponents for clips", false, "Wrong - toxic."],
    ["Ignore partners after wins", false, "Wrong - burns bridges."],
    ["Treat rules as optional in matches", false, "Wrong - rules always apply."],
  ]),
  question("g9", "Battle prep should include...", [
    ["Timing, partner alignment, and simple talk cues", true, "Correct - reduces chaos."],
    ["Password sharing", false, "Wrong - unsafe."],
    ["Zero communication", false, "Wrong - causes friction."],
    ["Guaranteed win promises", false, "Wrong - overpromise."],
  ]),
  question("g10", "Gift momentum usually needs...", [
    ["Visible progress toward a clear reason", true, "Correct - people join motion they understand."],
    ["Threats and shame", false, "Wrong - destroys culture."],
    ["Fake totals", false, "Wrong - destroys trust."],
    ["No ask and no gratitude ever", false, "Wrong - both extremes fail."],
  ]),
  question("g11", "Income habits emphasize...", [
    ["Show up, deliver value, ask clearly, thank, review", true, "Correct - durable loop."],
    ["Overnight wealth guarantees", false, "Wrong - unrealistic."],
    ["Burnout as a badge", false, "Wrong - unsustainable."],
    ["Skipping safety for speed", false, "Wrong - short-termism."],
  ]),
  question("g12", "Compliance mindset is...", [
    ["Non-negotiable operating constraints", true, "Correct - professionalism."],
    ["Optional for small accounts", false, "Wrong - false."],
    ["Chat-voted", false, "Wrong - false."],
    ["Ended at graduation", false, "Wrong - never ends."],
  ]),
  question("g13", "If unsure about a policy gray area...", [
    ["Take the safer interpretation and verify official guidance", true, "Correct - protect the account."],
    ["Do it for virality", false, "Wrong - reckless."],
    ["Copy whoever 'got away with it'", false, "Wrong - lag is not permission."],
    ["Assume no enforcement", false, "Wrong - denial."],
  ]),
  question("g14", "Long-term account safety includes...", [
    ["Strong auth and careful access sharing", true, "Correct - security is part of safety."],
    ["Lending the account freely", false, "Wrong - takeover risk."],
    ["Disabling 2FA", false, "Wrong - weakens security."],
    ["Ignoring policy updates forever", false, "Wrong - policies evolve."],
  ]),
  question("g15", "Program Certificates are issued when...", [
    ["Program lessons/missions are done and the Program Final is passed", true, "Correct - exam-gated certs."],
    ["You watch one lesson title", false, "Wrong - insufficient."],
    ["You feel ready", false, "Wrong - insufficient."],
    ["You pay for a shortcut", false, "Wrong - not StreamerU."],
  ]),
  question("g16", "Graduation requires...", [
    ["All five program certificates and a passed Graduation Exam", true, "Correct - full academy mastery proof."],
    ["One battle win", false, "Wrong - insufficient."],
    ["Factory Reputation only", false, "Wrong - different system."],
    ["Skipping Rules & Safety", false, "Wrong - required program."],
  ]),
  question("g17", "After graduating, Manager College is...", [
    ["A future advanced pathway, not an instant unlock tonight", true, "Correct - diploma first; manager track later."],
    ["Required before lesson 1", false, "Wrong - reverse."],
    ["The same as Beginner Foundations", false, "Wrong - different stage."],
    ["Awarded for buying followers", false, "Wrong - false."],
  ]),
  question("g18", "Mastery percentage primarily reflects...", [
    ["Assessment performance across lessons and exams", true, "Correct - quizzes/finals drive mastery."],
    ["Only follower count", false, "Wrong - vanity metric."],
    ["Password length", false, "Wrong - unrelated."],
    ["Number of insults in battles", false, "Wrong - toxic and irrelevant."],
  ]),
  question("g19", "A durable creator career balances...", [
    ["Hosting skill, community, monetization habits, and safety", true, "Correct - StreamerU's integrated model."],
    ["Violations for shock growth", false, "Wrong - fragile."],
    ["Structure-free AFK farming", false, "Wrong - poor practice/risk."],
    ["Ignoring regulars forever", false, "Wrong - wastes the audience asset."],
  ]),
  question("g20", "The point of explaining wrong answers in quizzes is...", [
    ["To teach why a choice fails, not only which letter is right", true, "Correct - mastery needs understanding."],
    ["To shame learners", false, "Wrong - teaching tool."],
    ["To replace missions", false, "Wrong - execution still required."],
    ["To award Factory Reputation", false, "Wrong - StreamerU XP is the academy reward."],
  ]),
  ],
});
