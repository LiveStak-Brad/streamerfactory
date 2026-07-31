import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "long-term-account-safety",
  programKey: "beginner",
  title: "Quiz: Long-term account safety",
  questions: [
    question(
      "q1",
      "According to this lesson, what is the single most preventable account-loss scenario, and how do you fix it?",
      [
        [
          "Losing access from an outdated phone number, email, or recovery method — fixed by confirming current recovery info and enabling two-factor authentication now",
          true,
          "Correct — this has nothing to do with violations and is entirely preventable with a few minutes of setup.",
        ],
        [
          "Getting permanently banned for a first-time minor mistake — nothing can be done in advance",
          false,
          "Wrong — this lesson identifies outdated recovery access, not enforcement, as the most preventable loss scenario.",
        ],
        [
          "Losing followers due to inconsistent posting — fixed by posting more often",
          false,
          "Wrong — this is a growth topic, not the account-security issue this lesson addresses.",
        ],
        [
          "Running out of content ideas — fixed by buying a content calendar",
          false,
          "Wrong — unrelated to account access or safety.",
        ],
      ],
    ),
    question(
      "q2",
      "A well-paid sponsorship offer arrives and pressures you to decide immediately without reviewing terms. What does this lesson say that pressure signals?",
      [
        [
          "It's a signal about how the brand may treat you if problems arise later — a short pause before committing costs nothing",
          true,
          "Correct — legitimate offers can withstand a short review; high-pressure urgency is itself information.",
        ],
        [
          "It means you should accept quickly before they change their mind",
          false,
          "Wrong — this lesson explicitly treats pressure to decide instantly as a warning sign, not urgency to act on.",
        ],
        [
          "It has no bearing on whether the partnership is a good fit",
          false,
          "Wrong — the lesson says this pressure is itself informative about the brand.",
        ],
        [
          "It only matters for creators with large followings",
          false,
          "Wrong — vetting brand fit applies at any account size.",
        ],
      ],
    ),
    question(
      "q3",
      "A former editor still has manager-level access to your account eight months after the working relationship ended. What should you do?",
      [
        [
          "Revoke that access immediately and review your full list of collaborators for anyone else who should no longer be there",
          true,
          "Correct — access sprawl is named in this lesson as a quiet risk that compounds silently.",
        ],
        [
          "Leave it since they have not caused any problems so far",
          false,
          "Wrong — this is exactly the access-sprawl risk this lesson warns against.",
        ],
        [
          "Change your password instead of reviewing collaborator permissions",
          false,
          "Wrong — the lesson recommends using and reviewing platform-native collaborator permissions directly.",
        ],
        [
          "Wait until the next scheduled self-audit to deal with it",
          false,
          "Wrong — known unused access should be revoked immediately, not deferred to a future review.",
        ],
      ],
    ),
    question(
      "q4",
      "Why does this lesson say platforms tend to be more cautious with accounts that show erratic identity shifts or sudden content-category changes?",
      [
        [
          "Because those patterns can look like an account testing boundaries, and consistency builds both audience and platform trust",
          true,
          "Correct — a predictable, consistent creator is easier for a platform to trust and easier for an audience to root for.",
        ],
        [
          "Because platforms never allow any content evolution at all",
          false,
          "Wrong — the lesson explicitly says evolving deliberately and transparently is fine.",
        ],
        [
          "Because content-category changes always violate a specific rule",
          false,
          "Wrong — the concern is about pattern and predictability, not a specific rule violation.",
        ],
        [
          "Because it only affects monetization eligibility, not trust",
          false,
          "Wrong — this lesson frames it as a compliance and trust issue, not purely a monetization one.",
        ],
      ],
    ),
    question(
      "q5",
      "What does this lesson recommend regarding the moderator, chat-norm, and topic-fence systems built in the previous lesson, as your account grows?",
      [
        [
          "Keep applying them at the same standard — they are not training wheels to drop once you feel established",
          true,
          "Correct — creators who last years keep applying these systems at scale, not just when new and cautious.",
        ],
        [
          "Relax them once your account feels established and you have more experience",
          false,
          "Wrong — this is a named mistake: assuming compliance habits are only for new, small accounts.",
        ],
        [
          "Replace them entirely with a paid moderation service as soon as possible",
          false,
          "Wrong — the lesson does not require outsourcing; it requires maintaining the same standard.",
        ],
        [
          "Only apply them during sponsored or high-stakes sessions",
          false,
          "Wrong — the standard should apply to every session, not just high-stakes ones.",
        ],
      ],
    ),
    question(
      "q6",
      "What is the purpose of the recurring monthly self-audit this lesson describes?",
      [
        [
          "To catch slow drift — loosened fences, an inactive moderator, a questionable brand fit — before it becomes a serious pattern",
          true,
          "Correct — self-audits let you course-correct on your own schedule instead of being forced into it by enforcement.",
        ],
        [
          "To calculate your exact monthly earnings for tax purposes",
          false,
          "Wrong — the audit described here is about safety and habit drift, not income tracking.",
        ],
        [
          "To decide whether to quit streaming that month",
          false,
          "Wrong — the audit is a maintenance habit, not a decision point about continuing.",
        ],
        [
          "To replace the Lesson Quiz for this lesson",
          false,
          "Wrong — the self-audit is an ongoing habit separate from the lesson's assessment.",
        ],
      ],
    ),
    question(
      "q7",
      "Which statement best matches this lesson's Reality Check?",
      [
        [
          "Stewardship habits feel easy to postpone because nothing bad has happened yet — start with the fifteen-minute version now and let a monthly rhythm carry the rest",
          true,
          "Correct — the cost of skipping these habits is often invisible until months or years later.",
        ],
        [
          "You must complete every stewardship task perfectly today or the lesson does not count",
          false,
          "Wrong — the lesson explicitly says to start with a short version now, not achieve perfection immediately.",
        ],
        [
          "Account stewardship only matters once you have a large following",
          false,
          "Wrong — these habits are recommended from wherever you are right now.",
        ],
        [
          "If nothing has gone wrong yet, these habits are unnecessary",
          false,
          "Wrong — this is exactly the trap the Reality Check warns against.",
        ],
      ],
    ),
    question(
      "q8",
      "What proves this lesson's LIVE Mission is complete?",
      [
        [
          "A 60+ minute LIVE with confirmed recovery access beforehand, moderation/fences/sound habits held throughout, and a dated self-audit commitment written down afterward",
          true,
          "Correct — this capstone mission demonstrates sustainable operation, not just a single good session.",
        ],
        [
          "A 60-minute LIVE where you relaxed your usual moderation standard since it's the final safety lesson",
          false,
          "Wrong — this directly contradicts the lesson's point that standards do not expire as you progress.",
        ],
        [
          "Reading the lesson and updating account settings without going live",
          false,
          "Wrong — study and settings alone do not complete the mission; a real LIVE is required.",
        ],
        [
          "Getting a brand sponsorship confirmed during the session",
          false,
          "Wrong — sponsorship is not the pass condition for this mission.",
        ],
      ],
    ),
  ],
});
