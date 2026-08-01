import { programFinal, question } from "@/lib/assessments/build";

/**
 * Program Final for Presence Mastery (programKey `presence`).
 */
export const exam = programFinal({
  programKey: "presence",
  programName: "Presence Mastery",
  title: "Program Final: Presence Mastery",
  questions: [
    question("pr1", "Camera presence that earns trust is best built by…", [
      [
        "Stable framing, intentional eye line, grounded posture, and stillness you can sustain",
        true,
        "Correct — PR-01: own the frame without becoming stiff or fake.",
      ],
      ["Constantly moving closer to the lens to look more energetic", false, "Wrong — restless motion reads as anxiety."],
      ["Looking at the viewer count while you talk", false, "Wrong — eye line breaks trust."],
      ["Copying a louder creator’s gestures even if they feel unnatural", false, "Wrong — forced motion is not presence."],
    ]),
    question("pr2", "A voice that holds a room on LIVE primarily needs…", [
      [
        "Breath support, paced variety, emphasis on key words, and energy you can sustain when tired",
        true,
        "Correct — PR-02 five-tool craft, not volume alone.",
      ],
      ["Maximum volume for the entire session", false, "Wrong — maxed energy burns out and flattens."],
      ["Reading every sentence at the same speed for consistency", false, "Wrong — flat pace kills retention."],
      ["Whispering so viewers lean in for an hour", false, "Wrong — unsustainable and often unclear."],
    ]),
    question("pr3", "When chat goes quiet, the professional move is to…", [
      [
        "Run a prepared quiet-chat protocol: continue the segment, use self-contained talk, and refuse the spiral",
        true,
        "Correct — PR-03: silence is performance fuel, not proof of failure.",
      ],
      ["Apologize repeatedly for the empty room", false, "Wrong — apologies train viewers to leave."],
      ["End the LIVE immediately to protect your ego", false, "Wrong — you lose the practice reps."],
      ["Beg for comments before finishing your thought", false, "Wrong — needy energy kills presence."],
    ]),
    question("pr4", "A strong LIVE micro-story usually has…", [
      [
        "Setup, turn, and payoff in roughly 60–90 seconds without reading an essay",
        true,
        "Correct — PR-04 short-form LIVE storytelling.",
      ],
      ["A 12-minute monologue with no clear turn", false, "Wrong — ramble is not story."],
      ["A written script you must read line-for-line on camera", false, "Wrong — not scripts."],
      ["No payoff so viewers invent their own ending", false, "Wrong — payoff creates memory."],
    ]),
    question("pr5", "Audience psychology for Presence Mastery means designing moments for…", [
      [
        "Belonging, status, entertainment, and identity — without manipulation",
        true,
        "Correct — PR-05 four motives served ethically.",
      ],
      ["Guilt and FOMO as the only retention tools", false, "Wrong — manipulation is out of scope."],
      ["Ignoring motives and hoping charisma covers it", false, "Wrong — motives are design inputs."],
      ["Only gifting mechanics from Growth & Monetization", false, "Wrong — presence motives are broader than tips."],
    ]),
    question("pr6", "Emotional pacing across a LIVE should…", [
      [
        "Plan peaks, rests, and recovery beats so energy is intentional across the session",
        true,
        "Correct — PR-06 arc design.",
      ],
      ["Stay at maximum intensity from open to close", false, "Wrong — maxed energy burns the room and you."],
      ["Stay completely flat to seem calm", false, "Wrong — flat energy loses rooms."],
      ["Randomize energy every two minutes with no plan", false, "Wrong — chaos is not pacing."],
    ]),
    question("pr7", "Authenticity on LIVE is best practiced as…", [
      [
        "Three personality levers that fit you — observational humor, warmth cues, and edges you can sustain",
        true,
        "Correct — PR-07 levers, not forced bits.",
      ],
      ["Copying viral bits that do not fit your brand", false, "Wrong — forced comedy reads desperate."],
      ["Oversharing private details to prove you are real", false, "Wrong — authenticity ≠ unsafe disclosure."],
      ["Never planning anything so every moment is spontaneous", false, "Wrong — panic is not authenticity."],
    ]),
    question("pr8", "When a troll, tech fail, gift interrupt, or sudden crowd hits, you should…", [
      [
        "Use a short recovery script, reset the frame, and return to the planned beat",
        true,
        "Correct — PR-08 composure patterns.",
      ],
      ["Argue with the troll until they leave", false, "Wrong — feeds the interruption."],
      ["Abandon the segment and never mention what happened", false, "Wrong — viewers need a clean reset."],
      ["Rage-quit to punish the room", false, "Wrong — destroys trust and practice."],
    ]),
    question("pr9", "Interview energy (solo or with guests) depends most on…", [
      [
        "Question craft, listening presence, and follow-ups that keep the other voice audible",
        true,
        "Correct — PR-09 listening is the skill.",
      ],
      ["Talking over guests so you stay the star", false, "Wrong — domination kills interview energy."],
      ["Reading a list of questions without listening", false, "Wrong — no follow-ups, no presence."],
      ["Only interviewing when a famous guest appears", false, "Wrong — solo creators interview chat too."],
    ]),
    question("pr10", "The Presence Capstone requires…", [
      [
        "A signature 20-minute LIVE with run of show, opening/close, pacing, story, chat plan, recovery, and scored self-review evidence",
        true,
        "Correct — PR-10 portfolio artifact.",
      ],
      ["A viewer-count screenshot proving virality", false, "Wrong — not graded by virality."],
      ["Skipping the replay review if you felt good", false, "Wrong — evidence must be reviewable."],
      ["Waiting for Honors Lab approval before claiming the certificate", false, "Wrong — labs never gate."],
    ]),
    question("pr11", "Presence Mastery Honors Lab…", [
      [
        "Is optional after the certificate — AI/mentor/Brad review never gates certification",
        true,
        "Correct — honors, not gates.",
      ],
      ["Must be finished before Capstone counts", false, "Wrong — non-gating."],
      ["Replaces the Program Final", false, "Wrong — final still required."],
      ["Is required for the Core StreamerU Diploma", false, "Wrong — Core diploma is Core 24."],
    ]),
    question("pr12", "After Presence Mastery, most creators should…", [
      [
        "Continue into Content Creation Mastery (recommended next craft path) while keeping presence habits alive",
        true,
        "Correct — Presence then Content Creation in the recommended path.",
      ],
      ["Treat presence as finished and stop reviewing replays", false, "Wrong — craft decays without review."],
      ["Skip Content Creation and jump only to gear shopping", false, "Wrong — Production is separate; Content Creation is next craft."],
      ["Drop Advanced Creator habits because presence replaces systems", false, "Wrong — OS and brand still matter."],
    ]),
  ],
});
