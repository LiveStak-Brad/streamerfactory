import { programFinal, question } from "@/lib/assessments/build";

/**
 * Program Final for Production Mastery (programKey `production`).
 */
export const exam = programFinal({
  programKey: "production",
  programName: "Production Mastery",
  title: "Program Final: Production Mastery",
  questions: [
    question("pd1", "Production Mastery answers which core question?", [
      [
        "How do I make my LIVE broadcasts look and sound professional every time — with systems, not shopping?",
        true,
        "Correct — production quality through knowledge and preparation.",
      ],
      ["How do I buy the most expensive gear available?", false, "Wrong — budget is not the point."],
      ["How do I guarantee viral growth with overlays?", false, "Wrong — Growth/Content paths."],
      ["How do I recruit creators into a production agency?", false, "Wrong — out of scope."],
    ]),
    question("pd2", "Before buying gear (PD-01), a creator should…", [
      [
        "Audit the setup and choose the highest-ROI next upgrade — or none — after process and placement fixes",
        true,
        "Correct — PD-01 decision framework.",
      ],
      ["Buy whatever a popular streamer uses", false, "Wrong — brand favoritism."],
      ["Skip audits if they have gift income", false, "Wrong — systems still matter."],
      ["Only upgrade after a viral spike", false, "Wrong — standards come first."],
    ]),
    question("pd3", "Intentional lighting (PD-02) emphasizes…", [
      [
        "A repeatable key/fill/background approach for your primary LIVE location",
        true,
        "Correct — PD-02.",
      ],
      ["Buying a full broadcast grid before your first LIVE", false, "Wrong — no studio fantasy."],
      ["Random ring-light placement until it feels cool", false, "Wrong — systems over vibes."],
      ["Ignoring color temperature mismatches", false, "Wrong — consistency matters."],
    ]),
    question("pd4", "Clean audio wins trust because…", [
      [
        "Viewers forgive imperfect video faster than muddy, clipped, or noisy audio",
        true,
        "Correct — PD-04 principle.",
      ],
      ["Audio never matters if the thumbnail is good", false, "Wrong — trust dies on bad sound."],
      ["Louder always means clearer", false, "Wrong — clipping destroys clarity."],
      ["Room noise is a branding choice", false, "Wrong — reduce preventable noise."],
    ]),
    question("pd5", "OBS scene discipline (PD-06) means…", [
      [
        "Building a minimal three-scene system you can run under stress with a backup plan",
        true,
        "Correct — PD-06.",
      ],
      ["Stacking as many animated overlays as the GPU allows", false, "Wrong — overbuilding."],
      ["Using pirated plugins for 'pro' looks", false, "Wrong — illegal software banned."],
      ["Skipping rehearsal if scenes look pretty", false, "Wrong — stress-test required."],
    ]),
    question("pd6", "Mobile-first production excellence prioritizes…", [
      [
        "Stands, power, heat, and connectivity habits that prevent preventable failure on long LIVEs",
        true,
        "Correct — PD-07.",
      ],
      ["Holding the phone by hand for authenticity", false, "Wrong — stability matters."],
      ["Ignoring battery until it dies on camera", false, "Wrong — power management."],
      ["Only Wi-Fi, never testing a backup path", false, "Wrong — reliability."],
    ]),
    question("pd7", "Accessibility basics for LIVE viewers include…", [
      [
        "Clear speech, readable on-screen text, contrast, and inclusive hosting habits",
        true,
        "Correct — PD-08.",
      ],
      ["Tiny decorative fonts for style points", false, "Wrong — readability fails."],
      ["Low-contrast overlays that match the wallpaper", false, "Wrong — contrast matters."],
      ["Speaking only to regulars who already know your slang", false, "Wrong — inclusion widens access."],
    ]),
    question("pd8", "Troubleshooting under pressure starts with…", [
      [
        "A triage tree — audio, video, network, app, power — used calmly with a written recovery card",
        true,
        "Correct — PD-09.",
      ],
      ["Rebooting everything at once while yelling", false, "Wrong — triage first."],
      ["Unsafe electrical experiments mid-LIVE", false, "Wrong — safety boundary."],
      ["Blaming the algorithm for dropped frames", false, "Wrong — diagnose tech first."],
    ]),
    question("pd9", "The Production Capstone requires…", [
      [
        "A production bible plus a demo of a signature look you can recreate in about 10 minutes with a fail-safe",
        true,
        "Correct — PD-10 Capstone.",
      ],
      ["A receipt proving expensive gear purchases", false, "Wrong — not a shopping contest."],
      ["Optional Honors Lab before any certificate", false, "Wrong — Lab never gates."],
      ["Viewer-count proof from one viral night", false, "Wrong — implementation evidence."],
    ]),
    question("pd10", "Which statement about certification is correct?", [
      [
        "Capstone is required for the certificate; Production Lab / Honors is optional and never a gate",
        true,
        "Correct — Labs never gate certificates.",
      ],
      ["Honors Lab is required before the certificate", false, "Wrong — never a gate."],
      ["Program Final replaces the Capstone entirely", false, "Wrong — both are in the chain."],
      ["You can skip audio if lighting looks expensive", false, "Wrong — audio-first trust."],
    ]),
  ],
});
