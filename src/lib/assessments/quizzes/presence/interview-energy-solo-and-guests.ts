import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "interview-energy-solo-and-guests",
  programKey: "presence",
  title: "Quiz: Interview Energy — Solo and Guests",
  questions: [
    question("q1", "Interview energy (solo or with guests) depends most on…", [
      ["Question craft, listening presence, and follow-ups that keep the other voice audible", true, "Correct — listening is the skill."],
      ["Talking over guests so you stay the star", false, "Wrong — domination kills interview energy."],
      ["Reading a list without listening", false, "Wrong — no follow-ups."],
      ["Only interviewing when a famous guest appears", false, "Wrong — solo creators interview chat too."],
    ]),
    question("q2", "Solo interview energy treats chat as…", [
      ["A guest panel — ask, wait, reflect, follow up, bridge", true, "Correct — chat is the guest."],
      ["An enemy to ignore", false, "Wrong — broadcast mode."],
      ["Proof you failed if silent", false, "Wrong — wait, then continue with protocol."],
      ["Only useful for gift goals", false, "Wrong — stories and opinions matter."],
    ]),
    question("q3", "Best question type for LIVE?", [
      ["Open questions that invite a story crumb or opinion", true, "Correct — not yes/no traps."],
      ["Yes/no with no follow-up path", false, "Wrong — dead end."],
      ["Overly personal questions that violate privacy", false, "Wrong — unsafe."],
      ["Gotcha questions designed to embarrass", false, "Wrong — harms trust."],
    ]),
    question("q4", "A guest (or chat) tries to hijack the beat. You should…", [
      ["Keep host control with a timebox and a bridge back to the plan", true, "Correct — you remain host."],
      ["Surrender the segment entirely", false, "Wrong — loses the show."],
      ["Argue until they win", false, "Wrong — not hosting."],
      ["Mute everyone forever", false, "Wrong — overkill default."],
    ]),
    question("q5", "Mission success is…", [
      ["Segment plan + question bank + 40+ minute LIVE with a continuous 10-minute interview-style block", true, "Correct — plan and proof."],
      ["A famous guest appearance", false, "Wrong — solo is fully valid."],
      ["Chat volume as the only score", false, "Wrong — behavior graded."],
      ["Skipping reflect/follow-up if you asked one question", false, "Wrong — listening is required."],
    ]),
    question("q6", "Where is the 'magic' in interview energy?", [
      ["Follow-ups that go one level deeper after the first answer", true, "Correct — first answer is rarely the gold."],
      ["Asking twenty new questions as fast as possible", false, "Wrong — depth beats speed."],
      ["Never waiting — fill every silence instantly", false, "Wrong — waiting is part of craft."],
      ["Only yes/no polls", false, "Wrong — weak for stories."],
    ]),
    question("q7", "Capstone connection?", [
      ["Interview plan becomes Capstone chat-integration evidence", true, "Correct — monologue-only Capstones fail the skill."],
      ["Chat integration is banned in Capstone", false, "Wrong — required plan."],
      ["Only guests count for Capstone", false, "Wrong — solo chat counts."],
      ["Honors Lab writes your question bank", false, "Wrong — you build it; labs optional."],
    ]),
    question("q8", "After reflecting an answer, a strong host…", [
      ["Bridges into a teach or story payoff before closing the segment", true, "Correct — synthesis step."],
      ["Ends abruptly with no payoff", false, "Wrong — incomplete."],
      ["Ignores the answer and reads the next unrelated question", false, "Wrong — no listening."],
      ["Only thanks gifters and moves on", false, "Wrong — misses interview energy."],
    ]),
  ],
});
