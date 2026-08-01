import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "from-spike-to-stable-growth",
  programKey: "growth",
  title: "Quiz: From Spike to Stable Growth",
  questions: [
    question("q1", "Viral spikes often…", [
      ["Reverse unless you install capture systems before you need them", true, "Correct — prepare the playbook early."],
      ["Guarantee permanent growth", false, "Wrong — spikes reverse."],
      ["Mean you should quit your cadence", false, "Wrong — pacing matters."],
      ["Require buying more fake viewers", false, "Wrong — banned."],
    ]),
    question("q2", "A spike-capture playbook should include…", [
      ["Welcome rituals, return offers, and post-spike pacing rules", true, "Correct — convert chaos into return habits."],
      ["Only screaming 'follow' for an hour", false, "Wrong — panic hosting."],
      ["Agency ownership transfers", false, "Wrong — out of scope."],
      ["Ignoring new people to look cool", false, "Wrong — wasted spike."],
    ]),
    question("q3", "Welcome rituals help because…", [
      ["New arrivals get oriented fast and feel invited to return", true, "Correct — belonging on purpose."],
      ["You can shame lurkers", false, "Wrong — harms retention."],
      ["You skip your planned segments", false, "Wrong — ritual sits inside the show."],
      ["You promise overnight fame", false, "Wrong — never."],
    ]),
    question("q4", "Post-spike pacing means…", [
      ["Protecting capacity and quality so the show survives the hangover week", true, "Correct — stable growth over crash."],
      ["Scheduling twenty LIVEs in two days", false, "Wrong — burnout."],
      ["Disappearing for a month with no return offer", false, "Wrong — leaks the spike."],
      ["Changing niche immediately", false, "Wrong — thrash."],
    ]),
    question("q5", "You should install the playbook…", [
      ["Before you need it — rehearse on normal LIVEs", true, "Correct — practice capture systems early."],
      ["Only after a spike already ended", false, "Wrong — too late for that spike."],
      ["Never — spikes are luck only", false, "Wrong — systems matter."],
      ["Only if an agency writes it", false, "Wrong — you own it."],
    ]),
    question("q6", "Capstone connection?", [
      ["Spike playbook documents how you would stabilize discovery gains during/after the experiment", true, "Correct — portfolio-ready system."],
      ["You must go viral for Capstone credit", false, "Wrong — never required."],
      ["Only Honors Lab needs a playbook", false, "Wrong — Capstone can include it."],
      ["Playbooks replace diagnosis", false, "Wrong — still need diagnosis."],
    ]),
    question("q7", "If a spike brings chaos that breaks your standards…", [
      ["Use pacing and boundaries — do not trade reputation for a temporary peak", true, "Correct — stable growth protects the brand."],
      ["Abandon standards for reach", false, "Wrong — costly."],
      ["Buy more chaos", false, "Wrong — no."],
      ["Recruit an agency mid-spike", false, "Wrong — out of scope."],
    ]),
    question("q8", "Spike LIVE Mission success is…", [
      ["A written spike playbook plus a LIVE that rehearses welcome/return offer behaviors", true, "Correct — install + practice."],
      ["Actually going viral that day", false, "Wrong — not required."],
      ["Gift totals only", false, "Wrong — not the grade."],
      ["Skipping the playbook because rooms are quiet", false, "Wrong — install before you need it."],
    ]),
  ],
});
