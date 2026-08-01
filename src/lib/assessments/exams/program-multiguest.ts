import { programFinal, question } from "@/lib/assessments/build";

/**
 * Program Final for Multi-Guest LIVE Mastery (programKey `multiguest`).
 */
export const exam = programFinal({
  programKey: "multiguest",
  programName: "Multi-Guest LIVE Mastery",
  title: "Program Final: Multi-Guest LIVE Mastery",
  questions: [
    question("mg1", "Multi-Guest LIVE Mastery answers which core question?", [
      [
        "How do I host clear, safe, purposeful shared rooms where guests contribute and viewers can follow?",
        true,
        "Correct — hosting craft + guest prep + safety + event design.",
      ],
      ["How do I add as many boxes as possible for growth?", false, "Wrong — spectacle is not the goal."],
      ["How do I stream for the first time?", false, "Wrong — Core already taught that."],
      ["How do I maximize gifts by pressuring guests?", false, "Wrong — unethical."],
    ]),
    question("mg2", "A host should open a multi-guest room when…", [
      [
        "There is a clear audience promise and guests add value solo delivery cannot",
        true,
        "Correct — MG-01 purpose-first format choice.",
      ],
      ["More tiles always look more professional", false, "Wrong — readability first."],
      ["A guest is available even with no topic", false, "Wrong — purpose required."],
      ["Conflict will create automatic engagement", false, "Wrong — unsafe and unethical."],
    ]),
    question("mg3", "Strong conversation design for multi-guest LIVE includes…", [
      [
        "A purpose, question ladder, segment timing, and space for genuine listening",
        true,
        "Correct — MG-02.",
      ],
      ["A rigid script guests must memorize word-for-word", false, "Wrong — over-control."],
      ["No plan so everything feels spontaneous", false, "Wrong — chaos is not craft."],
      ["Only questions that force gift goals", false, "Wrong — ethics failure."],
    ]),
    question("mg4", "Better multi-guest hosting in real time means…", [
      [
        "Clear openings, visible speaking order, calm transitions, and recovery language when the room wobbles",
        true,
        "Correct — MG-03 host leadership.",
      ],
      ["The host answers every question first", false, "Wrong — guests become scenery."],
      ["Ignoring quiet guests to keep energy high", false, "Wrong — fairness fails."],
      ["Letting the loudest person run the agenda", false, "Wrong — leadership abdication."],
    ]),
    question("mg5", "2-, 4-, and 9-box decisions should prioritize…", [
      [
        "Readability, verified capacity, and hostable rotation — not maximum spectacle",
        true,
        "Correct — MG-04 layout judgment.",
      ],
      ["Always using the largest grid available", false, "Wrong — larger is not always better."],
      ["Promising nine guests from a course page without checking the app", false, "Wrong — verify in-app."],
      ["Hiding roles so the room feels mysterious", false, "Wrong — clarity first."],
    ]),
    question("mg6", "Ethical guest selection and preparation requires…", [
      [
        "Inviting for contribution and consent, then briefing expectations, prompts, timing, and a tech check",
        true,
        "Correct — MG-05.",
      ],
      ["Surprising guests with the topic after they join", false, "Wrong — unfair prep."],
      ["Choosing only the biggest accounts regardless of fit", false, "Wrong — contribution over clout."],
      ["Skipping tech checks to save time", false, "Wrong — preventable failure."],
    ]),
    question("mg7", "Multi-guest moderation and community safety means…", [
      [
        "Pre-agreed roles, escalation steps, and respectful removal language before pressure hits",
        true,
        "Correct — MG-06 operating system.",
      ],
      ["Hoping conflict resolves itself on camera", false, "Wrong — hope is not a plan."],
      ["Removing anyone who disagrees politely", false, "Wrong — overreach."],
      ["Letting trolls stay for engagement", false, "Wrong — safety failure."],
    ]),
    question("mg8", "Ethical competitive / box-battle rooms require…", [
      [
        "Fair rules, equal dignity, clear rotation, recovery options, and no humiliation or gift coercion — Battle Mastery owns competitive strategy",
        true,
        "Correct — MG-07 boundary.",
      ],
      ["Pressuring teams to gift to prove loyalty", false, "Wrong — unethical."],
      ["Teaching full Battle Mastery win tactics here", false, "Wrong — wrong program."],
      ["Public shaming as entertainment", false, "Wrong — harm."],
    ]),
    question("mg9", "Professional creator interviewing emphasizes…", [
      [
        "Preparation, listening, useful follow-ups, and a respectful close aligned with Community Mastery CM-08",
        true,
        "Correct — MG-08.",
      ],
      ["Interrupting with your own story every answer", false, "Wrong — listening fails."],
      ["Extracting private details for clip drama", false, "Wrong — consent/ethics."],
      ["Skipping a close so the room trails off", false, "Wrong — dignity in endings."],
    ]),
    question("mg10", "Events, panels, and talent shows succeed when…", [
      [
        "Roles, run sheets, timing, safety coverage, and fair participation are planned before go-live",
        true,
        "Correct — MG-09 event production.",
      ],
      ["You invite many people and invent the program live", false, "Wrong — underprepared."],
      ["Judging is arbitrary and unexplained", false, "Wrong — fairness fails."],
      ["Safety is optional if the event is fun", false, "Wrong — safety is required."],
    ]),
    question("mg11", "The Signature Multi-Guest LIVE Event Capstone is graded on…", [
      [
        "Documented concept, prepared guests, run sheet, safety coverage, delivery or rehearsal, replay review, and improvement notes — not viewers, gifts, or rank",
        true,
        "Correct — Capstone evidence standard.",
      ],
      ["Highest peak viewer count during the event", false, "Wrong — vanity metric."],
      ["Total gifts received from guests", false, "Wrong — not graded."],
      ["How viral the clips went", false, "Wrong — not the standard."],
    ]),
    question("mg12", "Which statement about certification is correct?", [
      [
        "Capstone signature multi-guest LIVE event and Program Final are required; Advanced Creator is required before the certificate is awarded; Honors never gates; Multi-Guest is an optional specialty",
        true,
        "Correct — Labs never gate; Advanced Creator gates certificate award.",
      ],
      ["Honors Lab is required before Capstone", false, "Wrong — never a gate."],
      ["Multi-Guest is required for Career Creator Diploma", false, "Wrong — optional specialty."],
      ["Gift totals prove Capstone mastery", false, "Wrong — execution graded."],
    ]),
  ],
});
