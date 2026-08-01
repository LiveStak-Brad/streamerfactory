import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "choosing-the-right-mobile-equipment",
  programKey: "mobile",
  title: "Quiz: Choosing the Right Mobile Equipment",
  questions: [
    question("q1", "First upgrade priority should target?", [
      ["The bottleneck that kills reliability: storage, battery, heat, or ports.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["The newest phone color.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["The largest ring light regardless of power.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Follower count aesthetics.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q2", "Phone capability worksheet includes?", [
      ["Honest limits—not marketing spec fantasies.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Only influencer unboxing notes.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Purchased rank screenshots.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Hidden unsafe gear.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q3", "Mobile gear checklist should list?", [
      ["Items by role with weight and purpose.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Every trending accessory online.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Only studio gear you never carry.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Zero power planning.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q4", "Yearly phone recommendations?", [
      ["Out of scope—teach principles instead.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Required every lesson.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Replace safety planning.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Guarantee viral growth.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q5", "Mission graded on?", [
      ["Completed checklist, worksheet, and matrix.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Viewer spike.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Gift totals.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Rank movement.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q6", "Reliability bottleneck example?", [
      ["Battery health too weak for a full session.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Wrong thumbnail font.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Chat emoji choice.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Profile banner color.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q7", "MOB-02 Capstone evidence?", [
      ["Dated gear checklist and upgrade matrix.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Borrowed gear photo.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Fake capability stats.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Undated wish list.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q8", "Travel weight limits mean?", [
      ["Some gear stays home honestly marked on the list.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Carry everything always.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Ignore airline rules entirely.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Hide batteries.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
  ],
});
