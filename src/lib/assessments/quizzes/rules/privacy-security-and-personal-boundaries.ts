import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "privacy-security-and-personal-boundaries",
  programKey: "rules",
  title: "Quiz: Privacy, Security, and Personal Boundaries",
  questions: [
    question("q1", "Why are privacy and security career skills?", [
      ["Growing audiences increase risk from crumbs, access weakness, and oversharing", true, "Correct — risk scales with visibility."],
      ["Because StreamerU requires paranoia as personality", false, "Wrong — systems, not fear theater."],
      ["So you can recruit creators safely into an agency", false, "Wrong — outside scope."],
      ["Only full-time creators need boundaries", false, "Wrong — build defaults early."],
    ]),
    question("q2", "Authenticity on LIVE requires…", [
      ["Warmth and honesty without unsafe personal exposure", true, "Correct — real is not unsafe."],
      ["Your address and children's full identities on camera", false, "Wrong — never required."],
      ["Showing login screens for transparency", false, "Wrong — security failure."],
      ["Debating every boundary until you overshare", false, "Wrong — script and continue."],
    ]),
    question("q3", "Account security hygiene includes…", [
      ["Current recovery access, 2FA mindset, unique credentials, revoking stale access", true, "Correct — professional minimum set."],
      ["Shared passwords across all platforms for convenience", false, "Wrong — multiplies breach risk."],
      ["Sketchy growth tools that want your login", false, "Wrong — refuse."],
      ["Never checking recovery until locked out", false, "Wrong — test before you need it."],
    ]),
    question("q4", "Pattern leakage often looks like…", [
      ["Routine location crumbs, identifiable exteriors, real-time travel details", true, "Correct — boring crumbs add up."],
      ["Using a clear brand promise", false, "Wrong — brand clarity is not leakage."],
      ["Filing a Capstone scorecard", false, "Wrong — unrelated."],
      ["Thanking chat by first name only", false, "Wrong — usually fine."],
    ]),
    question("q5", "When chat pushes for private details you should…", [
      ["Use a short boundary script once and continue the show", true, "Correct — short scripts beat essays."],
      ["Joke-answer with hints that still reveal the detail", false, "Wrong — still leakage."],
      ["Argue for ten minutes until you give in", false, "Wrong — over-explaining leaks."],
      ["Dox yourself to build trust", false, "Wrong — never."],
    ]),
    question("q6", "What never belongs on LIVE?", [
      ["Addresses/doxxing aid, auth codes, private messages as drama, others' private info weaponized", true, "Correct — hard privacy off-limits."],
      ["A brand-aligned tip segment", false, "Wrong — that is normal content."],
      ["Your next LIVE day/time", false, "Wrong — that is OS communication."],
      ["A sportsmanship close after a battle", false, "Wrong — Core habit, fine."],
    ]),
    question("q7", "Capstone connection?", [
      ["Completed privacy checklist becomes Capstone evidence you can scale without recklessness", true, "Correct — dossier piece."],
      ["Privacy replaces Capstone", false, "Wrong — still need the sprint."],
      ["Only Honors Lab needs privacy work", false, "Wrong — Capstone needs it; labs optional."],
      ["Privacy is optional after Core safety", false, "Wrong — Advanced Creator extends it."],
    ]),
    question("q8", "Boundary-Safe LIVE success is…", [
      ["Checklist applied, environment scan, 45+ minute LIVE inside your boundaries", true, "Correct — real hygiene + clean session."],
      ["Oversharing to prove you are fearless", false, "Wrong — contradicts the lesson."],
      ["Skipping account checks because you 'feel careful'", false, "Wrong — vibes are not a system."],
      ["Installing a viewer bot that needs your password", false, "Wrong — security failure."],
    ]),
  ],
});
