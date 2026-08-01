import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "scheduling-as-strategy",
  programKey: "growth",
  title: "Quiz: Scheduling as Strategy",
  questions: [
    question("q1", "Scheduling as strategy means…", [
      ["Treating time slots and cadence as testable choices, not vibes", true, "Correct — schedule is a growth lever."],
      ["Going LIVE whenever you feel inspired only", false, "Wrong — inspiration is not a strategy."],
      ["Copying a viral creator's exact hours forever", false, "Wrong — audience and life differ."],
      ["Seven heroic LIVEs with no recovery", false, "Wrong — unsustainable cadence fails."],
    ]),
    question("q2", "A two-week schedule test should prioritize…", [
      ["Attendance/retention notes and integrity of planned sessions", true, "Correct — observe what the slot does."],
      ["Guaranteed virality by Friday", false, "Wrong — never promise virality."],
      ["Changing niche mid-test", false, "Wrong — one lever."],
      ["Spam posting in other chats to fill the room", false, "Wrong — banned pattern."],
    ]),
    question("q3", "Audience time reality means…", [
      ["Your best slot is where your real viewers can actually show up sustainably", true, "Correct — reality over fantasy peaks."],
      ["Only midnight slots work for everyone", false, "Wrong — false universal."],
      ["Ignoring your sleep and job", false, "Wrong — burnout kills growth."],
      ["Schedule does not matter if content is good", false, "Wrong — discovery and return still use time."],
    ]),
    question("q4", "Sustainable cadence design protects…", [
      ["Quality and consistency so growth compounds over months", true, "Correct — durable growth needs a livable calendar."],
      ["Maximum sessions until collapse", false, "Wrong — burnout is not strategy."],
      ["Random skips with no review", false, "Wrong — integrity matters."],
      ["Agency-owned calendars", false, "Wrong — out of scope."],
    ]),
    question("q5", "If a 'hot' slot destroys your energy and Integrity, you should…", [
      ["Kill or adapt toward a sustainable slot even if peaks looked exciting", true, "Correct — sustainability wins long-term."],
      ["Double down until you burn out", false, "Wrong — short-term spike thinking."],
      ["Buy viewers for that slot", false, "Wrong — banned."],
      ["Ignore the Integrity collapse", false, "Wrong — Integrity is a veto."],
    ]),
    question("q6", "Schedule strategy sheets belong in Capstone because…", [
      ["They document which cadence you tested and what you decided", true, "Correct — reviewable planning evidence."],
      ["Schedules replace diagnosis", false, "Wrong — diagnosis still first."],
      ["Only Honors Lab cares about calendars", false, "Wrong — Capstone needs them."],
      ["Calendars are vanity", false, "Wrong — cadence is a system."],
    ]),
    question("q7", "A professional schedule experiment changes…", [
      ["Slot or cadence — not brand, niche, and CTA all at once", true, "Correct — one strategic lever."],
      ["Everything about the show", false, "Wrong — thrash."],
      ["Safety rules", false, "Wrong — never."],
      ["Nothing — just hope", false, "Wrong — hope is not a test."],
    ]),
    question("q8", "Scheduling LIVE Mission success is…", [
      ["A written strategy sheet plus a LIVE in the tested slot with notes filed", true, "Correct — plan + execution."],
      ["A packed room", false, "Wrong — not the grade."],
      ["Skipping the slot because you were tired of planning", false, "Wrong — test requires LIVE."],
      ["Posting 'Who's awake?' bait all day", false, "Wrong — not durable strategy."],
    ]),
  ],
});
