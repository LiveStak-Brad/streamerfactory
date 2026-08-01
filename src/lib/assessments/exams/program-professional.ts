import { programFinal, question } from "@/lib/assessments/build";

/**
 * Program Final for Professional Creator Mastery (programKey `professional`).
 */
export const exam = programFinal({
  programKey: "professional",
  programName: "Professional Creator Mastery",
  title: "Program Final: Professional Creator Mastery",
  questions: [
    question("pc1", "Professional Creator Mastery answers which core question?", [
      [
        "How do I operate like a professional creator for years — with systems, trust, and sustainable capacity?",
        true,
        "Correct — career professionalism, not agency school.",
      ],
      ["How do I start a creator management agency?", false, "Wrong — hard boundary."],
      ["How do I guarantee brand deal income?", false, "Wrong — no guarantees."],
      ["How do I recruit creators into my network?", false, "Wrong — out of scope."],
    ]),
    question("pc2", "Positioning for Money (PC-01) starts by…", [
      [
        "Writing a positioning statement and a clear won't-do list tied to income-safe offers",
        true,
        "Correct — PC-01.",
      ],
      ["Accepting every paid request to grow faster", false, "Wrong — selling your soul."],
      ["Copying another creator's niche word-for-word", false, "Wrong — authenticity matters."],
      ["Skipping boundaries until you are famous", false, "Wrong — boundaries first."],
    ]),
    question("pc3", "Offer design for LIVE creators should…", [
      [
        "Define one primary LIVE offer and one secondary offer that fit the show ethically",
        true,
        "Correct — PC-02.",
      ],
      ["Push pressure tactics and fake scarcity every night", false, "Wrong — ethics fail."],
      ["Only sell agency packages to other creators", false, "Wrong — out of scope."],
      ["Ignore Core monetization fundamentals", false, "Wrong — brief callback, not rewrite."],
    ]),
    question("pc4", "Income systems and money operations emphasize…", [
      [
        "Simple tracking, buffer rules, and tax-aware recordkeeping habits — education, not CPA advice",
        true,
        "Correct — PC-03.",
      ],
      ["Specific tax rates and filing advice for every creator", false, "Wrong — never specific tax advice."],
      ["Investing gift income based on streamer tips", false, "Wrong — no investment advice."],
      ["Skipping records until tax season panic", false, "Wrong — systems prevent panic."],
    ]),
    question("pc5", "Business health beyond gift totals looks at…", [
      [
        "Concentration risk, session contribution, and sustainable rate — not spike vanity alone",
        true,
        "Correct — PC-04.",
      ],
      ["Only the biggest gift night this month", false, "Wrong — spikes hide fragility."],
      ["Follower count as the only health metric", false, "Wrong — incomplete."],
      ["How many creators you manage", false, "Wrong — agency creep."],
    ]),
    question("pc6", "Brand deals and partner communication are taught…", [
      [
        "From the creator's side — evaluate, respond professionally, protect audience trust",
        true,
        "Correct — PC-06 boundary.",
      ],
      ["As a talent-agency playbook for signing other creators", false, "Wrong — banned."],
      ["As pressure closing scripts that ignore fit", false, "Wrong — trust first."],
      ["As guaranteed sponsorship formulas", false, "Wrong — no guarantees."],
    ]),
    question("pc7", "Contracts literacy for creators means…", [
      [
        "Spotting red flags (exclusivity, rights, payment, cancellation) and knowing when to pause for qualified help",
        true,
        "Correct — PC-08 literacy.",
      ],
      ["Giving legal advice and drafting binding contracts for others", false, "Wrong — not legal practice."],
      ["Signing everything quickly to seem professional", false, "Wrong — pause is professional."],
      ["Ignoring terms if the fee looks good", false, "Wrong — rights matter."],
    ]),
    question("pc8", "Time, capacity, and saying no protects…", [
      [
        "Quality and longevity with a written capacity policy and professional no scripts",
        true,
        "Correct — PC-09.",
      ],
      ["Your ability to never rest if money is involved", false, "Wrong — burnout risk."],
      ["Agency recruiting calendars", false, "Wrong — out of scope."],
      ["Only vacation planning once a year", false, "Wrong — weekly capacity matters."],
    ]),
    question("pc9", "The Capstone Creator Operating Manual must…", [
      [
        "Assemble reviewable evidence across positioning, offers, money ops, health, IP, brands, incidents, contracts, capacity, and a 90-day plan",
        true,
        "Correct — PC-10 artifact.",
      ],
      ["Be a vibe document with no numbers or boundaries", false, "Wrong — must be reviewable."],
      ["Prove you started an agency", false, "Wrong — hard boundary."],
      ["Only exist inside optional Honors Lab", false, "Wrong — Capstone is required; Lab is optional."],
    ]),
    question("pc10", "Which statement about certification is correct?", [
      [
        "Capstone is required for the certificate; Professional Creator Lab / Honors is optional and never a gate",
        true,
        "Correct — Labs never gate diplomas.",
      ],
      ["Honors Lab is required before any certificate", false, "Wrong — never a gate."],
      ["Program Final replaces the Capstone entirely", false, "Wrong — both matter as designed."],
      ["You can skip capacity and contracts if gifts are high", false, "Wrong — professionalism is complete."],
    ]),
  ],
});
