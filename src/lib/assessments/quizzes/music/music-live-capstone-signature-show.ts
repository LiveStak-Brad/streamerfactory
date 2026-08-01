import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "music-live-capstone-signature-show",
  programKey: "music",
  title: "Quiz: Music LIVE Capstone: Signature Show",
  questions: [
    question(
      "q1",
      "Signature Music LIVE Show Capstone requires…",
      [
        ["A dossier proving format, audio, setlist, interaction, rights, monetization, backup, performance, and review", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Gift screenshots only", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Honors Lab before certificate", false, "Wrong — not the professional decision for this scenario."],
        ["A full arena PA purchase", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q2",
      "Technical competence evidence includes…",
      [
        ["Signal-flow map, inventory, sound-check, balance plan, issue log, and reliable routing notes", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Vibes about 'sounding fine'", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Only a pretty thumbnail", false, "Wrong — not the professional decision for this scenario."],
        ["Borrowed gear lists with no test", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q3",
      "Performance competence evidence includes…",
      [
        ["Setlist, stamina/interaction plan, documented LIVE or approved recording, and replay review", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Follower count alone", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["A single phone note saying 'went well'", false, "Wrong — not the professional decision for this scenario."],
        ["Only tip totals", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q4",
      "Music LIVE Lab / Honors is…",
      [
        ["Optional after certificate — never a gate; may include AI/mentor/optional Brad or qualified musician review", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Required before Capstone", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Required for Program Final", false, "Wrong — not the professional decision for this scenario."],
        ["Required for Core Graduate", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q5",
      "Mission success is graded on…",
      [
        ["Documented delivery and review of the signature show against the dossier/rubric — not viewers or gifts", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Peak concurrent viewers", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Diamond records", false, "Wrong — not the professional decision for this scenario."],
        ["How many uncleared songs you risked", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q6",
      "Advanced Creator requirement means…",
      [
        ["You need Advanced Creator before the Music LIVE Certificate is awarded", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Music certificate ignores Advanced Creator", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Honors replaces Advanced Creator", false, "Wrong — not the professional decision for this scenario."],
        ["Core alone awards Music LIVE Certificate", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q7",
      "A backup plan belongs in Capstone because…",
      [
        ["Technical failures are normal — recovery is part of professional music LIVE craft", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Backups are for beginners only", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["You should always end when anything glitches", false, "Wrong — not the professional decision for this scenario."],
        ["Backups replace sound check", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q8",
      "Which statement is correct?",
      [
        ["Capstone is required for Music LIVE Mastery Certificate; Honors Lab is optional prestige", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Honors replaces Capstone", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Certificate requires agency ownership", false, "Wrong — not the professional decision for this scenario."],
        ["You can skip rights notes if originals exist someday", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
  ],
});
