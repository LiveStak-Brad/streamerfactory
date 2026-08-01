import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "professional-networking-for-creators",
  programKey: "community",
  title: "Quiz: Professional Networking for Creators",
  questions: [
    question("q1", "Professional networking for creators is best defined as…", [
      [
        "Relationship capital: give first, follow up cleanly, collaborate without drama, and leave good reputations",
        true,
        "Correct — CM-09 core definition.",
      ],
      ["Sending as many collab DMs as possible", false, "Wrong — volume without specificity is spam."],
      ["Recruiting creators into your agency or owned network", false, "Wrong — hard boundary."],
      ["Only battling whoever accepts in Finder", false, "Wrong — Battle systems are out of scope here."],
    ]),
    question("q2", "A meaningful networking touch should be…", [
      [
        "Specific, time-bounded, and mostly useful or respectful to the other person",
        true,
        "Correct — quality over spam.",
      ],
      ["Identical copy pasted to fifty accounts", false, "Wrong — spam."],
      ["A guilt trip about how much you need a shout-out", false, "Wrong — extractive."],
      ["A follow-for-follow demand", false, "Wrong — banned pattern."],
    ]),
    question("q3", "The 30-day plan in this lesson asks for…", [
      ["Five meaningful touches mapped with who, give, ask, and date windows", true, "Correct — CM-09 outcome."],
      ["Fifty cold outreaches for growth hacking", false, "Wrong — quality cap."],
      ["Signing three creators to your team", false, "Wrong — recruiting out of scope."],
      ["Skipping notes if you 'know people'", false, "Wrong — Outreach Notes are required."],
    ]),
    question("q4", "Give-first networking means…", [
      [
        "Leading with something useful or specific before stacking asks",
        true,
        "Correct — relationship capital starts with value.",
      ],
      ["Working for free forever with no boundaries", false, "Wrong — not martyrdom."],
      ["Never proposing a collab", false, "Wrong — clean asks are allowed after value."],
      ["Only giving shout-outs to people bigger than you", false, "Wrong — specificity matters more than size."],
    ]),
    question("q5", "This lesson does NOT teach…", [
      ["Agency recruiting or Battle partner operating systems", true, "Correct — hard boundaries."],
      ["Reputation hygiene", false, "Wrong — it does teach that."],
      ["Outreach notes", false, "Wrong — it does."],
      ["A 30-day five-touch plan", false, "Wrong — it does."],
    ]),
    question("q6", "Mentioning professional standards on LIVE should…", [
      [
        "State one culture standard once without desperately pitching collabs",
        true,
        "Correct — mission design.",
      ],
      ["Become a five-minute ad for your networking services", false, "Wrong — desperate pitch."],
      ["Be skipped because standards are private only", false, "Wrong — calm public culture lines help."],
      ["Include follow-for-follow calls", false, "Wrong — not professional."],
    ]),
    question("q7", "Growth Mastery GR-10 relates to this lesson as…", [
      [
        "A brief callback for professional collab outreach — not a deep-dive rewrite here",
        true,
        "Correct — boundary with Growth.",
      ],
      ["The same full discovery playbook repeated", false, "Wrong — do not duplicate GR-10."],
      ["Required before any networking touch", false, "Wrong — CM-01 + AC-06 are the stated prereqs."],
      ["Permission to spam for reach", false, "Wrong — never."],
    ]),
    question("q8", "LIVE Mission success for CM-09 is…", [
      [
        "One real meaningful touch executed, five touches mapped on the 30-day plan, and one calm standards mention on a 45+ LIVE",
        true,
        "Correct — behavior + artifacts.",
      ],
      ["A guaranteed reply or new followers", false, "Wrong — not the grade."],
      ["Gift totals from networking mentions", false, "Wrong — not the grade."],
      ["Skipping the touch if the plan looks good on paper", false, "Wrong — execution required."],
    ]),
  ],
});
