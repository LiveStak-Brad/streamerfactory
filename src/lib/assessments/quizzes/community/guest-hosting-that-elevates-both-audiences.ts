import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "guest-hosting-that-elevates-both-audiences",
  programKey: "community",
  title: "Quiz: Guest Hosting That Elevates Both Audiences",
  questions: [
    question("q1", "A guest LIVE where both audiences win means…", [
      [
        "Each chat can name why the visit happened, what you did together, and what to do next",
        true,
        "Correct — design standard, not vibes.",
      ],
      ["You extracted as many follows as possible", false, "Wrong — extractive."],
      ["The guest talked the entire time", false, "Wrong — one-sided."],
      ["You skipped promo to keep it pure", false, "Wrong — fair timed promo helps both rooms."],
    ]),
    question("q2", "The agenda should start with…", [
      ["A one-sentence purpose both creators can say aloud", true, "Correct — purpose before personality."],
      ["A long list of inside jokes", false, "Wrong — not the foundation."],
      ["Whoever talks first decides the topic", false, "Wrong — that creates Zoom energy."],
      ["An untimed hang until energy dies", false, "Wrong — needs timed blocks."],
    ]),
    question("q3", "Primary host responsibility on your LIVE is…", [
      ["Open, timekeeping, transitions, conflict calls, and final close", true, "Correct — host owns the container."],
      ["Letting the guest run the whole clock", false, "Wrong — unclear roles."],
      ["Ignoring mods entirely", false, "Wrong — mods still protect culture."],
      ["Only reading donations", false, "Wrong — not hosting craft."],
    ]),
    question("q4", "Ethical promo exchange looks like…", [
      ["Specific, equal-intent, timed shout-outs with a clear next step for each audience", true, "Correct — mutual value."],
      ["One mumbled 'follow them' mid-joke", false, "Wrong — weak and unfair."],
      ["Pressuring the guest into your hard sell", false, "Wrong — bait-and-switch."],
      ["Only promoting the bigger account", false, "Wrong — extractive stacking."],
    ]),
    question("q5", "An exit ramp should include…", [
      ["Two-minute warning, recap, promo if needed, and a handoff that re-anchors your room", true, "Correct — end on purpose."],
      ["Suddenly ending with no context", false, "Wrong — confuses both chats."],
      ["Letting the guest linger unlabeled forever", false, "Wrong — rename or exit."],
      ["Ghosting crossover viewers after the guest leaves", false, "Wrong — re-anchor and welcome."],
    ]),
    question("q6", "This lesson's boundary vs Growth GR-10 is…", [
      ["Hosting craft and community elevation — not collab outreach systems", true, "Correct — GR-10 covers outreach."],
      ["Teaching spam DM templates", false, "Wrong — out of scope."],
      ["Replacing all outreach with vibes", false, "Wrong — different skills."],
      ["Recruiting guests into a network you own", false, "Wrong — never the goal."],
    ]),
    question("q7", "If no guest is available for the mission…", [
      ["Dry-run the full agenda aloud with chat as guest energy and document the run-of-show", true, "Correct — still execution."],
      ["Skip the mission until someone famous replies", false, "Wrong — dry-run counts."],
      ["Only write the agenda and never say it on LIVE", false, "Wrong — must execute aloud."],
      ["Host with zero plan and call it authentic", false, "Wrong — fails the craft."],
    ]),
    question("q8", "LIVE Mission success for guest hosting is…", [
      ["Completed run-of-show artifacts plus a 45+ minute hosted or dry-run structure", true, "Correct — behavior + documentation."],
      ["Hitting a peak viewer record", false, "Wrong — not the grade."],
      ["Getting the guest to gift you", false, "Wrong — not the goal."],
      ["Skipping the exit ramp if energy is high", false, "Wrong — exit ramps still matter."],
    ]),
  ],
});
