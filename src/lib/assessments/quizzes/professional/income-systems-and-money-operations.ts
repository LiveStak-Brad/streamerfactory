import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "income-systems-and-money-operations",
  programKey: "professional",
  title: "Quiz: Income Systems and Money Operations",
  questions: [
    question(
      "q1",
      "A creator can only clearly remember eight of the last fourteen days of income while backfilling their tracker. What is the correct approach?",
      [
        [
          "Mark the uncertain days as estimates and move forward, rather than guessing with false confidence",
          true,
          "Correct — honest gaps are more useful than confident guesses.",
        ],
        [
          "Skip the tracker until every day can be perfectly reconstructed",
          false,
          "Wrong — waiting for perfect data delays the habit indefinitely.",
        ],
        [
          "Estimate all fourteen days without noting which are uncertain",
          false,
          "Wrong — unmarked guesses reduce the tracker's honesty and usefulness.",
        ],
        [
          "Only track the eight confirmed days and ignore the rest permanently",
          false,
          "Wrong — the missing days should be filled with clearly marked estimates, not omitted.",
        ],
      ],
    ),
    question(
      "q2",
      "What is the correct order for buffer rules as taught in this lesson?",
      [
        [
          "Set-aside first, operating funds second, personal funds last",
          true,
          "Correct — this order applies before any spending decision happens.",
        ],
        [
          "Personal funds first, then whatever is left goes to set-aside",
          false,
          "Wrong — this order defeats the purpose of a buffer, since money runs out before set-aside happens.",
        ],
        [
          "Operating funds first, then personal, then set-aside if anything remains",
          false,
          "Wrong — set-aside must come first so it isn't sacrificed to other spending.",
        ],
        [
          "There is no set order — it depends on the tax bracket",
          false,
          "Wrong — this lesson does not use tax brackets to determine buffer order.",
        ],
      ],
    ),
    question(
      "q3",
      "A viewer asks a creator on LIVE what specific expenses they can deduct on their taxes. What should the creator say?",
      [
        [
          "Redirect them to a qualified tax professional rather than naming specific deductions",
          true,
          "Correct — specific deduction advice is out of scope for this lesson and for creators giving advice on LIVE.",
        ],
        [
          "List the categories from their Expense Categories Checklist as deductible items",
          false,
          "Wrong — categories are for organizing records, not for claiming deductibility.",
        ],
        [
          "Share what they personally deducted last year as a guideline",
          false,
          "Wrong — personal experience isn't qualified tax advice and varies by situation.",
        ],
        [
          "Avoid answering and never mention taxes again on LIVE",
          false,
          "Wrong — the correct move is a calm redirect to a qualified professional, not total avoidance.",
        ],
      ],
    ),
    question(
      "q4",
      "Why does this lesson recommend exactly four columns for the income and expense tracker at first?",
      [
        [
          "To keep the habit simple enough to actually maintain before adding complexity",
          true,
          "Correct — a simple tracker that gets used beats an elaborate one that gets abandoned.",
        ],
        [
          "Because tax law requires exactly four categories",
          false,
          "Wrong — this is a habit-building choice, not a tax requirement.",
        ],
        [
          "Because more columns would reveal deductible expenses automatically",
          false,
          "Wrong — column count has no bearing on deduction determination.",
        ],
        [
          "Because the platform limits tracker entries to four fields",
          false,
          "Wrong — this is a StreamerU-recommended template choice, not a platform limitation.",
        ],
      ],
    ),
    question(
      "q5",
      "What does 'set-aside mindset' mean in this lesson?",
      [
        [
          "Treating a portion of income as not fully spendable yet, as a discipline habit — without naming a specific tax rate",
          true,
          "Correct — it's a personal discipline concept, not a stated tax percentage.",
        ],
        [
          "Setting aside the exact percentage the IRS or local tax authority requires",
          false,
          "Wrong — this lesson explicitly avoids stating specific tax rates or rules.",
        ],
        [
          "Investing set-aside funds into a recommended account type",
          false,
          "Wrong — this lesson gives no investment advice or account recommendations.",
        ],
        [
          "Only applies to creators earning above a certain income threshold",
          false,
          "Wrong — the discipline habit applies regardless of income level; no threshold is specified.",
        ],
      ],
    ),
    question(
      "q6",
      "What is the purpose of the receipt folder taught in this lesson?",
      [
        [
          "To hold findable evidence for anything logged as an expense in the tracker",
          true,
          "Correct — every tracked expense should have corresponding evidence somewhere organized.",
        ],
        [
          "To calculate which receipts qualify as deductions",
          false,
          "Wrong — determining deductibility is a tax question, not this lesson's job.",
        ],
        [
          "To submit directly to a tax authority without a professional's review",
          false,
          "Wrong — this lesson never instructs filing steps or direct submission.",
        ],
        [
          "To replace the income and expense tracker entirely",
          false,
          "Wrong — the receipt folder supports the tracker; it doesn't replace it.",
        ],
      ],
    ),
    question(
      "q7",
      "A creator wants to add a category to their expense tracker called 'guaranteed tax write-offs.' What's the issue?",
      [
        [
          "It frames organizational categories as tax advice, which this lesson explicitly avoids",
          true,
          "Correct — categories should be descriptive and organizational, never a deduction claim.",
        ],
        [
          "There's no issue — naming it clearly helps at tax time",
          false,
          "Wrong — labeling something 'guaranteed' as a write-off is exactly the kind of tax advice this lesson avoids.",
        ],
        [
          "The category should instead be called 'investment write-offs'",
          false,
          "Wrong — this still frames the category as tax advice, just renamed.",
        ],
        [
          "It's fine as long as a receipt is attached",
          false,
          "Wrong — having a receipt doesn't resolve the issue of implying guaranteed deductibility.",
        ],
      ],
    ),
    question(
      "q8",
      "How does this lesson's tracker connect to the next lesson, Reading Business Health Beyond Gift Totals?",
      [
        [
          "The tracker provides the raw, real numbers needed to build an honest business health snapshot",
          true,
          "Correct — you can't read business health from memory, only from data that was actually tracked.",
        ],
        [
          "It doesn't connect — business health uses only platform analytics",
          false,
          "Wrong — the next lesson explicitly builds on this lesson's tracked income and expense data.",
        ],
        [
          "The tracker becomes obsolete once the health snapshot is built",
          false,
          "Wrong — the tracker should keep running; the snapshot is a periodic read of it.",
        ],
        [
          "It connects only if the creator earns above a certain amount",
          false,
          "Wrong — the connection applies regardless of income level.",
        ],
      ],
    ),
  ],
});
